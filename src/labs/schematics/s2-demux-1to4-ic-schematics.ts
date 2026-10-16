import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * S2 1:4 DEMUX using 74HC139 IC
 * Active-low outputs: Y0'=EN'·A'·B', etc.
 */

const W = 420;
const H = 300;

/** Step 1: Breadboard */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 1: Breadboard Setup",
    },
    { type: "vsource", id: "vcc", x: 60, y: 100, label: "+5V" },
    { type: "ground", id: "gnd", x: 60, y: 180 },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 60, y: 80 },
        { x: 360, y: 80 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "w2",
      points: [
        { x: 60, y: 180 },
        { x: 360, y: 180 },
      ],
      highlight: true,
    },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 260,
      text: "1:4 DEMUX: 1 input → 4 outputs",
    },
  ],
};

/** Step 2: Mount 74HC139 IC */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 2: Mount 74HC139",
    },
    { type: "label", id: "ic", x: 210, y: 80, text: "74HC139" },
    {
      type: "label",
      id: "desc1",
      x: 210,
      y: 110,
      text: "Dual 2-to-4 decoder/demux",
    },
    {
      type: "label",
      id: "pins1",
      x: 210,
      y: 150,
      text: "Section 1: EN=Pin1, A=Pin2, B=Pin3",
    },
    {
      type: "label",
      id: "pins2",
      x: 210,
      y: 180,
      text: "Outputs: Y0=Pin4, Y1=Pin5, Y2=Pin6, Y3=Pin7",
    },
    { type: "label", id: "note", x: 210, y: 220, text: "Active-LOW outputs!" },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 270,
      text: "DIP-16: Vcc=Pin16, GND=Pin8",
    },
  ],
};

/** Step 3: Tie EN_bar to GND */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "title", x: 210, y: 20, text: "Step 3: Enable Pin" },
    { type: "label", id: "pin", x: 100, y: 100, text: "1EN (Pin 1)" },
    {
      type: "wire",
      id: "wen",
      points: [
        { x: 170, y: 100 },
        { x: 280, y: 100 },
      ],
      highlight: true,
    },
    { type: "ground", id: "gnd", x: 300, y: 100 },
    { type: "label", id: "note1", x: 210, y: 160, text: "1EN is active-LOW" },
    {
      type: "label",
      id: "note2",
      x: 210,
      y: 190,
      text: "GND = enabled, always active",
    },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 260,
      text: "For data DEMUX, use EN as data input instead",
    },
  ],
};

/** Step 4: Wire select inputs A, B */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 4: Select Inputs A, B",
    },
    { type: "label", id: "la", x: 50, y: 100, text: "A (Pin 2)" },
    { type: "label", id: "lb", x: 50, y: 160, text: "B (Pin 3)" },
    {
      type: "wire",
      id: "wa",
      points: [
        { x: 120, y: 100 },
        { x: 350, y: 100 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "wb",
      points: [
        { x: 120, y: 160 },
        { x: 350, y: 160 },
      ],
      highlight: true,
    },
    { type: "label", id: "table", x: 210, y: 220, text: "B A | Active Output" },
    { type: "label", id: "r0", x: 210, y: 245, text: "0 0 |    Y0 LOW" },
    { type: "label", id: "r1", x: 210, y: 262, text: "0 1 |    Y1 LOW" },
    { type: "label", id: "r2", x: 210, y: 279, text: "1 0 |    Y2 LOW" },
    { type: "label", id: "r3", x: 210, y: 296, text: "1 1 |    Y3 LOW" },
  ],
};

/** Step 5: Wire outputs to LEDs */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "title", x: 210, y: 20, text: "Step 5: Output LEDs" },
    {
      type: "label",
      id: "note",
      x: 210,
      y: 55,
      text: "Active-LOW: LED ON when selected",
    },
    { type: "resistor", id: "r0", x: 80, y: 100, label: "330" },
    { type: "led", id: "led0", x: 80, y: 140, label: "Y0", highlight: true },
    { type: "resistor", id: "r1", x: 160, y: 100, label: "330" },
    { type: "led", id: "led1", x: 160, y: 140, label: "Y1", highlight: true },
    { type: "resistor", id: "r2", x: 240, y: 100, label: "330" },
    { type: "led", id: "led2", x: 240, y: 140, label: "Y2", highlight: true },
    { type: "resistor", id: "r3", x: 320, y: 100, label: "330" },
    { type: "led", id: "led3", x: 320, y: 140, label: "Y3", highlight: true },
    {
      type: "label",
      id: "wiring",
      x: 210,
      y: 200,
      text: "Wire: Vcc → 330Ω → LED → Yi",
    },
    {
      type: "label",
      id: "desc",
      x: 210,
      y: 260,
      text: "LED sinks current when Yi=LOW",
    },
  ],
};

/** Step 6: Test A=0, B=0 → Y0 active */
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 6: Test A=0, B=0",
    },
    {
      type: "label",
      id: "inputs",
      x: 210,
      y: 55,
      text: "Address = 00 → Y0 selected",
    },
    { type: "not-gate", id: "nota", x: 80, y: 100, label: "A'=1" },
    { type: "not-gate", id: "notb", x: 80, y: 160, label: "B'=1" },
    {
      type: "and-gate",
      id: "and0",
      x: 200,
      y: 130,
      label: "Y0'=0",
      highlight: true,
    },
    {
      type: "wire",
      id: "wa",
      points: [
        { x: 106, y: 100 },
        { x: 140, y: 100 },
        { x: 140, y: 122 },
        { x: 174, y: 122 },
      ],
    },
    {
      type: "wire",
      id: "wb",
      points: [
        { x: 106, y: 160 },
        { x: 140, y: 160 },
        { x: 140, y: 138 },
        { x: 174, y: 138 },
      ],
    },
    {
      type: "led",
      id: "led0",
      x: 300,
      y: 130,
      label: "Y0 ON",
      highlight: true,
    },
    {
      type: "label",
      id: "others",
      x: 210,
      y: 220,
      text: "Y1=Y2=Y3=HIGH (LEDs OFF)",
    },
  ],
};

/** Step 7: Test A=1, B=1 → Y3 active */
export const step07: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "Step 7: Test A=1, B=1",
    },
    {
      type: "label",
      id: "inputs",
      x: 210,
      y: 55,
      text: "Address = 11 → Y3 selected",
    },
    {
      type: "and-gate",
      id: "and3",
      x: 200,
      y: 130,
      label: "Y3'=0",
      highlight: true,
    },
    {
      type: "wire",
      id: "wa",
      points: [
        { x: 60, y: 122 },
        { x: 174, y: 122 },
      ],
    },
    {
      type: "wire",
      id: "wb",
      points: [
        { x: 60, y: 138 },
        { x: 174, y: 138 },
      ],
    },
    { type: "label", id: "la", x: 45, y: 122, text: "A=1" },
    { type: "label", id: "lb", x: 45, y: 138, text: "B=1" },
    {
      type: "led",
      id: "led3",
      x: 300,
      y: 130,
      label: "Y3 ON",
      highlight: true,
    },
    {
      type: "label",
      id: "others",
      x: 210,
      y: 220,
      text: "Y0=Y1=Y2=HIGH (LEDs OFF)",
    },
  ],
};

export const s2Demux1to4IcStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
  step07,
];

export const s2Demux1to4IcTheoryDiagram: SchematicData = {
  width: 420,
  height: 300,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "1:4 DEMUX / 2:4 Decoder",
    },
    // NOT gates
    { type: "not-gate", id: "nota", x: 80, y: 60, label: "A'" },
    { type: "not-gate", id: "notb", x: 80, y: 100, label: "B'" },
    // AND gates (active-low outputs shown as NAND behavior)
    { type: "and-gate", id: "and0", x: 220, y: 60, label: "Y0" },
    { type: "and-gate", id: "and1", x: 220, y: 110, label: "Y1" },
    { type: "and-gate", id: "and2", x: 220, y: 160, label: "Y2" },
    { type: "and-gate", id: "and3", x: 220, y: 210, label: "Y3" },
    // Input labels
    { type: "label", id: "la", x: 30, y: 60, text: "A" },
    { type: "label", id: "lb", x: 30, y: 100, text: "B" },
    // Wiring hints
    {
      type: "wire",
      id: "wa",
      points: [
        { x: 45, y: 60 },
        { x: 58, y: 60 },
      ],
    },
    {
      type: "wire",
      id: "wb",
      points: [
        { x: 45, y: 100 },
        { x: 58, y: 100 },
      ],
    },
    // Output labels
    { type: "label", id: "ly0", x: 300, y: 60, text: "= A'B'" },
    { type: "label", id: "ly1", x: 300, y: 110, text: "= A·B'" },
    { type: "label", id: "ly2", x: 300, y: 160, text: "= A'·B" },
    { type: "label", id: "ly3", x: 300, y: 210, text: "= A·B" },
    {
      type: "label",
      id: "note",
      x: 210,
      y: 260,
      text: "74HC139 outputs are active-LOW",
    },
    {
      type: "label",
      id: "use",
      x: 210,
      y: 285,
      text: "EN as data input for DEMUX operation",
    },
  ],
};
