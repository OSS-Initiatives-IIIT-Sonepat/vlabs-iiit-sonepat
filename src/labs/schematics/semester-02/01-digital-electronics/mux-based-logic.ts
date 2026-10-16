import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * MUX-Based Logic — progressive 2D schematics.
 * Implementing Boolean functions using a gate-level 2:1 MUX with S = A.
 * AND: D0=0, D1=B  → Y=A·B
 * OR:  D0=B, D1=1  → Y=A+B
 * XOR: D0=B, D1=B' → Y=A⊕B (B' from a spare 74HC04 inverter)
 *
 * Layout: NOT_S (150,108), AND0 (240,100), AND1 (240,190), OR (330,145), Y → 330Ω → LED → GND.
 * D0 enters AND0 on y92, D1 enters AND1 on y182; A forks at x50 to NOT_S and AND1.
 */

const W = 500;
const H = 300;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);
const labelBefore = (id: string, x: number, y: number, text: string) => label(id, x - 4 - text.length * 2.52, y, text);

type Opts = {
  d0: string;
  d1: string;
  /** D1 comes from an inverter driven by B. */
  d1Inverted?: boolean;
  hlData?: boolean;
  hlMux?: boolean;
};

const mux = (o: Opts): SchematicElement[] => {
  const els: SchematicElement[] = [
    { type: "not-gate", id: "NOT_S", x: 150, y: 108, highlight: o.hlMux },
    { type: "and-gate", id: "AND_D0", x: 240, y: 100, highlight: o.hlMux },
    { type: "and-gate", id: "AND_D1", x: 240, y: 190, highlight: o.hlMux },
    { type: "or-gate", id: "OR_OUT", x: 330, y: 145, highlight: o.hlMux },
    labelBefore("lbl_a", 30, 150, "A"), wire("w_a_in", [30, 150], [50, 150]),
    wire("w_a_not", [50, 150], [50, 108], [128, 108]),
    wire("w_a_and1", [50, 150], [50, 198], [214, 198]),
    junction("j_a", 50, 150),
    wire("w_s_bar", [176, 108], [214, 108]),
    label("lbl_d0_pin", 192, 84, "D0"),
    label("lbl_d1_pin", 192, 174, "D1"),
    labelBefore("lbl_d0", 110, 92, o.d0), hl(wire("w_d0", [110, 92], [214, 92]), o.hlData),
    wire("w_and0_or", [266, 100], [285, 100], [285, 137], [304, 137]),
    wire("w_and1_or", [266, 190], [285, 190], [285, 153], [304, 153]),
    wire("w_y", [356, 145], [366, 145]),
    { type: "resistor", id: "r_y", x: 396, y: 145, label: "330Ω" },
    { type: "led", id: "led_y", x: 446, y: 145, label: "Y", color: "green" },
    wire("w_led_gnd", [466, 145], [478, 145], [478, 155]),
    { type: "ground", id: "gnd_y", x: 478, y: 155 },
  ];
  if (o.d1Inverted) {
    els.push(
      { type: "not-gate", id: "NOT_B", x: 150, y: 182, highlight: o.hlData },
      labelBefore("lbl_d1", 110, 182, "B"), hl(wire("w_b_not", [110, 182], [128, 182]), o.hlData),
      hl(wire("w_d1", [176, 182], [214, 182]), o.hlData),
      label("lbl_bn", 195, 192, "B'"),
    );
  } else {
    els.push(labelBefore("lbl_d1", 110, 182, o.d1), hl(wire("w_d1", [110, 182], [214, 182]), o.hlData));
  }
  return els;
};

/** Step 1: construct-2-1-mux — Basic 2:1 MUX structure */
export const step01_construct2to1Mux: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "2:1 MUX Structure (S = A)"),
  label("lbl_eq", 250, 46, "Y = S'·D0 + S·D1"),
  ...mux({ d0: "D0", d1: "D1", hlMux: true }),
  label("lbl_func", 250, 240, "A=0 → Y=D0 · A=1 → Y=D1"),
  label("lbl_note", 250, 265, "Leave D0 and D1 accessible — they change per function"),
]};

/** Step 2: implement-and — AND function using MUX */
export const step02_implementAnd: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "MUX → AND Gate"),
  label("lbl_config", 250, 46, "D0 = 0 (GND), D1 = B"),
  ...mux({ d0: "0 (GND)", d1: "B", hlData: true }),
  label("lbl_derive", 250, 240, "Y = A'·0 + A·B = A·B"),
  label("lbl_result", 250, 265, "AND function — test AB = 00, 01, 10, 11"),
]};

/** Step 3: implement-or — OR function using MUX */
export const step03_implementOr: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "MUX → OR Gate"),
  label("lbl_config", 250, 46, "D0 = B, D1 = 1 (+5V)"),
  ...mux({ d0: "B", d1: "1 (+5V)", hlData: true }),
  label("lbl_derive", 250, 240, "Y = A'·B + A·1 = A'B + A = A + B"),
  label("lbl_result", 250, 265, "OR function — compare with a direct OR gate"),
]};

/** Step 4: implement-xor — XOR function using MUX */
export const step04_implementXor: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "MUX → XOR Gate"),
  label("lbl_config", 250, 46, "D0 = B, D1 = B' (74HC04 inverter driven by B)"),
  ...mux({ d0: "B", d1: "B'", d1Inverted: true, hlData: true }),
  label("lbl_derive", 250, 240, "Y = A'·B + A·B' = A ⊕ B"),
  label("lbl_result", 250, 265, "XOR function — test all four combinations"),
]};

/** Step 5: document-functions — Observation table */
export const step05_documentFunctions: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "MUX Function Summary"),
  label("lbl_header", 250, 60, "Function |  D0  |  D1  | AB=00 01 10 11"),
  label("lbl_and", 250, 90, "AND      |   0  |   B  |     0  0  0  1"),
  label("lbl_or", 250, 115, "OR       |   B  |   1  |     0  1  1  1"),
  label("lbl_xor", 250, 140, "XOR      |   B  |  B'  |     0  1  1  0"),
  label("lbl_formula", 250, 190, "MUX Equation: Y = A'·D0 + A·D1"),
  label("lbl_note", 250, 220, "Only the D0 / D1 wiring changes — the MUX itself is untouched"),
  label("lbl_note2", 250, 245, "MUX = programmable logic block"),
]};

/** Step 6: generalise — General approach */
export const step06_generalise: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "MUX-Based Logic — General Method"),
  label("lbl_method_title", 250, 55, "For any f(A,B) with S = A:"),
  label("lbl_step1", 250, 80, "D0 = f(0, B) · D1 = f(1, B)"),
  label("lbl_step2", 250, 105, "Each is one of 0, 1, B or B' — wire accordingly"),
  wire("w_example_box", [120, 130], [380, 130], [380, 210], [120, 210], [120, 130]),
  label("lbl_example", 250, 148, "Exercise: NAND(A,B)"),
  label("lbl_ex_d0", 250, 170, "f(0,B) = 1 → D0 = 1"),
  label("lbl_ex_d1", 250, 192, "f(1,B) = B' → D1 = B'"),
  label("lbl_general", 250, 240, "n variables: 2^(n-1):1 MUX, one variable on the data inputs"),
  label("lbl_adv_title", 250, 265, "Advantage: universal function generator"),
]};

/** Indexed array */
export const muxBasedLogicStepSchematics: SchematicData[] = [
  step01_construct2to1Mux,
  step02_implementAnd,
  step03_implementOr,
  step04_implementXor,
  step05_documentFunctions,
  step06_generalise,
];

const block = (id: string, x0: number, name: string, d0: string, d1: string, y: string): SchematicElement[] => [
  wire(`${id}_box`, [x0, 60], [x0 + 70, 60], [x0 + 70, 140], [x0, 140], [x0, 60]),
  label(`${id}_title`, x0 + 35, 48, name),
  label(`${id}_mux`, x0 + 35, 74, "2:1 MUX"),
  label(`${id}_p0`, x0 + 12, 88, "D0"), label(`${id}_p1`, x0 + 12, 118, "D1"),
  label(`${id}_py`, x0 + 62, 103, "Y"), label(`${id}_ps`, x0 + 35, 132, "S"),
  labelBefore(`${id}_d0`, x0 - 20, 85, d0), wire(`${id}_w_d0`, [x0 - 20, 85], [x0, 85]),
  labelBefore(`${id}_d1`, x0 - 20, 115, d1), wire(`${id}_w_d1`, [x0 - 20, 115], [x0, 115]),
  label(`${id}_a`, x0 + 35, 172, "A"), wire(`${id}_w_s`, [x0 + 35, 164], [x0 + 35, 140]),
  wire(`${id}_w_y`, [x0 + 70, 100], [x0 + 90, 100]), label(`${id}_y`, x0 + 94 + y.length * 2.7, 100, y),
];

/** Theory diagram — all three implementations */
export const muxBasedLogicTheoryDiagram: SchematicData = { width: 480, height: 320, elements: [
  label("lbl_title", 240, 20, "MUX-Based Boolean Functions (S = A)"),
  ...block("and", 30, "AND", "0", "B", "AB"),
  ...block("or", 180, "OR", "B", "1", "A+B"),
  ...block("xor", 330, "XOR", "B", "B'", "A⊕B"),
  label("lbl_eq", 240, 205, "MUX: Y = A'·D0 + A·D1"),
  label("lbl_table_header", 240, 235, "Func |  D0  |  D1  | Result"),
  label("lbl_table_and", 240, 255, "AND  |   0  |   B  | A·B"),
  label("lbl_table_or", 240, 275, "OR   |   B  |   1  | A+B"),
  label("lbl_table_xor", 240, 295, "XOR  |   B  |  B'  | A⊕B"),
]};
