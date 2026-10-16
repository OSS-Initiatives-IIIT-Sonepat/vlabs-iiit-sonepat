import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * S2 4:2 Priority Encoder
 * A = I2 + I3, B = I1 + I3
 *
 * Input buses run down from the top: I0 x40 (unused), I1 x60, I2 x80, I3 x100.
 * OR_A (220,110) in (194,102)/(194,118)   OR_B (220,190) in (194,182)/(194,198); outputs at x246.
 */

const W = 420;
const H = 280;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);

/** Gate output → 330Ω → LED → ground. */
const outStage = (id: string, y: number, text: string, highlight?: boolean): SchematicElement[] => [
  hl(wire(`w_${id}`, [246, y], [270, y]), highlight),
  { type: "resistor", id: `r_${id}`, x: 300, y, label: "330Ω", highlight },
  wire(`w_${id}_led`, [330, y], [340, y]),
  { type: "led", id: `led_${id}`, x: 360, y, label: text, highlight },
  wire(`w_${id}_gnd`, [380, y], [395, y], [395, y + 10]),
  { type: "ground", id: `gnd_${id}`, x: 395, y: y + 10 },
];

type Opts = {
  names?: [string, string, string, string];
  gates?: [string, string];
  hlGates?: boolean;
  hlInputs?: boolean;
  leds?: boolean;
  hlLeds?: boolean;
};

const encoder = ({ names = ["I0", "I1", "I2", "I3"], gates = ["A", "B"], hlGates, hlInputs, leds, hlLeds }: Opts = {}): SchematicElement[] => [
  { type: "or-gate", id: "or1", x: 220, y: 110, label: gates[0], highlight: hlGates },
  { type: "or-gate", id: "or2", x: 220, y: 190, label: gates[1], highlight: hlGates },
  ...[40, 60, 80, 100].flatMap((x, i) => [label(`li${i}`, x, 48, names[i]), junction(`ti${i}`, x, 58)]),
  hl(wire("wi0", [40, 58], [40, 80]), hlInputs), junction("ti0_end", 40, 80),
  hl(wire("wi1", [60, 58], [60, 182], [194, 182]), hlInputs),
  hl(wire("wi2", [80, 58], [80, 102], [194, 102]), hlInputs),
  hl(wire("wi3", [100, 58], [100, 198], [194, 198]), hlInputs),
  hl(wire("wi3a", [100, 118], [194, 118]), hlInputs), junction("ji3", 100, 118),
  ...(leds ? [...outStage("a", 110, "A (MSB)", hlLeds), ...outStage("b", 190, "B (LSB)", hlLeds)] : []),
];

/** Step 1: Setup breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 1: Breadboard Setup"),
  { type: "vsource", id: "vcc", x: 60, y: 130, label: "+5V" },
  { ...wire("w1", [60, 100], [60, 80], [340, 80]), highlight: true },
  junction("t1", 340, 80),
  { ...wire("w2", [60, 160], [60, 180], [340, 180]), highlight: true },
  junction("t2", 340, 180),
  { type: "ground", id: "gnd", x: 60, y: 180 },
  junction("jg", 60, 180),
  label("desc", 210, 250, "4:2 Encoder: 4 inputs → 2-bit binary code"),
]};

/** Step 2: Wire OR gates for outputs A and B */
export const step02: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 2: OR Gates for A, B"),
  ...encoder({ hlGates: true }),
  label("eq", 210, 245, "A (MSB) = I2 + I3,  B (LSB) = I1 + I3"),
  label("desc", 210, 265, "Only 2 OR gates needed (74HC32)"),
]};

/** Step 3: Connect all input lines */
export const step03: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 3: Wire Input Lines and LEDs"),
  ...encoder({ hlInputs: true, leds: true }),
  label("desc", 210, 245, "I3 connects to BOTH OR gates; I0 is not used"),
]};

/** Step 4: Test each input individually */
export const step04: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 4: Test Individual Inputs"),
  label("header", 210, 55, "Input | A B | Code"),
  label("r0", 210, 85, "I0=1  | 0 0 |  00"),
  label("r1", 210, 110, "I1=1  | 0 1 |  01"),
  label("r2", 210, 135, "I2=1  | 1 0 |  10"),
  label("r3", 210, 160, "I3=1  | 1 1 |  11"),
  label("note", 210, 200, "Each input produces unique binary code"),
  label("desc", 210, 240, "Verify LEDs show correct output"),
]};

/** Step 5: Test priority with simultaneous inputs */
export const step05: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 5: Priority Behavior"),
  ...encoder({ names: ["0", "I1=1", "0", "I3=1"], gates: ["A=1", "B=1"], hlLeds: true, leds: true }),
  label("result", 210, 245, "I1=1 and I3=1 together → Output = 11"),
  label("note", 210, 265, "I3 has highest priority"),
]};

export const s2Encoder4to2StepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
];

export const s2Encoder4to2TheoryDiagram: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "4:2 Priority Encoder"),
  ...encoder({ leds: true }),
  label("eq", 210, 255, "A = I2 + I3,  B = I1 + I3"),
]};
