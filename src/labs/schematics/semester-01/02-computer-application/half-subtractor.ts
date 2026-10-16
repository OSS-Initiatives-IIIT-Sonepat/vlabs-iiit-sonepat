import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Half Subtractor — progressive 2D schematics.
 * Difference = A ⊕ B (XOR)
 * Borrow = A' · B (NOT-AND)
 */

const W = 380;
const H = 230;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const title = (text: string) => label("lbl_title", 190, 20, text);

// XOR at (200,60): in (172,52)/(172,68), out (228,60)
// NOT at (130,120): in (108,120), out (156,120)
// AND at (220,144): in (194,136)/(194,152), out (246,144)
const xor = (highlight?: boolean): SchematicElement =>
  ({ type: "xor-gate", id: "XOR", x: 200, y: 60, label: "Diff", highlight });
const not = (highlight?: boolean): SchematicElement =>
  ({ type: "not-gate", id: "NOT", x: 130, y: 120, label: "A'", highlight });
const and = (highlight?: boolean): SchematicElement =>
  ({ type: "and-gate", id: "AND", x: 220, y: 144, label: "Borrow", highlight });

const inputs: SchematicElement[] = [
  label("lbl_a", 20, 52, "A"), wire("w_a", [30, 52], [172, 52]),
  label("lbl_b", 20, 68, "B"), wire("w_b", [30, 68], [172, 68]),
];
const notStage = (highlight?: boolean): SchematicElement[] => [
  { ...wire("w_a_not", [95, 52], [95, 120], [108, 120]), highlight },
  { type: "junction", id: "j_a", x: 95, y: 52 },
  not(highlight),
];
const andStage = (highlight?: boolean): SchematicElement[] => [
  { ...wire("w_not_and", [156, 120], [170, 120], [170, 136], [194, 136]), highlight },
  { ...wire("w_b_and", [60, 68], [60, 152], [194, 152]), highlight },
  { type: "junction", id: "j_b", x: 60, y: 68 },
  and(highlight),
];
const outLabel = (id: string, fromX: number, y: number, text: string): SchematicElement[] => [
  wire(`w_${id}`, [fromX, y], [300, y]),
  { type: "junction", id: `t_${id}`, x: 300, y },
  label(`lbl_${id}`, 314, y, text),
];
const outLed = (id: string, fromX: number, y: number, text: string, color: string, highlight?: boolean): SchematicElement[] => [
  wire(`w_${id}`, [fromX, y], [290, y]),
  { type: "led", id: `led_${id}`, x: 310, y, label: text, color, highlight },
  wire(`w_${id}_gnd`, [330, y], [340, y], [340, y + 10]),
  { type: "ground", id: `gnd_${id}`, x: 340, y: y + 10 },
];

/** Step 1: Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  title("Half Subtractor"),
  label("lbl_eq1", 190, 60, "Difference = A ⊕ B"),
  label("lbl_eq2", 190, 80, "Borrow = A' · B"),
]};

/** Step 2: XOR for Difference */
export const step02: SchematicData = { width: W, height: H, elements: [
  title("Half Subtractor — Difference"),
  xor(true), ...inputs,
  ...outLabel("d", 228, 60, "D"),
]};

/** Step 3: NOT gate for A' */
export const step03: SchematicData = { width: W, height: H, elements: [
  title("Half Subtractor — Invert A"),
  xor(), ...inputs, ...outLabel("d", 228, 60, "D"),
  // NEW
  ...notStage(true),
  wire("w_anot", [156, 120], [180, 120]),
  { type: "junction", id: "t_anot", x: 180, y: 120 },
]};

/** Step 4: AND gate for Borrow */
export const step04: SchematicData = { width: W, height: H, elements: [
  title("Half Subtractor — Borrow"),
  xor(), ...inputs, ...notStage(), ...andStage(true),
  ...outLed("d", 228, 60, "D", "green"),
  ...outLed("bo", 246, 144, "Bo", "red", true),
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
