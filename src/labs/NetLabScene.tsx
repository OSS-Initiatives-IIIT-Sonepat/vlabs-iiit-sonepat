"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { bindCtrlPan } from "./ctrl-pan";

import {
  PACKET_COLORS,
  TESTER_MAP,
  WIRE,
  WIRING,
  type CableStage,
  type LinkState,
  type NetBench,
  type NetDevice,
  type NetDeviceKind,
  type NetFrame,
  type NetLink,
  type NetLinkKind,
  type NetPacket,
} from "@/labs/networks/bench";

// ── Colours. Light bodies and navy outlines, as in a network diagram. ─────
const LINE = 0x24345f;
const BODY = 0xf8faff;
const FACE = 0xdbe5ff;
const SCREEN = 0xc4d4ff;
const ORANGE = 0xf59e0b;
const LED_ON = 0x22c55e;
const LED_OFF = 0x9aa6bd;
const METAL = 0x9aa3b5;
const WALL = 0xedf1fa;
const TILE = 0xf5f7fc;

const CABLE: Record<NetLinkKind, number> = {
  straight: 0x4f6fd8,
  cross: 0x8b5cd6,
  console: 0x38bdf8,
  serial: 0xe0533f,
  fiber: 0x14b8a6,
  coax: 0x3f4a5f,
  wifi: 0x7b93df,
};

const LIGHT: Record<LinkState, number> = {
  up: 0x22c55e,
  amber: 0xf59e0b,
  down: 0xdc2626,
  off: 0x9ca3af,
};

/** From the front right, looking down onto the floor plan. */
const DIR = new THREE.Vector3(0.3, 0.82, 1).normalize();
const WALL_H = 1.3;
const PACKET_Y = 0.32;
const SPEED = 4.2; // scene units a second

type Size = { w: number; d: number; h: number };

const SIZES: Record<NetDeviceKind, Size> = {
  pc: { w: 1.9, d: 1.2, h: 1.25 },
  laptop: { w: 1.55, d: 1.1, h: 0.95 },
  server: { w: 1.2, d: 1.2, h: 1.9 },
  switch: { w: 2.0, d: 1.0, h: 0.42 },
  hub: { w: 1.6, d: 0.9, h: 0.38 },
  router: { w: 1.8, d: 1.2, h: 0.5 },
  ap: { w: 1.4, d: 1.0, h: 0.35 },
  printer: { w: 1.5, d: 1.2, h: 0.85 },
  cloud: { w: 3.2, d: 2.0, h: 1.6 },
  terminator: { w: 0.3, d: 0.3, h: 0.3 },
  tap: { w: 0.4, d: 0.4, h: 0.22 },
  table: { w: 4, d: 2, h: 0.8 },
  nic: { w: 1.0, d: 0.3, h: 0.6 },
  "wifi-usb": { w: 0.5, d: 0.3, h: 0.3 },
  utp: { w: 1.6, d: 0.4, h: 0.24 },
  stp: { w: 1.6, d: 0.4, h: 0.24 },
  coax: { w: 1.6, d: 0.4, h: 0.24 },
  fiber: { w: 1.6, d: 0.4, h: 0.24 },
  crimper: { w: 1.9, d: 0.8, h: 0.2 },
  stripper: { w: 1.0, d: 0.4, h: 0.15 },
  rj45: { w: 0.9, d: 0.6, h: 0.2 },
  "cable-end": { w: 0.6, d: 1.6, h: 0.3 },
  tester: { w: 3.2, d: 1.0, h: 0.35 },
};

function sizeOf(dev: NetDevice): Size {
  const base = SIZES[dev.kind];
  if (dev.size) return { w: dev.size[0], d: dev.size[1], h: base.h };
  const turned = Math.abs(((dev.ry ?? 0) % 180) - 90) < 1;
  return turned ? { w: base.d, d: base.w, h: base.h } : base;
}

/** A polyline with rounded corners, as one curve. */
function roundedPath(points: THREE.Vector3[], r: number) {
  const path = new THREE.CurvePath<THREE.Vector3>();
  if (points.length < 2) {
    path.add(new THREE.LineCurve3(points[0], points[0].clone()));
    return path;
  }
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
    if (start.distanceTo(from) > 1e-4)
      path.add(new THREE.LineCurve3(from, start));
    path.add(new THREE.QuadraticBezierCurve3(start, p.clone(), end));
    from = end;
  }
  const last = points[points.length - 1].clone();
  if (last.distanceTo(from) > 1e-4) path.add(new THREE.LineCurve3(from, last));
  if (path.curves.length === 0)
    path.add(new THREE.LineCurve3(from, from.clone()));
  return path;
}

/** Where the line from the centre toward `to` leaves the footprint. */
function portToward(
  c: THREE.Vector3,
  s: Size,
  to: THREE.Vector3,
): THREE.Vector3 {
  const dx = to.x - c.x;
  const dz = to.z - c.z;
  if (Math.abs(dx) < 1e-6 && Math.abs(dz) < 1e-6) return c.clone();
  const tx = Math.abs(dx) > 1e-6 ? s.w / 2 / Math.abs(dx) : Infinity;
  const tz = Math.abs(dz) > 1e-6 ? s.d / 2 / Math.abs(dz) : Infinity;
  const t = Math.min(tx, tz) * 1.04;
  return new THREE.Vector3(c.x + dx * t, c.y, c.z + dz * t);
}

const PROMPT =
  /^((?:[A-Z]:\\[^>]*>)|(?:[\w.-]+@[\w.-]+:[^$]*\$)|(?:[\w.-]+(?:\([\w-]+\))?[#>])|(?:\$)|(?:>>>)|(?:ftp>))(\s?.*)$/;

function ConsoleLine({ line }: { line: string }) {
  const m = PROMPT.exec(line);
  if (!m) return <>{line || " "}</>;
  return (
    <>
      <span className="text-[#3b6fe0]">{m[1]}</span>
      <span className="font-semibold text-[#171717]">{m[2]}</span>
    </>
  );
}

function tagTone(text: string) {
  if (text.startsWith("✓")) return "bg-[#ecfdf3] text-[#15803d] ring-[#bbf7d0]";
  if (text.startsWith("✕")) return "bg-[#fef2f2] text-[#b91c1c] ring-[#fecaca]";
  return "bg-[#eff4ff] text-[#24345f] ring-[#d3defa]";
}

type Props = {
  bench: NetBench;
  frame: NetFrame;
  /** Subject-card cover: the whole bench, slowly turning, no labels. */
  preview?: boolean;
};

type DeviceView = {
  dev: NetDevice;
  size: Size;
  group: THREE.Group;
  home: THREE.Vector3;
  goal: THREE.Vector3;
  vis: number;
  shown: boolean;
  leds: THREE.MeshLambertMaterial[];
  ring: THREE.MeshBasicMaterial;
  label: THREE.Object3D;
  /** Kind-specific moving parts. */
  update?: (f: NetFrame, now: number, k: number) => void;
};

type LinkView = {
  link: NetLink;
  points: THREE.Vector3[];
  mesh: THREE.Mesh | THREE.Line;
  mat: THREE.MeshLambertMaterial | THREE.LineDashedMaterial;
  base: THREE.Color;
  count: number;
  grow: number;
  shown: boolean;
  lights: THREE.MeshBasicMaterial[];
  mid: THREE.Object3D;
};

type PacketView = {
  group: THREE.Group;
  body: THREE.MeshLambertMaterial;
  curve: THREE.CurvePath<THREE.Vector3> | null;
  start: number;
  end: number;
  drop: boolean;
  color: THREE.Color;
};

/**
 * A room of network devices. Each procedure step says which devices and
 * cables are there, which ones it is about, what runs along the cables, and
 * what the screens print. Cables are laid as they appear, packets loop along
 * their path, and the camera frames the part of the room the step is about.
 */
export function NetLabScene({ bench, frame, preview = false }: Props) {
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
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 300);
    let controls: OrbitControls | null = null;
    let releaseCtrlPan = () => {};
    if (!preview) {
      controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 2;
      controls.maxDistance = 140;
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
    const glass = new THREE.MeshLambertMaterial({
      color: 0xe6f0ff,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    });
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

    function box(
      w: number,
      h: number,
      d: number,
      color: number | THREE.Material,
      edges = true,
    ): THREE.Group {
      const g = new THREE.Group();
      const geo = new THREE.BoxGeometry(w, h, d);
      g.add(
        new THREE.Mesh(geo, typeof color === "number" ? solid(color) : color),
      );
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
    /** A cylinder lying along x. */
    function rod(
      r: number,
      len: number,
      color: number | THREE.Material,
      edges = false,
    ) {
      const g = new THREE.Group();
      const geo = new THREE.CylinderGeometry(r, r, len, 18);
      geo.rotateZ(Math.PI / 2);
      g.add(
        new THREE.Mesh(geo, typeof color === "number" ? solid(color) : color),
      );
      if (edges)
        g.add(
          new THREE.LineSegments(new THREE.EdgesGeometry(geo, 40), edgeMat),
        );
      return g;
    }
    function led(
      parent: THREE.Object3D,
      leds: THREE.MeshLambertMaterial[],
      w: number,
      h: number,
      x: number,
      y: number,
      z: number,
    ) {
      const mat = new THREE.MeshLambertMaterial({
        color: LED_ON,
        emissive: 0x000000,
      });
      leds.push(mat);
      put(
        parent,
        new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.02), mat),
        x,
        y,
        z,
      );
    }

    // ── Stripes for the white wires of a pair ─────────────────────────────
    const stripeMats = new Map<string, THREE.MeshLambertMaterial>();
    function wireMat(code: string): THREE.MeshLambertMaterial {
      const color = WIRE[code];
      if (!color.stripe) return solid(new THREE.Color(color.base).getHex());
      let mat = stripeMats.get(code);
      if (mat) return mat;
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 8;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = color.base;
      ctx.fillRect(0, 0, 64, 8);
      ctx.fillStyle = color.stripe;
      ctx.fillRect(0, 0, 22, 8);
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.repeat.set(14, 1);
      tex.colorSpace = THREE.SRGBColorSpace;
      mat = new THREE.MeshLambertMaterial({ map: tex });
      stripeMats.set(code, mat);
      return mat;
    }

    // ── Devices, in the style of a network diagram ───────────────────────
    function buildPc(leds: THREE.MeshLambertMaterial[]) {
      const g = new THREE.Group();
      const m = put(g, new THREE.Group(), -0.28, 0, 0);
      put(m, box(0.5, 0.04, 0.34, BODY), 0, 0.02, -0.1);
      put(m, box(0.08, 0.34, 0.08, BODY), 0, 0.2, -0.14);
      put(m, box(1.3, 0.86, 0.07, BODY), 0, 0.8, -0.14);
      put(m, box(1.18, 0.7, 0.01, SCREEN, false), 0, 0.78, -0.1);
      put(m, box(1.18, 0.07, 0.012, FACE, false), 0, 1.1, -0.1);
      for (let i = 0; i < 3; i++)
        put(
          m,
          box(0.7 - i * 0.16, 0.04, 0.012, 0xffffff, false),
          -0.15,
          0.96 - i * 0.1,
          -0.095,
        );
      put(m, box(0.95, 0.04, 0.3, FACE), 0, 0.02, 0.38);
      const t = put(g, new THREE.Group(), 0.68, 0, -0.05);
      put(t, box(0.42, 0.95, 0.95, BODY), 0, 0.475, 0);
      put(t, box(0.3, 0.05, 0.01, FACE, false), 0, 0.82, 0.48);
      put(t, box(0.3, 0.05, 0.01, FACE, false), 0, 0.74, 0.48);
      led(t, leds, 0.05, 0.05, 0, 0.62, 0.48);
      return g;
    }
    function buildLaptop(leds: THREE.MeshLambertMaterial[]) {
      const g = new THREE.Group();
      g.scale.setScalar(0.9);
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
      led(g, leds, 0.06, 0.03, 0.7, 0.06, 0.58);
      return g;
    }
    function buildServer(leds: THREE.MeshLambertMaterial[]) {
      const g = new THREE.Group();
      put(g, box(1.2, 1.9, 1.2, BODY), 0, 0.95, 0);
      for (let i = 0; i < 3; i++) {
        const y = 1.55 - i * 0.36;
        put(g, box(0.92, 0.27, 0.02, FACE), -0.04, y, 0.61);
        led(g, leds, 0.07, 0.07, 0.38, y, 0.622);
      }
      for (let i = 0; i < 3; i++)
        put(
          g,
          box(0.92, 0.035, 0.02, 0xc7d2ee, false),
          -0.04,
          0.42 - i * 0.09,
          0.61,
        );
      return g;
    }
    function buildSwitch(leds: THREE.MeshLambertMaterial[], hub: boolean) {
      const g = new THREE.Group();
      const w = hub ? 1.6 : 2.0;
      const d = hub ? 0.9 : 1.0;
      const h = hub ? 0.38 : 0.42;
      const ports = hub ? 4 : 8;
      put(g, box(w, h, d, BODY), 0, h / 2, 0);
      put(
        g,
        box(w - 0.16, 0.012, d - 0.2, hub ? 0xfdecc0 : FACE, false),
        0,
        h + 0.006,
        0,
      );
      put(
        g,
        box(w - 0.16, h * 0.64, 0.01, FACE, false),
        0,
        h / 2,
        d / 2 + 0.006,
      );
      const step = hub ? 0.3 : 0.2;
      for (let i = 0; i < ports; i++) {
        const x = (i - (ports - 1) / 2) * step;
        put(g, box(0.15, 0.12, 0.02, LINE, false), x, h * 0.45, d / 2 + 0.012);
        led(g, leds, 0.05, 0.03, x, h * 0.75, d / 2 + 0.014);
      }
      return g;
    }
    function buildRouter(leds: THREE.MeshLambertMaterial[]) {
      const g = new THREE.Group();
      put(g, box(1.8, 0.5, 1.2, BODY), 0, 0.25, 0);
      put(g, box(1.5, 0.012, 0.9, FACE, false), 0, 0.506, 0);
      put(g, box(0.7, 0.22, 0.01, FACE), -0.4, 0.24, 0.605);
      for (let i = 0; i < 4; i++)
        led(g, leds, 0.08, 0.05, 0.32 + i * 0.15, 0.34, 0.61);
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
    const waves: THREE.MeshBasicMaterial[] = [];
    function buildAp(leds: THREE.MeshLambertMaterial[]) {
      const g = new THREE.Group();
      put(g, box(1.3, 0.26, 0.9, BODY), 0, 0.13, 0);
      put(g, box(1.1, 0.012, 0.7, FACE, false), 0, 0.266, 0);
      for (let i = 0; i < 4; i++)
        led(g, leds, 0.07, 0.04, -0.3 + i * 0.2, 0.14, 0.456);
      for (const x of [-0.5, 0.5]) {
        const ant = put(g, new THREE.Group(), x, 0.26, -0.4);
        ant.rotation.z = x < 0 ? 0.18 : -0.18;
        const geo = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 10);
        put(ant, new THREE.Mesh(geo, solid(BODY)), 0, 0.35, 0);
        put(
          ant,
          new THREE.LineSegments(new THREE.EdgesGeometry(geo, 40), edgeMat),
          0,
          0.35,
          0,
        );
      }
      for (let i = 0; i < 3; i++) {
        const mat = new THREE.MeshBasicMaterial({
          color: 0x7b93df,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        waves.push(mat);
        const arc = new THREE.Mesh(
          new THREE.TorusGeometry(0.3 + i * 0.22, 0.025, 6, 32, Math.PI * 0.6),
          mat,
        );
        arc.rotation.z = Math.PI * 0.2;
        put(g, arc, 0, 0.75, -0.4);
      }
      return g;
    }
    function buildPrinter(leds: THREE.MeshLambertMaterial[]) {
      const g = new THREE.Group();
      put(g, box(1.4, 0.55, 1.0, BODY), 0, 0.275, 0);
      put(g, box(1.1, 0.2, 0.5, FACE), 0, 0.65, -0.2);
      put(g, box(1.0, 0.01, 0.35, 0xffffff), 0, 0.76, -0.2);
      put(g, box(1.0, 0.06, 0.4, FACE), 0, 0.12, 0.66);
      put(g, box(0.9, 0.04, 0.012, LINE, false), 0, 0.38, 0.506);
      led(g, leds, 0.07, 0.05, 0.55, 0.45, 0.506);
      const paper = put(g, box(0.86, 0.012, 0.6, 0xffffff), 0, 0.37, 0.4);
      paper.name = "paper";
      return g;
    }
    function buildCloud() {
      const g = new THREE.Group();
      const outline = new THREE.MeshBasicMaterial({
        color: LINE,
        side: THREE.BackSide,
      });
      for (const [x, y, z, r] of [
        [-0.9, 0.55, 0, 0.6],
        [0.9, 0.55, 0, 0.6],
        [-0.3, 0.85, -0.1, 0.75],
        [0.4, 0.9, 0, 0.7],
        [0, 0.5, 0.3, 0.65],
      ]) {
        const geo = new THREE.SphereGeometry(r, 28, 20);
        const s = put(g, new THREE.Mesh(geo, solid(0xffffff)), x, y, z);
        s.scale.set(1, 0.8, 0.85);
        const o = put(g, new THREE.Mesh(geo, outline), x, y, z);
        o.scale.set(1.035, 0.83, 0.88);
      }
      const globe = put(g, new THREE.Group(), 0, 0.72, 0.85);
      const geo = new THREE.TorusGeometry(0.28, 0.022, 6, 36);
      put(globe, new THREE.Mesh(geo, solid(LINE)), 0, 0, 0);
      const meridian = put(globe, new THREE.Mesh(geo, solid(LINE)), 0, 0, 0);
      meridian.scale.set(0.45, 1, 1);
      put(globe, box(0.56, 0.03, 0.03, LINE, false), 0, 0, 0);
      put(globe, box(0.03, 0.56, 0.03, LINE, false), 0, 0, 0);
      return g;
    }
    function buildTable(s: Size) {
      const g = new THREE.Group();
      put(g, box(s.w, 0.08, s.d, 0xead7b8), 0, 0.76, 0);
      for (const [sx, sz] of [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ])
        put(
          g,
          box(0.08, 0.72, 0.08, 0xc9a77a),
          sx * (s.w / 2 - 0.15),
          0.36,
          sz * (s.d / 2 - 0.15),
        );
      return g;
    }
    function buildNic() {
      const g = new THREE.Group();
      put(g, box(0.9, 0.5, 0.04, 0x2f855a), 0, 0.33, 0);
      put(g, box(0.22, 0.16, 0.03, 0x1f2937, false), -0.05, 0.36, 0.035);
      put(g, box(0.12, 0.1, 0.03, 0x1f2937, false), 0.22, 0.42, 0.035);
      put(g, box(0.6, 0.07, 0.045, 0xd4a72c, false), 0.05, 0.05, 0);
      put(g, box(0.04, 0.66, 0.16, METAL), -0.47, 0.36, 0);
      put(g, box(0.06, 0.16, 0.13, 0x1f2937, false), -0.42, 0.5, 0);
      return g;
    }
    function buildWifiUsb() {
      const g = new THREE.Group();
      put(g, box(0.36, 0.1, 0.16, 0x1f2937), 0, 0.05, 0);
      put(g, box(0.14, 0.06, 0.12, METAL), -0.25, 0.05, 0);
      const ant = put(g, new THREE.Group(), 0.14, 0.1, 0);
      ant.rotation.z = -0.3;
      put(ant, box(0.04, 0.3, 0.04, 0x1f2937, false), 0, 0.15, 0);
      return g;
    }

    /** A short length of cable lying along x, cut open at the right end. */
    function buildSample(kind: "utp" | "stp" | "coax" | "fiber") {
      const g = new THREE.Group();
      const y = 0.12;
      const layer = (
        r: number,
        x0: number,
        x1: number,
        color: number,
        edges = false,
      ) => put(g, rod(r, x1 - x0, color, edges), (x0 + x1) / 2, y, 0);
      const pairs = (x0: number, x1: number) => {
        const codes = [
          ["wo", "o"],
          ["wg", "g"],
          ["wb", "b"],
          ["wbr", "br"],
        ];
        codes.forEach((pair, i) => {
          const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
          const cy = Math.sin(a) * 0.05;
          const cz = Math.cos(a) * 0.05;
          pair.forEach((code, j) => {
            const w = rod(0.022, x1 - x0, wireMat(code));
            put(
              g,
              w,
              (x0 + x1) / 2,
              y + cy + (j ? 0.012 : -0.012),
              cz + (j ? 0.012 : -0.012),
            );
          });
        });
      };
      if (kind === "utp") {
        layer(0.12, -0.8, 0.35, 0x5b8def, true);
        pairs(0.35, 0.8);
      } else if (kind === "stp") {
        layer(0.12, -0.8, 0.2, 0x3f4a5f, true);
        layer(0.105, 0.2, 0.4, 0xcbd5e1);
        pairs(0.4, 0.8);
      } else if (kind === "coax") {
        layer(0.12, -0.8, 0.1, 0x27272a, true);
        layer(0.1, 0.1, 0.3, 0xb87333);
        layer(0.075, 0.3, 0.55, 0xf4f4f5);
        layer(0.025, 0.55, 0.8, 0xd08b3e);
      } else {
        layer(0.1, -0.8, 0.1, 0xf08a24, true);
        layer(0.08, 0.1, 0.3, 0xfacc15);
        layer(0.045, 0.3, 0.5, 0xf4f4f5);
        layer(0.02, 0.5, 0.8, 0x99f6e4);
      }
      return g;
    }
    function buildCrimper() {
      const g = new THREE.Group();
      for (const s of [-1, 1]) {
        const h = put(g, new THREE.Group(), 0.3, 0.06, s * 0.14);
        h.rotation.y = s * 0.16;
        put(h, box(1.2, 0.08, 0.14, 0xe0533f), 0.1, 0, 0);
      }
      put(g, box(0.6, 0.14, 0.5, METAL), -0.55, 0.07, 0);
      put(g, box(0.18, 0.1, 0.3, 0x3f4a5f, false), -0.62, 0.15, 0);
      return g;
    }
    function buildStripper() {
      const g = new THREE.Group();
      put(g, box(0.9, 0.1, 0.28, 0xf2c94c), 0, 0.05, 0);
      put(g, box(0.2, 0.04, 0.3, METAL), -0.25, 0.11, 0);
      return g;
    }
    function buildPlugs() {
      const g = new THREE.Group();
      put(g, box(0.9, 0.06, 0.6, 0xe9eef8), 0, 0.03, 0);
      for (const [x, z, r] of [
        [-0.22, -0.1, 0.3],
        [0.15, 0.08, -0.4],
        [0.25, -0.15, 1.2],
      ]) {
        const p = put(g, box(0.18, 0.11, 0.26, glass), x, 0.12, z);
        p.rotation.y = r;
      }
      return g;
    }

    /** One end of a twisted-pair cable, pointing away from the viewer. */
    function buildCableEnd(): {
      g: THREE.Group;
      set: (stage: CableStage, order: readonly string[]) => void;
      animate: (k: number) => void;
    } {
      const g = new THREE.Group();
      const y = 0.11;
      const jacketMat = solid(0x5b8def);
      put(g, rod(0.11, 1.4, jacketMat, true), 0, y, 0.7).rotation.y =
        Math.PI / 2;
      const sleeve = put(g, rod(0.11, 0.9, jacketMat, true), 0, y, -0.45);
      sleeve.rotation.y = Math.PI / 2;

      // Four twisted pairs, as they come out of the jacket.
      const twisted = put(g, new THREE.Group(), 0, 0, 0);
      const PAIRS = [
        ["wo", "o"],
        ["wg", "g"],
        ["wb", "b"],
        ["wbr", "br"],
      ];
      PAIRS.forEach((pair, i) => {
        const cx = (i - 1.5) * 0.075;
        pair.forEach((code, j) => {
          const pts: THREE.Vector3[] = [];
          for (let s = 0; s <= 40; s++) {
            const t = s / 40;
            const a = t * Math.PI * 2 * 5 + j * Math.PI;
            const spread = cx * (0.4 + t * 1.2);
            pts.push(
              V(spread + Math.cos(a) * 0.02, y + Math.sin(a) * 0.02, -t * 0.9),
            );
          }
          const tube = new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3(pts),
            80,
            0.018,
            6,
          );
          twisted.add(new THREE.Mesh(tube, wireMat(code)));
        });
      });

      // Eight wires laid flat in pin order. Rebuilt when the order changes.
      const flat = put(g, new THREE.Group(), 0, 0, 0);
      let flatKey = "";
      const buildFlat = (order: readonly string[], long: boolean) => {
        const k = order.join(",") + (long ? "+" : "");
        if (k === flatKey) return;
        flatKey = k;
        for (const child of [...flat.children]) {
          flat.remove(child);
          (child as THREE.Mesh).geometry.dispose();
        }
        order.forEach((code, i) => {
          const x = -0.21 + i * 0.06;
          const start = V((i - 3.5) * 0.018, y, 0);
          const pts = [start, V(x, y, -0.25), V(x, y, long ? -1.2 : -0.95)];
          const path = roundedPath(pts, 0.1);
          flat.add(
            new THREE.Mesh(
              new THREE.TubeGeometry(path, 40, 0.021, 6),
              wireMat(code),
            ),
          );
        });
      };

      // The plug slides on from the front.
      const plug = put(g, new THREE.Group(), 0, 0, -1.9);
      put(plug, box(0.52, 0.3, 0.7, glass), 0, 0.15, 0);
      put(plug, box(0.26, 0.04, 0.36, glass), 0, -0.02, 0.05);
      const pins: THREE.Object3D[] = [];
      for (let i = 0; i < 8; i++) {
        const p = put(
          plug,
          box(0.035, 0.06, 0.2, 0xd4a72c, false),
          -0.21 + i * 0.06,
          0.32,
          -0.22,
        );
        pins.push(p);
      }
      let plugGoal = -1.9;
      let pinGoal = 0.32;
      let stage: CableStage = "jacket";
      return {
        g,
        set(next, order) {
          stage = next;
          sleeve.visible = stage === "jacket";
          twisted.visible = stage === "stripped";
          flat.visible =
            stage === "ordered" || stage === "inserted" || stage === "crimped";
          if (flat.visible) buildFlat(order, stage !== "ordered");
          const seated = stage === "inserted" || stage === "crimped";
          if (!seated) plug.position.z = -1.9;
          plug.visible = seated;
          plugGoal = seated ? -0.9 : -1.9;
          pinGoal = stage === "crimped" ? 0.255 : 0.32;
        },
        animate(k) {
          plug.position.z += (plugGoal - plug.position.z) * k;
          for (const p of pins) p.position.y += (pinGoal - p.position.y) * k;
        },
      };
    }

    /** Main and remote unit of a cable tester. Sockets face the viewer. */
    function buildTester(): {
      g: THREE.Group;
      main: THREE.MeshLambertMaterial[];
      remote: THREE.MeshLambertMaterial[];
    } {
      const g = new THREE.Group();
      const main: THREE.MeshLambertMaterial[] = [];
      const remote: THREE.MeshLambertMaterial[] = [];
      for (const [x, list, title] of [
        [-1.1, main, "MAIN"],
        [1.1, remote, "REMOTE"],
      ] as const) {
        const u = put(g, new THREE.Group(), x, 0, 0);
        put(u, box(0.9, 0.32, 1.0, 0xf2c94c), 0, 0.16, 0);
        put(u, box(0.4, 0.22, 0.04, 0x1f2937, false), 0, 0.15, 0.5);
        const c = document.createElement("canvas");
        c.width = 360;
        c.height = 200;
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#fdf3c8";
        ctx.fillRect(0, 0, 360, 200);
        ctx.fillStyle = "#24345f";
        ctx.textAlign = "center";
        ctx.font = `700 34px ${family}`;
        ctx.fillText(title, 180, 150);
        ctx.font = `600 26px ${family}`;
        for (let i = 0; i < 8; i++)
          ctx.fillText(String(i + 1), 40 + i * 40, 92);
        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        const face = new THREE.Mesh(
          new THREE.PlaneGeometry(0.8, 0.44),
          new THREE.MeshBasicMaterial({ map: tex }),
        );
        face.rotation.x = -Math.PI / 2;
        put(u, face, 0, 0.322, -0.15);
        for (let i = 0; i < 8; i++) {
          const mat = new THREE.MeshLambertMaterial({ color: LED_OFF });
          list.push(mat);
          put(
            u,
            new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.06), mat),
            -0.31 + i * 0.089,
            0.34,
            -0.3,
          );
        }
      }
      return { g, main, remote };
    }

    // ── Floor and rooms ───────────────────────────────────────────────────
    const grid = new THREE.GridHelper(120, 120, 0xe3e6ec, 0xe3e6ec);
    grid.position.y = 0.001;
    root.add(grid);

    const zoneAnchors = new Map<string, THREE.Object3D>();
    for (const zone of bench.zones ?? []) {
      const x0 = zone.x - zone.w / 2;
      const z0 = zone.z - zone.d / 2;
      put(root, box(zone.w, 0.03, zone.d, TILE, false), zone.x, 0.015, zone.z);
      const tileEdge = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(zone.w, 0.03, zone.d)),
        new THREE.LineBasicMaterial({ color: 0xc9d3ea }),
      );
      put(root, tileEdge, zone.x, 0.015, zone.z);
      put(root, box(zone.w, WALL_H, 0.12, WALL), zone.x, WALL_H / 2, z0 - 0.06);
      put(root, box(0.12, WALL_H, zone.d, WALL), x0 - 0.06, WALL_H / 2, zone.z);
      put(
        root,
        box(zone.w, 0.08, 0.13, FACE, false),
        zone.x,
        WALL_H - 0.04,
        z0 - 0.06,
      );
      put(
        root,
        box(0.13, 0.08, zone.d, FACE, false),
        x0 - 0.06,
        WALL_H - 0.04,
        zone.z,
      );
      const a = new THREE.Object3D();
      put(root, a, x0 + 0.25, WALL_H + 0.05, z0);
      zoneAnchors.set(zone.id, a);
    }

    // ── Devices ───────────────────────────────────────────────────────────
    const devices = new Map<string, DeviceView>();
    const cableEnds = new Map<string, ReturnType<typeof buildCableEnd>>();
    const testers = new Map<string, ReturnType<typeof buildTester>>();

    for (const dev of bench.devices) {
      const s = sizeOf(dev);
      const leds: THREE.MeshLambertMaterial[] = [];
      let body: THREE.Group;
      let update: DeviceView["update"];
      switch (dev.kind) {
        case "pc":
          body = buildPc(leds);
          break;
        case "laptop":
          body = buildLaptop(leds);
          break;
        case "server":
          body = buildServer(leds);
          break;
        case "switch":
          body = buildSwitch(leds, false);
          break;
        case "hub":
          body = buildSwitch(leds, true);
          break;
        case "router":
          body = buildRouter(leds);
          break;
        case "ap":
          body = buildAp(leds);
          break;
        case "printer": {
          body = buildPrinter(leds);
          const paper = body.getObjectByName("paper");
          const id = dev.id;
          update = (f, now) => {
            if (!paper) return;
            const busy = f.busy?.includes(id);
            const t = busy ? (now / 1600) % 1 : 0;
            paper.position.z = 0.1 + t * 0.6;
            paper.visible = busy ?? false;
          };
          break;
        }
        case "cloud":
          body = buildCloud();
          break;
        case "terminator":
          body = new THREE.Group();
          put(body, rod(0.1, 0.28, 0x27272a, true), 0, 0.12, 0);
          break;
        case "tap":
          body = new THREE.Group();
          put(body, box(0.34, 0.16, 0.2, METAL), 0, 0.12, 0);
          put(body, box(0.1, 0.1, 0.3, METAL), 0, 0.12, 0.2);
          break;
        case "table":
          body = buildTable(s);
          break;
        case "nic":
          body = buildNic();
          break;
        case "wifi-usb":
          body = buildWifiUsb();
          break;
        case "utp":
        case "stp":
        case "coax":
        case "fiber":
          body = buildSample(dev.kind);
          break;
        case "crimper":
          body = buildCrimper();
          break;
        case "stripper":
          body = buildStripper();
          break;
        case "rj45":
          body = buildPlugs();
          break;
        case "cable-end": {
          const end = buildCableEnd();
          cableEnds.set(dev.id, end);
          body = end.g;
          const id = dev.id;
          update = (f, _now, k) => {
            const st = f.ends?.[id];
            end.set(st?.stage ?? "jacket", WIRING[st?.standard ?? "T568B"]);
            end.animate(k);
          };
          break;
        }
        case "tester": {
          const t = buildTester();
          testers.set(dev.id, t);
          body = t.g;
          const id = dev.id;
          update = (f, now) => {
            const on = f.tester?.id === id ? f.tester.wiring : null;
            const slot = Math.floor(now / 520) % 9;
            for (let i = 0; i < 8; i++) {
              const lit = on !== null && slot === i;
              t.main[i].color.setHex(lit ? LED_ON : LED_OFF);
              t.main[i].emissive.setHex(lit ? 0x0b5d2a : 0x000000);
            }
            for (let i = 0; i < 8; i++) {
              const lit =
                on !== null && slot < 8 && TESTER_MAP[on][slot] === i + 1;
              t.remote[i].color.setHex(lit ? LED_ON : LED_OFF);
              t.remote[i].emissive.setHex(lit ? 0x0b5d2a : 0x000000);
            }
          };
          break;
        }
      }
      const group = new THREE.Group();
      group.add(body);
      const home = V(dev.x, dev.y ?? 0, dev.z);
      group.position.copy(home);
      group.rotation.y = THREE.MathUtils.degToRad(dev.ry ?? 0);
      root.add(group);

      const ringMat = new THREE.MeshBasicMaterial({
        color: ORANGE,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const r = Math.min(2.4, Math.max(s.w, s.d) * 0.55 + 0.12);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(r, r + 0.09, 48),
        ringMat,
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.012;
      group.add(ring);

      const label = new THREE.Object3D();
      label.position.set(0, s.h + (dev.kind === "router" ? 0.7 : 0.3), 0);
      group.add(label);

      devices.set(dev.id, {
        dev,
        size: s,
        group,
        home,
        goal: home.clone(),
        vis: 1,
        shown: true,
        leds,
        ring: ringMat,
        label,
        update,
      });
    }

    // The jacket between the two ends of one cable, through the front.
    const jackets: {
      a: string;
      b: string;
      mesh: THREE.Mesh;
      key: string;
    }[] = [];
    for (const dev of bench.devices) {
      if (dev.kind !== "cable-end" || !dev.pair) continue;
      const mesh = new THREE.Mesh(new THREE.BufferGeometry(), solid(0x5b8def));
      root.add(mesh);
      jackets.push({ a: dev.id, b: dev.pair, mesh, key: "" });
    }
    function layJackets() {
      for (const j of jackets) {
        const a = devices.get(j.a);
        const b = devices.get(j.b);
        if (!a || !b) continue;
        const pa = a.group.position;
        const pb = b.group.position;
        const k = `${pa.x.toFixed(3)},${pa.z.toFixed(3)},${pb.x.toFixed(3)},${pb.z.toFixed(3)}`;
        if (k === j.key) continue;
        j.key = k;
        const y = (a.dev.y ?? 0) + 0.11;
        const pts = [
          V(pa.x, y, pa.z + 1.39),
          V(pa.x, y, pa.z + 1.9),
          V(pb.x, y, pb.z + 1.9),
          V(pb.x, y, pb.z + 1.39),
        ];
        j.mesh.geometry.dispose();
        j.mesh.geometry = new THREE.TubeGeometry(
          roundedPath(pts, 0.35),
          60,
          0.11,
          12,
        );
        j.mesh.visible = a.group.visible && b.group.visible;
      }
    }

    // ── Cables ────────────────────────────────────────────────────────────
    const centre = (d: DeviceView, y = 0) =>
      V(d.home.x, (d.dev.y ?? 0) + y, d.home.z);
    const links = new Map<string, LinkView>();
    for (const link of bench.links) {
      const a = devices.get(link.a);
      const b = devices.get(link.b);
      if (!a || !b) continue;
      const mid = new THREE.Object3D();
      let view: LinkView;
      if (link.kind === "wifi") {
        const pa = centre(a, a.size.h * 0.9);
        const pb = centre(b, b.size.h * 0.9);
        const top = Math.max(pa.y, pb.y) + pa.distanceTo(pb) * 0.18;
        const curve = new THREE.QuadraticBezierCurve3(
          pa,
          V((pa.x + pb.x) / 2, top, (pa.z + pb.z) / 2),
          pb,
        );
        const points = curve.getPoints(48);
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineDashedMaterial({
          color: CABLE.wifi,
          dashSize: 0.18,
          gapSize: 0.12,
          transparent: true,
        });
        const line = new THREE.Line(geo, mat);
        line.computeLineDistances();
        root.add(line);
        mid.position.copy(curve.getPoint(0.5));
        view = {
          link,
          points,
          mesh: line,
          mat,
          base: new THREE.Color(CABLE.wifi),
          count: points.length,
          grow: 1,
          shown: true,
          lights: [],
          mid,
        };
      } else {
        const y = 0.06;
        const via = (link.via ?? []).map(([x, z]) => V(x, y, z));
        const ca = centre(a, y);
        const cb = centre(b, y);
        const pa = portToward(ca, a.size, via[0] ?? cb);
        const pb = portToward(cb, b.size, via[via.length - 1] ?? ca);
        const points = [pa, ...via, pb];
        const path = roundedPath(points, 0.4);
        const segs = Math.max(16, Math.round(path.getLength() * 10));
        const geo = new THREE.TubeGeometry(
          path,
          segs,
          link.kind === "console" ? 0.035 : 0.055,
          8,
        );
        const mat = new THREE.MeshLambertMaterial({ color: CABLE[link.kind] });
        const mesh = new THREE.Mesh(geo, mat);
        root.add(mesh);
        mid.position.copy(path.getPointAt(0.5));
        mid.position.y += 0.1;
        const lights: THREE.MeshBasicMaterial[] = [];
        if (link.kind !== "coax") {
          const len = path.getLength();
          for (const u of [
            Math.min(0.45, 0.32 / len),
            Math.max(0.55, 1 - 0.32 / len),
          ]) {
            const lm = new THREE.MeshBasicMaterial({ color: LIGHT.up });
            lights.push(lm);
            const dot = new THREE.Mesh(
              new THREE.SphereGeometry(0.075, 12, 8),
              lm,
            );
            dot.position.copy(path.getPointAt(u));
            dot.position.y += 0.1;
            root.add(dot);
            dot.userData.light = true;
            mesh.userData.dots = [...(mesh.userData.dots ?? []), dot];
          }
        }
        view = {
          link,
          points,
          mesh,
          mat,
          base: new THREE.Color(CABLE[link.kind]),
          count: geo.index ? geo.index.count : 0,
          grow: 1,
          shown: true,
          lights,
          mid,
        };
      }
      root.add(mid);
      links.set(link.id, view);
    }

    // ── Packets ───────────────────────────────────────────────────────────
    const packets: PacketView[] = [];
    function packetView(): PacketView {
      const group = new THREE.Group();
      const body = new THREE.MeshLambertMaterial({ color: ORANGE });
      const geo = new THREE.BoxGeometry(0.46, 0.28, 0.34);
      group.add(new THREE.Mesh(geo, body));
      group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat));
      const flap = new THREE.Mesh(
        new THREE.BoxGeometry(0.36, 0.012, 0.22),
        solid(0xffffff),
      );
      flap.position.y = 0.146;
      group.add(flap);
      group.visible = false;
      root.add(group);
      return {
        group,
        body,
        curve: null,
        start: 0,
        end: 0,
        drop: false,
        color: new THREE.Color(ORANGE),
      };
    }

    function linkBetween(
      a: string,
      b: string,
    ): { view: LinkView; fwd: boolean } | null {
      for (const view of links.values()) {
        if (view.link.a === a && view.link.b === b) return { view, fwd: true };
        if (view.link.a === b && view.link.b === a) return { view, fwd: false };
      }
      return null;
    }

    function packetCurve(p: NetPacket): THREE.CurvePath<THREE.Vector3> | null {
      const pts: THREE.Vector3[] = [];
      const over = (id: string) => {
        const d = devices.get(id);
        if (!d) return null;
        return V(d.goal.x, d.goal.y + Math.min(d.size.h, 1.2) + 0.32, d.goal.z);
      };
      const first = over(p.path[0]);
      if (!first) return null;
      pts.push(first);
      for (let i = 0; i < p.path.length - 1; i++) {
        const hop = linkBetween(p.path[i], p.path[i + 1]);
        if (hop) {
          const run = hop.fwd
            ? hop.view.points
            : [...hop.view.points].reverse();
          const lift = hop.view.link.kind === "wifi" ? 0.25 : PACKET_Y;
          for (const q of run) pts.push(V(q.x, q.y + lift, q.z));
        }
        const next = over(p.path[i + 1]);
        if (next) pts.push(next);
      }
      return roundedPath(pts, 0.3);
    }

    // ── Camera framing ────────────────────────────────────────────────────
    let insetL = 0;
    let insetR = 0;
    function measureInsets() {
      if (preview) return { l: 0, r: 0 };
      const w = canvas!.clientWidth;
      if (w < 900) return { l: 0, r: 0 };
      const card = document.querySelector<HTMLElement>(".floating-lab-card");
      const area = canvas!.getBoundingClientRect();
      let l = 0;
      if (card) {
        const rect = card.getBoundingClientRect();
        const right = rect.right - area.left + 16;
        if (right > 0 && right < w * 0.6) l = right;
      }
      return { l, r: 384 };
    }
    function applyView() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      if (w < 2 || h < 2) return;
      camera.aspect = w / h;
      // The text card covers only the top left, and the observation and
      // schematic cards the bottom right, so the room sits a little left.
      const shift = (insetL * 0.15 - insetR * 0.6) / 2;
      if (shift !== 0) camera.setViewOffset(w, h, -shift, 0, w, h);
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
    }
    function focusFor(f: NetFrame) {
      // The devices the step names, or else the ones it is about and the
      // ones its traffic passes through, or else everything on show.
      const about = [
        ...new Set([
          ...(f.hot ?? []),
          ...(f.packets ?? []).flatMap((p) => p.path),
        ]),
      ].filter((id) => devices.has(id));
      const ids = preview
        ? [...devices.keys()]
        : f.focus?.length
          ? f.focus
          : about.length
            ? about
            : f.show
              ? f.show.filter((id) => devices.has(id))
              : [...devices.keys()];
      const bb = new THREE.Box3();
      for (const id of ids) {
        const d = devices.get(id);
        if (!d) continue;
        const g = d.goal;
        bb.expandByPoint(V(g.x - d.size.w / 2, g.y, g.z - d.size.d / 2));
        bb.expandByPoint(
          V(g.x + d.size.w / 2, g.y + d.size.h, g.z + d.size.d / 2),
        );
      }
      if (bb.isEmpty()) bb.set(V(-4, 0, -3), V(4, 1, 3));
      const center = bb.getCenter(V(0, 0, 0));
      const size = bb.getSize(V(0, 0, 0));
      const radius = Math.max(2.2, Math.hypot(size.x, size.z) * 0.5 + 0.9);
      return { center, radius: radius * (f.zoom ?? 1) * (preview ? 0.9 : 1) };
    }
    function poseFor(f: NetFrame) {
      const { center, radius } = focusFor(f);
      const w = canvas!.clientWidth || 1;
      const frac = Math.max(0.4, (w - insetL * 0.3 - insetR) / w);
      const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const d = Math.max(radius / t, radius / (t * camera.aspect * frac));
      return { pos: center.clone().addScaledVector(DIR, d), target: center };
    }

    let glide: {
      t: number;
      fromPos: THREE.Vector3;
      toPos: THREE.Vector3;
      fromTarget: THREE.Vector3;
      toTarget: THREE.Vector3;
    } | null = null;
    const target = new THREE.Vector3();
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
      const ins = measureInsets();
      insetL = ins.l;
      insetR = ins.r;
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

    // ── Frame changes ─────────────────────────────────────────────────────
    let shown: NetFrame | null = null;
    let frameStart = performance.now();
    let cycle = 1;

    function enter(f: NetFrame, first: boolean) {
      const show = f.show ? new Set(f.show) : null;
      const hot = new Set(f.hot ?? []);
      for (const [id, d] of devices) {
        d.shown = show ? show.has(id) : true;
        const mv = f.moves?.[id];
        d.goal.set(mv?.x ?? d.home.x, mv?.y ?? d.home.y, mv?.z ?? d.home.z);
        if (first) {
          d.vis = d.shown ? 1 : 0;
          d.group.position.copy(d.goal);
        }
      }
      for (const [id, l] of links) {
        const ends =
          devices.get(l.link.a)?.shown && devices.get(l.link.b)?.shown;
        const now = (show ? show.has(id) : true) && !!ends;
        if (now && !l.shown) l.grow = first ? 1 : 0;
        l.shown = now;
        const state = f.links?.[id] ?? "up";
        const color = hot.has(id)
          ? new THREE.Color(ORANGE)
          : state === "down"
            ? new THREE.Color(0xb4bccb)
            : l.base;
        l.mat.color.copy(color);
        for (const lm of l.lights) lm.color.setHex(LIGHT[state]);
      }

      // Packets: one view each, timed one after the other.
      const list = f.packets ?? [];
      while (packets.length < list.length) packets.push(packetView());
      let cursor = 0.35;
      let last = 0;
      packets.forEach((pv, i) => {
        const p = list[i];
        pv.curve = p ? packetCurve(p) : null;
        pv.group.visible = false;
        if (!p || !pv.curve) return;
        const len = pv.curve.getLength();
        pv.start = p.at ?? cursor;
        pv.end = pv.start + Math.max(0.8, len / SPEED);
        pv.drop = !!p.drop;
        pv.color.set(PACKET_COLORS[p.color ?? "orange"]);
        pv.body.color.copy(pv.color);
        cursor = pv.end + 0.2;
        last = Math.max(last, pv.end);
      });
      cycle = last + 1.6;
      frameStart = performance.now();

      if (!first && controls) {
        const ins = measureInsets();
        insetL = ins.l;
        insetR = ins.r;
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
    function project(p: THREE.Vector3, w: number, h: number) {
      tmp.copy(p).project(camera);
      return {
        x: (tmp.x * 0.5 + 0.5) * w,
        y: (-tmp.y * 0.5 + 0.5) * h,
        behind: tmp.z > 1,
      };
    }
    const world = new THREE.Vector3();
    function anchorOf(name: string): THREE.Vector3 | null {
      const [kind, id] = name.split(":");
      if (kind === "dev") {
        const d = devices.get(id);
        if (!d || d.vis < 0.5) return null;
        return d.label.getWorldPosition(world);
      }
      if (kind === "zone")
        return zoneAnchors.get(id)?.getWorldPosition(world) ?? null;
      if (kind === "link") {
        const l = links.get(id);
        if (!l || !l.shown || l.grow < 0.9) return null;
        return l.mid.getWorldPosition(world);
      }
      if (kind === "pkt") {
        const pv = packets[Number(id)];
        if (!pv || !pv.group.visible) return null;
        return world.copy(pv.group.position).setY(pv.group.position.y + 0.3);
      }
      return null;
    }

    type Rect = { x: number; y: number; w: number; h: number };
    const overlap = (a: Rect, b: Rect) =>
      Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) *
      Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
    const choice = new Map<string, number>();

    function placeLabels() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      if (w < 2 || h < 2) return;
      for (const el of host!.querySelectorAll<HTMLElement>("[data-net-at]")) {
        const p = anchorOf(el.dataset.netAt ?? "");
        if (!p) {
          el.style.opacity = "0";
          continue;
        }
        const at = project(p, w, h);
        el.style.opacity = at.behind ? "0" : "1";
        el.style.transform = `translate(${at.x}px, ${at.y}px) ${el.dataset.netAlign ?? ""}`;
      }

      // Cards: the note and the consoles, kept clear of the side cards.
      const obstacles: Rect[] = [];
      const area = canvas!.getBoundingClientRect();
      const card = document.querySelector<HTMLElement>(".floating-lab-card");
      let left = 16;
      if (card) {
        const r = card.getBoundingClientRect();
        obstacles.push({
          x: r.left - area.left - 8,
          y: r.top - area.top - 8,
          w: r.width + 16,
          h: r.height + 16,
        });
        left = Math.max(16, r.left - area.left);
      }
      if (w >= 900) {
        obstacles.push({ x: w - 408, y: h - 560, w: 408, h: 560 });
        obstacles.push({ x: w - 520, y: 0, w: 520, h: 96 });
      }
      const hint = host!.querySelector<HTMLElement>("[data-net-hint]");
      if (hint) hint.style.left = `${Math.max(16, insetL)}px`;

      // Keep cards off the devices the step is about.
      const f = frameRef.current;
      for (const id of new Set([...(f.hot ?? []), ...(f.focus ?? [])])) {
        const d = devices.get(id);
        if (!d || d.vis < 0.5) continue;
        const top = project(d.label.getWorldPosition(world), w, h);
        const base = project(d.group.getWorldPosition(world), w, h);
        const x0 = Math.min(top.x, base.x) - 50;
        const x1 = Math.max(top.x, base.x) + 50;
        obstacles.push({
          x: x0,
          y: top.y - 30,
          w: x1 - x0,
          h: base.y - top.y + 50,
        });
      }
      // And, less firmly, off every other device's label.
      for (const [id, d] of devices) {
        if (!d.dev.name || d.vis < 0.5 || f.hot?.includes(id)) continue;
        const at = project(d.label.getWorldPosition(world), w, h);
        obstacles.push({ x: at.x - 45, y: at.y - 40, w: 90, h: 44 });
      }
      const placed: Rect[] = [];
      for (const el of host!.querySelectorAll<HTMLElement>("[data-net-card]")) {
        const id = el.dataset.netCard ?? "";
        const lead = host!.querySelector<SVGLineElement>(
          `[data-net-lead="${id}"]`,
        );
        const dot = host!.querySelector<SVGCircleElement>(
          `[data-net-dot="${id}"]`,
        );
        const p = anchorOf(`dev:${el.dataset.netAnchor ?? ""}`);
        if (!p) {
          el.style.opacity = "0";
          lead?.setAttribute("opacity", "0");
          dot?.setAttribute("opacity", "0");
          continue;
        }
        const at = project(p, w, h);
        const cw = el.offsetWidth || 260;
        const ch = el.offsetHeight || 120;
        const g = 44;
        const cands: Rect[] = [
          { x: at.x + g, y: at.y - ch - g * 0.6, w: cw, h: ch },
          { x: at.x - cw - g, y: at.y - ch - g * 0.6, w: cw, h: ch },
          { x: at.x + g, y: at.y - ch / 2, w: cw, h: ch },
          { x: at.x - cw - g, y: at.y - ch / 2, w: cw, h: ch },
          { x: at.x + g, y: at.y + g * 0.6, w: cw, h: ch },
          { x: at.x - cw - g, y: at.y + g * 0.6, w: cw, h: ch },
          { x: at.x - cw / 2, y: at.y - ch - g * 1.4, w: cw, h: ch },
        ];
        const clamp = (r: Rect): Rect => ({
          ...r,
          x: Math.max(left, Math.min(r.x, w - r.w - 16)),
          y: Math.max(76, Math.min(r.y, h - r.h - 16)),
        });
        const score = (r: Rect) => {
          const c = clamp(r);
          let s = Math.hypot(c.x - r.x, c.y - r.y) * 40;
          for (const o of [...obstacles, ...placed]) s += overlap(c, o);
          return s;
        };
        const prev = choice.get(id);
        let best = 0;
        let bestScore = Infinity;
        cands.forEach((r, i) => {
          const s = score(r) - (i === prev ? 400 : 0);
          if (s < bestScore) {
            bestScore = s;
            best = i;
          }
        });
        choice.set(id, best);
        const r = clamp(cands[best]);
        placed.push(r);
        el.style.opacity = at.behind ? "0" : "1";
        el.style.transform = `translate(${r.x}px, ${r.y}px)`;
        if (lead && dot) {
          const fromX = at.x < r.x ? r.x : at.x > r.x + r.w ? r.x + r.w : at.x;
          const fromY = at.y < r.y ? r.y : at.y > r.y + r.h ? r.y + r.h : at.y;
          lead.setAttribute("x1", String(fromX));
          lead.setAttribute("y1", String(fromY));
          lead.setAttribute("x2", String(at.x));
          lead.setAttribute("y2", String(at.y));
          lead.setAttribute("opacity", "1");
          dot.setAttribute("cx", String(at.x));
          dot.setAttribute("cy", String(at.y));
          dot.setAttribute("opacity", "1");
        }
      }
    }

    // ── Animation ─────────────────────────────────────────────────────────
    const ease = (t: number) => 1 - (1 - t) ** 3;
    const pop = (t: number) => {
      const c = 1.7;
      return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2;
    };
    const towards = (rate: number, steps: number) => 1 - (1 - rate) ** steps;
    let raf = 0;
    let lastNow = performance.now();

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    function tick(now: number) {
      raf = requestAnimationFrame(tick);
      const steps = Math.min(4, Math.max(0, (now - lastNow) / (1000 / 60)));
      lastNow = now;
      const f = frameRef.current;
      if (f !== shown) {
        enter(f, shown === null);
        shown = f;
      }
      const hot = new Set(f.hot ?? []);
      const busy = new Set(f.busy ?? []);

      for (const [id, d] of devices) {
        d.vis += ((d.shown ? 1 : 0) - d.vis) * towards(0.12, steps);
        if (Math.abs(d.vis - (d.shown ? 1 : 0)) < 0.002)
          d.vis = d.shown ? 1 : 0;
        const s = d.shown ? pop(Math.min(1, d.vis)) : d.vis;
        d.group.scale.setScalar(Math.max(0.0001, s));
        d.group.visible = d.vis > 0.01;
        d.group.position.lerp(d.goal, towards(0.08, steps));
        const on = hot.has(id);
        const goal = on ? 0.55 + 0.25 * Math.sin(now / 260) : 0;
        d.ring.opacity += (goal - d.ring.opacity) * towards(0.15, steps);
        const blink = busy.has(id);
        d.leds.forEach((m, i) => {
          const lit = !blink || Math.sin(now / 90 + i * 1.7) > -0.2;
          m.color.setHex(lit ? LED_ON : 0x1f5f3a);
        });
        d.update?.(f, now, towards(0.1, steps));
      }
      for (const m of waves) {
        m.opacity =
          0.25 + 0.35 * (0.5 + 0.5 * Math.sin(now / 400 + waves.indexOf(m)));
      }
      layJackets();

      for (const l of links.values()) {
        l.grow +=
          ((l.shown ? 1 : 0) - l.grow) * towards(l.shown ? 0.05 : 0.2, steps);
        if (l.shown && l.grow > 0.995) l.grow = 1;
        const vis = l.grow > 0.003;
        l.mesh.visible = vis;
        if (l.mesh instanceof THREE.Line) {
          const n = Math.floor(l.grow * l.count);
          l.mesh.geometry.setDrawRange(0, n);
        } else {
          const segs = l.count / 6;
          const n = Math.floor(l.grow * segs) * 6;
          l.mesh.geometry.setDrawRange(0, n);
        }
        const dots = (l.mesh.userData.dots ?? []) as THREE.Object3D[];
        for (const dot of dots) dot.visible = l.shown && l.grow > 0.97;
      }

      // Packets loop along their path.
      const t = ((now - frameStart) / 1000) % cycle;
      for (const pv of packets) {
        if (!pv.curve) {
          pv.group.visible = false;
          continue;
        }
        const dur = pv.end - pv.start;
        if (t < pv.start || t > pv.end + 0.45) {
          pv.group.visible = false;
          continue;
        }
        pv.group.visible = true;
        const u = Math.min(1, (t - pv.start) / dur);
        pv.group.position.copy(pv.curve.getPointAt(ease(u) * 0.15 + u * 0.85));
        const tail = Math.max(0, (t - pv.end) / 0.45);
        if (pv.drop && u >= 1) {
          pv.body.color.setHex(0xdc2626);
          pv.group.scale.setScalar(Math.max(0.001, 1 - tail));
        } else {
          pv.body.color.copy(pv.color);
          pv.group.scale.setScalar(
            Math.max(0.001, u >= 1 ? 1 - tail : Math.min(1, u * 8)),
          );
        }
      }

      if (preview) {
        root.rotation.y = Math.sin(now / 5200) * 0.18;
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
          !(child instanceof THREE.LineSegments) &&
          !(child instanceof THREE.Line)
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
  }, [bench, preview]);

  const deviceShown = (id: string) => !frame.show || frame.show.includes(id);
  const linkShown = (link: NetLink) =>
    (!frame.show || frame.show.includes(link.id)) &&
    deviceShown(link.a) &&
    deviceShown(link.b);

  return (
    <div
      ref={hostRef}
      className={`relative h-full w-full overflow-hidden bg-[#fafafa] ${preview ? "pointer-events-none" : ""}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {!preview && (
        <>
          <style>{`
            @keyframes net-card {
              from { opacity: 0; scale: 0.96; }
              to { opacity: 1; scale: 1; }
            }
          `}</style>
          {(bench.zones ?? []).map((zone) => (
            <div
              key={zone.id}
              data-net-at={`zone:${zone.id}`}
              data-net-align="translate(0, -100%)"
              className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full bg-white/95 px-2 py-0.5 font-sans text-[11px] font-medium text-[#525252] shadow-[0_1px_3px_rgba(23,23,23,0.08)] ring-1 ring-[#e4e4e7]"
            >
              {zone.label}
            </div>
          ))}
          {bench.links.map((link) => {
            const state = frame.links?.[link.id];
            const text =
              state === "down" ? `✕ ${link.label ?? "No link"}` : link.label;
            if (!text || !linkShown(link)) return null;
            return (
              <div
                key={link.id}
                data-net-at={`link:${link.id}`}
                data-net-align="translate(-50%, -50%)"
                className={`pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded px-1.5 py-px font-mono text-[10px] leading-tight shadow-[0_1px_3px_rgba(23,23,23,0.08)] ring-1 ${
                  state === "down"
                    ? "bg-[#fef2f2] text-[#b91c1c] ring-[#fecaca]"
                    : frame.hot?.includes(link.id)
                      ? "bg-[#fff7ed] text-[#c2410c] ring-[#fed7aa]"
                      : "bg-white/95 text-[#525252] ring-[#e4e4e7]"
                }`}
              >
                {text}
              </div>
            );
          })}
          {bench.devices.map((dev) => {
            if (!dev.name || !deviceShown(dev.id)) return null;
            const hot = frame.hot?.includes(dev.id);
            const lines = frame.addr?.[dev.id] ?? dev.addresses ?? [];
            const tag = frame.tags?.[dev.id];
            return (
              <div
                key={dev.id}
                data-net-at={`dev:${dev.id}`}
                data-net-align="translate(-50%, -100%)"
                className={`pointer-events-none absolute left-0 top-0 flex flex-col items-center rounded-md bg-white/95 px-2 py-1 text-center ring-1 transition-shadow duration-300 ${
                  hot
                    ? "shadow-[0_6px_18px_rgba(23,23,23,0.14)] ring-[#f59e0b]"
                    : "shadow-[0_1px_3px_rgba(23,23,23,0.08)] ring-[#e4e4e7]"
                }`}
              >
                <p className="m-0 whitespace-nowrap font-sans text-[12px] font-semibold leading-tight text-[#24345f]">
                  {dev.name}
                </p>
                {lines.map((line) => (
                  <p
                    key={line}
                    className="m-0 whitespace-nowrap font-mono text-[10.5px] leading-tight text-[#525252]"
                  >
                    {line}
                  </p>
                ))}
                {tag && (
                  <span
                    className={`mt-0.5 whitespace-nowrap rounded-full px-1.5 py-px font-sans text-[10px] font-medium leading-tight ring-1 ${tagTone(tag)}`}
                  >
                    {tag}
                  </span>
                )}
              </div>
            );
          })}
          {(frame.packets ?? []).map((p, i) =>
            p.label ? (
              <div
                key={`${i}-${p.label}`}
                data-net-at={`pkt:${i}`}
                data-net-align="translate(-50%, -130%)"
                className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full px-1.5 py-px font-mono text-[10px] font-semibold leading-tight text-white shadow-[0_2px_6px_rgba(23,23,23,0.18)]"
                style={{
                  backgroundColor:
                    PACKET_COLORS[p.drop ? "red" : (p.color ?? "orange")],
                }}
              >
                {p.drop ? `✕ ${p.label}` : p.label}
              </div>
            ) : null,
          )}
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            {[
              ...(frame.note ? ["note"] : []),
              ...(frame.consoles ?? []).map((_, i) => `c${i}`),
            ].map((id) => (
              <g key={id}>
                <line
                  data-net-lead={id}
                  stroke={id === "note" ? "#f59e0b" : "#93a4c8"}
                  strokeWidth="1.25"
                  opacity="0"
                />
                <circle
                  data-net-dot={id}
                  r="3.5"
                  fill={id === "note" ? "#f59e0b" : "#3b6fe0"}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  opacity="0"
                />
              </g>
            ))}
          </svg>
          {frame.note && (
            <div
              key={`note|${frame.note.title}`}
              data-net-card="note"
              data-net-anchor={
                frame.note.at ??
                frame.hot?.find((id) =>
                  bench.devices.some((d) => d.id === id),
                ) ??
                frame.focus?.[0] ??
                bench.devices[0]?.id
              }
              style={{ opacity: 0 }}
              className="pointer-events-none absolute left-0 top-0 w-[260px] rounded-lg bg-white px-2.5 py-1.5 shadow-[0_10px_28px_rgba(23,23,23,0.14)] ring-1 ring-[#e4e4e7]"
            >
              <div
                style={{
                  animation: "net-card 420ms cubic-bezier(0.22,1,0.36,1) both",
                }}
              >
                <p className="m-0 font-sans text-[12px] font-semibold leading-tight text-[#c2410c]">
                  {frame.note.title}
                </p>
                <p className="m-0 mt-0.5 font-sans text-[12px] leading-snug text-[#262626]">
                  {frame.note.text}
                </p>
              </div>
            </div>
          )}
          {(frame.consoles ?? []).map((c, i) => (
            <div
              key={`c${i}|${c.title}|${c.lines.length}`}
              data-net-card={`c${i}`}
              data-net-anchor={c.at}
              style={{ opacity: 0 }}
              className="pointer-events-none absolute left-0 top-0 max-w-[440px] overflow-hidden rounded-lg bg-white shadow-[0_10px_28px_rgba(23,23,23,0.14)] ring-1 ring-[#e4e4e7]"
            >
              <div
                style={{
                  animation: "net-card 420ms cubic-bezier(0.22,1,0.36,1) both",
                }}
              >
                <div className="flex items-center gap-1.5 border-b border-[#f0f0f0] bg-[#fafafa] px-2.5 py-1">
                  <span className="h-2 w-2 rounded-full bg-[#d3defa]" />
                  <p className="m-0 truncate font-sans text-[11px] font-medium text-[#525252]">
                    {c.title}
                  </p>
                </div>
                <pre className="m-0 whitespace-pre px-2.5 py-1.5 font-mono text-[10.5px] leading-[1.45] text-[#404040]">
                  {c.lines.map((line, j) => (
                    <div key={j}>
                      <ConsoleLine line={line} />
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          ))}
          <p
            data-net-hint
            className="pointer-events-none absolute bottom-3 z-[1] m-0 font-sans text-[12px] text-[#525252]"
          >
            Drag to turn the room. Hold Shift and drag to slide it.
          </p>
        </>
      )}
    </div>
  );
}
