import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * SR Latch — progressive 2D schematics.
 * Active-low S' (Set) and R' (Reset) inputs on one latch of a 74HC279.
 * The IC is a closed outline (x 160–260, y 70–170) with S' (pin 1), R' (pin 2) and
 * Q (pin 3) as wired in the simulator; Q drives 330Ω → LED → GND. The 74HC279 has no
 * Q' pin, so Q' only appears in the cross-coupled NAND theory diagram.
 */

const W = 420;
const H = 280;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);
const labelBefore = (id: string, x: number, y: number, text: string) => label(id, x - 4 - text.length * 2.52, y, text);

type Opts = {
  hlIc?: boolean;
  inputs?: boolean;
  hlInputs?: boolean;
  resistor?: boolean;
  hlResistor?: boolean;
  led?: boolean;
  hlLed?: boolean;
  wired?: boolean;
  hlWired?: boolean;
  /** Test values: S', R' and Q (Q may be text such as "Q" for hold). */
  s?: string;
  r?: string;
  q?: string;
  hlS?: boolean;
  hlR?: boolean;
};

const latch = (o: Opts = {}): SchematicElement[] => {
  const els: SchematicElement[] = [
    wire("ic_box", [160, 70], [260, 70], [260, 170], [160, 170], [160, 70]),
    label("ic_name", 210, 118, "74HC279"),
    label("ic_sub", 210, 132, "Latch 1"),
    label("ic_vcc", 210, 80, "VCC"),
    label("ic_gnd", 210, 162, "GND"),
    label("ic_s", 176, 98, "S' 1"),
    label("ic_r", 176, 148, "R' 2"),
    label("ic_q", 246, 98, "3 Q"),
    label("lbl_vcc", 210, 34, "+5V"),
    hl(wire("w_vcc", [210, 42], [210, 70]), o.hlIc),
    hl(wire("w_gnd", [210, 170], [210, 185]), o.hlIc),
    { type: "ground", id: "gnd_ic", x: 210, y: 185 },
  ];
  if (o.inputs) {
    const sText = o.s ? `S'=${o.s}` : "S'";
    const rText = o.r ? `R'=${o.r}` : "R'";
    els.push(
      labelBefore("lbl_s", 80, 95, sText), hl(wire("w_s", [80, 95], [160, 95]), o.hlInputs || o.hlS),
      labelBefore("lbl_r", 80, 145, rText), hl(wire("w_r", [80, 145], [160, 145]), o.hlInputs || o.hlR),
    );
  }
  if (o.resistor) {
    els.push({ type: "resistor", id: "r_q", x: 310, y: 95, label: "330Ω", highlight: o.hlResistor });
  }
  if (o.led) {
    const lit = o.q === "1";
    els.push(
      { type: "led", id: "led_q", x: 360, y: 95, label: o.q ? `Q=${o.q}` : "Q", color: "green", highlight: o.hlLed || lit },
      hl(wire("w_led_gnd", [380, 95], [395, 95], [395, 105]), o.hlWired),
      { type: "ground", id: "gnd_led", x: 395, y: 105 },
    );
  }
  if (o.wired) els.push(hl(wire("w_q", [260, 95], [280, 95]), o.hlWired));
  return els;
};

const complete = (extra: Opts = {}): SchematicElement[] =>
  latch({ inputs: true, resistor: true, led: true, wired: true, ...extra });

/** Step 1: place-breadboard — Breadboard setup */
export const step01_placeBreadboard: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "SR Latch — Breadboard Supply Rails"),
  { type: "vsource", id: "vcc", x: 60, y: 140, label: "+5V" },
  hl(wire("w_vcc_rail", [60, 110], [60, 90], [380, 90]), true),
  junction("t_vcc", 380, 90),
  label("lbl_vcc_rail", 220, 80, "VCC rail (red)"),
  hl(wire("w_gnd_rail", [60, 170], [60, 190], [380, 190]), true),
  junction("t_gnd", 380, 190),
  { type: "ground", id: "gnd", x: 60, y: 190 },
  junction("jg", 60, 190),
  label("lbl_gnd_rail", 220, 204, "GND rail (blue)"),
  label("lbl_note", 210, 250, "Centre gap separates rows a–e from f–j"),
]};

/** Step 2: place-74hc279 — IC placement and supply */
export const step02_place74hc279: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "SR Latch — Place the 74HC279"),
  ...latch({ hlIc: true }),
  label("lbl_note", 210, 230, "DIP-16 straddling the centre gap · pin 1 = S' of Latch 1"),
  label("lbl_note2", 210, 252, "Active-low inputs: 0 = active, 1 = inactive"),
]};

/** Step 3: wire-s-bar-r-bar-inputs — Connect S' and R' inputs */
export const step03_wireSBarRBarInputs: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "SR Latch — Input Wiring"),
  ...latch({ inputs: true, hlInputs: true }),
  label("lbl_active_low", 210, 230, "Active-LOW: HIGH = inactive, LOW = active"),
  label("lbl_hint", 210, 252, "Real push-buttons need a 10k pull-up to VCC"),
]};

/** Step 4: place-resistor — 330Ω current-limiting resistor */
export const step04_placeResistor: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "SR Latch — 330Ω Resistor"),
  ...latch({ inputs: true, resistor: true, hlResistor: true }),
  label("lbl_note", 210, 230, "Current-limiting resistor in the Q output path"),
]};

/** Step 5: place-q-led — Q output LED indicator */
export const step05_placeQLed: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "SR Latch — Q Output LED"),
  ...latch({ inputs: true, resistor: true, led: true, hlLed: true }),
  label("lbl_note", 210, 230, "LED ON = Q is HIGH (Set state)"),
  label("lbl_note2", 210, 252, "LED OFF = Q is LOW (Reset state)"),
]};

/** Step 6: connect-output — Complete output path */
export const step06_connectOutput: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "SR Latch — Connect the Output Path"),
  ...complete({ hlWired: true }),
  label("lbl_note", 210, 230, "Q pin → 330Ω → LED anode · LED cathode → GND"),
]};

/** Step 7: test-reset-s1r0 — Test RESET state (S'=1, R'=0) */
export const step07_testResetS1R0: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "SR Latch — RESET Test (S'=1, R'=0)"),
  ...complete({ s: "1", r: "0", q: "0", hlR: true }),
  label("lbl_truth", 210, 230, "R' active → Q = 0, LED OFF"),
  label("lbl_state", 210, 252, "RESET STATE (stores 0)"),
]};

/** Step 8: test-set-s0r1 — Test SET state (S'=0, R'=1) */
export const step08_testSetS0R1: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "SR Latch — SET Test (S'=0, R'=1)"),
  ...complete({ s: "0", r: "1", q: "1", hlS: true }),
  label("lbl_truth", 210, 230, "S' active → Q = 1, LED ON"),
  label("lbl_state", 210, 252, "SET STATE (stores 1)"),
]};

/** Step 9: test-hold-both1 — Test HOLD state (S'=1, R'=1) */
export const step09_testHoldBoth1: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "SR Latch — HOLD Test (S'=1, R'=1)"),
  ...complete({ s: "1", r: "1", q: "1" }),
  label("lbl_truth", 210, 230, "Both inactive → Q keeps its last value (here 1 after SET)"),
  label("lbl_state", 210, 252, "HOLD STATE (memory)"),
]};

/** Step 10: observe-forbidden-both0 — Forbidden state (S'=0, R'=0) */
export const step10_observeForbiddenBoth0: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "SR Latch — FORBIDDEN (S'=0, R'=0)"),
  ...complete({ s: "0", r: "0", q: "1", hlS: true, hlR: true }),
  label("lbl_warning", 210, 230, "Q and Q' both forced HIGH — not complementary"),
  label("lbl_why", 210, 252, "Back to 11: Q settles unpredictably — avoid this input"),
]};

/** Indexed array */
export const srLatchStepSchematics: SchematicData[] = [
  step01_placeBreadboard,
  step02_place74hc279,
  step03_wireSBarRBarInputs,
  step04_placeResistor,
  step05_placeQLed,
  step06_connectOutput,
  step07_testResetS1R0,
  step08_testSetS0R1,
  step09_testHoldBoth1,
  step10_observeForbiddenBoth0,
];

/** Theory diagram — cross-coupled NAND SR latch */
export const srLatchTheoryDiagram: SchematicData = { width: 400, height: 260, elements: [
  label("lbl_title", 200, 20, "SR Latch (Active-Low) — Cross-coupled NANDs"),
  { type: "nand-gate", id: "NAND1", x: 180, y: 90, label: "N1" },
  { type: "nand-gate", id: "NAND2", x: 180, y: 160, label: "N2" },
  labelBefore("lbl_s", 50, 82, "S'"), wire("w_s_in", [50, 82], [154, 82]),
  labelBefore("lbl_r", 50, 168, "R'"), wire("w_r_in", [50, 168], [154, 168]),
  wire("w_q_to_n2", [240, 90], [240, 120], [130, 120], [130, 152], [154, 152]),
  wire("w_qb_to_n1", [250, 160], [250, 130], [120, 130], [120, 98], [154, 98]),
  wire("w_q_out", [212, 90], [300, 90]), junction("j_q", 240, 90), label("lbl_q", 310, 90, "Q"),
  wire("w_qb_out", [212, 160], [300, 160]), junction("j_qb", 250, 160), label("lbl_qb", 311, 160, "Q'"),
  label("lbl_truth_header", 200, 200, "S' R' | Q  Q'"),
  label("lbl_truth_set", 200, 215, " 0  1 | 1  0  (SET)"),
  label("lbl_truth_reset", 200, 230, " 1  0 | 0  1  (RESET)"),
  label("lbl_truth_hold", 200, 245, " 1  1 | Q  Q' (HOLD)"),
]};
