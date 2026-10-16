import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * 2-to-1 Multiplexer — progressive 2D schematics.
 * Y = S'·I0 + S·I1
 */

const W = 410;
const H = 230;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const title = (text: string) => label("lbl_title", 205, 20, text);

// NOT  (110,110): in (88,110), out (136,110)
// AND1 (200,70):  in (174,62)/(174,78),  out (226,70)
// AND2 (200,150): in (174,142)/(174,158), out (226,150)
// OR   (300,110): in (274,102)/(274,118), out (326,110)
const not = (highlight?: boolean): SchematicElement =>
  ({ type: "not-gate", id: "NOT", x: 110, y: 110, label: "S'", highlight });
const and1 = (highlight?: boolean): SchematicElement =>
  ({ type: "and-gate", id: "AND1", x: 200, y: 70, label: "S'·I0", highlight });
const and2 = (highlight?: boolean): SchematicElement =>
  ({ type: "and-gate", id: "AND2", x: 200, y: 150, label: "S·I1", highlight });

const selectIn: SchematicElement[] = [label("lbl_s", 20, 110, "S"), wire("w_s", [30, 110], [88, 110])];
const andStage: SchematicElement[] = [
  label("lbl_i0", 18, 62, "I0"), wire("w_i0", [30, 62], [174, 62]),
  label("lbl_i1", 18, 158, "I1"), wire("w_i1", [30, 158], [174, 158]),
  wire("w_s_and2", [60, 110], [60, 142], [174, 142]),
  { type: "junction", id: "j_s", x: 60, y: 110 },
  wire("w_snot_and1", [136, 110], [150, 110], [150, 78], [174, 78]),
];

/** Step 1: Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  title("2-to-1 Multiplexer"),
  label("lbl_eq", 205, 60, "Y = S'·I0 + S·I1"),
  label("lbl_desc", 205, 100, "Select S chooses I0 or I1"),
]};

/** Step 2: NOT gate for S' */
export const step02: SchematicData = { width: W, height: H, elements: [
  title("MUX — Invert Select"),
  not(true), ...selectIn,
  wire("w_snot", [136, 110], [170, 110]),
  { type: "junction", id: "t_snot", x: 170, y: 110 },
]};

/** Step 3: AND gates for S'·I0 and S·I1 */
export const step03: SchematicData = { width: W, height: H, elements: [
  title("MUX — AND Gates"),
  not(), ...selectIn, ...andStage,
  and1(true), and2(true),
]};

/** Step 4-6: Complete circuit with OR gate */
export const step04: SchematicData = { width: W, height: H, elements: [
  title("MUX 2:1 — Complete"),
  not(), ...selectIn, ...andStage, and1(), and2(),
  { type: "or-gate", id: "OR", x: 300, y: 110, label: "Y", highlight: true },
  wire("w_and1_or", [226, 70], [245, 70], [245, 102], [274, 102]),
  wire("w_and2_or", [226, 150], [255, 150], [255, 118], [274, 118]),
  // Output LED to ground
  wire("w_y", [326, 110], [340, 110]),
  { type: "led", id: "led_y", x: 360, y: 110, label: "Y", color: "green" },
  wire("w_y_gnd", [380, 110], [390, 110], [390, 120]),
  { type: "ground", id: "gnd_y", x: 390, y: 120 },
  label("lbl_truth", 205, 210, "S=0→Y=I0, S=1→Y=I1"),
]};

export const step05 = step04;
export const step06 = step04;

/** Indexed array */
export const mux2to1StepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06,
];

/** Theory diagram */
export const mux2to1TheoryDiagram: SchematicData = step04;
