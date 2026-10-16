import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

/*
 * MOSFET Drain and Transfer Characteristics — progressive 2D schematics.
 *
 * Circuit topology:
 *   VDD ── RD ── D─┐
 *                  │ M1 (n-MOSFET)
 *   VGS ───────── G─┤
 *                  │
 *   GND ───────── S─┘
 *
 *   DMMs: VGS, VDS, ID (via voltage across RD)
 */

const W = 340;
const H = 280;

// Positions
const M1 = { x: 180, y: 140 };
const RD = { x: 220, y: 60 };
const VDD = { x: 280, y: 60 };
const VGS = { x: 60, y: 140 };
const DMM_ID = { x: 280, y: 140 };
const DMM_VDS = { x: 220, y: 200 };
const DMM_VGS = { x: 100, y: 200 };
const GND = { x: 180, y: 260 };

// Wires
const wireVddRd: SchematicElement = {
  type: "wire",
  id: "w_vdd_rd",
  points: [
    { x: 280, y: 30 },
    { x: 280, y: 60 },
    { x: 250, y: 60 },
  ],
};
const wireRdDrain: SchematicElement = {
  type: "wire",
  id: "w_rd_drain",
  points: [
    { x: 190, y: 60 },
    { x: 190, y: 110 },
  ],
};
const wireVgsGate: SchematicElement = {
  type: "wire",
  id: "w_vgs_gate",
  points: [
    { x: 60, y: 110 },
    { x: 60, y: 140 },
    { x: 156, y: 140 },
  ],
};
const wireVgsGnd: SchematicElement = {
  type: "wire",
  id: "w_vgs_gnd",
  points: [
    { x: 60, y: 170 },
    { x: 60, y: 260 },
    { x: 180, y: 260 },
  ],
};
const wireSrcGnd: SchematicElement = {
  type: "wire",
  id: "w_src_gnd",
  points: [
    { x: 190, y: 170 },
    { x: 190, y: 260 },
    { x: 180, y: 260 },
  ],
};
const wireDmmIdTop: SchematicElement = {
  type: "wire",
  id: "w_dmm_id_top",
  points: [
    { x: 220, y: 60 },
    { x: 280, y: 60 },
    { x: 280, y: 116 },
  ],
};
const wireDmmIdBot: SchematicElement = {
  type: "wire",
  id: "w_dmm_id_bot",
  points: [
    { x: 280, y: 164 },
    { x: 280, y: 260 },
    { x: 180, y: 260 },
  ],
};
const wireDmmVdsD: SchematicElement = {
  type: "wire",
  id: "w_dmm_vds_d",
  points: [
    { x: 190, y: 110 },
    { x: 220, y: 110 },
    { x: 220, y: 176 },
  ],
};
const wireDmmVdsS: SchematicElement = {
  type: "wire",
  id: "w_dmm_vds_s",
  points: [
    { x: 220, y: 224 },
    { x: 220, y: 260 },
  ],
};
const wireDmmVgsG: SchematicElement = {
  type: "wire",
  id: "w_dmm_vgs_g",
  points: [
    { x: 100, y: 140 },
    { x: 100, y: 176 },
  ],
};
const wireDmmVgsS: SchematicElement = {
  type: "wire",
  id: "w_dmm_vgs_s",
  points: [
    { x: 100, y: 224 },
    { x: 100, y: 260 },
  ],
};
const juncDrain: SchematicElement = {
  type: "junction",
  id: "j_drain",
  x: 220,
  y: 60,
};
const juncD2: SchematicElement = {
  type: "junction",
  id: "j_d2",
  x: 190,
  y: 110,
};
const juncGate: SchematicElement = {
  type: "junction",
  id: "j_gate",
  x: 100,
  y: 140,
};
const juncGnd: SchematicElement = {
  type: "junction",
  id: "j_gnd",
  x: 180,
  y: 260,
};
const juncGnd2: SchematicElement = {
  type: "junction",
  id: "j_gnd2",
  x: 220,
  y: 260,
};

/** Step 1: Place breadboard */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 170,
      y: 30,
      text: "N-channel Enhancement MOSFET",
    },
    { type: "ground", id: "GND", ...GND },
  ],
};

/** Step 2: Connect drain supply VDD */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 180,
      label: "VDD",
      value: "0-15 V",
      highlight: true,
    },
    { ...wireVddRd, highlight: true },
    { type: "ground", id: "GND", ...GND },
    {
      type: "wire",
      id: "w_vdd_gnd",
      points: [
        { x: 280, y: 90 },
        { x: 280, y: 260 },
        { x: 180, y: 260 },
      ],
    },
  ],
};

/** Step 3: Add drain resistor RD and MOSFET */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 180,
      label: "VDD",
      value: "0-15 V",
    },
    wireVddRd,
    { type: "ground", id: "GND", ...GND },
    // NEW
    {
      type: "resistor",
      id: "RD",
      ...RD,
      label: "RD",
      value: "100 Ω",
      highlight: true,
    },
    { ...wireRdDrain, highlight: true },
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000", highlight: true },
    wireSrcGnd,
    juncGnd,
  ],
};

/** Step 4: Connect gate supply VGS */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 180,
      label: "VDD",
      value: "0-15 V",
    },
    wireVddRd,
    { type: "ground", id: "GND", ...GND },
    { type: "resistor", id: "RD", ...RD, label: "RD", value: "100 Ω" },
    wireRdDrain,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    juncGnd,
    // NEW
    {
      type: "vsource",
      id: "VGS",
      ...VGS,
      label: "VGS",
      value: "0-5 V",
      highlight: true,
    },
    { ...wireVgsGate, highlight: true },
    { ...wireVgsGnd, highlight: true },
  ],
};

/** Step 5: Complete drain wiring */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 180,
      label: "VDD",
      value: "0-15 V",
    },
    wireVddRd,
    { type: "ground", id: "GND", ...GND },
    { type: "resistor", id: "RD", ...RD, label: "RD", value: "100 Ω" },
    wireRdDrain,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    juncGnd,
    { type: "vsource", id: "VGS", ...VGS, label: "VGS", value: "0-5 V" },
    wireVgsGate,
    wireVgsGnd,
    juncDrain,
    juncD2,
    { type: "label", id: "lbl_drain", x: 240, y: 90, text: "ID = VRD/RD" },
  ],
};

/** Step 6: Gate wiring complete */
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 180,
      label: "VDD",
      value: "0-15 V",
    },
    wireVddRd,
    { type: "ground", id: "GND", ...GND },
    { type: "resistor", id: "RD", ...RD, label: "RD", value: "100 Ω" },
    wireRdDrain,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    juncGnd,
    { type: "vsource", id: "VGS", ...VGS, label: "VGS", value: "0-5 V" },
    wireVgsGate,
    wireVgsGnd,
    juncDrain,
    juncD2,
    juncGate,
  ],
};

/** Step 7: Connect multimeters */
export const step07: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 180,
      label: "VDD",
      value: "0-15 V",
    },
    wireVddRd,
    { type: "ground", id: "GND", ...GND },
    { type: "resistor", id: "RD", ...RD, label: "RD", value: "100 Ω" },
    wireRdDrain,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    juncGnd,
    { type: "vsource", id: "VGS", ...VGS, label: "VGS", value: "0-5 V" },
    wireVgsGate,
    wireVgsGnd,
    juncDrain,
    juncD2,
    juncGate,
    juncGnd2,
    // DMMs
    { ...wireDmmIdTop, highlight: true },
    {
      type: "voltmeter",
      id: "DMM_ID",
      ...DMM_ID,
      label: "VRD→ID",
      highlight: true,
    },
    { ...wireDmmIdBot, highlight: true },
    { ...wireDmmVdsD, highlight: true },
    {
      type: "voltmeter",
      id: "DMM_VDS",
      ...DMM_VDS,
      label: "VDS",
      highlight: true,
    },
    { ...wireDmmVdsS, highlight: true },
    { ...wireDmmVgsG, highlight: true },
    {
      type: "voltmeter",
      id: "DMM_VGS",
      ...DMM_VGS,
      label: "VGS",
      highlight: true,
    },
    { ...wireDmmVgsS, highlight: true },
  ],
};

/** Step 8: Check cut-off (VGS = 0) */
export const step08: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 180,
      label: "VDD",
      value: "10 V",
    },
    wireVddRd,
    { type: "ground", id: "GND", ...GND },
    { type: "resistor", id: "RD", ...RD, label: "RD", value: "100 Ω" },
    wireRdDrain,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    juncGnd,
    {
      type: "vsource",
      id: "VGS",
      ...VGS,
      label: "VGS",
      value: "0 V",
      highlight: true,
    },
    wireVgsGate,
    wireVgsGnd,
    juncDrain,
    juncD2,
    juncGate,
    juncGnd2,
    wireDmmIdTop,
    { type: "voltmeter", id: "DMM_ID", ...DMM_ID, label: "ID ≈ 0" },
    wireDmmIdBot,
    wireDmmVdsD,
    { type: "voltmeter", id: "DMM_VDS", ...DMM_VDS, label: "VDS ≈ VDD" },
    wireDmmVdsS,
    wireDmmVgsG,
    { type: "voltmeter", id: "DMM_VGS", ...DMM_VGS, label: "VGS = 0" },
    wireDmmVgsS,
    {
      type: "label",
      id: "lbl_cutoff",
      x: 170,
      y: 270,
      text: "Cut-off: VGS < Vth → ID ≈ 0",
    },
  ],
};

/** Step 9: Drain (output) characteristics */
export const step09: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 180,
      label: "VDD",
      value: "sweep",
      highlight: true,
    },
    wireVddRd,
    { type: "ground", id: "GND", ...GND },
    { type: "resistor", id: "RD", ...RD, label: "RD", value: "100 Ω" },
    wireRdDrain,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    juncGnd,
    { type: "vsource", id: "VGS", ...VGS, label: "VGS", value: "3,4,5 V" },
    wireVgsGate,
    wireVgsGnd,
    juncDrain,
    juncD2,
    juncGate,
    juncGnd2,
    wireDmmIdTop,
    {
      type: "voltmeter",
      id: "DMM_ID",
      ...DMM_ID,
      label: "ID",
      highlight: true,
    },
    wireDmmIdBot,
    wireDmmVdsD,
    {
      type: "voltmeter",
      id: "DMM_VDS",
      ...DMM_VDS,
      label: "VDS",
      highlight: true,
    },
    wireDmmVdsS,
    wireDmmVgsG,
    { type: "voltmeter", id: "DMM_VGS", ...DMM_VGS, label: "VGS" },
    wireDmmVgsS,
    {
      type: "label",
      id: "lbl_drain_char",
      x: 170,
      y: 270,
      text: "Drain: ID vs VDS at const VGS",
    },
  ],
};

/** Step 10: Transfer characteristics */
export const step10: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "vsource",
      id: "VDD",
      ...VDD,
      rotation: 180,
      label: "VDD",
      value: "10 V",
    },
    wireVddRd,
    { type: "ground", id: "GND", ...GND },
    { type: "resistor", id: "RD", ...RD, label: "RD", value: "100 Ω" },
    wireRdDrain,
    { type: "n-mosfet", id: "M1", ...M1, label: "2N7000" },
    wireSrcGnd,
    juncGnd,
    {
      type: "vsource",
      id: "VGS",
      ...VGS,
      label: "VGS",
      value: "sweep",
      highlight: true,
    },
    wireVgsGate,
    wireVgsGnd,
    juncDrain,
    juncD2,
    juncGate,
    juncGnd2,
    wireDmmIdTop,
    {
      type: "voltmeter",
      id: "DMM_ID",
      ...DMM_ID,
      label: "ID",
      highlight: true,
    },
    wireDmmIdBot,
    wireDmmVdsD,
    { type: "voltmeter", id: "DMM_VDS", ...DMM_VDS, label: "VDS" },
    wireDmmVdsS,
    wireDmmVgsG,
    {
      type: "voltmeter",
      id: "DMM_VGS",
      ...DMM_VGS,
      label: "VGS",
      highlight: true,
    },
    wireDmmVgsS,
    {
      type: "label",
      id: "lbl_transfer",
      x: 170,
      y: 270,
      text: "Transfer: ID vs VGS → find Vth, gm",
    },
  ],
};

/** Indexed array */
export const mosfetCharacteristicsStepSchematics: SchematicData[] = [
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
export const mosfetCharacteristicsTheoryDiagram: SchematicData = step10;
