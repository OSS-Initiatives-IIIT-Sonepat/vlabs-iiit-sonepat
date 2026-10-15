import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * 2-to-1 Multiplexer — progressive 2D schematics.
 * Y = S'·I0 + S·I1
 */

const W = 360;
const H = 220;

/** Step 1: Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 180, y: 20, text: "2-to-1 Multiplexer" },
  { type: "label", id: "lbl_eq", x: 180, y: 60, text: "Y = S'·I0 + S·I1" },
  { type: "label", id: "lbl_desc", x: 180, y: 100, text: "Select S chooses I0 or I1" },
]};

/** Step 2: NOT gate for S' */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 180, y: 20, text: "MUX — Invert Select" },
  { type: "not-gate", id: "NOT", x: 80, y: 100, label: "S'", highlight: true },
  { type: "wire", id: "w_s_in", points: [{ x: 30, y: 100 }, { x: 58, y: 100 }] },
  { type: "label", id: "lbl_s", x: 20, y: 100, text: "S" },
]};

/** Step 3: AND gates for S'·I0 and S·I1 */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 180, y: 20, text: "MUX — AND Gates" },
  { type: "not-gate", id: "NOT", x: 80, y: 110 },
  { type: "and-gate", id: "AND1", x: 180, y: 70, label: "S'·I0", highlight: true },
  { type: "and-gate", id: "AND2", x: 180, y: 150, label: "S·I1", highlight: true },
  // Input wires
  { type: "wire", id: "w_s_in", points: [{ x: 30, y: 110 }, { x: 50, y: 110 }] },
  { type: "wire", id: "w_i0_in", points: [{ x: 30, y: 60 }, { x: 154, y: 62 }] },
  { type: "wire", id: "w_i1_in", points: [{ x: 30, y: 160 }, { x: 154, y: 158 }] },
  // S fork
  { type: "wire", id: "w_s_not", points: [{ x: 50, y: 110 }, { x: 58, y: 110 }] },
  { type: "wire", id: "w_s_and2", points: [{ x: 50, y: 110 }, { x: 50, y: 142 }, { x: 154, y: 142 }] },
  // S' to AND1
  { type: "wire", id: "w_snot_and1", points: [{ x: 106, y: 110 }, { x: 130, y: 110 }, { x: 130, y: 78 }, { x: 154, y: 78 }] },
  // Junctions
  { type: "junction", id: "j_s", x: 50, y: 110 },
  // Labels
  { type: "label", id: "lbl_s", x: 20, y: 110, text: "S" },
  { type: "label", id: "lbl_i0", x: 20, y: 60, text: "I0" },
  { type: "label", id: "lbl_i1", x: 20, y: 160, text: "I1" },
]};

/** Step 4-6: Complete circuit with OR gate */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 180, y: 20, text: "MUX 2:1 — Complete" },
  { type: "not-gate", id: "NOT", x: 80, y: 110 },
  { type: "and-gate", id: "AND1", x: 180, y: 70 },
  { type: "and-gate", id: "AND2", x: 180, y: 150 },
  { type: "or-gate", id: "OR", x: 280, y: 110, label: "Y", highlight: true },
  // Input wires
  { type: "wire", id: "w_s_in", points: [{ x: 30, y: 110 }, { x: 50, y: 110 }] },
  { type: "wire", id: "w_i0_in", points: [{ x: 30, y: 60 }, { x: 154, y: 62 }] },
  { type: "wire", id: "w_i1_in", points: [{ x: 30, y: 160 }, { x: 154, y: 158 }] },
  // S fork
  { type: "wire", id: "w_s_not", points: [{ x: 50, y: 110 }, { x: 58, y: 110 }] },
  { type: "wire", id: "w_s_and2", points: [{ x: 50, y: 110 }, { x: 50, y: 142 }, { x: 154, y: 142 }] },
  // S' to AND1
  { type: "wire", id: "w_snot_and1", points: [{ x: 106, y: 110 }, { x: 130, y: 110 }, { x: 130, y: 78 }, { x: 154, y: 78 }] },
  // ANDs to OR
  { type: "wire", id: "w_and1_or", points: [{ x: 206, y: 70 }, { x: 240, y: 70 }, { x: 240, y: 102 }, { x: 254, y: 102 }] },
  { type: "wire", id: "w_and2_or", points: [{ x: 206, y: 150 }, { x: 240, y: 150 }, { x: 240, y: 118 }, { x: 254, y: 118 }] },
  // Output
  { type: "wire", id: "w_y", points: [{ x: 306, y: 110 }, { x: 340, y: 110 }] },
  { type: "led", id: "led_y", x: 350, y: 110, label: "Y", color: "green" },
  // Junctions
  { type: "junction", id: "j_s", x: 50, y: 110 },
  // Labels
  { type: "label", id: "lbl_s", x: 20, y: 110, text: "S" },
  { type: "label", id: "lbl_i0", x: 20, y: 60, text: "I0" },
  { type: "label", id: "lbl_i1", x: 20, y: 160, text: "I1" },
  { type: "label", id: "lbl_truth", x: 180, y: 200, text: "S=0→Y=I0, S=1→Y=I1" },
]};

export const step05 = step04;
export const step06 = step04;

/** Indexed array */
export const mux2to1StepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06,
];

/** Theory diagram */
export const mux2to1TheoryDiagram: SchematicData = step04;
