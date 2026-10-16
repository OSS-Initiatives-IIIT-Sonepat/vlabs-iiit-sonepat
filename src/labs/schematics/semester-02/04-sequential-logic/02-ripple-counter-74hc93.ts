import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * 4-bit Ripple Counter 74HC93 — MOD-16 and decade (asynchronous reset).
 *
 * Closed IC outline (x 170–260, y 70–300). CKA is clocked from the left; the
 * QA → CKB cascade runs over the top of the IC (y 50). QA–QD on the right drive
 * 330 Ω → LED → GND. The reset inputs are tied to GND, or to QB and QD by net
 * label for the decade counter.
 */

const W = 440;
const H = 360;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);
const labelBefore = (id: string, x: number, y: number, text: string) => label(id, x - 4 - text.length * 2.52, y, text);

const BOX = { x0: 170, x1: 260, y0: 70, y1: 300 };
const LEFT = {
  ckb: { name: "CKB", y: 100 },
  cka: { name: "CKA", y: 150 },
  r01: { name: "R0(1)", y: 220 },
  r02: { name: "R0(2)", y: 260 },
};
const RIGHT = [
  { id: "qa", name: "QA", y: 100 },
  { id: "qb", name: "QB", y: 145 },
  { id: "qc", name: "QC", y: 190 },
  { id: "qd", name: "QD", y: 235 },
];
const TAP_X = 270;

type Opts = {
  /** Reset inputs: tied to GND, or to QB/QD for the decade counter. */
  resets?: "gnd" | "decade";
  hlResets?: boolean;
  outs?: boolean;
  hlOuts?: boolean;
  clock?: boolean;
  hlClock?: boolean;
  /** QA → CKB cascade. */
  link?: boolean;
  hlLink?: boolean;
  /** Current count (0–15); lit LEDs show the 1 bits. */
  count?: number;
};

const counter = (o: Opts = {}): SchematicElement[] => {
  const { x0, x1, y0, y1 } = BOX;
  const els: SchematicElement[] = [
    wire("ic_box", [x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]),
    label("ic_name", 215, 180, "74HC93"),
  ];
  for (const [id, p] of Object.entries(LEFT)) els.push(label(`ic_${id}`, x0 + 18, p.y, p.name));
  for (const p of RIGHT) els.push(label(`ic_${p.id}`, x1 - 16, p.y, p.name));

  if (o.resets) {
    const decade = o.resets === "decade";
    for (const [id, text] of [["r01", decade ? "QB" : "GND"], ["r02", decade ? "QD" : "GND"]] as const) {
      const y = LEFT[id].y;
      els.push(labelBefore(`lbl_${id}`, 130, y, text), hl(wire(`w_${id}`, [130, y], [x0, y]), o.hlResets));
    }
  }
  if (o.clock) {
    const y = LEFT.cka.y;
    els.push(labelBefore("lbl_cka", 130, y, "1 Hz ⎍"), hl(wire("w_cka", [130, y], [x0, y]), o.hlClock));
  }
  if (o.outs) {
    const count = o.count ?? 0;
    RIGHT.forEach((p, i) => {
      const lit = o.count !== undefined && ((count >> i) & 1) === 1;
      els.push(
        hl(wire(`w_${p.id}`, [x1, p.y], [280, p.y]), o.hlOuts),
        { type: "resistor", id: `r_${p.id}`, x: 310, y: p.y },
        wire(`w_${p.id}_led`, [340, p.y], [350, p.y]),
        { type: "led", id: `led_${p.id}`, x: 370, y: p.y, color: "red", highlight: o.hlOuts || lit },
        wire(`w_${p.id}_gnd`, [390, p.y], [405, p.y], [405, p.y + 10]),
        { type: "ground", id: `gnd_${p.id}`, x: 405, y: p.y + 10 },
      );
      if (o.resets === "decade" && (p.id === "qb" || p.id === "qd")) {
        const y = p.y + 22;
        els.push(junction(`j_${p.id}`, TAP_X, p.y), wire(`w_tap_${p.id}`, [TAP_X, p.y], [TAP_X, y]), label(`lbl_tap_${p.id}`, TAP_X, y + 8, p.name));
      }
    });
  }
  if (o.link) {
    const qa = RIGHT[0].y;
    els.push(
      junction("j_qa", TAP_X, qa),
      hl(wire("w_link", [TAP_X, qa], [TAP_X, 50], [150, 50], [150, LEFT.ckb.y], [x0, LEFT.ckb.y]), o.hlLink),
    );
  }
  return els;
};

const mod16 = (extra: Opts = {}): SchematicElement[] =>
  counter({ resets: "gnd", outs: true, clock: true, link: true, ...extra });

const sheet = (t: string, els: SchematicElement[], c: string): SchematicData =>
  ({ width: W, height: H, elements: [label("title", W / 2, 20, t), ...els, label("caption", W / 2, 345, c)] });

export const step01 = sheet("Place the 74HC93", counter(), "VCC = pin 5, GND = pin 10");
export const step02 = sheet("Reset Inputs to GND", counter({ resets: "gnd", hlResets: true }), "R0(1) = R0(2) = 0: counting enabled");
export const step03 = sheet("Output LEDs QA–QD", counter({ resets: "gnd", outs: true, hlOuts: true, count: 0 }), "QD QC QB QA = 0000 after reset");
export const step04 = sheet("Clock CKA: QA Divides by 2", counter({ resets: "gnd", outs: true, clock: true, hlClock: true, count: 1 }), "QA toggles on each falling edge; QB–QD stay 0");
export const step05 = sheet("Cascade QA → CKB: MOD-16", mod16({ hlLink: true, count: 6 }), "After 6 pulses: QD QC QB QA = 0110");
export const step06 = sheet("Count 15 and Roll Over", mod16({ count: 15 }), "1111 = 15; next falling edge → 0000");
export const step07 = sheet("Decade Counter: R0(1) = QB, R0(2) = QD", mod16({ resets: "decade", hlResets: true, count: 9 }), "Count 1001 = 9; reset fires when QB = QD = 1");
export const step08 = sheet("Decade Counter: Reset at 1010", mod16({ resets: "decade", count: 0 }), "1010 clears at once to 0000: sequence 0 → 9 → 0");

export const rippleCounter74hc93StepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08,
];

export const rippleCounter74hc93TheoryDiagram: SchematicData = sheet(
  "74HC93 as a Decade Counter",
  mod16({ resets: "decade" }),
  "QA → CKB gives MOD-16; resetting at 1010 gives MOD-10",
);
