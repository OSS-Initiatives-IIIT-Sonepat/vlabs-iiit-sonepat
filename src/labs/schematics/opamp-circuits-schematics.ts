import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

/*
 * Op-Amp Circuits (Inverting and Non-Inverting Amplifiers) — progressive 2D schematics.
 *
 * Phase A: Inverting Amplifier (Av = -Rf/Rin = -10)
 * Phase B: Non-Inverting Amplifier (Av = 1 + Rf/R1 = +11)
 */

const W = 400;
const H = 280;

// Positions
const U1 = { x: 160, y: 130 };
const RIN = { x: 60, y: 118 };
const RF1 = { x: 160, y: 60 };
const VIN1 = { x: 20, y: 170 };

const U2 = { x: 320, y: 130 };
const R1 = { x: 260, y: 180 };
const RF2 = { x: 320, y: 60 };
const VIN2 = { x: 230, y: 142 };

const GND = { x: 190, y: 250 };

// Phase A wires
const wireVinRin: SchematicElement = {
  type: "wire",
  id: "w_vin_rin_a",
  points: [
    { x: 20, y: 140 },
    { x: 20, y: 118 },
    { x: 30, y: 118 },
  ],
};
const wireRinOp: SchematicElement = {
  type: "wire",
  id: "w_rin_op",
  points: [
    { x: 90, y: 118 },
    { x: 130, y: 118 },
  ],
};
const wireOpPlusGnd: SchematicElement = {
  type: "wire",
  id: "w_op_plus_gnd",
  points: [
    { x: 130, y: 142 },
    { x: 110, y: 142 },
    { x: 110, y: 250 },
    { x: 190, y: 250 },
  ],
};
const wireRfTop: SchematicElement = {
  type: "wire",
  id: "w_rf_top_a",
  points: [
    { x: 110, y: 118 },
    { x: 110, y: 60 },
    { x: 130, y: 60 },
  ],
};
const wireRfOut: SchematicElement = {
  type: "wire",
  id: "w_rf_out_a",
  points: [
    { x: 190, y: 60 },
    { x: 210, y: 60 },
    { x: 210, y: 130 },
    { x: 200, y: 130 },
  ],
};
const wireVinGnd: SchematicElement = {
  type: "wire",
  id: "w_vin_gnd_a",
  points: [
    { x: 20, y: 200 },
    { x: 20, y: 250 },
    { x: 110, y: 250 },
  ],
};
const juncMinusA: SchematicElement = {
  type: "junction",
  id: "j_minus_a",
  x: 110,
  y: 118,
};
const juncOutA: SchematicElement = {
  type: "junction",
  id: "j_out_a",
  x: 210,
  y: 130,
};

// Phase B wires
const wireVinPlus: SchematicElement = {
  type: "wire",
  id: "w_vin_plus_b",
  points: [
    { x: 230, y: 142 },
    { x: 290, y: 142 },
  ],
};
const wireR1Gnd: SchematicElement = {
  type: "wire",
  id: "w_r1_gnd",
  points: [
    { x: 230, y: 180 },
    { x: 220, y: 180 },
    { x: 220, y: 250 },
    { x: 190, y: 250 },
  ],
};
const wireR1Op: SchematicElement = {
  type: "wire",
  id: "w_r1_op",
  points: [
    { x: 290, y: 180 },
    { x: 300, y: 180 },
    { x: 300, y: 118 },
    { x: 290, y: 118 },
  ],
};
const wireRfTopB: SchematicElement = {
  type: "wire",
  id: "w_rf_top_b",
  points: [
    { x: 300, y: 118 },
    { x: 300, y: 60 },
    { x: 290, y: 60 },
  ],
};
const wireRfOutB: SchematicElement = {
  type: "wire",
  id: "w_rf_out_b",
  points: [
    { x: 350, y: 60 },
    { x: 370, y: 60 },
    { x: 370, y: 130 },
    { x: 360, y: 130 },
  ],
};
const juncMinusB: SchematicElement = {
  type: "junction",
  id: "j_minus_b",
  x: 300,
  y: 118,
};
const juncOutB: SchematicElement = {
  type: "junction",
  id: "j_out_b",
  x: 370,
  y: 130,
};
const juncGnd: SchematicElement = {
  type: "junction",
  id: "j_gnd",
  x: 190,
  y: 250,
};

/** Step 1: Place breadboard + dual supply */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "ground", id: "GND", ...GND },
    {
      type: "vsource",
      id: "VCC",
      x: 190,
      y: 30,
      rotation: 90,
      label: "±12 V",
      value: "dual",
      highlight: true,
    },
    {
      type: "label",
      id: "lbl_psu",
      x: 200,
      y: 270,
      text: "Dual ±12 V supply for op-amp",
    },
  ],
};

/** Step 2: Connect DMM for output measurement */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "ground", id: "GND", ...GND },
    {
      type: "vsource",
      id: "VCC",
      x: 190,
      y: 30,
      rotation: 90,
      label: "±12 V",
      value: "dual",
    },
    {
      type: "voltmeter",
      id: "DMM",
      x: 370,
      y: 200,
      label: "Vout",
      highlight: true,
    },
    {
      type: "wire",
      id: "w_dmm_gnd",
      points: [
        { x: 370, y: 224 },
        { x: 370, y: 250 },
        { x: 190, y: 250 },
      ],
    },
  ],
};

/** Step 3: Phase A — Assemble inverting amplifier */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_a", x: 140, y: 20, text: "Phase A: INVERTING" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    // Inverting amplifier
    { type: "op-amp", id: "U1", ...U1, label: "LM741", highlight: true },
    wireOpPlusGnd,
    {
      type: "resistor",
      id: "RIN",
      ...RIN,
      label: "Rin",
      value: "10 kΩ",
      highlight: true,
    },
    { ...wireRinOp, highlight: true },
    juncMinusA,
    { ...wireRfTop, highlight: true },
    {
      type: "resistor",
      id: "RF1",
      ...RF1,
      label: "Rf",
      value: "100 kΩ",
      highlight: true,
    },
    { ...wireRfOut, highlight: true },
    juncOutA,
  ],
};

/** Step 4: Phase A — Measure inverting gain */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_a",
      x: 140,
      y: 20,
      text: "Phase A: Av = −Rf/Rin = −10",
    },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    { type: "op-amp", id: "U1", ...U1, label: "LM741" },
    wireOpPlusGnd,
    { type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ" },
    wireRinOp,
    juncMinusA,
    wireRfTop,
    { type: "resistor", id: "RF1", ...RF1, label: "Rf", value: "100 kΩ" },
    wireRfOut,
    juncOutA,
    // Input
    {
      type: "acsource",
      id: "VIN1",
      ...VIN1,
      label: "Vin",
      value: "+0.5 V",
      highlight: true,
    },
    { ...wireVinRin, highlight: true },
    { ...wireVinGnd, highlight: true },
    // Output probe
    {
      type: "probe",
      id: "pr_out_a",
      x: 220,
      y: 130,
      label: "Vout = −4.97 V",
      highlight: true,
    },
    {
      type: "label",
      id: "lbl_inv",
      x: 140,
      y: 265,
      text: "180° phase inversion",
    },
  ],
};

/** Step 5: Phase B — Assemble non-inverting amplifier */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_a", x: 100, y: 20, text: "Phase A: INVERTING" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    { type: "op-amp", id: "U1", ...U1, label: "U1" },
    wireOpPlusGnd,
    { type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ" },
    wireRinOp,
    juncMinusA,
    wireRfTop,
    { type: "resistor", id: "RF1", ...RF1, label: "Rf", value: "100 kΩ" },
    wireRfOut,
    juncOutA,
    { type: "acsource", id: "VIN1", ...VIN1, label: "Vin" },
    wireVinRin,
    wireVinGnd,
    // Phase B — NEW
    {
      type: "label",
      id: "lbl_b",
      x: 320,
      y: 20,
      text: "Phase B: NON-INVERTING",
    },
    { type: "op-amp", id: "U2", ...U2, label: "U2", highlight: true },
    {
      type: "acsource",
      id: "VIN2",
      ...VIN2,
      label: "Vin",
      value: "+0.5 V",
      highlight: true,
    },
    { ...wireVinPlus, highlight: true },
    {
      type: "resistor",
      id: "R1",
      ...R1,
      label: "R1",
      value: "10 kΩ",
      highlight: true,
    },
    { ...wireR1Gnd, highlight: true },
    { ...wireR1Op, highlight: true },
    juncMinusB,
    { ...wireRfTopB, highlight: true },
    {
      type: "resistor",
      id: "RF2",
      ...RF2,
      label: "Rf",
      value: "100 kΩ",
      highlight: true,
    },
    { ...wireRfOutB, highlight: true },
    juncOutB,
  ],
};

/** Step 6: Phase B — Measure non-inverting gain and compare */
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_a", x: 100, y: 20, text: "INVERTING: Av = −10" },
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    { type: "op-amp", id: "U1", ...U1, label: "U1" },
    wireOpPlusGnd,
    { type: "resistor", id: "RIN", ...RIN, label: "Rin", value: "10 kΩ" },
    wireRinOp,
    juncMinusA,
    wireRfTop,
    { type: "resistor", id: "RF1", ...RF1, label: "Rf", value: "100 kΩ" },
    wireRfOut,
    juncOutA,
    { type: "acsource", id: "VIN1", ...VIN1, label: "Vin", value: "+0.5 V" },
    wireVinRin,
    wireVinGnd,
    { type: "probe", id: "pr_out_a", x: 220, y: 130, label: "−4.97 V" },
    // Phase B
    {
      type: "label",
      id: "lbl_b",
      x: 310,
      y: 20,
      text: "NON-INV: Av = 1+Rf/R1 = +11",
    },
    { type: "op-amp", id: "U2", ...U2, label: "U2" },
    { type: "acsource", id: "VIN2", ...VIN2, label: "Vin", value: "+0.5 V" },
    wireVinPlus,
    { type: "resistor", id: "R1", ...R1, label: "R1", value: "10 kΩ" },
    wireR1Gnd,
    wireR1Op,
    juncMinusB,
    wireRfTopB,
    { type: "resistor", id: "RF2", ...RF2, label: "Rf", value: "100 kΩ" },
    wireRfOutB,
    juncOutB,
    {
      type: "probe",
      id: "pr_out_b",
      x: 380,
      y: 130,
      label: "+5.48 V",
      highlight: true,
    },
    {
      type: "label",
      id: "lbl_compare",
      x: 200,
      y: 265,
      text: "Compare: Inverting inverts phase, Non-Inverting preserves",
    },
  ],
};

/** Indexed array */
export const opampCircuitsStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
];

/** Theory diagram */
export const opampCircuitsTheoryDiagram: SchematicData = step06;
