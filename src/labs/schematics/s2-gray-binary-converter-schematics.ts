import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * S2 Gray-Binary Converter (Binary to Gray)
 * G3=B3, G2=B3⊕B2, G1=B2⊕B1, G0=B1⊕B0
 */

const W = 420;
const H = 280;

/** Step 1: Breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 1: Breadboard Setup" },
  { type: "vsource", id: "vcc", x: 60, y: 100, label: "+5V" },
  { type: "ground", id: "gnd", x: 60, y: 180 },
  { type: "wire", id: "w1", points: [{ x: 60, y: 80 }, { x: 360, y: 80 }], highlight: true },
  { type: "wire", id: "w2", points: [{ x: 60, y: 180 }, { x: 360, y: 180 }], highlight: true },
  { type: "label", id: "desc", x: 210, y: 240, text: "4-bit Binary to Gray converter" },
]};

/** Step 2: Mount XOR gates */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 2: Mount XOR Gates" },
  { type: "xor-gate", id: "xor1", x: 200, y: 80, label: "G2", highlight: true },
  { type: "xor-gate", id: "xor2", x: 200, y: 140, label: "G1", highlight: true },
  { type: "xor-gate", id: "xor3", x: 200, y: 200, label: "G0", highlight: true },
  { type: "label", id: "eq1", x: 320, y: 80, text: "G2 = B3⊕B2" },
  { type: "label", id: "eq2", x: 320, y: 140, text: "G1 = B2⊕B1" },
  { type: "label", id: "eq3", x: 320, y: 200, text: "G0 = B1⊕B0" },
  { type: "label", id: "g3", x: 210, y: 250, text: "G3 = B3 (passthrough)" },
]};

/** Step 3: Wire binary inputs */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 3: Wire Binary Inputs" },
  { type: "label", id: "lb3", x: 30, y: 60, text: "B3" },
  { type: "label", id: "lb2", x: 30, y: 100, text: "B2" },
  { type: "label", id: "lb1", x: 30, y: 140, text: "B1" },
  { type: "label", id: "lb0", x: 30, y: 180, text: "B0" },
  { type: "wire", id: "wb3", points: [{ x: 50, y: 60 }, { x: 380, y: 60 }], highlight: true },
  { type: "wire", id: "wb2", points: [{ x: 50, y: 100 }, { x: 380, y: 100 }], highlight: true },
  { type: "wire", id: "wb1", points: [{ x: 50, y: 140 }, { x: 380, y: 140 }], highlight: true },
  { type: "wire", id: "wb0", points: [{ x: 50, y: 180 }, { x: 380, y: 180 }], highlight: true },
  { type: "junction", id: "jb3", x: 100, y: 60 },
  { type: "junction", id: "jb2", x: 140, y: 100 },
  { type: "junction", id: "jb1", x: 180, y: 140 },
  { type: "label", id: "note", x: 210, y: 240, text: "B3→G3, B3/B2→XOR, B2/B1→XOR, B1/B0→XOR" },
]};

/** Step 4: Add resistors and LEDs */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 4: Output LEDs" },
  { type: "resistor", id: "r1", x: 80, y: 100, label: "330" },
  { type: "led", id: "led1", x: 80, y: 140, label: "G3", highlight: true },
  { type: "resistor", id: "r2", x: 160, y: 100, label: "330" },
  { type: "led", id: "led2", x: 160, y: 140, label: "G2", highlight: true },
  { type: "resistor", id: "r3", x: 240, y: 100, label: "330" },
  { type: "led", id: "led3", x: 240, y: 140, label: "G1", highlight: true },
  { type: "resistor", id: "r4", x: 320, y: 100, label: "330" },
  { type: "led", id: "led4", x: 320, y: 140, label: "G0", highlight: true },
  { type: "label", id: "colors", x: 210, y: 200, text: "G3=Red, G2=Yellow, G1=Green, G0=Blue" },
]};

/** Step 5: Connect outputs and ground */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 5: Output Wiring" },
  { type: "wire", id: "wg3", points: [{ x: 60, y: 60 }, { x: 60, y: 100 }], highlight: true },
  { type: "xor-gate", id: "xor1", x: 140, y: 100, label: "G2" },
  { type: "xor-gate", id: "xor2", x: 220, y: 100, label: "G1" },
  { type: "xor-gate", id: "xor3", x: 300, y: 100, label: "G0" },
  { type: "wire", id: "wo1", points: [{ x: 168, y: 100 }, { x: 168, y: 140 }], highlight: true },
  { type: "wire", id: "wo2", points: [{ x: 248, y: 100 }, { x: 248, y: 140 }], highlight: true },
  { type: "wire", id: "wo3", points: [{ x: 328, y: 100 }, { x: 328, y: 140 }], highlight: true },
  { type: "led", id: "led1", x: 60, y: 120, label: "G3" },
  { type: "led", id: "led2", x: 168, y: 160, label: "G2" },
  { type: "led", id: "led3", x: 248, y: 160, label: "G1" },
  { type: "led", id: "led4", x: 328, y: 160, label: "G0" },
  { type: "label", id: "desc", x: 210, y: 240, text: "B3 direct to G3, XOR outputs to G2-G0" },
]};

/** Step 6: Test Binary 0011 → Gray 0010 */
export const step06: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 6: Test Binary 0011 (3)" },
  { type: "label", id: "input", x: 210, y: 55, text: "B3=0, B2=0, B1=1, B0=1" },
  { type: "label", id: "g3", x: 100, y: 100, text: "G3 = B3 = 0" },
  { type: "label", id: "g2", x: 100, y: 130, text: "G2 = 0⊕0 = 0" },
  { type: "label", id: "g1", x: 100, y: 160, text: "G1 = 0⊕1 = 1" },
  { type: "label", id: "g0", x: 100, y: 190, text: "G0 = 1⊕1 = 0" },
  { type: "label", id: "result", x: 210, y: 240, text: "Gray code: 0010 ✓" },
]};

/** Step 7: Test Binary 0111 → Gray 0100 */
export const step07: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "title", x: 210, y: 20, text: "Step 7: Test Binary 0111 (7)" },
  { type: "label", id: "input", x: 210, y: 55, text: "B3=0, B2=1, B1=1, B0=1" },
  { type: "label", id: "g3", x: 100, y: 100, text: "G3 = B3 = 0" },
  { type: "label", id: "g2", x: 100, y: 130, text: "G2 = 0⊕1 = 1" },
  { type: "label", id: "g1", x: 100, y: 160, text: "G1 = 1⊕1 = 0" },
  { type: "label", id: "g0", x: 100, y: 190, text: "G0 = 1⊕1 = 0" },
  { type: "label", id: "result", x: 210, y: 240, text: "Gray code: 0100 ✓" },
]};

export const s2GrayBinaryConverterStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07,
];

export const s2GrayBinaryConverterTheoryDiagram: SchematicData = { width: 400, height: 280, elements: [
  { type: "label", id: "title", x: 200, y: 20, text: "Binary to Gray Code Converter" },
  // Inputs
  { type: "label", id: "lb3", x: 30, y: 60, text: "B3" },
  { type: "label", id: "lb2", x: 30, y: 100, text: "B2" },
  { type: "label", id: "lb1", x: 30, y: 140, text: "B1" },
  { type: "label", id: "lb0", x: 30, y: 180, text: "B0" },
  // G3 passthrough
  { type: "wire", id: "wb3", points: [{ x: 50, y: 60 }, { x: 350, y: 60 }] },
  { type: "junction", id: "jb3", x: 100, y: 60 },
  { type: "label", id: "lg3", x: 370, y: 60, text: "G3" },
  // XOR gates
  { type: "xor-gate", id: "xor1", x: 200, y: 80, label: "⊕" },
  { type: "xor-gate", id: "xor2", x: 200, y: 120, label: "⊕" },
  { type: "xor-gate", id: "xor3", x: 200, y: 160, label: "⊕" },
  // Wiring
  { type: "wire", id: "w1a", points: [{ x: 100, y: 60 }, { x: 100, y: 72 }, { x: 172, y: 72 }] },
  { type: "wire", id: "wb2", points: [{ x: 50, y: 100 }, { x: 172, y: 100 }] },
  { type: "junction", id: "jb2", x: 120, y: 100 },
  { type: "wire", id: "w2a", points: [{ x: 120, y: 100 }, { x: 120, y: 88 }, { x: 172, y: 88 }] },
  { type: "wire", id: "w2b", points: [{ x: 120, y: 100 }, { x: 120, y: 112 }, { x: 172, y: 112 }] },
  { type: "wire", id: "wb1", points: [{ x: 50, y: 140 }, { x: 172, y: 140 }] },
  { type: "junction", id: "jb1", x: 140, y: 140 },
  { type: "wire", id: "w3a", points: [{ x: 140, y: 140 }, { x: 140, y: 128 }, { x: 172, y: 128 }] },
  { type: "wire", id: "w3b", points: [{ x: 140, y: 140 }, { x: 140, y: 152 }, { x: 172, y: 152 }] },
  { type: "wire", id: "wb0", points: [{ x: 50, y: 180 }, { x: 160, y: 180 }, { x: 160, y: 168 }, { x: 172, y: 168 }] },
  // Outputs
  { type: "wire", id: "wg2", points: [{ x: 228, y: 80 }, { x: 350, y: 80 }] },
  { type: "wire", id: "wg1", points: [{ x: 228, y: 120 }, { x: 350, y: 120 }] },
  { type: "wire", id: "wg0", points: [{ x: 228, y: 160 }, { x: 350, y: 160 }] },
  { type: "label", id: "lg2", x: 370, y: 80, text: "G2" },
  { type: "label", id: "lg1", x: 370, y: 120, text: "G1" },
  { type: "label", id: "lg0", x: 370, y: 160, text: "G0" },
  // Formula
  { type: "label", id: "eq", x: 200, y: 220, text: "Gi = Bi+1 ⊕ Bi (MSB passes through)" },
  { type: "label", id: "prop", x: 200, y: 250, text: "Adjacent codes differ by 1 bit" },
]};
