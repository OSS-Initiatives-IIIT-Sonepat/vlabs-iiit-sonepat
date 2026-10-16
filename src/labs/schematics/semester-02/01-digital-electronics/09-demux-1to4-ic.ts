import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * S2 1:4 DEMUX using 74HC139 IC
 * Active-low outputs: Y0'=EN'·A'·B', etc.
 *
 * Gate-level view: rails A x150, A' x170, B x190, B' x210 feed
 * NAND_i at (280, 150+45i), inputs at x254, outputs at x312.
 */

const W = 420;
const H = 300;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);
/** Label whose left edge sits just past a wire end at x. */
const labelAfter = (id: string, x: number, y: number, text: string) => label(id, x + 4 + text.length * 2.7, y, text);

const RAIL = { a: 150, an: 170, b: 190, bn: 210 } as const;
type Rail = keyof typeof RAIL;
const ROWS: { top: Rail; bottom: Rail; expr: string }[] = [
  { top: "an", bottom: "bn", expr: "(A'B')'" },
  { top: "a", bottom: "bn", expr: "(AB')'" },
  { top: "an", bottom: "b", expr: "(A'B)'" },
  { top: "a", bottom: "b", expr: "(AB)'" },
];
const rowY = (i: number) => 150 + 45 * i;

const DW = 460;
const DH = 330;

/** Gate-level 2:4 decoder; `active` highlights the output pulled LOW. */
const decoder = (inputs: { a: string; b: string } = { a: "A", b: "B" }, active?: number): SchematicElement[] => {
  const els: SchematicElement[] = [
    label("la", 20, 50, inputs.a), wire("wa", [30, 50], [RAIL.a, 50], [RAIL.a, rowY(3) - 8], [254, rowY(3) - 8]),
    wire("wa_n", [60, 50], [60, 80], [78, 80]), junction("ja", 60, 50),
    { type: "not-gate", id: "nota", x: 100, y: 80, label: "A'" },
    wire("wan", [126, 80], [RAIL.an, 80], [RAIL.an, rowY(2) - 8], [254, rowY(2) - 8]),
    label("lb", 20, 100, inputs.b), wire("wb", [30, 100], [RAIL.b, 100], [RAIL.b, rowY(3) + 8], [254, rowY(3) + 8]),
    wire("wb_n", [60, 100], [60, 130], [78, 130]), junction("jb", 60, 100),
    { type: "not-gate", id: "notb", x: 100, y: 130, label: "B'" },
    wire("wbn", [126, 130], [RAIL.bn, 130], [RAIL.bn, rowY(1) + 8], [254, rowY(1) + 8]),
  ];
  const lastTap: Record<Rail, number> = { a: rowY(3) - 8, an: rowY(2) - 8, b: rowY(3) + 8, bn: rowY(1) + 8 };
  ROWS.forEach((r, i) => {
    const y = rowY(i);
    const on = active === i;
    els.push({ type: "nand-gate", id: `nand${i}`, x: 280, y, highlight: on || undefined });
    for (const [rail, py] of [[r.top, y - 8], [r.bottom, y + 8]] as const) {
      if (py === lastTap[rail]) continue;
      els.push(wire(`w${i}_${rail}`, [RAIL[rail], py], [254, py]), junction(`j${i}_${rail}`, RAIL[rail], py));
    }
    const text = `Y${i}' = ${r.expr}`;
    els.push(hl(wire(`wy${i}`, [312, y], [340, y]), on), labelAfter(`ly${i}`, 340, y, text));
  });
  return els;
};

/** Step 1: Breadboard */
export const step01: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 1: Breadboard Setup"),
  { type: "vsource", id: "vcc", x: 60, y: 130, label: "+5V" },
  { ...wire("w1", [60, 100], [60, 80], [360, 80]), highlight: true },
  junction("t1", 360, 80),
  { ...wire("w2", [60, 160], [60, 180], [360, 180]), highlight: true },
  junction("t2", 360, 180),
  { type: "ground", id: "gnd", x: 60, y: 180 },
  junction("jg", 60, 180),
  label("desc", 210, 260, "1:4 DEMUX: 1 input → 4 outputs"),
]};

/** Step 2: Mount 74HC139 IC */
export const step02: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 2: Mount 74HC139"),
  label("ic", 210, 80, "74HC139"),
  label("desc1", 210, 110, "Dual 2-to-4 decoder/demux"),
  label("pins1", 210, 150, "Section 1: EN=Pin1, A=Pin2, B=Pin3"),
  label("pins2", 210, 180, "Outputs: Y0=Pin4, Y1=Pin5, Y2=Pin6, Y3=Pin7"),
  label("note", 210, 220, "Active-LOW outputs!"),
  label("desc", 210, 270, "DIP-16: Vcc=Pin16, GND=Pin8"),
]};

/** Step 3: Tie EN_bar to GND */
export const step03: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 3: Enable Pin"),
  label("pin", 100, 100, "1EN (Pin 1)"),
  { ...wire("wen", [134, 100], [250, 100], [250, 110]), highlight: true },
  { type: "ground", id: "gnd", x: 250, y: 110 },
  label("note1", 210, 170, "1EN is active-LOW"),
  label("note2", 210, 200, "GND = enabled, always active"),
  label("desc", 210, 260, "For data DEMUX, use EN as data input instead"),
]};

/** Step 4: Wire select inputs A, B */
export const step04: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 4: Select Inputs A, B"),
  label("la", 50, 100, "A switch"), { ...wire("wa", [78, 100], [320, 100]), highlight: true }, labelAfter("ica", 320, 100, "A (Pin 2)"),
  label("lb", 50, 160, "B switch"), { ...wire("wb", [78, 160], [320, 160]), highlight: true }, labelAfter("icb", 320, 160, "B (Pin 3)"),
  label("table", 210, 205, "B A | Active Output"),
  label("r0", 210, 225, "0 0 |    Y0 LOW"),
  label("r1", 210, 242, "0 1 |    Y1 LOW"),
  label("r2", 210, 259, "1 0 |    Y2 LOW"),
  label("r3", 210, 276, "1 1 |    Y3 LOW"),
]};

/** Step 5: Wire outputs to LEDs (current sinks into Yi) */
export const step05: SchematicData = { width: W, height: H, elements: [
  label("title", 210, 20, "Step 5: Output LEDs"),
  label("note", 210, 40, "Active-LOW: LED ON when selected"),
  ...[80, 170, 260, 350].flatMap((x, i): SchematicElement[] => [
    label(`lv${i}`, x, 58, "+5V"),
    wire(`wv${i}`, [x, 66], [x, 80]),
    { type: "resistor", id: `r${i}`, x, y: 110, rotation: 90, label: "330Ω" },
    wire(`wr${i}`, [x, 140], [x, 150]),
    { type: "led", id: `led${i}`, x, y: 170, rotation: 90, highlight: true },
    { ...wire(`wy${i}`, [x, 190], [x, 208]), highlight: true },
    label(`ly${i}`, x, 218, `Y${i} (Pin ${4 + i})`),
  ]),
  label("desc", 210, 260, "Vcc → 330Ω → LED → Yi: LED sinks current when Yi=LOW"),
]};

/** Step 6: Test A=0, B=0 → Y0 active */
export const step06: SchematicData = { width: DW, height: DH, elements: [
  label("title", 230, 20, "Step 6: Test A=0, B=0"),
  ...decoder({ a: "A=0", b: "B=0" }, 0),
  label("others", 230, 318, "Address 00 → Y0'=0 (LED ON), Y1'=Y2'=Y3'=1 (OFF)"),
]};

/** Step 7: Test A=1, B=1 → Y3 active */
export const step07: SchematicData = { width: DW, height: DH, elements: [
  label("title", 230, 20, "Step 7: Test A=1, B=1"),
  ...decoder({ a: "A=1", b: "B=1" }, 3),
  label("others", 230, 318, "Address 11 → Y3'=0 (LED ON), Y0'=Y1'=Y2'=1 (OFF)"),
]};

export const s2Demux1to4IcStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07,
];

export const s2Demux1to4IcTheoryDiagram: SchematicData = { width: DW, height: DH, elements: [
  label("title", 230, 20, "1:4 DEMUX / 2:4 Decoder (active-LOW)"),
  ...decoder(),
  label("note", 230, 318, "74HC139 outputs are active-LOW; EN acts as data input for DEMUX"),
]};
