import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * S2 Half Adder + Half Subtractor — Combined circuit with shared XOR gate
 *
 * XOR  (200,90)  in (172,82)/(172,98)    out (228,90)   Sum / Diff
 * AND1 (200,160) in (174,152)/(174,168)  out (226,160)  Carry
 * NOT  (150,226) in (128,226)            out (176,226)  A'
 * AND2 (226,234) in (200,226)/(200,242)  out (252,234)  Borrow
 */

const W = 420;
const H = 300;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);

const OUTPUTS = [
  { id: "s", fromX: 228, y: 90, text: "Sum/Diff" },
  { id: "c", fromX: 226, y: 160, text: "Carry" },
  { id: "b", fromX: 252, y: 234, text: "Borrow" },
] as const;

type Parts = {
  adder?: boolean;
  subtractor?: boolean;
  hlAdder?: boolean;
  hlSub?: boolean;
  a?: boolean;
  b?: boolean;
  hlA?: boolean;
  hlB?: boolean;
  not?: boolean;
  hlNot?: boolean;
  leds?: boolean;
  hlLeds?: boolean;
  outWires?: boolean;
  hlOutWires?: boolean;
  grounds?: boolean;
  hlGrounds?: boolean;
};

const circuit = (p: Parts): SchematicElement[] => {
  const sub = p.subtractor;
  const els: SchematicElement[] = [];
  if (p.adder) {
    els.push(
      { type: "xor-gate", id: "xor1", x: 200, y: 90, label: sub ? "Sum/Diff" : "Sum", highlight: p.hlAdder },
      { type: "and-gate", id: "and1", x: 200, y: 160, label: "Carry", highlight: p.hlAdder },
    );
  }
  if (sub) {
    els.push(
      { type: "not-gate", id: "not1", x: 150, y: 226, label: "A'", highlight: p.hlSub },
      { type: "and-gate", id: "and2", x: 226, y: 234, label: "Borrow", highlight: p.hlSub },
    );
  }
  if (p.a) {
    els.push(
      label("la", 20, 82, "A"),
      hl(wire("wa", [30, 82], [172, 82]), p.hlA),
      hl(wire("wa_c", [70, 82], [70, 152], [174, 152]), p.hlA),
      junction("ja1", 70, 82),
    );
    if (sub) els.push(hl(wire("wa_n", [70, 152], [70, 226], [128, 226]), p.hlA), junction("ja2", 70, 152));
  }
  if (p.b) {
    els.push(
      label("lb", 20, 98, "B"),
      hl(wire("wb", [30, 98], [172, 98]), p.hlB),
      hl(wire("wb_c", [100, 98], [100, 168], [174, 168]), p.hlB),
      junction("jb1", 100, 98),
    );
    if (sub) els.push(hl(wire("wb_b", [100, 168], [100, 242], [200, 242]), p.hlB), junction("jb2", 100, 168));
  }
  if (p.not) els.push(hl(wire("wn", [176, 226], [200, 226]), p.hlNot));
  const outs = OUTPUTS.filter((o) => o.id !== "b" || sub);
  for (const o of outs) {
    if (p.outWires) els.push(hl(wire(`w_${o.id}`, [o.fromX, o.y], [258, o.y]), p.hlOutWires));
    if (p.leds) {
      els.push(
        { type: "resistor", id: `r_${o.id}`, x: 288, y: o.y, label: "330Ω", highlight: p.hlLeds },
        wire(`w_${o.id}_led`, [318, o.y], [330, o.y]),
        { type: "led", id: `led_${o.id}`, x: 350, y: o.y, label: o.text, highlight: p.hlLeds },
      );
    }
    if (p.grounds) {
      els.push(
        hl(wire(`w_${o.id}_gnd`, [370, o.y], [395, o.y], [395, o.y + 10]), p.hlGrounds),
        { type: "ground", id: `gnd_${o.id}`, x: 395, y: o.y + 10 },
      );
    }
  }
  return els;
};

const FULL: Parts = { adder: true, subtractor: true, a: true, b: true, not: true, leds: true, outWires: true, grounds: true };

/** Step 1: Breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 1: Breadboard Setup"),
  { type: "vsource", id: "vcc", x: 60, y: 140, label: "+5V" },
  { ...wire("w1", [60, 110], [60, 80], [360, 80]), highlight: true },
  junction("t1", 360, 80),
  { ...wire("w2", [60, 170], [60, 200], [360, 200]), highlight: true },
  junction("t2", 360, 200),
  { type: "ground", id: "gnd", x: 60, y: 200 },
  junction("jg", 60, 200),
  label("desc", 210, 260, "Prepare power rails for ICs"),
]};

/** Step 2: Adder ICs (XOR for Sum, AND for Carry) */
export const step02: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 2: Half Adder ICs"),
  label("subtitle", 210, 45, "Sum = A⊕B, Carry = A·B"),
  ...circuit({ adder: true, hlAdder: true }),
  label("desc", 210, 280, "74HC86 (XOR), 74HC08 (AND)"),
]};

/** Step 3: Subtractor ICs (XOR for Diff, NOT+AND for Borrow) */
export const step03: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 3: Half Subtractor ICs"),
  label("subtitle", 210, 45, "Diff = A⊕B, Borrow = A'·B"),
  ...circuit({ adder: true, subtractor: true, hlSub: true }),
  label("desc", 210, 280, "74HC04 (NOT) for A', XOR is shared"),
]};

/** Step 4: Wire input A */
export const step04: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 4: Wire Input A"),
  ...circuit({ adder: true, subtractor: true, a: true, hlA: true }),
  label("desc", 210, 280, "A goes to XOR, Carry-AND, and NOT"),
]};

/** Step 5: Wire input B */
export const step05: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 5: Wire Input B"),
  ...circuit({ adder: true, subtractor: true, a: true, b: true, hlB: true }),
  label("desc", 210, 280, "B goes to XOR, Carry-AND, Borrow-AND"),
]};

/** Step 6: Wire inverted A to borrow AND */
export const step06: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 6: Wire Inverted A"),
  ...circuit({ adder: true, subtractor: true, a: true, b: true, not: true, hlNot: true }),
  label("desc", 210, 280, "NOT output (A') to Borrow AND gate → A'·B"),
]};

/** Step 7: Output stage setup */
export const step07: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 7: Output Stage"),
  ...circuit({ adder: true, subtractor: true, a: true, b: true, not: true, leds: true, hlLeds: true }),
  label("desc", 210, 280, "3 LEDs with 330Ω current limiters"),
]};

/** Step 8: Wire outputs */
export const step08: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 8: Wire Outputs"),
  ...circuit({ ...FULL, grounds: false, hlOutWires: true }),
  label("desc", 210, 280, "Gate outputs to LED indicators"),
]};

/** Step 9: Ground LEDs */
export const step09: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 9: Ground LED Returns"),
  ...circuit({ ...FULL, hlGrounds: true }),
  label("desc", 210, 280, "All LED cathodes to GND"),
]};

/** Step 10: Test circuit */
export const step10: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 10: Test All Combinations"),
  label("header", 210, 55, "A  B | Sum/Diff | Carry | Borrow"),
  label("r1", 210, 85, "0  0 |    0     |   0   |   0"),
  label("r2", 210, 115, "0  1 |    1     |   0   |   1"),
  label("r3", 210, 145, "1  0 |    1     |   0   |   0"),
  label("r4", 210, 175, "1  1 |    0     |   1   |   0"),
  label("note1", 210, 220, "Sum = Diff (shared XOR output)"),
  label("note2", 210, 250, "Carry != Borrow (different logic)"),
]};

export const s2HalfAdderSubtractorStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10,
];

export const s2HalfAdderSubtractorTheoryDiagram: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Half Adder & Half Subtractor"),
  ...circuit(FULL),
  label("eq", 210, 285, "S = D = A⊕B,  C = A·B,  Borrow = A'·B"),
]};
