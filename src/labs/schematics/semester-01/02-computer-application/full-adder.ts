import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Full Adder — progressive 2D schematics.
 * Sum = A ⊕ B ⊕ Cin
 * Cout = (A·B) + (Cin·(A⊕B))
 *
 * Two half-adders (XOR1/AND1, XOR2/AND2) plus an OR gate.
 */

const W = 460;
const H = 250;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const title = (text: string) => label("lbl_title", 230, 20, text);

// XOR1 (130,60): in (102,52)/(102,68), out (158,60)
// XOR2 (260,68): in (232,60)/(232,76), out (288,68)
// AND1 (130,190): in (104,182)/(104,198), out (156,190)
// AND2 (260,140): in (234,132)/(234,148), out (286,140)
// OR   (350,165): in (324,157)/(324,173), out (376,165)
const xor1 = (highlight?: boolean): SchematicElement => ({ type: "xor-gate", id: "XOR1", x: 130, y: 60, label: "XOR1", highlight });
const xor2 = (highlight?: boolean): SchematicElement => ({ type: "xor-gate", id: "XOR2", x: 260, y: 68, label: "XOR2", highlight });
const and1 = (highlight?: boolean): SchematicElement => ({ type: "and-gate", id: "AND1", x: 130, y: 190, label: "AND1", highlight });
const and2 = (highlight?: boolean): SchematicElement => ({ type: "and-gate", id: "AND2", x: 260, y: 140, label: "AND2", highlight });
const or = (highlight?: boolean): SchematicElement => ({ type: "or-gate", id: "OR", x: 350, y: 165, label: "OR", highlight });

const inputsAB: SchematicElement[] = [
  label("lbl_a", 20, 52, "A"), wire("w_a", [30, 52], [102, 52]),
  label("lbl_b", 20, 68, "B"), wire("w_b", [30, 68], [102, 68]),
];
const cinToXor2: SchematicElement[] = [
  label("lbl_cin", 16, 100, "Cin"),
  wire("w_cin", [30, 100], [210, 100], [210, 76], [232, 76]),
];
const xor1ToXor2 = wire("w_xor1_xor2", [158, 60], [232, 60]);
const andForks = (highlight?: boolean): SchematicElement[] => [
  { ...wire("w_a_and1", [75, 52], [75, 182], [104, 182]), highlight }, junction("j_a", 75, 52),
  { ...wire("w_b_and1", [60, 68], [60, 198], [104, 198]), highlight }, junction("j_b", 60, 68),
];
const outLabel = (id: string, pts: [number, number][], text: string, textX: number): SchematicElement[] => {
  const end = pts[pts.length - 1];
  return [wire(`w_${id}`, ...pts), junction(`t_${id}`, end[0], end[1]), label(`lbl_${id}`, textX, end[1], text)];
};
const outLed = (id: string, fromX: number, y: number, text: string, color: string): SchematicElement[] => [
  wire(`w_${id}`, [fromX, y], [380, y]),
  { type: "led", id: `led_${id}`, x: 400, y, label: text, color },
  wire(`w_${id}_gnd`, [420, y], [430, y], [430, y + 10]),
  { type: "ground", id: `gnd_${id}`, x: 430, y: y + 10 },
];

/** Step 1: Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  title("Full Adder"),
  label("lbl_eq1", 230, 60, "Sum = A ⊕ B ⊕ Cin"),
  label("lbl_eq2", 230, 80, "Cout = AB + Cin(A⊕B)"),
  label("lbl_desc", 230, 120, "Two half-adders + OR gate"),
]};

/** Step 2: First XOR (A ⊕ B) */
export const step02: SchematicData = { width: W, height: H, elements: [
  title("Full Adder — Step 1: A⊕B"),
  xor1(true), ...inputsAB,
  ...outLabel("ab", [[158, 60], [200, 60]], "A⊕B", 220),
]};

/** Step 3: Second XOR ((A⊕B) ⊕ Cin) = Sum */
export const step03: SchematicData = { width: W, height: H, elements: [
  title("Full Adder — Step 2: Sum"),
  xor1(), ...inputsAB, xor1ToXor2,
  xor2(true), ...cinToXor2,
  ...outLabel("sum", [[288, 68], [370, 68]], "Sum", 390),
]};

/** Step 4: First AND (A · B) */
export const step04: SchematicData = { width: W, height: H, elements: [
  title("Full Adder — Step 3: A·B"),
  xor1(), ...inputsAB, xor1ToXor2,
  xor2(), ...cinToXor2,
  ...outLabel("sum", [[288, 68], [370, 68]], "Sum", 390),
  // NEW
  and1(true), ...andForks(true),
  ...outLabel("ab", [[156, 190], [200, 190]], "A·B", 216),
]};

/** Steps 5-7: Complete circuit with both ANDs + OR for Cout */
export const step05: SchematicData = { width: W, height: H, elements: [
  title("Full Adder — Complete"),
  xor1(), ...inputsAB, xor1ToXor2,
  xor2(), ...cinToXor2,
  and1(), ...andForks(),
  // Second half-adder carry: AND2 = Cin · (A⊕B)
  and2(true),
  { ...wire("w_xor1_and2", [190, 60], [190, 132], [234, 132]), highlight: true }, junction("j_xor1", 190, 60),
  { ...wire("w_cin_and2", [210, 100], [210, 148], [234, 148]), highlight: true }, junction("j_cin", 210, 100),
  // Carry OR
  or(true),
  { ...wire("w_and2_or", [286, 140], [300, 140], [300, 157], [324, 157]), highlight: true },
  { ...wire("w_and1_or", [156, 190], [310, 190], [310, 173], [324, 173]), highlight: true },
  // Outputs
  ...outLed("sum", 288, 68, "S", "green"),
  ...outLed("cout", 376, 165, "Cout", "red"),
]};

export const step06 = step05;
export const step07 = step05;

/** Indexed array */
export const fullAdderStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07,
];

/** Theory diagram */
export const fullAdderTheoryDiagram: SchematicData = step05;
