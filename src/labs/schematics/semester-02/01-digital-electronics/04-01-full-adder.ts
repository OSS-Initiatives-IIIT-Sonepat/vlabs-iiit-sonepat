import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * S2 Full Adder — Sum = A⊕B⊕Cin, Cout = AB + Cin(A⊕B)
 *
 * XOR1 P    (130,90)  in (102,82)/(102,98)    out (158,90)
 * XOR2 Sum  (250,98)  in (222,90)/(222,106)   out (278,98)
 * AND2 P·Cin(250,180) in (224,172)/(224,188)  out (276,180)
 * AND1 A·B  (130,250) in (104,242)/(104,258)  out (156,250)
 * OR   Cout (330,220) in (304,212)/(304,228)  out (356,220)
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

type Group = "sumGates" | "carryGates" | "p" | "carry" | "ab" | "cin" | "leds" | "outs";
const ALL: Group[] = ["sumGates", "carryGates", "p", "carry", "ab", "cin", "leds", "outs"];

type Names = { xor1: string; xor2: string; and1: string; and2: string; or1: string };
const NAMES: Names = { xor1: "P", xor2: "Sum", and1: "A·B", and2: "P·Cin", or1: "Cout" };

const circuit = (show: Group[], highlight: Group[] = [], names: Names = NAMES): SchematicElement[] => {
  const has = (g: Group) => show.includes(g) || highlight.includes(g);
  const h = (g: Group) => highlight.includes(g) || undefined;
  const w = (g: Group, id: string, ...pts: [number, number][]) => ({ ...wire(id, ...pts), highlight: h(g) });
  const els: SchematicElement[] = [];
  if (has("sumGates")) {
    els.push(
      { type: "xor-gate", id: "xor1", x: 130, y: 90, label: names.xor1, highlight: h("sumGates") },
      { type: "xor-gate", id: "xor2", x: 250, y: 98, label: names.xor2, highlight: h("sumGates") },
    );
  }
  if (has("carryGates")) {
    els.push(
      { type: "and-gate", id: "and2", x: 250, y: 180, label: names.and2, highlight: h("carryGates") },
      { type: "and-gate", id: "and1", x: 130, y: 250, label: names.and1, highlight: h("carryGates") },
      { type: "or-gate", id: "or1", x: 330, y: 220, label: names.or1, highlight: h("carryGates") },
    );
  }
  if (has("p")) els.push(w("p", "w_p", [158, 90], [222, 90]));
  if (has("carry")) {
    els.push(
      w("carry", "w_p_and", [190, 90], [190, 172], [224, 172]),
      junction("jp", 190, 90),
      w("carry", "w_and2_or", [276, 180], [284, 180], [284, 212], [304, 212]),
      w("carry", "w_and1_or", [156, 250], [294, 250], [294, 228], [304, 228]),
    );
  }
  if (has("ab")) {
    els.push(
      label("la", 20, 82, "A"), w("ab", "wa", [30, 82], [102, 82]),
      w("ab", "wa_g", [60, 82], [60, 242], [104, 242]), junction("ja", 60, 82),
      label("lb", 20, 98, "B"), w("ab", "wb", [30, 98], [102, 98]),
      w("ab", "wb_g", [80, 98], [80, 258], [104, 258]), junction("jb", 80, 98),
    );
  }
  if (has("cin")) {
    els.push(
      label("lc", 18, 130, "Cin"),
      w("cin", "wc", [32, 130], [205, 130], [205, 106], [222, 106]),
      w("cin", "wc_and", [205, 130], [205, 188], [224, 188]),
      junction("jc", 205, 130),
    );
  }
  if (has("leds")) els.push(...outStage("s", 98, "Sum", h("leds")), ...outStage("c", 220, "Cout", h("leds")));
  if (has("outs")) els.push(w("outs", "w_sum", [278, 98], [370, 98]), w("outs", "w_cout", [356, 220], [370, 220]));
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
  label("desc", 260, 280, "Power rails for full adder circuit"),
]};

/** Step 2: Place XOR gates for Sum */
export const step02: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 2: XOR Gates for Sum"),
  label("eq", 260, 45, "Sum = A⊕B⊕Cin"),
  ...circuit(["p"], ["sumGates"]),
  label("desc", 260, 300, "First XOR makes P = A⊕B, second makes Sum = P⊕Cin"),
]};

/** Step 3: Place AND and OR gates for Carry */
export const step03: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 3: AND/OR Gates for Carry"),
  label("eq", 260, 45, "Cout = A·B + Cin·(A⊕B)"),
  ...circuit(["sumGates", "p"], ["carryGates"]),
  label("desc", 260, 300, "Two AND gates + one OR gate for carry logic"),
]};

/** Step 4: Place output LEDs */
export const step04: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 4: Output LEDs"),
  ...circuit(["sumGates", "carryGates", "p"], ["leds"]),
  label("desc", 260, 300, "Sum and Cout LEDs with 330Ω current limiters"),
]};

/** Step 5: Wire inputs A, B */
export const step05: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 5: Wire Inputs A, B"),
  ...circuit(["sumGates", "carryGates", "p", "leds"], ["ab"]),
  label("desc", 260, 300, "A, B to XOR1 and AND1 (generate A⊕B and A·B)"),
]};

/** Step 6: Wire Cin to second stage */
export const step06: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 6: Wire Cin to Second Stage"),
  ...circuit(["sumGates", "carryGates", "p", "leds", "ab"], ["cin"]),
  label("desc", 260, 300, "Cin to XOR2 (for Sum) and AND2 (for carry)"),
]};

/** Step 7: Wire carry OR gate */
export const step07: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 7: Wire Carry OR Gate"),
  ...circuit(["sumGates", "carryGates", "p", "leds", "ab", "cin"], ["carry"]),
  label("desc", 260, 300, "P to AND2, then Cout = (A·B) + (Cin·P) via OR gate"),
]};

/** Step 8: Wire outputs */
export const step08: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 8: Complete Wiring"),
  ...circuit(ALL, ["outs"]),
  label("desc", 260, 300, "Sum and Cout outputs to LEDs"),
]};

/** Step 9: Test A=0, B=1, Cin=1 → Sum=0, Cout=1 */
export const step09: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 9: Test A=0, B=1, Cin=1"),
  ...circuit(ALL, [], { xor1: "0⊕1=1", xor2: "1⊕1=0", and1: "0·1=0", and2: "1·1=1", or1: "0+1=1" }),
  label("res", 260, 300, "Result: Sum=0, Cout=1 (0+1+1=10₂)"),
]};

/** Step 10: Test A=1, B=1, Cin=1 → Sum=1, Cout=1 */
export const step10: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Step 10: Test A=1, B=1, Cin=1"),
  ...circuit(ALL, [], { xor1: "1⊕1=0", xor2: "0⊕1=1", and1: "1·1=1", and2: "0·1=0", or1: "1+0=1" }),
  label("res", 260, 300, "Result: Sum=1, Cout=1 (1+1+1=11₂)"),
]};

export const s2FullAdderStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10,
];

export const s2FullAdderTheoryDiagram: SchematicData = { width: W, height: H, elements: [
  label("title", 260, 20, "Full Adder Circuit"),
  ...circuit(ALL),
  label("eq", 260, 300, "Sum = A⊕B⊕Cin, Cout = AB + Cin(A⊕B)"),
]};
