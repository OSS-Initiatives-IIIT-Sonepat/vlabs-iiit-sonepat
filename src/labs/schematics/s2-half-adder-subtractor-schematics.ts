import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * S2 Half Adder + Half Subtractor — Combined circuit with shared XOR gate
 */

const W = 420;
const H = 300;

/** Step 1: Breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 1: Breadboard Setup" },
  { type: "vsource", id: "vcc", x: 60, y: 100, label: "+5V" },
  { type: "ground", id: "gnd", x: 60, y: 200 },
  { type: "wire", id: "w1", points: [{ x: 60, y: 80 }, { x: 360, y: 80 }], highlight: true },
  { type: "wire", id: "w2", points: [{ x: 60, y: 200 }, { x: 360, y: 200 }], highlight: true },
  { type: "label", id: "desc", x: 210, y: 260, text: "Prepare power rails for ICs" },
]};

/** Step 2: Adder ICs (XOR for Sum, AND for Carry) */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 2: Half Adder ICs" },
  { type: "label", id: "subtitle", x: 210, y: 50, text: "Sum = A⊕B, Carry = A·B" },
  { type: "xor-gate", id: "xor1", x: 160, y: 120, label: "Sum", highlight: true },
  { type: "and-gate", id: "and1", x: 160, y: 200, label: "Carry", highlight: true },
  { type: "wire", id: "wa1", points: [{ x: 60, y: 112 }, { x: 132, y: 112 }] },
  { type: "wire", id: "wb1", points: [{ x: 60, y: 128 }, { x: 132, y: 128 }] },
  { type: "wire", id: "wa2", points: [{ x: 60, y: 192 }, { x: 134, y: 192 }] },
  { type: "wire", id: "wb2", points: [{ x: 60, y: 208 }, { x: 134, y: 208 }] },
  { type: "label", id: "la", x: 45, y: 112, text: "A" },
  { type: "label", id: "lb", x: 45, y: 128, text: "B" },
  { type: "label", id: "desc", x: 210, y: 270, text: "74HC86 (XOR), 74HC08 (AND)" },
]};

/** Step 3: Subtractor ICs (XOR for Diff, NOT+AND for Borrow) */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 3: Half Subtractor ICs" },
  { type: "label", id: "subtitle", x: 210, y: 50, text: "Diff = A⊕B, Borrow = A'·B" },
  { type: "xor-gate", id: "xor1", x: 160, y: 110, label: "Diff" },
  { type: "not-gate", id: "not1", x: 120, y: 180, label: "A'", highlight: true },
  { type: "and-gate", id: "and1", x: 220, y: 200, label: "Borrow", highlight: true },
  { type: "wire", id: "wa", points: [{ x: 60, y: 180 }, { x: 98, y: 180 }] },
  { type: "wire", id: "wn", points: [{ x: 146, y: 180 }, { x: 170, y: 180 }, { x: 170, y: 192 }, { x: 194, y: 192 }] },
  { type: "wire", id: "wb", points: [{ x: 60, y: 208 }, { x: 194, y: 208 }] },
  { type: "label", id: "la", x: 45, y: 180, text: "A" },
  { type: "label", id: "lb", x: 45, y: 208, text: "B" },
  { type: "label", id: "desc", x: 210, y: 270, text: "74HC04 (NOT) for A'" },
]};

/** Step 4: Wire input A */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 4: Wire Input A" },
  { type: "xor-gate", id: "xor1", x: 200, y: 100, label: "XOR" },
  { type: "and-gate", id: "and1", x: 200, y: 170, label: "AND" },
  { type: "not-gate", id: "not1", x: 200, y: 240, label: "NOT" },
  { type: "wire", id: "wa", points: [{ x: 40, y: 92 }, { x: 172, y: 92 }], highlight: true },
  { type: "junction", id: "ja1", x: 80, y: 92 },
  { type: "wire", id: "wa2", points: [{ x: 80, y: 92 }, { x: 80, y: 162 }, { x: 174, y: 162 }], highlight: true },
  { type: "junction", id: "ja2", x: 80, y: 162 },
  { type: "wire", id: "wa3", points: [{ x: 80, y: 162 }, { x: 80, y: 240 }, { x: 178, y: 240 }], highlight: true },
  { type: "label", id: "la", x: 25, y: 92, text: "A" },
  { type: "label", id: "desc", x: 210, y: 280, text: "A goes to XOR, AND, and NOT" },
]};

/** Step 5: Wire input B */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 5: Wire Input B" },
  { type: "xor-gate", id: "xor1", x: 200, y: 100 },
  { type: "and-gate", id: "and1", x: 200, y: 170 },
  { type: "and-gate", id: "and2", x: 340, y: 240, label: "Borr" },
  { type: "wire", id: "wb", points: [{ x: 40, y: 108 }, { x: 172, y: 108 }], highlight: true },
  { type: "junction", id: "jb1", x: 100, y: 108 },
  { type: "wire", id: "wb2", points: [{ x: 100, y: 108 }, { x: 100, y: 178 }, { x: 174, y: 178 }], highlight: true },
  { type: "junction", id: "jb2", x: 100, y: 178 },
  { type: "wire", id: "wb3", points: [{ x: 100, y: 178 }, { x: 100, y: 248 }, { x: 314, y: 248 }], highlight: true },
  { type: "label", id: "lb", x: 25, y: 108, text: "B" },
  { type: "label", id: "desc", x: 210, y: 280, text: "B goes to XOR, Carry-AND, Borrow-AND" },
]};

/** Step 6: Wire inverted A to borrow AND */
export const step06: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 6: Wire Inverted A" },
  { type: "not-gate", id: "not1", x: 140, y: 160, label: "A'" },
  { type: "and-gate", id: "and1", x: 280, y: 180, label: "Borrow" },
  { type: "wire", id: "wa", points: [{ x: 60, y: 160 }, { x: 118, y: 160 }] },
  { type: "wire", id: "wn", points: [{ x: 166, y: 160 }, { x: 220, y: 160 }, { x: 220, y: 172 }, { x: 254, y: 172 }], highlight: true },
  { type: "wire", id: "wb", points: [{ x: 60, y: 188 }, { x: 254, y: 188 }] },
  { type: "label", id: "la", x: 45, y: 160, text: "A" },
  { type: "label", id: "lb", x: 45, y: 188, text: "B" },
  { type: "label", id: "eq", x: 280, y: 220, text: "A'·B" },
  { type: "label", id: "desc", x: 210, y: 270, text: "NOT output (A') to Borrow AND gate" },
]};

/** Step 7: Output stage setup */
export const step07: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 7: Output Stage" },
  { type: "resistor", id: "r1", x: 100, y: 100, label: "330" },
  { type: "led", id: "led1", x: 100, y: 140, label: "Sum/Diff", highlight: true },
  { type: "resistor", id: "r2", x: 200, y: 100, label: "330" },
  { type: "led", id: "led2", x: 200, y: 140, label: "Carry", highlight: true },
  { type: "resistor", id: "r3", x: 300, y: 100, label: "330" },
  { type: "led", id: "led3", x: 300, y: 140, label: "Borrow", highlight: true },
  { type: "label", id: "desc", x: 210, y: 220, text: "3 LEDs with 330 ohm current limiters" },
]};

/** Step 8: Wire outputs */
export const step08: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 8: Wire Outputs" },
  { type: "xor-gate", id: "xor1", x: 100, y: 100, label: "S/D" },
  { type: "and-gate", id: "and1", x: 100, y: 180, label: "C" },
  { type: "and-gate", id: "and2", x: 100, y: 260, label: "B" },
  { type: "wire", id: "w1", points: [{ x: 128, y: 100 }, { x: 200, y: 100 }], highlight: true },
  { type: "wire", id: "w2", points: [{ x: 126, y: 180 }, { x: 260, y: 180 }], highlight: true },
  { type: "wire", id: "w3", points: [{ x: 126, y: 260 }, { x: 320, y: 260 }], highlight: true },
  { type: "led", id: "led1", x: 220, y: 100, label: "S/D" },
  { type: "led", id: "led2", x: 280, y: 180, label: "C" },
  { type: "led", id: "led3", x: 340, y: 260, label: "B" },
  { type: "label", id: "desc", x: 210, y: 290, text: "Gate outputs to LED indicators" },
]};

/** Step 9: Ground LEDs */
export const step09: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 9: Ground LED Returns" },
  { type: "led", id: "led1", x: 100, y: 100 },
  { type: "led", id: "led2", x: 200, y: 100 },
  { type: "led", id: "led3", x: 300, y: 100 },
  { type: "wire", id: "w1", points: [{ x: 100, y: 120 }, { x: 100, y: 160 }] },
  { type: "wire", id: "w2", points: [{ x: 200, y: 120 }, { x: 200, y: 160 }] },
  { type: "wire", id: "w3", points: [{ x: 300, y: 120 }, { x: 300, y: 160 }] },
  { type: "wire", id: "wgnd", points: [{ x: 100, y: 160 }, { x: 300, y: 160 }], highlight: true },
  { type: "wire", id: "wg", points: [{ x: 200, y: 160 }, { x: 200, y: 200 }] },
  { type: "ground", id: "gnd", x: 200, y: 220 },
  { type: "label", id: "desc", x: 210, y: 270, text: "All LED cathodes to GND rail" },
]};

/** Step 10: Test circuit */
export const step10: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 10: Test All Combinations" },
  { type: "label", id: "header", x: 210, y: 55, text: "A  B | Sum/Diff | Carry | Borrow" },
  { type: "label", id: "r1", x: 210, y: 85, text: "0  0 |    0     |   0   |   0" },
  { type: "label", id: "r2", x: 210, y: 115, text: "0  1 |    1     |   0   |   1" },
  { type: "label", id: "r3", x: 210, y: 145, text: "1  0 |    1     |   0   |   0" },
  { type: "label", id: "r4", x: 210, y: 175, text: "1  1 |    0     |   1   |   0" },
  { type: "label", id: "note1", x: 210, y: 220, text: "Sum = Diff (shared XOR output)" },
  { type: "label", id: "note2", x: 210, y: 250, text: "Carry != Borrow (different logic)" },
]};

export const s2HalfAdderSubtractorStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10,
];

export const s2HalfAdderSubtractorTheoryDiagram: SchematicData = { width: 450, height: 280, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Half Adder & Half Subtractor" },
  // Half Adder
  { type: "label", id: "l1", x: 110, y: 50, text: "Half Adder" },
  { type: "xor-gate", id: "xor1", x: 110, y: 100, label: "Sum" },
  { type: "and-gate", id: "and1", x: 110, y: 170, label: "Carry" },
  { type: "wire", id: "wa1", points: [{ x: 40, y: 92 }, { x: 82, y: 92 }] },
  { type: "wire", id: "wb1", points: [{ x: 40, y: 108 }, { x: 82, y: 108 }] },
  { type: "wire", id: "wa2", points: [{ x: 40, y: 162 }, { x: 84, y: 162 }] },
  { type: "wire", id: "wb2", points: [{ x: 40, y: 178 }, { x: 84, y: 178 }] },
  { type: "label", id: "la1", x: 25, y: 92, text: "A" },
  { type: "label", id: "lb1", x: 25, y: 108, text: "B" },
  // Half Subtractor
  { type: "label", id: "l2", x: 340, y: 50, text: "Half Subtractor" },
  { type: "xor-gate", id: "xor2", x: 340, y: 100, label: "Diff" },
  { type: "not-gate", id: "not1", x: 280, y: 170, label: "A'" },
  { type: "and-gate", id: "and2", x: 380, y: 190, label: "Borr" },
  { type: "wire", id: "wn", points: [{ x: 306, y: 170 }, { x: 330, y: 170 }, { x: 330, y: 182 }, { x: 354, y: 182 }] },
  { type: "wire", id: "wb3", points: [{ x: 270, y: 198 }, { x: 354, y: 198 }] },
  { type: "label", id: "eq1", x: 110, y: 230, text: "S = A⊕B, C = A·B" },
  { type: "label", id: "eq2", x: 340, y: 240, text: "D = A⊕B, B = A'·B" },
]};
