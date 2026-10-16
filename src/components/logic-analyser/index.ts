import * as THREE from "three";
import { PITCH } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, textLabel } from "@/components/shared/primitives";

// ─────────────────────────────────────────────────────────────────────────────
// LOGIC ANALYSER — 8-channel, 24 MHz USB type (Saleae-clone style)
//
//   Top view (front = bottom of the drawing, toward +Z):
//
//   back  ┌──────────────────────────────────────────┐
//   (USB) │ LOGIC ANALYZER                        ●  │
//    ▭    │ 24 MHz · 8 CH                            │
//   ──────┤  ┌────────────────────────────────────┐  ├──────
//         │  │ ▁▁▔▔▁▁▔▔▁▁▔▔     (4 coloured       │  │
//         │  │ ▔▔▁▁▁▁▔▔▔▔▁▁      digital traces)  │  │
//         │  └────────────────────────────────────┘  │
//         │   CH0     CH1     CH2     CH3            │
//   front └──────────────────┬───────────────────────┘
//                       ┌────┴────┐
//                       │ 0 2 4 6 G│  ← 2 × 5 probe header
//                       │ 1 3 5 7 G│
//                       └─────────┘
//
//   Probe header (front): top row CH0 CH2 CH4 CH6 GND, bottom row
//   CH1 CH3 CH5 CH7 GND. USB port on the back.
//
// Real size: about 58 × 15 × 47 mm (with header and port).
// Origin = centre of the footprint, on the surface the feet stand on.
// +Y up, probe header faces +Z, USB port faces -Z.
// ─────────────────────────────────────────────────────────────────────────────

// PITCH = 2.54 mm (0.1"), so 1 mm in world units:
const MM = PITCH / 2.54;

// ── Real dimensions (mm) ────────────────────────────────────────────────────
const W = 58; // case width (X)
const H = 14; // case height (Y)
const D = 38; // case depth (Z), the aluminium extrusion
const CAP_T = 2; // end-cap thickness
const CAP_EXTRA = 0.8; // end caps are slightly bigger than the case
const FEET_H = 1.2;
const FOOT_R = 3;

const V_C = FEET_H + H / 2; // case centre height above the surface
const TOP_Y = FEET_H + H; //   top face height

const FRONT_Z = D / 2 + CAP_T; // front-cap outer surface
const BACK_Z = -(D / 2 + CAP_T); // back-cap outer surface

// Probe header (2 × 5, shrouded)
const HDR_W = 15;
const HDR_H = 9;
const HDR_WALL = 1.2;
const HDR_LEN = 8; // how far the shroud sticks out
const HDR_PITCH = 2.54;
const HDR_COLS = 5;
const HDR_TOP = ["0", "2", "4", "6", "G"];
const HDR_BOTTOM = ["1", "3", "5", "7", "G"];

// USB port (type-C size)
const USB_W = 9.0;
const USB_H = 3.3;
const USB_LEN = 3.0;

// Screen window on the top face
const WIN_W = 46;
const WIN_D = 18;
const WIN_Z = 2; // window centre (Z)
const TRACE_W = 0.5; // line width (mm)
const TRACE_AMP = 1.6; // high-level height above the baseline (mm)

const TRACE_COLORS = ["#ffd23f", "#3ddc84", "#33c6ff", "#ff5ccc"];
const TRACE_BITS: number[][] = [
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1],
  [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1],
];
const TRACE_V = [6.5, 2.2, -2.2, -6.5]; // trace baselines, up = back (-Z)

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Cylinder whose axis points along +Z, spanning z0 → z0 + depth (mm). */
function cylZ(
  r: number,
  depth: number,
  mat: THREE.Material,
  seg = 24,
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

/** Lay a textLabel flat on the top face (readable from above). */
function lay(label: THREE.Object3D) {
  label.rotation.x = -Math.PI / 2;
  return label;
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

/** Digital trace polyline: square steps between 0 and TRACE_AMP (mm). */
function digitalTrace(bits: number[], baseline: number): [number, number][] {
  const x0 = -(WIN_W - 4) / 2;
  const seg = (WIN_W - 4) / bits.length;
  const level = (b: number) => (baseline + (b ? TRACE_AMP : 0)) * MM;

  const pts: [number, number][] = [];
  bits.forEach((b, k) => {
    const xa = (x0 + k * seg) * MM;
    const xb = (x0 + (k + 1) * seg) * MM;
    if (k > 0 && b !== bits[k - 1]) {
      pts.push([xa, level(bits[k - 1])]); // vertical edge
    }
    pts.push([xa, level(b)]);
    pts.push([xb, level(b)]);
  });
  return pts;
}

// ── Builder ─────────────────────────────────────────────────────────────────

/**
 * @param powerOn     Status LED on/off
 * @param showTraces  Draw the four coloured digital traces on the top window
 * @param scale       Uniform scale (1 = real size)
 */
export function buildLogicAnalyzer(
  mountPos: THREE.Vector3 = new THREE.Vector3(),
  powerOn = true,
  showTraces = true,
  scale = 1,
): THREE.Group {
  const root = new THREE.Group();

  // ── Materials ────────────────────────────────────────────────────────────
  const mat = {
    alu: new THREE.MeshBasicMaterial({ color: 0x3b4859 }),
    rubber: new THREE.MeshBasicMaterial({ color: 0x161a20 }),
    bezel: new THREE.MeshBasicMaterial({ color: 0x12151c }),
    glass: new THREE.MeshBasicMaterial({ color: 0x0c1420 }),
    gold: new THREE.MeshBasicMaterial({ color: 0xd4a82a }),
    shell: new THREE.MeshBasicMaterial({ color: 0xdce4ee }),
    slot: new THREE.MeshBasicMaterial({ color: 0x080a0e }),
    led: new THREE.MeshBasicMaterial({
      color: powerOn ? 0x38ff68 : 0x163420,
    }),
  };

  // ── Case, end caps, feet ─────────────────────────────────────────────────
  root.add(box(W, H, D, mat.alu, 0, V_C, 0));

  const capW = W + CAP_EXTRA;
  const capH = H + CAP_EXTRA;
  root.add(box(capW, capH, CAP_T, M.dark(), 0, V_C, D / 2 + CAP_T / 2));
  root.add(box(capW, capH, CAP_T, M.dark(), 0, V_C, -(D / 2 + CAP_T / 2)));

  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const foot = new THREE.Mesh(
        new THREE.CylinderGeometry(FOOT_R * MM, FOOT_R * MM, FEET_H * MM, 20),
        mat.rubber,
      );
      foot.position.set(sx * 22 * MM, (FEET_H / 2) * MM, sz * 12 * MM);
      root.add(foot);
    }
  }

  // ── Probe header (front): 4 shroud walls + 2 × 5 gold pins ───────────────
  const hz = FRONT_Z + HDR_LEN / 2; // shroud centre (Z)
  const wallH = HDR_H - HDR_WALL * 2;

  root.add(
    box(
      HDR_W,
      HDR_WALL,
      HDR_LEN,
      M.dark(),
      0,
      V_C + (HDR_H - HDR_WALL) / 2,
      hz,
    ),
    box(
      HDR_W,
      HDR_WALL,
      HDR_LEN,
      M.dark(),
      0,
      V_C - (HDR_H - HDR_WALL) / 2,
      hz,
    ),
    box(HDR_WALL, wallH, HDR_LEN, M.dark(), -(HDR_W - HDR_WALL) / 2, V_C, hz),
    box(HDR_WALL, wallH, HDR_LEN, M.dark(), (HDR_W - HDR_WALL) / 2, V_C, hz),
  );

  for (let j = 0; j < HDR_COLS; j++) {
    const x = (j - (HDR_COLS - 1) / 2) * HDR_PITCH;
    for (const dy of [-HDR_PITCH / 2, HDR_PITCH / 2]) {
      const pin = cylZ(0.32, HDR_LEN - 1.5, mat.gold, 12, FRONT_Z);
      pin.position.x = x * MM;
      pin.position.y = (V_C + dy) * MM;
      root.add(pin);
    }
  }

  // Pin names on the front cap, above and below the shroud
  const addCapLabel = (text: string, x: number, y: number) => {
    const label = textLabel(text, 2.3 * MM, 1.7 * MM, {
      textColor: "#e8e8e8",
      fontSize: 56,
    });
    if (!label) return;
    label.position.set(x * MM, y * MM, FRONT_Z * MM + 0.02 * MM);
    root.add(label);
  };

  for (let j = 0; j < HDR_COLS; j++) {
    const x = (j - (HDR_COLS - 1) / 2) * HDR_PITCH;
    addCapLabel(HDR_TOP[j], x, V_C + HDR_H / 2 + 1.5);
    addCapLabel(HDR_BOTTOM[j], x, V_C - HDR_H / 2 - 1.5);
  }

  // ── USB port (back) ──────────────────────────────────────────────────────
  const usbZ = BACK_Z - USB_LEN / 2;
  root.add(box(USB_W, USB_H, USB_LEN, mat.shell, 0, V_C, usbZ));
  root.add(
    box(
      USB_W - 1.4,
      USB_H - 1.5,
      0.2,
      mat.slot,
      0,
      V_C,
      BACK_Z - USB_LEN + 0.05,
    ),
  );
  root.add(
    box(USB_W - 2.8, 0.5, 0.2, mat.shell, 0, V_C, BACK_Z - USB_LEN + 0.07),
  );

  // ── Top face: window, traces, LED, printing ──────────────────────────────
  // Bezel and glass
  root.add(box(WIN_W + 2, 0.15, WIN_D + 2, mat.bezel, 0, TOP_Y + 0.075, WIN_Z));
  root.add(box(WIN_W, 0.1, WIN_D, mat.glass, 0, TOP_Y + 0.2, WIN_Z));

  // Coloured digital traces (shape-Y → world -Z, so "up" in the shape = back)
  if (showTraces) {
    TRACE_BITS.forEach((bits, i) => {
      const geo = ribbonGeometry(
        digitalTrace(bits, TRACE_V[i] - TRACE_AMP / 2),
        TRACE_W * MM,
      );
      geo.rotateX(-Math.PI / 2);
      const trace = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({
          color: TRACE_COLORS[i],
          side: THREE.DoubleSide,
        }),
      );
      trace.position.set(0, (TOP_Y + 0.27) * MM, WIN_Z * MM);
      root.add(trace);
    });
  }

  // Status LED (back-right corner of the top face)
  const led = new THREE.Mesh(
    new THREE.CylinderGeometry(1.1 * MM, 1.1 * MM, 0.5 * MM, 20),
    mat.led,
  );
  led.position.set(23 * MM, (TOP_Y + 0.25) * MM, -16 * MM);
  root.add(led);

  // Printing
  const printY = (TOP_Y + 0.02) * MM;

  const addTop = (
    text: string,
    x: number,
    z: number,
    w: number,
    h: number,
    color = "#e8e8e8",
  ) => {
    const label = textLabel(text, w * MM, h * MM, {
      textColor: color,
      fontSize: 40,
    });
    if (!label) return;
    lay(label);
    label.position.set(x * MM, printY, z * MM);
    root.add(label);
  };

  addTop("LOGIC ANALYZER", 0, -16.2, 30, 3.6);
  addTop("24 MHz  ·  8 CH  ·  USB", 0, -12, 26, 2.6, "#b9bec6");

  // Legend under the window, coloured to match the traces
  TRACE_COLORS.forEach((c, i) => {
    addTop(`CH${i}`, -15 + i * 10, 15.8, 6, 2.4, c);
  });

  root.scale.setScalar(scale);
  root.position.copy(mountPos);
  return root;
}

/** Longest edge of the standalone model, in world units. */
const STANDALONE_LENGTH = 1.6;

export function buildLogicAnalyzerStandalone(): THREE.Group {
  // Fixed size independent of PITCH, centred on the origin for the viewer.
  const s = STANDALONE_LENGTH / (W * MM);
  const root = buildLogicAnalyzer(new THREE.Vector3(0, 0, 0), true, true, s);
  root.position.y = -V_C * MM * s;
  return root;
}
