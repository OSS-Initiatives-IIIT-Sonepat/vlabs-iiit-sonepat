import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * JK & T Flip-Flop (74HC76) — progressive 2D schematics.
 * JK flip-flop: Versatile flip-flop with Set, Reset, Toggle modes
 * T flip-flop: Toggle mode by connecting J=K=T
 *
 * JK Truth Table:
 * J=0, K=0: Q unchanged (Hold)
 * J=1, K=0: Q=1 (Set)
 * J=0, K=1: Q=0 (Reset)
 * J=1, K=1: Q toggles (Toggle)
 *
 * The flip-flop is a closed outline (150,70)–(260,190): J y90 / CLK y130 / K y170
 * on the left, Q y100 / Q' y160 on the right, SET x180 / CLR x230 on top.
 */

const W = 420;
const H = 300;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);
/** Label whose right edge sits just before a wire starting at x. */
const labelBefore = (id: string, x: number, y: number, text: string) => label(id, x - 4 - text.length * 2.52, y, text);

type Opts = {
  t?: boolean;
  vcc?: boolean;
  hlVcc?: boolean;
  inputs?: boolean;
  hlJ?: boolean;
  hlK?: boolean;
  hlClk?: boolean;
  hlT?: boolean;
  j?: string;
  k?: string;
  tIn?: string;
  clk?: string;
  outs?: boolean;
  hlOuts?: boolean;
  q?: string;
  qn?: string;
  hlQ?: boolean;
  hlQn?: boolean;
};

const jk = (o: Opts = {}): SchematicElement[] => {
  const els: SchematicElement[] = [
    wire("ff_box", [150, 70], [260, 70], [260, 190], [150, 190], [150, 70]),
    label("ff_name", 205, 134, o.t ? "T-FF" : "JK-FF"),
    label("pin_set", 180, 83, "SET"), label("pin_clr", 230, 83, "CLR"),
    label("pin_j", 158, 93, "J"), label("pin_clk", 168, 133, "▷CLK"), label("pin_k", 158, 173, "K"),
    label("pin_q", 252, 103, "Q"), label("pin_qn", 251, 163, "Q'"),
  ];
  if (o.vcc) {
    els.push(
      label("lbl_vcc", 98, 40, "+5V"),
      hl(wire("w_vcc", [110, 40], [230, 40], [230, 70]), o.hlVcc),
      hl(wire("w_set", [180, 40], [180, 70]), o.hlVcc), junction("j_set", 180, 40),
    );
  }
  if (o.inputs) {
    const clk = o.clk ?? "CLK";
    els.push(labelBefore("lbl_clk", 64, 130, clk), hl(wire("w_clk", [64, 130], [150, 130]), o.hlClk));
    if (o.t) {
      const t = o.tIn ?? "T";
      els.push(
        labelBefore("lbl_t", 52, 220, t),
        hl(wire("w_t", [52, 220], [110, 220], [110, 90], [150, 90]), o.hlT),
        hl(wire("w_t_k", [110, 170], [150, 170]), o.hlT), junction("j_t", 110, 170),
      );
    } else {
      const j = o.j ?? "J";
      const k = o.k ?? "K";
      els.push(
        labelBefore("lbl_j", 64, 90, j), hl(wire("w_j", [64, 90], [150, 90]), o.hlJ),
        labelBefore("lbl_k", 64, 170, k), hl(wire("w_k", [64, 170], [150, 170]), o.hlK),
      );
    }
  }
  if (o.outs) {
    for (const [id, y, text, on] of [["q", 100, o.q ?? "Q", o.hlQ], ["qn", 160, o.qn ?? "Q'", o.hlQn]] as const) {
      els.push(
        hl(wire(`w_${id}`, [260, y], [270, y]), o.hlOuts),
        { type: "resistor", id: `r_${id}`, x: 300, y, label: "330Ω", highlight: o.hlOuts },
        wire(`w_${id}_led`, [330, y], [340, y]),
        { type: "led", id: `led_${id}`, x: 360, y, label: text, color: id === "q" ? "green" : "yellow", highlight: o.hlOuts || on },
        wire(`w_${id}_gnd`, [380, y], [395, y], [395, y + 10]),
        { type: "ground", id: `gnd_${id}`, x: 395, y: y + 10 },
      );
    }
  }
  return els;
};

const FULL: Opts = { vcc: true, inputs: true, outs: true };

/** Step 1: Place breadboard - Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "JK & T Flip-Flop (74HC76)"),
  label("lbl_desc1", 210, 55, "JK: Most versatile flip-flop"),
  label("lbl_desc2", 210, 80, "T: Toggle flip-flop (J=K=T)"),
  label("lbl_tt", 120, 115, "JK Truth Table:"),
  label("lbl_t1", 120, 140, "J K | Qnext"),
  label("lbl_t2", 120, 160, "0 0 | Q (hold)"),
  label("lbl_t3", 120, 180, "1 0 | 1 (set)"),
  label("lbl_t4", 120, 200, "0 1 | 0 (reset)"),
  label("lbl_t5", 120, 220, "1 1 | Q' (toggle)"),
  label("lbl_tm", 310, 115, "T Mode (J=K=T):"),
  label("lbl_tm1", 310, 145, "T=0: Q unchanged"),
  label("lbl_tm2", 310, 170, "T=1: Q toggles"),
  label("lbl_note", 210, 260, "74HC76: Negative edge triggered"),
]};

/** Step 2: Place 74HC76 - Show JK flip-flop symbol */
export const step02: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "74HC76 JK Flip-Flop Symbol"),
  ...jk(),
  label("lbl_note", 210, 230, "SET, CLR: Active-low async controls"),
  label("lbl_note2", 210, 255, "74HC76 has 2 JK flip-flops (falling-edge CLK)"),
]};

/** Step 3: Tie SET and CLR high */
export const step03: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "Tie SET and CLR High"),
  ...jk({ vcc: true, hlVcc: true }),
  label("lbl_note1", 210, 230, "SET=1, CLR=1: Normal operation"),
  label("lbl_note2", 210, 255, "Output controlled by J, K, CLK"),
]};

/** Step 4: Wire J, K, CLK inputs */
export const step04: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "Wire J, K, CLK Inputs"),
  ...jk({ vcc: true, inputs: true, hlJ: true, hlK: true, hlClk: true }),
  label("lbl_note", 210, 230, "Connect J, K to switches"),
  label("lbl_note2", 210, 255, "CLK to pushbutton"),
]};

/** Step 5: Add output LEDs - Complete JK circuit */
export const step05: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "JK Flip-Flop — Complete Circuit"),
  ...jk({ ...FULL, hlOuts: true }),
  label("lbl_note", 210, 240, "Q and Q' LEDs with 330Ω limiters"),
]};

/** Step 6: Test J=1, K=0 (Set) */
export const step06: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "Test: J=1, K=0 (Set Mode)"),
  ...jk({ ...FULL, j: "J=1", k: "K=0", clk: "CLK↓", hlJ: true, hlClk: true, q: "Q=1", qn: "Q'=0", hlQ: true }),
  label("lbl_exp1", 210, 230, "J=1, K=0: SET mode — on clock edge Q → 1"),
  label("lbl_exp3", 210, 255, "Result: Q=1, Q'=0 ✓"),
]};

/** Step 7: Test J=0, K=1 (Reset) */
export const step07: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "Test: J=0, K=1 (Reset Mode)"),
  ...jk({ ...FULL, j: "J=0", k: "K=1", clk: "CLK↓", hlK: true, hlClk: true, q: "Q=0", qn: "Q'=1", hlQn: true }),
  label("lbl_exp1", 210, 230, "J=0, K=1: RESET mode — on clock edge Q → 0"),
  label("lbl_exp3", 210, 255, "Result: Q=0, Q'=1 ✓"),
]};

/** Step 8: Test J=1, K=1 (Toggle) */
export const step08: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "Test: J=1, K=1 (Toggle Mode)"),
  ...jk({ ...FULL, j: "J=1", k: "K=1", clk: "CLK↓", hlJ: true, hlK: true, hlClk: true, q: "Q→Q'", qn: "Q'→Q", hlQ: true, hlQn: true }),
  label("lbl_exp1", 210, 230, "J=1, K=1: TOGGLE mode — Q inverts on each edge"),
  label("lbl_exp3", 210, 255, "0→1→0→1... (frequency division)"),
]};

/** Step 9: Rewire for T flip-flop mode (J=K=T) */
export const step09: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 210, 20, "Rewire for T Flip-Flop Mode"),
  ...jk({ ...FULL, t: true, hlT: true }),
  label("lbl_note", 210, 250, "T connected to both J and K"),
  label("lbl_note2", 210, 272, "JK flip-flop becomes T flip-flop"),
]};

/** Step 10: T mode toggle test */
export const step10: SchematicData = { width: W, height: 360, gallery: true, elements: [
  label("lbl_title", 210, 20, "T Flip-Flop — Toggle Test"),
  ...jk({ ...FULL, t: true, tIn: "T=1", clk: "CLK↓", hlT: true, hlClk: true, hlQ: true, hlQn: true }),
  label("lbl_timing", 210, 250, "T=1 Timing:"),
  label("lbl_clk_t", 70, 285, "CLK:"),
  wire("w_clk_wave", [100, 285], [120, 285], [120, 270], [140, 270], [140, 285], [160, 285], [160, 270], [180, 270], [180, 285], [200, 285], [200, 270], [220, 270]),
  label("lbl_q_t", 70, 325, "Q:"),
  wire("w_q_wave", [100, 325], [140, 325], [140, 310], [180, 310], [180, 325], [220, 325]),
  label("lbl_note1", 320, 290, "Q toggles on each"),
  label("lbl_note2", 320, 305, "falling CLK edge"),
  label("lbl_app", 320, 325, "Frequency divider (÷2)"),
]};

/** Indexed array */
export const jkTFlipFlopStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
  step06, step07, step08, step09, step10,
];

/** Theory diagram */
export const jkTFlipFlopTheoryDiagram: SchematicData = step05;
