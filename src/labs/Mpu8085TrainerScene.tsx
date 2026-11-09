"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { bindCtrlPan } from "./ctrl-pan";

import {
  FLAG_BITS,
  type KitBeat,
  FN_KEYS,
  HEX_KEYS,
  KEY_LEGEND,
  cellOf,
  hex2,
  hex4,
  type KitFrame,
  type KitLcd,
  type KitProgram,
  type KitRegs,
  type KitSpot,
  type KitState,
  type TrainerKey,
} from "@/labs/mpu8085/trainer";

type Props = {
  program: KitProgram;
  frame: KitFrame;
  /** A still card for Explore: no controls, the whole kit in view. */
  preview?: boolean;
  /** Goes on to the next procedure step once every command has run. */
  onNextStep?: () => void;
};

// ── Look: a white trainer on the same warm-white floor as the breadboard ──
const FLOOR = 0xf7f6f3;
const CASE = 0xf3f4f6;
const RIM = 0xe4e7ec;
const BOARD = 0xfbfcfd;
const SILK = "#7b8798";
const SILK_DARK = "#475163";
const ACCENT = "#2f5bd3";
const PANEL_LINE = "#c3d0e6";
const CHIP = 0x24262c;
const PIN = 0xc8cdd5;
const LED_BODY = 0x16171b;
const SEG_ON = "#ff3b2f";
const SEG_OFF = "#3a1717";
const BEAD = 0x2563eb;
const HINT_COLOR = new THREE.Color(0x93c5fd);
/** Pause between commands in auto play. */
const AUTO_PAUSE_MS = 1300;
const HOT = 0x3b82f6;
const LCD_BG = "#cfe0b8";
const LCD_INK = "#1f2a17";

/** Top of the board: everything sits on it. */
const Y0 = 0.42;

// Timing, in seconds.
const LEAD = 0.25;
/** One key press. */
const KEY_DT = 0.45;
/** One flight of a byte. */
const STAGE = 1.6;
const GAP = 0.3;

// ── Layout (board units, x right, z towards the student) ──────────────────
const REG_SPOTS: Record<string, [number, number, number]> = {
  // x, z, digits
  A: [-6.15, -1.55, 2],
  B: [-6.15, -0.7, 2],
  C: [-4.95, -0.7, 2],
  D: [-6.15, 0.15, 2],
  E: [-4.95, 0.15, 2],
  H: [-6.15, 1.0, 2],
  L: [-4.95, 1.0, 2],
  SP: [-3.25, -0.7, 4],
  PC: [-3.25, 0.15, 4],
  IR: [-3.6, 1.0, 2],
};
const FLAGS_AT = { x: -4.15, z: -1.55 };
const ALU_AT = { x: -1.45, z: -0.95 };
const MEM_X0 = 0.75;
const MEM_PITCH = 0.84;
const MEM_ROW_Z = [-1.45, -0.2];
const DISPLAY_AT = { x: 3.95, z: 1.12 };
const KEY_PITCH_X = 0.8;
const KEY_PITCH_Z = 0.74;
const KEY_Z0 = 2.2;
const FN_X0 = 0.75;
const HEX_X0 = 4.15;
const LCD_AT = { x: -3.9, z: 3.4, w: 6.2, d: 3.0 };
const LCD_COLS = 40;
const LCD_ROWS = 8;
const CHIPS: {
  id: string;
  x: number;
  pins: number;
  name: string;
  sub: string;
}[] = [
  { id: "CPU", x: -4.6, pins: 40, name: "8085A", sub: "CPU" },
  { id: "ROM", x: -1.75, pins: 28, name: "2764", sub: "MONITOR EPROM" },
  { id: "RAM", x: 0.6, pins: 28, name: "6264", sub: "RAM 8000–9FFF" },
  { id: "PPI", x: 3.1, pins: 40, name: "8255", sub: "PPI" },
  { id: "KDC", x: 5.75, pins: 40, name: "8279", sub: "KEYBOARD / DISPLAY" },
];
const CHIP_Z = -3.95;

// ── 7-segment digits ──────────────────────────────────────────────────────
const SEGMENTS: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abdeg",
  "3": "abcdg",
  "4": "bcfg",
  "5": "acdfg",
  "6": "acdefg",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
  A: "abcefg",
  B: "cdefg",
  C: "adef",
  D: "bcdeg",
  E: "adefg",
  F: "aefg",
  U: "bcdef",
  P: "abefg",
  "-": "g",
  " ": "",
};

function drawDigit(
  ctx: CanvasRenderingContext2D,
  ch: string,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const lit = SEGMENTS[ch.toUpperCase()] ?? "";
  const t = w * 0.17;
  const skew = w * 0.1;
  const half = h / 2;
  // Each segment as a hexagon between two points.
  const seg = (x1: number, y1: number, x2: number, y2: number, on: boolean) => {
    ctx.fillStyle = on ? SEG_ON : SEG_OFF;
    if (on) {
      ctx.shadowColor = "rgba(255,60,40,0.85)";
      ctx.shadowBlur = t * 0.9;
    } else ctx.shadowBlur = 0;
    const sx = (yy: number) => skew * (1 - (yy - y) / h);
    ctx.beginPath();
    if (y1 === y2) {
      ctx.moveTo(x1 + sx(y1), y1);
      ctx.lineTo(x1 + t / 2 + sx(y1 - t / 2), y1 - t / 2);
      ctx.lineTo(x2 - t / 2 + sx(y1 - t / 2), y1 - t / 2);
      ctx.lineTo(x2 + sx(y1), y1);
      ctx.lineTo(x2 - t / 2 + sx(y1 + t / 2), y1 + t / 2);
      ctx.lineTo(x1 + t / 2 + sx(y1 + t / 2), y1 + t / 2);
    } else {
      ctx.moveTo(x1 + sx(y1), y1);
      ctx.lineTo(x1 + t / 2 + sx(y1 + t / 2), y1 + t / 2);
      ctx.lineTo(x1 + t / 2 + sx(y2 - t / 2), y2 - t / 2);
      ctx.lineTo(x1 + sx(y2), y2);
      ctx.lineTo(x1 - t / 2 + sx(y2 - t / 2), y2 - t / 2);
      ctx.lineTo(x1 - t / 2 + sx(y1 + t / 2), y1 + t / 2);
    }
    ctx.closePath();
    ctx.fill();
  };
  const l = x + t * 0.6;
  const r = x + w - t * 0.6;
  const top = y + t * 0.6;
  const mid = y + half;
  const bot = y + h - t * 0.6;
  seg(l, top, r, top, lit.includes("a"));
  seg(r, top, r, mid, lit.includes("b"));
  seg(r, mid, r, bot, lit.includes("c"));
  seg(l, bot, r, bot, lit.includes("d"));
  seg(l, mid, l, bot, lit.includes("e"));
  seg(l, top, l, mid, lit.includes("f"));
  seg(l, mid, r, mid, lit.includes("g"));
  ctx.shadowBlur = 0;
}

/** Window rows of the LCD for one state of the monitor. */
function lcdText(
  program: KitProgram,
  lcd: KitLcd,
  mem: number[],
): { lines: string[]; pointer: number } {
  const L = program.listing;
  const blank = { lines: [] as string[], pointer: -1 };
  if (lcd.mode === "off") return blank;
  if (lcd.mode === "sign-on")
    return {
      lines: [
        "VLABS 8085 TRAINER       MONITOR 1.0",
        "",
        "RAM    8000H-9FFFH   EPROM 0000H-1FFFH",
        "",
        "EX MEM  type or check memory",
        "SI      single-step a program",
        "GO      run a program at full speed",
        "RESET   back to this screen",
      ],
      pointer: -1,
    };
  const fmtLine = (i: number, mark: string, upto?: number) => {
    const l = L[i];
    const bytes = l.bytes
      .map((b, k) =>
        upto === undefined || l.address + k <= upto ? hex2(b) : "··",
      )
      .join("");
    const label = l.label ? `${l.label}:` : "";
    return `${mark}${hex4(l.address)} ${bytes.padEnd(7)}${label.padEnd(8)}${l.text}`;
  };
  const windowAround = (i: number, rows: number) => {
    const start = Math.max(0, Math.min(i - 2, L.length - rows));
    return { start: Math.max(0, start), end: Math.min(L.length, start + rows) };
  };
  const lineIndexAt = (addr: number) =>
    L.findIndex((l) => addr >= l.address && addr < l.address + l.bytes.length);
  const dump = (head: string, at: number) => {
    const lines = [head, ""];
    let pointer = -1;
    program.rows.forEach((base, r) => {
      const cells = mem.slice(r * 8, r * 8 + 8);
      const inRow = at >= base && at < base + 8;
      if (inRow) pointer = lines.length;
      lines.push(
        `${inRow ? ">" : " "}${hex4(base)}  ${cells.map((b, k) => (base + k === at ? `[${hex2(b)}]` : ` ${hex2(b)} `)).join("")}`,
      );
    });
    return { lines, pointer };
  };
  if (lcd.mode === "read")
    return dump(`EX MEM  ${hex4(lcd.at)}H  (reading)`, lcd.at);
  if (lcd.mode === "edit") {
    const li = lineIndexAt(lcd.at);
    const end = L.length
      ? L[L.length - 1].address + L[L.length - 1].bytes.length
      : 0;
    if (li < 0 && lcd.at !== end && cellOf(program.rows, lcd.at) >= 0)
      return dump(`EX MEM  ${hex4(lcd.at)}H  data`, lcd.at);
    const idx = li < 0 ? L.length - 1 : li;
    const { start, end: stop } = windowAround(idx, LCD_ROWS - 2);
    const lines = [`EX MEM  ${hex4(lcd.at)}H  entering program`, ""];
    let pointer = -1;
    for (let i = start; i < stop; i++) {
      const entered = L[i].address <= lcd.upto;
      if (i === idx && li >= 0) pointer = lines.length;
      lines.push(
        entered || i === idx
          ? fmtLine(i, i === idx && li >= 0 ? ">" : " ", lcd.upto)
          : ` ${hex4(L[i].address)}`,
      );
    }
    return { lines, pointer };
  }
  // Single step.
  const li = lineIndexAt(lcd.pc);
  const head = lcd.halted
    ? `HALTED       PC=${hex4(lcd.pc)}H`
    : `SINGLE STEP  PC=${hex4(lcd.pc)}H  NEXT runs >`;
  if (li < 0) return { lines: [head], pointer: -1 };
  const { start, end } = windowAround(li, LCD_ROWS - 2);
  const lines = [head, ""];
  let pointer = -1;
  for (let i = start; i < end; i++) {
    if (i === li && !lcd.halted) pointer = lines.length;
    lines.push(fmtLine(i, i === li && !lcd.halted ? ">" : " "));
  }
  return { lines, pointer };
}

type Bead = {
  ball: THREE.Mesh;
  halo: THREE.Sprite;
  tag: THREE.Sprite;
  tagCanvas: HTMLCanvasElement;
  tagText: string;
};

type Flight = {
  curve: THREE.QuadraticBezierCurve3;
  tube: THREE.Mesh;
  text: string;
  start: number;
  from: KitSpot;
  to: KitSpot;
};

/**
 * The 8085 trainer kit, white. The chips at the back, the bus LEDs, a
 * register panel that shows every register of the 8085, the memory cells
 * the program uses, the LCD with the program listing and its pointer, the
 * address/data display, and the keypad. Each step presses its keys, then
 * flies its bytes from where they are read to where they are written.
 */
export function Mpu8085TrainerScene({
  program,
  frame,
  preview = false,
  onNextStep,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(frame);
  const programRef = useRef(program);
  // How many commands of this frame have been asked for. A new frame
  // starts again from none, so the kit waits on the state before it.
  const [asked, setAsked] = useState({ frame, beat: 0 });
  if (asked.frame !== frame) setAsked({ frame, beat: 0 });
  const beat = asked.frame === frame ? asked.beat : 0;
  const beatRef = useRef(beat);
  // True while the kit is still playing towards the last command asked for.
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(setBusy);
  const count = frame.beats.length;
  const goTo = (b: number) =>
    setAsked({ frame, beat: Math.max(0, Math.min(count, b)) });
  // Pressing the glowing key on the kit runs the next command.
  const pressRef = useRef(() => {});
  // Auto play runs the commands of a step one after another, with a pause
  // between them, and stops at the end of the step.
  const [auto, setAuto] = useState(false);
  useEffect(() => {
    if (!auto || busy || beat >= count) return;
    const timer = window.setTimeout(
      () =>
        setAsked((a) =>
          a.frame === frame ? { frame, beat: Math.min(count, a.beat + 1) } : a,
        ),
      AUTO_PAUSE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [auto, busy, beat, count, frame]);

  useEffect(() => {
    frameRef.current = frame;
    programRef.current = program;
    beatRef.current = beat;
    pressRef.current = () => goTo(beat + 1);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const family =
      getComputedStyle(document.body).fontFamily ||
      "Helvetica, Arial, sans-serif";
    const MONO = "ui-monospace, Consolas, 'Courier New', monospace";

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(FLOOR, 1);
    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
    const controls = new OrbitControls(camera, canvas);
    controls.enabled = !preview;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 3;
    controls.maxDistance = 45;
    controls.maxPolarAngle = Math.PI * 0.46;
    controls.rotateSpeed = 0.6;
    const releasePan = bindCtrlPan(controls);

    scene.add(new THREE.AmbientLight(0xffffff, 1.55));
    const sun = new THREE.DirectionalLight(0xffffff, 1.25);
    sun.position.set(3, 10, 6);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xffffff, 0.35);
    fill.position.set(-5, 4, -4);
    scene.add(fill);

    const root = new THREE.Group();
    scene.add(root);

    // ── Helpers ────────────────────────────────────────────────────────
    const lambert = new Map<number, THREE.MeshStandardMaterial>();
    const mat = (color: number, rough = 0.7, metal = 0) => {
      const k = color * 1000 + Math.round(rough * 100) + metal * 7;
      let m = lambert.get(k);
      if (!m) {
        m = new THREE.MeshStandardMaterial({
          color,
          roughness: rough,
          metalness: metal,
        });
        lambert.set(k, m);
      }
      return m;
    };
    const boxMesh = (
      w: number,
      h: number,
      d: number,
      m: THREE.Material,
      x: number,
      y: number,
      z: number,
      parent: THREE.Object3D = root,
    ) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      mesh.position.set(x, y, z);
      parent.add(mesh);
      return mesh;
    };
    const texture = (cvs: HTMLCanvasElement) => {
      const t = new THREE.CanvasTexture(cvs);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = maxAniso;
      return t;
    };
    /** A flat canvas lying on the board. `draw` paints it in canvas pixels. */
    const decal = (
      w: number,
      d: number,
      x: number,
      y: number,
      z: number,
      px: number,
      draw: (ctx: CanvasRenderingContext2D, W: number, H: number) => void,
      opts: { transparent?: boolean; parent?: THREE.Object3D } = {},
    ) => {
      const cvs = document.createElement("canvas");
      cvs.width = Math.round(w * px);
      cvs.height = Math.round(d * px);
      const ctx = cvs.getContext("2d")!;
      draw(ctx, cvs.width, cvs.height);
      const tex = texture(cvs);
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(w, d),
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: opts.transparent ?? true,
          depthWrite: !(opts.transparent ?? true),
        }),
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(x, y, z);
      (opts.parent ?? root).add(mesh);
      return {
        mesh,
        redraw: () => {
          ctx.clearRect(0, 0, cvs.width, cvs.height);
          draw(ctx, cvs.width, cvs.height);
          tex.needsUpdate = true;
        },
        ctx,
        cvs,
        tex,
      };
    };
    /** Silkscreen text on the board. */
    const silk = (
      text: string,
      x: number,
      z: number,
      size: number,
      color = SILK,
      align: CanvasTextAlign = "center",
      weight = 700,
    ) => {
      const px = 200;
      const h = size * 1.5;
      const w = Math.max(0.2, text.length * size * 0.72 + size);
      const dx = align === "left" ? w / 2 : align === "right" ? -w / 2 : 0;
      decal(
        w,
        h,
        x +
          dx -
          (align === "left" ? size * 0.5 : align === "right" ? -size * 0.5 : 0),
        Y0 + 0.004,
        z,
        px,
        (ctx, W, H) => {
          ctx.fillStyle = color;
          ctx.font = `${weight} ${Math.round(size * px)}px ${family}`;
          ctx.textAlign = align;
          ctx.textBaseline = "middle";
          const tx =
            align === "left"
              ? size * px * 0.5
              : align === "right"
                ? W - size * px * 0.5
                : W / 2;
          ctx.fillText(text, tx, H / 2);
        },
      );
    };
    /** A rounded outline on the board, for the panel areas. */
    const outline = (
      x0: number,
      z0: number,
      x1: number,
      z1: number,
      title?: string,
    ) => {
      const w = x1 - x0;
      const d = z1 - z0;
      const px = 120;
      decal(w, d, (x0 + x1) / 2, Y0 + 0.002, (z0 + z1) / 2, px, (ctx, W, H) => {
        ctx.strokeStyle = PANEL_LINE;
        ctx.lineWidth = 3;
        const r = 18;
        ctx.beginPath();
        ctx.roundRect(2, 2, W - 4, H - 4, r);
        ctx.stroke();
        if (title) {
          ctx.font = `800 ${Math.round(0.17 * px)}px ${family}`;
          const tw = ctx.measureText(title).width + 20;
          ctx.clearRect(22, 0, tw, 8);
          ctx.fillStyle = ACCENT;
          ctx.textBaseline = "middle";
          ctx.fillText(title, 32, 4 + 0.13 * px);
        }
      });
    };

    // ── Floor shadow, case and board ───────────────────────────────────
    decal(19, 15, 0, 0.001, 0.4, 24, (ctx, W, H) => {
      const g = ctx.createRadialGradient(
        W / 2,
        H / 2,
        W * 0.2,
        W / 2,
        H / 2,
        W * 0.5,
      );
      g.addColorStop(0, "rgba(40,40,50,0.16)");
      g.addColorStop(1, "rgba(40,40,50,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    });
    const caseMat = mat(CASE, 0.55);
    boxMesh(15.4, 0.3, 10.9, caseMat, 0, 0.15, 0);
    const rimMat = mat(RIM, 0.5);
    for (const [w, d, x, z] of [
      [15.4, 0.26, 0, -5.32],
      [15.4, 0.26, 0, 5.32],
      [0.26, 10.9, -7.57, 0],
      [0.26, 10.9, 7.57, 0],
    ] as const)
      boxMesh(w, 0.22, d, rimMat, x, 0.41, z);
    const board = boxMesh(14.88, 0.1, 10.38, mat(BOARD, 0.8), 0, Y0 - 0.05, 0);
    board.name = "board";
    // Feet.
    for (const [x, z] of [
      [-7.1, -4.9],
      [7.1, -4.9],
      [-7.1, 4.9],
      [7.1, 4.9],
    ])
      boxMesh(0.6, 0.06, 0.6, mat(0xbfc4cc), x, 0.0, z);
    // Mounting screws.
    for (const [x, z] of [
      [-7.05, -4.85],
      [7.05, -4.85],
      [-7.05, 4.85],
      [7.05, 4.85],
    ]) {
      const screw = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.04, 20),
        mat(0xd3d7de, 0.35, 0.6),
      );
      screw.position.set(x, Y0 + 0.02, z);
      root.add(screw);
    }

    silk(
      "VLABS  8085  MICROPROCESSOR  TRAINER  KIT",
      -3.1,
      -4.9,
      0.2,
      SILK_DARK,
      "center",
      800,
    );
    silk("+5V DC", 6.1, -4.9, 0.14, SILK);

    // ── Chips ─────────────────────────────────────────────────────────
    const chipBody = mat(CHIP, 0.55);
    const pinMat = mat(PIN, 0.3, 0.7);
    const chipCenters = new Map<string, THREE.Vector3>();
    for (const c of CHIPS) {
      const len = c.pins === 40 ? 2.35 : 1.7;
      const wide = c.pins === 40 ? 0.72 : 0.62;
      // Socket.
      boxMesh(
        len + 0.18,
        0.06,
        wide + 0.3,
        mat(0xe9ebef, 0.6),
        c.x,
        Y0 + 0.03,
        CHIP_Z,
      );
      boxMesh(len, 0.17, wide, chipBody, c.x, Y0 + 0.15, CHIP_Z);
      const n = c.pins / 2;
      const pitch = len / n;
      const pins = new THREE.InstancedMesh(
        new THREE.BoxGeometry(pitch * 0.45, 0.05, 0.12),
        pinMat,
        n * 2,
      );
      const place = new THREE.Matrix4();
      for (let i = 0; i < n; i++)
        [-1, 1].forEach((side, k) => {
          place.makeTranslation(
            c.x - len / 2 + pitch * (i + 0.5),
            Y0 + 0.1,
            CHIP_Z + side * (wide / 2 + 0.05),
          );
          pins.setMatrixAt(i * 2 + k, place);
        });
      root.add(pins);
      // Notch and markings.
      decal(
        len * 0.96,
        wide * 0.92,
        c.x,
        Y0 + 0.236,
        CHIP_Z,
        220,
        (ctx, W, H) => {
          ctx.fillStyle = "rgba(255,255,255,0.12)";
          ctx.beginPath();
          ctx.arc(0, H / 2, H * 0.16, -Math.PI / 2, Math.PI / 2);
          ctx.fill();
          ctx.fillStyle = "#e5e7eb";
          ctx.font = `800 ${Math.round(H * 0.36)}px ${family}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(c.name, W / 2, H * 0.4);
          ctx.font = `600 ${Math.round(H * 0.2)}px ${family}`;
          ctx.fillStyle = "#9ca3af";
          ctx.fillText(
            c.id === "CPU" ? "INTEL-COMPATIBLE" : c.sub,
            W / 2,
            H * 0.76,
          );
        },
      );
      silk(c.sub, c.x, CHIP_Z + 0.62, 0.13, SILK_DARK);
      chipCenters.set(c.id, new THREE.Vector3(c.x, Y0 + 0.3, CHIP_Z));
    }
    // Crystal beside the CPU.
    {
      const can = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.16, 0.5, 20),
        mat(0xd6dae0, 0.25, 0.8),
      );
      can.rotation.z = Math.PI / 2;
      can.position.set(-6.5, Y0 + 0.16, CHIP_Z);
      root.add(can);
      silk("6.144 MHz", -6.5, CHIP_Z + 0.4, 0.11);
    }
    // Bus traces from the CPU to the memory chips.
    decal(12.6, 0.5, 0.35, Y0 + 0.003, CHIP_Z - 0.62, 80, (ctx, W, H) => {
      ctx.strokeStyle = "#cdd6e4";
      ctx.lineWidth = 2;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 6 + i * 6);
        ctx.lineTo(W, 6 + i * 6);
        ctx.stroke();
      }
    });

    // ── Bus LEDs ──────────────────────────────────────────────────────
    const ledGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.08, 16);
    const domeGeo = new THREE.SphereGeometry(
      0.075,
      16,
      8,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2,
    );
    type Led = { mat: THREE.MeshStandardMaterial; on: number; off: number };
    const makeLed = (x: number, z: number, on: number, off: number): Led => {
      const m = new THREE.MeshStandardMaterial({
        color: off,
        emissive: 0x000000,
        roughness: 0.3,
        transparent: true,
        opacity: 0.95,
      });
      const body = new THREE.Mesh(ledGeo, m);
      body.position.set(x, Y0 + 0.04, z);
      root.add(body);
      const dome = new THREE.Mesh(domeGeo, m);
      dome.position.set(x, Y0 + 0.08, z);
      root.add(dome);
      return { mat: m, on, off };
    };
    const setLed = (led: Led, lit: boolean) => {
      led.mat.color.setHex(lit ? led.on : led.off);
      led.mat.emissive.setHex(lit ? led.on : 0x000000);
      led.mat.emissiveIntensity = lit ? 0.9 : 0;
    };
    const BUS_Z = -2.85;
    const abus: Led[] = [];
    for (let i = 0; i < 16; i++) {
      const x = -6.75 + i * 0.36 + (i >= 8 ? 0.12 : 0);
      abus.push(makeLed(x, BUS_Z, 0xff3b30, 0x7a2a2a));
    }
    const dbus: Led[] = [];
    for (let i = 0; i < 8; i++)
      dbus.push(makeLed(0.55 + i * 0.36, BUS_Z, 0x22c55e, 0x255a36));
    silk("ADDRESS BUS   A15 … A0", -6.85, BUS_Z + 0.3, 0.12, SILK_DARK, "left");
    silk("DATA BUS   D7 … D0", 0.45, BUS_Z + 0.3, 0.12, SILK_DARK, "left");
    const powerLed = makeLed(6.6, BUS_Z, 0x22c55e, 0x255a36);
    silk("POWER", 6.6, BUS_Z + 0.3, 0.12, SILK_DARK);
    const haltLed = makeLed(5.6, BUS_Z, 0xf59e0b, 0x6b4a12);
    silk("HALT", 5.6, BUS_Z + 0.3, 0.12, SILK_DARK);
    const stepLed = makeLed(4.6, BUS_Z, 0x3b82f6, 0x223a66);
    silk("SINGLE STEP", 4.6, BUS_Z + 0.3, 0.12, SILK_DARK);

    // ── LED display modules ───────────────────────────────────────────
    type Module = {
      redraw: (text: string) => void;
      text: string;
      center: THREE.Vector3;
      glow: THREE.Mesh;
      w: number;
      d: number;
    };
    const glowMat = (w: number, d: number) => {
      const cvs = document.createElement("canvas");
      cvs.width = Math.round(w * 90);
      cvs.height = Math.round(d * 90);
      const ctx = cvs.getContext("2d")!;
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 7;
      ctx.shadowColor = "#60a5fa";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.roundRect(8, 8, cvs.width - 16, cvs.height - 16, 12);
      ctx.stroke();
      return new THREE.MeshBasicMaterial({
        map: texture(cvs),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        color: HOT,
      });
    };
    const makeModule = (
      x: number,
      z: number,
      digits: number,
      digitW: number,
      label?: string,
      labelSide: "top" | "left" = "top",
    ): Module => {
      const w = digits * digitW + 0.16 + (digits === 6 ? digitW * 0.5 : 0);
      const d = digitW * 1.55 + 0.12;
      boxMesh(w + 0.08, 0.08, d + 0.08, mat(0xdfe3e9, 0.5), x, Y0 + 0.04, z);
      boxMesh(w, 0.1, d, mat(LED_BODY, 0.4), x, Y0 + 0.1, z);
      const px = 260;
      let text = "";
      const face = decal(
        w - 0.04,
        d - 0.04,
        x,
        Y0 + 0.152,
        z,
        px,
        (ctx, W, H) => {
          ctx.fillStyle = "#121216";
          ctx.fillRect(0, 0, W, H);
          const dw = digitW * px;
          const gap = digits === 6 ? dw * 0.5 : 0;
          const x0 = (W - (digits * dw + gap)) / 2;
          for (let i = 0; i < digits; i++) {
            drawDigit(
              ctx,
              text[i] ?? " ",
              x0 + i * dw + (i >= 4 ? gap : 0) + dw * 0.1,
              H * 0.12,
              dw * 0.78,
              H * 0.76,
            );
          }
        },
        { transparent: false },
      );
      const glow = new THREE.Mesh(
        new THREE.PlaneGeometry(w + 0.34, d + 0.34),
        glowMat(w + 0.34, d + 0.34),
      );
      glow.rotation.x = -Math.PI / 2;
      glow.position.set(x, Y0 + 0.006, z);
      root.add(glow);
      if (label) {
        if (labelSide === "top")
          silk(
            label,
            x - w / 2 + 0.02,
            z - d / 2 - 0.17,
            0.15,
            SILK_DARK,
            "left",
            800,
          );
        else silk(label, x - w / 2 - 0.08, z, 0.23, SILK_DARK, "right", 800);
      }
      const mod: Module = {
        text: "\u0000",
        center: new THREE.Vector3(x, Y0 + 0.2, z),
        glow,
        w,
        d,
        redraw: (t: string) => {
          if (t === mod.text) return;
          mod.text = t;
          text = t;
          face.redraw();
        },
      };
      return mod;
    };

    // Register panel.
    outline(-7.15, -2.35, -0.3, 1.55, "8085 REGISTERS");
    const regMods = new Map<string, Module>();
    for (const [name, [x, z, n]] of Object.entries(REG_SPOTS))
      regMods.set(name, makeModule(x, z, n, 0.36, name, "left"));
    // Flags: five LEDs, S Z AC P CY.
    const flagLeds = new Map<string, Led>();
    FLAG_BITS.forEach(([name], i) => {
      const x = FLAGS_AT.x - 1.0 + i * 0.5;
      flagLeds.set(name, makeLed(x, FLAGS_AT.z + 0.08, 0x22c55e, 0x2c5a3c));
      silk(name, x, FLAGS_AT.z - 0.24, 0.17, SILK_DARK, "center", 800);
    });
    silk(
      "FLAGS",
      FLAGS_AT.x - 1.45,
      FLAGS_AT.z + 0.08,
      0.15,
      SILK_DARK,
      "right",
      800,
    );
    const flagsGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.7, 0.8),
      glowMat(2.7, 0.8),
    );
    flagsGlow.rotation.x = -Math.PI / 2;
    flagsGlow.position.set(FLAGS_AT.x, Y0 + 0.006, FLAGS_AT.z - 0.05);
    root.add(flagsGlow);

    // ALU: a raised trapezoid with a small LCD for the sum it is doing.
    const aluShape = new THREE.Shape();
    aluShape.moveTo(-0.62, -0.55);
    aluShape.lineTo(-0.12, -0.55);
    aluShape.lineTo(0, -0.38);
    aluShape.lineTo(0.12, -0.55);
    aluShape.lineTo(0.62, -0.55);
    aluShape.lineTo(0.36, 0.55);
    aluShape.lineTo(-0.36, 0.55);
    aluShape.closePath();
    const aluMat = new THREE.MeshStandardMaterial({
      color: 0xe8eefb,
      roughness: 0.5,
      emissive: 0x000000,
    });
    const alu = new THREE.Mesh(
      new THREE.ExtrudeGeometry(aluShape, { depth: 0.16, bevelEnabled: false }),
      aluMat,
    );
    alu.rotation.x = Math.PI / 2;
    alu.position.set(ALU_AT.x, Y0 + 0.17, ALU_AT.z);
    root.add(alu);
    let aluText = "";
    const aluFace = decal(
      1.0,
      0.36,
      ALU_AT.x,
      Y0 + 0.175,
      ALU_AT.z + 0.1,
      300,
      (ctx, W, H) => {
        ctx.fillStyle = "#1e3a8a";
        ctx.font = `800 ${Math.round(H * 0.5)}px ${family}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("ALU", W / 2, H * 0.5);
      },
    );
    void aluFace;
    const aluSum = decal(
      2.3,
      0.38,
      ALU_AT.x,
      Y0 + 0.004,
      ALU_AT.z + 0.95,
      260,
      (ctx, W, H) => {
        if (!aluText) return;
        ctx.fillStyle = "rgba(37,99,235,0.1)";
        ctx.beginPath();
        ctx.roundRect(4, 4, W - 8, H - 8, 14);
        ctx.fill();
        ctx.fillStyle = "#1d4ed8";
        ctx.font = `700 ${Math.round(H * 0.48)}px ${MONO}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(aluText, W / 2, H / 2);
      },
    );
    const aluGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.7, 1.5),
      glowMat(1.7, 1.5),
    );
    aluGlow.rotation.x = -Math.PI / 2;
    aluGlow.position.set(ALU_AT.x, Y0 + 0.006, ALU_AT.z);
    root.add(aluGlow);

    // Memory panel.
    outline(0.2, -2.35, 7.2, 0.5, "MEMORY  (RAM)");
    const memMods: Module[] = [];
    const memLabels: ReturnType<typeof decal>[] = [];
    for (let r = 0; r < 2; r++)
      for (let c = 0; c < 8; c++) {
        const x = MEM_X0 + c * MEM_PITCH;
        const z = MEM_ROW_Z[r];
        memMods.push(makeModule(x, z, 2, 0.3));
        let label = "";
        const d = decal(
          0.84,
          0.26,
          x,
          Y0 + 0.004,
          z + 0.53,
          220,
          (ctx, W, H) => {
            ctx.fillStyle = SILK_DARK;
            ctx.font = `800 ${Math.round(H * 0.78)}px ${MONO}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(label, W / 2, H / 2);
          },
        );
        memLabels.push(d);
        (d as unknown as { set: (t: string) => void }).set = (t: string) => {
          label = t;
          d.redraw();
        };
      }
    const setMemLabels = (rows: number[]) => {
      memLabels.forEach((d, i) => {
        const base = rows[Math.floor(i / 8)] ?? 0;
        (d as unknown as { set: (t: string) => void }).set(
          `${hex4(base + (i % 8))}`,
        );
      });
    };

    // Address / data display.
    const display = makeModule(DISPLAY_AT.x, DISPLAY_AT.z, 6, 0.46);
    silk(
      "ADDRESS",
      DISPLAY_AT.x - 0.55,
      DISPLAY_AT.z + 0.58,
      0.13,
      SILK_DARK,
      "center",
      800,
    );
    silk(
      "DATA",
      DISPLAY_AT.x + 1.12,
      DISPLAY_AT.z + 0.58,
      0.13,
      SILK_DARK,
      "center",
      800,
    );

    // LCD.
    boxMesh(
      LCD_AT.w + 0.3,
      0.1,
      LCD_AT.d + 0.3,
      mat(0x2a2e35, 0.5),
      LCD_AT.x,
      Y0 + 0.05,
      LCD_AT.z,
    );
    boxMesh(
      LCD_AT.w + 0.1,
      0.12,
      LCD_AT.d + 0.1,
      mat(0x3a3f47, 0.5),
      LCD_AT.x,
      Y0 + 0.08,
      LCD_AT.z,
    );
    let lcdState: { lines: string[]; pointer: number; on: boolean } = {
      lines: [],
      pointer: -1,
      on: false,
    };
    const lcdPx = 170;
    const lcd = decal(
      LCD_AT.w,
      LCD_AT.d,
      LCD_AT.x,
      Y0 + 0.145,
      LCD_AT.z,
      lcdPx,
      (ctx, W, H) => {
        ctx.fillStyle = lcdState.on ? LCD_BG : "#9aa58c";
        ctx.fillRect(0, 0, W, H);
        if (!lcdState.on) return;
        const rowH = H / LCD_ROWS;
        const fs = Math.min(rowH * 0.66, (W - 30) / (LCD_COLS * 0.6));
        ctx.font = `700 ${Math.round(fs)}px ${MONO}`;
        ctx.textBaseline = "middle";
        lcdState.lines.forEach((line, i) => {
          const y = rowH * (i + 0.5);
          if (i === lcdState.pointer) {
            ctx.fillStyle = LCD_INK;
            ctx.fillRect(8, y - rowH * 0.46, W - 16, rowH * 0.92);
            ctx.fillStyle = LCD_BG;
          } else ctx.fillStyle = i === 0 ? "#2c4a1c" : LCD_INK;
          ctx.fillText(line.slice(0, LCD_COLS + 2), 16, y);
        });
      },
      { transparent: false },
    );
    silk(
      "MONITOR LCD  ·  PROGRAM LISTING",
      LCD_AT.x - LCD_AT.w / 2,
      LCD_AT.z - LCD_AT.d / 2 - 0.3,
      0.13,
      SILK_DARK,
      "left",
      800,
    );
    const lcdRowZ = (row: number) =>
      LCD_AT.z - LCD_AT.d / 2 + (LCD_AT.d / LCD_ROWS) * (row + 0.5);

    // ── Keypad ────────────────────────────────────────────────────────
    type Key = {
      group: THREE.Group;
      mat: THREE.MeshStandardMaterial;
      base: number;
    };
    const keys = new Map<TrainerKey, Key>();
    const keyGeo = new THREE.BoxGeometry(0.68, 0.16, 0.6);
    const skirtGeo = new THREE.BoxGeometry(0.74, 0.06, 0.66);
    const placeKeys = (
      rows: readonly (readonly TrainerKey[])[],
      x0: number,
      fn: boolean,
    ) => {
      rows.forEach((row, ri) =>
        row.forEach((id, ci) => {
          const x = x0 + ci * KEY_PITCH_X;
          const z = KEY_Z0 + ri * KEY_PITCH_Z;
          boxMesh(0.76, 0.03, 0.68, mat(0xd9dde4), x, Y0 + 0.015, z);
          const group = new THREE.Group();
          group.position.set(x, Y0, z);
          root.add(group);
          const base = fn ? (id === "RESET" ? 0xfde8e8 : 0xe3e9f4) : 0xffffff;
          const m = new THREE.MeshStandardMaterial({
            color: base,
            roughness: 0.5,
          });
          const cap = new THREE.Mesh(keyGeo, m);
          cap.position.y = 0.13;
          group.add(cap);
          const skirt = new THREE.Mesh(
            skirtGeo,
            mat(fn ? 0xc9d3e3 : 0xe5e7eb, 0.6),
          );
          skirt.position.y = 0.06;
          group.add(skirt);
          const legend = KEY_LEGEND[id];
          decal(
            0.62,
            0.52,
            0,
            0.212,
            0,
            260,
            (ctx, W, H) => {
              ctx.fillStyle =
                id === "RESET" ? "#c81e1e" : fn ? "#1e3a8a" : "#1f2937";
              const big = legend.length <= 1;
              const parts = legend.split(" ");
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              if (big) {
                ctx.font = `800 ${Math.round(H * 0.62)}px ${family}`;
                ctx.fillText(legend, W / 2, H / 2 + 2);
              } else if (parts.length === 2 && legend.length > 6) {
                ctx.font = `800 ${Math.round(H * 0.27)}px ${family}`;
                ctx.fillText(parts[0], W / 2, H * 0.34);
                ctx.fillText(parts[1], W / 2, H * 0.68);
              } else {
                ctx.font = `800 ${Math.round(H * (legend.length > 5 ? 0.24 : 0.3))}px ${family}`;
                ctx.fillText(legend, W / 2, H / 2);
              }
            },
            { parent: group },
          );
          keys.set(id, { group, mat: m, base });
        }),
      );
    };
    placeKeys(FN_KEYS, FN_X0, true);
    placeKeys(HEX_KEYS, HEX_X0, false);
    const keypadCenter = new THREE.Vector3(3.65, Y0 + 0.3, 3.1);
    // A blue ring round the key the student should press next.
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.46, 0.53, 40),
      ringMat,
    );
    ring.rotation.x = -Math.PI / 2;
    ring.visible = false;
    root.add(ring);

    // ── Spots: where a byte leaves from and lands ─────────────────────
    const spotAt = (spot: KitSpot, lcdRow: number): THREE.Vector3 => {
      const reg = regMods.get(spot);
      if (reg) return reg.center.clone();
      if (spot === "F")
        return new THREE.Vector3(FLAGS_AT.x, Y0 + 0.2, FLAGS_AT.z);
      if (spot === "ALU")
        return new THREE.Vector3(ALU_AT.x, Y0 + 0.3, ALU_AT.z);
      if (spot === "KEYS") return keypadCenter.clone();
      if (spot === "RAM") return chipCenters.get("RAM")!.clone();
      if (spot === "CODE")
        return new THREE.Vector3(
          LCD_AT.x - LCD_AT.w / 2 + 1.6,
          Y0 + 0.2,
          lcdRow >= 0 ? lcdRowZ(lcdRow) : LCD_AT.z,
        );
      if (spot.startsWith("M")) {
        const addr = parseInt(spot.slice(1), 16);
        const i = cellOf(programRef.current.rows, addr);
        if (i >= 0) return memMods[i].center.clone();
        return chipCenters.get("RAM")!.clone();
      }
      return new THREE.Vector3(0, Y0, 0);
    };

    // ── Beads ─────────────────────────────────────────────────────────
    const haloTex = (() => {
      const cvs = document.createElement("canvas");
      cvs.width = cvs.height = 128;
      const ctx = cvs.getContext("2d")!;
      const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
      g.addColorStop(0, "rgba(96,165,250,0.95)");
      g.addColorStop(0.4, "rgba(59,130,246,0.45)");
      g.addColorStop(1, "rgba(59,130,246,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      return texture(cvs);
    })();
    const beads: Bead[] = [];
    const ballGeo = new THREE.SphereGeometry(0.13, 20, 14);
    const ballMat = new THREE.MeshBasicMaterial({ color: BEAD });
    const drawTag = (bead: Bead, text: string) => {
      if (bead.tagText === text) return;
      bead.tagText = text;
      const ctx = bead.tagCanvas.getContext("2d")!;
      const W = bead.tagCanvas.width;
      const H = bead.tagCanvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#2563eb";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.roundRect(5, 5, W - 10, H - 10, H / 2 - 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#1d4ed8";
      ctx.font = `800 ${Math.round(H * 0.52)}px ${MONO}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, W / 2, H / 2 + 2);
      (bead.tag.material as THREE.SpriteMaterial).map!.needsUpdate = true;
    };
    for (let i = 0; i < 4; i++) {
      const ball = new THREE.Mesh(ballGeo, ballMat);
      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: haloTex,
          transparent: true,
          depthWrite: false,
        }),
      );
      halo.scale.set(0.7, 0.7, 1);
      const tagCanvas = document.createElement("canvas");
      tagCanvas.width = 220;
      tagCanvas.height = 96;
      const tag = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: texture(tagCanvas),
          transparent: true,
          depthTest: false,
        }),
      );
      tag.scale.set(1.05, 0.46, 1);
      tag.renderOrder = 10;
      ball.visible = halo.visible = tag.visible = false;
      root.add(ball, halo, tag);
      beads.push({ ball, halo, tag, tagCanvas, tagText: "" });
    }

    // ── Frame state ───────────────────────────────────────────────────
    const trailMat = () =>
      new THREE.MeshBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
    let flights: Flight[] = [];
    let built: KitFrame | null = null;
    let clock = 0;
    /** When each key goes down, and when each stage takes off. */
    let keyAt: number[] = [];
    let stageAt: number[] = [];
    /** When each command has finished. */
    let beatEnd: number[] = [];
    /** When the whole step has finished and the kit shows `after`. */
    let total = 0;
    /** When each spot takes its new value. */
    let arrive = new Map<string, number>();
    /** The key the next command starts with, while the kit waits for it. */
    let hint: TrainerKey | null = null;

    /** The commands of a frame. An old frame without any is one command. */
    const beatsOf = (f: KitFrame): KitBeat[] =>
      f.beats.length || (!f.keys.length && !f.stages.length)
        ? f.beats
        : [
            {
              keys: [0, f.keys.length],
              stages: [0, f.stages.length],
              say: "",
            },
          ];

    const buildFrame = (f: KitFrame) => {
      for (const fl of flights) {
        root.remove(fl.tube);
        fl.tube.geometry.dispose();
        (fl.tube.material as THREE.Material).dispose();
      }
      flights = [];
      arrive = new Map();
      keyAt = [];
      stageAt = [];
      beatEnd = [];
      let at = LEAD;
      for (const b of beatsOf(f)) {
        for (let k = b.keys[0]; k < b.keys[1]; k++) {
          keyAt[k] = at;
          at += KEY_DT;
        }
        if (b.stages[1] > b.stages[0]) at += 0.2;
        for (let si = b.stages[0]; si < b.stages[1]; si++) {
          stageAt[si] = at;
          at += STAGE + GAP;
        }
        beatEnd.push(at);
      }
      total = beatEnd.length ? at : 0;
      const lcdBefore = lcdText(
        programRef.current,
        f.keys.length ? f.keys[f.keys.length - 1].lcd : f.before.lcd,
        f.before.mem,
      );
      f.stages.forEach((stage, si) => {
        const start = stageAt[si];
        for (const mv of stage) {
          const a = spotAt(mv.from, lcdBefore.pointer);
          const b = spotAt(mv.to, lcdBefore.pointer);
          const mid = a.clone().add(b).multiplyScalar(0.5);
          mid.y += 0.7 + a.distanceTo(b) * 0.16;
          const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
          const tube = new THREE.Mesh(
            new THREE.TubeGeometry(curve, 40, 0.022, 6),
            trailMat(),
          );
          root.add(tube);
          flights.push({
            curve,
            tube,
            text: mv.text,
            start,
            from: mv.from,
            to: mv.to,
          });
          const prev = arrive.get(mv.to) ?? 0;
          arrive.set(mv.to, Math.max(prev, start + STAGE));
        }
      });
      clock = 0;
      setMemLabels(programRef.current.rows);
      built = f;
    };

    // ── Camera ────────────────────────────────────────────────────────
    const DIR = new THREE.Vector3(0, 1.45, 1).normalize();
    const FOCUS: Record<KitFrame["focus"], { c: THREE.Vector3; r: number }> = {
      all: { c: new THREE.Vector3(0, 0, 0.2), r: 9.4 },
      keys: { c: new THREE.Vector3(0.2, 0, 1.2), r: 8.7 },
      run: { c: new THREE.Vector3(-0.2, 0, 0.3), r: 8.9 },
    };
    let insetL = 0;
    const measureInsets = () => {
      const w = canvas.clientWidth;
      if (preview || w < 900) return 0;
      const card = document.querySelector<HTMLElement>(".floating-lab-card");
      const area = canvas.getBoundingClientRect();
      if (!card) return 0;
      const rect = card.getBoundingClientRect();
      const right = rect.right - area.left + 16;
      return right > 0 && right < w * 0.6 ? right : 0;
    };
    const poseFor = (f: KitFrame) => {
      const { c, r: far } = FOCUS[f.focus];
      const r = preview ? 6.4 : far;
      const w = canvas.clientWidth || 1;
      const frac = Math.max(0.55, (w - insetL * 0.45) / w);
      const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const d = Math.max(r / t / 1.12, r / (t * camera.aspect * frac));
      return { pos: c.clone().addScaledVector(DIR, d), target: c.clone() };
    };
    const applyView = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      const shift = insetL * 0.24;
      if (preview) camera.clearViewOffset();
      else camera.setViewOffset(w, h, -shift, h * 0.03, w, h);
      camera.updateProjectionMatrix();
    };
    let glide: {
      t: number;
      fp: THREE.Vector3;
      tp: THREE.Vector3;
      ft: THREE.Vector3;
      tt: THREE.Vector3;
    } | null = null;
    controls.addEventListener("start", () => {
      glide = null;
    });
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      renderer.setSize(w, h, false);
      insetL = measureInsets();
      applyView();
      if (!glide) {
        const p = poseFor(frameRef.current);
        camera.position.copy(p.pos);
        controls.target.copy(p.target);
        controls.update();
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // ── Per-frame drawing ─────────────────────────────────────────────
    const valueOf = (r: KitRegs, name: string) =>
      name === "SP" || name === "PC"
        ? hex4(r[name])
        : hex2(r[name as keyof KitRegs]);
    let lastHot = new Set<string>();

    const showState = (f: KitFrame, t: number) => {
      const P = programRef.current;
      let idx = -1;
      while (idx + 1 < keyAt.length && keyAt[idx + 1] <= t) idx++;
      const press = idx >= 0 ? f.keys[idx] : null;
      const sinceKey = idx >= 0 ? t - keyAt[idx] : Infinity;
      const done = t >= total;
      const after = f.after;
      const before = f.before;
      const st: KitState = done ? after : before;

      // Displays.
      const digits = done ? after.digits : (press?.digits ?? before.digits);
      const lcdMode = done ? after.lcd : (press?.lcd ?? before.lcd);
      const power = before.power || ((press !== null || done) && after.power);
      display.redraw(power ? digits : "      ");
      const memNow = (i: number) => {
        const key = `M${hex4(P.rows[Math.floor(i / 8)] + (i % 8))}`;
        const arr = arrive.get(key);
        const typed = press ? press.mem[i] : before.mem[i];
        if (arr !== undefined) return t >= arr ? after.mem[i] : typed;
        return done ? after.mem[i] : typed;
      };
      const memVals = after.mem.map((_, i) => memNow(i));
      const text = lcdText(P, lcdMode, memVals);
      const sig = `${power}|${text.pointer}|${text.lines.join("\n")}`;
      if (sig !== (lcd as unknown as { sig?: string }).sig) {
        (lcd as unknown as { sig?: string }).sig = sig;
        lcdState = { ...text, on: power };
        lcd.redraw();
      }
      memMods.forEach((m, i) => m.redraw(power ? hex2(memVals[i]) : "  "));

      // Registers.
      for (const [name, mod] of regMods) {
        const arr = arrive.get(name);
        const show =
          arr !== undefined ? (t >= arr ? after.regs : before.regs) : st.regs;
        mod.redraw(
          power
            ? valueOf(show, name)
            : name === "SP" || name === "PC"
              ? "    "
              : "  ",
        );
      }
      const fArr = arrive.get("F");
      const fRegs =
        fArr !== undefined ? (t >= fArr ? after.regs : before.regs) : st.regs;
      for (const [name, bit] of FLAG_BITS)
        setLed(flagLeds.get(name)!, power && !!(fRegs.F & bit));

      // ALU text, while it works.
      const aluStage = f.stages.findIndex((s) => s.some((m) => m.to === "ALU"));
      const aluOn = !!f.alu && aluStage >= 0 && t >= stageAt[aluStage] + STAGE;
      const want = aluOn ? (f.alu ?? "") : "";
      if (want !== aluText) {
        aluText = want;
        aluSum.mesh.visible = !!want;
        if (want) aluSum.redraw();
      }
      const aluBusy = flights.some(
        (fl) =>
          (fl.to === "ALU" || fl.from === "ALU") &&
          t >= fl.start &&
          t <= fl.start + STAGE,
      );
      aluMat.emissive.setHex(aluBusy ? 0x2563eb : 0x000000);
      aluMat.emissiveIntensity = aluBusy
        ? 0.25 + 0.15 * Math.sin(performance.now() / 100)
        : 0;

      // Buses.
      const busOn = f.stages.length && t >= stageAt[0] ? after : st;
      const a = busOn.abus;
      const d = busOn.dbus;
      abus.forEach((led, i) =>
        setLed(led, power && a !== null && !!(a & (1 << (15 - i)))),
      );
      dbus.forEach((led, i) =>
        setLed(led, power && d !== null && !!(d & (1 << (7 - i)))),
      );
      setLed(powerLed, power);
      const runLcd = lcdMode.mode === "run" ? lcdMode : null;
      setLed(haltLed, power && !!runLcd?.halted);
      setLed(stepLed, power && !!runLcd && !runLcd.halted);

      // Keys. The one the next command starts with glows until it is pressed.
      const glow = 0.5 + 0.5 * Math.sin(performance.now() / 160);
      const hinted = hint ? keys.get(hint) : undefined;
      ring.visible = !!hinted;
      if (hinted) {
        ring.position.set(
          hinted.group.position.x,
          Y0 + 0.02,
          hinted.group.position.z,
        );
        ring.scale.setScalar(1 + 0.12 * glow);
        ringMat.opacity = 0.35 + 0.5 * glow;
      }
      for (const [id, k] of keys) {
        const down = press?.key === id && sinceKey < KEY_DT * 0.65;
        const target = down ? -0.07 : 0;
        k.group.position.y += (Y0 + target - k.group.position.y) * 0.5;
        if (down) k.mat.color.setHex(0x93c5fd);
        else if (id === hint)
          k.mat.color.setHex(k.base).lerp(HINT_COLOR, 0.35 + 0.45 * glow);
        else k.mat.color.setHex(k.base);
        k.mat.emissive.setHex(id === hint && !down ? 0x2563eb : 0x000000);
        k.mat.emissiveIntensity = id === hint && !down ? 0.12 * glow : 0;
      }

      // Beads.
      let used = 0;
      for (const fl of flights) {
        const u = (t - fl.start) / STAGE;
        const m = fl.tube.material as THREE.MeshBasicMaterial;
        if (u < 0) {
          m.opacity = 0;
          continue;
        }
        m.opacity = u <= 1 ? 0.55 : Math.max(0, 0.55 - (u - 1) * 1.4);
        if (u > 1 || used >= beads.length) continue;
        const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
        const p = fl.curve.getPoint(e);
        const bead = beads[used++];
        bead.ball.position.copy(p);
        bead.halo.position.copy(p);
        bead.tag.position.set(p.x, p.y + 0.42 + (used - 1) * 0.36, p.z);
        drawTag(bead, fl.text);
        bead.ball.visible = bead.halo.visible = bead.tag.visible = true;
      }
      for (let i = used; i < beads.length; i++)
        beads[i].ball.visible =
          beads[i].halo.visible =
          beads[i].tag.visible =
            false;

      // What changed, outlined once it has changed.
      const hot = new Set<string>(done ? f.hot : []);
      for (const [spot, at] of arrive) if (t >= at) hot.add(spot);
      const wall = performance.now() / 1000;
      const pulse = 0.55 + 0.35 * Math.sin(wall * 5);
      for (const [name, mod] of regMods)
        (mod.glow.material as THREE.MeshBasicMaterial).opacity = hot.has(name)
          ? pulse
          : 0;
      memMods.forEach((mod, i) => {
        const key = `M${hex4(P.rows[Math.floor(i / 8)] + (i % 8))}`;
        (mod.glow.material as THREE.MeshBasicMaterial).opacity = hot.has(key)
          ? pulse
          : 0;
      });
      (flagsGlow.material as THREE.MeshBasicMaterial).opacity = hot.has("F")
        ? pulse
        : 0;
      (aluGlow.material as THREE.MeshBasicMaterial).opacity = aluBusy
        ? pulse
        : 0;
      (display.glow.material as THREE.MeshBasicMaterial).opacity =
        sinceKey < KEY_DT ? 0.5 : 0;
      lastHot = hot;
    };
    void lastHot;

    let raf = 0;
    let prev = performance.now();
    let wasMoving = false;

    // A click (not a drag) on the glowing key runs the next command.
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const keyAtPointer = (e: PointerEvent): TrainerKey | null => {
      const rect = canvas.getBoundingClientRect();
      ndc.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      const groups = [...keys.values()].map((k) => k.group);
      const hit = raycaster.intersectObjects(groups, true)[0];
      if (!hit) return null;
      for (const [id, k] of keys) {
        let o: THREE.Object3D | null = hit.object;
        while (o && o !== k.group) o = o.parent;
        if (o) return id;
      }
      return null;
    };
    let downAt: { x: number; y: number } | null = null;
    const onDown = (e: PointerEvent) => {
      downAt = { x: e.clientX, y: e.clientY };
    };
    const onUp = (e: PointerEvent) => {
      const start = downAt;
      downAt = null;
      if (!start || Math.hypot(e.clientX - start.x, e.clientY - start.y) > 5)
        return;
      if (hint && keyAtPointer(e) === hint) pressRef.current();
    };
    const onMove = (e: PointerEvent) => {
      if (e.buttons) return;
      canvas.style.cursor = hint && keyAtPointer(e) === hint ? "pointer" : "";
    };
    if (!preview) {
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointermove", onMove);
    }
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      const step = Math.min(0.5, (now - prev) / 1000);
      prev = now;
      const f = frameRef.current;
      if (f !== built) {
        buildFrame(f);
        if (!preview) {
          insetL = measureInsets();
          applyView();
          const p = poseFor(f);
          glide = {
            t: 0,
            fp: camera.position.clone(),
            tp: p.pos,
            ft: controls.target.clone(),
            tt: p.target,
          };
        }
      }
      // Play forward to the end of the last command asked for, then wait.
      // Going back jumps straight to the end of the earlier command.
      const want = Math.min(beatRef.current, beatEnd.length);
      const target = !beatEnd.length ? total : want ? beatEnd[want - 1] : 0;
      clock = clock > target ? target : Math.min(target, clock + step);
      // Once the kit is waiting, light the key the next command presses.
      const nextBeat = f.beats[want];
      hint =
        clock >= target && nextBeat && nextBeat.keys[1] > nextBeat.keys[0]
          ? f.keys[nextBeat.keys[0]].key
          : null;
      showState(f, clock);
      const moving = clock < target;
      if (moving !== wasMoving) {
        wasMoving = moving;
        busyRef.current(moving);
      }
      if (glide) {
        glide.t = Math.min(1, glide.t + step / 1.3);
        const k = 1 - Math.pow(1 - glide.t, 3);
        camera.position.lerpVectors(glide.fp, glide.tp, k);
        controls.target.lerpVectors(glide.ft, glide.tt, k);
        if (glide.t >= 1) glide = null;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointermove", onMove);
      releasePan();
      controls.dispose();
      const seen = new Set<unknown>();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry && !seen.has(mesh.geometry)) {
          seen.add(mesh.geometry);
          mesh.geometry.dispose();
        }
        const m = mesh.material as
          THREE.Material | THREE.Material[] | undefined;
        for (const one of Array.isArray(m) ? m : m ? [m] : []) {
          if (seen.has(one)) continue;
          seen.add(one);
          const map = (one as THREE.MeshBasicMaterial).map;
          if (map) map.dispose();
          one.dispose();
        }
      });
      renderer.dispose();
    };
  }, [preview]);

  const done = beat >= count;
  const next = () => (done ? onNextStep?.() : goTo(beat + 1));
  const nextRef = useRef(next);
  useEffect(() => {
    nextRef.current = next;
  });
  // Space or Enter is the Next command button, unless something else that
  // takes keys has the focus.
  useEffect(() => {
    if (preview || !count) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== " " && e.key !== "Enter") return;
      if (e.repeat || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      if (
        t instanceof HTMLElement &&
        (t.closest("button, a, input, textarea, select, [role=button]") ||
          t.isContentEditable)
      )
        return;
      e.preventDefault();
      nextRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preview, count]);
  const last = beat > 0 ? frame.beats[beat - 1].say : null;
  const upNext = !done ? frame.beats[beat].say : null;

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          touchAction: "none",
          pointerEvents: preview ? "none" : undefined,
        }}
      />
      {!preview && count > 0 && (
        <CommandBar
          index={beat}
          count={count}
          last={last}
          upNext={upNext}
          busy={busy}
          onBack={() => goTo(beat - 1)}
          onReplay={() => goTo(0)}
          onNext={next}
          canGoOn={!done || !!onNextStep}
          auto={auto}
          onAuto={() => setAuto((on) => !on)}
        />
      )}
    </div>
  );
}

const ICON = {
  width: 14,
  height: 14,
  viewBox: "0 0 14 14",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * The bar under the kit: what the last command did, what the next one
 * will do, and the buttons that step through them.
 */
function CommandBar({
  index,
  count,
  last,
  upNext,
  busy,
  onBack,
  onReplay,
  onNext,
  canGoOn,
  auto,
  onAuto,
}: {
  index: number;
  count: number;
  last: string | null;
  upNext: string | null;
  busy: boolean;
  onBack: () => void;
  onReplay: () => void;
  onNext: () => void;
  canGoOn: boolean;
  auto: boolean;
  onAuto: () => void;
}) {
  const done = index >= count;
  const round =
    "appearance-none flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-black-10)] bg-white text-[var(--ink-muted)] transition-colors hover:bg-[var(--color-black-5)] hover:text-[var(--ink)] disabled:opacity-40 disabled:hover:bg-white cursor-pointer disabled:cursor-default";
  return (
    <div className="pointer-events-auto absolute bottom-6 right-6 z-20 w-[min(500px,calc(100%-48px))] rounded-[20px] border border-[var(--color-black-10)] bg-white/95 p-4 font-sans shadow-[0_4px_24px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-md">
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-[var(--ink-muted)]">
          {index === 0
            ? `${count} command${count === 1 ? "" : "s"} in this step`
            : `Command ${index} of ${count}`}
        </span>
        <span className="flex gap-1" aria-hidden>
          {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${i < index ? "bg-[var(--color-blue)]" : i === index ? "bg-[var(--color-blue)] opacity-40" : "bg-[var(--color-black-10)]"}`}
            />
          ))}
        </span>
      </div>
      <p className="m-0 mt-2 text-[13px] font-medium leading-[1.45] text-[var(--ink)]">
        {last ?? "Nothing pressed yet. The kit is waiting for you."}
      </p>
      <p className="m-0 mt-1 text-[12.5px] leading-[1.45] text-[var(--ink-muted)]">
        {done ? "This step is done." : `Next: ${upNext}`}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          className={round}
          onClick={onBack}
          disabled={index === 0}
          aria-label="Previous command"
          title="Previous command"
        >
          <svg {...ICON}>
            <path d="M8.5 3L4.5 7l4 4" />
          </svg>
        </button>
        <button
          type="button"
          className={round}
          onClick={onReplay}
          disabled={index === 0}
          aria-label="Start this step again"
          title="Start this step again"
        >
          <svg {...ICON}>
            <path d="M2.5 7a4.5 4.5 0 1 0 1.4-3.3" />
            <path d="M2.5 2v2.5H5" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onAuto}
          aria-pressed={auto}
          title="Play the commands of this step one after another"
          className={`appearance-none flex h-9 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-[12.5px] font-medium transition-colors ${auto ? "border-[var(--color-blue)] bg-[var(--color-blue)]/10 text-[var(--color-blue)]" : "border-[var(--color-black-10)] bg-white text-[var(--ink-muted)] hover:bg-[var(--color-black-5)] hover:text-[var(--ink)]"}`}
        >
          {auto ? (
            <svg {...ICON}>
              <path d="M5 3.5v7M9 3.5v7" />
            </svg>
          ) : (
            <svg {...ICON}>
              <path d="M4.5 3l6 4-6 4z" />
            </svg>
          )}
          Auto
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoOn}
          className="appearance-none ml-auto flex h-9 cursor-pointer items-center gap-2 rounded-full border-none bg-[var(--color-blue)] px-4 text-[13px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-default disabled:opacity-40"
        >
          {busy && (
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          )}
          {done ? "Next step" : "Next command"}
          <kbd className="rounded-[5px] bg-white/20 px-1.5 py-[1px] font-sans text-[10.5px] font-medium">
            Space
          </kbd>
          <svg {...ICON}>
            <path d="M5.5 3l4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
