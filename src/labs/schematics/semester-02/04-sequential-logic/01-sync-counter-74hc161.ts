import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * 4-bit Synchronous Counter 74HC161 — MOD-16 and MOD-10 (synchronous load).
 *
 * Closed IC outline (x 170–260, y 70–340). Control inputs on the left are tied
 * to +5 V or GND; Q0–Q3 and RCO on the right drive 330 Ω → LED → GND.
 * MOD-10: a NAND (left of the IC) drives LD' from Q3·Q0. Q0 is tapped over the
 * top of the IC (y 55) and Q3 under the bottom (y 365); RCO is left off then.
 */

const W = 440;
const H = 400;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);
const labelBefore = (id: string, x: number, y: number, text: string) => label(id, x - 4 - text.length * 2.52, y, text);

const BOX = { x0: 170, x1: 260, y0: 70, y1: 340 };
const LEFT = {
  clk: { name: "CLK", y: 90 },
  clr: { name: "CLR'", y: 120 },
  ld: { name: "LD'", y: 150 },
  enp: { name: "ENP", y: 180 },
  ent: { name: "ENT", y: 210 },
  d0: { name: "D0", y: 240 },
  d1: { name: "D1", y: 265 },
  d2: { name: "D2", y: 290 },
  d3: { name: "D3", y: 315 },
};
const RIGHT = [
  { id: "q0", name: "Q0", y: 100 },
  { id: "q1", name: "Q1", y: 145 },
  { id: "q2", name: "Q2", y: 190 },
  { id: "q3", name: "Q3", y: 235 },
  { id: "rco", name: "RCO", y: 290 },
];
const TAP_X = 270;

type Opts = {
  ties?: boolean;
  hlTies?: boolean;
  outs?: boolean;
  hlOuts?: boolean;
  clock?: boolean;
  hlClock?: boolean;
  /** Current count (0–15); lit LEDs show the 1 bits. */
  count?: number;
  /** CLR' held LOW. */
  cleared?: boolean;
  /** MOD-10: NAND(Q3, Q0) drives LD'. */
  mod10?: boolean;
};

const counter = (o: Opts = {}): SchematicElement[] => {
  const { x0, x1, y0, y1 } = BOX;
  const els: SchematicElement[] = [
    wire("ic_box", [x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]),
    label("ic_name", 220, 205, "74HC161"),
  ];
  for (const [id, p] of Object.entries(LEFT)) els.push(label(`ic_${id}`, x0 + 16, p.y, p.name));
  for (const p of RIGHT) els.push(label(`ic_${p.id}`, x1 - 16, p.y, p.name));

  if (o.ties) {
    const tie = (id: keyof typeof LEFT, text: string) => {
      const y = LEFT[id].y;
      els.push(labelBefore(`lbl_${id}`, 130, y, text), hl(wire(`w_${id}`, [130, y], [x0, y]), o.hlTies));
    };
    tie("clr", o.cleared ? "GND" : "+5V");
    if (!o.mod10) tie("ld", "+5V");
    tie("enp", "+5V");
    tie("ent", "+5V");
    tie("d0", "GND");
    tie("d1", "GND");
    tie("d2", "GND");
    tie("d3", "GND");
  }
  if (o.clock) {
    const y = LEFT.clk.y;
    els.push(labelBefore("lbl_clk", 130, y, "1 Hz ⎍"), hl(wire("w_clk", [130, y], [x0, y]), o.hlClock));
  }
  if (o.outs) {
    const count = o.cleared ? 0 : (o.count ?? 0);
    RIGHT.forEach((p, i) => {
      if (o.mod10 && p.id === "rco") return;
      const on = p.id === "rco" ? count === 15 : ((count >> i) & 1) === 1;
      const lit = o.count !== undefined && on;
      els.push(
        hl(wire(`w_${p.id}`, [x1, p.y], [280, p.y]), o.hlOuts),
        { type: "resistor", id: `r_${p.id}`, x: 310, y: p.y },
        wire(`w_${p.id}_led`, [340, p.y], [350, p.y]),
        { type: "led", id: `led_${p.id}`, x: 370, y: p.y, color: p.id === "rco" ? "yellow" : "red", highlight: o.hlOuts || lit },
        wire(`w_${p.id}_gnd`, [390, p.y], [405, p.y], [405, p.y + 10]),
        { type: "ground", id: `gnd_${p.id}`, x: 405, y: p.y + 10 },
      );
    });
  }
  if (o.mod10) {
    const q0 = RIGHT[0].y;
    const q3 = RIGHT[3].y;
    els.push(
      { type: "nand-gate", id: "nand_ld", x: 110, y: LEFT.ld.y, highlight: true },
      hl(wire("w_nand_ld", [142, LEFT.ld.y], [x0, LEFT.ld.y]), true),
      junction("j_q0", TAP_X, q0),
      hl(wire("w_tap_q0", [TAP_X, q0], [TAP_X, 55], [66, 55], [66, LEFT.ld.y - 8], [84, LEFT.ld.y - 8]), true),
      junction("j_q3", TAP_X, q3),
      hl(wire("w_tap_q3", [TAP_X, q3], [TAP_X, 365], [56, 365], [56, LEFT.ld.y + 8], [84, LEFT.ld.y + 8]), true),
    );
  }
  return els;
};

const full = (extra: Opts = {}): SchematicElement[] => counter({ ties: true, outs: true, clock: true, ...extra });

const sheet = (t: string, els: SchematicElement[], c: string): SchematicData =>
  ({ width: W, height: H, elements: [label("title", W / 2, 20, t), ...els, label("caption", W / 2, 388, c)] });

export const step01 = sheet("Place the 74HC161", counter(), "VCC = pin 16, GND = pin 8");
export const step02 = sheet("Tie the Control Inputs", counter({ ties: true, hlTies: true }), "CLR' = LD' = 1 (inactive), ENP = ENT = 1 (count enabled)");
export const step03 = sheet("Output LEDs Q0–Q3 and RCO", counter({ ties: true, outs: true, hlOuts: true, count: 0 }), "Q3 Q2 Q1 Q0 = 0000 after power-up clear");
export const step04 = sheet("Clock: Count Up on Each Rising Edge", full({ hlClock: true, count: 5 }), "After 5 clock pulses: Q3 Q2 Q1 Q0 = 0101");
export const step05 = sheet("Terminal Count: RCO = 1", full({ count: 15 }), "Count 1111 = 15: RCO HIGH; next edge → 0000");
export const step06 = sheet("Asynchronous Clear: CLR' = 0", full({ count: 9, cleared: true, hlTies: true }), "Outputs reset to 0000 at once, without a clock edge");
export const step07 = sheet("MOD-10: LD' = (Q3·Q0)'", full({ mod10: true, count: 9 }), "Count 1001 = 9: NAND output LOW, load armed");
export const step08 = sheet("MOD-10: Synchronous Load to 0000", full({ mod10: true, count: 0 }), "Next edge loads D = 0000: sequence 0 → 9 → 0");

export const syncCounter74hc161StepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06, step07, step08,
];

export const syncCounter74hc161TheoryDiagram: SchematicData = sheet(
  "74HC161 as a MOD-10 Counter",
  full({ mod10: true }),
  "Synchronous load at count 9 gives the sequence 0 → 9",
);
