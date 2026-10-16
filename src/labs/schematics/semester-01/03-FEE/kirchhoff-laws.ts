import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Kirchhoff's Current & Voltage Laws — progressive 2D schematics.
 *
 * Two-source, three-resistor network:
 *
 *        ┌── R1 ──┬── R2 ──┐
 *        │      Node A     │
 *        V1       R3       V2
 *        │        │        │
 *        └────── GND ──────┘
 *
 * KCL at Node A: I1 + I2 = I3
 * KVL Loop 1: V1 - V_R1 - V_R3 = 0
 * KVL Loop 2: V2 - V_R2 - V_R3 = 0
 */

const W = 360;
const H = 258;

// ── Symbols ───────────────────────────────────────────────────
const v1 = (value = "9 V", highlight?: boolean): SchematicElement =>
  ({ type: "vsource", id: "V1", x: 50, y: 130, label: "V₁", value, highlight });
const v2 = (highlight?: boolean): SchematicElement =>
  ({ type: "vsource", id: "V2", x: 310, y: 130, label: "V₂", value: "6 V", highlight });
const r1 = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "R1", x: 120, y: 50, label: "R₁", value: "1 kΩ", highlight });
const r2 = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "R2", x: 240, y: 50, label: "R₂", value: "2.2 kΩ", highlight });
const r3 = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "R3", x: 180, y: 130, rotation: 90, label: "R₃", value: "3.3 kΩ", highlight });
const gnd: SchematicElement = { type: "ground", id: "GND", x: 180, y: 210 };

// ── Wires ─────────────────────────────────────────────────────
const wireV1R1: SchematicElement   = { type: "wire", id: "w_v1_r1",   points: [{ x: 50, y: 100 }, { x: 50, y: 50 }, { x: 90, y: 50 }] };
const wireR1R2: SchematicElement   = { type: "wire", id: "w_r1_r2",   points: [{ x: 150, y: 50 }, { x: 210, y: 50 }] };
const wireR2V2: SchematicElement   = { type: "wire", id: "w_r2_v2",   points: [{ x: 270, y: 50 }, { x: 310, y: 50 }, { x: 310, y: 100 }] };
const wireNodeR3: SchematicElement = { type: "wire", id: "w_node_r3", points: [{ x: 180, y: 50 }, { x: 180, y: 100 }] };
const wireR3Gnd: SchematicElement  = { type: "wire", id: "w_r3_gnd",  points: [{ x: 180, y: 160 }, { x: 180, y: 210 }] };
const wireV1Gnd: SchematicElement  = { type: "wire", id: "w_v1_gnd",  points: [{ x: 50, y: 160 }, { x: 50, y: 210 }, { x: 180, y: 210 }] };
const wireV2Gnd: SchematicElement  = { type: "wire", id: "w_v2_gnd",  points: [{ x: 310, y: 160 }, { x: 310, y: 210 }, { x: 180, y: 210 }] };
const juncNode: SchematicElement   = { type: "junction", id: "j_node", x: 180, y: 50 };
const juncGnd: SchematicElement    = { type: "junction", id: "j_gnd",  x: 180, y: 210 };

const lblNodeA: SchematicElement = { type: "label", id: "lbl_node", x: 180, y: 38, text: "Node A" };
const currents: SchematicElement[] = [
  { type: "label", id: "lbl_i1", x: 120, y: 90, text: "I₁ →" },
  { type: "label", id: "lbl_i2", x: 240, y: 90, text: "← I₂" },
  { type: "label", id: "lbl_i3", x: 210, y: 185, text: "↓ I₃" },
];
const caption = (id: string, text: string): SchematicElement =>
  ({ type: "label", id, x: 180, y: 248, text });

type Highlights = { v1?: boolean; v2?: boolean; r1?: boolean; r2?: boolean; r3?: boolean };
const network = (hl: Highlights = {}, v1Value?: string): SchematicElement[] => [
  v1(v1Value, hl.v1), { ...wireV1R1, highlight: hl.v1 || hl.r1 }, r1(hl.r1),
  { ...wireR1R2, highlight: hl.r1 || hl.r2 }, juncNode, r2(hl.r2), { ...wireR2V2, highlight: hl.v2 || hl.r2 },
  v2(hl.v2), { ...wireNodeR3, highlight: hl.r3 }, r3(hl.r3), { ...wireR3Gnd, highlight: hl.r3 },
  { ...wireV1Gnd, highlight: hl.v1 }, { ...wireV2Gnd, highlight: hl.v2 }, gnd, juncGnd,
  lblNodeA,
];

// ── Step 1: Build resistor network — show all 3 resistors + node ──
export const step01: SchematicData = { width: W, height: H, elements: [
  ...network({ v1: true, v2: true, r1: true, r2: true, r3: true }),
]};

// ── Step 2: Insert ammeters — show branch currents ───────────
export const step02: SchematicData = { width: W, height: H, elements: [
  ...network(),
  ...currents,
]};

// ── Step 3: Measure branch currents (KCL check) ──────────────
export const step03: SchematicData = { width: W, height: H, elements: [
  ...network({ r1: true, r2: true, r3: true }),
  ...currents,
  caption("lbl_kcl", "KCL at Node A: I₁ + I₂ = I₃"),
]};

// ── Step 4: Measure Loop 1 voltages ──────────────────────────
export const step04: SchematicData = { width: W, height: H, elements: [
  ...network({ v1: true, r1: true, r3: true }),
  ...currents,
  caption("lbl_kvl1", "Loop 1: V₁ − V_R1 − V_R3 = 0"),
]};

// ── Step 5: Measure Loop 2 voltages ──────────────────────────
export const step05: SchematicData = { width: W, height: H, elements: [
  ...network({ v2: true, r2: true, r3: true }),
  ...currents,
  caption("lbl_kvl2", "Loop 2: V₂ − V_R2 − V_R3 = 0"),
]};

// ── Step 6: Vary supply (V1 = 12V) ──────────────────────────
export const step06: SchematicData = { width: W, height: H, elements: [
  ...network({ v1: true }, "12 V"),
  ...currents,
  caption("lbl_vary", "V₁ changed to 12 V — repeat"),
]};

// ── Step 7: Theoretical comparison ───────────────────────────
export const step07: SchematicData = { width: W, height: H, elements: [
  ...network(),
  ...currents,
  caption("lbl_theory", "Compare measured vs theoretical"),
]};

/** Indexed array */
export const kirchhoffStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07,
];
