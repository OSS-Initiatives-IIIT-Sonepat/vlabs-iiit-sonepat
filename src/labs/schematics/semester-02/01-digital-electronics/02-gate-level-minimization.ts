import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * S2 Gate-Level Minimization — Two-level vs Multi-level implementations
 * F = AB + AC (two-level) vs F = A(B+C) (multi-level)
 *
 * Two-level:  AND1 (180,100) in (154,92)/(154,108)   AND2 (180,180) in (154,172)/(154,188)
 *             OR   (290,140) in (264,132)/(264,148)  out (316,140)
 * Multi-level: OR (180,150) in (154,142)/(154,158)   AND (290,142) in (264,134)/(264,150)
 */

const W = 420;
const H = 300;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);

/** Output LED with its cathode returned to ground. */
const outLed = (id: string, fromX: number, y: number, text: string, highlight?: boolean): SchematicElement[] => [
  hl(wire(`w_${id}`, [fromX, y], [340, y]), highlight),
  { type: "led", id: `led_${id}`, x: 360, y, label: text, highlight },
  wire(`w_${id}_gnd`, [380, y], [390, y], [390, y + 10]),
  { type: "ground", id: `gnd_${id}`, x: 390, y: y + 10 },
];

type Parts = {
  dy?: number;
  gates?: boolean;
  inputs?: boolean;
  led?: boolean;
  names?: [string, string, string];
};

/** F1 = AB + AC, shifted down by dy. */
const twoLevel = ({ dy = 0, gates, inputs, led, names = ["AB", "AC", "F1"] }: Parts = {}): SchematicElement[] => {
  const y = (v: number) => v + dy;
  return [
    { type: "and-gate", id: "and1", x: 180, y: y(100), label: names[0], highlight: gates },
    { type: "and-gate", id: "and2", x: 180, y: y(180), label: names[1], highlight: gates },
    { type: "or-gate", id: "or1", x: 290, y: y(140), label: names[2], highlight: gates },
    wire("w_and1_or", [206, y(100)], [230, y(100)], [230, y(132)], [264, y(132)]),
    wire("w_and2_or", [206, y(180)], [240, y(180)], [240, y(148)], [264, y(148)]),
    label("la1", 20, y(92), "A"), hl(wire("wa1", [30, y(92)], [154, y(92)]), inputs),
    hl(wire("wa_share", [80, y(92)], [80, y(172)], [154, y(172)]), inputs), junction("ja1", 80, y(92)),
    label("lb1", 20, y(108), "B"), hl(wire("wb1", [30, y(108)], [154, y(108)]), inputs),
    label("lc1", 20, y(188), "C"), hl(wire("wc1", [30, y(188)], [154, y(188)]), inputs),
    ...(led ? outLed("f1", 316, y(140), "F1", false) : []),
  ];
};

/** F2 = A(B+C), shifted down by dy. */
const multiLevel = ({ dy = 0, gates, inputs, led, names = ["B+C", "F2", ""] }: Parts = {}): SchematicElement[] => {
  const y = (v: number) => v + dy;
  return [
    { type: "or-gate", id: "or2", x: 180, y: y(150), label: names[0], highlight: gates },
    { type: "and-gate", id: "and3", x: 290, y: y(142), label: names[1], highlight: gates },
    wire("w_or_and", [206, y(150)], [264, y(150)]),
    label("la2", 20, y(90), "A"), hl(wire("wa2", [30, y(90)], [240, y(90)], [240, y(134)], [264, y(134)]), inputs),
    label("lb2", 20, y(142), "B"), hl(wire("wb2", [30, y(142)], [154, y(142)]), inputs),
    label("lc2", 20, y(158), "C"), hl(wire("wc2", [30, y(158)], [154, y(158)]), inputs),
    ...(led ? outLed("f2", 316, y(142), "F2", false) : []),
  ];
};

const title = (text: string) => label("title", 210, 20, text);
const desc = (text: string, y = 270) => label("desc", 210, y, text);

/** Step 1: Place breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  title("Step 1: Breadboard Setup"),
  { type: "vsource", id: "vcc", x: 60, y: 130, label: "+5V" },
  { ...wire("w1", [60, 100], [60, 60], [360, 60]), highlight: true }, junction("t_vcc", 360, 60),
  { ...wire("w2", [60, 160], [60, 200], [360, 200]), highlight: true }, junction("t_gnd", 360, 200),
  { type: "ground", id: "gnd", x: 60, y: 200 }, junction("j_gnd", 60, 200),
  desc("Power rails for two implementations", 260),
]};

/** Step 2: Place two-level gates (2 AND + 1 OR) */
export const step02: SchematicData = { width: W, height: H, elements: [
  title("Step 2: Two-Level Gates"),
  label("subtitle", 210, 50, "F1 = AB + AC"),
  ...twoLevel({ gates: true }).filter((el) => el.type.endsWith("-gate") || el.id.startsWith("w_and")),
  desc("2 AND gates + 1 OR gate (3 gates total)"),
]};

/** Step 3: Wire two-level inputs */
export const step03: SchematicData = { width: W, height: H, elements: [
  title("Step 3: Wire Two-Level Inputs"),
  ...twoLevel({ inputs: true }),
  desc("A shared between both AND gates"),
]};

/** Step 4: Connect OR level and F1 output */
export const step04: SchematicData = { width: W, height: H, elements: [
  title("Step 4: OR Gate and F1 Output"),
  ...twoLevel(),
  ...outLed("f1", 316, 140, "F1", true),
  desc("F1 = AB + AC output to LED"),
]};

/** Step 5: Verify two-level */
export const step05: SchematicData = { width: W, height: H, elements: [
  title("Step 5: Verify Two-Level Circuit"),
  ...twoLevel({ led: true }),
  label("stats", 210, 245, "3 gates, 4 literals, 2-level delay"),
  desc("Test all 8 combinations (A,B,C)"),
]};

/** Step 6: Place multi-level gates (1 OR + 1 AND) */
export const step06: SchematicData = { width: W, height: H, elements: [
  title("Step 6: Multi-Level Gates"),
  label("subtitle", 210, 50, "F2 = A(B+C)"),
  ...multiLevel({ gates: true }).filter((el) => el.type.endsWith("-gate") || el.id === "w_or_and"),
  desc("1 OR gate + 1 AND gate (2 gates total)"),
]};

/** Step 7: Wire multi-level */
export const step07: SchematicData = { width: W, height: H, elements: [
  title("Step 7: Wire Multi-Level"),
  ...multiLevel({ inputs: true }),
  desc("A to AND, B+C from OR to AND"),
]};

/** Step 8: Connect F2 indicator */
export const step08: SchematicData = { width: W, height: H, elements: [
  title("Step 8: F2 Output Indicator"),
  ...multiLevel(),
  ...outLed("f2", 316, 142, "F2", true),
  label("stats", 210, 245, "2 gates, 3 literals, 2-level delay"),
  desc("F2 = A(B+C) output to LED"),
]};

/** Step 9: Compare outputs */
export const step09: SchematicData = { width: W, height: 360, elements: [
  title("Step 9: Compare F1 and F2"),
  ...twoLevel({ dy: -20, led: true }),
  ...multiLevel({ dy: 150, led: true }),
  desc("Both LEDs match: F1 = F2 for all inputs", 345),
]};

/** Step 10: Check zero case */
export const step10: SchematicData = { width: W, height: H, elements: [
  title("Step 10: Zero Output Case"),
  label("inputs", 210, 50, "A=0, B=x, C=x"),
  ...twoLevel({ led: true, names: ["AB=0", "AC=0", "F1=0"] }),
  label("res", 210, 245, "When A=0: F = 0·(B+C) = 0"),
  desc("Both outputs OFF - verified!"),
]};

export const s2GateMinimizationStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10,
];

export const s2GateMinimizationTheoryDiagram: SchematicData = { width: W, height: 360, elements: [
  label("title", 210, 20, "Gate Minimization: F = AB + AC = A(B+C)"),
  ...twoLevel({ dy: -20, led: true }),
  ...multiLevel({ dy: 150, led: true }),
  desc("Two-level: 3 gates · Multi-level: 2 gates (same function)", 345),
]};
