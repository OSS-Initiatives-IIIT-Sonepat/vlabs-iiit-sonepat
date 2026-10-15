import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * S2 2:4 Decoder
 * Y0=A'B', Y1=A'B, Y2=AB', Y3=AB
 */

const W = 420;
const H = 300;

/** Step 1: Setup breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 1: Breadboard Setup" },
  { type: "vsource", id: "vcc", x: 60, y: 100, label: "+5V" },
  { type: "ground", id: "gnd", x: 60, y: 180 },
  { type: "wire", id: "w1", points: [{ x: 60, y: 80 }, { x: 360, y: 80 }], highlight: true },
  { type: "wire", id: "w2", points: [{ x: 60, y: 180 }, { x: 360, y: 180 }], highlight: true },
  { type: "label", id: "desc", x: 210, y: 260, text: "2:4 Decoder: 2-bit input → 4 one-hot outputs" },
]};

/** Step 2: Wire NOT gates for input complements */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 2: NOT Gates for A', B'" },
  { type: "not-gate", id: "nota", x: 140, y: 100, label: "A'", highlight: true },
  { type: "not-gate", id: "notb", x: 140, y: 180, label: "B'", highlight: true },
  { type: "wire", id: "wa", points: [{ x: 60, y: 100 }, { x: 118, y: 100 }] },
  { type: "wire", id: "wb", points: [{ x: 60, y: 180 }, { x: 118, y: 180 }] },
  { type: "label", id: "la", x: 45, y: 100, text: "A" },
  { type: "label", id: "lb", x: 45, y: 180, text: "B" },
  { type: "wire", id: "wna", points: [{ x: 166, y: 100 }, { x: 300, y: 100 }] },
  { type: "wire", id: "wnb", points: [{ x: 166, y: 180 }, { x: 300, y: 180 }] },
  { type: "label", id: "desc", x: 210, y: 260, text: "74HC04 (hex inverter) - 2 gates used" },
]};

/** Step 3: Wire AND gates for minterm outputs */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 3: AND Gates for Minterms" },
  { type: "and-gate", id: "and0", x: 280, y: 60, label: "Y0", highlight: true },
  { type: "and-gate", id: "and1", x: 280, y: 120, label: "Y1", highlight: true },
  { type: "and-gate", id: "and2", x: 280, y: 180, label: "Y2", highlight: true },
  { type: "and-gate", id: "and3", x: 280, y: 240, label: "Y3", highlight: true },
  { type: "label", id: "eq0", x: 360, y: 60, text: "= A'B'" },
  { type: "label", id: "eq1", x: 360, y: 120, text: "= A'B" },
  { type: "label", id: "eq2", x: 360, y: 180, text: "= AB'" },
  { type: "label", id: "eq3", x: 360, y: 240, text: "= AB" },
  { type: "label", id: "desc", x: 210, y: 285, text: "74HC08 (quad AND) - all 4 gates used" },
]};

/** Step 4: Connect LED indicators */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 4: LED Indicators" },
  { type: "resistor", id: "r0", x: 80, y: 80, label: "330" },
  { type: "led", id: "led0", x: 80, y: 120, label: "Y0", highlight: true },
  { type: "resistor", id: "r1", x: 160, y: 80, label: "330" },
  { type: "led", id: "led1", x: 160, y: 120, label: "Y1", highlight: true },
  { type: "resistor", id: "r2", x: 240, y: 80, label: "330" },
  { type: "led", id: "led2", x: 240, y: 120, label: "Y2", highlight: true },
  { type: "resistor", id: "r3", x: 320, y: 80, label: "330" },
  { type: "led", id: "led3", x: 320, y: 120, label: "Y3", highlight: true },
  { type: "wire", id: "wgnd", points: [{ x: 80, y: 140 }, { x: 320, y: 140 }] },
  { type: "wire", id: "wg", points: [{ x: 200, y: 140 }, { x: 200, y: 180 }] },
  { type: "ground", id: "gnd", x: 200, y: 200 },
  { type: "label", id: "desc", x: 210, y: 260, text: "Exactly ONE LED lights for each input combo" },
]};

/** Step 5: Test all 4 combinations */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 5: Test All Combinations" },
  { type: "label", id: "header", x: 210, y: 55, text: "A B | Y0 Y1 Y2 Y3" },
  { type: "label", id: "r0", x: 210, y: 85, text: "0 0 |  1  0  0  0" },
  { type: "label", id: "r1", x: 210, y: 115, text: "0 1 |  0  1  0  0" },
  { type: "label", id: "r2", x: 210, y: 145, text: "1 0 |  0  0  1  0" },
  { type: "label", id: "r3", x: 210, y: 175, text: "1 1 |  0  0  0  1" },
  { type: "label", id: "note", x: 210, y: 220, text: "One-hot encoding: exactly 1 output HIGH" },
  { type: "label", id: "desc", x: 210, y: 260, text: "Each row = one minterm of 2 variables" },
]};

export const s2Decoder2to4StepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
];

export const s2Decoder2to4TheoryDiagram: SchematicData = { width: 420, height: 300, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "2:4 Binary Decoder" },
  // NOT gates
  { type: "not-gate", id: "nota", x: 80, y: 80, label: "A'" },
  { type: "not-gate", id: "notb", x: 80, y: 140, label: "B'" },
  // AND gates
  { type: "and-gate", id: "and0", x: 240, y: 60, label: "Y0" },
  { type: "and-gate", id: "and1", x: 240, y: 110, label: "Y1" },
  { type: "and-gate", id: "and2", x: 240, y: 160, label: "Y2" },
  { type: "and-gate", id: "and3", x: 240, y: 210, label: "Y3" },
  // Input wiring
  { type: "wire", id: "wa", points: [{ x: 30, y: 80 }, { x: 58, y: 80 }] },
  { type: "junction", id: "ja", x: 45, y: 80 },
  { type: "wire", id: "wb", points: [{ x: 30, y: 140 }, { x: 58, y: 140 }] },
  { type: "junction", id: "jb", x: 45, y: 140 },
  { type: "label", id: "la", x: 15, y: 80, text: "A" },
  { type: "label", id: "lb", x: 15, y: 140, text: "B" },
  // A and A' distribution
  { type: "wire", id: "wna", points: [{ x: 106, y: 80 }, { x: 140, y: 80 }] },
  { type: "junction", id: "jna", x: 140, y: 80 },
  { type: "wire", id: "wna1", points: [{ x: 140, y: 80 }, { x: 140, y: 52 }, { x: 214, y: 52 }] },
  { type: "wire", id: "wna2", points: [{ x: 140, y: 80 }, { x: 140, y: 102 }, { x: 214, y: 102 }] },
  { type: "wire", id: "wa1", points: [{ x: 45, y: 80 }, { x: 45, y: 40 }, { x: 180, y: 40 }, { x: 180, y: 152 }, { x: 214, y: 152 }] },
  { type: "junction", id: "ja2", x: 180, y: 152 },
  { type: "wire", id: "wa2", points: [{ x: 180, y: 152 }, { x: 180, y: 202 }, { x: 214, y: 202 }] },
  // B and B' distribution
  { type: "wire", id: "wnb", points: [{ x: 106, y: 140 }, { x: 160, y: 140 }] },
  { type: "junction", id: "jnb", x: 160, y: 140 },
  { type: "wire", id: "wnb1", points: [{ x: 160, y: 140 }, { x: 160, y: 68 }, { x: 214, y: 68 }] },
  { type: "wire", id: "wnb2", points: [{ x: 160, y: 140 }, { x: 160, y: 168 }, { x: 214, y: 168 }] },
  { type: "wire", id: "wb1", points: [{ x: 45, y: 140 }, { x: 45, y: 240 }, { x: 200, y: 240 }, { x: 200, y: 118 }, { x: 214, y: 118 }] },
  { type: "junction", id: "jb2", x: 200, y: 118 },
  { type: "wire", id: "wb2", points: [{ x: 200, y: 118 }, { x: 200, y: 218 }, { x: 214, y: 218 }] },
  // Output labels
  { type: "label", id: "ly0", x: 310, y: 60, text: "= A'B'" },
  { type: "label", id: "ly1", x: 310, y: 110, text: "= A'B" },
  { type: "label", id: "ly2", x: 310, y: 160, text: "= AB'" },
  { type: "label", id: "ly3", x: 310, y: 210, text: "= AB" },
  { type: "label", id: "eq", x: 210, y: 270, text: "Yi = minterm(i) of inputs A,B" },
]};
