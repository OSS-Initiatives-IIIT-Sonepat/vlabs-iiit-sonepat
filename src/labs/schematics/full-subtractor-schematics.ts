import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * Full Subtractor — progressive 2D schematics.
 * Difference = A ⊕ B ⊕ Bin
 * Bout = A'·B + Bin·(A⊕B)' = A'·B + Bin·(A XNOR B)
 */

const W = 400;
const H = 260;

/** Step 1: Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Full Subtractor" },
  { type: "label", id: "lbl_eq1", x: 200, y: 60, text: "Diff = A ⊕ B ⊕ Bin" },
  { type: "label", id: "lbl_eq2", x: 200, y: 80, text: "Bout = A'B + Bin(A⊕B)'" },
]};

/** Step 2: XOR gates for Difference */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Full Subtractor — Difference" },
  { type: "xor-gate", id: "XOR1", x: 100, y: 70, highlight: true },
  { type: "xor-gate", id: "XOR2", x: 220, y: 80, highlight: true },
  { type: "wire", id: "w_a", points: [{ x: 40, y: 62 }, { x: 72, y: 62 }] },
  { type: "wire", id: "w_b", points: [{ x: 40, y: 78 }, { x: 72, y: 78 }] },
  { type: "wire", id: "w_xor1_xor2", points: [{ x: 128, y: 70 }, { x: 160, y: 70 }, { x: 160, y: 72 }, { x: 192, y: 72 }] },
  { type: "wire", id: "w_bin", points: [{ x: 40, y: 100 }, { x: 192, y: 88 }] },
  { type: "wire", id: "w_diff", points: [{ x: 248, y: 80 }, { x: 360, y: 80 }] },
  { type: "label", id: "lbl_a", x: 30, y: 62, text: "A" },
  { type: "label", id: "lbl_b", x: 30, y: 78, text: "B" },
  { type: "label", id: "lbl_bin", x: 25, y: 100, text: "Bin" },
  { type: "label", id: "lbl_diff", x: 370, y: 80, text: "D" },
]};

/** Steps 3-6: Complete circuit with borrow logic */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Full Subtractor — Complete" },
  // Main XOR gates for difference
  { type: "xor-gate", id: "XOR1", x: 100, y: 60 },
  { type: "xor-gate", id: "XOR2", x: 220, y: 70 },
  // NOT for A'
  { type: "not-gate", id: "NOT", x: 80, y: 130, highlight: true },
  // AND gates
  { type: "and-gate", id: "AND1", x: 150, y: 150, label: "A'B", highlight: true },
  { type: "and-gate", id: "AND2", x: 220, y: 190, highlight: true },
  // OR for Bout
  { type: "or-gate", id: "OR", x: 300, y: 170, highlight: true },
  // Input wires
  { type: "wire", id: "w_a_in", points: [{ x: 30, y: 80 }, { x: 45, y: 80 }] },
  { type: "wire", id: "w_b_in", points: [{ x: 30, y: 100 }, { x: 55, y: 100 }] },
  { type: "wire", id: "w_bin_in", points: [{ x: 30, y: 120 }, { x: 85, y: 120 }] },
  // A forks
  { type: "wire", id: "w_a_xor", points: [{ x: 45, y: 80 }, { x: 45, y: 52 }, { x: 72, y: 52 }] },
  { type: "wire", id: "w_a_not", points: [{ x: 45, y: 80 }, { x: 45, y: 130 }, { x: 58, y: 130 }] },
  // B forks
  { type: "wire", id: "w_b_xor", points: [{ x: 55, y: 100 }, { x: 55, y: 68 }, { x: 72, y: 68 }] },
  { type: "wire", id: "w_b_and1", points: [{ x: 55, y: 100 }, { x: 55, y: 158 }, { x: 124, y: 158 }] },
  // NOT to AND1
  { type: "wire", id: "w_not_and1", points: [{ x: 106, y: 130 }, { x: 115, y: 130 }, { x: 115, y: 142 }, { x: 124, y: 142 }] },
  // XOR1 to XOR2 and AND2
  { type: "wire", id: "w_xor1_xor2", points: [{ x: 128, y: 60 }, { x: 160, y: 60 }, { x: 160, y: 62 }, { x: 192, y: 62 }] },
  { type: "wire", id: "w_xor1_and2_inv", points: [{ x: 160, y: 60 }, { x: 160, y: 198 }, { x: 194, y: 198 }] },
  // Bin forks
  { type: "wire", id: "w_bin_xor2", points: [{ x: 85, y: 120 }, { x: 85, y: 78 }, { x: 192, y: 78 }] },
  { type: "wire", id: "w_bin_and2", points: [{ x: 85, y: 120 }, { x: 85, y: 182 }, { x: 194, y: 182 }] },
  // ANDs to OR
  { type: "wire", id: "w_and1_or", points: [{ x: 176, y: 150 }, { x: 260, y: 150 }, { x: 260, y: 162 }, { x: 274, y: 162 }] },
  { type: "wire", id: "w_and2_or", points: [{ x: 246, y: 190 }, { x: 260, y: 190 }, { x: 260, y: 178 }, { x: 274, y: 178 }] },
  // Outputs
  { type: "wire", id: "w_diff", points: [{ x: 248, y: 70 }, { x: 360, y: 70 }] },
  { type: "wire", id: "w_bout", points: [{ x: 326, y: 170 }, { x: 360, y: 170 }] },
  // LEDs
  { type: "led", id: "led_d", x: 370, y: 70, label: "D", color: "green" },
  { type: "led", id: "led_bo", x: 370, y: 170, label: "Bout", color: "red" },
  // Junctions
  { type: "junction", id: "j_a", x: 45, y: 80 },
  { type: "junction", id: "j_b", x: 55, y: 100 },
  { type: "junction", id: "j_bin", x: 85, y: 120 },
  { type: "junction", id: "j_xor1", x: 160, y: 60 },
  // Labels
  { type: "label", id: "lbl_a", x: 20, y: 80, text: "A" },
  { type: "label", id: "lbl_b", x: 20, y: 100, text: "B" },
  { type: "label", id: "lbl_bin", x: 15, y: 120, text: "Bin" },
]};

export const step04 = step03;
export const step05 = step03;
export const step06 = step03;

/** Indexed array */
export const fullSubtractorStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06,
];

/** Theory diagram */
export const fullSubtractorTheoryDiagram: SchematicData = step03;
