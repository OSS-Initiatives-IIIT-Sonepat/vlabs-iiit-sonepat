import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Superposition Theorem — progressive 2D schematics.
 *
 * Two-source network:
 *   V1 ── R1 ──┐
 *               ├── Node N ── R3 ── GND
 *   V2 ── R2 ──┘
 *
 * Same topology as Kirchhoff, but procedure focuses on killing
 * one source at a time and summing partial responses.
 */

const W = 320;
const H = 260;

// ── Positions ─────────────────────────────────────────────────
const V1   = { x: 30,  y: 60  };
const V2   = { x: 30,  y: 190 };
const R1   = { x: 120, y: 30  };
const R2   = { x: 120, y: 230 };
const R3   = { x: 270, y: 130 };
const GND1 = { x: 270, y: 230 };

// ── Wires ─────────────────────────────────────────────────────
const wireV1top: SchematicElement  = { type: "wire", id: "w_v1_top",  points: [{ x: 30, y: 30 }, { x: 90, y: 30 }] };
const wireV1bot: SchematicElement  = { type: "wire", id: "w_v1_bot",  points: [{ x: 30, y: 90 }, { x: 30, y: 130 }] };
const wireV2top: SchematicElement  = { type: "wire", id: "w_v2_top",  points: [{ x: 30, y: 160 }, { x: 30, y: 130 }] };
const wireV2bot: SchematicElement  = { type: "wire", id: "w_v2_bot",  points: [{ x: 30, y: 220 }, { x: 30, y: 230 }, { x: 90, y: 230 }] };
const wireR1N: SchematicElement    = { type: "wire", id: "w_r1_n",    points: [{ x: 150, y: 30 }, { x: 200, y: 30 }, { x: 200, y: 130 }] };
const wireR2N: SchematicElement    = { type: "wire", id: "w_r2_n",    points: [{ x: 150, y: 230 }, { x: 200, y: 230 }, { x: 200, y: 130 }] };
const wireNR3: SchematicElement    = { type: "wire", id: "w_n_r3",    points: [{ x: 200, y: 130 }, { x: 240, y: 130 }] };
const wireR3Gnd: SchematicElement  = { type: "wire", id: "w_r3_gnd",  points: [{ x: 300, y: 130 }, { x: 300, y: 230 }, { x: 270, y: 230 }] };
const juncN: SchematicElement      = { type: "junction", id: "j_n",    x: 200, y: 130 };
const juncV: SchematicElement      = { type: "junction", id: "j_v",    x: 30, y: 130 };

const lblN: SchematicElement = { type: "label", id: "lbl_n", x: 208, y: 118, text: "N" };

// Full circuit base
const baseFull: SchematicElement[] = [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "9 V" },
  wireV1top,
  wireV1bot,
  { type: "vsource", id: "V2", ...V2, label: "V₂", value: "6 V" },
  wireV2top,
  wireV2bot,
  juncV,
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1N,
  { type: "resistor", id: "R2", ...R2, label: "R₂", value: "2.2 kΩ" },
  wireR2N,
  juncN,
  wireNR3,
  { type: "resistor", id: "R3", ...R3, rotation: 90, label: "R₃", value: "3.3 kΩ" },
  wireR3Gnd,
  { type: "ground", id: "GND", ...GND1 },
  lblN,
];

// ── Step 1: Both sources active, measure I_total ─────────────
export const step01: SchematicData = { width: W, height: H, elements: [
  ...baseFull.map(el => (el.id === "V1" || el.id === "V2") ? { ...el, highlight: true } : el),
  { type: "label", id: "lbl_meas", x: 160, y: 248, text: "Both active — measure I_R3 total" },
]};

// ── Step 2: Kill V2, measure due to V1 alone ────────────────
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "vsource", id: "V1", ...V1, label: "V₁", value: "9 V", highlight: true },
  wireV1top,
  wireV1bot,
  // V2 killed — replaced with short (wire through mid)
  { type: "wire", id: "w_v2_short", points: [{ x: 30, y: 130 }, { x: 30, y: 230 }, { x: 90, y: 230 }], highlight: true },
  { type: "label", id: "lbl_v2kill", x: 36, y: 195, text: "V₂ = 0" },
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1N,
  { type: "resistor", id: "R2", ...R2, label: "R₂", value: "2.2 kΩ" },
  wireR2N,
  juncN,
  wireNR3,
  { type: "resistor", id: "R3", ...R3, rotation: 90, label: "R₃", value: "3.3 kΩ" },
  wireR3Gnd,
  { type: "ground", id: "GND", ...GND1 },
  lblN,
  { type: "label", id: "lbl_meas", x: 160, y: 248, text: "V₁ alone → I_R3,V1" },
]};

// ── Step 3: Kill V1, measure due to V2 alone ────────────────
export const step03: SchematicData = { width: W, height: H, elements: [
  // V1 killed
  { type: "wire", id: "w_v1_short", points: [{ x: 30, y: 30 }, { x: 30, y: 130 }], highlight: true },
  { type: "label", id: "lbl_v1kill", x: 36, y: 55, text: "V₁ = 0" },
  { type: "wire", id: "w_v1_top2", points: [{ x: 30, y: 30 }, { x: 90, y: 30 }] },
  { type: "vsource", id: "V2", ...V2, label: "V₂", value: "6 V", highlight: true },
  wireV2top,
  wireV2bot,
  { type: "resistor", id: "R1", ...R1, label: "R₁", value: "1 kΩ" },
  wireR1N,
  { type: "resistor", id: "R2", ...R2, label: "R₂", value: "2.2 kΩ" },
  wireR2N,
  juncN,
  wireNR3,
  { type: "resistor", id: "R3", ...R3, rotation: 90, label: "R₃", value: "3.3 kΩ" },
  wireR3Gnd,
  { type: "ground", id: "GND", ...GND1 },
  lblN,
  { type: "label", id: "lbl_meas", x: 160, y: 248, text: "V₂ alone → I_R3,V2" },
]};

// ── Step 4: Apply superposition sum ─────────────────────────
export const step04: SchematicData = { width: W, height: H, elements: [
  ...baseFull,
  { type: "label", id: "lbl_super", x: 160, y: 248, text: "I_total = I_R3,V1 + I_R3,V2 ✓" },
]};

// ── Step 5: Verify voltage superposition ────────────────────
export const step05: SchematicData = { width: W, height: H, elements: [
  ...baseFull,
  { type: "label", id: "lbl_vsuper", x: 160, y: 248, text: "V_R3 = V_R3,V1 + V_R3,V2 ✓" },
]};

// ── Step 6: Theoretical comparison ──────────────────────────
export const step06: SchematicData = { width: W, height: H, elements: [
  ...baseFull,
  { type: "label", id: "lbl_theory", x: 160, y: 248, text: "Compare measured vs calculated" },
]};

export const superpositionStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06,
];
