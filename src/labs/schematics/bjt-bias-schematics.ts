import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * BJT Bias Configurations — progressive 2D schematics.
 *
 * Phase A: Fixed Bias
 *   VCC ── RB ── B─┐
 *                  │ Q1
 *   VCC ── RC ── C─┤
 *                  │
 *   GND ───────── E─┘
 *
 * Phase B: Voltage-Divider Bias
 *   VCC ─┬─ R1 ─┬─ RC ─┐
 *        │      │      C
 *        │      B      │ Q1
 *        │      │      E
 *        └─ R2 ─┴─ RE ─┴─ GND
 */

const W = 420;
const H = 280;

// Phase A positions (left side)
const QA    = { x: 100, y: 140 };
const RB_A  = { x: 50, y: 70 };
const RC_A  = { x: 150, y: 70 };
const GND_A = { x: 100, y: 250 };

// Phase B positions (right side)  
const QB    = { x: 320, y: 140 };
const R1_B  = { x: 260, y: 70 };
const R2_B  = { x: 260, y: 200 };
const RC_B  = { x: 370, y: 70 };
const RE_B  = { x: 370, y: 200 };
const GND_B = { x: 320, y: 250 };

// Common VCC rail
const wireVccA: SchematicElement = { type: "wire", id: "w_vcc_a", points: [{ x: 50, y: 30 }, { x: 150, y: 30 }] };
const wireVccB: SchematicElement = { type: "wire", id: "w_vcc_b", points: [{ x: 260, y: 30 }, { x: 370, y: 30 }] };

// Phase A wires
const wireRbUp: SchematicElement = { type: "wire", id: "w_rb_up", points: [{ x: 50, y: 40 }, { x: 50, y: 30 }] };
const wireRbBase: SchematicElement = { type: "wire", id: "w_rb_base", points: [{ x: 50, y: 100 }, { x: 50, y: 140 }, { x: 80, y: 140 }] };
const wireRcUpA: SchematicElement = { type: "wire", id: "w_rc_up_a", points: [{ x: 150, y: 40 }, { x: 150, y: 30 }] };
const wireRcColA: SchematicElement = { type: "wire", id: "w_rc_col_a", points: [{ x: 150, y: 100 }, { x: 150, y: 110 }, { x: 120, y: 110 }] };
const wireEmGndA: SchematicElement = { type: "wire", id: "w_em_gnd_a", points: [{ x: 120, y: 170 }, { x: 120, y: 250 }, { x: 100, y: 250 }] };

// Phase B wires
const wireR1Up: SchematicElement = { type: "wire", id: "w_r1_up", points: [{ x: 260, y: 40 }, { x: 260, y: 30 }] };
const wireR1Base: SchematicElement = { type: "wire", id: "w_r1_base", points: [{ x: 260, y: 100 }, { x: 260, y: 140 }, { x: 300, y: 140 }] };
const wireR2Base: SchematicElement = { type: "wire", id: "w_r2_base", points: [{ x: 260, y: 170 }, { x: 260, y: 140 }] };
const wireR2Gnd: SchematicElement = { type: "wire", id: "w_r2_gnd", points: [{ x: 260, y: 230 }, { x: 260, y: 250 }, { x: 320, y: 250 }] };
const wireRcUpB: SchematicElement = { type: "wire", id: "w_rc_up_b", points: [{ x: 370, y: 40 }, { x: 370, y: 30 }] };
const wireRcColB: SchematicElement = { type: "wire", id: "w_rc_col_b", points: [{ x: 370, y: 100 }, { x: 370, y: 110 }, { x: 340, y: 110 }] };
const wireEmReB: SchematicElement = { type: "wire", id: "w_em_re_b", points: [{ x: 340, y: 170 }, { x: 340, y: 200 }, { x: 340, y: 200 }] };
const wireReGnd: SchematicElement = { type: "wire", id: "w_re_gnd", points: [{ x: 370, y: 230 }, { x: 370, y: 250 }, { x: 320, y: 250 }] };
const juncBaseB: SchematicElement = { type: "junction", id: "j_base_b", x: 260, y: 140 };
const juncGndB: SchematicElement = { type: "junction", id: "j_gnd_b", x: 320, y: 250 };

/** Step 1: Phase A — Fixed bias: place transistor + RB */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_phase_a", x: 100, y: 20, text: "Phase A: Fixed Bias" },
  { type: "vsource", id: "VCC_A", x: 100, y: 30, rotation: 90, label: "VCC", value: "12 V" },
  wireVccA,
  wireRbUp,
  { type: "resistor", id: "RB", ...RB_A, rotation: 90, label: "RB", value: "470 kΩ", highlight: true },
  wireRbBase,
  { type: "npn-bjt", id: "QA", ...QA, label: "BC547", highlight: true },
  wireEmGndA,
  { type: "ground", id: "GND_A", ...GND_A },
]};

/** Step 2: Phase A — Add collector resistor RC */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_phase_a", x: 100, y: 20, text: "Phase A: Fixed Bias" },
  { type: "vsource", id: "VCC_A", x: 100, y: 30, rotation: 90, label: "VCC", value: "12 V" },
  wireVccA,
  wireRbUp,
  { type: "resistor", id: "RB", ...RB_A, rotation: 90, label: "RB", value: "470 kΩ" },
  wireRbBase,
  { type: "npn-bjt", id: "QA", ...QA, label: "BC547" },
  wireEmGndA,
  { type: "ground", id: "GND_A", ...GND_A },
  // NEW
  wireRcUpA,
  { type: "resistor", id: "RC_A", ...RC_A, rotation: 90, label: "RC", value: "4.7 kΩ", highlight: true },
  { ...wireRcColA, highlight: true },
  { type: "label", id: "lbl_ic", x: 180, y: 90, text: "IC ≈ 24 µA" },
]};

/** Step 3: Phase A — Measure and verify Q-point */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_phase_a", x: 100, y: 20, text: "Phase A: Fixed Bias" },
  { type: "vsource", id: "VCC_A", x: 100, y: 30, rotation: 90, label: "VCC", value: "12 V" },
  wireVccA,
  wireRbUp,
  { type: "resistor", id: "RB", ...RB_A, rotation: 90, label: "RB", value: "470 kΩ" },
  wireRbBase,
  { type: "npn-bjt", id: "QA", ...QA, label: "BC547" },
  wireEmGndA,
  { type: "ground", id: "GND_A", ...GND_A },
  wireRcUpA,
  { type: "resistor", id: "RC_A", ...RC_A, rotation: 90, label: "RC", value: "4.7 kΩ" },
  wireRcColA,
  // Probes
  { type: "probe", id: "pr_vce_a", x: 140, y: 140, label: "VCE", highlight: true },
  { type: "label", id: "lbl_unstable", x: 100, y: 270, text: "Q-point unstable: varies with β and temp" },
]};

/** Step 4: Phase B — VDB: place transistor + R1, R2 divider */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_phase_a", x: 100, y: 20, text: "Phase A: Fixed Bias" },
  { type: "vsource", id: "VCC_A", x: 100, y: 30, rotation: 90, label: "VCC", value: "12 V" },
  wireVccA, wireRbUp,
  { type: "resistor", id: "RB", ...RB_A, rotation: 90, label: "RB", value: "470 kΩ" },
  wireRbBase,
  { type: "npn-bjt", id: "QA", ...QA, label: "BC547" },
  wireEmGndA,
  { type: "ground", id: "GND_A", ...GND_A },
  wireRcUpA,
  { type: "resistor", id: "RC_A", ...RC_A, rotation: 90, label: "RC", value: "4.7 kΩ" },
  wireRcColA,
  // Phase B — NEW
  { type: "label", id: "lbl_phase_b", x: 320, y: 20, text: "Phase B: Voltage-Divider Bias" },
  { type: "vsource", id: "VCC_B", x: 320, y: 30, rotation: 90, label: "VCC", value: "12 V", highlight: true },
  wireVccB,
  wireR1Up,
  { type: "resistor", id: "R1", ...R1_B, rotation: 90, label: "R1", value: "100 kΩ", highlight: true },
  wireR1Base,
  { type: "resistor", id: "R2", ...R2_B, rotation: 90, label: "R2", value: "10 kΩ", highlight: true },
  wireR2Base,
  wireR2Gnd,
  juncBaseB,
  { type: "npn-bjt", id: "QB", ...QB, label: "BC547", highlight: true },
  { type: "ground", id: "GND_B", ...GND_B },
]};

/** Step 5: Phase B — Add RC and RE */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_phase_a", x: 100, y: 20, text: "Phase A: Fixed Bias" },
  { type: "vsource", id: "VCC_A", x: 100, y: 30, rotation: 90, label: "VCC", value: "12 V" },
  wireVccA, wireRbUp,
  { type: "resistor", id: "RB", ...RB_A, rotation: 90, label: "RB", value: "470 kΩ" },
  wireRbBase,
  { type: "npn-bjt", id: "QA", ...QA, label: "BC547" },
  wireEmGndA,
  { type: "ground", id: "GND_A", ...GND_A },
  wireRcUpA,
  { type: "resistor", id: "RC_A", ...RC_A, rotation: 90, label: "RC", value: "4.7 kΩ" },
  wireRcColA,
  // Phase B
  { type: "label", id: "lbl_phase_b", x: 320, y: 20, text: "Phase B: Voltage-Divider Bias" },
  { type: "vsource", id: "VCC_B", x: 320, y: 30, rotation: 90, label: "VCC", value: "12 V" },
  wireVccB,
  wireR1Up,
  { type: "resistor", id: "R1", ...R1_B, rotation: 90, label: "R1", value: "100 kΩ" },
  wireR1Base,
  { type: "resistor", id: "R2", ...R2_B, rotation: 90, label: "R2", value: "10 kΩ" },
  wireR2Base,
  wireR2Gnd,
  juncBaseB,
  { type: "npn-bjt", id: "QB", ...QB, label: "BC547" },
  { type: "ground", id: "GND_B", ...GND_B },
  juncGndB,
  // NEW
  wireRcUpB,
  { type: "resistor", id: "RC_B", ...RC_B, rotation: 90, label: "RC", value: "4.7 kΩ", highlight: true },
  { ...wireRcColB, highlight: true },
  { ...wireEmReB, highlight: true },
  { type: "resistor", id: "RE", ...RE_B, rotation: 90, label: "RE", value: "1 kΩ", highlight: true },
  { ...wireReGnd, highlight: true },
]};

/** Step 6: Compare Q-point stability */
export const step06: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_phase_a", x: 100, y: 20, text: "Phase A: Fixed Bias" },
  { type: "vsource", id: "VCC_A", x: 100, y: 30, rotation: 90, label: "VCC", value: "12 V" },
  wireVccA, wireRbUp,
  { type: "resistor", id: "RB", ...RB_A, rotation: 90, label: "RB", value: "470 kΩ" },
  wireRbBase,
  { type: "npn-bjt", id: "QA", ...QA, label: "BC547" },
  wireEmGndA,
  { type: "ground", id: "GND_A", ...GND_A },
  wireRcUpA,
  { type: "resistor", id: "RC_A", ...RC_A, rotation: 90, label: "RC", value: "4.7 kΩ" },
  wireRcColA,
  { type: "probe", id: "pr_a", x: 140, y: 140, label: "VCE" },
  // Phase B
  { type: "label", id: "lbl_phase_b", x: 320, y: 20, text: "Phase B: Voltage-Divider Bias" },
  { type: "vsource", id: "VCC_B", x: 320, y: 30, rotation: 90, label: "VCC", value: "12 V" },
  wireVccB,
  wireR1Up,
  { type: "resistor", id: "R1", ...R1_B, rotation: 90, label: "R1", value: "100 kΩ" },
  wireR1Base,
  { type: "resistor", id: "R2", ...R2_B, rotation: 90, label: "R2", value: "10 kΩ" },
  wireR2Base,
  wireR2Gnd,
  juncBaseB,
  { type: "npn-bjt", id: "QB", ...QB, label: "BC547" },
  { type: "ground", id: "GND_B", ...GND_B },
  juncGndB,
  wireRcUpB,
  { type: "resistor", id: "RC_B", ...RC_B, rotation: 90, label: "RC", value: "4.7 kΩ" },
  wireRcColB,
  wireEmReB,
  { type: "resistor", id: "RE", ...RE_B, rotation: 90, label: "RE", value: "1 kΩ" },
  wireReGnd,
  { type: "probe", id: "pr_b", x: 360, y: 140, label: "VCE", highlight: true },
  { type: "label", id: "lbl_stable", x: 320, y: 270, text: "VDB: Q-point stable (β-independent)" },
]};

/** Indexed array */
export const bjtBiasStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06,
];

/** Theory diagram */
export const bjtBiasTheoryDiagram: SchematicData = step06;
