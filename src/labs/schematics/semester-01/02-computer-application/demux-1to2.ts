import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * 1-to-2 Demultiplexer — progressive 2D schematics.
 * Y0 = S'·D, Y1 = S·D
 */

const W = 360;
const H = 220;

/** Step 1: Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 180, y: 20, text: "1-to-2 Demultiplexer" },
  { type: "label", id: "lbl_eq1", x: 180, y: 60, text: "Y0 = S'·D" },
  { type: "label", id: "lbl_eq2", x: 180, y: 80, text: "Y1 = S·D" },
  { type: "label", id: "lbl_desc", x: 180, y: 120, text: "Route D to Y0 or Y1 based on S" },
]};

/** Step 2: NOT gate for S' */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 180, y: 20, text: "DEMUX — Invert Select" },
  { type: "not-gate", id: "NOT", x: 100, y: 130, highlight: true },
  { type: "wire", id: "w_s_in", points: [{ x: 30, y: 130 }, { x: 78, y: 130 }] },
  { type: "label", id: "lbl_s", x: 20, y: 130, text: "S" },
]};

/** Step 3: AND gates */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 180, y: 20, text: "DEMUX — AND Gates" },
  { type: "not-gate", id: "NOT", x: 100, y: 130 },
  { type: "and-gate", id: "AND1", x: 220, y: 70, label: "Y0", highlight: true },
  { type: "and-gate", id: "AND2", x: 220, y: 150, label: "Y1", highlight: true },
  // Input wires
  { type: "wire", id: "w_s_in", points: [{ x: 30, y: 130 }, { x: 50, y: 130 }] },
  { type: "wire", id: "w_d_in", points: [{ x: 30, y: 90 }, { x: 70, y: 90 }] },
  // S fork
  { type: "wire", id: "w_s_not", points: [{ x: 50, y: 130 }, { x: 78, y: 130 }] },
  { type: "wire", id: "w_s_and2", points: [{ x: 50, y: 130 }, { x: 50, y: 158 }, { x: 194, y: 158 }] },
  // S' to AND1
  { type: "wire", id: "w_snot_and1", points: [{ x: 126, y: 130 }, { x: 160, y: 130 }, { x: 160, y: 78 }, { x: 194, y: 78 }] },
  // D fork
  { type: "wire", id: "w_d_and1", points: [{ x: 70, y: 90 }, { x: 70, y: 62 }, { x: 194, y: 62 }] },
  { type: "wire", id: "w_d_and2", points: [{ x: 70, y: 90 }, { x: 70, y: 142 }, { x: 194, y: 142 }] },
  // Junctions
  { type: "junction", id: "j_s", x: 50, y: 130 },
  { type: "junction", id: "j_d", x: 70, y: 90 },
  // Labels
  { type: "label", id: "lbl_s", x: 20, y: 130, text: "S" },
  { type: "label", id: "lbl_d", x: 20, y: 90, text: "D" },
]};

/** Step 4-5: Complete circuit */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 180, y: 20, text: "DEMUX 1:2 — Complete" },
  { type: "not-gate", id: "NOT", x: 100, y: 130 },
  { type: "and-gate", id: "AND1", x: 220, y: 70 },
  { type: "and-gate", id: "AND2", x: 220, y: 150 },
  // Input wires
  { type: "wire", id: "w_s_in", points: [{ x: 30, y: 130 }, { x: 50, y: 130 }] },
  { type: "wire", id: "w_d_in", points: [{ x: 30, y: 90 }, { x: 70, y: 90 }] },
  // S fork
  { type: "wire", id: "w_s_not", points: [{ x: 50, y: 130 }, { x: 78, y: 130 }] },
  { type: "wire", id: "w_s_and2", points: [{ x: 50, y: 130 }, { x: 50, y: 158 }, { x: 194, y: 158 }] },
  // S' to AND1
  { type: "wire", id: "w_snot_and1", points: [{ x: 126, y: 130 }, { x: 160, y: 130 }, { x: 160, y: 78 }, { x: 194, y: 78 }] },
  // D fork
  { type: "wire", id: "w_d_and1", points: [{ x: 70, y: 90 }, { x: 70, y: 62 }, { x: 194, y: 62 }] },
  { type: "wire", id: "w_d_and2", points: [{ x: 70, y: 90 }, { x: 70, y: 142 }, { x: 194, y: 142 }] },
  // Outputs
  { type: "wire", id: "w_y0", points: [{ x: 246, y: 70 }, { x: 300, y: 70 }] },
  { type: "wire", id: "w_y1", points: [{ x: 246, y: 150 }, { x: 300, y: 150 }] },
  { type: "led", id: "led_y0", x: 320, y: 70, label: "Y0", color: "green", highlight: true },
  { type: "led", id: "led_y1", x: 320, y: 150, label: "Y1", color: "yellow", highlight: true },
  { type: "wire", id: "w_y0_gnd", points: [{ x: 340, y: 70 }, { x: 345, y: 70 }, { x: 345, y: 80 }] },
  { type: "ground", id: "gnd_y0", x: 345, y: 80 },
  { type: "wire", id: "w_y1_gnd", points: [{ x: 340, y: 150 }, { x: 345, y: 150 }, { x: 345, y: 160 }] },
  { type: "ground", id: "gnd_y1", x: 345, y: 160 },
  // Junctions
  { type: "junction", id: "j_s", x: 50, y: 130 },
  { type: "junction", id: "j_d", x: 70, y: 90 },
  // Labels
  { type: "label", id: "lbl_s", x: 20, y: 130, text: "S" },
  { type: "label", id: "lbl_d", x: 20, y: 90, text: "D" },
  { type: "label", id: "lbl_truth", x: 180, y: 200, text: "S=0→Y0=D, S=1→Y1=D" },
]};

export const step05 = step04;

/** Indexed array */
export const demux1to2StepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
];

/** Theory diagram */
export const demux1to2TheoryDiagram: SchematicData = step04;
