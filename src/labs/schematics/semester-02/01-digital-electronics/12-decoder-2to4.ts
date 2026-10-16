import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * S2 2:4 Decoder
 * Y0=A'B', Y1=A'B, Y2=AB', Y3=AB
 *
 * Rails A x150, A' x170, B x190, B' x210 feed AND_i at (280, 150+45i),
 * inputs at x254, outputs at x306 → 330Ω → LED → ground.
 */

const W = 420;
const H = 300;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);

const RAIL = { a: 150, an: 170, b: 190, bn: 210 } as const;
type Rail = keyof typeof RAIL;
const ROWS: { top: Rail; bottom: Rail; text: string }[] = [
  { top: "an", bottom: "bn", text: "Y0=A'B'" },
  { top: "an", bottom: "b", text: "Y1=A'B" },
  { top: "a", bottom: "bn", text: "Y2=AB'" },
  { top: "a", bottom: "b", text: "Y3=AB" },
];
const rowY = (i: number) => 150 + 45 * i;
const LAST_TAP: Record<Rail, number> = { a: rowY(3) - 8, an: rowY(1) - 8, b: rowY(3) + 8, bn: rowY(2) + 8 };

const DW = 470;
const DH = 330;

type Opts = { hlNot?: boolean; hlAnd?: boolean; leds?: boolean; hlLeds?: boolean };

const decoder = ({ hlNot, hlAnd, leds, hlLeds }: Opts = {}): SchematicElement[] => {
  const els: SchematicElement[] = [
    label("la", 20, 50, "A"), wire("wa", [30, 50], [RAIL.a, 50], [RAIL.a, LAST_TAP.a], [254, LAST_TAP.a]),
    hl(wire("wa_n", [60, 50], [60, 80], [78, 80]), hlNot), junction("ja", 60, 50),
    { type: "not-gate", id: "nota", x: 100, y: 80, label: "A'", highlight: hlNot },
    hl(wire("wan", [126, 80], [RAIL.an, 80], [RAIL.an, LAST_TAP.an], [254, LAST_TAP.an]), hlNot),
    label("lb", 20, 100, "B"), wire("wb", [30, 100], [RAIL.b, 100], [RAIL.b, LAST_TAP.b], [254, LAST_TAP.b]),
    hl(wire("wb_n", [60, 100], [60, 130], [78, 130]), hlNot), junction("jb", 60, 100),
    { type: "not-gate", id: "notb", x: 100, y: 130, label: "B'", highlight: hlNot },
    hl(wire("wbn", [126, 130], [RAIL.bn, 130], [RAIL.bn, LAST_TAP.bn], [254, LAST_TAP.bn]), hlNot),
  ];
  ROWS.forEach((r, i) => {
    const y = rowY(i);
    els.push({ type: "and-gate", id: `and${i}`, x: 280, y, highlight: hlAnd });
    for (const [rail, py] of [[r.top, y - 8], [r.bottom, y + 8]] as const) {
      if (py === LAST_TAP[rail]) continue;
      els.push(wire(`w${i}_${rail}`, [RAIL[rail], py], [254, py]), junction(`j${i}_${rail}`, RAIL[rail], py));
    }
    if (leds) {
      els.push(
        hl(wire(`wy${i}`, [306, y], [320, y]), hlLeds),
        { type: "resistor", id: `r${i}`, x: 350, y, highlight: hlLeds },
        wire(`wl${i}`, [380, y], [390, y]),
        { type: "led", id: `led${i}`, x: 410, y, label: r.text, highlight: hlLeds },
        wire(`wg${i}`, [430, y], [445, y], [445, y + 10]),
        { type: "ground", id: `gnd${i}`, x: 445, y: y + 10 },
      );
    }
  });
  return els;
};

/** Step 1: Setup breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 1: Breadboard Setup"),
  { type: "vsource", id: "vcc", x: 60, y: 130, label: "+5V" },
  { ...wire("w1", [60, 100], [60, 80], [360, 80]), highlight: true },
  junction("t1", 360, 80),
  { ...wire("w2", [60, 160], [60, 180], [360, 180]), highlight: true },
  junction("t2", 360, 180),
  { type: "ground", id: "gnd", x: 60, y: 180 },
  junction("jg", 60, 180),
  label("desc", 210, 260, "2:4 Decoder: 2-bit input → 4 one-hot outputs"),
]};

/** Step 2: Wire NOT gates for input complements */
export const step02: SchematicData = { width: DW, height: DH, elements: [
  label("title", 235, 20, "Step 2: NOT Gates for A', B'"),
  ...decoder({ hlNot: true }),
  label("desc", 235, 320, "74HC04 (hex inverter) - 2 gates used"),
]};

/** Step 3: Wire AND gates for minterm outputs */
export const step03: SchematicData = { width: DW, height: DH, elements: [
  label("title", 235, 20, "Step 3: AND Gates for Minterms"),
  ...decoder({ hlAnd: true }),
  label("desc", 235, 320, "74HC08 (quad AND) - all 4 gates used"),
]};

/** Step 4: Connect LED indicators */
export const step04: SchematicData = { width: DW, height: DH, elements: [
  label("title", 235, 20, "Step 4: LED Indicators"),
  ...decoder({ leds: true, hlLeds: true }),
  label("desc", 235, 320, "Exactly ONE LED lights for each input combo"),
]};

/** Step 5: Test all 4 combinations */
export const step05: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 5: Test All Combinations"),
  label("header", 210, 55, "A B | Y0 Y1 Y2 Y3"),
  label("r0", 210, 85, "0 0 |  1  0  0  0"),
  label("r1", 210, 115, "0 1 |  0  1  0  0"),
  label("r2", 210, 145, "1 0 |  0  0  1  0"),
  label("r3", 210, 175, "1 1 |  0  0  0  1"),
  label("note", 210, 220, "One-hot encoding: exactly 1 output HIGH"),
  label("desc", 210, 260, "Each row = one minterm of 2 variables"),
]};

export const s2Decoder2to4StepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
];

export const s2Decoder2to4TheoryDiagram: SchematicData = { width: DW, height: DH, elements: [
  label("title", 235, 20, "2:4 Binary Decoder"),
  ...decoder({ leds: true }),
  label("eq", 235, 320, "Yi = minterm(i) of inputs A,B"),
]};
