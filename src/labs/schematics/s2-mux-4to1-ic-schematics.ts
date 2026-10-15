import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * S2 4:1 MUX using 74HC153 IC
 * Y = S1'S0'I0 + S1'S0·I1 + S1·S0'I2 + S1·S0·I3
 */

const W = 450;
const H = 320;

/** Step 1: Breadboard and supply */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 1: Breadboard Setup" },
  { type: "vsource", id: "vcc", x: 60, y: 100, label: "+5V" },
  { type: "ground", id: "gnd", x: 60, y: 200 },
  { type: "wire", id: "w1", points: [{ x: 60, y: 80 }, { x: 390, y: 80 }], highlight: true },
  { type: "wire", id: "w2", points: [{ x: 60, y: 200 }, { x: 390, y: 200 }], highlight: true },
  { type: "label", id: "desc", x: 225, y: 280, text: "4:1 MUX: 4 data inputs, 2 select lines" },
]};

/** Step 2: Place 74HC153 IC */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 2: Place 74HC153 IC" },
  { type: "label", id: "ic", x: 225, y: 100, text: "74HC153" },
  { type: "label", id: "desc1", x: 225, y: 140, text: "Dual 4:1 MUX (using section 1)" },
  { type: "label", id: "pins", x: 225, y: 180, text: "Pin 1: 1G (enable), Pins 3-6: 1C0-1C3" },
  { type: "label", id: "pins2", x: 225, y: 210, text: "Pins 2,14: S0,S1 | Pin 7: 1Y (output)" },
  { type: "label", id: "desc", x: 225, y: 280, text: "DIP-16 package, Vcc=16, GND=8" },
]};

/** Step 3: Enable pin */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 3: Enable Pin" },
  { type: "label", id: "pin", x: 100, y: 100, text: "Pin 1: 1G (Enable)" },
  { type: "wire", id: "wen", points: [{ x: 200, y: 100 }, { x: 300, y: 100 }], highlight: true },
  { type: "ground", id: "gnd", x: 320, y: 100 },
  { type: "label", id: "note", x: 225, y: 150, text: "1G is active-LOW enable" },
  { type: "label", id: "note2", x: 225, y: 180, text: "Tie to GND to enable output" },
  { type: "label", id: "desc", x: 225, y: 260, text: "When 1G=HIGH, output 1Y=LOW regardless of inputs" },
]};

/** Step 4: Data inputs I0-I3 */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 4: Data Inputs" },
  { type: "label", id: "li0", x: 50, y: 80, text: "I0 (1C0)" },
  { type: "label", id: "li1", x: 50, y: 120, text: "I1 (1C1)" },
  { type: "label", id: "li2", x: 50, y: 160, text: "I2 (1C2)" },
  { type: "label", id: "li3", x: 50, y: 200, text: "I3 (1C3)" },
  { type: "wire", id: "wi0", points: [{ x: 110, y: 80 }, { x: 350, y: 80 }], highlight: true },
  { type: "wire", id: "wi1", points: [{ x: 110, y: 120 }, { x: 350, y: 120 }], highlight: true },
  { type: "wire", id: "wi2", points: [{ x: 110, y: 160 }, { x: 350, y: 160 }], highlight: true },
  { type: "wire", id: "wi3", points: [{ x: 110, y: 200 }, { x: 350, y: 200 }], highlight: true },
  { type: "label", id: "desc", x: 225, y: 260, text: "Connect 4 data sources to 1C0-1C3" },
]};

/** Step 5: Select lines S0, S1 */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 5: Select Lines" },
  { type: "label", id: "ls0", x: 50, y: 100, text: "S0 (Pin 2)" },
  { type: "label", id: "ls1", x: 50, y: 160, text: "S1 (Pin 14)" },
  { type: "wire", id: "ws0", points: [{ x: 120, y: 100 }, { x: 350, y: 100 }], highlight: true },
  { type: "wire", id: "ws1", points: [{ x: 120, y: 160 }, { x: 350, y: 160 }], highlight: true },
  { type: "label", id: "table", x: 225, y: 220, text: "S1 S0 | Selected" },
  { type: "label", id: "r0", x: 225, y: 245, text: " 0  0 |   I0" },
  { type: "label", id: "r1", x: 225, y: 265, text: " 0  1 |   I1" },
  { type: "label", id: "r2", x: 225, y: 285, text: " 1  0 |   I2" },
  { type: "label", id: "r3", x: 225, y: 305, text: " 1  1 |   I3" },
]};

/** Step 6: Output stage */
export const step06: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 6: Output Stage" },
  { type: "label", id: "lout", x: 100, y: 100, text: "1Y (Pin 7)" },
  { type: "wire", id: "wout", points: [{ x: 160, y: 100 }, { x: 240, y: 100 }], highlight: true },
  { type: "resistor", id: "r1", x: 260, y: 100, label: "330" },
  { type: "wire", id: "wled", points: [{ x: 280, y: 100 }, { x: 320, y: 100 }] },
  { type: "led", id: "led1", x: 340, y: 100, label: "Y", highlight: true },
  { type: "wire", id: "wgnd", points: [{ x: 360, y: 100 }, { x: 360, y: 160 }] },
  { type: "ground", id: "gnd", x: 360, y: 180 },
  { type: "label", id: "desc", x: 225, y: 260, text: "Output Y follows selected input" },
]};

/** Step 7: Test S1=0, S0=0 → Y=I0 */
export const step07: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 7: Test S1=0, S0=0" },
  { type: "label", id: "select", x: 225, y: 55, text: "Select = 00 → Output = I0" },
  { type: "and-gate", id: "and0", x: 200, y: 120, label: "S1'S0'I0", highlight: true },
  { type: "wire", id: "wi0", points: [{ x: 60, y: 112 }, { x: 174, y: 112 }] },
  { type: "wire", id: "wout", points: [{ x: 226, y: 120 }, { x: 320, y: 120 }] },
  { type: "led", id: "led1", x: 340, y: 120, label: "Y" },
  { type: "label", id: "li0", x: 40, y: 112, text: "I0" },
  { type: "label", id: "test", x: 225, y: 200, text: "Set I0=1 → Y=1 (LED ON)" },
  { type: "label", id: "test2", x: 225, y: 230, text: "Set I0=0 → Y=0 (LED OFF)" },
]};

/** Step 8: Test S1=0, S0=1 → Y=I1 */
export const step08: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 8: Test S1=0, S0=1" },
  { type: "label", id: "select", x: 225, y: 55, text: "Select = 01 → Output = I1" },
  { type: "and-gate", id: "and1", x: 200, y: 120, label: "S1'S0·I1", highlight: true },
  { type: "wire", id: "wi1", points: [{ x: 60, y: 112 }, { x: 174, y: 112 }] },
  { type: "wire", id: "wout", points: [{ x: 226, y: 120 }, { x: 320, y: 120 }] },
  { type: "led", id: "led1", x: 340, y: 120, label: "Y" },
  { type: "label", id: "li1", x: 40, y: 112, text: "I1" },
  { type: "label", id: "test", x: 225, y: 200, text: "Set I1=1 → Y=1 (LED ON)" },
  { type: "label", id: "test2", x: 225, y: 230, text: "Set I1=0 → Y=0 (LED OFF)" },
]};

/** Step 9: Test S1=1, S0=0 → Y=I2 */
export const step09: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 9: Test S1=1, S0=0" },
  { type: "label", id: "select", x: 225, y: 55, text: "Select = 10 → Output = I2" },
  { type: "and-gate", id: "and2", x: 200, y: 120, label: "S1·S0'I2", highlight: true },
  { type: "wire", id: "wi2", points: [{ x: 60, y: 112 }, { x: 174, y: 112 }] },
  { type: "wire", id: "wout", points: [{ x: 226, y: 120 }, { x: 320, y: 120 }] },
  { type: "led", id: "led1", x: 340, y: 120, label: "Y" },
  { type: "label", id: "li2", x: 40, y: 112, text: "I2" },
  { type: "label", id: "test", x: 225, y: 200, text: "Set I2=1 → Y=1 (LED ON)" },
  { type: "label", id: "test2", x: 225, y: 230, text: "Set I2=0 → Y=0 (LED OFF)" },
]};

/** Step 10: Test S1=1, S0=1 → Y=I3 */
export const step10: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 10: Test S1=1, S0=1" },
  { type: "label", id: "select", x: 225, y: 55, text: "Select = 11 → Output = I3" },
  { type: "and-gate", id: "and3", x: 200, y: 120, label: "S1·S0·I3", highlight: true },
  { type: "wire", id: "wi3", points: [{ x: 60, y: 112 }, { x: 174, y: 112 }] },
  { type: "wire", id: "wout", points: [{ x: 226, y: 120 }, { x: 320, y: 120 }] },
  { type: "led", id: "led1", x: 340, y: 120, label: "Y" },
  { type: "label", id: "li3", x: 40, y: 112, text: "I3" },
  { type: "label", id: "test", x: 225, y: 200, text: "Set I3=1 → Y=1 (LED ON)" },
  { type: "label", id: "test2", x: 225, y: 230, text: "Set I3=0 → Y=0 (LED OFF)" },
]};

export const s2Mux4to1IcStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10,
];

export const s2Mux4to1IcTheoryDiagram: SchematicData = { width: 450, height: 300, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "4:1 Multiplexer Structure" },
  // NOT gates for select
  { type: "not-gate", id: "not0", x: 80, y: 60, label: "S0'" },
  { type: "not-gate", id: "not1", x: 80, y: 100, label: "S1'" },
  // AND gates
  { type: "and-gate", id: "and0", x: 200, y: 60, label: "I0" },
  { type: "and-gate", id: "and1", x: 200, y: 110, label: "I1" },
  { type: "and-gate", id: "and2", x: 200, y: 160, label: "I2" },
  { type: "and-gate", id: "and3", x: 200, y: 210, label: "I3" },
  // OR gate
  { type: "or-gate", id: "or1", x: 340, y: 135, label: "Y" },
  // Wires from ANDs to OR
  { type: "wire", id: "w0", points: [{ x: 226, y: 60 }, { x: 280, y: 60 }, { x: 280, y: 119 }, { x: 314, y: 119 }] },
  { type: "wire", id: "w1", points: [{ x: 226, y: 110 }, { x: 290, y: 110 }, { x: 290, y: 127 }, { x: 314, y: 127 }] },
  { type: "wire", id: "w2", points: [{ x: 226, y: 160 }, { x: 290, y: 160 }, { x: 290, y: 143 }, { x: 314, y: 143 }] },
  { type: "wire", id: "w3", points: [{ x: 226, y: 210 }, { x: 280, y: 210 }, { x: 280, y: 151 }, { x: 314, y: 151 }] },
  // Labels
  { type: "label", id: "ls0", x: 30, y: 60, text: "S0" },
  { type: "label", id: "ls1", x: 30, y: 100, text: "S1" },
  { type: "label", id: "li0", x: 140, y: 52, text: "I0" },
  { type: "label", id: "li1", x: 140, y: 102, text: "I1" },
  { type: "label", id: "li2", x: 140, y: 152, text: "I2" },
  { type: "label", id: "li3", x: 140, y: 202, text: "I3" },
  { type: "label", id: "eq", x: 225, y: 270, text: "Y = S1'S0'I0 + S1'S0I1 + S1S0'I2 + S1S0I3" },
]};
