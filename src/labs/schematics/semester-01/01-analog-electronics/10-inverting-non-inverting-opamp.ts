import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Inverting and Non-Inverting Op-Amp Circuits — progressive 2D schematics.
 *
 * Inverting (left):                    Non-Inverting (right):
 *          ┌──── Rf ────┐                 GND─R1─┬──── Rf ────┐
 *   Vin ─ Rin ─┴─(−)     │                       └─(−)         │
 *              ┌─(+) U1 ─┴── Vout       Vin ────────(+) U2 ────┴── Vout
 *             GND
 *
 * Op-amp pins at (x, y): − (x−30, y−12), + (x−30, y+12), out (x+40, y).
 */

const W = 620;
const H = 300;

// ── Inverting amplifier (left half) ───────────────────────────
// U1 at (180,140): − (150,128), + (150,152), out (220,140)
const U1     = { x: 180, y: 140 };
const RIN    = { x: 100, y: 128 };  // pins (70,128), (130,128)
const RF_INV = { x: 180, y: 70  };  // pins (150,70), (210,70)
const VIN_I  = { x: 50,  y: 190 };  // pins (50,160), (50,220)
const GND    = { x: 140, y: 250 };

const wireVinRin: SchematicElement    = { type: "wire", id: "w_vin_rin",     points: [{ x: 50, y: 160 }, { x: 50, y: 128 }, { x: 70, y: 128 }] };
const wireRinOp: SchematicElement     = { type: "wire", id: "w_rin_op",      points: [{ x: 130, y: 128 }, { x: 150, y: 128 }] };
const wireOpPlusGnd: SchematicElement = { type: "wire", id: "w_op_plus_gnd", points: [{ x: 150, y: 152 }, { x: 140, y: 152 }, { x: 140, y: 250 }] };
const wireRfTop: SchematicElement     = { type: "wire", id: "w_rf_top",      points: [{ x: 140, y: 128 }, { x: 140, y: 70 }, { x: 150, y: 70 }] };
const wireRfOut: SchematicElement     = { type: "wire", id: "w_rf_out",      points: [{ x: 210, y: 70 }, { x: 240, y: 70 }, { x: 240, y: 140 }] };
const wireOutI: SchematicElement      = { type: "wire", id: "w_out_i",       points: [{ x: 220, y: 140 }, { x: 254, y: 140 }] };
const wireVinGndI: SchematicElement   = { type: "wire", id: "w_vin_gnd_i",   points: [{ x: 50, y: 220 }, { x: 50, y: 250 }, { x: 140, y: 250 }] };
const juncInvMinus: SchematicElement  = { type: "junction", id: "j_inv_minus", x: 140, y: 128 };
const juncInvOut: SchematicElement    = { type: "junction", id: "j_inv_out",   x: 240, y: 140 };
const juncGnd: SchematicElement       = { type: "junction", id: "j_gnd",       x: 140, y: 250 };

const u1 = (label = "LM741", highlight?: boolean): SchematicElement => ({ type: "op-amp", id: "U1", ...U1, label, highlight });
const gnd: SchematicElement = { type: "ground", id: "GND", ...GND };
const rin = (highlight?: boolean): SchematicElement => ({ type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ", highlight });
const rfInv = (highlight?: boolean): SchematicElement => ({ type: "resistor", id: "RF_INV", ...RF_INV, label: "Rf", value: "100 kΩ", highlight });
const vinI = (value?: string, highlight?: boolean): SchematicElement => ({ type: "acsource", id: "VIN_I", ...VIN_I, label: "Vin", value, highlight });
const probeI = (label: string, highlight?: boolean): SchematicElement => ({ type: "probe", id: "pr_out_inv", x: 260, y: 140, label, highlight });
const titleI = (text: string): SchematicElement => ({ type: "label", id: "lbl_inv", x: 150, y: 30, text });

/** The finished inverting amplifier (feedback, input and output). */
const inverting = (opts: { u1Label?: string; vin?: string; probe?: string } = {}): SchematicElement[] => [
  u1(opts.u1Label ?? "U1"), gnd, wireOpPlusGnd, juncGnd,
  rin(), wireRinOp, juncInvMinus,
  wireRfTop, rfInv(), wireRfOut, juncInvOut,
  wireOutI, probeI(opts.probe ?? "Vout"),
  vinI(opts.vin), wireVinRin, wireVinGndI,
];

// ── Non-inverting amplifier (right half) ──────────────────────
// U2 at (470,140): − (440,128), + (440,152), out (510,140)
const U2     = { x: 470, y: 140 };
const R1_NI  = { x: 370, y: 70  };  // pins (340,70), (400,70)
const RF_NI  = { x: 470, y: 70  };  // pins (440,70), (500,70)
const VIN_NI = { x: 330, y: 200 };  // pins (330,170), (330,230)

const wireVinPlus: SchematicElement  = { type: "wire", id: "w_vin_plus",  points: [{ x: 330, y: 170 }, { x: 330, y: 152 }, { x: 440, y: 152 }] };
const wireVinGndNi: SchematicElement = { type: "wire", id: "w_vin_gnd_ni", points: [{ x: 330, y: 230 }, { x: 330, y: 250 }] };
const wireMinusFb: SchematicElement  = { type: "wire", id: "w_minus_fb",  points: [{ x: 440, y: 128 }, { x: 410, y: 128 }, { x: 410, y: 70 }] };
const wireFbRf: SchematicElement     = { type: "wire", id: "w_fb_rf",     points: [{ x: 410, y: 70 }, { x: 440, y: 70 }] };
const wireR1Fb: SchematicElement     = { type: "wire", id: "w_r1_fb",     points: [{ x: 400, y: 70 }, { x: 410, y: 70 }] };
const wireR1Gnd: SchematicElement    = { type: "wire", id: "w_r1_gnd",    points: [{ x: 340, y: 70 }, { x: 340, y: 90 }] };
const wireRfNiOut: SchematicElement  = { type: "wire", id: "w_rf_ni_out", points: [{ x: 500, y: 70 }, { x: 530, y: 70 }, { x: 530, y: 140 }] };
const wireOutNi: SchematicElement    = { type: "wire", id: "w_out_ni",    points: [{ x: 510, y: 140 }, { x: 544, y: 140 }] };
const juncNiMinus: SchematicElement  = { type: "junction", id: "j_ni_minus", x: 410, y: 70 };
const juncNiOut: SchematicElement    = { type: "junction", id: "j_ni_out",   x: 530, y: 140 };

const u2 = (highlight?: boolean): SchematicElement => ({ type: "op-amp", id: "U2", ...U2, label: "U2", highlight });
const vinNi = (highlight?: boolean): SchematicElement => ({ type: "acsource", id: "VIN_NI", ...VIN_NI, label: "Vin", value: "0.5 V", highlight });
const r1Ni = (highlight?: boolean): SchematicElement => ({ type: "resistor", id: "R1_NI", ...R1_NI, label: "R1", value: "10 kΩ", highlight });
const rfNi = (value = "100 kΩ", highlight?: boolean): SchematicElement => ({ type: "resistor", id: "RF_NI", ...RF_NI, label: "Rf", value, highlight });
const titleNi = (text: string): SchematicElement => ({ type: "label", id: "lbl_ni", x: 450, y: 30, text });
const gndNiIn: SchematicElement = { type: "ground", id: "GND_NI_IN", x: 330, y: 250 };
const gndNiR1: SchematicElement = { type: "ground", id: "GND_NI_R1", x: 340, y: 90 };

const niInput = [u2(), vinNi(), wireVinPlus, wireVinGndNi, gndNiIn];
const niR1 = [r1Ni(), wireR1Fb, wireR1Gnd, gndNiR1, wireMinusFb];
/** The finished non-inverting amplifier with output probe. */
const nonInverting = (rfValue?: string, probe = "Vout", highlight?: boolean): SchematicElement[] => [
  ...niInput, ...niR1,
  wireFbRf, juncNiMinus, rfNi(rfValue, highlight), wireRfNiOut, juncNiOut, wireOutNi,
  { type: "probe", id: "pr_out_ni", x: 550, y: 140, label: probe },
];

/** Step 1: LM741 pin identification */
export const step01: SchematicData = { width: W, height: H, elements: [
  u1("LM741", true),
  { type: "label", id: "lbl_pins", x: 180, y: 190, text: "Pin 2: V−  Pin 3: V+  Pin 6: Vout" },
  { type: "label", id: "lbl_pins2", x: 180, y: 210, text: "Pin 4: −VCC  Pin 7: +VCC" },
]};

/** Step 2: Dual supply setup */
export const step02: SchematicData = { width: W, height: H, elements: [
  u1(),
  { type: "vsource", id: "VCC_P", x: 300, y: 110, label: "+VCC", value: "12 V", highlight: true },
  { type: "vsource", id: "VCC_N", x: 300, y: 170, label: "−VCC", value: "12 V", highlight: true },
  { type: "junction", id: "j_mid", x: 300, y: 140 },
  { type: "wire", id: "w_mid_gnd", points: [{ x: 300, y: 140 }, { x: 340, y: 140 }, { x: 340, y: 150 }] },
  { type: "ground", id: "GND", x: 340, y: 150 },
  { type: "junction", id: "t_pos", x: 300, y: 80 },
  { type: "junction", id: "t_neg", x: 300, y: 200 },
  { type: "label", id: "lbl_pos", x: 326, y: 83, text: "+12 V" },
  { type: "label", id: "lbl_neg", x: 326, y: 203, text: "−12 V" },
  { type: "label", id: "lbl_dual", x: 300, y: 240, text: "Dual ±12 V supply" },
]};

/** Step 3: Inverting amplifier — Rin */
export const step03: SchematicData = { width: W, height: H, elements: [
  titleI("INVERTING"),
  u1(), gnd, wireOpPlusGnd,
  // NEW
  rin(true),
  { ...wireRinOp, highlight: true },
]};

/** Step 4: Inverting amplifier — Rf feedback */
export const step04: SchematicData = { width: W, height: H, elements: [
  titleI("INVERTING"),
  u1(), gnd, wireOpPlusGnd,
  rin(), wireRinOp, juncInvMinus,
  // NEW
  { ...wireRfTop, highlight: true },
  rfInv(true),
  { ...wireRfOut, highlight: true },
  juncInvOut,
  { ...wireOutI, highlight: true },
  probeI("Vout", true),
]};

/** Step 5: Inverting — add input source */
export const step05: SchematicData = { width: W, height: H, elements: [
  titleI("INVERTING"),
  u1(), gnd, wireOpPlusGnd, juncGnd,
  rin(), wireRinOp, juncInvMinus,
  wireRfTop, rfInv(), wireRfOut, juncInvOut, wireOutI, probeI("Vout"),
  // NEW
  vinI("0.5 Vpp", true),
  { ...wireVinRin, highlight: true },
  { ...wireVinGndI, highlight: true },
]};

/** Step 6: Inverting — measure gain */
export const step06: SchematicData = { width: W, height: H, elements: [
  titleI("INVERTING: Av = −Rf/Rin = −10"),
  u1(), gnd, wireOpPlusGnd, juncGnd,
  rin(), wireRinOp, juncInvMinus,
  wireRfTop, rfInv(), wireRfOut, juncInvOut, wireOutI,
  vinI("0.5 V"), wireVinRin, wireVinGndI,
  probeI("Vout = −5 V", true),
  { type: "label", id: "lbl_phase", x: 150, y: 285, text: "180° phase inversion" },
]};

/** Step 7: Inverting — observe saturation */
export const step07: SchematicData = { width: W, height: H, elements: [
  titleI("INVERTING — Saturation test"),
  u1(), gnd, wireOpPlusGnd, juncGnd,
  rin(), wireRinOp, juncInvMinus,
  wireRfTop, rfInv(), wireRfOut, juncInvOut, wireOutI,
  vinI("2 Vpp", true), wireVinRin, wireVinGndI,
  probeI("Clipped!"),
  { type: "label", id: "lbl_sat", x: 150, y: 285, text: "Output clips at ±10.5 V (rail)" },
]};

/** Step 8: Non-inverting — place op-amp + V+ connection */
export const step08: SchematicData = { width: W, height: H, elements: [
  titleI("INVERTING"),
  ...inverting(),
  // NEW — Non-inverting
  titleNi("NON-INVERTING"),
  u2(true),
  vinNi(true),
  { ...wireVinPlus, highlight: true },
  wireVinGndNi, gndNiIn,
]};

/** Step 9: Non-inverting — R1 to ground */
export const step09: SchematicData = { width: W, height: H, elements: [
  titleI("INVERTING"),
  ...inverting(),
  titleNi("NON-INVERTING"),
  ...niInput,
  // NEW
  r1Ni(true),
  { ...wireR1Fb, highlight: true },
  { ...wireR1Gnd, highlight: true },
  gndNiR1,
  { ...wireMinusFb, highlight: true },
]};

/** Step 10: Non-inverting — Rf feedback */
export const step10: SchematicData = { width: W, height: H, elements: [
  titleI("INVERTING"),
  ...inverting(),
  titleNi("NON-INVERTING"),
  ...niInput,
  ...niR1,
  // NEW
  { ...wireFbRf, highlight: true },
  juncNiMinus,
  rfNi("100 kΩ", true),
  { ...wireRfNiOut, highlight: true },
  juncNiOut,
  { ...wireOutNi, highlight: true },
  { type: "probe", id: "pr_out_ni", x: 550, y: 140, label: "Vout", highlight: true },
]};

/** Step 11: Non-inverting — measure gain */
export const step11: SchematicData = { width: W, height: H, elements: [
  titleI("INVERTING: Av = −10"),
  ...inverting(),
  titleNi("NON-INV: Av = 1+Rf/R1 = +11"),
  ...niInput,
  ...niR1,
  wireFbRf, juncNiMinus, rfNi(), wireRfNiOut, juncNiOut, wireOutNi,
  { type: "probe", id: "pr_out_ni", x: 550, y: 140, label: "Vout=+5.5V", highlight: true },
  { type: "label", id: "lbl_nophase", x: 450, y: 285, text: "No phase inversion" },
]};

/** Step 12: Vary Rf in non-inverting */
export const step12: SchematicData = { width: W, height: H, elements: [
  titleI("INVERTING"),
  ...inverting(),
  titleNi("NON-INVERTING"),
  ...nonInverting("vary", "Vout", true),
  { type: "label", id: "lbl_vary", x: 450, y: 285, text: "Rf = 47k, 100k, 220k → Av varies" },
]};

/** Step 13: Calculate error */
export const step13: SchematicData = { width: W, height: H, elements: [
  titleI("INVERTING: Av = −10"),
  ...inverting({ vin: "0.5 V", probe: "−4.97 V" }),
  titleNi("NON-INV: Av = +11"),
  ...nonInverting("100 kΩ", "+5.48 V"),
  { type: "label", id: "lbl_err", x: 310, y: 285, text: "Error% = |Measured − Ideal| / Ideal × 100" },
]};

/** Indexed array */
export const opampInvertingNonInvertingStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10, step11, step12, step13,
];

/** Theory diagram */
export const opampInvertingNonInvertingTheoryDiagram: SchematicData = step13;
