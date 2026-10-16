import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Superposition Theorem — progressive 2D schematics.
 *
 * Two-source network (same topology as Kirchhoff):
 *
 *        ┌── R1 ──┬── R2 ──┐
 *        │        N        │
 *        V1       R3       V2
 *        │        │        │
 *        └────── GND ──────┘
 *
 * The procedure kills one source at a time (replaced by a short)
 * and sums the partial responses.
 */

const W = 360;
const H = 258;

// ── Symbols ───────────────────────────────────────────────────
const v1 = (highlight?: boolean): SchematicElement =>
  ({ type: "vsource", id: "V1", x: 50, y: 130, label: "V₁", value: "9 V", highlight });
const v2 = (highlight?: boolean): SchematicElement =>
  ({ type: "vsource", id: "V2", x: 310, y: 130, label: "V₂", value: "6 V", highlight });
const r1: SchematicElement = { type: "resistor", id: "R1", x: 120, y: 50, label: "R₁", value: "1 kΩ" };
const r2: SchematicElement = { type: "resistor", id: "R2", x: 240, y: 50, label: "R₂", value: "2.2 kΩ" };
const r3: SchematicElement = { type: "resistor", id: "R3", x: 180, y: 130, rotation: 90, label: "R₃", value: "3.3 kΩ" };
const gnd: SchematicElement = { type: "ground", id: "GND", x: 180, y: 210 };

// ── Wires ─────────────────────────────────────────────────────
const wireV1R1: SchematicElement   = { type: "wire", id: "w_v1_r1",   points: [{ x: 50, y: 100 }, { x: 50, y: 50 }, { x: 90, y: 50 }] };
const wireR1R2: SchematicElement   = { type: "wire", id: "w_r1_r2",   points: [{ x: 150, y: 50 }, { x: 210, y: 50 }] };
const wireR2V2: SchematicElement   = { type: "wire", id: "w_r2_v2",   points: [{ x: 270, y: 50 }, { x: 310, y: 50 }, { x: 310, y: 100 }] };
const wireNR3: SchematicElement    = { type: "wire", id: "w_n_r3",    points: [{ x: 180, y: 50 }, { x: 180, y: 100 }] };
const wireR3Gnd: SchematicElement  = { type: "wire", id: "w_r3_gnd",  points: [{ x: 180, y: 160 }, { x: 180, y: 210 }] };
const wireV1Gnd: SchematicElement  = { type: "wire", id: "w_v1_gnd",  points: [{ x: 50, y: 160 }, { x: 50, y: 210 }, { x: 180, y: 210 }] };
const wireV2Gnd: SchematicElement  = { type: "wire", id: "w_v2_gnd",  points: [{ x: 310, y: 160 }, { x: 310, y: 210 }, { x: 180, y: 210 }] };
const juncN: SchematicElement      = { type: "junction", id: "j_n",   x: 180, y: 50 };
const juncGnd: SchematicElement    = { type: "junction", id: "j_gnd", x: 180, y: 210 };

const lblN: SchematicElement = { type: "label", id: "lbl_n", x: 180, y: 38, text: "N" };
const caption = (id: string, text: string): SchematicElement =>
  ({ type: "label", id, x: 180, y: 248, text });

/** A source, or a highlighted short when the source is killed. */
const source1 = (killed: boolean, highlight?: boolean): SchematicElement[] => killed
  ? [{ type: "wire", id: "w_v1_short", points: [{ x: 50, y: 100 }, { x: 50, y: 160 }], highlight: true },
     { type: "label", id: "lbl_v1kill", x: 90, y: 134, text: "V₁ = 0" }]
  : [v1(highlight)];
const source2 = (killed: boolean, highlight?: boolean): SchematicElement[] => killed
  ? [{ type: "wire", id: "w_v2_short", points: [{ x: 310, y: 100 }, { x: 310, y: 160 }], highlight: true },
     { type: "label", id: "lbl_v2kill", x: 270, y: 134, text: "V₂ = 0" }]
  : [v2(highlight)];

const network = (opts: { kill1?: boolean; kill2?: boolean; highlight?: boolean } = {}): SchematicElement[] => [
  ...source1(!!opts.kill1, opts.highlight), ...source2(!!opts.kill2, opts.highlight),
  wireV1R1, r1, wireR1R2, juncN, r2, wireR2V2,
  wireNR3, r3, wireR3Gnd, wireV1Gnd, wireV2Gnd, gnd, juncGnd,
  lblN,
];

// ── Step 1: Both sources active, measure I_total ─────────────
export const step01: SchematicData = { width: W, height: H, elements: [
  ...network({ highlight: true }),
  caption("lbl_meas", "Both active — measure I_R3 total"),
]};

// ── Step 2: Kill V2, measure due to V1 alone ────────────────
export const step02: SchematicData = { width: W, height: H, elements: [
  ...network({ kill2: true, highlight: true }),
  caption("lbl_meas", "V₁ alone → I_R3,V1"),
]};

// ── Step 3: Kill V1, measure due to V2 alone ────────────────
export const step03: SchematicData = { width: W, height: H, elements: [
  ...network({ kill1: true, highlight: true }),
  caption("lbl_meas", "V₂ alone → I_R3,V2"),
]};

// ── Step 4: Apply superposition sum ─────────────────────────
export const step04: SchematicData = { width: W, height: H, elements: [
  ...network(),
  caption("lbl_super", "I_total = I_R3,V1 + I_R3,V2 ✓"),
]};

// ── Step 5: Verify voltage superposition ────────────────────
export const step05: SchematicData = { width: W, height: H, elements: [
  ...network(),
  caption("lbl_vsuper", "V_R3 = V_R3,V1 + V_R3,V2 ✓"),
]};

// ── Step 6: Theoretical comparison ──────────────────────────
export const step06: SchematicData = { width: W, height: H, elements: [
  ...network(),
  caption("lbl_theory", "Compare measured vs calculated"),
]};

export const superpositionStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06,
];
