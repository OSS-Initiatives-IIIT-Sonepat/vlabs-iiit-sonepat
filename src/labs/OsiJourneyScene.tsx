"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { bindCtrlPan } from "./ctrl-pan";

import {
  ENCRYPTED_DATA_BYTES,
  OSI_HOSTS,
  OSI_LAYERS,
  PDU_BLOCKS,
  PDU_ORDER,
  osiLayer,
  pduBytes,
  pduName,
  type OsiDevice,
  type OsiFrame,
  type PduBlockId,
} from "@/labs/networks/osi";

// ── Layout, in scene units ────────────────────────────────────────────────
const FH = 1.15; // one floor of a stack
const SLAB = 0.1;
const STACK_W = 6;
const STACK_D = 2.4;
const ROOF = 7 * FH;
const LX = -9; // laptop stack
const RX = 9; // server stack
const SW_X = -3.1;
const RT_X = 3.1;
const DEV_Z = 2.1;
const ROUTE_IN = STACK_W / 2 - 0.35;
const ROUTE_Z = STACK_D / 2 - 0.2;
const ROUTE_Y = 0.14;
const BH = 0.36; // block height
const BD = 0.6; // block depth
const GAP = 0.03;
const ON_DEVICE = 0.6; // the data unit is drawn smaller over a box
const HOVER = 1.75; // and floats above it, clear of the antenna

// ── Colours. Light bodies, navy outlines, orange for the request. ────────
const LINE = 0x24345f;
const BODY = 0xf8faff;
const FACE = 0xdbe5ff;
const SCREEN = 0xc4d4ff;
const ORANGE = 0xf59e0b;
const CABLE = 0x4f6fd8;
const POST = 0x8792a8;
const LED = 0x22c55e;

/** Boxes: from the front right, looking down onto the bench. */
const DIR = new THREE.Vector3(0.3, 0.42, 1).normalize();
/** The whole bench: nearly square on, so both stacks are the same size. */
const DIR_WIDE = new THREE.Vector3(0.1, 0.4, 1).normalize();
/** A floor: almost level, so the shelf above does not hide it. */
const DIR_FLOOR = new THREE.Vector3(0.14, 0.17, 1).normalize();

type Side = "laptop" | "server";

const stackX = (side: Side) => (side === "laptop" ? LX : RX);
/** +1 points from a stack toward the middle of the bench. */
const inward = (side: Side) => (side === "laptop" ? 1 : -1);
const floorY = (n: number) => (n - 1) * FH;
const isStack = (device: OsiDevice | null): device is Side =>
  device === "laptop" || device === "server";

type Props = {
  frame: OsiFrame;
  /** Subject-card cover: the whole bench, slowly turning, no labels. */
  preview?: boolean;
};

type Look = {
  mode: "plain" | "hatch" | "bits";
  bg: string;
  fg: string;
  title: string;
  caption: string;
};

function lookFor(id: PduBlockId, frame: OsiFrame): Look {
  const block = PDU_BLOCKS[id];
  const layer = osiLayer(block.layer);
  const bytes =
    id === "data" && frame.encrypted ? ENCRYPTED_DATA_BYTES : block.bytes;
  const caption = frame.captions?.[id] ?? `${bytes} B`;
  if (frame.bits) {
    return {
      mode: "bits",
      bg: "#1f2a44",
      fg: layer.color,
      title: block.title,
      caption: `${bytes * 8} bits`,
    };
  }
  if (id === "data") {
    return frame.encrypted
      ? {
          mode: "hatch",
          bg: "#fff3e4",
          fg: "#c2410c",
          title: "encrypted",
          caption,
        }
      : {
          mode: "plain",
          bg: "#ffffff",
          fg: "#24345f",
          title: "GET /",
          caption,
        };
  }
  return {
    mode: "plain",
    bg: layer.color,
    fg: "#ffffff",
    title: block.title,
    caption,
  };
}

function sideColor(id: PduBlockId, frame: OsiFrame): number {
  if (frame.bits) return 0x1f2a44;
  if (id === "data") return frame.encrypted ? 0xfde4c8 : 0xffffff;
  return new THREE.Color(osiLayer(PDU_BLOCKS[id].layer).color).getHex();
}

/** A repeatable string of bits, so a block keeps its pattern between frames. */
function bitString(seed: number, length: number): string {
  let s = seed * 9301 + 49297;
  let out = "";
  for (let i = 0; i < length; i++) {
    s = (s * 9301 + 49297) % 233280;
    out += s / 233280 > 0.5 ? "1" : "0";
  }
  return out;
}

type Face = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  tex: THREE.CanvasTexture;
  key: string;
};

const PX = 420; // texture pixels per scene unit

function makeFace(w: number, h: number): Face {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * PX);
  canvas.height = Math.round(h * PX);
  const ctx = canvas.getContext("2d")!;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return { canvas, ctx, tex, key: "" };
}

function fitFont(
  ctx: CanvasRenderingContext2D,
  text: string,
  weight: number,
  size: number,
  family: string,
  maxW: number,
): number {
  let px = size;
  ctx.font = `${weight} ${px}px ${family}`;
  while (px > 10 && ctx.measureText(text).width > maxW) {
    px -= 2;
    ctx.font = `${weight} ${px}px ${family}`;
  }
  return px;
}

function paintFace(face: Face, look: Look, seed: number, family: string) {
  const key = JSON.stringify(look);
  if (face.key === key) return;
  face.key = key;
  const { ctx, canvas } = face;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = look.bg;
  ctx.fillRect(0, 0, w, h);

  if (look.mode === "hatch") {
    ctx.save();
    ctx.strokeStyle = look.fg;
    ctx.globalAlpha = 0.22;
    ctx.lineWidth = 6;
    for (let x = -h; x < w; x += 22) {
      ctx.beginPath();
      ctx.moveTo(x, h);
      ctx.lineTo(x + h, 0);
      ctx.stroke();
    }
    ctx.restore();
  }

  if (look.mode === "bits") {
    const mono = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    const size = Math.max(14, Math.round(h * 0.16));
    ctx.font = `500 ${size}px ${mono}`;
    ctx.fillStyle = look.fg;
    ctx.globalAlpha = 0.55;
    const per = Math.ceil(w / (size * 0.62)) + 2;
    let row = 0;
    for (let y = size; y < h + size; y += size * 1.05) {
      ctx.fillText(bitString(seed * 31 + row, per), 4, y);
      row += 1;
    }
    ctx.globalAlpha = 1;
    // A dark band behind the name so it reads over the bits.
    ctx.fillStyle = "rgba(31,42,68,0.82)";
    ctx.fillRect(0, h * 0.24, w, h * 0.52);
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const titleColor = look.mode === "bits" ? "#ffffff" : look.fg;
  const titlePx = fitFont(
    ctx,
    look.title,
    700,
    Math.round(h * 0.34),
    family,
    w * 0.86,
  );
  ctx.fillStyle = titleColor;
  ctx.fillText(look.title, w / 2, h * (look.caption ? 0.4 : 0.5));
  if (look.caption) {
    fitFont(
      ctx,
      look.caption,
      500,
      Math.round(titlePx * 0.62),
      family,
      w * 0.9,
    );
    ctx.globalAlpha = look.mode === "bits" ? 0.85 : 0.82;
    ctx.fillText(look.caption, w / 2, h * 0.72);
    ctx.globalAlpha = 1;
  }
  face.tex.needsUpdate = true;
}

/** A polyline with rounded corners, as one curve. */
function roundedPath(points: THREE.Vector3[], r: number) {
  const path = new THREE.CurvePath<THREE.Vector3>();
  let from = points[0].clone();
  for (let i = 1; i < points.length - 1; i++) {
    const a = points[i - 1];
    const p = points[i];
    const b = points[i + 1];
    const rr = Math.min(r, p.distanceTo(a) * 0.45, p.distanceTo(b) * 0.45);
    const inDir = p.clone().sub(a).normalize();
    const outDir = b.clone().sub(p).normalize();
    const start = p.clone().addScaledVector(inDir, -rr);
    const end = p.clone().addScaledVector(outDir, rr);
    path.add(new THREE.LineCurve3(from, start));
    path.add(new THREE.QuadraticBezierCurve3(start, p.clone(), end));
    from = end;
  }
  path.add(new THREE.LineCurve3(from, points[points.length - 1].clone()));
  return path;
}

function floorKey(side: Side, n: number) {
  return `${side}-${n}`;
}

/**
 * The OSI journey bench. A laptop stack and a server stack, seven floors
 * each, with a switch and a router between them. The data unit sits on the
 * floor the step is about, gains a block on each floor down, and loses one on
 * each floor up. The orange line is the path it has taken so far.
 */
export function OsiJourneyScene({ frame, preview = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(frame);

  useEffect(() => {
    frameRef.current = frame;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const family =
      getComputedStyle(document.body).fontFamily ||
      "Helvetica, Arial, sans-serif";

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0xfafafa, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
    let controls: OrbitControls | null = null;
    let releaseCtrlPan = () => {};
    if (!preview) {
      controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 3;
      controls.maxDistance = 120;
      controls.maxPolarAngle = Math.PI * 0.47;
      releaseCtrlPan = bindCtrlPan(controls);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 2.1));
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(4, 10, 7);
    scene.add(key);

    const root = new THREE.Group();
    scene.add(root);

    // ── Building helpers ──────────────────────────────────────────────────
    const solids = new Map<number, THREE.MeshLambertMaterial>();
    const solid = (color: number) => {
      let mat = solids.get(color);
      if (!mat) {
        mat = new THREE.MeshLambertMaterial({ color });
        solids.set(color, mat);
      }
      return mat;
    };
    const edgeMat = new THREE.LineBasicMaterial({ color: LINE });

    function box(
      w: number,
      h: number,
      d: number,
      color: number,
      edges = true,
    ): THREE.Group {
      const g = new THREE.Group();
      const geo = new THREE.BoxGeometry(w, h, d);
      g.add(new THREE.Mesh(geo, solid(color)));
      if (edges)
        g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat));
      return g;
    }
    function put<T extends THREE.Object3D>(
      parent: THREE.Object3D,
      obj: T,
      x: number,
      y: number,
      z: number,
    ): T {
      obj.position.set(x, y, z);
      parent.add(obj);
      return obj;
    }
    function shadow(w: number, d: number, x: number, z: number) {
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(w, d),
        new THREE.MeshBasicMaterial({
          color: LINE,
          transparent: true,
          opacity: 0.06,
          depthWrite: false,
        }),
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(x, 0.004, z);
      root.add(mesh);
    }

    // ── Small props, one per floor. Origin on the shelf, about 1 unit tall.
    function propScreen() {
      const g = new THREE.Group();
      put(g, box(1.4, 0.05, 0.62, 0xead7b8), 0, 0.34, 0);
      for (const [x, z] of [
        [-0.62, -0.24],
        [0.62, -0.24],
        [-0.62, 0.24],
        [0.62, 0.24],
      ])
        put(g, box(0.05, 0.32, 0.05, 0xc9a77a), x, 0.16, z);
      put(g, box(0.07, 0.1, 0.07, BODY), 0, 0.42, -0.12);
      put(g, box(0.96, 0.56, 0.05, BODY), 0, 0.74, -0.12);
      put(g, box(0.84, 0.42, 0.01, SCREEN, false), 0, 0.72, -0.092);
      put(g, box(0.84, 0.06, 0.012, FACE, false), 0, 0.96, -0.092);
      for (let i = 0; i < 3; i++)
        put(
          g,
          box(0.5 - i * 0.12, 0.03, 0.012, 0xffffff, false),
          -0.12,
          0.84 - i * 0.08,
          -0.088,
        );
      return g;
    }
    function propLock() {
      const g = new THREE.Group();
      put(g, box(0.95, 0.3, 0.5, 0x3f4a5f), -0.35, 0.15, 0);
      put(g, box(0.6, 0.12, 0.01, 0xe9eef8, false), -0.35, 0.17, 0.256);
      put(g, box(0.4, 0.32, 0.2, 0xf2c94c), 0.55, 0.16, 0);
      const shackle = new THREE.Mesh(
        new THREE.TorusGeometry(0.13, 0.035, 8, 20, Math.PI),
        solid(0x9aa3b5),
      );
      put(g, shackle, 0.55, 0.32, 0);
      put(g, box(0.05, 0.1, 0.01, LINE, false), 0.55, 0.14, 0.106);
      return g;
    }
    function propSession() {
      const g = new THREE.Group();
      for (const [x, ry] of [
        [-0.25, 0.25],
        [0.25, -0.25],
      ]) {
        const card = box(0.55, 0.36, 0.03, BODY);
        card.rotation.y = ry;
        put(g, card, x, 0.2, 0);
        const stripe = box(0.45, 0.06, 0.01, 0xd9a40e, false);
        stripe.rotation.y = ry;
        put(g, stripe, x, 0.28, 0.02);
      }
      const ringMat = solid(0x6b7aa1);
      const r1 = new THREE.Mesh(
        new THREE.TorusGeometry(0.11, 0.025, 8, 24),
        ringMat,
      );
      const r2 = r1.clone();
      r2.rotation.y = Math.PI / 2;
      put(g, r1, -0.06, 0.62, 0);
      put(g, r2, 0.08, 0.62, 0);
      return g;
    }
    function propPorts() {
      const g = new THREE.Group();
      put(g, box(1.15, 0.34, 0.42, BODY), 0, 0.17, 0);
      for (let i = 0; i < 4; i++) {
        put(
          g,
          box(0.17, 0.13, 0.02, LINE, false),
          -0.39 + i * 0.26,
          0.17,
          0.215,
        );
        put(
          g,
          box(0.05, 0.03, 0.02, i === 2 ? ORANGE : LED, false),
          -0.39 + i * 0.26,
          0.28,
          0.215,
        );
      }
      return g;
    }
    function propSign() {
      const g = new THREE.Group();
      put(g, box(0.06, 0.92, 0.06, POST), 0, 0.46, 0);
      put(g, box(0.62, 0.17, 0.04, FACE), 0.2, 0.78, 0.04);
      put(g, box(0.62, 0.17, 0.04, BODY), -0.2, 0.54, 0.04);
      put(g, box(0.3, 0.04, 0.3, POST), 0, 0.02, 0);
      return g;
    }
    function propNic() {
      const g = new THREE.Group();
      put(g, box(0.95, 0.05, 0.52, 0x2f9e6a), 0, 0.14, 0);
      put(g, box(0.24, 0.05, 0.24, LINE), -0.1, 0.19, 0);
      put(g, box(0.04, 0.42, 0.52, 0xb8c0cc), 0.5, 0.21, 0);
      put(g, box(0.07, 0.15, 0.17, LINE), 0.54, 0.24, 0.1);
      put(g, box(0.06, 0.12, 0.06, POST), -0.35, 0.06, 0.18);
      put(g, box(0.06, 0.12, 0.06, POST), 0.3, 0.06, -0.18);
      return g;
    }
    function propCable() {
      const g = new THREE.Group();
      const coil = solid(CABLE);
      for (let i = 0; i < 3; i++) {
        const loop = new THREE.Mesh(
          new THREE.TorusGeometry(0.28, 0.045, 8, 28),
          coil,
        );
        loop.rotation.x = Math.PI / 2;
        put(g, loop, 0, 0.05 + i * 0.09, 0);
      }
      put(g, box(0.18, 0.12, 0.26, 0xe3e9f5), 0.55, 0.06, 0.1);
      put(g, box(0.12, 0.06, 0.08, 0xd4a017, false), 0.55, 0.08, 0.26);
      return g;
    }
    const PROPS = [
      propCable,
      propNic,
      propSign,
      propPorts,
      propSession,
      propLock,
      propScreen,
    ];

    // ── Devices, in the style of a network diagram ───────────────────────
    function buildLaptop() {
      const g = new THREE.Group();
      put(g, box(1.7, 0.09, 1.15, BODY), 0, 0.045, 0);
      put(g, box(1.4, 0.012, 0.5, FACE, false), 0, 0.096, 0.08);
      put(g, box(0.5, 0.012, 0.24, FACE, false), 0, 0.096, 0.42);
      const lid = put(g, new THREE.Group(), 0, 0.09, -0.56);
      lid.rotation.x = -0.28;
      put(lid, box(1.7, 1.1, 0.06, BODY), 0, 0.55, 0);
      put(lid, box(1.5, 0.9, 0.01, SCREEN, false), 0, 0.53, 0.036);
      put(lid, box(1.5, 0.1, 0.012, FACE, false), 0, 0.93, 0.037);
      for (let i = 0; i < 3; i++)
        put(
          lid,
          box(0.9 - i * 0.2, 0.05, 0.012, 0xffffff, false),
          -0.2,
          0.75 - i * 0.12,
          0.04,
        );
      return g;
    }
    function buildServer() {
      const g = new THREE.Group();
      put(g, box(1.4, 1.9, 1.3, BODY), 0, 0.95, 0);
      for (let i = 0; i < 3; i++) {
        const y = 1.55 - i * 0.36;
        put(g, box(1.1, 0.27, 0.02, FACE), -0.02, y, 0.66);
        put(g, box(0.07, 0.07, 0.02, LED, false), 0.42, y, 0.672);
      }
      for (let i = 0; i < 3; i++)
        put(
          g,
          box(1.1, 0.035, 0.02, 0xc7d2ee, false),
          -0.02,
          0.42 - i * 0.09,
          0.66,
        );
      return g;
    }
    function buildSwitch() {
      const g = new THREE.Group();
      put(g, box(2.0, 0.42, 1.1, BODY), 0, 0.21, 0);
      put(g, box(1.84, 0.27, 0.01, FACE, false), 0, 0.21, 0.556);
      for (let i = 0; i < 8; i++) {
        put(g, box(0.15, 0.12, 0.02, LINE, false), -0.7 + i * 0.2, 0.19, 0.565);
        put(g, box(0.05, 0.03, 0.02, LED, false), -0.7 + i * 0.2, 0.3, 0.565);
      }
      return g;
    }
    function buildRouter() {
      const g = new THREE.Group();
      put(g, box(1.8, 0.5, 1.2, BODY), 0, 0.25, 0);
      put(g, box(1.5, 0.012, 0.9, FACE, false), 0, 0.506, 0);
      put(g, box(0.7, 0.22, 0.01, FACE), -0.4, 0.24, 0.605);
      for (let i = 0; i < 4; i++)
        put(g, box(0.08, 0.05, 0.02, LED, false), 0.32 + i * 0.15, 0.34, 0.61);
      // A short antenna, so it stays under the data unit hovering above.
      const geo = new THREE.CylinderGeometry(0.035, 0.035, 0.55, 10);
      put(g, new THREE.Mesh(geo, solid(BODY)), -0.68, 0.78, -0.45);
      put(
        g,
        new THREE.LineSegments(new THREE.EdgesGeometry(geo, 40), edgeMat),
        -0.68,
        0.78,
        -0.45,
      );
      put(
        g,
        new THREE.Mesh(new THREE.SphereGeometry(0.07, 14, 10), solid(LINE)),
        -0.68,
        1.07,
        -0.45,
      );
      return g;
    }

    // ── Floor grid ────────────────────────────────────────────────────────
    const grid = new THREE.GridHelper(64, 64, 0xe3e6ec, 0xe3e6ec);
    grid.position.y = 0.001;
    root.add(grid);

    // ── The two stacks ────────────────────────────────────────────────────
    const walls = new Map<
      string,
      { mat: THREE.MeshLambertMaterial; base: THREE.Color; hot: THREE.Color }
    >();
    const anchors = new Map<string, THREE.Object3D>();

    function buildStack(side: Side) {
      const x0 = stackX(side);
      const toward = inward(side);
      shadow(STACK_W + 0.7, STACK_D + 0.7, x0 + 0.15, 0.15);
      for (const layer of OSI_LAYERS) {
        const y0 = floorY(layer.n);
        put(root, box(STACK_W, SLAB, STACK_D, 0xffffff), x0, y0 + SLAB / 2, 0);
        put(
          root,
          box(STACK_W, SLAB, 0.05, new THREE.Color(layer.color).getHex()),
          x0,
          y0 + SLAB / 2,
          STACK_D / 2 + 0.026,
        );
        const base = new THREE.Color(layer.wall);
        const mat = new THREE.MeshLambertMaterial({ color: base.clone() });
        const wallGeo = new THREE.BoxGeometry(STACK_W - 0.1, FH - SLAB, 0.06);
        const wall = new THREE.Group();
        wall.add(new THREE.Mesh(wallGeo, mat));
        wall.add(
          new THREE.LineSegments(new THREE.EdgesGeometry(wallGeo), edgeMat),
        );
        put(root, wall, x0, y0 + SLAB + (FH - SLAB) / 2, -STACK_D / 2 + 0.03);
        walls.set(floorKey(side, layer.n), {
          mat,
          base,
          hot: base.clone().lerp(new THREE.Color(layer.color), 0.5),
        });

        const prop = PROPS[layer.n - 1]();
        prop.scale.setScalar(0.85);
        put(root, prop, x0 - toward * 1.35, y0 + SLAB, -0.55);

        const anchor = new THREE.Object3D();
        put(
          root,
          anchor,
          x0 - toward * (STACK_W / 2 + 0.12),
          y0 + FH * 0.55,
          STACK_D / 2,
        );
        anchors.set(floorKey(side, layer.n), anchor);
      }
      put(root, box(STACK_W, SLAB, STACK_D, 0xffffff), x0, ROOF + SLAB / 2, 0);
      const postH = ROOF + 0.35;
      for (const sx of [-1, 1])
        for (const sz of [-1, 1])
          put(
            root,
            box(0.09, postH, 0.09, POST),
            x0 + sx * (STACK_W / 2 + 0.03),
            postH / 2,
            sz * (STACK_D / 2 + 0.03),
          );
      const top = side === "laptop" ? buildLaptop() : buildServer();
      top.scale.setScalar(side === "laptop" ? 1.35 : 1);
      put(root, top, x0, ROOF + SLAB, 0);
      const label = new THREE.Object3D();
      put(root, label, x0, ROOF + SLAB + (side === "laptop" ? 1.85 : 2.15), 0);
      anchors.set(side, label);
    }
    buildStack("laptop");
    buildStack("server");

    // ── Switch and router, with a ring that lights under the busy one ────
    const rings = new Map<OsiDevice, THREE.MeshBasicMaterial>();
    for (const [device, x, build] of [
      ["switch", SW_X, buildSwitch],
      ["router", RT_X, buildRouter],
    ] as const) {
      shadow(2.5, 1.6, x + 0.1, DEV_Z + 0.1);
      put(root, build(), x, 0, DEV_Z);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ORANGE,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(1.35, 1.5, 48),
        ringMat,
      );
      ring.rotation.x = -Math.PI / 2;
      put(root, ring, x, 0.006, DEV_Z);
      rings.set(device, ringMat);
      const label = new THREE.Object3D();
      put(root, label, x, 0, DEV_Z + 0.95);
      anchors.set(device, label);
    }

    // ── Cables ────────────────────────────────────────────────────────────
    const cableMat = solid(CABLE);
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    for (const pts of [
      [
        V(LX + ROUTE_IN, 0.06, STACK_D / 2),
        V(LX + ROUTE_IN, 0.06, DEV_Z),
        V(SW_X - 1.0, 0.06, DEV_Z),
      ],
      [V(SW_X + 1.0, 0.06, DEV_Z), V(RT_X - 0.9, 0.06, DEV_Z)],
      [
        V(RT_X + 0.9, 0.06, DEV_Z),
        V(RX - ROUTE_IN, 0.06, DEV_Z),
        V(RX - ROUTE_IN, 0.06, STACK_D / 2),
      ],
    ]) {
      const path = roundedPath(pts, 0.4);
      root.add(
        new THREE.Mesh(new THREE.TubeGeometry(path, 80, 0.06, 8), cableMat),
      );
    }

    // ── The path of the request ───────────────────────────────────────────
    const top7 = floorY(7) + FH * 0.75;
    const route = roundedPath(
      [
        V(LX + ROUTE_IN, top7, ROUTE_Z),
        V(LX + ROUTE_IN, ROUTE_Y, ROUTE_Z),
        V(LX + ROUTE_IN, ROUTE_Y, DEV_Z),
        V(RX - ROUTE_IN, ROUTE_Y, DEV_Z),
        V(RX - ROUTE_IN, ROUTE_Y, ROUTE_Z),
        V(RX - ROUTE_IN, top7, ROUTE_Z),
      ],
      0.45,
    );
    const ROUTE_SEGS = 900;
    const ROUTE_RADIAL = 8;
    root.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(route, 300, 0.025, 6),
        new THREE.MeshBasicMaterial({ color: 0xd3d8e2 }),
      ),
    );
    const routeGeo = new THREE.TubeGeometry(
      route,
      ROUTE_SEGS,
      0.07,
      ROUTE_RADIAL,
    );
    routeGeo.setDrawRange(0, 0);
    root.add(new THREE.Mesh(routeGeo, solid(ORANGE)));
    const head = new THREE.Mesh(
      new THREE.ConeGeometry(0.17, 0.4, 16),
      solid(ORANGE),
    );
    root.add(head);

    const samples = Array.from({ length: 1501 }, (_, i) =>
      route.getPointAt(i / 1500),
    );
    function uNear(p: THREE.Vector3) {
      let best = 0;
      let bestD = Infinity;
      samples.forEach((s, i) => {
        const d = s.distanceToSquared(p);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      return best / 1500;
    }
    function routeTarget(f: OsiFrame): number {
      if (f.arrived) return 1;
      if (f.device === null) return 0;
      if (f.device === "switch") return uNear(V(SW_X, ROUTE_Y, DEV_Z));
      if (f.device === "router") return uNear(V(RT_X, ROUTE_Y, DEV_Z));
      const x = f.device === "laptop" ? LX + ROUTE_IN : RX - ROUTE_IN;
      return uNear(V(x, floorY(f.layer ?? 1) + FH * 0.55, ROUTE_Z));
    }

    // ── The data unit ─────────────────────────────────────────────────────
    const packet = new THREE.Group();
    root.add(packet);
    const packetTip = new THREE.Object3D();
    packet.add(packetTip);

    type BlockView = {
      id: PduBlockId;
      group: THREE.Group;
      side: THREE.MeshLambertMaterial;
      edge: THREE.LineBasicMaterial;
      front: Face;
      top: Face;
      present: boolean;
      grow: number;
      drop: number;
      lift: number;
      x: number;
    };
    const blocks = PDU_ORDER.map((id): BlockView => {
      const w = PDU_BLOCKS[id].width;
      const geo = new THREE.BoxGeometry(w, BH, BD);
      const side = new THREE.MeshLambertMaterial({ color: 0xffffff });
      const front = makeFace(w, BH);
      const top = makeFace(w, BD);
      const frontMat = new THREE.MeshBasicMaterial({ map: front.tex });
      const topMat = new THREE.MeshBasicMaterial({ map: top.tex });
      const mesh = new THREE.Mesh(geo, [
        side,
        side,
        topMat,
        side,
        frontMat,
        side,
      ]);
      const edge = new THREE.LineBasicMaterial({ color: LINE });
      const group = new THREE.Group();
      group.add(mesh);
      group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), edge));
      group.visible = false;
      group.scale.set(1, 0.001, 1);
      packet.add(group);
      return {
        id,
        group,
        side,
        edge,
        front,
        top,
        present: false,
        grow: 0,
        drop: 0,
        lift: 0,
        x: 0,
      };
    });

    function packetPose(f: OsiFrame): { pos: THREE.Vector3; scale: number } {
      if (f.device === null || f.blocks.length === 0) {
        return { pos: V(LX - 0.25, floorY(7) + SLAB + BH / 2, 0.4), scale: 0 };
      }
      if (isStack(f.device)) {
        return {
          pos: V(
            stackX(f.device) - inward(f.device) * 0.25,
            floorY(f.layer ?? 1) + SLAB + BH / 2,
            0.4,
          ),
          scale: 1,
        };
      }
      return {
        pos: V(f.device === "switch" ? SW_X : RT_X, HOVER, DEV_Z),
        scale: ON_DEVICE,
      };
    }

    // ── Camera framing ────────────────────────────────────────────────────
    let inset = 0;
    function measureInset() {
      if (preview) return 0;
      const card = document.querySelector<HTMLElement>(".floating-lab-card");
      const w = canvas!.clientWidth;
      if (!card || w < 900) return 0;
      const rect = card.getBoundingClientRect();
      const area = canvas!.getBoundingClientRect();
      const right = rect.right - area.left + 16;
      return right > 0 && right < w * 0.6 ? right : 0;
    }
    function applyView() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      if (w < 2 || h < 2) return;
      camera.aspect = w / h;
      // The left card covers the bench. A full half-card shift parks the
      // stacks too far right, so only a quarter of that cover is used.
      if (inset > 0) camera.setViewOffset(w, h, -inset / 4, 0, w, h);
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
    }
    function focusFor(f: OsiFrame): {
      center: THREE.Vector3;
      radius: number;
      dir: THREE.Vector3;
    } {
      if (preview || f.device === null || f.arrived)
        return {
          center: V(0, 3.6, 0.4),
          radius: preview ? 10.5 : 17,
          dir: DIR_WIDE,
        };
      if (isStack(f.device))
        return {
          center: V(
            stackX(f.device) - inward(f.device) * 0.25,
            floorY(f.layer ?? 1) + FH * 0.5,
            0.3,
          ),
          radius: 3.9,
          dir: DIR_FLOOR,
        };
      return {
        center: V(f.device === "switch" ? SW_X : RT_X, 0.95, DEV_Z),
        radius: 2.9,
        dir: DIR,
      };
    }
    function poseFor(f: OsiFrame) {
      const { center, radius, dir } = focusFor(f);
      const w = canvas!.clientWidth || 1;
      const frac = Math.max(0.35, (w - inset) / w);
      const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const d = Math.max(radius / t, radius / (t * camera.aspect * frac));
      return { pos: center.clone().addScaledVector(dir, d), target: center };
    }

    let glide: {
      t: number;
      fromPos: THREE.Vector3;
      toPos: THREE.Vector3;
      fromTarget: THREE.Vector3;
      toTarget: THREE.Vector3;
    } | null = null;
    const target = new THREE.Vector3();
    // Shift-drag offset. Each step still focuses, then this shift is added
    // back so the bench stays where the user left it.
    const pan = new THREE.Vector3();
    const authoredTarget = new THREE.Vector3();
    const stopGlide = () => {
      glide = null;
    };
    controls?.addEventListener("start", stopGlide);

    function resize() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      if (w < 2 || h < 2) return;
      renderer.setSize(w, h, false);
      inset = measureInset();
      applyView();
      if (!glide) {
        const pose = poseFor(frameRef.current);
        authoredTarget.copy(pose.target);
        camera.position.copy(pose.pos).add(pan);
        target.copy(pose.target).add(pan);
        camera.lookAt(target);
        if (controls) {
          controls.target.copy(target);
          controls.update();
        }
      }
    }
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // ── Frame changes ─────────────────────────────────────────────────────
    let shown: OsiFrame | null = null;
    let routeU = 0;
    let travel: {
      t: number;
      from: THREE.Vector3;
      to: THREE.Vector3;
      fromScale: number;
      toScale: number;
      hop: number;
    } | null = null;

    function enter(f: OsiFrame, first: boolean) {
      const pose = packetPose(f);
      if (first || packet.scale.x < 0.01) {
        packet.position.copy(pose.pos);
        packet.scale.setScalar(pose.scale);
        travel = null;
      } else {
        const far = packet.position.distanceTo(pose.pos);
        travel = {
          t: 0,
          from: packet.position.clone(),
          to: pose.pos,
          fromScale: packet.scale.x,
          toScale: pose.scale,
          hop: far > 3 ? 1.1 : far > 0.2 ? 0.35 : 0,
        };
      }
      const present = new Set(f.blocks);
      for (const view of blocks) {
        const now = present.has(view.id);
        if (now && !view.present) {
          view.drop = first ? 0 : 0.9;
          view.group.visible = true;
        }
        view.present = now;
        if (now) {
          paintFace(
            view.front,
            lookFor(view.id, f),
            PDU_ORDER.indexOf(view.id),
            family,
          );
          paintFace(
            view.top,
            lookFor(view.id, f),
            PDU_ORDER.indexOf(view.id) + 7,
            family,
          );
          view.side.color.setHex(sideColor(view.id, f));
          view.edge.color.setHex(f.focus?.includes(view.id) ? ORANGE : LINE);
        }
      }
      // Lay out the blocks that remain, centred.
      const order = PDU_ORDER.filter((id) => present.has(id));
      const total =
        order.reduce((sum, id) => sum + PDU_BLOCKS[id].width, 0) +
        GAP * Math.max(0, order.length - 1);
      let x = -total / 2;
      for (const id of order) {
        const view = blocks.find((b) => b.id === id)!;
        view.x = x + PDU_BLOCKS[id].width / 2;
        if (view.drop > 0) view.group.position.x = view.x;
        x += PDU_BLOCKS[id].width + GAP;
      }
      packetTip.position.set(total / 2, BH / 2, BD / 2);

      if (!first && controls) {
        inset = measureInset();
        applyView();
        const pose = poseFor(f);
        authoredTarget.copy(pose.target);
        glide = {
          t: 0,
          fromPos: camera.position.clone(),
          toPos: pose.pos.clone().add(pan),
          fromTarget: controls.target.clone(),
          toTarget: pose.target.clone().add(pan),
        };
      }
    }

    // ── Labels over the canvas ────────────────────────────────────────────
    const tmp = new THREE.Vector3();
    function project(obj: THREE.Object3D, w: number, h: number) {
      obj.getWorldPosition(tmp);
      tmp.project(camera);
      return {
        x: (tmp.x * 0.5 + 0.5) * w,
        y: (-tmp.y * 0.5 + 0.5) * h,
        behind: tmp.z > 1,
      };
    }
    function placeLabels() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      if (w < 2 || h < 2) return;
      for (const el of host!.querySelectorAll<HTMLElement>("[data-osi-at]")) {
        const anchor = anchors.get(el.dataset.osiAt ?? "");
        if (!anchor) continue;
        const at = project(anchor, w, h);
        el.style.opacity = at.behind ? "0" : "";
        el.style.transform = `translate(${at.x}px, ${at.y}px) ${el.dataset.osiAlign ?? ""}`;
      }

      const note = host!.querySelector<HTMLElement>("[data-osi-note]");
      const lead = host!.querySelector<SVGLineElement>("[data-osi-lead]");
      const dot = host!.querySelector<SVGCircleElement>("[data-osi-dot]");
      const hint = host!.querySelector<HTMLElement>("[data-osi-hint]");
      if (hint) hint.style.left = `${Math.max(16, inset)}px`;
      if (!note || !lead || !dot || packet.scale.x < 0.05) {
        if (note) note.style.opacity = "0";
        lead?.setAttribute("opacity", "0");
        dot?.setAttribute("opacity", "0");
        return;
      }
      const tip = project(packetTip, w, h);
      const nw = note.offsetWidth || 280;
      const nh = note.offsetHeight || 90;
      let x = tip.x + 48;
      let y = tip.y - nh - 56;
      x = Math.max(inset + 8, Math.min(x, w - nw - 16));
      y = Math.max(76, Math.min(y, h - nh - 16));
      note.style.opacity = "1";
      note.style.transform = `translate(${x}px, ${y}px)`;
      const fromX = tip.x < x ? x : x + nw;
      const fromY = Math.max(y + 10, Math.min(tip.y, y + nh - 10));
      lead.setAttribute("x1", String(fromX));
      lead.setAttribute("y1", String(fromY));
      lead.setAttribute("x2", String(tip.x));
      lead.setAttribute("y2", String(tip.y));
      lead.setAttribute("opacity", "1");
      dot.setAttribute("cx", String(tip.x));
      dot.setAttribute("cy", String(tip.y));
      dot.setAttribute("opacity", "1");
    }

    // ── Animation ─────────────────────────────────────────────────────────
    const ease = (t: number) => 1 - (1 - t) ** 3;
    const hotFloor = { key: "" };
    let raf = 0;
    let last = performance.now();
    /** Per-frame easing at 60 fps, scaled so a slow machine keeps the same pace. */
    const towards = (rate: number, steps: number) => 1 - (1 - rate) ** steps;

    function tick(now: number) {
      raf = requestAnimationFrame(tick);
      const steps = Math.min(4, Math.max(0, (now - last) / (1000 / 60)));
      last = now;
      const f = frameRef.current;
      if (f !== shown) {
        enter(f, shown === null);
        shown = f;
        hotFloor.key = isStack(f.device)
          ? floorKey(f.device, f.layer ?? 1)
          : "";
      }

      // Packet travel between floors and boxes.
      if (travel) {
        travel.t = Math.min(1, travel.t + 0.022 * steps);
        const k = ease(travel.t);
        packet.position.lerpVectors(travel.from, travel.to, k);
        packet.position.y += Math.sin(Math.PI * travel.t) * travel.hop;
        packet.scale.setScalar(
          travel.fromScale + (travel.toScale - travel.fromScale) * k,
        );
        if (travel.t >= 1) travel = null;
      }
      for (const view of blocks) {
        const goal = view.present ? 1 : 0;
        view.grow += (goal - view.grow) * towards(0.14, steps);
        view.drop += (0 - view.drop) * towards(0.12, steps);
        const focused = view.present && f.focus?.includes(view.id);
        view.lift += ((focused ? 0.14 : 0) - view.lift) * towards(0.15, steps);
        view.group.position.x +=
          (view.x - view.group.position.x) * towards(0.16, steps);
        const rise = view.present ? view.drop : (1 - view.grow) * 0.6;
        view.group.position.y = rise + view.lift;
        view.group.scale.set(1, Math.max(0.001, view.grow), 1);
        if (!view.present && view.grow < 0.02) view.group.visible = false;
      }

      // Route grows to where the data is.
      const goalU = routeTarget(f);
      routeU += (goalU - routeU) * towards(0.06, steps);
      if (Math.abs(goalU - routeU) < 0.0005) routeU = goalU;
      const segs = Math.floor(routeU * ROUTE_SEGS);
      routeGeo.setDrawRange(0, segs * ROUTE_RADIAL * 6);
      if (routeU > 0.004 && routeU < 0.998) {
        head.visible = true;
        head.position.copy(route.getPointAt(routeU));
        const dir = route.getTangentAt(routeU);
        head.quaternion.setFromUnitVectors(V(0, 1, 0), dir);
      } else {
        head.visible = false;
      }

      // The floor the step is about takes the layer's colour.
      for (const [k, wall] of walls) {
        wall.mat.color.lerp(
          k === hotFloor.key ? wall.hot : wall.base,
          towards(0.12, steps),
        );
      }
      for (const [device, mat] of rings) {
        const on = f.device === device;
        const goal = on ? 0.55 + 0.25 * Math.sin(now / 260) : 0;
        mat.opacity += (goal - mat.opacity) * towards(0.15, steps);
      }

      if (preview) {
        root.rotation.y = Math.sin(now / 5200) * 0.22;
      } else if (controls) {
        if (glide) {
          glide.t = Math.min(1, glide.t + 0.02 * steps);
          const k = ease(glide.t);
          camera.position.lerpVectors(glide.fromPos, glide.toPos, k);
          controls.target.lerpVectors(glide.fromTarget, glide.toTarget, k);
          if (glide.t >= 1) glide = null;
        }
        controls.update();
        if (!glide) pan.copy(controls.target).sub(authoredTarget);
        placeLabels();
      }
      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      releaseCtrlPan();
      controls?.removeEventListener("start", stopGlide);
      controls?.dispose();
      const seen = new Set<object>();
      scene.traverse((child) => {
        if (
          !(child instanceof THREE.Mesh) &&
          !(child instanceof THREE.LineSegments)
        )
          return;
        if (!seen.has(child.geometry)) {
          seen.add(child.geometry);
          child.geometry.dispose();
        }
        const list = Array.isArray(child.material)
          ? child.material
          : [child.material];
        for (const mat of list) {
          if (seen.has(mat)) continue;
          seen.add(mat);
          if ("map" in mat && mat.map instanceof THREE.Texture)
            mat.map.dispose();
          mat.dispose();
        }
      });
      renderer.dispose();
    };
  }, [preview]);

  const activeFloor =
    isStack(frame.device) && frame.layer
      ? floorKey(frame.device, frame.layer)
      : "";
  const bytes = pduBytes(frame);

  return (
    <div
      ref={hostRef}
      className={`relative h-full w-full overflow-hidden bg-[#fafafa] ${preview ? "pointer-events-none" : ""}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {!preview && (
        <>
          <style>{`
            @keyframes osi-note {
              from { opacity: 0; scale: 0.96; }
              to { opacity: 1; scale: 1; }
            }
          `}</style>
          {(["laptop", "server"] as const).flatMap((side) =>
            OSI_LAYERS.map((layer) => {
              const id = floorKey(side, layer.n);
              const hot = id === activeFloor;
              return (
                <div
                  key={id}
                  data-osi-at={id}
                  data-osi-align={
                    side === "laptop"
                      ? "translate(-100%, -50%)"
                      : "translate(0, -50%)"
                  }
                  className={`pointer-events-none absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white py-0.5 pl-0.5 pr-2 font-sans text-[11px] font-medium leading-none text-[#262626] transition-shadow duration-300 ${
                    hot
                      ? "shadow-[0_6px_18px_rgba(23,23,23,0.16)] ring-2"
                      : "shadow-[0_1px_3px_rgba(23,23,23,0.08)] ring-1 ring-[#e4e4e7]"
                  }`}
                  style={
                    hot
                      ? ({ "--tw-ring-color": layer.color } as CSSProperties)
                      : undefined
                  }
                >
                  <span
                    className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] font-semibold text-white"
                    style={{ backgroundColor: layer.color }}
                  >
                    {layer.n}
                  </span>
                  {layer.name}
                </div>
              );
            }),
          )}
          {(Object.keys(OSI_HOSTS) as OsiDevice[]).map((device) => {
            const host = OSI_HOSTS[device];
            const hot = frame.device === device;
            return (
              <div
                key={device}
                data-osi-at={device}
                data-osi-align={
                  isStack(device)
                    ? "translate(-50%, -100%)"
                    : "translate(-50%, 0)"
                }
                className={`pointer-events-none absolute left-0 top-0 rounded-md bg-white/95 px-2 py-1 text-center ring-1 transition-shadow duration-300 ${
                  hot
                    ? "shadow-[0_6px_18px_rgba(23,23,23,0.14)] ring-[#f59e0b]"
                    : "shadow-[0_1px_3px_rgba(23,23,23,0.08)] ring-[#e4e4e7]"
                }`}
              >
                <p className="m-0 font-sans text-[12px] font-semibold leading-tight text-[#24345f]">
                  {host.name}
                </p>
                {host.addresses.map((line) => (
                  <p
                    key={line}
                    className="m-0 font-mono text-[10.5px] leading-tight text-[#525252]"
                  >
                    {line}
                  </p>
                ))}
              </div>
            );
          })}
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            <line
              data-osi-lead
              stroke="#f59e0b"
              strokeWidth="1.25"
              opacity="0"
            />
            <circle
              data-osi-dot
              r="4"
              fill="#f59e0b"
              stroke="#ffffff"
              strokeWidth="1.5"
              opacity="0"
            />
          </svg>
          {frame.note && frame.blocks.length > 0 && (
            <div
              key={`${frame.note.title}|${frame.device}|${frame.layer}`}
              data-osi-note
              style={{ opacity: 0 }}
              className="pointer-events-none absolute left-0 top-0 w-[280px] rounded-lg bg-white px-2.5 py-1.5 shadow-[0_10px_28px_rgba(23,23,23,0.14)] ring-1 ring-[#e4e4e7]"
            >
              <div
                style={{
                  animation: "osi-note 420ms cubic-bezier(0.22,1,0.36,1) both",
                }}
              >
                <p className="m-0 font-sans text-[12px] font-semibold leading-tight text-[#c2410c]">
                  {frame.note.title}
                </p>
                <p className="m-0 mt-0.5 font-sans text-[12px] leading-snug text-[#262626]">
                  {frame.note.text}
                </p>
                <p className="m-0 mt-1 font-mono text-[10.5px] text-[#525252]">
                  {pduName(frame)} · {bytes} B
                </p>
              </div>
            </div>
          )}
          <p
            data-osi-hint
            className="pointer-events-none absolute bottom-3 z-[1] m-0 font-sans text-[12px] text-[#525252]"
          >
            Orange is the path so far. Drag to turn the bench. Hold Shift and
            drag to slide it.
          </p>
        </>
      )}
    </div>
  );
}
