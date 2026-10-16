import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * 8:3 Priority Encoder using the 74HC148 — progressive 2D schematics.
 *
 * Closed IC outline (x 170–260). Active-LOW inputs I0–I7 and EI' on the left;
 * active-LOW outputs A0–A2, GS' and EO' on the right. Each output sinks an LED
 * from a +5 V bus, so a lit LED means "this output is LOW" — for A2 A1 A0 the
 * lit pattern reads the true binary number of the highest active input.
 */

const W = 460;
const H = 380;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);
const labelBefore = (id: string, x: number, y: number, text: string) => label(id, x - 4 - text.length * 2.52, y, text);

const BOX = { x0: 170, x1: 260, y0: 50, y1: 345 };
const IN_Y = Array.from({ length: 8 }, (_, i) => 70 + 30 * i);
const EI_Y = 320;
const OUTS = [
  { id: "a0", name: "A0", y: 90 },
  { id: "a1", name: "A1", y: 135 },
  { id: "a2", name: "A2", y: 180 },
  { id: "gs", name: "GS'", y: 240 },
  { id: "eo", name: "EO'", y: 300 },
];
const BUS_X = 420;

type Opts = {
  ei?: boolean;
  hlEi?: boolean;
  inputs?: boolean;
  hlInputs?: boolean;
  outs?: boolean;
  hlOuts?: boolean;
  /** Input numbers held LOW (active). */
  active?: number[];
  /** EI' tied HIGH: encoder disabled. */
  disabled?: boolean;
};

/** Output levels (1 = HIGH) for the given active inputs. */
function levels(active: number[], disabled: boolean): Record<string, number> {
  if (disabled) return { a0: 1, a1: 1, a2: 1, gs: 1, eo: 1 };
  if (active.length === 0) return { a0: 1, a1: 1, a2: 1, gs: 1, eo: 0 };
  const n = Math.max(...active);
  return { a0: 1 - (n & 1), a1: 1 - ((n >> 1) & 1), a2: 1 - ((n >> 2) & 1), gs: 0, eo: 1 };
}

const encoder = (o: Opts = {}): SchematicElement[] => {
  const { x0, x1, y0, y1 } = BOX;
  const active = o.active ?? [];
  const els: SchematicElement[] = [
    wire("ic_box", [x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]),
    label("ic_name", 215, 200, "74HC148"),
    label("ic_ei", x0 + 14, EI_Y, "EI'"),
  ];
  IN_Y.forEach((y, i) => els.push(label(`ic_i${i}`, x0 + 12, y, `I${i}`)));
  OUTS.forEach((p) => els.push(label(`ic_${p.id}`, x1 - 16, p.y, p.name)));

  if (o.ei) {
    els.push(
      labelBefore("lbl_ei", 130, EI_Y, o.disabled ? "+5V" : "GND"),
      hl(wire("w_ei", [130, EI_Y], [x0, EI_Y]), o.hlEi),
    );
  }
  if (o.inputs) {
    IN_Y.forEach((y, i) => {
      const t = o.active === undefined ? `I${i}` : `I${i}=${active.includes(i) ? 0 : 1}`;
      els.push(labelBefore(`lbl_i${i}`, 130, y, t), hl(wire(`w_i${i}`, [130, y], [x0, y]), o.hlInputs));
    });
  }
  if (o.outs) {
    const lv = levels(active, !!o.disabled);
    const lastY = OUTS[OUTS.length - 1].y;
    els.push(
      { type: "probe", id: "vcc_bus", x: BUS_X, y: 40, label: "+5V" },
      wire("w_bus", [BUS_X, 46], [BUS_X, lastY]),
    );
    OUTS.forEach((p, i) => {
      const lit = o.active !== undefined && lv[p.id] === 0;
      els.push(
        hl(wire(`w_${p.id}`, [x1, p.y], [290, p.y]), o.hlOuts),
        { type: "led", id: `led_${p.id}`, x: 310, y: p.y, rotation: 180, color: i < 3 ? "red" : "yellow", highlight: o.hlOuts || lit },
        wire(`w_led_r_${p.id}`, [330, p.y], [340, p.y]),
        { type: "resistor", id: `r_${p.id}`, x: 370, y: p.y },
        wire(`w_r_bus_${p.id}`, [400, p.y], [BUS_X, p.y]),
      );
      if (i < OUTS.length - 1) els.push(junction(`j_bus_${p.id}`, BUS_X, p.y));
    });
  }
  return els;
};

const complete = (extra: Opts = {}): SchematicElement[] =>
  encoder({ ei: true, inputs: true, outs: true, ...extra });

const sheet = (t: string, els: SchematicElement[], c: string): SchematicData =>
  ({ width: W, height: H, elements: [label("title", W / 2, 20, t), ...els, label("caption", W / 2, 367, c)] });

export const step01 = sheet("Place the 74HC148", encoder(), "VCC = pin 16, GND = pin 8 · all inputs and outputs active LOW");
export const step02 = sheet("Enable Input EI' = 0", encoder({ ei: true, hlEi: true }), "EI' LOW enables the encoder");
export const step03 = sheet("Inputs I0–I7 (HIGH = idle)", encoder({ ei: true, inputs: true, hlInputs: true, active: [] }), "Pull an input LOW to make it active");
export const step04 = sheet("Output LEDs (Sink Wiring)", complete({ hlOuts: true, active: [] }), "No input active: EO' = 0, GS' = 1, A = 111");
export const step05 = sheet("Test: I3 Active", complete({ active: [3] }), "A2' A1' A0' = 100 → LEDs read 011 = 3 · GS' = 0");
export const step06 = sheet("Priority: I3 and I5 Active", complete({ active: [3, 5] }), "Higher input wins: code 101 = 5");
export const step07 = sheet("Priority: I7 Overrides All", complete({ active: [0, 3, 5, 7] }), "I7 has the highest priority: code 111 = 7");
export const step08 = sheet("Disable: EI' = 1", complete({ active: [0, 3, 5, 7], hlEi: true, disabled: true }), "Disabled: every output HIGH, every LED off");

export const priorityEncoder8to3IcStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08,
];

export const priorityEncoder8to3IcTheoryDiagram: SchematicData = sheet(
  "8:3 Priority Encoder — 74HC148",
  complete(),
  "Output = binary code of the highest-numbered active input",
);
