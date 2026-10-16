import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * 3:8 Decoder using the 74HC138 — progressive 2D schematics.
 *
 * The IC is a closed outline (x 170–260). Address inputs A0–A2 and the three
 * enables enter on the left; the eight active-LOW outputs leave on the right.
 * Each output sinks an LED: Yn ← LED ← 330 Ω ← +5 V bus (x 420), so the LED of
 * the selected (LOW) output lights.
 */

const W = 460;
const H = 370;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);
const labelBefore = (id: string, x: number, y: number, text: string) => label(id, x - 4 - text.length * 2.52, y, text);

const BOX = { x0: 170, x1: 260, y0: 50, y1: 335 };
const ADDR_Y = [80, 110, 140];
const EN = [
  { name: "E1", y: 210 },
  { name: "E2'", y: 250 },
  { name: "E3'", y: 290 },
];
const OUT_Y = Array.from({ length: 8 }, (_, i) => 70 + 35 * i);
const BUS_X = 420;

type Opts = {
  enables?: boolean;
  hlEn?: boolean;
  addr?: boolean;
  hlAddr?: boolean;
  outs?: boolean;
  hlOuts?: boolean;
  /** Address applied (0–7); shows bit values and lights that output. */
  value?: number;
  /** E1 tied LOW: decoder disabled, every output HIGH. */
  disabled?: boolean;
};

const decoder = (o: Opts = {}): SchematicElement[] => {
  const { x0, x1, y0, y1 } = BOX;
  const els: SchematicElement[] = [
    wire("ic_box", [x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]),
    label("ic_name", 215, 190, "74HC138"),
  ];
  ADDR_Y.forEach((y, i) => els.push(label(`ic_a${i}`, x0 + 14, y, `A${i}`)));
  EN.forEach((e, i) => els.push(label(`ic_e${i}`, x0 + 14, e.y, e.name)));
  OUT_Y.forEach((y, i) => els.push(label(`ic_y${i}`, x1 - 14, y, `Y${i}`)));

  if (o.enables) {
    EN.forEach((e, i) => {
      const tie = i === 0 && !o.disabled ? "+5V" : "GND";
      els.push(
        labelBefore(`lbl_en${i}`, 130, e.y, tie),
        hl(wire(`w_en${i}`, [130, e.y], [x0, e.y]), o.hlEn),
      );
    });
  }
  if (o.addr) {
    ADDR_Y.forEach((y, i) => {
      const bit = o.value === undefined ? undefined : (o.value >> i) & 1;
      const t = bit === undefined ? `A${i}` : `A${i}=${bit}`;
      els.push(labelBefore(`lbl_a${i}`, 110, y, t), hl(wire(`w_a${i}`, [110, y], [x0, y]), o.hlAddr));
    });
  }
  if (o.outs) {
    els.push(
      { type: "probe", id: "vcc_bus", x: BUS_X, y: 40, label: "+5V" },
      wire("w_bus", [BUS_X, 46], [BUS_X, OUT_Y[7]]),
    );
    OUT_Y.forEach((y, i) => {
      const lit = !o.disabled && o.value === i;
      els.push(
        hl(wire(`w_y${i}`, [x1, y], [290, y]), o.hlOuts),
        { type: "led", id: `led_y${i}`, x: 310, y, rotation: 180, color: "red", highlight: o.hlOuts || lit },
        wire(`w_led_r${i}`, [330, y], [340, y]),
        { type: "resistor", id: `r_y${i}`, x: 370, y },
        wire(`w_r_bus${i}`, [400, y], [BUS_X, y]),
      );
      if (i < 7) els.push(junction(`j_bus${i}`, BUS_X, y));
    });
  }
  return els;
};

const complete = (extra: Opts = {}): SchematicElement[] =>
  decoder({ enables: true, addr: true, outs: true, ...extra });

const sheet = (t: string, els: SchematicElement[], c: string): SchematicData =>
  ({ width: W, height: H, elements: [label("title", W / 2, 20, t), ...els, label("caption", W / 2, 357, c)] });

export const step01 = sheet("Place the 74HC138", decoder(), "VCC = pin 16, GND = pin 8 · outputs Y0–Y7 are active LOW");
export const step02 = sheet("Enable the Decoder", decoder({ enables: true, hlEn: true }), "E1 = 1 and E2' = E3' = 0 enable the outputs");
export const step03 = sheet("Address Inputs A0–A2", decoder({ enables: true, addr: true, hlAddr: true }), "A0 is the least significant bit");
export const step04 = sheet("Output LEDs (Sink Wiring)", complete({ hlOuts: true, value: 0 }), "LED lights when its output is LOW · 000 selects Y0");
export const step05 = sheet("Test: A2A1A0 = 011 → Y3", complete({ value: 3 }), "Only Y3 goes LOW; the other seven stay HIGH");
export const step06 = sheet("Test: A2A1A0 = 101 → Y5", complete({ value: 5 }), "Yn = 0 when n = 4·A2 + 2·A1 + A0");
export const step07 = sheet("Test: A2A1A0 = 111 → Y7", complete({ value: 7 }), "Each address selects exactly one output");
export const step08 = sheet("Disable: E1 = 0", complete({ value: 7, hlEn: true, disabled: true }), "Disabled: all outputs HIGH, every LED off");

export const decoder3to8IcStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08,
];

export const decoder3to8IcTheoryDiagram: SchematicData = sheet(
  "3:8 Decoder — 74HC138",
  complete(),
  "Yn' = E1·E2'·E3'·mn — one output LOW per address",
);
