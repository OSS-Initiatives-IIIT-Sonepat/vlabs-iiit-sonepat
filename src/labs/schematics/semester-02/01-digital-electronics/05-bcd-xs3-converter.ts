import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * S2 BCD to Excess-3 Converter
 * W = A + B(C+D), X = B ⊕ (C+D), Y = (C⊕D)', Z = D'
 *
 * Input buses run down from the top: A x40, B x60, C x80, D x100.
 * OR1  C+D    (160,150) in (134,142)/(134,158)  out (186,150)
 * AND1 B(C+D) (250,104) in (224,96)/(224,112)   out (276,104)
 * OR2  W      (330,78)  in (304,70)/(304,86)    out (356,78)
 * XOR1 X      (330,170) in (302,162)/(302,178)  out (358,170)
 * XOR2 C⊕D    (160,230) in (132,222)/(132,238)  out (188,230)
 * NOT1 Y      (260,230) in (238,230)            out (286,230)
 * NOT2 Z      (260,290) in (238,290)            out (286,290)
 */

const W = 520;
const H = 350;

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

const OUTPUTS = [
  { id: "w", fromX: 356, y: 78, text: "W" },
  { id: "x", fromX: 358, y: 170, text: "X" },
  { id: "y", fromX: 286, y: 230, text: "Y" },
  { id: "z", fromX: 286, y: 290, text: "Z" },
] as const;

type Group = "notXor" | "andOr" | "internal" | "inputs" | "leds" | "outs";
const ALL: Group[] = ["notXor", "andOr", "internal", "inputs", "leds", "outs"];

const circuit = (show: Group[], highlight: Group[] = []): SchematicElement[] => {
  const has = (g: Group) => show.includes(g) || highlight.includes(g);
  const h = (g: Group) => highlight.includes(g) || undefined;
  const w = (g: Group, id: string, ...pts: [number, number][]) => ({ ...wire(id, ...pts), highlight: h(g) });
  const els: SchematicElement[] = [];
  if (has("notXor")) {
    els.push(
      { type: "xor-gate", id: "xor1", x: 330, y: 170, label: "X", highlight: h("notXor") },
      { type: "xor-gate", id: "xor2", x: 160, y: 230, label: "C⊕D", highlight: h("notXor") },
      { type: "not-gate", id: "not1", x: 260, y: 230, label: "Y", highlight: h("notXor") },
      { type: "not-gate", id: "not2", x: 260, y: 290, label: "Z", highlight: h("notXor") },
    );
  }
  if (has("andOr")) {
    els.push(
      { type: "or-gate", id: "or1", x: 160, y: 150, label: "C+D", highlight: h("andOr") },
      { type: "and-gate", id: "and1", x: 250, y: 104, label: "B(C+D)", highlight: h("andOr") },
      { type: "or-gate", id: "or2", x: 330, y: 78, label: "W", highlight: h("andOr") },
    );
  }
  if (has("internal")) {
    els.push(
      w("internal", "w_cd", [186, 150], [200, 150]),
      w("internal", "w_cd_and", [200, 150], [200, 112], [224, 112]),
      w("internal", "w_cd_xor", [200, 150], [200, 162], [302, 162]),
      junction("jcd", 200, 150),
      w("internal", "w_and_or", [276, 104], [290, 104], [290, 86], [304, 86]),
      w("internal", "w_xor_not", [188, 230], [238, 230]),
    );
  }
  if (has("inputs")) {
    els.push(
      label("la", 40, 48, "A"), label("lb", 60, 48, "B"), label("lc", 80, 48, "C"), label("ld", 100, 48, "D"),
      junction("ta", 40, 58), junction("tb", 60, 58), junction("tc", 80, 58), junction("td", 100, 58),
      w("inputs", "wa", [40, 58], [40, 70], [304, 70]),
      w("inputs", "wb", [60, 58], [60, 178], [302, 178]),
      w("inputs", "wb_and", [60, 96], [224, 96]), junction("jb", 60, 96),
      w("inputs", "wc", [80, 58], [80, 222], [132, 222]),
      w("inputs", "wc_or", [80, 142], [134, 142]), junction("jc", 80, 142),
      w("inputs", "wd", [100, 58], [100, 290], [238, 290]),
      w("inputs", "wd_or", [100, 158], [134, 158]), junction("jd1", 100, 158),
      w("inputs", "wd_xor", [100, 238], [132, 238]), junction("jd2", 100, 238),
    );
  }
  for (const o of OUTPUTS) {
    if (has("leds")) els.push(...outStage(o.id, o.y, o.text, h("leds")));
    if (has("outs")) els.push(w("outs", `w_${o.id}`, [o.fromX, o.y], [370, o.y]));
  }
  return els;
};

/** Step 1: Breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 1: Breadboard Setup"),
  { type: "vsource", id: "vcc", x: 60, y: 140, label: "+5V" },
  { ...wire("w1", [60, 110], [60, 80], [440, 80]), highlight: true },
  junction("t1", 440, 80),
  { ...wire("w2", [60, 170], [60, 200], [440, 200]), highlight: true },
  junction("t2", 440, 200),
  { type: "ground", id: "gnd", x: 60, y: 200 },
  junction("jg", 60, 200),
  label("desc", 260, 280, "BCD inputs ABCD, XS3 outputs WXYZ"),
]};

/** Step 2: Place NOT and XOR gates */
export const step02: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 2: NOT and XOR Gates"),
  ...circuit([], ["notXor"]),
  label("desc", 260, 338, "74HC04 (NOT), 74HC86 (XOR) — X, Y=(C⊕D)', Z=D'"),
]};

/** Step 3: Place AND and OR gates */
export const step03: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 3: AND and OR Gates"),
  ...circuit(["notXor"], ["andOr", "internal"]),
  label("desc", 260, 338, "74HC32 (OR), 74HC08 (AND) — W = A + B(C+D)"),
]};

/** Step 4: Wire all inputs A, B, C, D */
export const step04: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 4: Wire Inputs ABCD"),
  ...circuit(["notXor", "andOr", "internal"], ["inputs"]),
  label("desc", 260, 338, "A→W, B→W & X, C/D→C+D and C⊕D, D→Z"),
]};

/** Step 5: Place resistors and LEDs */
export const step05: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 5: Output LEDs"),
  ...circuit(["notXor", "andOr", "internal", "inputs"], ["leds"]),
  label("desc", 260, 338, "4 LEDs with 330Ω current limiters (W, X, Y, Z)"),
]};

/** Step 6: Connect output wires */
export const step06: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 6: Output Wiring"),
  ...circuit(ALL, ["outs"]),
  label("desc", 260, 338, "Gate outputs to corresponding LEDs"),
]};

/** Step 7: Test BCD 0101 (5) → XS3 1000 (8) */
export const step07: SchematicData = { width: 450, height: 320, elements: [
  label("title", 225, 20, "Step 7: Test BCD 0101 (Decimal 5)"),
  label("input", 225, 55, "Input: A=0, B=1, C=0, D=1"),
  label("calc", 225, 90, "XS3 = BCD + 3 = 5 + 3 = 8 = 1000"),
  label("w", 100, 140, "W = 0+1(0+1) = 1"),
  label("x", 100, 170, "X = 1⊕(0+1) = 0"),
  label("y", 100, 200, "Y = (0⊕1)' = 0"),
  label("z", 100, 230, "Z = 1' = 0"),
  label("result", 225, 280, "Result: WXYZ = 1000 ✓"),
]};

/** Step 8: Test BCD 1001 (9) → XS3 1100 (12) */
export const step08: SchematicData = { width: 450, height: 320, elements: [
  label("title", 225, 20, "Step 8: Test BCD 1001 (Decimal 9)"),
  label("input", 225, 55, "Input: A=1, B=0, C=0, D=1"),
  label("calc", 225, 90, "XS3 = BCD + 3 = 9 + 3 = 12 = 1100"),
  label("w", 100, 140, "W = 1+0(0+1) = 1"),
  label("x", 100, 170, "X = 0⊕(0+1) = 1"),
  label("y", 100, 200, "Y = (0⊕1)' = 0"),
  label("z", 100, 230, "Z = 1' = 0"),
  label("result", 225, 280, "Result: WXYZ = 1100 ✓"),
]};

export const s2BcdXs3ConverterStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08,
];

export const s2BcdXs3ConverterTheoryDiagram: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "BCD to Excess-3 Converter"),
  ...circuit(ALL),
  label("eq", 260, 338, "XS3 = BCD + 0011"),
]};
