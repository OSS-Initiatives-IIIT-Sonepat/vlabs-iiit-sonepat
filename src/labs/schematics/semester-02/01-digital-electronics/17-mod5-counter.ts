import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * MOD-5 Counter — progressive 2D schematics.
 * Up counter: QA→clkB, QB→clkC, reset on 101 (QA·QC)
 * Down counter: QA'→clkB, QB'→clkC, reset on 111
 * Uses 3 JK flip-flops with NAND gate reset logic.
 *
 * Flip-flops are closed outlines at x0 = 60 / 200 / 340, 70 wide, y 60–140:
 * J y75, CLK y100, K y125 on the left; Q y75, Q' y125 on the right; CLR' at the
 * bottom centre. The reset NAND is tied in with net labels (QA, QC, CLR').
 */

const W = 480;
const H = 300;

const CW = 480;
const CH = 330;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);

const FFS = [
  { id: "a", x0: 60 },
  { id: "b", x0: 200 },
  { id: "c", x0: 340 },
] as const;

type Opts = {
  mode?: "up" | "down";
  ties?: boolean;
  hlTies?: boolean;
  hlClk?: boolean;
  chain?: boolean;
  hlChain?: boolean;
  leds?: boolean;
  hlLeds?: boolean;
  reset?: boolean;
  hlReset?: boolean;
};

const counter = (o: Opts = {}): SchematicElement[] => {
  const els: SchematicElement[] = [];
  for (const f of FFS) {
    const { id, x0 } = f;
    const x1 = x0 + 70;
    const name = id.toUpperCase();
    els.push(
      wire(`ff${id}_box`, [x0, 60], [x1, 60], [x1, 140], [x0, 140], [x0, 60]),
      label(`ff${id}_name`, x0 + 35, 50, `FF-${name}`),
      label(`ff${id}_j`, x0 + 7, 78, "J"), label(`ff${id}_clk`, x0 + 14, 103, "▷C"), label(`ff${id}_k`, x0 + 7, 128, "K"),
      label(`ff${id}_q`, x1 - 10, 78, `Q${name}`), label(`ff${id}_qn`, x1 - 11, 128, `Q${name}'`),
      label(`ff${id}_clr`, x0 + 35, 133, "CLR'"),
    );
    if (o.ties) {
      els.push(
        label(`ff${id}_j1`, x0 - 18, 75, "1"), hl(wire(`w_${id}_j`, [x0 - 14, 75], [x0, 75]), o.hlTies),
        label(`ff${id}_k1`, x0 - 18, 125, "1"), hl(wire(`w_${id}_k`, [x0 - 14, 125], [x0, 125]), o.hlTies),
      );
    }
    if (o.reset) {
      els.push(
        hl(wire(`w_${id}_clr`, [x0 + 35, 140], [x0 + 35, 156]), o.hlReset),
        label(`ff${id}_clr_net`, x0 + 35, 166, "CLR'"),
      );
    }
  }
  els.push(label("lbl_clk", 22, 100, "CLK"), hl(wire("w_clk", [34, 100], [60, 100]), o.hlClk));
  if (o.chain) {
    const fromY = o.mode === "down" ? 125 : 75;
    for (const [id, x1, next] of [["a", 130, 200], ["b", 270, 340]] as const) {
      els.push(hl(wire(`w_${id}_chain`, [x1, fromY], [x1 + 30, fromY], [x1 + 30, 100], [next, 100]), o.hlChain));
    }
  }
  if (o.leds) {
    for (const [id, x, tap] of [["a", 160, true], ["b", 300, true], ["c", 440, false]] as const) {
      els.push(
        tap
          ? hl(wire(`w_${id}_led`, [x, 100], [x, 170]), o.hlLeds)
          : hl(wire(`w_${id}_led`, [410, 75], [x, 75], [x, 170]), o.hlLeds),
        { type: "led", id: `led_${id}`, x, y: 190, rotation: 90, label: `Q${id.toUpperCase()}`, color: "green", highlight: o.hlLeds },
        wire(`w_${id}_gnd`, [x, 210], [x, 220]),
        { type: "ground", id: `gnd_${id}`, x, y: 220 },
      );
      if (tap) els.push(junction(`j_${id}_led`, x, 100));
    }
  }
  if (o.reset) {
    els.push(
      label("lbl_rst", 150, 272, "Reset logic:"),
      { type: "nand-gate", id: "nand_rst", x: 300, y: 272, label: "(QA·QC)'", highlight: o.hlReset },
      label("lbl_rst_qa", 250, 264, "QA"), hl(wire("w_rst_qa", [260, 264], [274, 264]), o.hlReset),
      label("lbl_rst_qc", 250, 280, "QC"), hl(wire("w_rst_qc", [260, 280], [274, 280]), o.hlReset),
      hl(wire("w_rst_out", [332, 272], [370, 272]), o.hlReset), label("lbl_rst_out", 386, 272, "CLR'"),
    );
  }
  return els;
};

/** Step 1: check-ics — Introduction and IC overview */
export const step01_checkIcs: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 240, 20, "MOD-5 Counter"),
  label("lbl_desc1", 240, 60, "Counts 0-4 (5 states) using 3 JK flip-flops"),
  label("lbl_desc2", 240, 85, "IC: 74LS76 (Dual JK Flip-Flop)"),
  label("lbl_desc3", 240, 110, "Reset Logic: NAND gate (74LS00)"),
  label("lbl_states", 240, 150, "States: 000→001→010→011→100→000"),
  label("lbl_binary", 240, 175, "(0)  (1)  (2)  (3)  (4)  reset"),
  wire("ic_box", [140, 210], [340, 210], [340, 270], [140, 270], [140, 210]),
  label("lbl_ic", 240, 244, "74LS76 x2 + 74LS00"),
]};

/** Step 2: power-and-toggle — J=K=1 and clock input */
export const step02_powerAndToggle: SchematicData = { width: CW, height: CH, elements: [
  label("lbl_title", 240, 20, "MOD-5 — Toggle Mode & Clock Setup"),
  ...counter({ ties: true, hlTies: true, hlClk: true }),
  label("lbl_jk_note", 240, 260, "All J=K=1 (toggle mode), PRE' tied to Vcc (inactive)"),
  label("lbl_clk_note", 240, 282, "CLK from the toggle switch / pulser into FF-A"),
]};

/** Step 3: up-clock-chain — Up counter clock connections */
export const step03_upClockChain: SchematicData = { width: CW, height: CH, elements: [
  label("lbl_title", 240, 20, "MOD-5 Up Counter — Clock Chain"),
  ...counter({ ties: true, chain: true, hlChain: true }),
  label("lbl_chain", 240, 260, "Up: QA→CLK_B, QB→CLK_C"),
  label("lbl_ripple", 240, 282, "(Ripple counter / asynchronous)"),
]};

/** Step 4: up-indicators — LED indicators for outputs */
export const step04_upIndicators: SchematicData = { width: CW, height: CH, elements: [
  label("lbl_title", 240, 20, "MOD-5 Up Counter — Output LEDs"),
  ...counter({ ties: true, chain: true, leds: true, hlLeds: true }),
  label("lbl_lsb", 240, 270, "QA = LSB, QC = MSB"),
]};

/** Step 5: up-reset — Reset logic with NAND gate */
export const step05_upReset: SchematicData = { width: CW, height: CH, elements: [
  label("lbl_title", 240, 20, "MOD-5 Up Counter — Reset Logic"),
  ...counter({ ties: true, chain: true, leds: true, reset: true, hlReset: true }),
  label("lbl_reset_eq", 240, 318, "Reset when QA·QC=1 (state 101=5): (QA·QC)' → CLR'"),
]};

/** Step 6: test-up — Testing up counter sequence */
export const step06_testUp: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 240, 20, "MOD-5 Up Counter — Test Sequence"),
  label("lbl_header", 240, 55, "QC QB QA | Decimal"),
  label("lbl_s0", 240, 80, " 0  0  0  |    0"),
  label("lbl_s1", 240, 100, " 0  0  1  |    1"),
  label("lbl_s2", 240, 120, " 0  1  0  |    2"),
  label("lbl_s3", 240, 140, " 0  1  1  |    3"),
  label("lbl_s4", 240, 160, " 1  0  0  |    4"),
  label("lbl_s5", 240, 180, " 1  0  1  |  5→RESET"),
  label("lbl_display", 240, 220, "LEDs after 1 clock: QC=0 QB=0 QA=1 (count 1)"),
  label("lbl_note", 240, 260, "Apply clock pulses and observe LEDs"),
]};

/** Step 7: convert-down — Convert to down counter */
export const step07_convertDown: SchematicData = { width: CW, height: CH, elements: [
  label("lbl_title", 240, 20, "MOD-5 Down Counter — Conversion"),
  ...counter({ mode: "down", ties: true, chain: true, hlChain: true }),
  label("lbl_down_note1", 240, 200, "Down Counter: Use Q' outputs"),
  label("lbl_down_note2", 240, 222, "QA'→CLK_B, QB'→CLK_C"),
  label("lbl_down_note3", 240, 256, "Reset on 111 (all Q high)"),
  label("lbl_down_note4", 240, 278, "Counts: 4→3→2→1→0→4..."),
]};

/** Step 8: test-down — Testing down counter */
export const step08_testDown: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 240, 20, "MOD-5 Down Counter — Test Sequence"),
  label("lbl_header", 240, 55, "QC QB QA | Decimal"),
  label("lbl_s4", 240, 80, " 1  0  0  |    4"),
  label("lbl_s3", 240, 100, " 0  1  1  |    3"),
  label("lbl_s2", 240, 120, " 0  1  0  |    2"),
  label("lbl_s1", 240, 140, " 0  0  1  |    1"),
  label("lbl_s0", 240, 160, " 0  0  0  |    0"),
  label("lbl_s7", 240, 180, " 1  1  1  |  7→RESET"),
  label("lbl_display", 240, 220, "LEDs at start: QC=1 QB=0 QA=0 (count 4)"),
  label("lbl_note", 240, 260, "Down counter decrements on each clock"),
]};

/** Step 9: timing-diagram — falling-edge ripple count 0→4, reset at 5 */
export const step09_timingDiagram: SchematicData = { width: W, height: H, gallery: true, elements: [
  label("lbl_title", 240, 20, "MOD-5 Counter — Timing Diagram"),
  label("lbl_clk", 30, 64, "CLK"),
  wire("w_clk", [60, 70], [80, 70], [80, 50], [100, 50], [100, 70], [120, 70], [120, 50], [140, 50], [140, 70],
    [160, 70], [160, 50], [180, 50], [180, 70], [200, 70], [200, 50], [220, 50], [220, 70], [240, 70], [240, 50],
    [260, 50], [260, 70], [280, 70], [280, 50], [300, 50], [300, 70], [320, 70], [320, 50], [340, 50], [340, 70],
    [360, 70], [360, 50], [380, 50], [380, 70], [400, 70]),
  label("lbl_qa", 30, 114, "QA"),
  wire("w_qa", [60, 120], [100, 120], [100, 100], [140, 100], [140, 120], [180, 120], [180, 100], [220, 100],
    [220, 120], [260, 120], [260, 100], [264, 100], [264, 120], [300, 120], [300, 100], [340, 100], [340, 120],
    [380, 120], [380, 100], [400, 100]),
  label("lbl_qb", 30, 164, "QB"),
  wire("w_qb", [60, 170], [140, 170], [140, 150], [220, 150], [220, 170], [340, 170], [340, 150], [400, 150]),
  label("lbl_qc", 30, 214, "QC"),
  wire("w_qc", [60, 220], [220, 220], [220, 200], [260, 200], [260, 220], [400, 220]),
  label("lbl_state0", 80, 250, "0"),
  label("lbl_state1", 120, 250, "1"),
  label("lbl_state2", 160, 250, "2"),
  label("lbl_state3", 200, 250, "3"),
  label("lbl_state4", 240, 250, "4"),
  label("lbl_state0b", 280, 250, "0"),
  label("lbl_state1b", 320, 250, "1"),
  label("lbl_state2b", 360, 250, "2"),
  label("lbl_states_row", 240, 280, "Falling edges: 0→1→2→3→4→(5 resets)→0"),
]};

/** Indexed array */
export const mod5CounterStepSchematics: SchematicData[] = [
  step01_checkIcs,
  step02_powerAndToggle,
  step03_upClockChain,
  step04_upIndicators,
  step05_upReset,
  step06_testUp,
  step07_convertDown,
  step08_testDown,
  step09_timingDiagram,
];

/** Theory diagram — complete up counter */
export const mod5CounterTheoryDiagram: SchematicData = { width: CW, height: CH, elements: [
  label("lbl_title", 240, 20, "MOD-5 Up Counter — Complete"),
  ...counter({ ties: true, chain: true, leds: true, reset: true }),
  label("lbl_formula", 240, 318, "Reset: (QA·QC)' → CLR' when count=5"),
]};
