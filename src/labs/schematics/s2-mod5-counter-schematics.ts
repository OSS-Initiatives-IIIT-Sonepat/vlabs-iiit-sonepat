import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * MOD-5 Counter — progressive 2D schematics.
 * Up counter: QA→clkB, QB→clkC, reset on 101 (QA·QC)
 * Down counter: QA'→clkB, QB'→clkC, reset on 111
 * Uses 3 JK flip-flops with NAND gate reset logic.
 */

const W = 480;
const H = 300;

/** Step 1: check-ics — Introduction and IC overview */
export const step01_checkIcs: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 240, y: 20, text: "MOD-5 Counter" },
  { type: "label", id: "lbl_desc1", x: 240, y: 60, text: "Counts 0-4 (5 states) using 3 JK flip-flops" },
  { type: "label", id: "lbl_desc2", x: 240, y: 85, text: "IC: 74LS76 (Dual JK Flip-Flop)" },
  { type: "label", id: "lbl_desc3", x: 240, y: 110, text: "Reset Logic: NAND gate (74LS00)" },
  { type: "label", id: "lbl_states", x: 240, y: 150, text: "States: 000→001→010→011→100→000" },
  { type: "label", id: "lbl_binary", x: 240, y: 175, text: "(0)  (1)  (2)  (3)  (4)  reset" },
  // IC box representation
  { type: "wire", id: "ic_box", points: [{ x: 140, y: 210 }, { x: 340, y: 210 }, { x: 340, y: 270 }, { x: 140, y: 270 }, { x: 140, y: 210 }] },
  { type: "label", id: "lbl_ic", x: 240, y: 240, text: "74LS76 x2 + 74LS00" },
]};

/** Step 2: power-and-toggle — Power connections and clock input */
export const step02_powerAndToggle: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 240, y: 20, text: "MOD-5 — Power & Clock Setup" },
  // Vcc rail
  { type: "wire", id: "w_vcc", points: [{ x: 40, y: 50 }, { x: 440, y: 50 }] },
  { type: "label", id: "lbl_vcc", x: 20, y: 50, text: "+5V" },
  // GND rail
  { type: "wire", id: "w_gnd", points: [{ x: 40, y: 280 }, { x: 440, y: 280 }] },
  { type: "label", id: "lbl_gnd", x: 20, y: 280, text: "GND" },
  // Clock input
  { type: "label", id: "lbl_clk", x: 40, y: 165, text: "CLK" },
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 165 }, { x: 100, y: 165 }], highlight: true },
  // Toggle switch representation
  { type: "wire", id: "toggle_box", points: [{ x: 60, y: 145 }, { x: 100, y: 145 }, { x: 100, y: 185 }, { x: 60, y: 185 }, { x: 60, y: 145 }] },
  { type: "label", id: "lbl_toggle", x: 80, y: 135, text: "Toggle" },
  // JK connections note
  { type: "label", id: "lbl_jk_note", x: 240, y: 110, text: "All J=K=1 (toggle mode)" },
  { type: "label", id: "lbl_preset", x: 240, y: 130, text: "PRE' tied to Vcc (inactive)" },
]};

/** Step 3: up-clock-chain — Up counter clock connections */
export const step03_upClockChain: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 240, y: 20, text: "MOD-5 Up Counter — Clock Chain" },
  // FF-A
  { type: "wire", id: "ffa_box", points: [{ x: 100, y: 100 }, { x: 160, y: 100 }, { x: 160, y: 180 }, { x: 100, y: 180 }, { x: 100, y: 100 }] },
  { type: "label", id: "lbl_ffa", x: 130, y: 120, text: "FF-A" },
  { type: "label", id: "lbl_ffa_j", x: 90, y: 130, text: "J" },
  { type: "label", id: "lbl_ffa_k", x: 90, y: 160, text: "K" },
  { type: "label", id: "lbl_ffa_clk", x: 90, y: 145, text: ">" },
  { type: "label", id: "lbl_ffa_q", x: 165, y: 130, text: "QA" },
  // FF-B
  { type: "wire", id: "ffb_box", points: [{ x: 220, y: 100 }, { x: 280, y: 100 }, { x: 280, y: 180 }, { x: 220, y: 180 }, { x: 220, y: 100 }] },
  { type: "label", id: "lbl_ffb", x: 250, y: 120, text: "FF-B" },
  { type: "label", id: "lbl_ffb_j", x: 210, y: 130, text: "J" },
  { type: "label", id: "lbl_ffb_k", x: 210, y: 160, text: "K" },
  { type: "label", id: "lbl_ffb_clk", x: 210, y: 145, text: ">" },
  { type: "label", id: "lbl_ffb_q", x: 285, y: 130, text: "QB" },
  // FF-C
  { type: "wire", id: "ffc_box", points: [{ x: 340, y: 100 }, { x: 400, y: 100 }, { x: 400, y: 180 }, { x: 340, y: 180 }, { x: 340, y: 100 }] },
  { type: "label", id: "lbl_ffc", x: 370, y: 120, text: "FF-C" },
  { type: "label", id: "lbl_ffc_j", x: 330, y: 130, text: "J" },
  { type: "label", id: "lbl_ffc_k", x: 330, y: 160, text: "K" },
  { type: "label", id: "lbl_ffc_clk", x: 330, y: 145, text: ">" },
  { type: "label", id: "lbl_ffc_q", x: 405, y: 130, text: "QC" },
  // Clock input
  { type: "wire", id: "w_clk_in", points: [{ x: 40, y: 145 }, { x: 100, y: 145 }] },
  { type: "label", id: "lbl_clk", x: 30, y: 145, text: "CLK" },
  // QA → CLK_B (up counter)
  { type: "wire", id: "w_qa_clkb", points: [{ x: 160, y: 130 }, { x: 190, y: 130 }, { x: 190, y: 145 }, { x: 220, y: 145 }], highlight: true },
  // QB → CLK_C (up counter)
  { type: "wire", id: "w_qb_clkc", points: [{ x: 280, y: 130 }, { x: 310, y: 130 }, { x: 310, y: 145 }, { x: 340, y: 145 }], highlight: true },
  { type: "label", id: "lbl_chain", x: 240, y: 220, text: "Up: QA→CLK_B, QB→CLK_C" },
  { type: "label", id: "lbl_ripple", x: 240, y: 245, text: "(Ripple counter / asynchronous)" },
]};

/** Step 4: up-indicators — LED indicators for outputs */
export const step04_upIndicators: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 240, y: 20, text: "MOD-5 Up Counter — Output LEDs" },
  // FF-A
  { type: "wire", id: "ffa_box", points: [{ x: 100, y: 80 }, { x: 160, y: 80 }, { x: 160, y: 160 }, { x: 100, y: 160 }, { x: 100, y: 80 }] },
  { type: "label", id: "lbl_ffa", x: 130, y: 100, text: "FF-A" },
  { type: "label", id: "lbl_ffa_q", x: 165, y: 110, text: "QA" },
  // FF-B
  { type: "wire", id: "ffb_box", points: [{ x: 220, y: 80 }, { x: 280, y: 80 }, { x: 280, y: 160 }, { x: 220, y: 160 }, { x: 220, y: 80 }] },
  { type: "label", id: "lbl_ffb", x: 250, y: 100, text: "FF-B" },
  { type: "label", id: "lbl_ffb_q", x: 285, y: 110, text: "QB" },
  // FF-C
  { type: "wire", id: "ffc_box", points: [{ x: 340, y: 80 }, { x: 400, y: 80 }, { x: 400, y: 160 }, { x: 340, y: 160 }, { x: 340, y: 80 }] },
  { type: "label", id: "lbl_ffc", x: 370, y: 100, text: "FF-C" },
  { type: "label", id: "lbl_ffc_q", x: 405, y: 110, text: "QC" },
  // LEDs with wires
  { type: "wire", id: "w_qa_led", points: [{ x: 160, y: 110 }, { x: 180, y: 110 }, { x: 180, y: 200 }] },
  { type: "led", id: "led_qa", x: 180, y: 220, label: "QA", color: "green", highlight: true },
  { type: "wire", id: "w_qb_led", points: [{ x: 280, y: 110 }, { x: 300, y: 110 }, { x: 300, y: 200 }] },
  { type: "led", id: "led_qb", x: 300, y: 220, label: "QB", color: "green", highlight: true },
  { type: "wire", id: "w_qc_led", points: [{ x: 400, y: 110 }, { x: 420, y: 110 }, { x: 420, y: 200 }] },
  { type: "led", id: "led_qc", x: 420, y: 220, label: "QC", color: "green", highlight: true },
  { type: "label", id: "lbl_msb", x: 420, y: 260, text: "MSB" },
  { type: "label", id: "lbl_lsb", x: 180, y: 260, text: "LSB" },
  // Clock chain
  { type: "wire", id: "w_clk_in", points: [{ x: 40, y: 125 }, { x: 100, y: 125 }] },
  { type: "wire", id: "w_qa_clkb", points: [{ x: 180, y: 110 }, { x: 195, y: 110 }, { x: 195, y: 125 }, { x: 220, y: 125 }] },
  { type: "wire", id: "w_qb_clkc", points: [{ x: 300, y: 110 }, { x: 315, y: 110 }, { x: 315, y: 125 }, { x: 340, y: 125 }] },
  { type: "junction", id: "j_qa", x: 180, y: 110 },
  { type: "junction", id: "j_qb", x: 300, y: 110 },
]};

/** Step 5: up-reset — Reset logic with NAND gate */
export const step05_upReset: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 240, y: 20, text: "MOD-5 Up Counter — Reset Logic" },
  // FF boxes (compact)
  { type: "wire", id: "ffa_box", points: [{ x: 80, y: 70 }, { x: 130, y: 70 }, { x: 130, y: 130 }, { x: 80, y: 130 }, { x: 80, y: 70 }] },
  { type: "label", id: "lbl_ffa", x: 105, y: 90, text: "FF-A" },
  { type: "wire", id: "ffb_box", points: [{ x: 180, y: 70 }, { x: 230, y: 70 }, { x: 230, y: 130 }, { x: 180, y: 130 }, { x: 180, y: 70 }] },
  { type: "label", id: "lbl_ffb", x: 205, y: 90, text: "FF-B" },
  { type: "wire", id: "ffc_box", points: [{ x: 280, y: 70 }, { x: 330, y: 70 }, { x: 330, y: 130 }, { x: 280, y: 130 }, { x: 280, y: 70 }] },
  { type: "label", id: "lbl_ffc", x: 305, y: 90, text: "FF-C" },
  // Outputs
  { type: "label", id: "lbl_qa", x: 135, y: 80, text: "QA" },
  { type: "label", id: "lbl_qb", x: 235, y: 80, text: "QB" },
  { type: "label", id: "lbl_qc", x: 335, y: 80, text: "QC" },
  // CLR' inputs
  { type: "label", id: "lbl_clr_a", x: 105, y: 140, text: "CLR'" },
  { type: "label", id: "lbl_clr_b", x: 205, y: 140, text: "CLR'" },
  { type: "label", id: "lbl_clr_c", x: 305, y: 140, text: "CLR'" },
  // NAND gate for reset (QA·QC = 101 detection)
  { type: "nand-gate", id: "NAND_RST", x: 380, y: 170, label: "Reset", highlight: true },
  // QA to NAND
  { type: "wire", id: "w_qa_nand", points: [{ x: 130, y: 80 }, { x: 150, y: 80 }, { x: 150, y: 162 }, { x: 354, y: 162 }], highlight: true },
  // QC to NAND
  { type: "wire", id: "w_qc_nand", points: [{ x: 330, y: 80 }, { x: 345, y: 80 }, { x: 345, y: 178 }, { x: 354, y: 178 }], highlight: true },
  // NAND output to all CLR'
  { type: "wire", id: "w_rst_out", points: [{ x: 412, y: 170 }, { x: 430, y: 170 }, { x: 430, y: 230 }, { x: 105, y: 230 }, { x: 105, y: 130 }] },
  { type: "wire", id: "w_rst_b", points: [{ x: 205, y: 230 }, { x: 205, y: 130 }] },
  { type: "wire", id: "w_rst_c", points: [{ x: 305, y: 230 }, { x: 305, y: 130 }] },
  { type: "junction", id: "j_rst_b", x: 205, y: 230 },
  { type: "junction", id: "j_rst_c", x: 305, y: 230 },
  // Explanation
  { type: "label", id: "lbl_reset_eq", x: 240, y: 270, text: "Reset when QA·QC=1 (state 101=5)" },
  { type: "label", id: "lbl_nand_out", x: 240, y: 290, text: "NAND output: (QA·QC)' → CLR'" },
]};

/** Step 6: test-up — Testing up counter sequence */
export const step06_testUp: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 240, y: 20, text: "MOD-5 Up Counter — Test Sequence" },
  // State sequence table
  { type: "label", id: "lbl_header", x: 240, y: 55, text: "QC QB QA | Decimal" },
  { type: "label", id: "lbl_s0", x: 240, y: 80, text: " 0  0  0  |    0" },
  { type: "label", id: "lbl_s1", x: 240, y: 100, text: " 0  0  1  |    1" },
  { type: "label", id: "lbl_s2", x: 240, y: 120, text: " 0  1  0  |    2" },
  { type: "label", id: "lbl_s3", x: 240, y: 140, text: " 0  1  1  |    3" },
  { type: "label", id: "lbl_s4", x: 240, y: 160, text: " 1  0  0  |    4" },
  { type: "label", id: "lbl_s5", x: 240, y: 180, text: " 1  0  1  |  5→RESET" },
  // Visual counter display
  { type: "led", id: "led_qc", x: 120, y: 240, label: "QC", color: "red" },
  { type: "led", id: "led_qb", x: 180, y: 240, label: "QB", color: "red" },
  { type: "led", id: "led_qa", x: 240, y: 240, label: "QA", color: "green", highlight: true },
  { type: "label", id: "lbl_count", x: 320, y: 240, text: "Count: 1" },
  { type: "label", id: "lbl_note", x: 240, y: 280, text: "Apply clock pulses and observe LEDs" },
]};

/** Step 7: convert-down — Convert to down counter */
export const step07_convertDown: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 240, y: 20, text: "MOD-5 Down Counter — Conversion" },
  // FF boxes
  { type: "wire", id: "ffa_box", points: [{ x: 80, y: 80 }, { x: 140, y: 80 }, { x: 140, y: 160 }, { x: 80, y: 160 }, { x: 80, y: 80 }] },
  { type: "label", id: "lbl_ffa", x: 110, y: 100, text: "FF-A" },
  { type: "label", id: "lbl_qa", x: 145, y: 100, text: "QA" },
  { type: "label", id: "lbl_qa_bar", x: 145, y: 140, text: "QA'" },
  { type: "wire", id: "ffb_box", points: [{ x: 220, y: 80 }, { x: 280, y: 80 }, { x: 280, y: 160 }, { x: 220, y: 160 }, { x: 220, y: 80 }] },
  { type: "label", id: "lbl_ffb", x: 250, y: 100, text: "FF-B" },
  { type: "label", id: "lbl_qb", x: 285, y: 100, text: "QB" },
  { type: "label", id: "lbl_qb_bar", x: 285, y: 140, text: "QB'" },
  { type: "wire", id: "ffc_box", points: [{ x: 360, y: 80 }, { x: 420, y: 80 }, { x: 420, y: 160 }, { x: 360, y: 160 }, { x: 360, y: 80 }] },
  { type: "label", id: "lbl_ffc", x: 390, y: 100, text: "FF-C" },
  { type: "label", id: "lbl_qc", x: 425, y: 100, text: "QC" },
  // Clock input
  { type: "wire", id: "w_clk_in", points: [{ x: 40, y: 120 }, { x: 80, y: 120 }] },
  { type: "label", id: "lbl_clk", x: 30, y: 120, text: "CLK" },
  // Down counter: QA' → CLK_B
  { type: "wire", id: "w_qa_bar_clkb", points: [{ x: 140, y: 140 }, { x: 180, y: 140 }, { x: 180, y: 120 }, { x: 220, y: 120 }], highlight: true },
  // Down counter: QB' → CLK_C
  { type: "wire", id: "w_qb_bar_clkc", points: [{ x: 280, y: 140 }, { x: 320, y: 140 }, { x: 320, y: 120 }, { x: 360, y: 120 }], highlight: true },
  // Explanation
  { type: "label", id: "lbl_down_note1", x: 240, y: 190, text: "Down Counter: Use Q' outputs" },
  { type: "label", id: "lbl_down_note2", x: 240, y: 215, text: "QA'→CLK_B, QB'→CLK_C" },
  { type: "label", id: "lbl_down_note3", x: 240, y: 250, text: "Reset on 111 (all Q high)" },
  { type: "label", id: "lbl_down_note4", x: 240, y: 275, text: "Counts: 4→3→2→1→0→4..." },
]};

/** Step 8: test-down — Testing down counter */
export const step08_testDown: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 240, y: 20, text: "MOD-5 Down Counter — Test Sequence" },
  // State sequence table (reverse)
  { type: "label", id: "lbl_header", x: 240, y: 55, text: "QC QB QA | Decimal" },
  { type: "label", id: "lbl_s4", x: 240, y: 80, text: " 1  0  0  |    4" },
  { type: "label", id: "lbl_s3", x: 240, y: 100, text: " 0  1  1  |    3" },
  { type: "label", id: "lbl_s2", x: 240, y: 120, text: " 0  1  0  |    2" },
  { type: "label", id: "lbl_s1", x: 240, y: 140, text: " 0  0  1  |    1" },
  { type: "label", id: "lbl_s0", x: 240, y: 160, text: " 0  0  0  |    0" },
  { type: "label", id: "lbl_s7", x: 240, y: 180, text: " 1  1  1  |  7→RESET" },
  // Visual
  { type: "led", id: "led_qc", x: 120, y: 240, label: "QC", color: "green", highlight: true },
  { type: "led", id: "led_qb", x: 180, y: 240, label: "QB", color: "red" },
  { type: "led", id: "led_qa", x: 240, y: 240, label: "QA", color: "red" },
  { type: "label", id: "lbl_count", x: 320, y: 240, text: "Count: 4" },
  { type: "label", id: "lbl_note", x: 240, y: 280, text: "Down counter decrements on each clock" },
]};

/** Step 9: timing-diagram — Timing analysis */
export const step09_timingDiagram: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 240, y: 20, text: "MOD-5 Counter — Timing Diagram" },
  // Clock waveform
  { type: "label", id: "lbl_clk", x: 30, y: 60, text: "CLK" },
  { type: "wire", id: "w_clk", points: [{ x: 60, y: 70 }, { x: 80, y: 70 }, { x: 80, y: 50 }, { x: 120, y: 50 }, { x: 120, y: 70 }, { x: 160, y: 70 }, { x: 160, y: 50 }, { x: 200, y: 50 }, { x: 200, y: 70 }, { x: 240, y: 70 }, { x: 240, y: 50 }, { x: 280, y: 50 }, { x: 280, y: 70 }, { x: 320, y: 70 }, { x: 320, y: 50 }, { x: 360, y: 50 }, { x: 360, y: 70 }, { x: 400, y: 70 }] },
  // QA waveform
  { type: "label", id: "lbl_qa", x: 30, y: 110, text: "QA" },
  { type: "wire", id: "w_qa", points: [{ x: 60, y: 120 }, { x: 120, y: 120 }, { x: 120, y: 100 }, { x: 160, y: 100 }, { x: 160, y: 120 }, { x: 200, y: 120 }, { x: 200, y: 100 }, { x: 240, y: 100 }, { x: 240, y: 120 }, { x: 280, y: 120 }, { x: 280, y: 100 }, { x: 320, y: 100 }, { x: 320, y: 120 }, { x: 400, y: 120 }] },
  // QB waveform
  { type: "label", id: "lbl_qb", x: 30, y: 160, text: "QB" },
  { type: "wire", id: "w_qb", points: [{ x: 60, y: 170 }, { x: 160, y: 170 }, { x: 160, y: 150 }, { x: 240, y: 150 }, { x: 240, y: 170 }, { x: 360, y: 170 }, { x: 360, y: 150 }, { x: 400, y: 150 }] },
  // QC waveform
  { type: "label", id: "lbl_qc", x: 30, y: 210, text: "QC" },
  { type: "wire", id: "w_qc", points: [{ x: 60, y: 220 }, { x: 240, y: 220 }, { x: 240, y: 200 }, { x: 320, y: 200 }, { x: 320, y: 220 }, { x: 400, y: 220 }] },
  // State labels
  { type: "label", id: "lbl_state0", x: 90, y: 250, text: "0" },
  { type: "label", id: "lbl_state1", x: 140, y: 250, text: "1" },
  { type: "label", id: "lbl_state2", x: 180, y: 250, text: "2" },
  { type: "label", id: "lbl_state3", x: 220, y: 250, text: "3" },
  { type: "label", id: "lbl_state4", x: 260, y: 250, text: "4" },
  { type: "label", id: "lbl_state5", x: 300, y: 250, text: "RST" },
  { type: "label", id: "lbl_state0b", x: 340, y: 250, text: "0" },
  { type: "label", id: "lbl_states_row", x: 240, y: 280, text: "States: 0→1→2→3→4→(reset)→0" },
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
export const mod5CounterTheoryDiagram: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 240, y: 15, text: "MOD-5 Up Counter — Complete" },
  // FF-A
  { type: "wire", id: "ffa_box", points: [{ x: 70, y: 60 }, { x: 130, y: 60 }, { x: 130, y: 130 }, { x: 70, y: 130 }, { x: 70, y: 60 }] },
  { type: "label", id: "lbl_ffa", x: 100, y: 75, text: "FF-A" },
  { type: "label", id: "lbl_ffa_jk", x: 100, y: 95, text: "J=K=1" },
  { type: "label", id: "lbl_qa", x: 135, y: 75, text: "QA" },
  // FF-B
  { type: "wire", id: "ffb_box", points: [{ x: 190, y: 60 }, { x: 250, y: 60 }, { x: 250, y: 130 }, { x: 190, y: 130 }, { x: 190, y: 60 }] },
  { type: "label", id: "lbl_ffb", x: 220, y: 75, text: "FF-B" },
  { type: "label", id: "lbl_ffb_jk", x: 220, y: 95, text: "J=K=1" },
  { type: "label", id: "lbl_qb", x: 255, y: 75, text: "QB" },
  // FF-C
  { type: "wire", id: "ffc_box", points: [{ x: 310, y: 60 }, { x: 370, y: 60 }, { x: 370, y: 130 }, { x: 310, y: 130 }, { x: 310, y: 60 }] },
  { type: "label", id: "lbl_ffc", x: 340, y: 75, text: "FF-C" },
  { type: "label", id: "lbl_ffc_jk", x: 340, y: 95, text: "J=K=1" },
  { type: "label", id: "lbl_qc", x: 375, y: 75, text: "QC" },
  // Clock chain
  { type: "wire", id: "w_clk", points: [{ x: 30, y: 110 }, { x: 70, y: 110 }] },
  { type: "label", id: "lbl_clk", x: 20, y: 110, text: "CLK" },
  { type: "wire", id: "w_qa_clkb", points: [{ x: 130, y: 75 }, { x: 160, y: 75 }, { x: 160, y: 110 }, { x: 190, y: 110 }] },
  { type: "wire", id: "w_qb_clkc", points: [{ x: 250, y: 75 }, { x: 280, y: 75 }, { x: 280, y: 110 }, { x: 310, y: 110 }] },
  // NAND reset
  { type: "nand-gate", id: "NAND", x: 400, y: 170 },
  { type: "wire", id: "w_qa_nand", points: [{ x: 160, y: 75 }, { x: 160, y: 162 }, { x: 374, y: 162 }] },
  { type: "wire", id: "w_qc_nand", points: [{ x: 375, y: 75 }, { x: 390, y: 75 }, { x: 390, y: 178 }, { x: 374, y: 178 }] },
  { type: "junction", id: "j_qa", x: 160, y: 75 },
  // Reset line
  { type: "wire", id: "w_rst", points: [{ x: 432, y: 170 }, { x: 450, y: 170 }, { x: 450, y: 240 }, { x: 100, y: 240 }, { x: 100, y: 130 }] },
  { type: "wire", id: "w_rst_b", points: [{ x: 220, y: 240 }, { x: 220, y: 130 }] },
  { type: "wire", id: "w_rst_c", points: [{ x: 340, y: 240 }, { x: 340, y: 130 }] },
  { type: "junction", id: "j_rst_b", x: 220, y: 240 },
  { type: "junction", id: "j_rst_c", x: 340, y: 240 },
  // LEDs
  { type: "led", id: "led_qa", x: 145, y: 170, label: "QA", color: "green" },
  { type: "led", id: "led_qb", x: 265, y: 170, label: "QB", color: "green" },
  { type: "led", id: "led_qc", x: 385, y: 75, label: "QC", color: "green" },
  // Labels
  { type: "label", id: "lbl_clr", x: 100, y: 140, text: "CLR'" },
  { type: "label", id: "lbl_clr_b", x: 220, y: 140, text: "CLR'" },
  { type: "label", id: "lbl_clr_c", x: 340, y: 140, text: "CLR'" },
  { type: "label", id: "lbl_formula", x: 240, y: 280, text: "Reset: (QA·QC)' → CLR' when count=5" },
]};
