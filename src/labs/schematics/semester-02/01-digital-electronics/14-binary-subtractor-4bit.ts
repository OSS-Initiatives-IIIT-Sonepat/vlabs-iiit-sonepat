import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * 4-bit Binary Subtractor — progressive 2D schematics.
 * 2's complement method: A - B = A + B' + 1
 * Four XOR gates with one input tied to +5V invert B; a 74HC283 adder (closed outline,
 * x 230–320) adds A + B' with C0 = 1. S1–S4 and C4 drive 330Ω resistors and LEDs.
 * C4 = 1 → no borrow (A ≥ B); C4 = 0 → borrow (negative result in 2's complement).
 */

const W = 500;
const H = 340;

const CW = 500;
const CH = 380;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);
const labelBefore = (id: string, x: number, y: number, text: string) => label(id, x - 4 - text.length * 2.52, y, text);

const BOX = { x0: 230, x1: 320, y0: 56, y1: 336 };
const A_Y = [70, 90, 110, 130];
const B_Y = [170, 210, 250, 290];
const C0_Y = 320;
const OUT_Y = [100, 145, 190, 235, 280];

type Bits = { a: string; b: string; s: string; c4: string };

type Opts = {
  xors?: boolean;
  hlXors?: boolean;
  bIn?: boolean;
  hlB?: boolean;
  aIn?: boolean;
  hlA?: boolean;
  outs?: boolean;
  hlOuts?: boolean;
  /** Test values, MSB first (bit 4 … bit 1). */
  values?: Bits;
};

const subtractor = (o: Opts = {}): SchematicElement[] => {
  const bit = (s: string | undefined, i: number) => (s ? s[s.length - 1 - i] : undefined);
  const name = (n: string, v?: string) => (v ? `${n}=${v}` : n);
  const { x0, x1, y0, y1 } = BOX;
  const els: SchematicElement[] = [
    wire("ic_box", [x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]),
    label("ic_name", 275, 200, "74HC283"),
    label("ic_c0", x0 + 12, C0_Y, "C0"),
    label("ic_c4", x1 - 12, OUT_Y[4], "C4"),
  ];
  A_Y.forEach((y, i) => els.push(label(`ic_a${i + 1}`, x0 + 12, y, `A${i + 1}`)));
  B_Y.forEach((y, i) => els.push(label(`ic_b${i + 1}`, x0 + 12, y, `B${i + 1}`)));
  OUT_Y.slice(0, 4).forEach((y, i) => els.push(label(`ic_s${i + 1}`, x1 - 12, y, `S${i + 1}`)));

  if (o.xors) {
    B_Y.forEach((y, i) => {
      els.push(
        { type: "xor-gate", id: `xor_b${i + 1}`, x: 130, y, highlight: o.hlXors },
        labelBefore(`lbl_tie${i + 1}`, 92, y + 8, "+5V"),
        hl(wire(`w_tie${i + 1}`, [92, y + 8], [102, y + 8]), o.hlXors),
      );
    });
  }
  if (o.bIn) {
    B_Y.forEach((y, i) => {
      const n = `B${i + 1}`;
      const t = name(n, bit(o.values?.b, i));
      els.push(
        labelBefore(`lbl_b${i + 1}`, 36, y - 8, t), hl(wire(`w_b${i + 1}`, [36, y - 8], [102, y - 8]), o.hlB),
        hl(wire(`w_bn${i + 1}`, [158, y], [x0, y]), o.hlB),
        label(`lbl_bn${i + 1}`, 194, y - 8, `${n}'`),
      );
    });
  }
  if (o.aIn) {
    A_Y.forEach((y, i) => {
      const t = name(`A${i + 1}`, bit(o.values?.a, i));
      els.push(labelBefore(`lbl_a${i + 1}`, 36, y, t), hl(wire(`w_a${i + 1}`, [36, y], [x0, y]), o.hlA));
    });
    els.push(labelBefore("lbl_c0_tie", 200, C0_Y, "+5V"), hl(wire("w_c0", [200, C0_Y], [x0, C0_Y]), o.hlA));
  }
  if (o.outs) {
    OUT_Y.forEach((y, i) => {
      const isC4 = i === 4;
      const id = isC4 ? "c4" : `s${i + 1}`;
      const v = isC4 ? o.values?.c4 : bit(o.values?.s, i);
      els.push(
        hl(wire(`w_${id}`, [x1, y], [340, y]), o.hlOuts),
        { type: "resistor", id: `r_${id}`, x: 370, y, label: "330Ω" },
        { type: "led", id: `led_${id}`, x: 420, y, label: name(isC4 ? "C4" : `S${i + 1}`, v), color: isC4 ? "yellow" : "green", highlight: o.hlOuts || v === "1" },
        wire(`w_${id}_gnd`, [440, y], [455, y], [455, y + 10]),
        { type: "ground", id: `gnd_${id}`, x: 455, y: y + 10 },
      );
    });
  }
  return els;
};

const complete = (extra: Opts = {}): SchematicElement[] =>
  subtractor({ xors: true, bIn: true, aIn: true, outs: true, ...extra });

/** Step 1: Theory recap */
export const step01: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "4-bit Binary Subtractor"),
  label("lbl_method", 250, 60, "2's Complement Method:"),
  label("lbl_eq1", 250, 90, "A - B = A + (-B)"),
  label("lbl_eq2", 250, 120, "-B = B' + 1 (2's complement)"),
  label("lbl_eq3", 250, 150, "So: A - B = A + B' + 1"),
  label("lbl_impl", 250, 200, "Implementation:"),
  label("lbl_impl1", 250, 230, "1. Invert all B bits (XOR gates with one input at 1)"),
  label("lbl_impl2", 250, 260, "2. Add using the 74HC283 4-bit adder"),
  label("lbl_impl3", 250, 290, "3. Hold carry-in C0 = 1 (adds the +1)"),
]};

/** Step 2: Power and ICs */
export const step02: SchematicData = { width: CW, height: CH, elements: [
  label("lbl_title", 250, 20, "Place the ICs — XOR Inverters + 74HC283"),
  ...subtractor({ xors: true, hlXors: true }),
  label("lbl_note", 250, 360, "XOR with one input at 1 = NOT · adder VCC pin 16, GND pin 8"),
]};

/** Step 3: Invert B */
export const step03: SchematicData = { width: CW, height: CH, elements: [
  label("lbl_title", 250, 20, "Invert B — XOR Gates"),
  ...subtractor({ xors: true, bIn: true, hlB: true }),
  label("lbl_ex", 250, 360, "Example: B = 0101 → B' = 1010"),
]};

/** Step 4: Wire adder inputs */
export const step04: SchematicData = { width: CW, height: CH, elements: [
  label("lbl_title", 250, 20, "Connect A and C0 = 1 to the Adder"),
  ...subtractor({ xors: true, bIn: true, aIn: true, hlA: true }),
  label("lbl_note", 250, 360, "C0 = 1 adds the +1 · adder computes A + B' + 1 = A - B"),
]};

/** Step 5: Outputs - Complete circuit with LEDs */
export const step05: SchematicData = { width: CW, height: CH, elements: [
  label("lbl_title", 250, 20, "4-bit Subtractor — Complete"),
  ...complete({ hlOuts: true }),
  label("lbl_note", 250, 360, "LEDs read C4 S4 S3 S2 S1 · Borrow = C4'"),
]};

/** Step 6: No borrow case - 9 - 5 = 4 */
export const step06: SchematicData = { width: CW, height: CH, elements: [
  label("lbl_title", 250, 20, "Test: 9 - 5 = 4 (No Borrow)"),
  ...complete({ values: { a: "1001", b: "0101", s: "0100", c4: "1" } }),
  label("lbl_calc", 250, 360, "1001 + 1010 + 1 = 1 0100 → C4 = 1 (no borrow), S = 0100 = +4"),
]};

/** Step 7: Borrow case - 5 - 9 = -4 */
export const step07: SchematicData = { width: CW, height: CH, elements: [
  label("lbl_title", 250, 20, "Test: 5 - 9 = -4 (Borrow)"),
  ...complete({ values: { a: "0101", b: "1001", s: "1100", c4: "0" } }),
  label("lbl_calc", 250, 360, "0101 + 0110 + 1 = 0 1100 → C4 = 0 (borrow), 2's comp of 1100 = 0100 → -4"),
]};

/** Step 8: Edge cases */
export const step08: SchematicData = { width: CW, height: CH, elements: [
  label("lbl_title", 250, 20, "Edge Case: 0 - 1 = -1"),
  ...complete({ values: { a: "0000", b: "0001", s: "1111", c4: "0" } }),
  label("lbl_cases", 250, 360, "7-7 → C4=1, S=0000 · 15-0 → C4=1, S=1111 · 0-1 → C4=0, S=1111"),
]};

/** Step 9: Record observations */
export const step09: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "Observation Table"),
  label("lbl_head", 250, 60, "A  -  B   |  C4  S4 S3 S2 S1  |  Borrow  |  Result"),
  label("lbl_r1", 250, 90, "9  -  5   |  1   0 1 0 0  |  0  |  +4"),
  label("lbl_r2", 250, 115, "5  -  9   |  0   1 1 0 0  |  1  |  -4"),
  label("lbl_r3", 250, 140, "7  -  7   |  1   0 0 0 0  |  0  |   0"),
  label("lbl_r4", 250, 165, "15 -  0   |  1   1 1 1 1  |  0  |  +15"),
  label("lbl_r5", 250, 190, "0  -  1   |  0   1 1 1 1  |  1  |  -1"),
  label("lbl_k1", 250, 240, "Borrow = C4' · C4 separates +15 from -1 (both S = 1111)"),
  label("lbl_k2", 250, 270, "Negative result: magnitude = 2's complement of S"),
]};

/** Indexed array */
export const binarySubtractor4bitStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
  step06, step07, step08, step09,
];

/** Theory diagram */
export const binarySubtractor4bitTheoryDiagram: SchematicData = step05;
