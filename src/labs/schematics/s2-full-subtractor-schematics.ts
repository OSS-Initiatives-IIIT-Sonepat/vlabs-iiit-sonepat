import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * S2 Full Subtractor — D = A⊕B⊕Bin, Bout = A'B + Bin(A⊕B)'
 */

const W = 450;
const H = 320;

/** Step 1: Place breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 1: Breadboard Setup" },
  { type: "vsource", id: "vcc", x: 60, y: 100, label: "+5V" },
  { type: "ground", id: "gnd", x: 60, y: 200 },
  { type: "wire", id: "w1", points: [{ x: 60, y: 80 }, { x: 390, y: 80 }], highlight: true },
  { type: "wire", id: "w2", points: [{ x: 60, y: 200 }, { x: 390, y: 200 }], highlight: true },
  { type: "label", id: "desc", x: 225, y: 280, text: "Power rails for full subtractor" },
]};

/** Step 2: Place difference gates (2 XOR) */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 2: Difference Gates" },
  { type: "label", id: "eq", x: 225, y: 50, text: "D = A⊕B⊕Bin" },
  { type: "xor-gate", id: "xor1", x: 140, y: 140, label: "A⊕B", highlight: true },
  { type: "xor-gate", id: "xor2", x: 300, y: 160, label: "Diff", highlight: true },
  { type: "wire", id: "w1", points: [{ x: 168, y: 140 }, { x: 220, y: 140 }, { x: 220, y: 152 }, { x: 272, y: 152 }] },
  { type: "label", id: "lbl_x", x: 190, y: 125, text: "x = A⊕B" },
  { type: "label", id: "desc", x: 225, y: 280, text: "Same as full adder Sum path" },
]};

/** Step 3: Place borrow gates (XOR, AND) */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 3: Borrow Gates" },
  { type: "label", id: "eq", x: 225, y: 50, text: "Bout = Bin⊕g where g = x·t, t = B⊕Bin" },
  { type: "xor-gate", id: "xor3", x: 120, y: 120, label: "B⊕Bin", highlight: true },
  { type: "and-gate", id: "and1", x: 240, y: 140, label: "x·t", highlight: true },
  { type: "xor-gate", id: "xor4", x: 360, y: 180, label: "Bout", highlight: true },
  { type: "wire", id: "w1", points: [{ x: 148, y: 120 }, { x: 180, y: 120 }, { x: 180, y: 148 }, { x: 214, y: 148 }] },
  { type: "wire", id: "w2", points: [{ x: 266, y: 140 }, { x: 300, y: 140 }, { x: 300, y: 188 }, { x: 332, y: 188 }] },
  { type: "label", id: "desc", x: 225, y: 280, text: "5-gate implementation (no NOT gates)" },
]};

/** Step 4: Place output LEDs */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 4: Output LEDs" },
  { type: "resistor", id: "r1", x: 160, y: 120, label: "330" },
  { type: "led", id: "led1", x: 160, y: 160, label: "Diff", highlight: true },
  { type: "resistor", id: "r2", x: 280, y: 120, label: "330" },
  { type: "led", id: "led2", x: 280, y: 160, label: "Bout", highlight: true },
  { type: "wire", id: "wg1", points: [{ x: 160, y: 180 }, { x: 160, y: 220 }] },
  { type: "wire", id: "wg2", points: [{ x: 280, y: 180 }, { x: 280, y: 220 }] },
  { type: "wire", id: "wgnd", points: [{ x: 160, y: 220 }, { x: 280, y: 220 }] },
  { type: "ground", id: "gnd", x: 220, y: 240 },
  { type: "label", id: "desc", x: 225, y: 290, text: "D and Bout LEDs with 330Ω resistors" },
]};

/** Step 5: Wire inputs A, B */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 5: Wire Inputs A, B" },
  { type: "xor-gate", id: "xor1", x: 180, y: 100, label: "A⊕B" },
  { type: "wire", id: "wa", points: [{ x: 40, y: 92 }, { x: 152, y: 92 }], highlight: true },
  { type: "wire", id: "wb", points: [{ x: 40, y: 108 }, { x: 152, y: 108 }], highlight: true },
  { type: "junction", id: "jb", x: 100, y: 108 },
  { type: "wire", id: "wb2", points: [{ x: 100, y: 108 }, { x: 100, y: 180 }] },
  { type: "label", id: "la", x: 25, y: 92, text: "A" },
  { type: "label", id: "lb", x: 25, y: 108, text: "B" },
  { type: "label", id: "note", x: 100, y: 200, text: "B also to t-XOR" },
  { type: "label", id: "desc", x: 225, y: 280, text: "A to x-XOR only, B to x-XOR and t-XOR" },
]};

/** Step 6: Wire Bin */
export const step06: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 6: Wire Borrow-In" },
  { type: "xor-gate", id: "xor1", x: 140, y: 100, label: "x" },
  { type: "xor-gate", id: "xor2", x: 300, y: 100, label: "D" },
  { type: "xor-gate", id: "xor3", x: 140, y: 200, label: "t" },
  { type: "xor-gate", id: "xor4", x: 380, y: 200, label: "Bout" },
  { type: "wire", id: "wx", points: [{ x: 168, y: 100 }, { x: 272, y: 100 }] },
  { type: "wire", id: "wbin1", points: [{ x: 40, y: 108 }, { x: 272, y: 108 }], highlight: true },
  { type: "junction", id: "jbin1", x: 100, y: 108 },
  { type: "wire", id: "wbin2", points: [{ x: 100, y: 108 }, { x: 100, y: 208 }, { x: 112, y: 208 }], highlight: true },
  { type: "junction", id: "jbin2", x: 100, y: 208 },
  { type: "wire", id: "wbin3", points: [{ x: 100, y: 208 }, { x: 100, y: 250 }, { x: 340, y: 250 }, { x: 340, y: 192 }, { x: 352, y: 192 }], highlight: true },
  { type: "label", id: "lbin", x: 25, y: 108, text: "Bin" },
  { type: "label", id: "desc", x: 225, y: 290, text: "Bin to D-XOR, t-XOR, and Bout-XOR" },
]};

/** Step 7: Wire internal signals */
export const step07: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 7: Internal Signal Wiring" },
  { type: "xor-gate", id: "xor1", x: 100, y: 80, label: "x" },
  { type: "xor-gate", id: "xor3", x: 100, y: 160, label: "t" },
  { type: "and-gate", id: "and1", x: 220, y: 120, label: "g" },
  { type: "xor-gate", id: "xor4", x: 340, y: 160, label: "Bout" },
  { type: "wire", id: "wx", points: [{ x: 128, y: 80 }, { x: 160, y: 80 }, { x: 160, y: 112 }, { x: 194, y: 112 }], highlight: true },
  { type: "wire", id: "wt", points: [{ x: 128, y: 160 }, { x: 160, y: 160 }, { x: 160, y: 128 }, { x: 194, y: 128 }], highlight: true },
  { type: "wire", id: "wg", points: [{ x: 246, y: 120 }, { x: 280, y: 120 }, { x: 280, y: 168 }, { x: 312, y: 168 }], highlight: true },
  { type: "label", id: "lx", x: 140, y: 65, text: "x=A⊕B" },
  { type: "label", id: "lt", x: 140, y: 180, text: "t=B⊕Bin" },
  { type: "label", id: "lg", x: 260, y: 100, text: "g=x·t" },
  { type: "label", id: "desc", x: 225, y: 260, text: "x and t to AND, g to Bout-XOR" },
]};

/** Step 8: Wire outputs and ground */
export const step08: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 8: Complete Output Wiring" },
  { type: "xor-gate", id: "xor2", x: 120, y: 80, label: "Diff" },
  { type: "xor-gate", id: "xor4", x: 120, y: 180, label: "Bout" },
  { type: "wire", id: "wd", points: [{ x: 148, y: 80 }, { x: 220, y: 80 }], highlight: true },
  { type: "wire", id: "wb", points: [{ x: 148, y: 180 }, { x: 220, y: 180 }], highlight: true },
  { type: "resistor", id: "r1", x: 240, y: 80, label: "330" },
  { type: "resistor", id: "r2", x: 240, y: 180, label: "330" },
  { type: "led", id: "led1", x: 300, y: 80, label: "D" },
  { type: "led", id: "led2", x: 300, y: 180, label: "Bout" },
  { type: "wire", id: "wg1", points: [{ x: 300, y: 100 }, { x: 300, y: 130 }] },
  { type: "wire", id: "wg2", points: [{ x: 300, y: 200 }, { x: 300, y: 230 }] },
  { type: "wire", id: "wgnd", points: [{ x: 300, y: 130 }, { x: 350, y: 130 }, { x: 350, y: 230 }, { x: 300, y: 230 }] },
  { type: "ground", id: "gnd", x: 350, y: 250 },
  { type: "label", id: "desc", x: 225, y: 290, text: "Diff and Bout LEDs grounded" },
]};

/** Step 9: Test A=0, B=1, Bin=0 → D=1, Bout=1 */
export const step09: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 9: Test A=0, B=1, Bin=0" },
  { type: "label", id: "inputs", x: 225, y: 55, text: "0 - 1 - 0 = -1 (borrow needed)" },
  { type: "xor-gate", id: "xor1", x: 100, y: 100, label: "0⊕1=1" },
  { type: "xor-gate", id: "xor2", x: 220, y: 100, label: "1⊕0=1" },
  { type: "xor-gate", id: "xor3", x: 100, y: 180, label: "1⊕0=1" },
  { type: "and-gate", id: "and1", x: 220, y: 180, label: "1·1=1" },
  { type: "xor-gate", id: "xor4", x: 340, y: 200, label: "0⊕1=1" },
  { type: "wire", id: "w1", points: [{ x: 128, y: 100 }, { x: 192, y: 100 }] },
  { type: "wire", id: "w2", points: [{ x: 246, y: 180 }, { x: 312, y: 180 }, { x: 312, y: 208 }] },
  { type: "label", id: "res", x: 225, y: 260, text: "D=1, Bout=1 (result = -1₁₀)" },
]};

/** Step 10: Test A=1, B=1, Bin=1 → D=1, Bout=1 */
export const step10: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 225, y: 20, text: "Step 10: Test A=1, B=1, Bin=1" },
  { type: "label", id: "inputs", x: 225, y: 55, text: "1 - 1 - 1 = -1 (borrow needed)" },
  { type: "xor-gate", id: "xor1", x: 100, y: 100, label: "1⊕1=0" },
  { type: "xor-gate", id: "xor2", x: 220, y: 100, label: "0⊕1=1" },
  { type: "xor-gate", id: "xor3", x: 100, y: 180, label: "1⊕1=0" },
  { type: "and-gate", id: "and1", x: 220, y: 180, label: "0·0=0" },
  { type: "xor-gate", id: "xor4", x: 340, y: 200, label: "1⊕0=1" },
  { type: "wire", id: "w1", points: [{ x: 128, y: 100 }, { x: 192, y: 100 }] },
  { type: "wire", id: "w2", points: [{ x: 246, y: 180 }, { x: 312, y: 180 }, { x: 312, y: 208 }] },
  { type: "label", id: "res", x: 225, y: 260, text: "D=1, Bout=1 (result = -1₁₀)" },
]};

export const s2FullSubtractorStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10,
];

export const s2FullSubtractorTheoryDiagram: SchematicData = { width: 480, height: 300, elements: [
  { type: "label", id: "title", x: 240, y: 20, text: "Full Subtractor (5-Gate)" },
  // Inputs
  { type: "label", id: "la", x: 30, y: 80, text: "A" },
  { type: "label", id: "lb", x: 30, y: 110, text: "B" },
  { type: "label", id: "lbin", x: 30, y: 180, text: "Bin" },
  // Difference path
  { type: "xor-gate", id: "xor1", x: 120, y: 95, label: "x" },
  { type: "xor-gate", id: "xor2", x: 280, y: 110, label: "D" },
  { type: "wire", id: "wa", points: [{ x: 45, y: 80 }, { x: 92, y: 80 }, { x: 92, y: 87 }] },
  { type: "wire", id: "wb1", points: [{ x: 45, y: 110 }, { x: 92, y: 110 }, { x: 92, y: 103 }] },
  { type: "junction", id: "jb", x: 70, y: 110 },
  { type: "wire", id: "wx", points: [{ x: 148, y: 95 }, { x: 200, y: 95 }, { x: 200, y: 102 }, { x: 252, y: 102 }] },
  { type: "junction", id: "jx", x: 200, y: 95 },
  { type: "wire", id: "wbin1", points: [{ x: 45, y: 180 }, { x: 230, y: 180 }, { x: 230, y: 118 }, { x: 252, y: 118 }] },
  { type: "junction", id: "jbin1", x: 70, y: 180 },
  { type: "junction", id: "jbin2", x: 230, y: 180 },
  // Borrow path
  { type: "xor-gate", id: "xor3", x: 120, y: 200, label: "t" },
  { type: "and-gate", id: "and1", x: 280, y: 220, label: "g" },
  { type: "xor-gate", id: "xor4", x: 400, y: 240, label: "Bout" },
  { type: "wire", id: "wb2", points: [{ x: 70, y: 110 }, { x: 70, y: 192 }, { x: 92, y: 192 }] },
  { type: "wire", id: "wbin2", points: [{ x: 70, y: 180 }, { x: 70, y: 208 }, { x: 92, y: 208 }] },
  { type: "wire", id: "wt", points: [{ x: 148, y: 200 }, { x: 180, y: 200 }, { x: 180, y: 228 }, { x: 254, y: 228 }] },
  { type: "wire", id: "wx2", points: [{ x: 200, y: 95 }, { x: 200, y: 212 }, { x: 254, y: 212 }] },
  { type: "wire", id: "wg", points: [{ x: 306, y: 220 }, { x: 340, y: 220 }, { x: 340, y: 248 }, { x: 372, y: 248 }] },
  { type: "wire", id: "wbin3", points: [{ x: 230, y: 180 }, { x: 230, y: 232 }, { x: 372, y: 232 }] },
  { type: "label", id: "eq", x: 240, y: 285, text: "D = A⊕B⊕Bin, Bout = Bin⊕(x·t)" },
]};
