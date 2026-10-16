import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

/*
 * Inverting and Non-Inverting Op-Amp Circuits — progressive 2D schematics.
 *
 * Inverting (left):
 *   Vin ── Rin ──┬──(−)─┐
 *                │      │ U1 (LM741)
 *                Rf     (+)── GND
 *                │      │
 *                └──────┴── Vout
 *
 * Non-Inverting (right):
 *   Vin ────────(+)─┐
 *                   │ U2 (LM741)
 *   GND ── R1 ──(−)─┤
 *                │  │
 *                Rf ┴── Vout
 */

const W = 440;
const H = 280;

// Inverting circuit positions (left)
const U1 = { x: 160, y: 120 };
const RIN = { x: 60, y: 108 };
const RF_INV = { x: 160, y: 50 };
const VIN_I = { x: 20, y: 160 };

// Non-inverting circuit positions (right)
const U2 = { x: 360, y: 120 };
const R1_NI = { x: 300, y: 180 };
const RF_NI = { x: 360, y: 50 };
const VIN_NI = { x: 260, y: 120 };

const GND = { x: 220, y: 250 };

// Inverting wires
const wireVinRin: SchematicElement = {
  type: "wire",
  id: "w_vin_rin",
  points: [
    { x: 20, y: 130 },
    { x: 20, y: 108 },
    { x: 30, y: 108 },
  ],
};
const wireRinOp: SchematicElement = {
  type: "wire",
  id: "w_rin_op",
  points: [
    { x: 90, y: 108 },
    { x: 130, y: 108 },
  ],
};
const wireOpPlusGnd: SchematicElement = {
  type: "wire",
  id: "w_op_plus_gnd",
  points: [
    { x: 130, y: 132 },
    { x: 110, y: 132 },
    { x: 110, y: 250 },
    { x: 220, y: 250 },
  ],
};
const wireRfTop: SchematicElement = {
  type: "wire",
  id: "w_rf_top",
  points: [
    { x: 110, y: 108 },
    { x: 110, y: 50 },
    { x: 130, y: 50 },
  ],
};
const wireRfOut: SchematicElement = {
  type: "wire",
  id: "w_rf_out",
  points: [
    { x: 190, y: 50 },
    { x: 220, y: 50 },
    { x: 220, y: 120 },
    { x: 200, y: 120 },
  ],
};
const wireVinGndI: SchematicElement = {
  type: "wire",
  id: "w_vin_gnd_i",
  points: [
    { x: 20, y: 190 },
    { x: 20, y: 250 },
    { x: 110, y: 250 },
  ],
};
const juncInvMinus: SchematicElement = {
  type: "junction",
  id: "j_inv_minus",
  x: 110,
  y: 108,
};
const juncInvOut: SchematicElement = {
  type: "junction",
  id: "j_inv_out",
  x: 220,
  y: 120,
};

// Non-inverting wires
const wireVinPlus: SchematicElement = {
  type: "wire",
  id: "w_vin_plus",
  points: [
    { x: 260, y: 132 },
    { x: 280, y: 132 },
    { x: 330, y: 132 },
  ],
};
const wireR1Gnd: SchematicElement = {
  type: "wire",
  id: "w_r1_gnd",
  points: [
    { x: 270, y: 180 },
    { x: 260, y: 180 },
    { x: 260, y: 250 },
    { x: 220, y: 250 },
  ],
};
const wireR1Op: SchematicElement = {
  type: "wire",
  id: "w_r1_op",
  points: [
    { x: 330, y: 180 },
    { x: 340, y: 180 },
    { x: 340, y: 108 },
    { x: 330, y: 108 },
  ],
};
const wireRfNiTop: SchematicElement = {
  type: "wire",
  id: "w_rf_ni_top",
  points: [
    { x: 340, y: 108 },
    { x: 340, y: 50 },
    { x: 330, y: 50 },
  ],
};
const wireRfNiOut: SchematicElement = {
  type: "wire",
  id: "w_rf_ni_out",
  points: [
    { x: 390, y: 50 },
    { x: 420, y: 50 },
    { x: 420, y: 120 },
    { x: 400, y: 120 },
  ],
};
const juncNiMinus: SchematicElement = {
  type: "junction",
  id: "j_ni_minus",
  x: 340,
  y: 108,
};
const juncNiOut: SchematicElement = {
  type: "junction",
  id: "j_ni_out",
  x: 420,
  y: 120,
};
const juncGnd: SchematicElement = {
  type: "junction",
  id: "j_gnd",
  x: 220,
  y: 250,
};

/** Step 1: LM741 pin identification */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "op-amp", id: "U1", ...U1, label: "LM741", highlight: true },
    {
      type: "label",
      id: "lbl_pins",
      x: 160,
      y: 180,
      text: "Pin 2: V−  Pin 3: V+  Pin 6: Vout",
    },
    {
      type: "label",
      id: "lbl_pins2",
      x: 160,
      y: 200,
      text: "Pin 4: −VCC  Pin 7: +VCC",
    },
  ],
};

/** Step 2: Dual supply setup */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "op-amp", id: "U1", ...U1, label: "LM741" },
    {
      type: "vsource",
      id: "VCC_P",
      x: 200,
      y: 80,
      rotation: 90,
      label: "+VCC",
      value: "+12 V",
      highlight: true,
    },
    {
      type: "vsource",
      id: "VCC_N",
      x: 200,
      y: 160,
      rotation: 90,
      label: "−VCC",
      value: "−12 V",
      highlight: true,
    },
    { type: "ground", id: "GND", ...GND },
    {
      type: "label",
      id: "lbl_dual",
      x: 200,
      y: 220,
      text: "Dual ±12 V supply",
    },
  ],
};

/** Step 3: Inverting amplifier — Rin */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_inv", x: 120, y: 20, text: "INVERTING" },
    { type: "op-amp", id: "U1", ...U1, label: "LM741" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    wireOpPlusGnd,
    // NEW
    {
      type: "resistor",
      id: "RIN",
      ...RIN,
      label: "Rin",
      value: "10 kΩ",
      highlight: true,
    },
    { ...wireRinOp, highlight: true },
    juncInvMinus,
  ],
};

/** Step 4: Inverting amplifier — Rf feedback */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_inv", x: 120, y: 20, text: "INVERTING" },
    { type: "op-amp", id: "U1", ...U1, label: "LM741" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    wireOpPlusGnd,
    { type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ" },
    wireRinOp,
    juncInvMinus,
    // NEW
    { ...wireRfTop, highlight: true },
    {
      type: "resistor",
      id: "RF_INV",
      ...RF_INV,
      label: "Rf",
      value: "100 kΩ",
      highlight: true,
    },
    { ...wireRfOut, highlight: true },
    juncInvOut,
  ],
};

/** Step 5: Inverting — add input source */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_inv", x: 120, y: 20, text: "INVERTING" },
    { type: "op-amp", id: "U1", ...U1, label: "LM741" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    wireOpPlusGnd,
    { type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ" },
    wireRinOp,
    juncInvMinus,
    wireRfTop,
    { type: "resistor", id: "RF_INV", ...RF_INV, label: "Rf", value: "100 kΩ" },
    wireRfOut,
    juncInvOut,
    // NEW
    {
      type: "acsource",
      id: "VIN_I",
      ...VIN_I,
      label: "Vin",
      value: "0.5 Vpp",
      highlight: true,
    },
    { ...wireVinRin, highlight: true },
    { ...wireVinGndI, highlight: true },
  ],
};

/** Step 6: Inverting — measure gain */
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_inv",
      x: 120,
      y: 20,
      text: "INVERTING: Av = −Rf/Rin = −10",
    },
    { type: "op-amp", id: "U1", ...U1, label: "LM741" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    wireOpPlusGnd,
    { type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ" },
    wireRinOp,
    juncInvMinus,
    wireRfTop,
    { type: "resistor", id: "RF_INV", ...RF_INV, label: "Rf", value: "100 kΩ" },
    wireRfOut,
    juncInvOut,
    { type: "acsource", id: "VIN_I", ...VIN_I, label: "Vin", value: "0.5 V" },
    wireVinRin,
    wireVinGndI,
    {
      type: "probe",
      id: "pr_out_inv",
      x: 230,
      y: 120,
      label: "Vout = −5 V",
      highlight: true,
    },
    {
      type: "label",
      id: "lbl_phase",
      x: 160,
      y: 260,
      text: "180° phase inversion",
    },
  ],
};

/** Step 7: Inverting — observe saturation */
export const step07: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_inv",
      x: 120,
      y: 20,
      text: "INVERTING — Saturation test",
    },
    { type: "op-amp", id: "U1", ...U1, label: "LM741" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    wireOpPlusGnd,
    { type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ" },
    wireRinOp,
    juncInvMinus,
    wireRfTop,
    { type: "resistor", id: "RF_INV", ...RF_INV, label: "Rf", value: "100 kΩ" },
    wireRfOut,
    juncInvOut,
    {
      type: "acsource",
      id: "VIN_I",
      ...VIN_I,
      label: "Vin",
      value: "2 Vpp",
      highlight: true,
    },
    wireVinRin,
    wireVinGndI,
    { type: "probe", id: "pr_out_inv", x: 230, y: 120, label: "Clipped!" },
    {
      type: "label",
      id: "lbl_sat",
      x: 160,
      y: 260,
      text: "Output clips at ±10.5 V (rail)",
    },
  ],
};

/** Step 8: Non-inverting — place op-amp + V+ connection */
export const step08: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_inv", x: 120, y: 20, text: "INVERTING" },
    { type: "op-amp", id: "U1", ...U1, label: "U1" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    wireOpPlusGnd,
    { type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ" },
    wireRinOp,
    juncInvMinus,
    wireRfTop,
    { type: "resistor", id: "RF_INV", ...RF_INV, label: "Rf", value: "100 kΩ" },
    wireRfOut,
    juncInvOut,
    { type: "acsource", id: "VIN_I", ...VIN_I, label: "Vin" },
    wireVinRin,
    wireVinGndI,
    // NEW — Non-inverting
    { type: "label", id: "lbl_ni", x: 360, y: 20, text: "NON-INVERTING" },
    { type: "op-amp", id: "U2", ...U2, label: "U2", highlight: true },
    {
      type: "acsource",
      id: "VIN_NI",
      ...VIN_NI,
      label: "Vin",
      value: "0.5 V",
      highlight: true,
    },
    { ...wireVinPlus, highlight: true },
  ],
};

/** Step 9: Non-inverting — R1 to ground */
export const step09: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_inv", x: 120, y: 20, text: "INVERTING" },
    { type: "op-amp", id: "U1", ...U1, label: "U1" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    wireOpPlusGnd,
    { type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ" },
    wireRinOp,
    juncInvMinus,
    wireRfTop,
    { type: "resistor", id: "RF_INV", ...RF_INV, label: "Rf", value: "100 kΩ" },
    wireRfOut,
    juncInvOut,
    { type: "acsource", id: "VIN_I", ...VIN_I, label: "Vin" },
    wireVinRin,
    wireVinGndI,
    // Non-inverting
    { type: "label", id: "lbl_ni", x: 360, y: 20, text: "NON-INVERTING" },
    { type: "op-amp", id: "U2", ...U2, label: "U2" },
    { type: "acsource", id: "VIN_NI", ...VIN_NI, label: "Vin", value: "0.5 V" },
    wireVinPlus,
    // NEW
    {
      type: "resistor",
      id: "R1_NI",
      ...R1_NI,
      label: "R1",
      value: "10 kΩ",
      highlight: true,
    },
    { ...wireR1Gnd, highlight: true },
    { ...wireR1Op, highlight: true },
    juncNiMinus,
  ],
};

/** Step 10: Non-inverting — Rf feedback */
export const step10: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_inv", x: 120, y: 20, text: "INVERTING" },
    { type: "op-amp", id: "U1", ...U1, label: "U1" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    wireOpPlusGnd,
    { type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ" },
    wireRinOp,
    juncInvMinus,
    wireRfTop,
    { type: "resistor", id: "RF_INV", ...RF_INV, label: "Rf", value: "100 kΩ" },
    wireRfOut,
    juncInvOut,
    { type: "acsource", id: "VIN_I", ...VIN_I, label: "Vin" },
    wireVinRin,
    wireVinGndI,
    // Non-inverting
    { type: "label", id: "lbl_ni", x: 360, y: 20, text: "NON-INVERTING" },
    { type: "op-amp", id: "U2", ...U2, label: "U2" },
    { type: "acsource", id: "VIN_NI", ...VIN_NI, label: "Vin", value: "0.5 V" },
    wireVinPlus,
    { type: "resistor", id: "R1_NI", ...R1_NI, label: "R1", value: "10 kΩ" },
    wireR1Gnd,
    wireR1Op,
    juncNiMinus,
    // NEW
    { ...wireRfNiTop, highlight: true },
    {
      type: "resistor",
      id: "RF_NI",
      ...RF_NI,
      label: "Rf",
      value: "100 kΩ",
      highlight: true,
    },
    { ...wireRfNiOut, highlight: true },
    juncNiOut,
  ],
};

/** Step 11: Non-inverting — measure gain */
export const step11: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_inv",
      x: 100,
      y: 20,
      text: "INVERTING: Av = −10",
    },
    { type: "op-amp", id: "U1", ...U1, label: "U1" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    wireOpPlusGnd,
    { type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ" },
    wireRinOp,
    juncInvMinus,
    wireRfTop,
    { type: "resistor", id: "RF_INV", ...RF_INV, label: "Rf", value: "100 kΩ" },
    wireRfOut,
    juncInvOut,
    { type: "acsource", id: "VIN_I", ...VIN_I, label: "Vin" },
    wireVinRin,
    wireVinGndI,
    // Non-inverting
    {
      type: "label",
      id: "lbl_ni",
      x: 340,
      y: 20,
      text: "NON-INV: Av = 1+Rf/R1 = +11",
    },
    { type: "op-amp", id: "U2", ...U2, label: "U2" },
    { type: "acsource", id: "VIN_NI", ...VIN_NI, label: "Vin", value: "0.5 V" },
    wireVinPlus,
    { type: "resistor", id: "R1_NI", ...R1_NI, label: "R1", value: "10 kΩ" },
    wireR1Gnd,
    wireR1Op,
    juncNiMinus,
    wireRfNiTop,
    { type: "resistor", id: "RF_NI", ...RF_NI, label: "Rf", value: "100 kΩ" },
    wireRfNiOut,
    juncNiOut,
    {
      type: "probe",
      id: "pr_out_ni",
      x: 430,
      y: 120,
      label: "Vout=+5.5V",
      highlight: true,
    },
    {
      type: "label",
      id: "lbl_nophase",
      x: 360,
      y: 260,
      text: "No phase inversion",
    },
  ],
};

/** Step 12: Vary Rf in non-inverting */
export const step12: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_inv", x: 100, y: 20, text: "INVERTING" },
    { type: "op-amp", id: "U1", ...U1, label: "U1" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    wireOpPlusGnd,
    { type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ" },
    wireRinOp,
    juncInvMinus,
    wireRfTop,
    { type: "resistor", id: "RF_INV", ...RF_INV, label: "Rf", value: "100 kΩ" },
    wireRfOut,
    juncInvOut,
    { type: "acsource", id: "VIN_I", ...VIN_I, label: "Vin" },
    wireVinRin,
    wireVinGndI,
    // Non-inverting
    { type: "label", id: "lbl_ni", x: 360, y: 20, text: "NON-INVERTING" },
    { type: "op-amp", id: "U2", ...U2, label: "U2" },
    { type: "acsource", id: "VIN_NI", ...VIN_NI, label: "Vin", value: "0.5 V" },
    wireVinPlus,
    { type: "resistor", id: "R1_NI", ...R1_NI, label: "R1", value: "10 kΩ" },
    wireR1Gnd,
    wireR1Op,
    juncNiMinus,
    wireRfNiTop,
    {
      type: "resistor",
      id: "RF_NI",
      ...RF_NI,
      label: "Rf",
      value: "vary",
      highlight: true,
    },
    wireRfNiOut,
    juncNiOut,
    {
      type: "label",
      id: "lbl_vary",
      x: 360,
      y: 260,
      text: "Rf = 47k, 100k, 220k → Av varies",
    },
  ],
};

/** Step 13: Calculate error */
export const step13: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_inv",
      x: 100,
      y: 20,
      text: "INVERTING: Av = −10",
    },
    { type: "op-amp", id: "U1", ...U1, label: "U1" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    wireOpPlusGnd,
    { type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ" },
    wireRinOp,
    juncInvMinus,
    wireRfTop,
    { type: "resistor", id: "RF_INV", ...RF_INV, label: "Rf", value: "100 kΩ" },
    wireRfOut,
    juncInvOut,
    { type: "acsource", id: "VIN_I", ...VIN_I, label: "Vin", value: "0.5 V" },
    wireVinRin,
    wireVinGndI,
    { type: "probe", id: "pr_inv", x: 230, y: 120, label: "−4.97 V" },
    // Non-inverting
    { type: "label", id: "lbl_ni", x: 340, y: 20, text: "NON-INV: Av = +11" },
    { type: "op-amp", id: "U2", ...U2, label: "U2" },
    { type: "acsource", id: "VIN_NI", ...VIN_NI, label: "Vin", value: "0.5 V" },
    wireVinPlus,
    { type: "resistor", id: "R1_NI", ...R1_NI, label: "R1", value: "10 kΩ" },
    wireR1Gnd,
    wireR1Op,
    juncNiMinus,
    wireRfNiTop,
    { type: "resistor", id: "RF_NI", ...RF_NI, label: "Rf", value: "100 kΩ" },
    wireRfNiOut,
    juncNiOut,
    { type: "probe", id: "pr_ni", x: 430, y: 120, label: "+5.48 V" },
    {
      type: "label",
      id: "lbl_err",
      x: 220,
      y: 260,
      text: "Error% = |Measured − Ideal| / Ideal × 100",
    },
  ],
};

/** Indexed array */
export const opampInvertingNonInvertingStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
  step07,
  step08,
  step09,
  step10,
  step11,
  step12,
  step13,
];

/** Theory diagram */
export const opampInvertingNonInvertingTheoryDiagram: SchematicData = step13;
