import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Half Adder — progressive 2D schematics.
 * Sum = A ⊕ B (XOR)
 * Carry = A · B (AND)
 *
 *   A ──┬──────────── XOR ── S
 *   B ──┼──┬───────── XOR
 *       └──┼───────── AND ── C
 *          └───────── AND
 */

const W = 360;
const H = 220;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const title = (text: string) => label("lbl_title", 180, 20, text);

// XOR at (190,70): in (162,62)/(162,78), out (218,70)
// AND at (190,150): in (164,142)/(164,158), out (216,150)
const xor = (highlight?: boolean): SchematicElement =>
  ({ type: "xor-gate", id: "XOR", x: 190, y: 70, label: "Sum", highlight });
const and = (highlight?: boolean): SchematicElement =>
  ({ type: "and-gate", id: "AND", x: 190, y: 150, label: "Carry", highlight });

const inputs: SchematicElement[] = [
  label("lbl_a", 20, 62, "A"), wire("w_a", [30, 62], [162, 62]),
  label("lbl_b", 20, 78, "B"), wire("w_b", [30, 78], [162, 78]),
];
const forks = (highlight?: boolean): SchematicElement[] => [
  { ...wire("w_a_and", [90, 62], [90, 142], [164, 142]), highlight },
  { type: "junction", id: "j_a", x: 90, y: 62 },
  { ...wire("w_b_and", [110, 78], [110, 158], [164, 158]), highlight },
  { type: "junction", id: "j_b", x: 110, y: 78 },
];
/** Output wire ending in a text label (before LEDs are fitted). */
const outLabel = (id: string, fromX: number, y: number, text: string): SchematicElement[] => [
  wire(`w_${id}`, [fromX, y], [290, y]),
  { type: "junction", id: `t_${id}`, x: 290, y },
  label(`lbl_${id}`, 304, y, text),
];
/** Output LED with its cathode returned to ground. */
const outLed = (id: string, fromX: number, y: number, text: string, color: string): SchematicElement[] => [
  wire(`w_${id}`, [fromX, y], [280, y]),
  { type: "led", id: `led_${id}`, x: 300, y, label: text, color, highlight: true },
  wire(`w_${id}_gnd`, [320, y], [330, y], [330, y + 10]),
  { type: "ground", id: `gnd_${id}`, x: 330, y: y + 10 },
];

/** Step 1: Introduction — show block diagram */
export const step01: SchematicData = { width: W, height: H, elements: [
  title("Half Adder"),
  label("lbl_eq1", 180, 60, "Sum = A ⊕ B"),
  label("lbl_eq2", 180, 80, "Carry = A · B"),
  label("lbl_inputs", 90, 140, "Inputs: A, B"),
  label("lbl_outputs", 270, 140, "Outputs: S, C"),
]};

/** Step 2: Place XOR gate for Sum */
export const step02: SchematicData = { width: W, height: H, elements: [
  title("Half Adder — Sum Circuit"),
  xor(true),
  ...inputs,
  ...outLabel("s", 218, 70, "S"),
]};

/** Step 3: Place AND gate for Carry */
export const step03: SchematicData = { width: W, height: H, elements: [
  title("Half Adder — Carry Circuit"),
  xor(), ...inputs, ...outLabel("s", 218, 70, "S"),
  // NEW
  and(true), ...forks(true),
  ...outLabel("c", 216, 150, "C"),
]};

/** Step 4-9: Wire inputs A and B + verify truth table (simplified to main steps) */
export const step04: SchematicData = { width: W, height: H, elements: [
  title("Half Adder — Complete Circuit"),
  xor(), and(), ...inputs, ...forks(),
  ...outLed("s", 218, 70, "S", "green"),
  ...outLed("c", 216, 150, "C", "red"),
]};

// Steps 5-9 are the same final circuit (truth table verification)
export const step05 = step04;
export const step06 = step04;
export const step07 = step04;
export const step08 = step04;
export const step09 = step04;

/** Indexed array */
export const halfAdderStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09,
];

/** Theory diagram */
export const halfAdderTheoryDiagram: SchematicData = step04;
