import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * Logic Gates — progressive 2D schematics for all 7 basic gates.
 * Shows each gate symbol with inputs and output.
 */

const W = 320;
const H = 200;

/** Step 1: AND gate */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_title", x: 160, y: 20, text: "AND Gate" },
    {
      type: "and-gate",
      id: "AND",
      x: 160,
      y: 100,
      label: "AND",
      highlight: true,
    },
    {
      type: "wire",
      id: "w_a",
      points: [
        { x: 80, y: 92 },
        { x: 134, y: 92 },
      ],
    },
    {
      type: "wire",
      id: "w_b",
      points: [
        { x: 80, y: 108 },
        { x: 134, y: 108 },
      ],
    },
    {
      type: "wire",
      id: "w_y",
      points: [
        { x: 186, y: 100 },
        { x: 240, y: 100 },
      ],
    },
    { type: "label", id: "lbl_a", x: 70, y: 92, text: "A" },
    { type: "label", id: "lbl_b", x: 70, y: 108, text: "B" },
    { type: "label", id: "lbl_y", x: 250, y: 100, text: "Y = A·B" },
    {
      type: "label",
      id: "lbl_truth",
      x: 160,
      y: 180,
      text: "Y=1 only when A=1 AND B=1",
    },
  ],
};

/** Step 2: OR gate */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_title", x: 160, y: 20, text: "OR Gate" },
    { type: "or-gate", id: "OR", x: 160, y: 100, label: "OR", highlight: true },
    {
      type: "wire",
      id: "w_a",
      points: [
        { x: 80, y: 92 },
        { x: 134, y: 92 },
      ],
    },
    {
      type: "wire",
      id: "w_b",
      points: [
        { x: 80, y: 108 },
        { x: 134, y: 108 },
      ],
    },
    {
      type: "wire",
      id: "w_y",
      points: [
        { x: 186, y: 100 },
        { x: 240, y: 100 },
      ],
    },
    { type: "label", id: "lbl_a", x: 70, y: 92, text: "A" },
    { type: "label", id: "lbl_b", x: 70, y: 108, text: "B" },
    { type: "label", id: "lbl_y", x: 250, y: 100, text: "Y = A+B" },
    {
      type: "label",
      id: "lbl_truth",
      x: 160,
      y: 180,
      text: "Y=1 when A=1 OR B=1 (or both)",
    },
  ],
};

/** Step 3: NOT gate */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 160,
      y: 20,
      text: "NOT Gate (Inverter)",
    },
    {
      type: "not-gate",
      id: "NOT",
      x: 160,
      y: 100,
      label: "NOT",
      highlight: true,
    },
    {
      type: "wire",
      id: "w_a",
      points: [
        { x: 80, y: 100 },
        { x: 138, y: 100 },
      ],
    },
    {
      type: "wire",
      id: "w_y",
      points: [
        { x: 186, y: 100 },
        { x: 240, y: 100 },
      ],
    },
    { type: "label", id: "lbl_a", x: 70, y: 100, text: "A" },
    { type: "label", id: "lbl_y", x: 250, y: 100, text: "Y = A'" },
    {
      type: "label",
      id: "lbl_truth",
      x: 160,
      y: 180,
      text: "Y = complement of A",
    },
  ],
};

/** Step 4: NAND gate */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_title", x: 160, y: 20, text: "NAND Gate" },
    {
      type: "nand-gate",
      id: "NAND",
      x: 160,
      y: 100,
      label: "NAND",
      highlight: true,
    },
    {
      type: "wire",
      id: "w_a",
      points: [
        { x: 80, y: 92 },
        { x: 134, y: 92 },
      ],
    },
    {
      type: "wire",
      id: "w_b",
      points: [
        { x: 80, y: 108 },
        { x: 134, y: 108 },
      ],
    },
    {
      type: "wire",
      id: "w_y",
      points: [
        { x: 192, y: 100 },
        { x: 240, y: 100 },
      ],
    },
    { type: "label", id: "lbl_a", x: 70, y: 92, text: "A" },
    { type: "label", id: "lbl_b", x: 70, y: 108, text: "B" },
    { type: "label", id: "lbl_y", x: 255, y: 100, text: "Y = (A·B)'" },
    {
      type: "label",
      id: "lbl_truth",
      x: 160,
      y: 180,
      text: "Universal gate: NOT-AND",
    },
  ],
};

/** Step 5: NOR gate */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_title", x: 160, y: 20, text: "NOR Gate" },
    {
      type: "nor-gate",
      id: "NOR",
      x: 160,
      y: 100,
      label: "NOR",
      highlight: true,
    },
    {
      type: "wire",
      id: "w_a",
      points: [
        { x: 80, y: 92 },
        { x: 134, y: 92 },
      ],
    },
    {
      type: "wire",
      id: "w_b",
      points: [
        { x: 80, y: 108 },
        { x: 134, y: 108 },
      ],
    },
    {
      type: "wire",
      id: "w_y",
      points: [
        { x: 196, y: 100 },
        { x: 240, y: 100 },
      ],
    },
    { type: "label", id: "lbl_a", x: 70, y: 92, text: "A" },
    { type: "label", id: "lbl_b", x: 70, y: 108, text: "B" },
    { type: "label", id: "lbl_y", x: 255, y: 100, text: "Y = (A+B)'" },
    {
      type: "label",
      id: "lbl_truth",
      x: 160,
      y: 180,
      text: "Universal gate: NOT-OR",
    },
  ],
};

/** Step 6: XOR gate */
export const step06: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 160,
      y: 20,
      text: "XOR Gate (Exclusive OR)",
    },
    {
      type: "xor-gate",
      id: "XOR",
      x: 160,
      y: 100,
      label: "XOR",
      highlight: true,
    },
    {
      type: "wire",
      id: "w_a",
      points: [
        { x: 80, y: 92 },
        { x: 132, y: 92 },
      ],
    },
    {
      type: "wire",
      id: "w_b",
      points: [
        { x: 80, y: 108 },
        { x: 132, y: 108 },
      ],
    },
    {
      type: "wire",
      id: "w_y",
      points: [
        { x: 188, y: 100 },
        { x: 240, y: 100 },
      ],
    },
    { type: "label", id: "lbl_a", x: 70, y: 92, text: "A" },
    { type: "label", id: "lbl_b", x: 70, y: 108, text: "B" },
    { type: "label", id: "lbl_y", x: 255, y: 100, text: "Y = A⊕B" },
    {
      type: "label",
      id: "lbl_truth",
      x: 160,
      y: 180,
      text: "Y=1 when inputs differ",
    },
  ],
};

/** Indexed array */
export const logicGatesStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
];

/** Theory diagram — all gates overview */
export const logicGatesTheoryDiagram: SchematicData = {
  width: 380,
  height: 280,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 190,
      y: 20,
      text: "Basic Logic Gates",
    },
    // Row 1: AND, OR, NOT
    { type: "and-gate", id: "AND", x: 70, y: 70 },
    { type: "label", id: "lbl_and", x: 70, y: 100, text: "AND" },
    { type: "or-gate", id: "OR", x: 190, y: 70 },
    { type: "label", id: "lbl_or", x: 190, y: 100, text: "OR" },
    { type: "not-gate", id: "NOT", x: 310, y: 70 },
    { type: "label", id: "lbl_not", x: 310, y: 100, text: "NOT" },
    // Row 2: NAND, NOR, XOR
    { type: "nand-gate", id: "NAND", x: 70, y: 170 },
    { type: "label", id: "lbl_nand", x: 70, y: 200, text: "NAND" },
    { type: "nor-gate", id: "NOR", x: 190, y: 170 },
    { type: "label", id: "lbl_nor", x: 190, y: 200, text: "NOR" },
    { type: "xor-gate", id: "XOR", x: 310, y: 170 },
    { type: "label", id: "lbl_xor", x: 310, y: 200, text: "XOR" },
    {
      type: "label",
      id: "lbl_footer",
      x: 190,
      y: 260,
      text: "NAND and NOR are universal gates",
    },
  ],
};
