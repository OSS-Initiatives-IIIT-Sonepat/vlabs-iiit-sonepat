import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * MUX-Based Logic — progressive 2D schematics.
 * Implementing Boolean functions using 2:1 MUX.
 * AND: D0=0, D1=B, S=A → Y=A·B
 * OR:  D0=B, D1=1, S=A → Y=A+B
 * XOR: D0=B, D1=B', S=A → Y=A⊕B
 */

const W = 420;
const H = 280;

/** Step 1: construct-2-1-mux — Basic 2:1 MUX structure */
export const step01_construct2to1Mux: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 210,
      y: 20,
      text: "2:1 MUX Structure",
    },
    { type: "label", id: "lbl_eq", x: 210, y: 50, text: "Y = S'·D0 + S·D1" },
    // MUX internal structure
    { type: "not-gate", id: "NOT_S", x: 100, y: 130, label: "S'" },
    { type: "and-gate", id: "AND_D0", x: 200, y: 90, label: "S'·D0" },
    { type: "and-gate", id: "AND_D1", x: 200, y: 170, label: "S·D1" },
    { type: "or-gate", id: "OR_OUT", x: 300, y: 130, label: "Y" },
    // Select input S
    {
      type: "wire",
      id: "w_s_in",
      points: [
        { x: 40, y: 130 },
        { x: 78, y: 130 },
      ],
    },
    { type: "label", id: "lbl_s", x: 25, y: 130, text: "S" },
    // S fork to NOT and AND_D1
    {
      type: "wire",
      id: "w_s_fork",
      points: [
        { x: 60, y: 130 },
        { x: 60, y: 178 },
        { x: 174, y: 178 },
      ],
    },
    { type: "junction", id: "j_s", x: 60, y: 130 },
    // S' to AND_D0
    {
      type: "wire",
      id: "w_s_not_and",
      points: [
        { x: 126, y: 130 },
        { x: 150, y: 130 },
        { x: 150, y: 98 },
        { x: 174, y: 98 },
      ],
      highlight: true,
    },
    // D0 input
    {
      type: "wire",
      id: "w_d0_in",
      points: [
        { x: 40, y: 82 },
        { x: 174, y: 82 },
      ],
    },
    { type: "label", id: "lbl_d0", x: 25, y: 82, text: "D0" },
    // D1 input
    {
      type: "wire",
      id: "w_d1_in",
      points: [
        { x: 40, y: 162 },
        { x: 174, y: 162 },
      ],
    },
    { type: "label", id: "lbl_d1", x: 25, y: 162, text: "D1" },
    // ANDs to OR
    {
      type: "wire",
      id: "w_and0_or",
      points: [
        { x: 226, y: 90 },
        { x: 255, y: 90 },
        { x: 255, y: 122 },
        { x: 274, y: 122 },
      ],
    },
    {
      type: "wire",
      id: "w_and1_or",
      points: [
        { x: 226, y: 170 },
        { x: 255, y: 170 },
        { x: 255, y: 138 },
        { x: 274, y: 138 },
      ],
    },
    // Output Y
    {
      type: "wire",
      id: "w_y_out",
      points: [
        { x: 326, y: 130 },
        { x: 380, y: 130 },
      ],
    },
    { type: "led", id: "led_y", x: 395, y: 130, label: "Y", color: "green" },
    // Explanation
    { type: "label", id: "lbl_func", x: 210, y: 220, text: "S=0 → Y=D0" },
    { type: "label", id: "lbl_func2", x: 210, y: 240, text: "S=1 → Y=D1" },
    {
      type: "label",
      id: "lbl_note",
      x: 210,
      y: 265,
      text: "Configure D0, D1 to implement functions",
    },
  ],
};

/** Step 2: implement-and — AND function using MUX */
export const step02_implementAnd: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_title", x: 210, y: 20, text: "MUX → AND Gate" },
    { type: "label", id: "lbl_config", x: 210, y: 50, text: "D0=0, D1=B, S=A" },
    // MUX box
    {
      type: "wire",
      id: "mux_box",
      points: [
        { x: 180, y: 80 },
        { x: 280, y: 80 },
        { x: 280, y: 190 },
        { x: 180, y: 190 },
        { x: 180, y: 80 },
      ],
    },
    { type: "label", id: "lbl_mux", x: 230, y: 100, text: "2:1 MUX" },
    // D0 = 0 (GND)
    {
      type: "wire",
      id: "w_d0_gnd",
      points: [
        { x: 80, y: 115 },
        { x: 180, y: 115 },
      ],
      highlight: true,
    },
    { type: "label", id: "lbl_d0", x: 170, y: 105, text: "D0" },
    { type: "label", id: "lbl_d0_val", x: 50, y: 115, text: "0 (GND)" },
    // D1 = B
    {
      type: "wire",
      id: "w_d1_b",
      points: [
        { x: 80, y: 145 },
        { x: 180, y: 145 },
      ],
      highlight: true,
    },
    { type: "label", id: "lbl_d1", x: 170, y: 135, text: "D1" },
    { type: "label", id: "lbl_d1_val", x: 60, y: 145, text: "B" },
    // S = A
    {
      type: "wire",
      id: "w_s_a",
      points: [
        { x: 80, y: 175 },
        { x: 180, y: 175 },
      ],
      highlight: true,
    },
    { type: "label", id: "lbl_s", x: 170, y: 180, text: "S" },
    { type: "label", id: "lbl_s_val", x: 60, y: 175, text: "A" },
    // Output Y
    {
      type: "wire",
      id: "w_y_out",
      points: [
        { x: 280, y: 135 },
        { x: 350, y: 135 },
      ],
    },
    { type: "label", id: "lbl_y", x: 290, y: 125, text: "Y" },
    { type: "led", id: "led_y", x: 370, y: 135, label: "Y", color: "green" },
    // Derivation
    {
      type: "label",
      id: "lbl_derive1",
      x: 210,
      y: 215,
      text: "Y = A'·0 + A·B",
    },
    { type: "label", id: "lbl_derive2", x: 210, y: 235, text: "Y = 0 + A·B" },
    {
      type: "label",
      id: "lbl_result",
      x: 210,
      y: 260,
      text: "Y = A·B (AND function!)",
    },
  ],
};

/** Step 3: implement-or — OR function using MUX */
export const step03_implementOr: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_title", x: 210, y: 20, text: "MUX → OR Gate" },
    { type: "label", id: "lbl_config", x: 210, y: 50, text: "D0=B, D1=1, S=A" },
    // MUX box
    {
      type: "wire",
      id: "mux_box",
      points: [
        { x: 180, y: 80 },
        { x: 280, y: 80 },
        { x: 280, y: 190 },
        { x: 180, y: 190 },
        { x: 180, y: 80 },
      ],
    },
    { type: "label", id: "lbl_mux", x: 230, y: 100, text: "2:1 MUX" },
    // D0 = B
    {
      type: "wire",
      id: "w_d0_b",
      points: [
        { x: 80, y: 115 },
        { x: 180, y: 115 },
      ],
      highlight: true,
    },
    { type: "label", id: "lbl_d0", x: 170, y: 105, text: "D0" },
    { type: "label", id: "lbl_d0_val", x: 60, y: 115, text: "B" },
    // D1 = 1 (Vcc)
    {
      type: "wire",
      id: "w_d1_vcc",
      points: [
        { x: 80, y: 145 },
        { x: 180, y: 145 },
      ],
      highlight: true,
    },
    { type: "label", id: "lbl_d1", x: 170, y: 135, text: "D1" },
    { type: "label", id: "lbl_d1_val", x: 50, y: 145, text: "1 (Vcc)" },
    // S = A
    {
      type: "wire",
      id: "w_s_a",
      points: [
        { x: 80, y: 175 },
        { x: 180, y: 175 },
      ],
      highlight: true,
    },
    { type: "label", id: "lbl_s", x: 170, y: 180, text: "S" },
    { type: "label", id: "lbl_s_val", x: 60, y: 175, text: "A" },
    // Output Y
    {
      type: "wire",
      id: "w_y_out",
      points: [
        { x: 280, y: 135 },
        { x: 350, y: 135 },
      ],
    },
    { type: "label", id: "lbl_y", x: 290, y: 125, text: "Y" },
    { type: "led", id: "led_y", x: 370, y: 135, label: "Y", color: "green" },
    // Derivation
    {
      type: "label",
      id: "lbl_derive1",
      x: 210,
      y: 215,
      text: "Y = A'·B + A·1",
    },
    { type: "label", id: "lbl_derive2", x: 210, y: 235, text: "Y = A'B + A" },
    {
      type: "label",
      id: "lbl_result",
      x: 210,
      y: 260,
      text: "Y = A+B (OR function!)",
    },
  ],
};

/** Step 4: implement-xor — XOR function using MUX */
export const step04_implementXor: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl_title", x: 210, y: 20, text: "MUX → XOR Gate" },
    {
      type: "label",
      id: "lbl_config",
      x: 210,
      y: 50,
      text: "D0=B, D1=B', S=A",
    },
    // NOT gate for B'
    {
      type: "not-gate",
      id: "NOT_B",
      x: 100,
      y: 145,
      label: "B'",
      highlight: true,
    },
    // MUX box
    {
      type: "wire",
      id: "mux_box",
      points: [
        { x: 180, y: 80 },
        { x: 280, y: 80 },
        { x: 280, y: 190 },
        { x: 180, y: 190 },
        { x: 180, y: 80 },
      ],
    },
    { type: "label", id: "lbl_mux", x: 230, y: 100, text: "2:1 MUX" },
    // B input
    {
      type: "wire",
      id: "w_b_in",
      points: [
        { x: 40, y: 130 },
        { x: 60, y: 130 },
      ],
    },
    { type: "label", id: "lbl_b", x: 25, y: 130, text: "B" },
    // B fork to D0 and NOT
    {
      type: "wire",
      id: "w_b_d0",
      points: [
        { x: 60, y: 130 },
        { x: 60, y: 115 },
        { x: 180, y: 115 },
      ],
    },
    {
      type: "wire",
      id: "w_b_not",
      points: [
        { x: 60, y: 130 },
        { x: 60, y: 145 },
        { x: 78, y: 145 },
      ],
    },
    { type: "junction", id: "j_b", x: 60, y: 130 },
    // B' to D1
    {
      type: "wire",
      id: "w_b_bar_d1",
      points: [
        { x: 126, y: 145 },
        { x: 180, y: 145 },
      ],
      highlight: true,
    },
    // D0 = B label
    { type: "label", id: "lbl_d0", x: 170, y: 105, text: "D0" },
    { type: "label", id: "lbl_d0_val", x: 145, y: 115, text: "B" },
    // D1 = B' label
    { type: "label", id: "lbl_d1", x: 170, y: 155, text: "D1" },
    { type: "label", id: "lbl_d1_val", x: 140, y: 145, text: "B'" },
    // S = A
    {
      type: "wire",
      id: "w_s_a",
      points: [
        { x: 40, y: 175 },
        { x: 180, y: 175 },
      ],
    },
    { type: "label", id: "lbl_s", x: 170, y: 180, text: "S" },
    { type: "label", id: "lbl_s_val", x: 25, y: 175, text: "A" },
    // Output Y
    {
      type: "wire",
      id: "w_y_out",
      points: [
        { x: 280, y: 135 },
        { x: 350, y: 135 },
      ],
    },
    { type: "label", id: "lbl_y", x: 290, y: 125, text: "Y" },
    { type: "led", id: "led_y", x: 370, y: 135, label: "Y", color: "green" },
    // Derivation
    {
      type: "label",
      id: "lbl_derive1",
      x: 210,
      y: 215,
      text: "Y = A'·B + A·B'",
    },
    {
      type: "label",
      id: "lbl_result",
      x: 210,
      y: 240,
      text: "Y = A⊕B (XOR function!)",
    },
  ],
};

/** Step 5: document-functions — Summary table */
export const step05_documentFunctions: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 210,
      y: 20,
      text: "MUX Function Summary",
    },
    // Table header
    {
      type: "label",
      id: "lbl_header",
      x: 210,
      y: 60,
      text: "Function |  S  |  D0  |  D1  | Output",
    },
    {
      type: "wire",
      id: "w_header_line",
      points: [
        { x: 60, y: 72 },
        { x: 360, y: 72 },
      ],
    },
    // AND row
    {
      type: "label",
      id: "lbl_and",
      x: 210,
      y: 95,
      text: "  AND    |  A  |   0  |   B  | Y=A·B",
    },
    // OR row
    {
      type: "label",
      id: "lbl_or",
      x: 210,
      y: 120,
      text: "  OR     |  A  |   B  |   1  | Y=A+B",
    },
    // XOR row
    {
      type: "label",
      id: "lbl_xor",
      x: 210,
      y: 145,
      text: "  XOR    |  A  |   B  |  B'  | Y=A⊕B",
    },
    // NOT row
    {
      type: "label",
      id: "lbl_not",
      x: 210,
      y: 170,
      text: "  NOT    |  A  |   1  |   0  | Y=A'",
    },
    // NAND row (bonus)
    {
      type: "label",
      id: "lbl_nand",
      x: 210,
      y: 195,
      text: "  NAND   |  A  |   1  |  B'  | Y=(AB)'",
    },
    // Formula reminder
    {
      type: "wire",
      id: "w_footer_line",
      points: [
        { x: 60, y: 215 },
        { x: 360, y: 215 },
      ],
    },
    {
      type: "label",
      id: "lbl_formula",
      x: 210,
      y: 240,
      text: "MUX Equation: Y = S'·D0 + S·D1",
    },
    {
      type: "label",
      id: "lbl_note",
      x: 210,
      y: 265,
      text: "Any 2-variable function implementable!",
    },
  ],
};

/** Step 6: generalise — General approach */
export const step06_generalise: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 210,
      y: 20,
      text: "MUX-Based Logic — General Method",
    },
    // n-variable function explanation
    {
      type: "label",
      id: "lbl_method_title",
      x: 210,
      y: 55,
      text: "To implement n-variable function:",
    },
    {
      type: "label",
      id: "lbl_step1",
      x: 210,
      y: 85,
      text: "1. Use 2^(n-1):1 MUX",
    },
    {
      type: "label",
      id: "lbl_step2",
      x: 210,
      y: 110,
      text: "2. Connect (n-1) variables to select lines",
    },
    {
      type: "label",
      id: "lbl_step3",
      x: 210,
      y: 135,
      text: "3. Data inputs: 0, 1, Xn, or Xn'",
    },
    // Example: 3-variable with 4:1 MUX
    {
      type: "wire",
      id: "w_example_box",
      points: [
        { x: 80, y: 160 },
        { x: 340, y: 160 },
        { x: 340, y: 240 },
        { x: 80, y: 240 },
        { x: 80, y: 160 },
      ],
    },
    {
      type: "label",
      id: "lbl_example",
      x: 210,
      y: 175,
      text: "Example: F(A,B,C)",
    },
    {
      type: "label",
      id: "lbl_ex_mux",
      x: 210,
      y: 195,
      text: "Use 4:1 MUX (2^(3-1) = 4)",
    },
    {
      type: "label",
      id: "lbl_ex_sel",
      x: 210,
      y: 215,
      text: "S1=A, S0=B (select lines)",
    },
    {
      type: "label",
      id: "lbl_ex_data",
      x: 210,
      y: 235,
      text: "D0-D3 from truth table rows for C",
    },
    // Advantages
    {
      type: "label",
      id: "lbl_adv_title",
      x: 210,
      y: 260,
      text: "Advantage: Universal function generator",
    },
  ],
};

/** Indexed array */
export const muxBasedLogicStepSchematics: SchematicData[] = [
  step01_construct2to1Mux,
  step02_implementAnd,
  step03_implementOr,
  step04_implementXor,
  step05_documentFunctions,
  step06_generalise,
];

/** Theory diagram — all three implementations */
export const muxBasedLogicTheoryDiagram: SchematicData = {
  width: 460,
  height: 320,
  elements: [
    {
      type: "label",
      id: "lbl_title",
      x: 230,
      y: 20,
      text: "MUX-Based Boolean Functions",
    },
    // AND implementation (left)
    {
      type: "wire",
      id: "and_box",
      points: [
        { x: 30, y: 60 },
        { x: 130, y: 60 },
        { x: 130, y: 150 },
        { x: 30, y: 150 },
        { x: 30, y: 60 },
      ],
    },
    { type: "label", id: "lbl_and_title", x: 80, y: 75, text: "AND" },
    { type: "label", id: "lbl_and_mux", x: 80, y: 95, text: "MUX" },
    { type: "label", id: "lbl_and_d0", x: 20, y: 105, text: "0" },
    {
      type: "wire",
      id: "w_and_d0",
      points: [
        { x: 25, y: 105 },
        { x: 30, y: 105 },
      ],
    },
    { type: "label", id: "lbl_and_d1", x: 20, y: 125, text: "B" },
    {
      type: "wire",
      id: "w_and_d1",
      points: [
        { x: 25, y: 125 },
        { x: 30, y: 125 },
      ],
    },
    { type: "label", id: "lbl_and_s", x: 75, y: 160, text: "S=A" },
    { type: "label", id: "lbl_and_y", x: 140, y: 105, text: "Y=AB" },
    {
      type: "wire",
      id: "w_and_y",
      points: [
        { x: 130, y: 105 },
        { x: 150, y: 105 },
      ],
    },
    // OR implementation (center)
    {
      type: "wire",
      id: "or_box",
      points: [
        { x: 180, y: 60 },
        { x: 280, y: 60 },
        { x: 280, y: 150 },
        { x: 180, y: 150 },
        { x: 180, y: 60 },
      ],
    },
    { type: "label", id: "lbl_or_title", x: 230, y: 75, text: "OR" },
    { type: "label", id: "lbl_or_mux", x: 230, y: 95, text: "MUX" },
    { type: "label", id: "lbl_or_d0", x: 170, y: 105, text: "B" },
    {
      type: "wire",
      id: "w_or_d0",
      points: [
        { x: 175, y: 105 },
        { x: 180, y: 105 },
      ],
    },
    { type: "label", id: "lbl_or_d1", x: 170, y: 125, text: "1" },
    {
      type: "wire",
      id: "w_or_d1",
      points: [
        { x: 175, y: 125 },
        { x: 180, y: 125 },
      ],
    },
    { type: "label", id: "lbl_or_s", x: 225, y: 160, text: "S=A" },
    { type: "label", id: "lbl_or_y", x: 290, y: 105, text: "Y=A+B" },
    {
      type: "wire",
      id: "w_or_y",
      points: [
        { x: 280, y: 105 },
        { x: 300, y: 105 },
      ],
    },
    // XOR implementation (right)
    {
      type: "wire",
      id: "xor_box",
      points: [
        { x: 330, y: 60 },
        { x: 430, y: 60 },
        { x: 430, y: 150 },
        { x: 330, y: 150 },
        { x: 330, y: 60 },
      ],
    },
    { type: "label", id: "lbl_xor_title", x: 380, y: 75, text: "XOR" },
    { type: "label", id: "lbl_xor_mux", x: 380, y: 95, text: "MUX" },
    { type: "label", id: "lbl_xor_d0", x: 320, y: 105, text: "B" },
    {
      type: "wire",
      id: "w_xor_d0",
      points: [
        { x: 325, y: 105 },
        { x: 330, y: 105 },
      ],
    },
    { type: "label", id: "lbl_xor_d1", x: 318, y: 125, text: "B'" },
    {
      type: "wire",
      id: "w_xor_d1",
      points: [
        { x: 325, y: 125 },
        { x: 330, y: 125 },
      ],
    },
    { type: "label", id: "lbl_xor_s", x: 375, y: 160, text: "S=A" },
    { type: "label", id: "lbl_xor_y", x: 440, y: 105, text: "Y=A⊕B" },
    {
      type: "wire",
      id: "w_xor_y",
      points: [
        { x: 430, y: 105 },
        { x: 450, y: 105 },
      ],
    },
    // MUX equation
    {
      type: "label",
      id: "lbl_eq",
      x: 230,
      y: 190,
      text: "MUX: Y = S'·D0 + S·D1",
    },
    // Summary table
    {
      type: "wire",
      id: "w_table_top",
      points: [
        { x: 80, y: 210 },
        { x: 380, y: 210 },
      ],
    },
    {
      type: "label",
      id: "lbl_table_header",
      x: 230,
      y: 225,
      text: "Func |  D0  |  D1  | Result",
    },
    {
      type: "wire",
      id: "w_table_h2",
      points: [
        { x: 80, y: 235 },
        { x: 380, y: 235 },
      ],
    },
    {
      type: "label",
      id: "lbl_table_and",
      x: 230,
      y: 250,
      text: "AND  |   0  |   B  | A·B",
    },
    {
      type: "label",
      id: "lbl_table_or",
      x: 230,
      y: 270,
      text: "OR   |   B  |   1  | A+B",
    },
    {
      type: "label",
      id: "lbl_table_xor",
      x: 230,
      y: 290,
      text: "XOR  |   B  |  B'  | A⊕B",
    },
    {
      type: "wire",
      id: "w_table_bot",
      points: [
        { x: 80, y: 305 },
        { x: 380, y: 305 },
      ],
    },
  ],
};
