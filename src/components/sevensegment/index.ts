import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, textLabel } from "@/components/shared/primitives";

// ─────────────────────────────────────────────────────────────────────────────
// 7-SEGMENT DISPLAY — single digit, common cathode (e.g. 5611AS, 0.56")
//
//   Top view (digit upright):
//
//        10  9   8   7   6          top row    (pins 10 → 6, left → right)
//      ┌──────────────────┐         G  F  CC  A  B
//      │       ━━━━       │
//      │      ┃    ┃      │
//      │       ━━━━       │
//      │      ┃    ┃   ●  │         ● = decimal point
//      │       ━━━━       │
//      └──────────────────┘         E  D  CC  C  DP
//         1   2   3   4   5         bottom row (pins 1 → 5, left → right)
//
//   Pins 3 and 8 are both the common cathode (tie to GND via a resistor).
//
// Origin = centre of the body's bottom face. +Y up (digit on top),
// pins point to -Y, pin rows run along X, digit "up" is -Z.
// ─────────────────────────────────────────────────────────────────────────────

// PITCH = 2.54 mm (0.1"), so 1 mm in world units:
const MM = PITCH / 2.54;

// ── Real dimensions (mm) ────────────────────────────────────────────────────
const BODY_W = 12.7; // X
const BODY_H = 8.0; // Y (thickness)
const BODY_L = 19.0; // Z (length between pin rows + margins)
const ROW_SPACING = 15.24; // distance between the two pin rows (0.6")
const PIN_PITCH = 2.54;

// Pins (square posts)
const PIN_S = 0.5;
const LEAD_BELOW = 4.0;

// Face panel (slightly lighter bezel the segments sit on)
const PANEL_W = 11.8;
const PANEL_L = 18.4;
const PANEL_T = 0.1;

// Segments
const SEG_LEN_H = 4.6; // horizontal bar length
const SEG_LEN_V = 5.0; // vertical bar length
const SEG_T = 1.3; // bar thickness
const SEG_DEPTH = 0.3; // how far segments stand above the panel
const DP_R = 0.65;

// Segment layout in the digit plane: [u (right), v (up), horizontal?]
const SEGMENTS: Record<string, [number, number, boolean]> = {
  a: [0, 6.0, true],
  b: [3.2, 3.0, false],
  c: [3.2, -3.0, false],
  d: [0, -6.0, true],
  e: [-3.2, -3.0, false],
  f: [-3.2, 3.0, false],
  g: [0, 0, true],
};
const DP_POS: [number, number] = [4.9, -6.0];

// Which segments light up for each digit 0–9
const DIGIT_SEGMENTS = [
  "abcdef", // 0
  "bc", //     1
  "abdeg", //  2
  "abcdg", //  3
  "bcfg", //   4
  "acdfg", //  5
  "acdefg", // 6
  "abc", //    7
  "abcdefg", //8
  "abcdfg", // 9
];

// Pin names. Bottom row = pins 1–5 (left → right), top row = pins 6–10
// (right → left), so pin 10 is top-left.
const BOTTOM_PINS = ["E", "D", "CC", "C", "DP"]; // pins 1..5
const TOP_PINS = ["B", "A", "CC", "F", "G"]; //     pins 6..10

/** Lay a textLabel flat on the top face (readable from above). */
function lay(label: THREE.Object3D) {
  label.rotation.x = -Math.PI / 2;
  return label;
}

/** Hexagonal (pointed-end) segment bar, extruded upward (+Y). */
function makeSegmentGeometry(horizontal: boolean): THREE.ExtrudeGeometry {
  const L = (horizontal ? SEG_LEN_H : SEG_LEN_V) * MM;
  const t = SEG_T * MM;

  // Built horizontally, then swapped for vertical bars
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

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: SEG_DEPTH * MM,
    bevelEnabled: false,
  });
  // shape-Y → world -Z (digit "up" = -Z), extrusion → +Y
  geo.rotateX(-Math.PI / 2);
  return geo;
}

function makePin(x: number, z: number): THREE.Object3D {
  const len = LEAD_BELOW + 0.5; // starts slightly inside the body
  const pin = solidBox(PIN_S * MM, len * MM, PIN_S * MM, M.metal());
  pin.position.set(x * MM, ((0.5 - LEAD_BELOW) / 2) * MM, z * MM);
  return pin;
}

/**
 * @param lit  Segments to light: a digit 0–9, or letters like "abg"
 *             ("p" lights the decimal point). Default "" = all off.
 */
export function buildSevenSegment(
  mountPos: THREE.Vector3 = new THREE.Vector3(),
  lit: string | number = "",
  partNumber = "5611AS",
): THREE.Group {
  const root = new THREE.Group();

  const litSet = new Set(
    typeof lit === "number"
      ? DIGIT_SEGMENTS[((lit % 10) + 10) % 10].split("")
      : lit.toLowerCase().split(""),
  );

  // ── Plastic body ─────────────────────────────────────────────────────────
  const body = solidBox(BODY_W * MM, BODY_H * MM, BODY_L * MM, M.dark());
  body.position.set(0, (BODY_H / 2) * MM, 0);
  root.add(body);

  // ── Face panel ───────────────────────────────────────────────────────────
  const panelMat = new THREE.MeshBasicMaterial({ color: 0x222630 });
  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(PANEL_W * MM, PANEL_T * MM, PANEL_L * MM),
    panelMat,
  );
  panel.position.set(0, (BODY_H + PANEL_T / 2) * MM, 0);
  root.add(panel);

  const baseY = (BODY_H + PANEL_T) * MM;

  // ── Segments ─────────────────────────────────────────────────────────────
  const offMat = new THREE.MeshBasicMaterial({ color: 0x451a1a });
  const onMat = new THREE.MeshBasicMaterial({ color: 0xff3b2f });

  const hGeo = makeSegmentGeometry(true);
  const vGeo = makeSegmentGeometry(false);

  for (const [name, [u, v, horizontal]] of Object.entries(SEGMENTS)) {
    const seg = new THREE.Mesh(
      horizontal ? hGeo : vGeo,
      litSet.has(name) ? onMat : offMat,
    );
    seg.position.set(u * MM, baseY, -v * MM);
    root.add(seg);
  }

  // Decimal point
  const dp = new THREE.Mesh(
    new THREE.CylinderGeometry(DP_R * MM, DP_R * MM, SEG_DEPTH * MM, 20),
    litSet.has("p") || litSet.has("dp") ? onMat : offMat,
  );
  dp.position.set(
    DP_POS[0] * MM,
    baseY + (SEG_DEPTH / 2) * MM,
    -DP_POS[1] * MM,
  );
  root.add(dp);

  // ── Side marking ─────────────────────────────────────────────────────────
  const marking = textLabel(partNumber, 8.0 * MM, 2.4 * MM, {
    textColor: "#dddddd",
    fontSize: 30,
  });
  if (marking) {
    marking.position.set(0, (BODY_H / 2) * MM, (BODY_L / 2) * MM + 0.02 * MM);
    root.add(marking);
  }

  // ── Pins ─────────────────────────────────────────────────────────────────
  // Bottom row (z+): pins 1..5, left → right
  // Top row    (z-): pins 6..10, right → left
  for (let i = 0; i < 5; i++) {
    const xBottom = (-2 + i) * PIN_PITCH; // pins 1..5
    const xTop = (2 - i) * PIN_PITCH; //     pins 6..10
    root.add(makePin(xBottom, ROW_SPACING / 2));
    root.add(makePin(xTop, -ROW_SPACING / 2));
  }

  // ── Pin names printed on the face, beside each pin ───────────────────────
  const labelY = baseY + 0.02 * MM;

  const addLabel = (text: string, x: number, z: number) => {
    const label = textLabel(text, 2.2 * MM, 1.5 * MM, {
      textColor: "#cccccc",
      fontSize: 48,
    });
    if (!label) return;
    lay(label);
    label.position.set(x * MM, labelY, z * MM);
    root.add(label);
  };

  for (let i = 0; i < 5; i++) {
    addLabel(BOTTOM_PINS[i], (-2 + i) * PIN_PITCH, 8.5);
    addLabel(TOP_PINS[i], (2 - i) * PIN_PITCH, -8.5);
  }

  root.position.copy(mountPos);
  return root;
}

export function buildSevenSegmentStandalone(): THREE.Group {
  const root = buildSevenSegment(new THREE.Vector3(0, 0, 0), 8);
  root.position.y = TOP_Y + BOARD_H * 0.04;
  return root;
}
