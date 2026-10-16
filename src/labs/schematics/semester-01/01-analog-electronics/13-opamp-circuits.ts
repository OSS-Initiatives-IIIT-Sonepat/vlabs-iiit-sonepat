import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Op-Amp Circuits (Inverting and Non-Inverting Amplifiers) — progressive 2D schematics.
 *
 * Phase A: Inverting Amplifier (Av = -Rf/Rin = -10)
 * Phase B: Non-Inverting Amplifier (Av = 1 + Rf/R1 = +11)
 *
 * Same layout as 10-inverting-non-inverting-opamp:
 * op-amp pins at (x, y): − (x−30, y−12), + (x−30, y+12), out (x+40, y).
 */

const W = 620;
const H = 300;

// ── Phase A: inverting amplifier (left half) ──────────────────
// U1 at (180,140): − (150,128), + (150,152), out (220,140)
const wireVinRin: SchematicElement    = { type: "wire", id: "w_vin_rin_a",   points: [{ x: 50, y: 160 }, { x: 50, y: 128 }, { x: 70, y: 128 }] };
const wireRinOp: SchematicElement     = { type: "wire", id: "w_rin_op",      points: [{ x: 130, y: 128 }, { x: 150, y: 128 }] };
const wireOpPlusGnd: SchematicElement = { type: "wire", id: "w_op_plus_gnd", points: [{ x: 150, y: 152 }, { x: 140, y: 152 }, { x: 140, y: 250 }] };
const wireRfTop: SchematicElement     = { type: "wire", id: "w_rf_top_a",    points: [{ x: 140, y: 128 }, { x: 140, y: 70 }, { x: 150, y: 70 }] };
const wireRfOut: SchematicElement     = { type: "wire", id: "w_rf_out_a",    points: [{ x: 210, y: 70 }, { x: 240, y: 70 }, { x: 240, y: 140 }] };
const wireOutA: SchematicElement      = { type: "wire", id: "w_out_a",       points: [{ x: 220, y: 140 }, { x: 254, y: 140 }] };
const wireVinGnd: SchematicElement    = { type: "wire", id: "w_vin_gnd_a",   points: [{ x: 50, y: 220 }, { x: 50, y: 250 }, { x: 140, y: 250 }] };
const juncMinusA: SchematicElement    = { type: "junction", id: "j_minus_a", x: 140, y: 128 };
const juncOutA: SchematicElement      = { type: "junction", id: "j_out_a",   x: 240, y: 140 };
const juncGnd: SchematicElement       = { type: "junction", id: "j_gnd",     x: 140, y: 250 };

const gnd: SchematicElement = { type: "ground", id: "GND", x: 140, y: 250 };
const u1 = (label: string, highlight?: boolean): SchematicElement =>
  ({ type: "op-amp", id: "U1", x: 180, y: 140, label, highlight });
const rin = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "RIN", x: 100, y: 128, label: "Rin", value: "10 kΩ", highlight });
const rf1 = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "RF1", x: 180, y: 70, label: "Rf", value: "100 kΩ", highlight });
const vin1 = (value: string, highlight?: boolean): SchematicElement =>
  ({ type: "acsource", id: "VIN1", x: 50, y: 190, label: "Vin", value, highlight });
const probeA = (label: string, highlight?: boolean): SchematicElement =>
  ({ type: "probe", id: "pr_out_a", x: 260, y: 140, label, highlight });
const titleA = (text: string): SchematicElement => ({ type: "label", id: "lbl_a", x: 150, y: 30, text });

const inverting = (u1Label: string, probe: string, highlight?: boolean): SchematicElement[] => [
  u1(u1Label, highlight), gnd, { ...wireOpPlusGnd, highlight },
  rin(highlight), { ...wireRinOp, highlight }, juncMinusA,
  { ...wireRfTop, highlight }, rf1(highlight), { ...wireRfOut, highlight }, juncOutA,
  { ...wireOutA, highlight }, probeA(probe),
];

// ── Phase B: non-inverting amplifier (right half) ─────────────
// U2 at (470,140): − (440,128), + (440,152), out (510,140)
const wireVinPlus: SchematicElement  = { type: "wire", id: "w_vin_plus_b", points: [{ x: 330, y: 170 }, { x: 330, y: 152 }, { x: 440, y: 152 }] };
const wireVinGndB: SchematicElement  = { type: "wire", id: "w_vin_gnd_b",  points: [{ x: 330, y: 230 }, { x: 330, y: 250 }] };
const wireMinusFb: SchematicElement  = { type: "wire", id: "w_minus_fb_b", points: [{ x: 440, y: 128 }, { x: 410, y: 128 }, { x: 410, y: 70 }] };
const wireFbRf: SchematicElement     = { type: "wire", id: "w_fb_rf_b",    points: [{ x: 410, y: 70 }, { x: 440, y: 70 }] };
const wireR1Fb: SchematicElement     = { type: "wire", id: "w_r1_fb",      points: [{ x: 400, y: 70 }, { x: 410, y: 70 }] };
const wireR1Gnd: SchematicElement    = { type: "wire", id: "w_r1_gnd",     points: [{ x: 340, y: 70 }, { x: 340, y: 90 }] };
const wireRfOutB: SchematicElement   = { type: "wire", id: "w_rf_out_b",   points: [{ x: 500, y: 70 }, { x: 530, y: 70 }, { x: 530, y: 140 }] };
const wireOutB: SchematicElement     = { type: "wire", id: "w_out_b",      points: [{ x: 510, y: 140 }, { x: 544, y: 140 }] };
const juncMinusB: SchematicElement   = { type: "junction", id: "j_minus_b", x: 410, y: 70 };
const juncOutB: SchematicElement     = { type: "junction", id: "j_out_b",   x: 530, y: 140 };

const nonInverting = (probe: string, highlight?: boolean): SchematicElement[] => [
  { type: "op-amp", id: "U2", x: 470, y: 140, label: "U2", highlight },
  { type: "acsource", id: "VIN2", x: 330, y: 200, label: "Vin", value: "+0.5 V", highlight },
  { ...wireVinPlus, highlight }, { ...wireVinGndB, highlight },
  { type: "ground", id: "GND_B_IN", x: 330, y: 250 },
  { type: "resistor", id: "R1", x: 370, y: 70, label: "R1", value: "10 kΩ", highlight },
  { ...wireR1Fb, highlight }, { ...wireR1Gnd, highlight },
  { type: "ground", id: "GND_B_R1", x: 340, y: 90 },
  { ...wireMinusFb, highlight }, { ...wireFbRf, highlight }, juncMinusB,
  { type: "resistor", id: "RF2", x: 470, y: 70, label: "Rf", value: "100 kΩ", highlight },
  { ...wireRfOutB, highlight }, juncOutB, { ...wireOutB, highlight },
  { type: "probe", id: "pr_out_b", x: 550, y: 140, label: probe, highlight },
];
const titleB = (text: string): SchematicElement => ({ type: "label", id: "lbl_b", x: 450, y: 30, text });

// ── Bench supply and output DMM ───────────────────────────────
const dualSupply = (highlight?: boolean): SchematicElement[] => [
  { type: "vsource", id: "VCC_P", x: 300, y: 110, label: "+VCC", value: "12 V", highlight },
  { type: "vsource", id: "VCC_N", x: 300, y: 170, label: "−VCC", value: "12 V", highlight },
  { type: "junction", id: "j_mid", x: 300, y: 140 },
  { type: "wire", id: "w_mid_gnd", points: [{ x: 300, y: 140 }, { x: 340, y: 140 }, { x: 340, y: 150 }] },
  { type: "ground", id: "GND_PSU", x: 340, y: 150 },
  { type: "junction", id: "t_pos", x: 300, y: 80 },
  { type: "junction", id: "t_neg", x: 300, y: 200 },
  { type: "label", id: "lbl_pos", x: 326, y: 83, text: "+12 V" },
  { type: "label", id: "lbl_neg", x: 326, y: 203, text: "−12 V" },
];

/** Step 1: Place breadboard + dual supply */
export const step01: SchematicData = { width: W, height: H, elements: [
  ...dualSupply(true),
  { type: "label", id: "lbl_psu", x: 310, y: 250, text: "Dual ±12 V supply for op-amp" },
]};

/** Step 2: Connect DMM for output measurement */
export const step02: SchematicData = { width: W, height: H, elements: [
  ...dualSupply(),
  { type: "voltmeter", id: "DMM", x: 470, y: 160, label: "Vout", highlight: true },
  { type: "wire", id: "w_dmm_in", points: [{ x: 470, y: 136 }, { x: 470, y: 110 }], highlight: true },
  { type: "junction", id: "t_dmm_in", x: 470, y: 110 },
  { type: "wire", id: "w_dmm_gnd", points: [{ x: 470, y: 184 }, { x: 470, y: 210 }], highlight: true },
  { type: "ground", id: "GND_DMM", x: 470, y: 210 },
  { type: "label", id: "lbl_dmm", x: 470, y: 250, text: "DMM (DC V) — COM to ground" },
]};

/** Step 3: Phase A — Assemble inverting amplifier */
export const step03: SchematicData = { width: W, height: H, elements: [
  titleA("Phase A: INVERTING"),
  ...inverting("LM741", "Vout", true),
]};

/** Step 4: Phase A — Measure inverting gain */
export const step04: SchematicData = { width: W, height: H, elements: [
  titleA("Phase A: Av = −Rf/Rin = −10"),
  ...inverting("LM741", "Vout = −4.97 V"),
  vin1("+0.5 V", true),
  { ...wireVinRin, highlight: true },
  { ...wireVinGnd, highlight: true }, juncGnd,
  { type: "label", id: "lbl_inv", x: 150, y: 285, text: "180° phase inversion" },
]};

/** Step 5: Phase B — Assemble non-inverting amplifier */
export const step05: SchematicData = { width: W, height: H, elements: [
  titleA("Phase A: INVERTING"),
  ...inverting("U1", "Vout"),
  vin1("+0.5 V"), wireVinRin, wireVinGnd, juncGnd,
  // Phase B — NEW
  titleB("Phase B: NON-INVERTING"),
  ...nonInverting("Vout", true),
]};

/** Step 6: Phase B — Measure non-inverting gain and compare */
export const step06: SchematicData = { width: W, height: H, elements: [
  titleA("INVERTING: Av = −10"),
  ...inverting("U1", "−4.97 V"),
  vin1("+0.5 V"), wireVinRin, wireVinGnd, juncGnd,
  titleB("NON-INV: Av = 1+Rf/R1 = +11"),
  ...nonInverting("+5.48 V"),
  { type: "label", id: "lbl_compare", x: 310, y: 285, text: "Compare: Inverting inverts phase, Non-Inverting preserves" },
]};

/** Indexed array */
export const opampCircuitsStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06,
];

/** Theory diagram */
export const opampCircuitsTheoryDiagram: SchematicData = step06;
