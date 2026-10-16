import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * S2 Full Subtractor — D = A⊕B⊕Bin, Bout = A'B + Bin(A⊕B)' = Bin⊕(x·t)
 *
 * XOR1 x    (130,90)  in (102,82)/(102,98)    out (158,90)
 * XOR2 D    (250,98)  in (222,90)/(222,106)   out (278,98)
 * XOR3 t    (130,198) in (102,190)/(102,206)  out (158,198)
 * AND1 g    (250,190) in (224,182)/(224,198)  out (276,190)
 * XOR4 Bout (320,198) in (292,190)/(292,206)  out (348,198)
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

type Group = "diffGates" | "borrowGates" | "x" | "borrow" | "ab" | "bin" | "leds" | "outs";
const ALL: Group[] = ["diffGates", "borrowGates", "x", "borrow", "ab", "bin", "leds", "outs"];

type Names = { xor1: string; xor2: string; xor3: string; and1: string; xor4: string };
const NAMES: Names = { xor1: "x=A⊕B", xor2: "D", xor3: "t=B⊕Bin", and1: "g=x·t", xor4: "Bout" };

const circuit = (show: Group[], highlight: Group[] = [], names: Names = NAMES): SchematicElement[] => {
  const has = (g: Group) => show.includes(g) || highlight.includes(g);
  const h = (g: Group) => highlight.includes(g) || undefined;
  const w = (g: Group, id: string, ...pts: [number, number][]) => ({ ...wire(id, ...pts), highlight: h(g) });
  const els: SchematicElement[] = [];
  if (has("diffGates")) {
    els.push(
      { type: "xor-gate", id: "xor1", x: 130, y: 90, label: names.xor1, highlight: h("diffGates") },
      { type: "xor-gate", id: "xor2", x: 250, y: 98, label: names.xor2, highlight: h("diffGates") },
    );
  }
  if (has("borrowGates")) {
    els.push(
      { type: "xor-gate", id: "xor3", x: 130, y: 198, label: names.xor3, highlight: h("borrowGates") },
      { type: "and-gate", id: "and1", x: 250, y: 190, label: names.and1, highlight: h("borrowGates") },
      { type: "xor-gate", id: "xor4", x: 320, y: 198, label: names.xor4, highlight: h("borrowGates") },
    );
  }
  if (has("x")) els.push(w("x", "w_x", [158, 90], [222, 90]));
  if (has("borrow")) {
    els.push(
      w("borrow", "w_x_and", [190, 90], [190, 182], [224, 182]),
      junction("jx", 190, 90),
      w("borrow", "w_t", [158, 198], [224, 198]),
      w("borrow", "w_g", [276, 190], [292, 190]),
    );
  }
  if (has("ab")) {
    els.push(
      label("la", 20, 82, "A"), w("ab", "wa", [30, 82], [102, 82]),
      label("lb", 20, 98, "B"), w("ab", "wb", [30, 98], [102, 98]),
      w("ab", "wb_t", [80, 98], [80, 190], [102, 190]), junction("jb", 80, 98),
    );
  }
  if (has("bin")) {
    els.push(
      label("lbin", 18, 130, "Bin"),
      w("bin", "wbin", [32, 130], [205, 130], [205, 106], [222, 106]),
      w("bin", "wbin_t", [50, 130], [50, 206], [102, 206]), junction("jbin1", 50, 130),
      w("bin", "wbin_b", [50, 206], [50, 260], [284, 260], [284, 206], [292, 206]), junction("jbin2", 50, 206),
    );
  }
  if (has("leds")) els.push(...outStage("d", 98, "D", h("leds")), ...outStage("b", 198, "Bout", h("leds")));
  if (has("outs")) els.push(w("outs", "w_d", [278, 98], [370, 98]), w("outs", "w_bout", [348, 198], [370, 198]));
  return els;
};

/** Step 1: Place breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 1: Breadboard Setup"),
  { type: "vsource", id: "vcc", x: 60, y: 140, label: "+5V" },
  { ...wire("w1", [60, 110], [60, 80], [440, 80]), highlight: true },
  junction("t1", 440, 80),
  { ...wire("w2", [60, 170], [60, 200], [440, 200]), highlight: true },
  junction("t2", 440, 200),
  { type: "ground", id: "gnd", x: 60, y: 200 },
  junction("jg", 60, 200),
  label("desc", 260, 280, "Power rails for full subtractor"),
]};

/** Step 2: Place difference gates (2 XOR) */
export const step02: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 2: Difference Gates"),
  label("eq", 260, 45, "D = A⊕B⊕Bin"),
  ...circuit(["x"], ["diffGates"]),
  label("desc", 260, 300, "Same as full adder Sum path"),
]};

/** Step 3: Place borrow gates (XOR, AND, XOR) */
export const step03: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 3: Borrow Gates"),
  label("eq", 260, 45, "Bout = Bin⊕g where g = x·t, t = B⊕Bin"),
  ...circuit(["diffGates", "x"], ["borrowGates"]),
  label("desc", 260, 300, "5-gate implementation (no NOT gates)"),
]};

/** Step 4: Place output LEDs */
export const step04: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 4: Output LEDs"),
  ...circuit(["diffGates", "borrowGates", "x"], ["leds"]),
  label("desc", 260, 300, "D and Bout LEDs with 330Ω resistors"),
]};

/** Step 5: Wire inputs A, B */
export const step05: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 5: Wire Inputs A, B"),
  ...circuit(["diffGates", "borrowGates", "x", "leds"], ["ab"]),
  label("desc", 260, 300, "A to x-XOR only, B to x-XOR and t-XOR"),
]};

/** Step 6: Wire Bin */
export const step06: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 6: Wire Borrow-In"),
  ...circuit(["diffGates", "borrowGates", "x", "leds", "ab"], ["bin"]),
  label("desc", 260, 300, "Bin to D-XOR, t-XOR, and Bout-XOR"),
]};

/** Step 7: Wire internal signals */
export const step07: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 7: Internal Signal Wiring"),
  ...circuit(["diffGates", "borrowGates", "x", "leds", "ab", "bin"], ["borrow"]),
  label("desc", 260, 300, "x and t to AND, g to Bout-XOR"),
]};

/** Step 8: Wire outputs */
export const step08: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 8: Complete Output Wiring"),
  ...circuit(ALL, ["outs"]),
  label("desc", 260, 300, "Diff and Bout outputs to grounded LEDs"),
]};

/** Step 9: Test A=0, B=1, Bin=0 → D=1, Bout=1 */
export const step09: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 9: Test A=0, B=1, Bin=0"),
  label("inputs", 260, 45, "0 - 1 - 0 = -1 (borrow needed)"),
  ...circuit(ALL, [], { xor1: "0⊕1=1", xor2: "1⊕0=1", xor3: "1⊕0=1", and1: "1·1=1", xor4: "0⊕1=1" }),
  label("res", 260, 300, "D=1, Bout=1 (result = -1₁₀)"),
]};

/** Step 10: Test A=1, B=1, Bin=1 → D=1, Bout=1 */
export const step10: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 10: Test A=1, B=1, Bin=1"),
  label("inputs", 260, 45, "1 - 1 - 1 = -1 (borrow needed)"),
  ...circuit(ALL, [], { xor1: "1⊕1=0", xor2: "0⊕1=1", xor3: "1⊕1=0", and1: "0·0=0", xor4: "1⊕0=1" }),
  label("res", 260, 300, "D=1, Bout=1 (result = -1₁₀)"),
]};

export const s2FullSubtractorStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10,
];

export const s2FullSubtractorTheoryDiagram: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Full Subtractor (5-Gate)"),
  ...circuit(ALL),
  label("eq", 260, 300, "D = A⊕B⊕Bin, Bout = Bin⊕(x·t)"),
]};
