import * as THREE from "three";
import { PITCH } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, textLabel } from "@/components/shared/primitives";

export const FG_OUT_ANCHOR = "socket-fg-out";

// ─────────────────────────────────────────────────────────────────────────────
// FUNCTION / SIGNAL GENERATOR — benchtop, 0.1 Hz – 1 MHz class
//
//   Front panel (facing +Z):
//
//   ┌──────────────────────────────────────────────────────────┐
//   │  FUNCTION GENERATOR                              ● POWER │
//   │  ┌─────────────────────────┐                      ▮      │
//   │  │  1.0 0 0 0   kHz        │    (FREQ)  (AMPL) (DUTY)    │
//   │  └─────────────────────────┘                             │
//   │   WAVEFORM                                               │
//   │   [~] [⊓] [/\]                         (OFFSET) (SWEEP)  │
//   │   RANGE Hz                                               │
//   │   [1][10][100][1k][10k][100k][1M]                        │
//   │                                   (OUT 50Ω) (TTL) (VCF)  │
//   └──────────────────────────────────────────────────────────┘
//
// Real-size instrument: 260 × 105 × 300 mm (1 world unit = PITCH / 2.54 mm,
// same as every other component). Use `scale` to shrink it for your scene.
//
// Origin = centre of the footprint, on the surface the feet stand on.
// +Y up, front panel faces +Z.
// ─────────────────────────────────────────────────────────────────────────────

// PITCH = 2.54 mm (0.1"), so 1 mm in world units:
const MM = PITCH / 2.54;

// ── Real dimensions (mm) ────────────────────────────────────────────────────
const W = 260; // front panel width
const H = 105; // front panel height
const D = 300; // depth of the case
const CASE_W = 252;
const CASE_H = 99;
const PANEL_T = 4;
const FEET_H = 6;
const FOOT_R = 8;

const V_C = FEET_H + H / 2; // panel / case centre height above the surface
const PANEL_Z = (D / 2 + PANEL_T) * MM; // world Z of the panel surface

// Frequency display window
const DISP_U = -75;
const DISP_V = 28;
const GLASS_W = 84;
const GLASS_H = 20;
const RIM = 3;
const DIGIT_US = [-107, -94, -81, -68, -55]; // digit centres (u, mm)

// 7-segment digit geometry (mm)
const SEG_LEN_H = 4.8;
const SEG_LEN_V = 5.6;
const SEG_T = 1.4;
const SEG_DEPTH = 0.4;
const DP_R = 0.8;
const SEGS: Record<string, [number, number, boolean]> = {
  a: [0, 6.2, true],
  b: [3.4, 3.1, false],
  c: [3.4, -3.1, false],
  d: [0, -6.2, true],
  e: [-3.4, -3.1, false],
  f: [-3.4, 3.1, false],
  g: [0, 0, true],
};
const GLYPHS: Record<string, string> = {
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
  "-": "g",
  " ": "",
};

export type Waveform = "sine" | "square" | "triangle";

const WAVE_BUTTONS: { wave: Waveform; text: string; u: number }[] = [
  { wave: "sine", text: "SINE", u: -105 },
  { wave: "square", text: "SQUARE", u: -80 },
  { wave: "triangle", text: "TRI", u: -55 },
];

// Range buttons (1 Hz … 1 MHz decades)
const RANGE_LABELS = ["1", "10", "100", "1k", "10k", "100k", "1M"];
const RANGE_U0 = -112;
const RANGE_DU = 14.5;

// ── Knobs: u = right of panel centre, v = up from panel centre (mm) ─────────
const KNOBS: {
  text: string;
  u: number;
  v: number;
  r: number;
  a: number;
  big?: boolean;
}[] = [
  { text: "FREQUENCY", u: 15, v: 8, r: 17, a: 30, big: true },
  { text: "AMPL", u: 62, v: 24, r: 9, a: -30 },
  { text: "DUTY", u: 96, v: 24, r: 8, a: 0 },
  { text: "OFFSET", u: 62, v: -8, r: 9, a: 0 },
  { text: "SWEEP", u: 96, v: -8, r: 8, a: -60 },
];

const BNCS = [
  { text: "OUTPUT 50Ω", u: 15 },
  { text: "TTL OUT", u: 62 },
  { text: "VCF IN", u: 100 },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Cylinder whose axis points along +Z, spanning z0 → z0 + depth (mm). */
function cylZ(
  r: number,
  depth: number,
  mat: THREE.Material,
  seg = 32,
  z0 = 0,
): THREE.Mesh {
  const geo = new THREE.CylinderGeometry(r * MM, r * MM, depth * MM, seg);
  geo.rotateX(Math.PI / 2); // +Y axis → +Z
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.z = (z0 + depth / 2) * MM;
  return mesh;
}

/** Box in mm, centred at (x, y, z) in mm. */
function box(
  w: number,
  h: number,
  d: number,
  mat: THREE.Material,
  x: number,
  y: number,
  z: number,
): THREE.Object3D {
  const b = solidBox(w * MM, h * MM, d * MM, mat);
  b.position.set(x * MM, y * MM, z * MM);
  return b;
}

/** Flat ribbon (triangle strip) following a 2D polyline, in the XY plane. */
function ribbonGeometry(
  pts: [number, number][],
  width: number,
): THREE.BufferGeometry {
  const n = pts.length;
  const pos = new Float32Array(n * 2 * 3);
  const idx: number[] = [];

  for (let i = 0; i < n; i++) {
    const p = pts[Math.max(i - 1, 0)];
    const q = pts[Math.min(i + 1, n - 1)];
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = (-dy / len) * (width / 2);
    const ny = (dx / len) * (width / 2);
    const [x, y] = pts[i];

    pos.set([x + nx, y + ny, 0, x - nx, y - ny, 0], i * 6);

    if (i < n - 1) {
      const a = 2 * i;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setIndex(idx);
  return geo;
}

/** Waveform icon polyline (mm), fits in about 9 × 4.4 mm, centred on 0. */
function waveIconPoints(wave: Waveform): [number, number][] {
  const pts: [number, number][] = [];
  const N = 90;
  const cycles = 1.5;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const s = Math.sin(t * cycles * 2 * Math.PI);
    let y = s;
    if (wave === "square") y = s >= 0 ? 1 : -1;
    if (wave === "triangle") y = (2 / Math.PI) * Math.asin(s);
    pts.push([(t - 0.5) * 9 * MM, y * 2.1 * MM]);
  }
  return pts;
}

/** Hexagonal (pointed-end) 7-segment bar, extruded toward +Z. */
function makeSegmentGeometry(horizontal: boolean): THREE.ExtrudeGeometry {
  const L = (horizontal ? SEG_LEN_H : SEG_LEN_V) * MM;
  const t = SEG_T * MM;
  const pts: [number, number][] = [
    [-L / 2, 0],
    [-L / 2 + t / 2, t / 2],
    [L / 2 - t / 2, t / 2],
    [L / 2, 0],
    [L / 2 - t / 2, -t / 2],
    [-L / 2 + t / 2, -t / 2],
  ];
  const shape = new THREE.Shape();
  pts.forEach(([x, y], i) => {
    const px = horizontal ? x : y;
    const py = horizontal ? y : x;
    if (i === 0) shape.moveTo(px, py);
    else shape.lineTo(px, py);
  });
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, {
    depth: SEG_DEPTH * MM,
    bevelEnabled: false,
  });
}

/**
 * Turn "1.000" into 5 digit cells. A "." attaches a decimal point to the
 * digit before it; shorter strings are right-aligned, extra length is cut.
 */
function parseDisplay(text: string, n: number): { ch: string; dp: boolean }[] {
  const cells: { ch: string; dp: boolean }[] = [];
  for (const c of text) {
    if (c === "." && cells.length > 0) cells[cells.length - 1].dp = true;
    else cells.push({ ch: c, dp: false });
  }
  const cut = cells.slice(0, n);
  while (cut.length < n) cut.unshift({ ch: " ", dp: false });
  return cut;
}

// ── Builder ─────────────────────────────────────────────────────────────────

/**
 * @param waveform  Selected waveform button: "sine" | "square" | "triangle"
 * @param display   Text on the LED display, up to 5 digits, e.g. "1.000"
 * @param range     Pressed range button 0–6 (1 Hz … 1 MHz); sets the unit label
 * @param powerOn   LED display, indicator LEDs and power light
 * @param scale     Uniform scale (1 = real size)
 */
export function buildFunctionGenerator(
  mountPos: THREE.Vector3 = new THREE.Vector3(),
  waveform: Waveform = "sine",
  display = "1.000",
  range = 3,
  powerOn = true,
  scale = 1,
): THREE.Group {
  const root = new THREE.Group();

  // ── Materials ────────────────────────────────────────────────────────────
  const mat = {
    panel: new THREE.MeshStandardMaterial({
      color: "#3a4f63",
      roughness: 0.55,
      metalness: 0.15,
    }),
    frame: new THREE.MeshStandardMaterial({ color: "#121418", roughness: 0.6 }),
    glass: new THREE.MeshStandardMaterial({
      color: powerOn ? "#140606" : "#060606",
      roughness: 0.15,
    }),
    segOn: new THREE.MeshStandardMaterial({
      color: "#ff5a1f",
      emissive: "#ff3a00",
      emissiveIntensity: 1.4,
    }),
    segOff: new THREE.MeshStandardMaterial({
      color: powerOn ? "#2e100a" : "#1a0c09",
      roughness: 0.6,
    }),
    knob: new THREE.MeshStandardMaterial({ color: "#0f1013", roughness: 0.5 }),
    knobRing: new THREE.MeshStandardMaterial({
      color: "#2a2d33",
      roughness: 0.45,
    }),
    pointer: new THREE.MeshStandardMaterial({
      color: "#f2f2f2",
      roughness: 0.6,
    }),
    print: new THREE.MeshStandardMaterial({ color: "#e8e8e8", roughness: 0.8 }),
    rubber: new THREE.MeshStandardMaterial({
      color: "#0c0c0d",
      roughness: 0.95,
    }),
    slot: new THREE.MeshStandardMaterial({ color: "#08090a", roughness: 0.9 }),
    btn: new THREE.MeshStandardMaterial({ color: "#c9ccd1", roughness: 0.4 }),
    btnDark: new THREE.MeshStandardMaterial({
      color: "#1b1d22",
      roughness: 0.5,
    }),
    ledOn: new THREE.MeshStandardMaterial({
      color: "#39ff6a",
      emissive: "#18e048",
      emissiveIntensity: 1.5,
    }),
    ledOff: new THREE.MeshStandardMaterial({
      color: "#16301d",
      roughness: 0.6,
    }),
    powerLed: new THREE.MeshStandardMaterial({
      color: powerOn ? "#ff3b30" : "#3a1210",
      emissive: powerOn ? "#ff1a10" : "#000000",
      emissiveIntensity: powerOn ? 1.5 : 0,
    }),
    insulator: new THREE.MeshStandardMaterial({
      color: "#1b1b1d",
      roughness: 0.7,
    }),
  };

  const toY = (v: number) => V_C + v; // panel v (mm) → world Y (mm)

  // ── Case, front panel, feet ──────────────────────────────────────────────
  root.add(box(CASE_W, CASE_H, D, M.dark(), 0, V_C, 0));
  root.add(box(W, H, PANEL_T, mat.panel, 0, V_C, D / 2 + PANEL_T / 2));

  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const foot = new THREE.Mesh(
        new THREE.CylinderGeometry(FOOT_R * MM, FOOT_R * MM, FEET_H * MM, 20),
        mat.rubber,
      );
      foot.position.set(
        sx * (CASE_W / 2 - 20) * MM,
        (FEET_H / 2) * MM,
        sz * (D / 2 - 35) * MM,
      );
      root.add(foot);
    }
  }

  // Top vent slots
  const topY = V_C + CASE_H / 2;
  for (let i = 0; i < 12; i++) {
    root.add(box(3, 0.6, 90, mat.slot, -66 + i * 12, topY + 0.3, -50));
  }

  // ── Labels ───────────────────────────────────────────────────────────────
  const addLabel = (
    text: string,
    u: number,
    v: number,
    w = Math.max(8, text.length * 3.4),
    h = 4.6,
    color = "#e8e8e8",
  ) => {
    const label = textLabel(text, w * MM, h * MM, {
      textColor: color,
      fontSize: 36,
    });
    if (!label) return;
    label.position.set(u * MM, toY(v) * MM, PANEL_Z + 0.05 * MM);
    root.add(label);
  };

  addLabel("FUNCTION GENERATOR", DISP_U, 46, 66, 5.4);
  addLabel("0.1 Hz – 1 MHz", DISP_U, -46, 40, 4.4);

  // ── Frequency display ────────────────────────────────────────────────────
  const frameZ = PANEL_Z / MM + 1.25;
  const fW = GLASS_W + RIM * 2;

  root.add(
    box(
      fW,
      RIM,
      2.5,
      mat.frame,
      DISP_U,
      toY(DISP_V + GLASS_H / 2 + RIM / 2),
      frameZ,
    ),
    box(
      fW,
      RIM,
      2.5,
      mat.frame,
      DISP_U,
      toY(DISP_V - GLASS_H / 2 - RIM / 2),
      frameZ,
    ),
    box(
      RIM,
      GLASS_H,
      2.5,
      mat.frame,
      DISP_U - GLASS_W / 2 - RIM / 2,
      toY(DISP_V),
      frameZ,
    ),
    box(
      RIM,
      GLASS_H,
      2.5,
      mat.frame,
      DISP_U + GLASS_W / 2 + RIM / 2,
      toY(DISP_V),
      frameZ,
    ),
  );
  root.add(
    box(
      GLASS_W,
      GLASS_H,
      1,
      mat.glass,
      DISP_U,
      toY(DISP_V),
      PANEL_Z / MM + 0.5,
    ),
  );

  const hGeo = makeSegmentGeometry(true);
  const vGeo = makeSegmentGeometry(false);
  const dpGeo = new THREE.CylinderGeometry(
    DP_R * MM,
    DP_R * MM,
    SEG_DEPTH * MM,
    16,
  );
  dpGeo.rotateX(Math.PI / 2);
  const digitZ = PANEL_Z + 1.05 * MM;

  const cells = parseDisplay(display, DIGIT_US.length);
  cells.forEach((cell, i) => {
    const u = DIGIT_US[i];
    const lit = new Set((powerOn ? (GLYPHS[cell.ch] ?? "") : "").split(""));

    for (const [name, [su, sv, horizontal]] of Object.entries(SEGS)) {
      const seg = new THREE.Mesh(
        horizontal ? hGeo : vGeo,
        lit.has(name) ? mat.segOn : mat.segOff,
      );
      seg.position.set((u + su) * MM, toY(DISP_V + sv) * MM, digitZ);
      root.add(seg);
    }

    const dp = new THREE.Mesh(
      dpGeo,
      powerOn && cell.dp ? mat.segOn : mat.segOff,
    );
    dp.position.set(
      (u + 5.6) * MM,
      toY(DISP_V - 6.4) * MM,
      digitZ + (SEG_DEPTH / 2) * MM,
    );
    root.add(dp);
  });

  const unit = range < 3 ? "Hz" : range < 6 ? "kHz" : "MHz";
  addLabel(unit, -40, DISP_V - 4, 11, 5, powerOn ? "#ff7a45" : "#3a2018");

  // ── Waveform selector buttons ────────────────────────────────────────────
  addLabel("WAVEFORM", -80, 11.5, 28, 4.4);

  for (const b of WAVE_BUTTONS) {
    const selected = b.wave === waveform;
    const depth = selected ? 3.2 : 5; // selected button sits pressed-in
    const v = -2;

    root.add(
      box(16, 10, depth, mat.btn, b.u, toY(v), PANEL_Z / MM + depth / 2),
    );

    // Waveform icon printed on the button
    const icon = new THREE.Mesh(
      ribbonGeometry(waveIconPoints(b.wave), 0.55 * MM),
      new THREE.MeshBasicMaterial({ color: "#1b1d22", side: THREE.DoubleSide }),
    );
    icon.position.set(b.u * MM, toY(v) * MM, PANEL_Z + (depth + 0.05) * MM);
    root.add(icon);

    // Indicator LED above the button
    const led = cylZ(1.2, 1, selected && powerOn ? mat.ledOn : mat.ledOff, 16);
    led.position.set(b.u * MM, toY(v + 8.5) * MM, PANEL_Z);
    root.add(led);

    addLabel(b.text, b.u, v - 9);
  }

  // ── Range buttons ────────────────────────────────────────────────────────
  addLabel("RANGE Hz", -75, -18, 28, 4.4);

  RANGE_LABELS.forEach((text, i) => {
    const u = RANGE_U0 + i * RANGE_DU;
    const selected = i === range;
    const depth = selected ? 2.6 : 4;
    root.add(
      box(
        11,
        7,
        depth,
        selected ? mat.btnDark : mat.btn,
        u,
        toY(-27),
        PANEL_Z / MM + depth / 2,
      ),
    );
    addLabel(text, u, -35, Math.max(6, text.length * 3.2), 4);
  });

  // ── Knobs ────────────────────────────────────────────────────────────────
  const makeKnob = (r: number, a: number, big = false): THREE.Group => {
    const g = new THREE.Group();
    const h = big ? 10 : 7;

    if (big) g.add(cylZ(r * 1.1, 1.6, mat.knobRing, 48));
    g.add(cylZ(r, h, mat.knob, 48));
    g.add(cylZ(r * 0.3, 0.5, M.metal(), 24, h)); // centre cap
    g.add(box(1.5, r * 0.7, 0.4, mat.pointer, 0, r * 0.62, h + 0.2)); // pointer

    g.rotation.z = THREE.MathUtils.degToRad(-a);
    return g;
  };

  for (const k of KNOBS) {
    const knob = makeKnob(k.r, k.a, k.big);
    knob.position.set(k.u * MM, toY(k.v) * MM, PANEL_Z);
    root.add(knob);

    // Scale ticks around the big frequency dial
    if (k.big) {
      for (let i = 0; i <= 10; i++) {
        const ang = -135 + i * 27;
        const g = new THREE.Group();
        g.rotation.z = THREE.MathUtils.degToRad(-ang);
        g.add(box(0.8, 2.6, 0.3, mat.print, 0, k.r * 1.1 + 3.2, 0.15));
        g.position.set(k.u * MM, toY(k.v) * MM, PANEL_Z);
        root.add(g);
      }
    }

    addLabel(k.text, k.u, k.v - (k.r * (k.big ? 1.1 : 1) + (k.big ? 9 : 5.5)));
  }

  // ── Power rocker + LED ───────────────────────────────────────────────────
  root.add(box(10, 15, 6, mat.btnDark, 118, toY(30), PANEL_Z / MM + 3));
  root.add(box(1.4, 1.4, 0.4, mat.print, 118, toY(34), PANEL_Z / MM + 6.2));

  const led = cylZ(1.8, 1.5, mat.powerLed, 20);
  led.position.set(118 * MM, toY(46) * MM, PANEL_Z);
  root.add(led);
  addLabel("POWER", 118, 17.5);

  // ── BNC connectors ───────────────────────────────────────────────────────
  const makeBNC = (): THREE.Group => {
    const g = new THREE.Group();
    g.add(cylZ(8, 2.5, M.metal(), 6)); //           hex nut on the panel
    g.add(cylZ(6.2, 12, M.metal(), 32)); //         outer barrel
    g.add(cylZ(4.2, 12.2, mat.insulator, 32)); //   insulator
    g.add(cylZ(1.1, 14, M.metal(), 16)); //         centre pin
    g.add(box(2, 2, 2.5, M.metal(), 6.6, 0, 8)); // bayonet studs
    g.add(box(2, 2, 2.5, M.metal(), -6.6, 0, 8));
    return g;
  };

  for (const b of BNCS) {
    const bnc = makeBNC();
    bnc.position.set(b.u * MM, toY(-37) * MM, PANEL_Z);
    root.add(bnc);

    if (b.text === "OUTPUT 50Ω") {
      const anchor = new THREE.Object3D();
      anchor.name = FG_OUT_ANCHOR;
      anchor.position.set(b.u * MM, toY(-37) * MM, PANEL_Z + 14 * MM);
      root.add(anchor);
    }

    addLabel(b.text, b.u, -37 - 11.5);
  }

  root.scale.setScalar(scale);
  root.position.copy(mountPos);
  return root;
}

/** Longest edge (the depth) of the standalone model, in world units. */
const STANDALONE_LENGTH = 2.0;

export function buildFunctionGeneratorStandalone(
  waveform: Waveform = "sine",
  display = "1.000",
  range = 3,
  powerOn = true,
): THREE.Group {
  // Shrink to a small, fixed size so it matches the other standalone parts
  // no matter what PITCH is, and centre it on the origin for the viewer.
  const s = STANDALONE_LENGTH / (D * MM);
  const root = buildFunctionGenerator(
    new THREE.Vector3(0, 0, 0),
    waveform,
    display,
    range,
    powerOn,
    s,
  );
  root.position.y = -V_C * MM * s;
  return root;
}
