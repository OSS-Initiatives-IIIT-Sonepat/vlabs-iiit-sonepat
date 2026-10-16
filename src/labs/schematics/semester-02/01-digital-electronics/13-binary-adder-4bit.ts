import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * 4-bit Ripple-Carry Adder — progressive 2D schematics.
 * Four full-adder blocks FA0–FA3 (closed outlines, x0 = 60 / 160 / 260 / 360, 70 wide,
 * y 100–170). Ai / Bi enter from the top, the carry ripples left → right on y140, and
 * each sum (plus Cout) drives a 330Ω resistor and LED to ground.
 * Each full adder: Sum = A ⊕ B ⊕ Cin, Cout = AB + Cin(A ⊕ B)
 */

const W = 500;
const H = 350;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);

const X0 = [60, 160, 260, 360] as const;
const COUT_X = 470;

type Bits = { a: string; b: string; s: string; cout: string };

type Opts = {
  /** Bits whose A/B inputs are wired. */
  inputs?: number[];
  hlInputs?: number[];
  /** Number of carry links drawn (Cin plus C1..C3); 5 includes Cout. */
  carries?: number;
  hlCarries?: number[];
  stages?: boolean;
  hlStages?: boolean;
  outWires?: boolean;
  hlOutWires?: boolean;
  /** Test values (MSB first strings) shown on the input and LED labels. */
  values?: Bits;
};

const adder = (o: Opts = {}): SchematicElement[] => {
  const els: SchematicElement[] = [];
  const carries = o.carries ?? 0;
  const bit = (s: string | undefined, i: number) => (s ? s[s.length - 1 - i] : undefined);
  X0.forEach((x0, i) => {
    const x1 = x0 + 70;
    const xs = x0 + 35;
    els.push(
      wire(`fa${i}_box`, [x0, 100], [x1, 100], [x1, 170], [x0, 170], [x0, 100]),
      label(`fa${i}_a`, x0 + 20, 112, "A"), label(`fa${i}_b`, x0 + 50, 112, "B"),
      label(`fa${i}_name`, xs, 125, `FA${i}`),
      label(`fa${i}_cin`, x0 + 12, 143, "Cin"), label(`fa${i}_co`, x1 - 9, 143, "Co"),
      label(`fa${i}_s`, xs, 161, "S"),
    );
    if (o.inputs?.includes(i)) {
      const h = o.hlInputs?.includes(i);
      const a = bit(o.values?.a, i);
      const b = bit(o.values?.b, i);
      els.push(
        label(`lbl_a${i}`, x0 + 20, 62, a ? `A${i}=${a}` : `A${i}`), hl(wire(`w_a${i}`, [x0 + 20, 70], [x0 + 20, 100]), h),
        label(`lbl_b${i}`, x0 + 50, 62, b ? `B${i}=${b}` : `B${i}`), hl(wire(`w_b${i}`, [x0 + 50, 70], [x0 + 50, 100]), h),
      );
    }
    if (i > 0 && carries > i) {
      els.push(
        hl(wire(`w_c${i}`, [x0 - 30, 140], [x0, 140]), o.hlCarries?.includes(i)),
        label(`lbl_c${i}`, x0 - 15, 130, `C${i}`),
      );
    }
  });
  if (carries > 0) {
    els.push(label("lbl_cin", 19, 140, "Cin=0"), hl(wire("w_cin", [36, 140], [60, 140]), o.hlCarries?.includes(0)));
  }
  if (carries > 4) {
    els.push(hl(wire("w_cout", [430, 140], [COUT_X, 140], [COUT_X, 185]), o.hlCarries?.includes(4)));
  }
  if (o.stages) {
    const cols = [...X0.map((x0, i) => ({ id: `s${i}`, x: x0 + 35, name: `S${i}`, v: bit(o.values?.s, i), color: "green" as const })),
      { id: "cout", x: COUT_X, name: "Cout", v: o.values?.cout, color: "yellow" as const }];
    for (const c of cols) {
      const lit = c.v === "1";
      if (c.id !== "cout" && o.outWires) els.push(hl(wire(`w_${c.id}`, [c.x, 170], [c.x, 185]), o.hlOutWires));
      els.push(
        { type: "resistor", id: `r_${c.id}`, x: c.x, y: 215, rotation: 90, label: "330Ω" },
        { type: "led", id: `led_${c.id}`, x: c.x, y: 265, rotation: 90, label: c.v ? `${c.name}=${c.v}` : c.name, color: c.color, highlight: o.hlStages || lit },
        wire(`w_${c.id}_gnd`, [c.x, 285], [c.x, 295]),
        { type: "ground", id: `gnd_${c.id}`, x: c.x, y: 295 },
      );
    }
  }
  return els;
};

const ALL = [0, 1, 2, 3];
const complete = (extra: Opts = {}): SchematicElement[] =>
  adder({ inputs: ALL, carries: 5, stages: true, outWires: true, ...extra });

/** Step 1: Place breadboard - Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "4-bit Ripple-Carry Adder"),
  label("lbl_eq", 250, 60, "A[3:0] + B[3:0] = S[3:0] + Cout"),
  label("lbl_desc1", 250, 100, "4 full adder stages cascaded"),
  label("lbl_desc2", 250, 130, "Carry propagates: Cin→C1→C2→C3→Cout"),
  label("lbl_desc3", 250, 170, "Initial carry (Cin) = 0 for addition"),
]};

/** Step 2: Connect supply */
export const step02: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "Connect the 5 V Supply"),
  { type: "vsource", id: "vcc", x: 60, y: 140, label: "+5V" },
  hl(wire("w_vcc", [60, 110], [60, 90], [440, 90]), true),
  junction("t_vcc", 440, 90),
  label("lbl_vcc_rail", 250, 80, "VCC rail"),
  hl(wire("w_gnd", [60, 170], [60, 190], [440, 190]), true),
  junction("t_gnd", 440, 190),
  { type: "ground", id: "gnd", x: 60, y: 190 },
  junction("jg", 60, 190),
  label("lbl_gnd_rail", 250, 204, "GND rail"),
  label("lbl_note", 250, 260, "Keep the supply OFF until all wiring is complete"),
]};

/** Step 3: Place ICs - Show FA stages */
export const step03: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "Full Adder Stages (FA0 = LSB)"),
  ...adder(),
  label("lbl_ics", 250, 210, "ICs: 2× 74HC86 (XOR), 2× 74HC08 (AND), 1× 74HC32 (OR)"),
  label("lbl_gate", 250, 235, "Bit i uses gate i+1 of every chip"),
  label("lbl_sum", 250, 270, "S = A ⊕ B ⊕ Cin"),
  label("lbl_carry", 250, 292, "Co = A·B + Cin·(A ⊕ B)"),
]};

/** Step 4: Place output LEDs */
export const step04: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "Output Resistors and LEDs"),
  ...adder({ stages: true, hlStages: true }),
  label("lbl_sum", 250, 330, "Green: S3 S2 S1 S0 · Yellow: Cout"),
]};

/** Step 5: Wire bit 0 (FA0) */
export const step05: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "Wire FA0 — Bit 0 (LSB)"),
  ...adder({ inputs: [0], hlInputs: [0], carries: 1, hlCarries: [0], stages: true }),
  label("lbl_p", 250, 330, "P0 = A0⊕B0 · S0 = P0⊕Cin · C1 = A0·B0 + P0·Cin"),
]};

/** Step 6: Wire bit 1 (FA1) */
export const step06: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "Wire FA1 — Bit 1"),
  ...adder({ inputs: [0, 1], hlInputs: [1], carries: 2, hlCarries: [1], stages: true }),
  label("lbl_note", 250, 330, "C1 from FA0 is the carry-in of FA1"),
]};

/** Step 7: Wire bit 2 (FA2) */
export const step07: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "Wire FA2 — Bit 2"),
  ...adder({ inputs: [0, 1, 2], hlInputs: [2], carries: 3, hlCarries: [2], stages: true }),
  label("lbl_note", 250, 330, "C2 from FA1 is the carry-in of FA2"),
]};

/** Step 8: Wire bit 3 (FA3) */
export const step08: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "Wire FA3 — Bit 3 (MSB)"),
  ...adder({ inputs: ALL, hlInputs: [3], carries: 5, hlCarries: [3, 4], stages: true }),
  label("lbl_note", 250, 330, "C3 into FA3; FA3 carry-out is the final Cout"),
]};

/** Step 9: Connect outputs - Complete circuit */
export const step09: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "4-bit Adder — Complete"),
  ...complete({ hlOutWires: true }),
  label("lbl_result", 250, 330, "Result: Cout S3 S2 S1 S0 (all inputs 0 → all LEDs off)"),
]};

/** Step 10: Test 5 + 3 = 8 */
export const step10: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "Test: 0101 + 0011 = 1000 (5 + 3 = 8)"),
  ...complete({ hlCarries: [1, 2, 3], values: { a: "0101", b: "0011", s: "1000", cout: "0" } }),
  label("lbl_result", 250, 330, "Carry ripples through bits 0–2 · S = 1000 (8), Cout = 0"),
]};

/** Step 11: Test 15 + 1 = 16 (overflow) */
export const step11: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "Test: 1111 + 0001 = 1 0000 (15 + 1 = 16)"),
  ...complete({ hlCarries: [1, 2, 3, 4], values: { a: "1111", b: "0001", s: "0000", cout: "1" } }),
  label("lbl_result", 250, 330, "Carry ripples through every stage · Cout = 1 signals overflow"),
]};

/** Step 12: Test maximum (15 + 15 = 30) */
export const step12: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 250, 20, "Test: 1111 + 1111 = 1 1110 (15 + 15 = 30)"),
  ...complete({ hlCarries: [1, 2, 3, 4], values: { a: "1111", b: "1111", s: "1110", cout: "1" } }),
  label("lbl_result", 250, 330, "Maximum 4-bit result: Cout S3 S2 S1 S0 = 11110"),
]};

/** Indexed array */
export const binaryAdder4bitStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06,
  step07, step08, step09, step10, step11, step12,
];

/** Theory diagram */
export const binaryAdder4bitTheoryDiagram: SchematicData = step09;
