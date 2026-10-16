import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * BJT Bias Configurations — progressive 2D schematics.
 *
 * Phase A: Fixed Bias              Phase B: Voltage-Divider Bias
 *   ┌──────┬────────┐                ┌──────┬─────────┐
 *   RB     RC       │                R1     RC        │
 *   │      C        VCC              ├─ B ─ Q          VCC
 *   └─ B ─ Q        │                R2     E         │
 *          E        │                │      RE        │
 *          └─GND────┘                └─GND──┴─────────┘
 */

const W = 520;
const H = 306;

// ── Phase A: fixed bias (left half) ───────────────────────────
// QA at (130,160): B (110,160), C (150,130), E (150,190)
const wireVccA: SchematicElement   = { type: "wire", id: "w_vcc_a",    points: [{ x: 60, y: 65 }, { x: 60, y: 40 }, { x: 220, y: 40 }, { x: 220, y: 125 }] };
const wireGndA: SchematicElement   = { type: "wire", id: "w_gnd_a",    points: [{ x: 220, y: 185 }, { x: 220, y: 270 }, { x: 150, y: 270 }] };
const wireRbBase: SchematicElement = { type: "wire", id: "w_rb_base",  points: [{ x: 60, y: 125 }, { x: 60, y: 160 }, { x: 110, y: 160 }] };
const wireEmGndA: SchematicElement = { type: "wire", id: "w_em_gnd_a", points: [{ x: 150, y: 190 }, { x: 150, y: 270 }] };
const wireRcUpA: SchematicElement  = { type: "wire", id: "w_rc_up_a",  points: [{ x: 150, y: 50 }, { x: 150, y: 40 }] };
const wireRcColA: SchematicElement = { type: "wire", id: "w_rc_col_a", points: [{ x: 150, y: 110 }, { x: 150, y: 130 }] };
const juncGndA: SchematicElement   = { type: "junction", id: "j_gnd_a",   x: 150, y: 270 };
const juncRcA: SchematicElement    = { type: "junction", id: "j_rc_a",    x: 150, y: 40 };

const titleA: SchematicElement = { type: "label", id: "lbl_phase_a", x: 130, y: 20, text: "Phase A: Fixed Bias" };
const vccA: SchematicElement = { type: "vsource", id: "VCC_A", x: 220, y: 155, label: "VCC", value: "12 V" };
const rb = (highlight?: boolean): SchematicElement => ({ type: "resistor", id: "RB", x: 60, y: 95, rotation: 90, label: "RB", value: "470 kΩ", highlight });
const qa = (highlight?: boolean): SchematicElement => ({ type: "npn-bjt", id: "QA", x: 130, y: 160, label: "BC547", highlight });
const rcA = (highlight?: boolean): SchematicElement => ({ type: "resistor", id: "RC_A", x: 150, y: 80, rotation: 90, label: "RC", value: "4.7 kΩ", highlight });
const gndA: SchematicElement = { type: "ground", id: "GND_A", x: 150, y: 270 };
const probeA = (highlight?: boolean): SchematicElement[] => [
  { type: "junction", id: "j_pr_a", x: 150, y: 120 },
  { type: "wire", id: "w_pr_a", points: [{ x: 150, y: 120 }, { x: 174, y: 120 }], highlight },
  { type: "probe", id: "pr_vce_a", x: 180, y: 120, label: "VCE", highlight },
];

const phaseA: SchematicElement[] = [
  titleA, vccA, wireVccA, wireGndA, rb(), wireRbBase, qa(), wireEmGndA, gndA, juncGndA,
  wireRcUpA, juncRcA, rcA(), wireRcColA,
];

// ── Phase B: voltage-divider bias (right half) ────────────────
// QB at (390,160): B (370,160), C (410,130), E (410,190)
const wireVccB: SchematicElement   = { type: "wire", id: "w_vcc_b",    points: [{ x: 320, y: 65 }, { x: 320, y: 40 }, { x: 480, y: 40 }, { x: 480, y: 125 }] };
const wireGndB: SchematicElement   = { type: "wire", id: "w_gnd_b",    points: [{ x: 480, y: 185 }, { x: 480, y: 270 }, { x: 320, y: 270 }, { x: 320, y: 245 }] };
const wireR1R2: SchematicElement   = { type: "wire", id: "w_r1_r2",    points: [{ x: 320, y: 125 }, { x: 320, y: 185 }] };
const wireBaseB: SchematicElement  = { type: "wire", id: "w_base_b",   points: [{ x: 320, y: 160 }, { x: 370, y: 160 }] };
const wireRcUpB: SchematicElement  = { type: "wire", id: "w_rc_up_b",  points: [{ x: 410, y: 50 }, { x: 410, y: 40 }] };
const wireRcColB: SchematicElement = { type: "wire", id: "w_rc_col_b", points: [{ x: 410, y: 110 }, { x: 410, y: 130 }] };
const wireEmReB: SchematicElement  = { type: "wire", id: "w_em_re_b",  points: [{ x: 410, y: 190 }, { x: 410, y: 200 }] };
const wireReGnd: SchematicElement  = { type: "wire", id: "w_re_gnd",   points: [{ x: 410, y: 260 }, { x: 410, y: 270 }] };
const juncBaseB: SchematicElement  = { type: "junction", id: "j_base_b", x: 320, y: 160 };
const juncGndB: SchematicElement   = { type: "junction", id: "j_gnd_b",  x: 360, y: 270 };
const juncRcB: SchematicElement    = { type: "junction", id: "j_rc_b",   x: 410, y: 40 };
const juncReB: SchematicElement    = { type: "junction", id: "j_re_b",   x: 410, y: 270 };

const titleB: SchematicElement = { type: "label", id: "lbl_phase_b", x: 390, y: 20, text: "Phase B: Voltage-Divider Bias" };
const vccB = (highlight?: boolean): SchematicElement => ({ type: "vsource", id: "VCC_B", x: 480, y: 155, label: "VCC", value: "12 V", highlight });
const r1 = (highlight?: boolean): SchematicElement => ({ type: "resistor", id: "R1", x: 320, y: 95, rotation: 90, label: "R1", value: "100 kΩ", highlight });
const r2 = (highlight?: boolean): SchematicElement => ({ type: "resistor", id: "R2", x: 320, y: 215, rotation: 90, label: "R2", value: "10 kΩ", highlight });
const qb = (highlight?: boolean): SchematicElement => ({ type: "npn-bjt", id: "QB", x: 390, y: 160, label: "BC547", highlight });
const rcB = (highlight?: boolean): SchematicElement => ({ type: "resistor", id: "RC_B", x: 410, y: 80, rotation: 90, label: "RC", value: "4.7 kΩ", highlight });
const reB = (highlight?: boolean): SchematicElement => ({ type: "resistor", id: "RE", x: 410, y: 230, rotation: 90, label: "RE", value: "1 kΩ", highlight });
const gndB: SchematicElement = { type: "ground", id: "GND_B", x: 360, y: 270 };

const dividerB = (highlight?: boolean): SchematicElement[] => [
  titleB, vccB(highlight), wireVccB, wireGndB, r1(highlight), wireR1R2, r2(highlight),
  wireBaseB, juncBaseB, qb(highlight), gndB, juncGndB,
];
const loadB = (highlight?: boolean): SchematicElement[] => [
  { ...wireRcUpB, highlight }, juncRcB, rcB(highlight), { ...wireRcColB, highlight },
  { ...wireEmReB, highlight }, reB(highlight), { ...wireReGnd, highlight }, juncReB,
];

/** Step 1: Phase A — Fixed bias: place transistor + RB */
export const step01: SchematicData = { width: W, height: H, elements: [
  titleA, vccA, wireVccA, wireGndA,
  rb(true),
  wireRbBase,
  qa(true),
  wireEmGndA, gndA, juncGndA,
]};

/** Step 2: Phase A — Add collector resistor RC */
export const step02: SchematicData = { width: W, height: H, elements: [
  titleA, vccA, wireVccA, wireGndA, rb(), wireRbBase, qa(), wireEmGndA, gndA, juncGndA,
  // NEW
  wireRcUpA, juncRcA,
  rcA(true),
  { ...wireRcColA, highlight: true },
  { type: "label", id: "lbl_ic", x: 190, y: 104, text: "IC ≈ 24 µA" },
]};

/** Step 3: Phase A — Measure and verify Q-point */
export const step03: SchematicData = { width: W, height: H, elements: [
  ...phaseA,
  ...probeA(true),
  { type: "label", id: "lbl_unstable", x: 130, y: 300, text: "Q-point unstable: varies with β and temp" },
]};

/** Step 4: Phase B — VDB: place transistor + R1, R2 divider */
export const step04: SchematicData = { width: W, height: H, elements: [
  ...phaseA,
  // Phase B — NEW
  ...dividerB(true),
]};

/** Step 5: Phase B — Add RC and RE */
export const step05: SchematicData = { width: W, height: H, elements: [
  ...phaseA,
  ...dividerB(),
  // NEW
  ...loadB(true),
]};

/** Step 6: Compare Q-point stability */
export const step06: SchematicData = { width: W, height: H, elements: [
  ...phaseA,
  ...probeA(),
  ...dividerB(),
  ...loadB(),
  { type: "junction", id: "j_pr_b", x: 410, y: 120 },
  { type: "wire", id: "w_pr_b", points: [{ x: 410, y: 120 }, { x: 434, y: 120 }], highlight: true },
  { type: "probe", id: "pr_b", x: 440, y: 120, label: "VCE", highlight: true },
  { type: "label", id: "lbl_stable", x: 390, y: 300, text: "VDB: Q-point stable (β-independent)" },
]};

/** Indexed array */
export const bjtBiasStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06,
];

/** Theory diagram */
export const bjtBiasTheoryDiagram: SchematicData = step06;
