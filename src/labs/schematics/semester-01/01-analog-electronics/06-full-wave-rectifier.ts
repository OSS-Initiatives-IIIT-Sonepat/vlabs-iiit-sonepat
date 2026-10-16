import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Full-Wave Bridge Rectifier — progressive 2D schematics.
 *
 * Four-diode bridge, all diodes pointing up (anode below, cathode above):
 *
 *        (+) ────┬──────────┬───────┬───────┐
 *        D1      D2         │       │       │
 *   a ───┤  ~AC~ ├─── b     R_L     C1     [V]
 *        D3      D4         │       │       │
 *        (−) ────┴──GND─────┴───────┴───────┘
 *
 *   D1: a → (+)   D2: b → (+)   D3: (−) → a   D4: (−) → b
 */

const W = 400;
const H = 250;

// ── Symbols ───────────────────────────────────────────────────
const acEl: SchematicElement = { type: "acsource", id: "AC", x: 105, y: 130, rotation: 90, label: "AC" };
const acValue: SchematicElement = { type: "label", id: "lbl_ac", x: 105, y: 166, text: "12 Vpk" };
const d1El: SchematicElement = { type: "diode", id: "D1", x: 60,  y: 85,  rotation: 270, label: "D₁" };
const d2El: SchematicElement = { type: "diode", id: "D2", x: 150, y: 85,  rotation: 270, label: "D₂" };
const d3El: SchematicElement = { type: "diode", id: "D3", x: 60,  y: 175, rotation: 270, label: "D₃" };
const d4El: SchematicElement = { type: "diode", id: "D4", x: 150, y: 175, rotation: 270, label: "D₄" };
const rlEl: SchematicElement = { type: "resistor", id: "RL", x: 230, y: 130, rotation: 90, label: "R_L", value: "1 kΩ" };
const c1El: SchematicElement = { type: "capacitor", id: "C1", x: 310, y: 130, rotation: 90, label: "C₁", value: "100 µF" };
const vmEl: SchematicElement = { type: "voltmeter", id: "VM", x: 360, y: 130, label: "Vdc" };
const gndEl: SchematicElement = { type: "ground", id: "GND", x: 105, y: 220 };

// ── Wires ─────────────────────────────────────────────────────
// AC terminals → upper diode anodes
const wA1: SchematicElement = { type: "wire", id: "w_a_d1", points: [{ x: 75, y: 130 }, { x: 60, y: 130 }, { x: 60, y: 105 }] };
const wB2: SchematicElement = { type: "wire", id: "w_b_d2", points: [{ x: 135, y: 130 }, { x: 150, y: 130 }, { x: 150, y: 105 }] };
// AC terminals → lower diode cathodes
const wA3: SchematicElement = { type: "wire", id: "w_a_d3", points: [{ x: 60, y: 130 }, { x: 60, y: 155 }] };
const wB4: SchematicElement = { type: "wire", id: "w_b_d4", points: [{ x: 150, y: 130 }, { x: 150, y: 155 }] };
// Lower diode anodes → (−) rail
const wN3: SchematicElement = { type: "wire", id: "w_d3_neg", points: [{ x: 60, y: 195 }, { x: 60, y: 220 }, { x: 150, y: 220 }] };
const wN4: SchematicElement = { type: "wire", id: "w_d4_neg", points: [{ x: 150, y: 195 }, { x: 150, y: 220 }] };
// Upper diode cathodes → (+) rail
const wP1: SchematicElement = { type: "wire", id: "w_d1_pos", points: [{ x: 60, y: 65 }, { x: 60, y: 40 }, { x: 150, y: 40 }] };
const wP2: SchematicElement = { type: "wire", id: "w_d2_pos", points: [{ x: 150, y: 65 }, { x: 150, y: 40 }] };
// Output rails → R_L
const wPosRL: SchematicElement = { type: "wire", id: "w_pos_rl", points: [{ x: 150, y: 40 }, { x: 230, y: 40 }, { x: 230, y: 100 }] };
const wRLNeg: SchematicElement = { type: "wire", id: "w_rl_neg", points: [{ x: 230, y: 160 }, { x: 230, y: 220 }, { x: 150, y: 220 }] };
// Filter capacitor
const wPosC1: SchematicElement = { type: "wire", id: "w_pos_c1", points: [{ x: 230, y: 40 }, { x: 310, y: 40 }, { x: 310, y: 110 }] };
const wC1Neg: SchematicElement = { type: "wire", id: "w_c1_neg", points: [{ x: 310, y: 150 }, { x: 310, y: 220 }, { x: 230, y: 220 }] };
// Multimeter
const wPosVm: SchematicElement = { type: "wire", id: "w_pos_vm", points: [{ x: 310, y: 40 }, { x: 360, y: 40 }, { x: 360, y: 106 }] };
const wVmNeg: SchematicElement = { type: "wire", id: "w_vm_neg", points: [{ x: 360, y: 154 }, { x: 360, y: 220 }, { x: 310, y: 220 }] };

// ── Junctions ─────────────────────────────────────────────────
const jA: SchematicElement    = { type: "junction", id: "j_a",    x: 60,  y: 130 };
const jB: SchematicElement    = { type: "junction", id: "j_b",    x: 150, y: 130 };
const jPos: SchematicElement  = { type: "junction", id: "j_pos",  x: 150, y: 40 };
const jNeg: SchematicElement  = { type: "junction", id: "j_neg",  x: 150, y: 220 };
const jGnd: SchematicElement  = { type: "junction", id: "j_gnd",  x: 105, y: 220 };
const jPosRL: SchematicElement = { type: "junction", id: "j_prl", x: 230, y: 40 };
const jNegRL: SchematicElement = { type: "junction", id: "j_nrl", x: 230, y: 220 };
const jPosC1: SchematicElement = { type: "junction", id: "j_pc1", x: 310, y: 40 };
const jNegC1: SchematicElement = { type: "junction", id: "j_nc1", x: 310, y: 220 };

const upperArm = [wA1, d1El, wB2, d2El];
const lowerArm = [wA3, d3El, wN3, wB4, d4El, wN4, jA, jB];
const posTie = [wP1, wP2];
const load = [wPosRL, rlEl, wRLNeg, jPos, jNeg, gndEl, jGnd];
const filter = [wPosC1, c1El, wC1Neg, jPosRL, jNegRL];

// ── Step 1: Breadboard + AC source ──────────────────────────
export const step01: SchematicData = { width: W, height: H, elements: [
  { ...acEl, highlight: true },
  acValue,
]};

// ── Step 2: Place D1 and D2 (upper bridge arm) ─────────────
export const step02: SchematicData = { width: W, height: H, elements: [
  acEl, acValue,
  wA1, { ...d1El, highlight: true },
  wB2, { ...d2El, highlight: true },
]};

// ── Step 3: Place D3 and D4 (lower bridge arm) ─────────────
export const step03: SchematicData = { width: W, height: H, elements: [
  acEl, acValue,
  ...upperArm,
  wA3, { ...d3El, highlight: true }, wN3,
  wB4, { ...d4El, highlight: true }, wN4,
  jA, jB,
  { type: "label", id: "lbl_neg", x: 105, y: 236, text: "(−)" },
]};

// ── Step 4: Tie cathodes to (+) output node ─────────────────
export const step04: SchematicData = { width: W, height: H, elements: [
  acEl, acValue,
  ...upperArm,
  ...lowerArm,
  { ...wP1, highlight: true },
  { ...wP2, highlight: true },
  { type: "label", id: "lbl_pos", x: 105, y: 32, text: "(+)" },
  { type: "label", id: "lbl_neg", x: 105, y: 236, text: "(−)" },
]};

// ── Step 5: Place load resistor ─────────────────────────────
export const step05: SchematicData = { width: W, height: H, elements: [
  acEl, acValue,
  ...upperArm,
  ...lowerArm,
  ...posTie,
  { ...wPosRL, highlight: true },
  { ...rlEl, highlight: true },
  { ...wRLNeg, highlight: true },
  jPos, jNeg, gndEl, jGnd,
]};

// ── Step 6: Add filter capacitor ────────────────────────────
export const step06: SchematicData = { width: W, height: H, elements: [
  acEl, acValue,
  ...upperArm,
  ...lowerArm,
  ...posTie,
  ...load,
  jPosRL, jNegRL,
  { ...wPosC1, highlight: true },
  { ...c1El, highlight: true },
  { ...wC1Neg, highlight: true },
]};

// ── Step 7: Connect multimeter ──────────────────────────────
export const step07: SchematicData = { width: W, height: H, elements: [
  acEl, acValue,
  ...upperArm,
  ...lowerArm,
  ...posTie,
  ...load,
  ...filter,
  jPosC1, jNegC1,
  { ...wPosVm, highlight: true },
  { ...vmEl, highlight: true },
  { ...wVmNeg, highlight: true },
]};

// ── Step 8: Observe output ──────────────────────────────────
export const step08: SchematicData = { width: W, height: H, elements: [
  acEl, acValue,
  ...upperArm,
  ...lowerArm,
  ...posTie,
  ...load,
  ...filter,
  jPosC1, jNegC1,
  wPosVm, vmEl, wVmNeg,
  { type: "label", id: "lbl_out", x: 280, y: 244, text: "Vdc ≈ 15.6 V (filtered)" },
]};

export const fullWaveStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08,
];
