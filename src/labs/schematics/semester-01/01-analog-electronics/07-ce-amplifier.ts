import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Common Emitter BJT Amplifier — progressive 2D schematics.
 *
 * Circuit topology (voltage-divider bias):
 *
 *        ┌──────────┬────────────────────────────┐ +VCC
 *        R1         RC                            │
 *        │          ├──── Cout ── Vout            VCC
 *  Vin─Cin─┤ B ─── Q1                             │
 *        R2         ├────────┐                    │
 *        │          RE       CE                   │
 *        └──────────┴──GND───┴────────────────────┘
 *
 *   Cin couples the input signal to the base.
 *   CE (bypass cap) shorts RE at AC for max gain.
 */

const W = 420;
const H = 330;

// ── Symbols ───────────────────────────────────────────────────
const vcc = (highlight?: boolean): SchematicElement =>
  ({ type: "vsource", id: "VCC", x: 400, y: 165, label: "VCC", value: "12 V", highlight });
const r1 = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "R1", x: 120, y: 90, rotation: 90, label: "R1", value: "100 kΩ", highlight });
const r2 = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "R2", x: 120, y: 220, rotation: 90, label: "R2", value: "10 kΩ", highlight });
const rc = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "RC", x: 220, y: 80, rotation: 90, label: "RC", value: "4.7 kΩ", highlight });
const re = (highlight?: boolean): SchematicElement =>
  ({ type: "resistor", id: "RE", x: 220, y: 240, rotation: 90, label: "RE", value: "1 kΩ", highlight });
const q1 = (highlight?: boolean): SchematicElement =>
  ({ type: "npn-bjt", id: "Q1", x: 200, y: 160, label: "BC547", highlight });
const cin = (highlight?: boolean): SchematicElement =>
  ({ type: "capacitor", id: "CIN", x: 90, y: 160, label: "Cin", value: "10 µF", highlight });
const vin = (highlight?: boolean): SchematicElement =>
  ({ type: "acsource", id: "VIN", x: 50, y: 220, label: "Vin", value: "10 mVpp", highlight });
const cout = (highlight?: boolean): SchematicElement =>
  ({ type: "capacitor", id: "COUT", x: 310, y: 120, label: "Cout", value: "10 µF", highlight });
const ce = (highlight?: boolean): SchematicElement =>
  ({ type: "capacitor", id: "CE", x: 320, y: 240, rotation: 90, label: "CE", value: "100 µF", highlight });
const gnd: SchematicElement = { type: "ground", id: "GND", x: 270, y: 290 };

// ── Wires ─────────────────────────────────────────────────────
// +VCC rail: R1 top → VCC (+)
const wireVccRail: SchematicElement = { type: "wire", id: "w_vcc_rail", points: [{ x: 120, y: 60 }, { x: 120, y: 40 }, { x: 400, y: 40 }, { x: 400, y: 135 }] };
// Ground rail: R2 bottom → VCC (−)
const wireGndRail: SchematicElement = { type: "wire", id: "w_gnd_rail", points: [{ x: 120, y: 250 }, { x: 120, y: 290 }, { x: 400, y: 290 }, { x: 400, y: 195 }] };
// Divider: R1 bottom → R2 top (base node at y=160)
const wireR1R2: SchematicElement = { type: "wire", id: "w_r1_r2", points: [{ x: 120, y: 120 }, { x: 120, y: 190 }] };
const wireBase: SchematicElement = { type: "wire", id: "w_base", points: [{ x: 120, y: 160 }, { x: 180, y: 160 }] };
const wireRcTop: SchematicElement = { type: "wire", id: "w_rc_top", points: [{ x: 220, y: 50 }, { x: 220, y: 40 }] };
const wireCol: SchematicElement = { type: "wire", id: "w_col", points: [{ x: 220, y: 110 }, { x: 220, y: 130 }] };
const wireEm: SchematicElement = { type: "wire", id: "w_em", points: [{ x: 220, y: 190 }, { x: 220, y: 210 }] };
const wireReBot: SchematicElement = { type: "wire", id: "w_re_bot", points: [{ x: 220, y: 270 }, { x: 220, y: 290 }] };
// Input: Vin → Cin → base node
const wireVinCin: SchematicElement = { type: "wire", id: "w_vin_cin", points: [{ x: 50, y: 190 }, { x: 50, y: 160 }, { x: 70, y: 160 }] };
const wireCinBase: SchematicElement = { type: "wire", id: "w_cin_base", points: [{ x: 110, y: 160 }, { x: 120, y: 160 }] };
const wireVinGnd: SchematicElement = { type: "wire", id: "w_vin_gnd", points: [{ x: 50, y: 250 }, { x: 50, y: 290 }, { x: 120, y: 290 }] };
// Output: collector → Cout → Vout
const wireColCout: SchematicElement = { type: "wire", id: "w_col_cout", points: [{ x: 220, y: 120 }, { x: 290, y: 120 }] };
const wireCoutOut: SchematicElement = { type: "wire", id: "w_cout_out", points: [{ x: 330, y: 120 }, { x: 354, y: 120 }] };
// Bypass: emitter → CE → ground
const wireEmCe: SchematicElement = { type: "wire", id: "w_em_ce", points: [{ x: 220, y: 200 }, { x: 320, y: 200 }, { x: 320, y: 220 }] };
const wireCeGnd: SchematicElement = { type: "wire", id: "w_ce_gnd", points: [{ x: 320, y: 260 }, { x: 320, y: 290 }] };

// ── Junctions ─────────────────────────────────────────────────
const juncBase: SchematicElement  = { type: "junction", id: "j_base",  x: 120, y: 160 };
const juncGnd: SchematicElement   = { type: "junction", id: "j_gnd",   x: 270, y: 290 };
const juncRcTop: SchematicElement = { type: "junction", id: "j_rc_top", x: 220, y: 40 };
const juncReBot: SchematicElement = { type: "junction", id: "j_re_bot", x: 220, y: 290 };
const juncCol: SchematicElement   = { type: "junction", id: "j_col",   x: 220, y: 120 };
const juncEm: SchematicElement    = { type: "junction", id: "j_em",    x: 220, y: 200 };
const juncVin: SchematicElement   = { type: "junction", id: "j_vin",   x: 120, y: 290 };
const juncCe: SchematicElement    = { type: "junction", id: "j_ce",    x: 320, y: 290 };

// Bias network shared by every step.
const bias = (highlight?: boolean): SchematicElement[] => [
  vcc(highlight), wireVccRail, wireGndRail, r1(highlight), wireR1R2, r2(highlight), gnd, juncGnd,
];
// Transistor stage (step 2 onwards).
const stage = (highlight?: boolean): SchematicElement[] => [
  wireBase, juncBase, q1(highlight),
  wireRcTop, juncRcTop, rc(highlight), wireCol,
  wireEm, re(highlight), wireReBot, juncReBot,
];

/** Step 1: Calculate the DC Q-point — show circuit topology with values */
export const step01: SchematicData = { width: W, height: H, elements: [
  ...bias(true),
  { type: "label", id: "lbl_vb", x: 160, y: 156, text: "VB ≈ 1.09 V" },
  { type: "label", id: "lbl_calc", x: 210, y: 324, text: "Q-point: IC ≈ 0.39 mA, VCE ≈ 9.78 V" },
]};

/** Step 2: Assemble the CE amplifier circuit — add transistor + load resistors */
export const step02: SchematicData = { width: W, height: H, elements: [
  ...bias(),
  ...stage(true),
]};

/** Step 3: Verify DC Q-point with DMM — add voltmeter probes */
export const step03: SchematicData = { width: W, height: H, elements: [
  ...bias(),
  ...stage(),
  juncCol,
  juncEm,
  // NEW — voltmeter probes
  { type: "junction", id: "j_pr_vb", x: 150, y: 160 },
  { type: "wire", id: "w_pr_vb", points: [{ x: 150, y: 160 }, { x: 150, y: 146 }], highlight: true },
  { type: "probe", id: "pr_vb", x: 150, y: 140, label: "VB", highlight: true },
  { type: "wire", id: "w_pr_vc", points: [{ x: 220, y: 120 }, { x: 244, y: 120 }], highlight: true },
  { type: "probe", id: "pr_vc", x: 250, y: 120, label: "VC", highlight: true },
  { type: "wire", id: "w_pr_ve", points: [{ x: 220, y: 200 }, { x: 244, y: 200 }], highlight: true },
  { type: "probe", id: "pr_ve", x: 250, y: 200, label: "VE", highlight: true },
  { type: "label", id: "lbl_vce", x: 310, y: 165, text: "VCE = VC − VE" },
]};

/** Step 4: Apply signal and observe voltage gain — add coupling caps + AC source */
export const step04: SchematicData = { width: W, height: H, elements: [
  ...bias(),
  ...stage(),
  juncCol,
  // NEW — coupling capacitors + AC source
  vin(true),
  { ...wireVinCin, highlight: true },
  cin(true),
  { ...wireCinBase, highlight: true },
  wireVinGnd,
  juncVin,
  { ...wireColCout, highlight: true },
  cout(true),
  { ...wireCoutOut, highlight: true },
  { type: "probe", id: "pr_out", x: 360, y: 120, label: "Vout", highlight: true },
  { type: "label", id: "lbl_gain", x: 210, y: 324, text: "Av = Vout/Vin (180° phase shift)" },
]};

/** Step 5: Plot the frequency response — add bypass cap, show full circuit */
export const step05: SchematicData = { width: W, height: H, elements: [
  ...bias(),
  ...stage(),
  juncCol,
  vin(), wireVinCin, cin(), wireCinBase, wireVinGnd, juncVin,
  wireColCout, cout(), wireCoutOut,
  { type: "probe", id: "pr_out", x: 360, y: 120, label: "Vout" },
  // NEW — bypass capacitor across RE
  juncEm,
  { ...wireEmCe, highlight: true },
  ce(true),
  { ...wireCeGnd, highlight: true },
  juncCe,
  { type: "label", id: "lbl_freq", x: 210, y: 324, text: "Sweep 100 Hz → 100 kHz, plot Av(dB) vs f" },
]};

/** Indexed array for easy lookup */
export const ceAmplifierStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
];

/** Theory diagram — full CE amplifier circuit */
export const ceAmplifierTheoryDiagram: SchematicData = step05;
