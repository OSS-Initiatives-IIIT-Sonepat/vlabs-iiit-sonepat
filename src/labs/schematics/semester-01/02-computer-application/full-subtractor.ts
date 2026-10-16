import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Full Subtractor — progressive 2D schematics.
 * Difference = A ⊕ B ⊕ Bin
 * Bout = A'·B + Bin·(A⊕B)'
 */

const W = 470;
const H = 250;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const title = (text: string) => label("lbl_title", 235, 20, text);

// XOR1 (130,60): in (102,52)/(102,68), out (158,60)
// XOR2 (260,68): in (232,60)/(232,76), out (288,68)
// NOT2 (220,152): in (198,152), out (246,152)      — (A⊕B)'
// AND2 (300,128): in (274,120)/(274,136), out (326,128)
// NOT1 (110,190): in (88,190), out (136,190)       — A'
// AND1 (190,206): in (164,198)/(164,214), out (216,206)
// OR   (370,175): in (344,167)/(344,183), out (396,175)
const xor1 = (highlight?: boolean): SchematicElement => ({ type: "xor-gate", id: "XOR1", x: 130, y: 60, label: "XOR1", highlight });
const xor2 = (highlight?: boolean): SchematicElement => ({ type: "xor-gate", id: "XOR2", x: 260, y: 68, label: "XOR2", highlight });

const inputs: SchematicElement[] = [
  label("lbl_a", 20, 52, "A"), wire("w_a", [30, 52], [102, 52]),
  label("lbl_b", 20, 68, "B"), wire("w_b", [30, 68], [102, 68]),
];
const xor1ToXor2 = wire("w_xor1_xor2", [158, 60], [232, 60]);
const outLed = (id: string, fromX: number, y: number, text: string, color: string): SchematicElement[] => [
  wire(`w_${id}`, [fromX, y], [400, y]),
  { type: "led", id: `led_${id}`, x: 420, y, label: text, color },
  wire(`w_${id}_gnd`, [440, y], [450, y], [450, y + 10]),
  { type: "ground", id: `gnd_${id}`, x: 450, y: y + 10 },
];

/** Step 1: Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  title("Full Subtractor"),
  label("lbl_eq1", 235, 60, "Diff = A ⊕ B ⊕ Bin"),
  label("lbl_eq2", 235, 80, "Bout = A'B + Bin(A⊕B)'"),
]};

/** Step 2: XOR gates for Difference */
export const step02: SchematicData = { width: W, height: H, elements: [
  title("Full Subtractor — Difference"),
  xor1(true), xor2(true), ...inputs, xor1ToXor2,
  label("lbl_bin", 16, 100, "Bin"),
  wire("w_bin", [30, 100], [210, 100], [210, 76], [232, 76]),
  wire("w_diff", [288, 68], [380, 68]), junction("t_diff", 380, 68),
  label("lbl_diff", 394, 68, "D"),
]};

/** Steps 3-6: Complete circuit with borrow logic */
export const step03: SchematicData = { width: W, height: H, elements: [
  title("Full Subtractor — Complete"),
  xor1(), xor2(), ...inputs, xor1ToXor2,
  // Bin → XOR2 and AND2
  label("lbl_bin", 16, 100, "Bin"),
  wire("w_bin", [30, 100], [250, 100], [250, 120], [274, 120]),
  wire("w_bin_xor2", [210, 100], [210, 76], [232, 76]), junction("j_bin", 210, 100),
  // (A⊕B)' → AND2
  { type: "not-gate", id: "NOT2", x: 220, y: 152, label: "(A⊕B)'", highlight: true },
  wire("w_xor1_not2", [190, 60], [190, 152], [198, 152]), junction("j_xor1", 190, 60),
  wire("w_not2_and2", [246, 152], [262, 152], [262, 136], [274, 136]),
  { type: "and-gate", id: "AND2", x: 300, y: 128, label: "AND2", highlight: true },
  // A'·B → AND1
  { type: "not-gate", id: "NOT1", x: 110, y: 190, label: "A'", highlight: true },
  wire("w_a_not1", [75, 52], [75, 190], [88, 190]), junction("j_a", 75, 52),
  wire("w_not1_and1", [136, 190], [150, 190], [150, 198], [164, 198]),
  wire("w_b_and1", [60, 68], [60, 214], [164, 214]), junction("j_b", 60, 68),
  { type: "and-gate", id: "AND1", x: 190, y: 206, label: "A'B", highlight: true },
  // OR for Bout
  { type: "or-gate", id: "OR", x: 370, y: 175, label: "OR", highlight: true },
  wire("w_and2_or", [326, 128], [335, 128], [335, 167], [344, 167]),
  wire("w_and1_or", [216, 206], [325, 206], [325, 183], [344, 183]),
  // Outputs
  ...outLed("d", 288, 68, "D", "green"),
  ...outLed("bo", 396, 175, "Bout", "red"),
]};

export const step04 = step03;
export const step05 = step03;
export const step06 = step03;

/** Indexed array */
export const fullSubtractorStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06,
];

/** Theory diagram */
export const fullSubtractorTheoryDiagram: SchematicData = step03;
