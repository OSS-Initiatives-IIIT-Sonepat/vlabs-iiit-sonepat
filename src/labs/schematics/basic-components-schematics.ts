import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * Study of Basic Components — progressive 2D schematics
 * Shows various electronic components and their symbols
 */

const W = 400;
const H = 280;

/** Step 1: Breadboard layout */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "title", x: 200, y: 20, text: "Step 1: Breadboard" },
    {
      type: "label",
      id: "desc1",
      x: 200,
      y: 70,
      text: "Solderless prototyping board",
    },
    {
      type: "wire",
      id: "rail_pos",
      points: [
        { x: 40, y: 100 },
        { x: 360, y: 100 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "rail_neg",
      points: [
        { x: 40, y: 180 },
        { x: 360, y: 180 },
      ],
      highlight: true,
    },
    { type: "label", id: "lbl_vcc", x: 30, y: 100, text: "+" },
    { type: "label", id: "lbl_gnd", x: 30, y: 180, text: "-" },
    { type: "junction", id: "j1", x: 100, y: 140 },
    { type: "junction", id: "j2", x: 150, y: 140 },
    { type: "junction", id: "j3", x: 200, y: 140 },
    { type: "junction", id: "j4", x: 250, y: 140 },
    { type: "junction", id: "j5", x: 300, y: 140 },
    {
      type: "label",
      id: "desc2",
      x: 200,
      y: 230,
      text: "Top/bottom rails for power, middle for components",
    },
  ],
};

/** Step 2: Regulated power supply */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 2: DC Power Supply",
    },
    {
      type: "vsource",
      id: "vcc",
      x: 100,
      y: 140,
      label: "Vs",
      value: "0-30V",
      highlight: true,
    },
    {
      type: "wire",
      id: "w_pos",
      points: [
        { x: 100, y: 110 },
        { x: 100, y: 80 },
        { x: 300, y: 80 },
      ],
    },
    {
      type: "wire",
      id: "w_neg",
      points: [
        { x: 100, y: 170 },
        { x: 100, y: 200 },
        { x: 300, y: 200 },
      ],
    },
    { type: "ground", id: "gnd", x: 300, y: 220 },
    { type: "label", id: "lbl_red", x: 320, y: 80, text: "+ (Red)" },
    { type: "label", id: "lbl_blk", x: 320, y: 200, text: "- (Black)" },
    {
      type: "label",
      id: "desc",
      x: 200,
      y: 260,
      text: "Adjustable voltage, current-limited",
    },
  ],
};

/** Step 3: Passive components (R, C, L) */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 3: Passive Components",
    },
    { type: "resistor", id: "R1", x: 80, y: 100, label: "R", highlight: true },
    { type: "label", id: "lr", x: 80, y: 135, text: "Resistor" },
    {
      type: "capacitor",
      id: "C1",
      x: 200,
      y: 100,
      label: "C",
      highlight: true,
    },
    { type: "label", id: "lc", x: 200, y: 135, text: "Capacitor" },
    { type: "label", id: "ll_ind", x: 320, y: 100, text: "L (Inductor)" },
    {
      type: "label",
      id: "desc1",
      x: 200,
      y: 180,
      text: "R: V=IR, C: Q=CV, L: V=L(dI/dt)",
    },
    {
      type: "label",
      id: "desc2",
      x: 200,
      y: 210,
      text: "No power gain - cannot amplify",
    },
  ],
};

/** Step 4: Active components (Diode, Transistor) */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 4: Active Components",
    },
    { type: "diode", id: "D1", x: 80, y: 100, label: "D", highlight: true },
    { type: "label", id: "ld", x: 80, y: 135, text: "Diode" },
    { type: "npn-bjt", id: "Q1", x: 200, y: 100, label: "Q", highlight: true },
    { type: "label", id: "lq", x: 200, y: 155, text: "NPN BJT" },
    {
      type: "op-amp",
      id: "U1",
      x: 320,
      y: 100,
      label: "Op-Amp",
      highlight: true,
    },
    {
      type: "label",
      id: "desc",
      x: 200,
      y: 220,
      text: "Can amplify or control current",
    },
  ],
};

/** Step 5: LED circuit with current-limiting resistor */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "title", x: 200, y: 20, text: "Step 5: LED Circuit" },
    { type: "vsource", id: "vcc", x: 60, y: 140, label: "5V" },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 60, y: 110 },
        { x: 60, y: 80 },
        { x: 120, y: 80 },
      ],
    },
    {
      type: "resistor",
      id: "R1",
      x: 160,
      y: 80,
      label: "330Ω",
      highlight: true,
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 200, y: 80 },
        { x: 260, y: 80 },
      ],
    },
    { type: "led", id: "LED1", x: 300, y: 80, label: "LED", highlight: true },
    {
      type: "wire",
      id: "w3",
      points: [
        { x: 340, y: 80 },
        { x: 340, y: 200 },
        { x: 60, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w4",
      points: [
        { x: 60, y: 170 },
        { x: 60, y: 200 },
      ],
    },
    { type: "ground", id: "gnd", x: 200, y: 220 },
    {
      type: "label",
      id: "desc",
      x: 200,
      y: 260,
      text: "I = (5V - 2V) / 330Ω ≈ 9 mA",
    },
  ],
};

/** Step 6: Multimeter usage */
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "title", x: 200, y: 20, text: "Step 6: Multimeter" },
    { type: "vsource", id: "vcc", x: 60, y: 120, label: "Vs" },
    { type: "resistor", id: "R1", x: 180, y: 60, label: "R" },
    { type: "ammeter", id: "A1", x: 300, y: 60, label: "A", highlight: true },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 60, y: 90 },
        { x: 60, y: 60 },
        { x: 150, y: 60 },
      ],
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 210, y: 60 },
        { x: 276, y: 60 },
      ],
    },
    {
      type: "wire",
      id: "w3",
      points: [
        { x: 324, y: 60 },
        { x: 340, y: 60 },
        { x: 340, y: 180 },
        { x: 60, y: 180 },
      ],
    },
    {
      type: "wire",
      id: "w4",
      points: [
        { x: 60, y: 150 },
        { x: 60, y: 180 },
      ],
    },
    {
      type: "voltmeter",
      id: "V1",
      x: 180,
      y: 120,
      label: "V",
      highlight: true,
    },
    {
      type: "wire",
      id: "wv1",
      points: [
        { x: 150, y: 60 },
        { x: 150, y: 96 },
        { x: 156, y: 96 },
      ],
    },
    { type: "junction", id: "j1", x: 150, y: 60 },
    {
      type: "wire",
      id: "wv2",
      points: [
        { x: 204, y: 120 },
        { x: 240, y: 120 },
        { x: 240, y: 180 },
      ],
    },
    { type: "junction", id: "j2", x: 240, y: 180 },
    {
      type: "label",
      id: "desc1",
      x: 200,
      y: 220,
      text: "V: parallel, A: series",
    },
  ],
};

/** Step 7: Function generator */
export const step07: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 7: Function Generator",
    },
    {
      type: "acsource",
      id: "fg",
      x: 100,
      y: 140,
      label: "FG",
      highlight: true,
    },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 100, y: 110 },
        { x: 100, y: 80 },
        { x: 300, y: 80 },
      ],
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 100, y: 170 },
        { x: 100, y: 200 },
        { x: 300, y: 200 },
      ],
    },
    { type: "ground", id: "gnd", x: 300, y: 220 },
    { type: "label", id: "lbl_out", x: 320, y: 80, text: "OUTPUT" },
    { type: "label", id: "lbl_gnd", x: 320, y: 200, text: "GND" },
    {
      type: "label",
      id: "desc1",
      x: 200,
      y: 250,
      text: "Sine, Square, Triangle waves",
    },
    {
      type: "label",
      id: "desc2",
      x: 200,
      y: 270,
      text: "0.1 Hz - 1 MHz, 50Ω output",
    },
  ],
};

/** Step 8: Oscilloscope (CRO) */
export const step08: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 8: Oscilloscope (CRO)",
    },
    { type: "acsource", id: "fg", x: 60, y: 140, label: "FG" },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 60, y: 110 },
        { x: 60, y: 80 },
        { x: 160, y: 80 },
      ],
    },
    { type: "resistor", id: "R1", x: 200, y: 80, label: "R" },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 240, y: 80 },
        { x: 280, y: 80 },
      ],
    },
    { type: "capacitor", id: "C1", x: 280, y: 120, label: "C" },
    {
      type: "wire",
      id: "w3",
      points: [
        { x: 280, y: 160 },
        { x: 280, y: 200 },
        { x: 60, y: 200 },
      ],
    },
    {
      type: "wire",
      id: "w4",
      points: [
        { x: 60, y: 170 },
        { x: 60, y: 200 },
      ],
    },
    {
      type: "probe",
      id: "probe",
      x: 320,
      y: 120,
      label: "CH1",
      highlight: true,
    },
    {
      type: "wire",
      id: "wp",
      points: [
        { x: 280, y: 80 },
        { x: 280, y: 60 },
        { x: 320, y: 60 },
        { x: 320, y: 96 },
      ],
    },
    { type: "junction", id: "jp", x: 280, y: 80 },
    { type: "ground", id: "gnd", x: 180, y: 220 },
    {
      type: "label",
      id: "desc",
      x: 200,
      y: 260,
      text: "RC low-pass filter, fc ≈ 1.6 kHz",
    },
  ],
};

export const basicComponentsStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
  step07,
  step08,
];

export const basicComponentsTheoryDiagram: SchematicData = {
  width: 420,
  height: 300,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Basic Electronic Components",
    },
    // Row 1: Passive
    { type: "label", id: "l_passive", x: 70, y: 50, text: "Passive:" },
    { type: "resistor", id: "R1", x: 70, y: 90, label: "R" },
    { type: "capacitor", id: "C1", x: 150, y: 90, label: "C" },
    { type: "label", id: "l_ind", x: 230, y: 90, text: "L" },
    // Row 2: Active
    { type: "label", id: "l_active", x: 70, y: 140, text: "Active:" },
    { type: "diode", id: "D1", x: 70, y: 180, label: "D" },
    { type: "led", id: "LED1", x: 150, y: 180, label: "LED" },
    { type: "npn-bjt", id: "Q1", x: 230, y: 180, label: "NPN" },
    { type: "op-amp", id: "U1", x: 330, y: 180, label: "Op-Amp" },
    // Row 3: Sources & Meters
    { type: "label", id: "l_src", x: 70, y: 230, text: "Sources:" },
    { type: "vsource", id: "V1", x: 70, y: 260, label: "DC" },
    { type: "acsource", id: "AC1", x: 150, y: 260, label: "AC" },
    { type: "ammeter", id: "A1", x: 250, y: 260, label: "A" },
    { type: "voltmeter", id: "VM1", x: 330, y: 260, label: "V" },
  ],
};
