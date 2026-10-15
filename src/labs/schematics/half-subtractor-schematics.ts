import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * Half Subtractor — progressive 2D schematics.
 * Difference = A ⊕ B (XOR)
 * Borrow = A' · B (NOT-AND)
 */

const W = 360;
const H = 220;

/** Step 1: Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 180, y: 20, text: "Half Subtractor" },
  { type: "label", id: "lbl_eq1", x: 180, y: 60, text: "Difference = A ⊕ B" },
  { type: "label", id: "lbl_eq2", x: 180, y: 80, text: "Borrow = A' · B" },
]};

/** Step 2: XOR for Difference */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 180, y: 20, text: "Half Subtractor — Difference" },
  { type: "xor-gate", id: "XOR", x: 180, y: 80, label: "Diff", highlight: true },
  { type: "wire", id: "w_a1", points: [{ x: 60, y: 72 }, { x: 152, y: 72 }] },
  { type: "wire", id: "w_b1", points: [{ x: 60, y: 88 }, { x: 152, y: 88 }] },
  { type: "wire", id: "w_d", points: [{ x: 208, y: 80 }, { x: 300, y: 80 }] },
  { type: "label", id: "lbl_a", x: 50, y: 72, text: "A" },
  { type: "label", id: "lbl_b", x: 50, y: 88, text: "B" },
  { type: "label", id: "lbl_d", x: 310, y: 80, text: "D" },
]};

/** Step 3: NOT gate for A' */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 180, y: 20, text: "Half Subtractor — Invert A" },
  { type: "xor-gate", id: "XOR", x: 180, y: 70 },
  { type: "wire", id: "w_a1", points: [{ x: 60, y: 62 }, { x: 152, y: 62 }] },
  { type: "wire", id: "w_b1", points: [{ x: 60, y: 78 }, { x: 152, y: 78 }] },
  { type: "wire", id: "w_d", points: [{ x: 208, y: 70 }, { x: 300, y: 70 }] },
  // NOT gate
  { type: "not-gate", id: "NOT", x: 120, y: 140, highlight: true },
  { type: "wire", id: "w_a_not", points: [{ x: 80, y: 62 }, { x: 80, y: 140 }, { x: 98, y: 140 }] },
  { type: "junction", id: "j_a", x: 80, y: 62 },
  { type: "label", id: "lbl_a", x: 50, y: 62, text: "A" },
  { type: "label", id: "lbl_b", x: 50, y: 78, text: "B" },
  { type: "label", id: "lbl_d", x: 310, y: 70, text: "D" },
  { type: "label", id: "lbl_anot", x: 160, y: 140, text: "A'" },
]};

/** Step 4: AND gate for Borrow */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 180, y: 20, text: "Half Subtractor — Borrow" },
  { type: "xor-gate", id: "XOR", x: 180, y: 60 },
  { type: "not-gate", id: "NOT", x: 100, y: 130 },
  { type: "and-gate", id: "AND", x: 200, y: 160, highlight: true },
  // Input wires
  { type: "wire", id: "w_a_in", points: [{ x: 30, y: 90 }, { x: 70, y: 90 }] },
  { type: "wire", id: "w_b_in", points: [{ x: 30, y: 120 }, { x: 90, y: 120 }] },
  // A to XOR and NOT
  { type: "wire", id: "w_a_xor", points: [{ x: 70, y: 90 }, { x: 70, y: 52 }, { x: 152, y: 52 }] },
  { type: "wire", id: "w_a_not", points: [{ x: 70, y: 90 }, { x: 70, y: 130 }, { x: 78, y: 130 }] },
  // B to XOR and AND
  { type: "wire", id: "w_b_xor", points: [{ x: 90, y: 120 }, { x: 90, y: 68 }, { x: 152, y: 68 }] },
  { type: "wire", id: "w_b_and", points: [{ x: 90, y: 120 }, { x: 90, y: 168 }, { x: 174, y: 168 }] },
  // NOT to AND
  { type: "wire", id: "w_not_and", points: [{ x: 126, y: 130 }, { x: 150, y: 130 }, { x: 150, y: 152 }, { x: 174, y: 152 }] },
  // Outputs
  { type: "wire", id: "w_d", points: [{ x: 208, y: 60 }, { x: 300, y: 60 }] },
  { type: "wire", id: "w_b", points: [{ x: 226, y: 160 }, { x: 300, y: 160 }] },
  // LEDs
  { type: "led", id: "led_d", x: 320, y: 60, label: "D", color: "green" },
  { type: "led", id: "led_b", x: 320, y: 160, label: "Bo", color: "red", highlight: true },
  // Junctions
  { type: "junction", id: "j_a", x: 70, y: 90 },
  { type: "junction", id: "j_b", x: 90, y: 120 },
  // Labels
  { type: "label", id: "lbl_a", x: 20, y: 90, text: "A" },
  { type: "label", id: "lbl_b", x: 20, y: 120, text: "B" },
]};

// Steps 5-6 are the same
export const step05 = step04;
export const step06 = step04;

/** Indexed array */
export const halfSubtractorStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06,
];

/** Theory diagram */
export const halfSubtractorTheoryDiagram: SchematicData = step04;
