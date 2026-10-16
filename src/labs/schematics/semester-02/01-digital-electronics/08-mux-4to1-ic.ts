import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * S2 4:1 MUX using 74HC153 IC
 * Y = S1'S0'I0 + S1'S0·I1 + S1·S0'I2 + S1·S0·I3
 *
 * Gate-level view: AND_i (200, 70+60i) gates Ii with its decoded select term,
 * OR1 (300,100) and OR2 (300,220) combine pairs, OR3 (380,160) drives Y.
 */

const W = 450;
const H = 320;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);

const SELECT_TERMS = ["S1'S0'", "S1'S0", "S1S0'", "S1S0"] as const;
const OR_PATHS: [number, number][][] = [
  [[226, 70], [250, 70], [250, 92], [274, 92]],
  [[226, 130], [260, 130], [260, 108], [274, 108]],
  [[226, 190], [260, 190], [260, 212], [274, 212]],
  [[226, 250], [250, 250], [250, 228], [274, 228]],
];

const GW = 560;
const GH = 320;

/** Gate-level 4:1 MUX; `active` highlights the selected data path. */
const muxGates = (active?: number): SchematicElement[] => {
  const els: SchematicElement[] = [];
  for (let i = 0; i < 4; i++) {
    const y = 70 + 60 * i;
    const on = active === i;
    els.push(
      { type: "and-gate", id: `and${i}`, x: 200, y, label: `${SELECT_TERMS[i]}·I${i}`, highlight: on || undefined },
      label(`li${i}`, 131, y - 8, `I${i}`), hl(wire(`wi${i}`, [140, y - 8], [174, y - 8]), on),
      label(`ls${i}`, 134 - SELECT_TERMS[i].length * 2.7, y + 8, SELECT_TERMS[i]), wire(`ws${i}`, [140, y + 8], [174, y + 8]),
      hl(wire(`wo${i}`, ...OR_PATHS[i]), on),
    );
  }
  const top = active === 0 || active === 1;
  const bottom = active === 2 || active === 3;
  const any = active !== undefined;
  els.push(
    { type: "or-gate", id: "or1", x: 300, y: 100, highlight: top || undefined },
    { type: "or-gate", id: "or2", x: 300, y: 220, highlight: bottom || undefined },
    { type: "or-gate", id: "or3", x: 380, y: 160, label: "Y", highlight: any || undefined },
    hl(wire("w_or1", [326, 100], [336, 100], [336, 152], [354, 152]), top),
    hl(wire("w_or2", [326, 220], [344, 220], [344, 168], [354, 168]), bottom),
    hl(wire("w_y", [406, 160], [415, 160]), any),
    { type: "resistor", id: "r1", x: 445, y: 160, label: "330Ω" },
    wire("w_led", [475, 160], [480, 160]),
    { type: "led", id: "led1", x: 500, y: 160, label: "Y" },
    wire("w_gnd", [520, 160], [535, 160], [535, 170]),
    { type: "ground", id: "gnd", x: 535, y: 170 },
  );
  return els;
};

/** Step 1: Breadboard and supply */
export const step01: SchematicData = { width: W, height: H, elements: [
  label("title", 225, 20, "Step 1: Breadboard Setup"),
  { type: "vsource", id: "vcc", x: 60, y: 140, label: "+5V" },
  { ...wire("w1", [60, 110], [60, 80], [390, 80]), highlight: true },
  junction("t1", 390, 80),
  { ...wire("w2", [60, 170], [60, 200], [390, 200]), highlight: true },
  junction("t2", 390, 200),
  { type: "ground", id: "gnd", x: 60, y: 200 },
  junction("jg", 60, 200),
  label("desc", 225, 280, "4:1 MUX: 4 data inputs, 2 select lines"),
]};

/** Step 2: Place 74HC153 IC */
export const step02: SchematicData = { width: W, height: H, elements: [
  label("title", 225, 20, "Step 2: Place 74HC153 IC"),
  label("ic", 225, 100, "74HC153"),
  label("desc1", 225, 140, "Dual 4:1 MUX (using section 1)"),
  label("pins", 225, 180, "Pin 1: 1G (enable), Pins 6-3: 1C0-1C3"),
  label("pins2", 225, 210, "S0, S1: select lines | Pin 7: 1Y (output)"),
  label("desc", 225, 280, "DIP-16 package, Vcc=16, GND=8"),
]};

/** Step 3: Enable pin */
export const step03: SchematicData = { width: W, height: H, elements: [
  label("title", 225, 20, "Step 3: Enable Pin"),
  label("pin", 120, 100, "1G (pin 1)"),
  { ...wire("wen", [150, 100], [250, 100], [250, 110]), highlight: true },
  { type: "ground", id: "gnd", x: 250, y: 110 },
  label("note", 225, 170, "1G is active-LOW enable"),
  label("note2", 225, 200, "Tie to GND to enable output"),
  label("desc", 225, 260, "When 1G=HIGH, output 1Y=LOW regardless of inputs"),
]};

/** Step 4: Data inputs I0-I3 */
export const step04: SchematicData = { width: W, height: H, elements: [
  label("title", 225, 20, "Step 4: Data Inputs"),
  ...[0, 1, 2, 3].flatMap((i): SchematicElement[] => {
    const y = 80 + 40 * i;
    return [
      label(`li${i}`, 40, y, `I${i}`),
      { ...wire(`wi${i}`, [52, y], [302, y]), highlight: true },
      label(`lc${i}`, 335, y, `1C${i} (pin ${6 - i})`),
    ];
  }),
  label("desc", 225, 260, "Connect 4 data sources to 1C0-1C3"),
]};

/** Step 5: Select lines S0, S1 */
export const step05: SchematicData = { width: W, height: H, elements: [
  label("title", 225, 20, "Step 5: Select Lines"),
  label("ls0", 50, 100, "S0 switch"), { ...wire("ws0", [80, 100], [320, 100]), highlight: true }, label("ic0", 335, 100, "IC S0"),
  label("ls1", 50, 160, "S1 switch"), { ...wire("ws1", [80, 160], [320, 160]), highlight: true }, label("ic1", 335, 160, "IC S1"),
  label("table", 225, 220, "S1 S0 | Selected"),
  label("r0", 225, 245, " 0  0 |   I0"),
  label("r1", 225, 265, " 0  1 |   I1"),
  label("r2", 225, 285, " 1  0 |   I2"),
  label("r3", 225, 305, " 1  1 |   I3"),
]};

/** Step 6: Output stage */
export const step06: SchematicData = { width: W, height: H, elements: [
  label("title", 225, 20, "Step 6: Output Stage"),
  label("lout", 80, 100, "1Y (pin 7)"),
  { ...wire("wout", [110, 100], [170, 100]), highlight: true },
  { type: "resistor", id: "r1", x: 200, y: 100, label: "330Ω" },
  wire("wled", [230, 100], [240, 100]),
  { type: "led", id: "led1", x: 260, y: 100, label: "Y", highlight: true },
  wire("wgnd", [280, 100], [300, 100], [300, 110]),
  { type: "ground", id: "gnd", x: 300, y: 110 },
  label("desc", 225, 260, "Output Y follows selected input"),
]};

const testStep = (n: number, i: number, sel: string): SchematicData => ({ width: GW, height: GH, elements: [
  label("title", 280, 20, `Step ${n}: Test S1=${sel[0]}, S0=${sel[1]}`),
  label("select", 280, 38, `Select = ${sel} → Output = I${i}`),
  ...muxGates(i),
  label("test", 280, 290, `Set I${i}=1 → Y=1 (LED ON), I${i}=0 → Y=0 (LED OFF)`),
]});

/** Step 7: Test S1=0, S0=0 → Y=I0 */
export const step07 = testStep(7, 0, "00");
/** Step 8: Test S1=0, S0=1 → Y=I1 */
export const step08 = testStep(8, 1, "01");
/** Step 9: Test S1=1, S0=0 → Y=I2 */
export const step09 = testStep(9, 2, "10");
/** Step 10: Test S1=1, S0=1 → Y=I3 */
export const step10 = testStep(10, 3, "11");

export const s2Mux4to1IcStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08, step09, step10,
];

export const s2Mux4to1IcTheoryDiagram: SchematicData = { width: GW, height: GH, elements: [
  label("title", 280, 20, "4:1 Multiplexer Structure"),
  ...muxGates(),
  label("eq", 280, 300, "Y = S1'S0'I0 + S1'S0I1 + S1S0'I2 + S1S0I3"),
]};
