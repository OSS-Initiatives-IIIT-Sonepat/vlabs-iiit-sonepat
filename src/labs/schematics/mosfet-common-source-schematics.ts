import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

/*
 * MOSFET Common Source Amplifier — progressive 2D schematics.
 *
 * Circuit topology:
 *   VDD ── RD ── D─┐           ┌── Cout ── RL ── Vout
 *                  │ M1        │
 *   VGG ── RG ── G─┤           C
 *                  │           │
 *   GND ───────── S─┴──────────┘
 *
 *   Cin couples AC input to gate
 */

const W = 380;
const H = 300;

// Positions
const M1 = { x: 180, y: 150 };
const RD = { x: 220, y: 70 };
const RG = { x: 80, y: 150 };
const RL = { x: 320, y: 150 };
const VDD = { x: 280, y: 30 };
const VGG = { x: 40, y: 100 };
const CIN = { x: 40, y: 150 };
const COUT = { x: 280, y: 100 };
const GND = { x: 180, y: 270 };
const VIN = { x: 40, y: 220 };

// Wires
const wireVddTop: SchematicElement = {
  type: "wire",
  id: "w_vdd_top",
  points: [
    { x: 220, y: 30 },
    { x: 280, y: 30 },
  ],
};
const wireRdUp: SchematicElement = {
  type: "wire",
  id: "w_rd_up",
  points: [
    { x: 220, y: 40 },
    { x: 220, y: 30 },
  ],
};
const wireRdDrain: SchematicElement = {
  type: "wire",
  id: "w_rd_drain",
  points: [
    { x: 220, y: 100 },
    { x: 220, y: 120 },
    { x: 190, y: 120 },
  ],
};
const wireVggRg: SchematicElement = {
  type: "wire",
  id: "w_vgg_rg",
  points: [
    { x: 40, y: 130 },
    { x: 40, y: 150 },
    { x: 50, y: 150 },
  ],
};
const wireRgGate: SchematicElement = {
  type: "wire",
  id: "w_rg_gate",
  points: [
    { x: 110, y: 150 },
    { x: 156, y: 150 },
  ],
};
const wireVggGnd: SchematicElement = {
  type: "wire",
  id: "w_vgg_gnd",
  points: [
    { x: 40, y: 70 },
    { x: 40, y: 50 },
    { x: 180, y: 50 },
    { x: 180, y: 30 },
  ],
};
const wireSrcGnd: SchematicElement = {
  type: "wire",
  id: "w_src_gnd",
  points: [
    { x: 190, y: 180 },
    { x: 190, y: 270 },
    { x: 180, y: 270 },
  ],
};
const wireVddGnd: SchematicElement = {
  type: "wire",
  id: "w_vdd_gnd",
  points: [
    { x: 280, y: 60 },
    { x: 280, y: 270 },
    { x: 180, y: 270 },
  ],
};
const wireCoutD: SchematicElement = {
  type: "wire",
  id: "w_cout_d",
  points: [
    { x: 220, y: 100 },
    { x: 260, y: 100 },
  ],
};
const wireCoutRl: SchematicElement = {
  type: "wire",
  id: "w_cout_rl",
  points: [
    { x: 300, y: 100 },
    { x: 320, y: 100 },
    { x: 320, y: 120 },
  ],
};
const wireRlGnd: SchematicElement = {
  type: "wire",
  id: "w_rl_gnd",
  points: [
    { x: 320, y: 180 },
    { x: 320, y: 270 },
    { x: 180, y: 270 },
  ],
};
const wireCinIn: SchematicElement = {
  type: "wire",
  id: "w_cin_in",
  points: [
    { x: 60, y: 150 },
    { x: 80, y: 150 },
  ],
};
const wireVinCin: SchematicElement = {
  type: "wire",
  id: "w_vin_cin",
  points: [
    { x: 40, y: 190 },
    { x: 40, y: 170 },
  ],
};
const wireVinGnd: SchematicElement = {
  type: "wire",
  id: "w_vin_gnd",
  points: [
    { x: 40, y: 250 },
    { x: 40, y: 270 },
    { x: 180, y: 270 },
  ],
};
const juncD: SchematicElement = { type: "junction", id: "j_d", x: 220, y: 100 };
const juncGate: SchematicElement = {
  type: "junction",
  id: "j_gate",
  x: 80,
  y: 150,
};
const juncGnd: SchematicElement = {
  type: "junction",
  id: "j_gnd",
  x: 180,
  y: 270,
};

/** Step 1: Place breadboard + power supplies */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 90,
      label: "VDD",
      value: "10 V",
      highlight: true,
    },
    wireVddTop,
    wireVddGnd,
    { type: "ground", id: "GND", ...GND },
  ],
};

/** Step 2: Insert MOSFET */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 90,
      label: "VDD",
      value: "10 V",
    },
    wireVddTop,
    wireVddGnd,
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    // NEW
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000", highlight: true },
    { ...wireSrcGnd, highlight: true },
  ],
};

/** Step 3: Ground connections */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 90,
      label: "VDD",
      value: "10 V",
    },
    wireVddTop,
    wireVddGnd,
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    {
      type: "label",
      id: "lbl_gnd",
      x: 180,
      y: 290,
      text: "Source to ground (common)",
    },
  ],
};

/** Step 4: Add drain resistor RD + ammeter */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 90,
      label: "VDD",
      value: "10 V",
    },
    wireVddTop,
    wireVddGnd,
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    // NEW
    wireRdUp,
    {
      type: "resistor",
      id: "RD",
      ...RD,
      rotation: 90,
      label: "RD",
      value: "1 kΩ",
      highlight: true,
    },
    { ...wireRdDrain, highlight: true },
    {
      type: "ammeter",
      id: "AM_D",
      x: 250,
      y: 110,
      rotation: 90,
      label: "ID",
      highlight: true,
    },
  ],
};

/** Step 5: Gate bias (VGG through RG) */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 90,
      label: "VDD",
      value: "10 V",
    },
    wireVddTop,
    wireVddGnd,
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    wireRdUp,
    {
      type: "resistor",
      id: "RD",
      ...RD,
      rotation: 90,
      label: "RD",
      value: "1 kΩ",
    },
    wireRdDrain,
    // NEW
    {
      type: "vsource",
      id: "VGG",
      ...VGG,
      label: "VGG",
      value: "0-5 V",
      highlight: true,
    },
    { ...wireVggRg, highlight: true },
    {
      type: "resistor",
      id: "RG",
      ...RG,
      label: "RG",
      value: "100 kΩ",
      highlight: true,
    },
    { ...wireRgGate, highlight: true },
    wireVggGnd,
  ],
};

/** Step 6: Add voltmeters VGS and VDS */
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 90,
      label: "VDD",
      value: "10 V",
    },
    wireVddTop,
    wireVddGnd,
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    wireRdUp,
    {
      type: "resistor",
      id: "RD",
      ...RD,
      rotation: 90,
      label: "RD",
      value: "1 kΩ",
    },
    wireRdDrain,
    { type: "vsource", id: "VGG", ...VGG, label: "VGG", value: "3 V" },
    wireVggRg,
    { type: "resistor", id: "RG", ...RG, label: "RG", value: "100 kΩ" },
    wireRgGate,
    wireVggGnd,
    // NEW — probes
    {
      type: "probe",
      id: "pr_vgs",
      x: 140,
      y: 170,
      label: "VGS",
      highlight: true,
    },
    {
      type: "probe",
      id: "pr_vds",
      x: 200,
      y: 135,
      label: "VDS",
      highlight: true,
    },
  ],
};

/** Step 7: DC operating point */
export const step07: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 90,
      label: "VDD",
      value: "10 V",
    },
    wireVddTop,
    wireVddGnd,
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    wireRdUp,
    {
      type: "resistor",
      id: "RD",
      ...RD,
      rotation: 90,
      label: "RD",
      value: "1 kΩ",
    },
    wireRdDrain,
    {
      type: "vsource",
      id: "VGG",
      ...VGG,
      label: "VGG",
      value: "3 V",
      highlight: true,
    },
    wireVggRg,
    { type: "resistor", id: "RG", ...RG, label: "RG", value: "100 kΩ" },
    wireRgGate,
    wireVggGnd,
    { type: "probe", id: "pr_vgs", x: 140, y: 170, label: "VGS=3V" },
    { type: "probe", id: "pr_vds", x: 200, y: 135, label: "VDS≈6V" },
    {
      type: "label",
      id: "lbl_qpt",
      x: 190,
      y: 290,
      text: "Q-point: ID ≈ 4 mA, VDS ≈ 6 V",
    },
  ],
};

/** Step 8: Vary VGS, observe ID */
export const step08: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 90,
      label: "VDD",
      value: "10 V",
    },
    wireVddTop,
    wireVddGnd,
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    wireRdUp,
    {
      type: "resistor",
      id: "RD",
      ...RD,
      rotation: 90,
      label: "RD",
      value: "1 kΩ",
    },
    wireRdDrain,
    {
      type: "vsource",
      id: "VGG",
      ...VGG,
      label: "VGG",
      value: "sweep",
      highlight: true,
    },
    wireVggRg,
    { type: "resistor", id: "RG", ...RG, label: "RG", value: "100 kΩ" },
    wireRgGate,
    wireVggGnd,
    { type: "probe", id: "pr_vgs", x: 140, y: 170, label: "VGS" },
    {
      type: "ammeter",
      id: "AM_D",
      x: 250,
      y: 110,
      rotation: 90,
      label: "ID",
      highlight: true,
    },
    {
      type: "label",
      id: "lbl_sweep",
      x: 190,
      y: 290,
      text: "Sweep VGS 2→5 V, record ID",
    },
  ],
};

/** Step 9: Apply AC input (coupling capacitors) */
export const step09: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 90,
      label: "VDD",
      value: "10 V",
    },
    wireVddTop,
    wireVddGnd,
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    wireRdUp,
    {
      type: "resistor",
      id: "RD",
      ...RD,
      rotation: 90,
      label: "RD",
      value: "1 kΩ",
    },
    wireRdDrain,
    { type: "vsource", id: "VGG", ...VGG, label: "VGG", value: "3 V" },
    wireVggRg,
    { type: "resistor", id: "RG", ...RG, label: "RG", value: "100 kΩ" },
    wireRgGate,
    wireVggGnd,
    juncGate,
    juncD,
    // NEW — AC input
    {
      type: "capacitor",
      id: "CIN",
      ...CIN,
      label: "Cin",
      value: "1 µF",
      highlight: true,
    },
    { ...wireCinIn, highlight: true },
    {
      type: "acsource",
      id: "VIN",
      ...VIN,
      label: "Vin",
      value: "100 mVpp",
      highlight: true,
    },
    { ...wireVinCin, highlight: true },
    { ...wireVinGnd, highlight: true },
    // Output coupling
    { ...wireCoutD, highlight: true },
    {
      type: "capacitor",
      id: "COUT",
      ...COUT,
      rotation: 90,
      label: "Cout",
      value: "1 µF",
      highlight: true,
    },
    { ...wireCoutRl, highlight: true },
    {
      type: "resistor",
      id: "RL",
      ...RL,
      rotation: 90,
      label: "RL",
      value: "10 kΩ",
      highlight: true,
    },
    { ...wireRlGnd, highlight: true },
  ],
};

/** Step 10: Observe output — voltage gain and phase */
export const step10: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 90,
      label: "VDD",
      value: "10 V",
    },
    wireVddTop,
    wireVddGnd,
    { type: "ground", id: "GND", ...GND },
    juncGnd,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    wireRdUp,
    {
      type: "resistor",
      id: "RD",
      ...RD,
      rotation: 90,
      label: "RD",
      value: "1 kΩ",
    },
    wireRdDrain,
    { type: "vsource", id: "VGG", ...VGG, label: "VGG", value: "3 V" },
    wireVggRg,
    { type: "resistor", id: "RG", ...RG, label: "RG", value: "100 kΩ" },
    wireRgGate,
    wireVggGnd,
    juncGate,
    juncD,
    { type: "capacitor", id: "CIN", ...CIN, label: "Cin", value: "1 µF" },
    wireCinIn,
    { type: "acsource", id: "VIN", ...VIN, label: "Vin", value: "100 mVpp" },
    wireVinCin,
    wireVinGnd,
    wireCoutD,
    {
      type: "capacitor",
      id: "COUT",
      ...COUT,
      rotation: 90,
      label: "Cout",
      value: "1 µF",
    },
    wireCoutRl,
    {
      type: "resistor",
      id: "RL",
      ...RL,
      rotation: 90,
      label: "RL",
      value: "10 kΩ",
    },
    wireRlGnd,
    // Probes
    { type: "probe", id: "pr_in", x: 40, y: 180, label: "Ch1" },
    {
      type: "probe",
      id: "pr_out",
      x: 350,
      y: 130,
      label: "Ch2 (Vout)",
      highlight: true,
    },
    {
      type: "label",
      id: "lbl_gain",
      x: 190,
      y: 290,
      text: "Av ≈ −8, 180° phase shift",
    },
  ],
};

/** Indexed array */
export const mosfetCommonSourceStepSchematics: SchematicData[] = [
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
];

/** Theory diagram */
export const mosfetCommonSourceTheoryDiagram: SchematicData = step10;
