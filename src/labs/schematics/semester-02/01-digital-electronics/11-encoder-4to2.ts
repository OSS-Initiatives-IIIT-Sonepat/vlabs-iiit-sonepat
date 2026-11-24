import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

/*
 * S2 4:2 Priority Encoder (I3 highest)
 * A = I3 + I2, B = I3 + I1·I2'
 *
 * Input buses run down from the top: I0 x40 (unused), I1 x60, I2 x80, I3 x100.
 * OR_A (250,100) in (224,92)/(224,108)   OR_B (250,200) in (224,192)/(224,208)
 * NOT (130,150) in (108,150) out (156,150)
 * AND (190,215) in (164,207)/(164,223) out (216,215); outputs at x276.
 */

const W = 420;
const H = 300;

const wire = (
  id: string,
  ...pts: [number, number][]
): Extract<SchematicElement, { type: "wire" }> => ({
  type: "wire",
  id,
  points: pts.map(([x, y]) => ({ x, y })),
});
const label = (
  id: string,
  x: number,
  y: number,
  text: string,
): SchematicElement => ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({
  type: "junction",
  id,
  x,
  y,
});
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T =>
  highlight ? { ...el, highlight } : el;

/** Gate output → 330Ω → LED → ground. */
const outStage = (
  id: string,
  y: number,
  text: string,
  highlight?: boolean,
): SchematicElement[] => [
  hl(wire(`w_${id}`, [276, y], [280, y]), highlight),
  { type: "resistor", id: `r_${id}`, x: 310, y, label: "330Ω", highlight },
  wire(`w_${id}_led`, [340, y], [345, y]),
  { type: "led", id: `led_${id}`, x: 365, y, label: text, highlight },
  wire(`w_${id}_gnd`, [385, y], [400, y], [400, y + 10]),
  { type: "ground", id: `gnd_${id}`, x: 400, y: y + 10 },
];

type Opts = {
  names?: [string, string, string, string];
  gates?: [string, string];
  hlGates?: boolean;
  hlInputs?: boolean;
  leds?: boolean;
  hlLeds?: boolean;
};

const encoder = ({
  names = ["I0", "I1", "I2", "I3"],
  gates = ["A", "B"],
  hlGates,
  hlInputs,
  leds,
  hlLeds,
}: Opts = {}): SchematicElement[] => [
  {
    type: "or-gate",
    id: "or1",
    x: 250,
    y: 100,
    label: gates[0],
    highlight: hlGates,
  },
  {
    type: "or-gate",
    id: "or2",
    x: 250,
    y: 200,
    label: gates[1],
    highlight: hlGates,
  },
  { type: "not-gate", id: "not_i2", x: 130, y: 150, highlight: hlGates },
  { type: "and-gate", id: "and_m", x: 190, y: 215, highlight: hlGates },
  ...[40, 60, 80, 100].flatMap((x, i) => [
    label(`li${i}`, x, 48, names[i]),
    junction(`ti${i}`, x, 58),
  ]),
  hl(wire("wi0", [40, 58], [40, 80]), hlInputs),
  junction("ti0_end", 40, 80),
  // I1 → AND
  hl(wire("wi1", [60, 58], [60, 223], [164, 223]), hlInputs),
  // I2 → OR A and → NOT
  hl(wire("wi2", [80, 58], [80, 150], [108, 150]), hlInputs),
  hl(wire("wi2a", [80, 92], [224, 92]), hlInputs),
  junction("ji2", 80, 92),
  // I3 → OR A and OR B
  hl(wire("wi3", [100, 58], [100, 192], [224, 192]), hlInputs),
  hl(wire("wi3a", [100, 108], [224, 108]), hlInputs),
  junction("ji3", 100, 108),
  // I2' → AND, AND → OR B
  wire("w_ni2", [156, 150], [160, 150], [160, 207], [164, 207]),
  wire("w_m", [216, 215], [220, 215], [220, 208], [224, 208]),
  ...(leds
    ? [
        ...outStage("a", 100, "A (MSB)", hlLeds),
        ...outStage("b", 200, "B (LSB)", hlLeds),
      ]
    : []),
];

/** Step 1: Setup breadboard */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    label("title", 210, 20, "Step 1: Breadboard Setup"),
    { type: "vsource", id: "vcc", x: 60, y: 130, label: "+5V" },
    { ...wire("w1", [60, 100], [60, 80], [340, 80]), highlight: true },
    junction("t1", 340, 80),
    { ...wire("w2", [60, 160], [60, 180], [340, 180]), highlight: true },
    junction("t2", 340, 180),
    { type: "ground", id: "gnd", x: 60, y: 180 },
    junction("jg", 60, 180),
    label("desc", 210, 250, "4:2 Priority Encoder: 4 inputs → 2-bit code"),
  ],
};

/** Step 2: Wire the gates for outputs A and B */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    label("title", 210, 20, "Step 2: Gates for A, B"),
    ...encoder({ hlGates: true }),
    label("eq", 210, 265, "A (MSB) = I3 + I2,  B (LSB) = I3 + I1·I2'"),
    label("desc", 210, 285, "74HC32 (2 OR) + 74HC04 (I2') + 74HC08 (I1·I2')"),
  ],
};

/** Step 3: Connect all input lines */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    label("title", 210, 20, "Step 3: Wire Input Lines and LEDs"),
    ...encoder({ hlInputs: true, leds: true }),
    label(
      "desc",
      210,
      265,
      "I3 feeds both OR gates; I2 feeds OR A and the NOT",
    ),
  ],
};

/** Step 4: Test each input individually */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    label("title", 210, 20, "Step 4: Test Individual Inputs"),
    label("header", 210, 55, "Input | A B | Code"),
    label("r0", 210, 85, "I0=1  | 0 0 |  00"),
    label("r1", 210, 110, "I1=1  | 0 1 |  01"),
    label("r2", 210, 135, "I2=1  | 1 0 |  10"),
    label("r3", 210, 160, "I3=1  | 1 1 |  11"),
    label("note", 210, 200, "Each input produces unique binary code"),
    label("desc", 210, 240, "Verify LEDs show correct output"),
  ],
};

/** Step 5: Test priority with simultaneous inputs */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    label("title", 210, 20, "Step 5: Priority Behavior"),
    ...encoder({
      names: ["0", "I1=1", "I2=1", "0"],
      gates: ["A=1", "B=0"],
      hlLeds: true,
      leds: true,
    }),
    label("result", 210, 265, "I1=1 and I2=1 together → Output = 10"),
    label("note", 210, 285, "I2' = 0 blocks I1: the higher input wins"),
  ],
};

export const s2Encoder4to2StepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
];

export const s2Encoder4to2TheoryDiagram: SchematicData = {
  width: W,
  height: H,
  elements: [
    label("title", 210, 20, "4:2 Priority Encoder"),
    ...encoder({ leds: true }),
    label("eq", 210, 275, "A = I3 + I2,  B = I3 + I1·I2'"),
  ],
};
