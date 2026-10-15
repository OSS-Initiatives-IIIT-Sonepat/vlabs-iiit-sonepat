import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * S2 BCD to Excess-3 Converter
 * W = A + B(C+D), X = B ⊕ (C+D), Y = (C⊕D)', Z = D'
 */

const W = 450;
const H = 320;

/** Step 1: Breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 1: Breadboard Setup" },
  { type: "vsource", id: "vcc", x: 60, y: 100, label: "+5V" },
  { type: "ground", id: "gnd", x: 60, y: 200 },
  { type: "wire", id: "w1", points: [{ x: 60, y: 80 }, { x: 390, y: 80 }], highlight: true },
  { type: "wire", id: "w2", points: [{ x: 60, y: 200 }, { x: 390, y: 200 }], highlight: true },
  { type: "label", id: "desc", x: 225, y: 280, text: "BCD inputs ABCD, XS3 outputs WXYZ" },
]};

/** Step 2: Place NOT and XOR gates */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 2: NOT and XOR Gates" },
  { type: "not-gate", id: "not1", x: 120, y: 100, label: "D'=Z", highlight: true },
  { type: "xor-gate", id: "xor1", x: 120, y: 180, label: "C⊕D", highlight: true },
  { type: "not-gate", id: "not2", x: 280, y: 180, label: "(C⊕D)'=Y", highlight: true },
  { type: "xor-gate", id: "xor2", x: 280, y: 260, label: "B⊕(C+D)=X", highlight: true },
  { type: "label", id: "lz", x: 180, y: 100, text: "→ Z output" },
  { type: "label", id: "ly", x: 360, y: 180, text: "→ Y output" },
  { type: "label", id: "lx", x: 360, y: 260, text: "→ X output" },
  { type: "label", id: "desc", x: 225, y: 300, text: "74HC04 (NOT), 74HC86 (XOR)" },
]};

/** Step 3: Place AND and OR gates */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 3: AND and OR Gates" },
  { type: "or-gate", id: "or1", x: 120, y: 100, label: "C+D", highlight: true },
  { type: "and-gate", id: "and1", x: 240, y: 100, label: "B(C+D)", highlight: true },
  { type: "or-gate", id: "or2", x: 360, y: 100, label: "W", highlight: true },
  { type: "wire", id: "w1", points: [{ x: 146, y: 100 }, { x: 214, y: 100 }] },
  { type: "wire", id: "w2", points: [{ x: 266, y: 100 }, { x: 334, y: 100 }] },
  { type: "label", id: "lw", x: 400, y: 100, text: "→ W" },
  { type: "label", id: "eq", x: 225, y: 180, text: "W = A + B(C+D)" },
  { type: "label", id: "desc", x: 225, y: 280, text: "74HC32 (OR), 74HC08 (AND)" },
]};

/** Step 4: Wire all inputs A, B, C, D */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 4: Wire Inputs ABCD" },
  { type: "label", id: "la", x: 30, y: 60, text: "A (MSB)" },
  { type: "label", id: "lb", x: 30, y: 100, text: "B" },
  { type: "label", id: "lc", x: 30, y: 140, text: "C" },
  { type: "label", id: "ld", x: 30, y: 180, text: "D (LSB)" },
  { type: "wire", id: "wa", points: [{ x: 70, y: 60 }, { x: 400, y: 60 }], highlight: true },
  { type: "wire", id: "wb", points: [{ x: 70, y: 100 }, { x: 400, y: 100 }], highlight: true },
  { type: "wire", id: "wc", points: [{ x: 70, y: 140 }, { x: 400, y: 140 }], highlight: true },
  { type: "wire", id: "wd", points: [{ x: 70, y: 180 }, { x: 400, y: 180 }], highlight: true },
  { type: "junction", id: "jb", x: 150, y: 100 },
  { type: "junction", id: "jc", x: 200, y: 140 },
  { type: "junction", id: "jd", x: 250, y: 180 },
  { type: "label", id: "desc", x: 225, y: 260, text: "A→W path, B→X&W, C/D→multiple" },
]};

/** Step 5: Place resistors and LEDs */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 5: Output LEDs" },
  { type: "resistor", id: "r1", x: 100, y: 100, label: "330" },
  { type: "led", id: "led1", x: 100, y: 140, label: "W", highlight: true },
  { type: "resistor", id: "r2", x: 180, y: 100, label: "330" },
  { type: "led", id: "led2", x: 180, y: 140, label: "X", highlight: true },
  { type: "resistor", id: "r3", x: 260, y: 100, label: "330" },
  { type: "led", id: "led3", x: 260, y: 140, label: "Y", highlight: true },
  { type: "resistor", id: "r4", x: 340, y: 100, label: "330" },
  { type: "led", id: "led4", x: 340, y: 140, label: "Z", highlight: true },
  { type: "label", id: "colors", x: 225, y: 200, text: "W=Red, X=Yellow, Y=Green, Z=Blue" },
  { type: "label", id: "desc", x: 225, y: 260, text: "4 LEDs with 330Ω current limiters" },
]};

/** Step 6: Connect output wires */
export const step06: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 6: Output Wiring" },
  { type: "or-gate", id: "or2", x: 100, y: 80, label: "W" },
  { type: "xor-gate", id: "xor2", x: 100, y: 140, label: "X" },
  { type: "not-gate", id: "not2", x: 100, y: 200, label: "Y" },
  { type: "not-gate", id: "not1", x: 100, y: 260, label: "Z" },
  { type: "wire", id: "ww", points: [{ x: 126, y: 80 }, { x: 200, y: 80 }], highlight: true },
  { type: "wire", id: "wx", points: [{ x: 128, y: 140 }, { x: 260, y: 140 }], highlight: true },
  { type: "wire", id: "wy", points: [{ x: 126, y: 200 }, { x: 320, y: 200 }], highlight: true },
  { type: "wire", id: "wz", points: [{ x: 126, y: 260 }, { x: 380, y: 260 }], highlight: true },
  { type: "led", id: "led1", x: 220, y: 80, label: "W" },
  { type: "led", id: "led2", x: 280, y: 140, label: "X" },
  { type: "led", id: "led3", x: 340, y: 200, label: "Y" },
  { type: "led", id: "led4", x: 400, y: 260, label: "Z" },
  { type: "label", id: "desc", x: 225, y: 300, text: "Gate outputs to corresponding LEDs" },
]};

/** Step 7: Test BCD 0101 (5) → XS3 1000 (8) */
export const step07: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 7: Test BCD 0101 (Decimal 5)" },
  { type: "label", id: "input", x: 225, y: 55, text: "Input: A=0, B=1, C=0, D=1" },
  { type: "label", id: "calc", x: 225, y: 90, text: "XS3 = BCD + 3 = 5 + 3 = 8 = 1000" },
  { type: "label", id: "w", x: 100, y: 140, text: "W = 0+1(0+1) = 1" },
  { type: "label", id: "x", x: 100, y: 170, text: "X = 1⊕(0+1) = 0" },
  { type: "label", id: "y", x: 100, y: 200, text: "Y = (0⊕1)' = 0" },
  { type: "label", id: "z", x: 100, y: 230, text: "Z = 1' = 0" },
  { type: "label", id: "result", x: 225, y: 280, text: "Result: WXYZ = 1000 ✓" },
]};

/** Step 8: Test BCD 1001 (9) → XS3 1100 (12) */
export const step08: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 8: Test BCD 1001 (Decimal 9)" },
  { type: "label", id: "input", x: 225, y: 55, text: "Input: A=1, B=0, C=0, D=1" },
  { type: "label", id: "calc", x: 225, y: 90, text: "XS3 = BCD + 3 = 9 + 3 = 12 = 1100" },
  { type: "label", id: "w", x: 100, y: 140, text: "W = 1+0(0+1) = 1" },
  { type: "label", id: "x", x: 100, y: 170, text: "X = 0⊕(0+1) = 1" },
  { type: "label", id: "y", x: 100, y: 200, text: "Y = (0⊕1)' = 0" },
  { type: "label", id: "z", x: 100, y: 230, text: "Z = 1' = 0" },
  { type: "label", id: "result", x: 225, y: 280, text: "Result: WXYZ = 1100 ✓" },
]};

export const s2BcdXs3ConverterStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08,
];

export const s2BcdXs3ConverterTheoryDiagram: SchematicData = { width: 480, height: 320, elements: [
  { type: "label", id: "title", x: 240, y: 20, text: "BCD to Excess-3 Converter" },
  // Input labels
  { type: "label", id: "la", x: 30, y: 60, text: "A" },
  { type: "label", id: "lb", x: 30, y: 100, text: "B" },
  { type: "label", id: "lc", x: 30, y: 160, text: "C" },
  { type: "label", id: "ld", x: 30, y: 200, text: "D" },
  // C+D shared
  { type: "or-gate", id: "or1", x: 120, y: 180, label: "C+D" },
  { type: "wire", id: "wc", points: [{ x: 45, y: 160 }, { x: 80, y: 160 }, { x: 80, y: 172 }, { x: 94, y: 172 }] },
  { type: "wire", id: "wd1", points: [{ x: 45, y: 200 }, { x: 80, y: 200 }, { x: 80, y: 188 }, { x: 94, y: 188 }] },
  { type: "junction", id: "jd", x: 60, y: 200 },
  // W path
  { type: "and-gate", id: "and1", x: 220, y: 80, label: "B(C+D)" },
  { type: "or-gate", id: "or2", x: 340, y: 60, label: "W" },
  { type: "wire", id: "wa", points: [{ x: 45, y: 60 }, { x: 300, y: 60 }, { x: 300, y: 52 }, { x: 314, y: 52 }] },
  { type: "wire", id: "wb1", points: [{ x: 45, y: 100 }, { x: 160, y: 100 }, { x: 160, y: 72 }, { x: 194, y: 72 }] },
  { type: "junction", id: "jb", x: 140, y: 100 },
  { type: "wire", id: "wcd1", points: [{ x: 146, y: 180 }, { x: 160, y: 180 }, { x: 160, y: 88 }, { x: 194, y: 88 }] },
  { type: "junction", id: "jcd", x: 160, y: 180 },
  { type: "wire", id: "wand", points: [{ x: 246, y: 80 }, { x: 280, y: 80 }, { x: 280, y: 68 }, { x: 314, y: 68 }] },
  // X path
  { type: "xor-gate", id: "xor1", x: 340, y: 120, label: "X" },
  { type: "wire", id: "wb2", points: [{ x: 140, y: 100 }, { x: 140, y: 112 }, { x: 312, y: 112 }] },
  { type: "wire", id: "wcd2", points: [{ x: 160, y: 180 }, { x: 160, y: 128 }, { x: 312, y: 128 }] },
  // Y path
  { type: "xor-gate", id: "xor2", x: 220, y: 200, label: "C⊕D" },
  { type: "not-gate", id: "not1", x: 340, y: 200, label: "Y" },
  { type: "wire", id: "wc2", points: [{ x: 100, y: 160 }, { x: 100, y: 192 }, { x: 192, y: 192 }] },
  { type: "junction", id: "jc", x: 100, y: 160 },
  { type: "wire", id: "wd2", points: [{ x: 60, y: 200 }, { x: 60, y: 208 }, { x: 192, y: 208 }] },
  { type: "wire", id: "wxor", points: [{ x: 248, y: 200 }, { x: 318, y: 200 }] },
  // Z path
  { type: "not-gate", id: "not2", x: 340, y: 260, label: "Z" },
  { type: "wire", id: "wd3", points: [{ x: 60, y: 200 }, { x: 60, y: 260 }, { x: 318, y: 260 }] },
  // Output labels
  { type: "label", id: "outw", x: 400, y: 60, text: "→W" },
  { type: "label", id: "outx", x: 400, y: 120, text: "→X" },
  { type: "label", id: "outy", x: 400, y: 200, text: "→Y" },
  { type: "label", id: "outz", x: 400, y: 260, text: "→Z" },
  { type: "label", id: "eq", x: 240, y: 300, text: "XS3 = BCD + 0011" },
]};
