import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * Full Adder — progressive 2D schematics.
 * Sum = A ⊕ B ⊕ Cin
 * Cout = (A·B) + (Cin·(A⊕B))
 */

const W = 400;
const H = 260;

/** Step 1: Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Full Adder" },
  { type: "label", id: "lbl_eq1", x: 200, y: 60, text: "Sum = A ⊕ B ⊕ Cin" },
  { type: "label", id: "lbl_eq2", x: 200, y: 80, text: "Cout = AB + Cin(A⊕B)" },
  { type: "label", id: "lbl_desc", x: 200, y: 120, text: "Two half-adders + OR gate" },
]};

/** Step 2: First XOR (A ⊕ B) */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Full Adder — Step 1: A⊕B" },
  { type: "xor-gate", id: "XOR1", x: 120, y: 80, label: "XOR1", highlight: true },
  { type: "wire", id: "w_a", points: [{ x: 40, y: 72 }, { x: 92, y: 72 }] },
  { type: "wire", id: "w_b", points: [{ x: 40, y: 88 }, { x: 92, y: 88 }] },
  { type: "wire", id: "w_ab", points: [{ x: 148, y: 80 }, { x: 180, y: 80 }] },
  { type: "label", id: "lbl_a", x: 30, y: 72, text: "A" },
  { type: "label", id: "lbl_b", x: 30, y: 88, text: "B" },
  { type: "label", id: "lbl_ab", x: 190, y: 80, text: "A⊕B" },
]};

/** Step 3: Second XOR ((A⊕B) ⊕ Cin) = Sum */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Full Adder — Step 2: Sum" },
  { type: "xor-gate", id: "XOR1", x: 120, y: 70 },
  { type: "xor-gate", id: "XOR2", x: 250, y: 90, label: "XOR2", highlight: true },
  { type: "wire", id: "w_a", points: [{ x: 40, y: 62 }, { x: 92, y: 62 }] },
  { type: "wire", id: "w_b", points: [{ x: 40, y: 78 }, { x: 92, y: 78 }] },
  { type: "wire", id: "w_ab_xor2", points: [{ x: 148, y: 70 }, { x: 200, y: 70 }, { x: 200, y: 82 }, { x: 222, y: 82 }] },
  { type: "wire", id: "w_cin", points: [{ x: 40, y: 98 }, { x: 222, y: 98 }] },
  { type: "wire", id: "w_sum", points: [{ x: 278, y: 90 }, { x: 360, y: 90 }] },
  { type: "label", id: "lbl_a", x: 30, y: 62, text: "A" },
  { type: "label", id: "lbl_b", x: 30, y: 78, text: "B" },
  { type: "label", id: "lbl_cin", x: 25, y: 98, text: "Cin" },
  { type: "label", id: "lbl_sum", x: 370, y: 90, text: "Sum" },
]};

/** Step 4: First AND (A · B) */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Full Adder — Step 3: A·B" },
  { type: "xor-gate", id: "XOR1", x: 120, y: 60 },
  { type: "xor-gate", id: "XOR2", x: 250, y: 80 },
  { type: "and-gate", id: "AND1", x: 120, y: 140, label: "AND1", highlight: true },
  // Inputs
  { type: "wire", id: "w_a_in", points: [{ x: 40, y: 80 }, { x: 60, y: 80 }] },
  { type: "wire", id: "w_b_in", points: [{ x: 40, y: 100 }, { x: 70, y: 100 }] },
  // A fork
  { type: "wire", id: "w_a_xor", points: [{ x: 60, y: 80 }, { x: 60, y: 52 }, { x: 92, y: 52 }] },
  { type: "wire", id: "w_a_and", points: [{ x: 60, y: 80 }, { x: 60, y: 132 }, { x: 94, y: 132 }] },
  // B fork
  { type: "wire", id: "w_b_xor", points: [{ x: 70, y: 100 }, { x: 70, y: 68 }, { x: 92, y: 68 }] },
  { type: "wire", id: "w_b_and", points: [{ x: 70, y: 100 }, { x: 70, y: 148 }, { x: 94, y: 148 }] },
  // Rest
  { type: "wire", id: "w_ab_xor2", points: [{ x: 148, y: 60 }, { x: 200, y: 60 }, { x: 200, y: 72 }, { x: 222, y: 72 }] },
  { type: "wire", id: "w_cin", points: [{ x: 40, y: 120 }, { x: 222, y: 88 }] },
  { type: "wire", id: "w_sum", points: [{ x: 278, y: 80 }, { x: 360, y: 80 }] },
  { type: "junction", id: "j_a", x: 60, y: 80 },
  { type: "junction", id: "j_b", x: 70, y: 100 },
  { type: "label", id: "lbl_a", x: 30, y: 80, text: "A" },
  { type: "label", id: "lbl_b", x: 30, y: 100, text: "B" },
  { type: "label", id: "lbl_cin", x: 25, y: 120, text: "Cin" },
  { type: "label", id: "lbl_sum", x: 370, y: 80, text: "Sum" },
]};

/** Steps 5-7: Complete circuit with both ANDs + OR for Cout */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Full Adder — Complete" },
  // Gates
  { type: "xor-gate", id: "XOR1", x: 100, y: 60 },
  { type: "xor-gate", id: "XOR2", x: 220, y: 70 },
  { type: "and-gate", id: "AND1", x: 100, y: 140 },
  { type: "and-gate", id: "AND2", x: 220, y: 160, highlight: true },
  { type: "or-gate", id: "OR", x: 320, y: 150, highlight: true },
  // Input wires
  { type: "wire", id: "w_a_in", points: [{ x: 30, y: 70 }, { x: 50, y: 70 }] },
  { type: "wire", id: "w_b_in", points: [{ x: 30, y: 90 }, { x: 60, y: 90 }] },
  { type: "wire", id: "w_cin_in", points: [{ x: 30, y: 110 }, { x: 80, y: 110 }] },
  // A forks
  { type: "wire", id: "w_a_xor", points: [{ x: 50, y: 70 }, { x: 50, y: 52 }, { x: 72, y: 52 }] },
  { type: "wire", id: "w_a_and", points: [{ x: 50, y: 70 }, { x: 50, y: 132 }, { x: 74, y: 132 }] },
  // B forks
  { type: "wire", id: "w_b_xor", points: [{ x: 60, y: 90 }, { x: 60, y: 68 }, { x: 72, y: 68 }] },
  { type: "wire", id: "w_b_and", points: [{ x: 60, y: 90 }, { x: 60, y: 148 }, { x: 74, y: 148 }] },
  // XOR1 to XOR2
  { type: "wire", id: "w_xor1_xor2", points: [{ x: 128, y: 60 }, { x: 160, y: 60 }, { x: 160, y: 62 }, { x: 192, y: 62 }] },
  // XOR1 to AND2
  { type: "wire", id: "w_xor1_and2", points: [{ x: 160, y: 60 }, { x: 160, y: 152 }, { x: 194, y: 152 }] },
  // Cin forks
  { type: "wire", id: "w_cin_xor2", points: [{ x: 80, y: 110 }, { x: 80, y: 78 }, { x: 192, y: 78 }] },
  { type: "wire", id: "w_cin_and2", points: [{ x: 80, y: 110 }, { x: 80, y: 168 }, { x: 194, y: 168 }] },
  // AND outputs to OR
  { type: "wire", id: "w_and1_or", points: [{ x: 126, y: 140 }, { x: 280, y: 140 }, { x: 280, y: 142 }, { x: 294, y: 142 }] },
  { type: "wire", id: "w_and2_or", points: [{ x: 246, y: 160 }, { x: 270, y: 160 }, { x: 270, y: 158 }, { x: 294, y: 158 }] },
  // Outputs
  { type: "wire", id: "w_sum", points: [{ x: 248, y: 70 }, { x: 370, y: 70 }] },
  { type: "wire", id: "w_cout", points: [{ x: 346, y: 150 }, { x: 370, y: 150 }] },
  // LEDs
  { type: "led", id: "led_s", x: 380, y: 70, label: "S", color: "green" },
  { type: "led", id: "led_c", x: 380, y: 150, label: "Cout", color: "red" },
  // Junctions
  { type: "junction", id: "j_a", x: 50, y: 70 },
  { type: "junction", id: "j_b", x: 60, y: 90 },
  { type: "junction", id: "j_cin", x: 80, y: 110 },
  { type: "junction", id: "j_xor1", x: 160, y: 60 },
  // Labels
  { type: "label", id: "lbl_a", x: 20, y: 70, text: "A" },
  { type: "label", id: "lbl_b", x: 20, y: 90, text: "B" },
  { type: "label", id: "lbl_cin", x: 15, y: 110, text: "Cin" },
]};

export const step06 = step05;
export const step07 = step05;

/** Indexed array */
export const fullAdderStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07,
];

/** Theory diagram */
export const fullAdderTheoryDiagram: SchematicData = step05;
