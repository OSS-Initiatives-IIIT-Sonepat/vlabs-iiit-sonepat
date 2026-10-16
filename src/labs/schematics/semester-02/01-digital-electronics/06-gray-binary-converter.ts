import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * S2 Gray-Binary Converter (Binary to Gray)
 * G3=B3, G2=B3⊕B2, G1=B2⊕B1, G0=B1⊕B0
 *
 * Input buses run down from the top: B3 x40, B2 x60, B1 x80, B0 x100.
 * XOR G2 (200,130) in (172,122)/(172,138), XOR G1 (200,190), XOR G0 (200,250); outputs at x228.
 * G3 is tapped straight off the B3 bus at y70.
 */

const W = 520;
const H = 320;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });

/** Gate output → 330Ω → LED → ground. */
const outStage = (id: string, y: number, text: string, highlight?: boolean): SchematicElement[] => [
  { type: "resistor", id: `r_${id}`, x: 400, y, label: "330Ω", highlight },
  wire(`w_${id}_led`, [430, y], [440, y]),
  { type: "led", id: `led_${id}`, x: 460, y, label: text, highlight },
  wire(`w_${id}_gnd`, [480, y], [495, y], [495, y + 10]),
  { type: "ground", id: `gnd_${id}`, x: 495, y: y + 10 },
];

const XORS = [
  { id: "xor1", y: 130, text: "G2" },
  { id: "xor2", y: 190, text: "G1" },
  { id: "xor3", y: 250, text: "G0" },
] as const;

type Group = "gates" | "inputs" | "leds" | "outs";
const ALL: Group[] = ["gates", "inputs", "leds", "outs"];

const circuit = (show: Group[], highlight: Group[] = []): SchematicElement[] => {
  const has = (g: Group) => show.includes(g) || highlight.includes(g);
  const h = (g: Group) => highlight.includes(g) || undefined;
  const w = (g: Group, id: string, ...pts: [number, number][]) => ({ ...wire(id, ...pts), highlight: h(g) });
  const els: SchematicElement[] = [];
  if (has("gates")) {
    for (const x of XORS) els.push({ type: "xor-gate", id: x.id, x: 200, y: x.y, label: x.text, highlight: h("gates") });
  }
  if (has("inputs")) {
    els.push(
      label("lb3", 40, 48, "B3"), label("lb2", 60, 48, "B2"), label("lb1", 80, 48, "B1"), label("lb0", 100, 48, "B0"),
      junction("tb3", 40, 58), junction("tb2", 60, 58), junction("tb1", 80, 58), junction("tb0", 100, 58),
      w("inputs", "wb3", [40, 58], [40, 122], [172, 122]),
      w("inputs", "wb2", [60, 58], [60, 182], [172, 182]),
      w("inputs", "wb2_x", [60, 138], [172, 138]), junction("jb2", 60, 138),
      w("inputs", "wb1", [80, 58], [80, 242], [172, 242]),
      w("inputs", "wb1_x", [80, 198], [172, 198]), junction("jb1", 80, 198),
      w("inputs", "wb0", [100, 58], [100, 258], [172, 258]),
    );
  }
  if (has("leds")) {
    els.push(...outStage("g3", 70, "G3", h("leds")));
    for (const x of XORS) els.push(...outStage(x.text.toLowerCase(), x.y, x.text, h("leds")));
  }
  if (has("outs")) {
    els.push(w("outs", "w_g3", [40, 70], [370, 70]), junction("jb3", 40, 70));
    for (const x of XORS) els.push(w("outs", `w_${x.text.toLowerCase()}`, [228, x.y], [370, x.y]));
  }
  return els;
};

/** Step 1: Breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 1: Breadboard Setup"),
  { type: "vsource", id: "vcc", x: 60, y: 130, label: "+5V" },
  { ...wire("w1", [60, 100], [60, 80], [440, 80]), highlight: true },
  junction("t1", 440, 80),
  { ...wire("w2", [60, 160], [60, 180], [440, 180]), highlight: true },
  junction("t2", 440, 180),
  { type: "ground", id: "gnd", x: 60, y: 180 },
  junction("jg", 60, 180),
  label("desc", 260, 260, "4-bit Binary to Gray converter"),
]};

/** Step 2: Mount XOR gates */
export const step02: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 2: Mount XOR Gates"),
  ...circuit([], ["gates"]),
  label("eq1", 320, 130, "G2 = B3⊕B2"),
  label("eq2", 320, 190, "G1 = B2⊕B1"),
  label("eq3", 320, 250, "G0 = B1⊕B0"),
  label("g3", 260, 305, "G3 = B3 (passthrough)"),
]};

/** Step 3: Wire binary inputs */
export const step03: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 3: Wire Binary Inputs"),
  ...circuit(["gates"], ["inputs"]),
  label("note", 260, 305, "B3/B2→XOR, B2/B1→XOR, B1/B0→XOR"),
]};

/** Step 4: Add resistors and LEDs */
export const step04: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 4: Output LEDs"),
  ...circuit(["gates", "inputs"], ["leds"]),
  label("colors", 260, 305, "G3=Red, G2=Yellow, G1=Green, G0=Blue"),
]};

/** Step 5: Connect outputs */
export const step05: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 5: Output Wiring"),
  ...circuit(ALL, ["outs"]),
  label("desc", 260, 305, "B3 direct to G3, XOR outputs to G2-G0"),
]};

/** Step 6: Test Binary 0011 → Gray 0010 */
export const step06: SchematicData = { width: 420, height: 280, elements: [
  label("title", 210, 20, "Step 6: Test Binary 0011 (3)"),
  label("input", 210, 55, "B3=0, B2=0, B1=1, B0=1"),
  label("g3", 100, 100, "G3 = B3 = 0"),
  label("g2", 100, 130, "G2 = 0⊕0 = 0"),
  label("g1", 100, 160, "G1 = 0⊕1 = 1"),
  label("g0", 100, 190, "G0 = 1⊕1 = 0"),
  label("result", 210, 240, "Gray code: 0010 ✓"),
]};

/** Step 7: Test Binary 0111 → Gray 0100 */
export const step07: SchematicData = { width: 420, height: 280, elements: [
  label("title", 210, 20, "Step 7: Test Binary 0111 (7)"),
  label("input", 210, 55, "B3=0, B2=1, B1=1, B0=1"),
  label("g3", 100, 100, "G3 = B3 = 0"),
  label("g2", 100, 130, "G2 = 0⊕1 = 1"),
  label("g1", 100, 160, "G1 = 1⊕1 = 0"),
  label("g0", 100, 190, "G0 = 1⊕1 = 0"),
  label("result", 210, 240, "Gray code: 0100 ✓"),
]};

export const s2GrayBinaryConverterStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07,
];

export const s2GrayBinaryConverterTheoryDiagram: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Binary to Gray Code Converter"),
  ...circuit(ALL),
  label("eq", 260, 305, "Gi = Bi+1 ⊕ Bi (MSB passes through); adjacent codes differ by 1 bit"),
]};
