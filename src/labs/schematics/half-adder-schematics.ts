import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * Half Adder — progressive 2D schematics.
 * Sum = A ⊕ B (XOR)
 * Carry = A · B (AND)
 */

const W = 340;
const H = 220;

/** Step 1: Introduction — show block diagram */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_title", x: 170, y: 20, text: "Half Adder" },
    { type: "label", id: "lbl_eq1", x: 170, y: 60, text: "Sum = A ⊕ B" },
    { type: "label", id: "lbl_eq2", x: 170, y: 80, text: "Carry = A · B" },
    { type: "label", id: "lbl_inputs", x: 60, y: 140, text: "Inputs: A, B" },
    { type: "label", id: "lbl_outputs", x: 260, y: 140, text: "Outputs: S, C" },
  ],
};

/** Step 2: Place XOR gate for Sum */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 170,
      y: 20,
      text: "Half Adder — Sum Circuit",
    },
    {
      type: "xor-gate",
      id: "XOR",
      x: 170,
      y: 80,
      label: "Sum",
      highlight: true,
    },
    {
      type: "wire",
      id: "w_a1",
      points: [
        { x: 60, y: 72 },
        { x: 142, y: 72 },
      ],
    },
    {
      type: "wire",
      id: "w_b1",
      points: [
        { x: 60, y: 88 },
        { x: 142, y: 88 },
      ],
    },
    {
      type: "wire",
      id: "w_s",
      points: [
        { x: 198, y: 80 },
        { x: 280, y: 80 },
      ],
    },
    { type: "label", id: "lbl_a", x: 50, y: 72, text: "A" },
    { type: "label", id: "lbl_b", x: 50, y: 88, text: "B" },
    { type: "label", id: "lbl_s", x: 290, y: 80, text: "S" },
  ],
};

/** Step 3: Place AND gate for Carry */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 170,
      y: 20,
      text: "Half Adder — Carry Circuit",
    },
    { type: "xor-gate", id: "XOR", x: 170, y: 70, label: "Sum" },
    {
      type: "wire",
      id: "w_a1",
      points: [
        { x: 60, y: 62 },
        { x: 142, y: 62 },
      ],
    },
    {
      type: "wire",
      id: "w_b1",
      points: [
        { x: 60, y: 78 },
        { x: 142, y: 78 },
      ],
    },
    {
      type: "wire",
      id: "w_s",
      points: [
        { x: 198, y: 70 },
        { x: 280, y: 70 },
      ],
    },
    {
      type: "and-gate",
      id: "AND",
      x: 170,
      y: 140,
      label: "Carry",
      highlight: true,
    },
    {
      type: "wire",
      id: "w_a2",
      points: [
        { x: 60, y: 132 },
        { x: 144, y: 132 },
      ],
    },
    {
      type: "wire",
      id: "w_b2",
      points: [
        { x: 60, y: 148 },
        { x: 144, y: 148 },
      ],
    },
    {
      type: "wire",
      id: "w_c",
      points: [
        { x: 196, y: 140 },
        { x: 280, y: 140 },
      ],
    },
    { type: "label", id: "lbl_a", x: 50, y: 62, text: "A" },
    { type: "label", id: "lbl_b", x: 50, y: 78, text: "B" },
    { type: "label", id: "lbl_s", x: 290, y: 70, text: "S" },
    { type: "label", id: "lbl_c", x: 290, y: 140, text: "C" },
    { type: "junction", id: "j_a", x: 80, y: 62 },
    { type: "junction", id: "j_b", x: 80, y: 78 },
    {
      type: "wire",
      id: "w_a_fork",
      points: [
        { x: 80, y: 62 },
        { x: 80, y: 132 },
        { x: 60, y: 132 },
      ],
    },
    {
      type: "wire",
      id: "w_b_fork",
      points: [
        { x: 80, y: 78 },
        { x: 80, y: 148 },
        { x: 60, y: 148 },
      ],
    },
  ],
};

/** Step 4-9: Wire inputs A and B + verify truth table (simplified to main steps) */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 170,
      y: 20,
      text: "Half Adder — Complete Circuit",
    },
    // XOR for Sum
    { type: "xor-gate", id: "XOR", x: 170, y: 70, label: "Sum" },
    { type: "and-gate", id: "AND", x: 170, y: 140, label: "Carry" },
    // Input wires
    {
      type: "wire",
      id: "w_a_in",
      points: [
        { x: 30, y: 100 },
        { x: 80, y: 100 },
      ],
    },
    {
      type: "wire",
      id: "w_b_in",
      points: [
        { x: 30, y: 130 },
        { x: 100, y: 130 },
      ],
    },
    // Fork A to both gates
    {
      type: "wire",
      id: "w_a_xor",
      points: [
        { x: 80, y: 100 },
        { x: 80, y: 62 },
        { x: 142, y: 62 },
      ],
    },
    {
      type: "wire",
      id: "w_a_and",
      points: [
        { x: 80, y: 100 },
        { x: 80, y: 132 },
        { x: 144, y: 132 },
      ],
    },
    // Fork B to both gates
    {
      type: "wire",
      id: "w_b_xor",
      points: [
        { x: 100, y: 130 },
        { x: 100, y: 78 },
        { x: 142, y: 78 },
      ],
    },
    {
      type: "wire",
      id: "w_b_and",
      points: [
        { x: 100, y: 130 },
        { x: 100, y: 148 },
        { x: 144, y: 148 },
      ],
    },
    // Outputs
    {
      type: "wire",
      id: "w_s",
      points: [
        { x: 198, y: 70 },
        { x: 280, y: 70 },
      ],
    },
    {
      type: "wire",
      id: "w_c",
      points: [
        { x: 196, y: 140 },
        { x: 280, y: 140 },
      ],
    },
    // LEDs
    {
      type: "led",
      id: "led_s",
      x: 300,
      y: 70,
      label: "S",
      color: "green",
      highlight: true,
    },
    {
      type: "led",
      id: "led_c",
      x: 300,
      y: 140,
      label: "C",
      color: "red",
      highlight: true,
    },
    // Junctions
    { type: "junction", id: "j_a", x: 80, y: 100 },
    { type: "junction", id: "j_b", x: 100, y: 130 },
    // Labels
    { type: "label", id: "lbl_a", x: 20, y: 100, text: "A" },
    { type: "label", id: "lbl_b", x: 20, y: 130, text: "B" },
  ],
};

// Steps 5-9 are the same final circuit (truth table verification)
export const step05 = step04;
export const step06 = step04;
export const step07 = step04;
export const step08 = step04;
export const step09 = step04;

/** Indexed array */
export const halfAdderStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
  step07,
  step08,
  step09,
];

/** Theory diagram */
export const halfAdderTheoryDiagram: SchematicData = step04;
