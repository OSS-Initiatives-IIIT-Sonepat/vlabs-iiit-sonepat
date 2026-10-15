import { type SchematicData } from "@/labs/CircuitSchematic";

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
 */

const W = 420;
const H = 300;

/** Step 1: Place breadboard - Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 210, y: 20, text: "JK & T Flip-Flop (74HC76)" },
  { type: "label", id: "lbl_desc1", x: 210, y: 55, text: "JK: Most versatile flip-flop" },
  { type: "label", id: "lbl_desc2", x: 210, y: 80, text: "T: Toggle flip-flop (J=K=T)" },
  // JK Truth table
  { type: "label", id: "lbl_tt", x: 120, y: 115, text: "JK Truth Table:" },
  { type: "label", id: "lbl_t1", x: 120, y: 140, text: "J K | Qnext" },
  { type: "label", id: "lbl_t2", x: 120, y: 160, text: "0 0 | Q (hold)" },
  { type: "label", id: "lbl_t3", x: 120, y: 180, text: "1 0 | 1 (set)" },
  { type: "label", id: "lbl_t4", x: 120, y: 200, text: "0 1 | 0 (reset)" },
  { type: "label", id: "lbl_t5", x: 120, y: 220, text: "1 1 | Q' (toggle)" },
  // T mode
  { type: "label", id: "lbl_tm", x: 310, y: 115, text: "T Mode (J=K=T):" },
  { type: "label", id: "lbl_tm1", x: 310, y: 145, text: "T=0: Q unchanged" },
  { type: "label", id: "lbl_tm2", x: 310, y: 170, text: "T=1: Q toggles" },
  { type: "label", id: "lbl_note", x: 210, y: 260, text: "74HC76: Negative edge triggered" },
]};

/** Step 2: Place 74HC76 - Show JK flip-flop symbol */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 210, y: 20, text: "74HC76 JK Flip-Flop Symbol" },
  // Flip-flop box representation
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 70 }, { x: 280, y: 70 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 190 }, { x: 280, y: 190 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 70 }, { x: 140, y: 190 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 280, y: 70 }, { x: 280, y: 190 }] },
  { type: "label", id: "lbl_ff", x: 210, y: 130, text: "JK-FF" },
  // Pin labels inside box
  { type: "label", id: "lbl_j_in", x: 155, y: 95, text: "J" },
  { type: "label", id: "lbl_clk_in", x: 155, y: 130, text: "CLK" },
  { type: "label", id: "lbl_k_in", x: 155, y: 165, text: "K" },
  { type: "label", id: "lbl_q_out", x: 260, y: 110, text: "Q" },
  { type: "label", id: "lbl_qn_out", x: 260, y: 150, text: "Q'" },
  // Clock edge symbol (negative edge - circle + triangle)
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 125 }, { x: 150, y: 130 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 135 }, { x: 150, y: 130 }] },
  // Asynchronous inputs (top)
  { type: "label", id: "lbl_set", x: 175, y: 55, text: "SET" },
  { type: "label", id: "lbl_clr", x: 240, y: 55, text: "CLR" },
  { type: "wire", id: "w_set", points: [{ x: 180, y: 50 }, { x: 180, y: 70 }], highlight: true },
  { type: "wire", id: "w_clr", points: [{ x: 240, y: 50 }, { x: 240, y: 70 }], highlight: true },
  // Note
  { type: "label", id: "lbl_note", x: 210, y: 230, text: "SET, CLR: Active-low async controls" },
  { type: "label", id: "lbl_note2", x: 210, y: 255, text: "74HC76 has 2 JK flip-flops" },
]};

/** Step 3: Tie SET and CLR high */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 210, y: 20, text: "Tie SET and CLR High" },
  // VCC rail
  { type: "wire", id: "w_vcc", points: [{ x: 100, y: 40 }, { x: 320, y: 40 }], highlight: true },
  { type: "label", id: "lbl_vcc", x: 340, y: 40, text: "+5V" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 70 }, { x: 280, y: 70 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 190 }, { x: 280, y: 190 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 70 }, { x: 140, y: 190 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 280, y: 70 }, { x: 280, y: 190 }] },
  { type: "label", id: "lbl_ff", x: 210, y: 130, text: "JK-FF" },
  // SET and CLR tied to VCC
  { type: "wire", id: "w_set_vcc", points: [{ x: 180, y: 40 }, { x: 180, y: 70 }], highlight: true },
  { type: "wire", id: "w_clr_vcc", points: [{ x: 240, y: 40 }, { x: 240, y: 70 }], highlight: true },
  { type: "junction", id: "j_set", x: 180, y: 40 },
  { type: "junction", id: "j_clr", x: 240, y: 40 },
  // Labels
  { type: "label", id: "lbl_set", x: 165, y: 58, text: "SET" },
  { type: "label", id: "lbl_clr", x: 245, y: 58, text: "CLR" },
  { type: "label", id: "lbl_j", x: 155, y: 95, text: "J" },
  { type: "label", id: "lbl_clk", x: 155, y: 130, text: "CLK" },
  { type: "label", id: "lbl_k", x: 155, y: 165, text: "K" },
  { type: "label", id: "lbl_q", x: 260, y: 110, text: "Q" },
  { type: "label", id: "lbl_qn", x: 260, y: 150, text: "Q'" },
  // Explanation
  { type: "label", id: "lbl_note1", x: 210, y: 220, text: "SET=1, CLR=1: Normal operation" },
  { type: "label", id: "lbl_note2", x: 210, y: 245, text: "Output controlled by J, K, CLK" },
]};

/** Step 4: Wire J, K, CLK inputs */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 210, y: 20, text: "Wire J, K, CLK Inputs" },
  // VCC rail
  { type: "wire", id: "w_vcc", points: [{ x: 100, y: 40 }, { x: 320, y: 40 }] },
  { type: "label", id: "lbl_vcc", x: 340, y: 40, text: "+5V" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 70 }, { x: 280, y: 70 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 190 }, { x: 280, y: 190 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 70 }, { x: 140, y: 190 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 280, y: 70 }, { x: 280, y: 190 }] },
  { type: "label", id: "lbl_ff", x: 210, y: 130, text: "JK-FF" },
  // SET and CLR tied to VCC
  { type: "wire", id: "w_set_vcc", points: [{ x: 180, y: 40 }, { x: 180, y: 70 }] },
  { type: "wire", id: "w_clr_vcc", points: [{ x: 240, y: 40 }, { x: 240, y: 70 }] },
  { type: "junction", id: "j_set", x: 180, y: 40 },
  { type: "junction", id: "j_clr", x: 240, y: 40 },
  // Input wires
  { type: "wire", id: "w_j_in", points: [{ x: 60, y: 95 }, { x: 140, y: 95 }], highlight: true },
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 130 }, { x: 140, y: 130 }], highlight: true },
  { type: "wire", id: "w_k_in", points: [{ x: 60, y: 165 }, { x: 140, y: 165 }], highlight: true },
  { type: "label", id: "lbl_j_sw", x: 45, y: 95, text: "J" },
  { type: "label", id: "lbl_clk_sw", x: 30, y: 130, text: "CLK" },
  { type: "label", id: "lbl_k_sw", x: 45, y: 165, text: "K" },
  // Clock edge symbol
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 125 }, { x: 150, y: 130 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 135 }, { x: 150, y: 130 }] },
  // Pin labels
  { type: "label", id: "lbl_j", x: 155, y: 95, text: "J" },
  { type: "label", id: "lbl_clk", x: 155, y: 130, text: "CLK" },
  { type: "label", id: "lbl_k", x: 155, y: 165, text: "K" },
  { type: "label", id: "lbl_q", x: 260, y: 110, text: "Q" },
  { type: "label", id: "lbl_qn", x: 260, y: 150, text: "Q'" },
  // Note
  { type: "label", id: "lbl_note", x: 210, y: 230, text: "Connect J, K to switches" },
  { type: "label", id: "lbl_note2", x: 210, y: 255, text: "CLK to pushbutton" },
]};

/** Step 5: Add output LEDs - Complete JK circuit */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 210, y: 20, text: "JK Flip-Flop — Complete Circuit" },
  // VCC rail
  { type: "wire", id: "w_vcc", points: [{ x: 100, y: 40 }, { x: 320, y: 40 }] },
  { type: "label", id: "lbl_vcc", x: 340, y: 40, text: "+5V" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 70 }, { x: 280, y: 70 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 190 }, { x: 280, y: 190 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 70 }, { x: 140, y: 190 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 280, y: 70 }, { x: 280, y: 190 }] },
  { type: "label", id: "lbl_ff", x: 210, y: 130, text: "JK-FF" },
  // SET and CLR tied to VCC
  { type: "wire", id: "w_set_vcc", points: [{ x: 180, y: 40 }, { x: 180, y: 70 }] },
  { type: "wire", id: "w_clr_vcc", points: [{ x: 240, y: 40 }, { x: 240, y: 70 }] },
  { type: "junction", id: "j_set", x: 180, y: 40 },
  { type: "junction", id: "j_clr", x: 240, y: 40 },
  // Inputs
  { type: "wire", id: "w_j_in", points: [{ x: 60, y: 95 }, { x: 140, y: 95 }] },
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 130 }, { x: 140, y: 130 }] },
  { type: "wire", id: "w_k_in", points: [{ x: 60, y: 165 }, { x: 140, y: 165 }] },
  { type: "label", id: "lbl_j_sw", x: 45, y: 95, text: "J" },
  { type: "label", id: "lbl_clk_sw", x: 30, y: 130, text: "CLK" },
  { type: "label", id: "lbl_k_sw", x: 45, y: 165, text: "K" },
  // Clock edge symbol
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 125 }, { x: 150, y: 130 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 135 }, { x: 150, y: 130 }] },
  // Pin labels
  { type: "label", id: "lbl_j", x: 155, y: 95, text: "J" },
  { type: "label", id: "lbl_clk", x: 155, y: 130, text: "CLK" },
  { type: "label", id: "lbl_k", x: 155, y: 165, text: "K" },
  { type: "label", id: "lbl_q", x: 260, y: 110, text: "Q" },
  { type: "label", id: "lbl_qn", x: 260, y: 150, text: "Q'" },
  // Output wires to LEDs
  { type: "wire", id: "w_q_out", points: [{ x: 280, y: 110 }, { x: 340, y: 110 }], highlight: true },
  { type: "wire", id: "w_qn_out", points: [{ x: 280, y: 150 }, { x: 340, y: 150 }], highlight: true },
  // LEDs
  { type: "led", id: "led_q", x: 360, y: 110, label: "Q", color: "green", highlight: true },
  { type: "led", id: "led_qn", x: 360, y: 150, label: "Q'", color: "yellow", highlight: true },
  // GND
  { type: "wire", id: "w_gnd", points: [{ x: 100, y: 230 }, { x: 320, y: 230 }] },
  { type: "ground", id: "GND", x: 100, y: 240 },
]};

/** Step 6: Test J=1, K=0 (Set) */
export const step06: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 210, y: 20, text: "Test: J=1, K=0 (Set Mode)" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 70 }, { x: 280, y: 70 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 170 }, { x: 280, y: 170 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 70 }, { x: 140, y: 170 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 280, y: 70 }, { x: 280, y: 170 }] },
  { type: "label", id: "lbl_ff", x: 210, y: 120, text: "JK-FF" },
  // Input states
  { type: "wire", id: "w_j_in", points: [{ x: 60, y: 90 }, { x: 140, y: 90 }], highlight: true },
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 120 }, { x: 140, y: 120 }], highlight: true },
  { type: "wire", id: "w_k_in", points: [{ x: 60, y: 150 }, { x: 140, y: 150 }] },
  { type: "label", id: "lbl_j_val", x: 40, y: 90, text: "J=1" },
  { type: "label", id: "lbl_clk_val", x: 30, y: 120, text: "CLK↓" },
  { type: "label", id: "lbl_k_val", x: 40, y: 150, text: "K=0" },
  // Clock edge symbol
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 115 }, { x: 150, y: 120 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 125 }, { x: 150, y: 120 }] },
  // Outputs
  { type: "wire", id: "w_q_out", points: [{ x: 280, y: 100 }, { x: 340, y: 100 }] },
  { type: "wire", id: "w_qn_out", points: [{ x: 280, y: 140 }, { x: 340, y: 140 }] },
  { type: "led", id: "led_q", x: 360, y: 100, label: "Q=1", color: "green", highlight: true },
  { type: "led", id: "led_qn", x: 360, y: 140, label: "Q'=0", color: "yellow" },
  // Explanation
  { type: "label", id: "lbl_exp1", x: 210, y: 200, text: "J=1, K=0: SET mode" },
  { type: "label", id: "lbl_exp2", x: 210, y: 225, text: "On clock edge: Q → 1" },
  { type: "label", id: "lbl_exp3", x: 210, y: 250, text: "Result: Q=1, Q'=0 ✓" },
]};

/** Step 7: Test J=0, K=1 (Reset) */
export const step07: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 210, y: 20, text: "Test: J=0, K=1 (Reset Mode)" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 70 }, { x: 280, y: 70 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 170 }, { x: 280, y: 170 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 70 }, { x: 140, y: 170 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 280, y: 70 }, { x: 280, y: 170 }] },
  { type: "label", id: "lbl_ff", x: 210, y: 120, text: "JK-FF" },
  // Input states
  { type: "wire", id: "w_j_in", points: [{ x: 60, y: 90 }, { x: 140, y: 90 }] },
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 120 }, { x: 140, y: 120 }], highlight: true },
  { type: "wire", id: "w_k_in", points: [{ x: 60, y: 150 }, { x: 140, y: 150 }], highlight: true },
  { type: "label", id: "lbl_j_val", x: 40, y: 90, text: "J=0" },
  { type: "label", id: "lbl_clk_val", x: 30, y: 120, text: "CLK↓" },
  { type: "label", id: "lbl_k_val", x: 40, y: 150, text: "K=1" },
  // Clock edge symbol
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 115 }, { x: 150, y: 120 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 125 }, { x: 150, y: 120 }] },
  // Outputs
  { type: "wire", id: "w_q_out", points: [{ x: 280, y: 100 }, { x: 340, y: 100 }] },
  { type: "wire", id: "w_qn_out", points: [{ x: 280, y: 140 }, { x: 340, y: 140 }] },
  { type: "led", id: "led_q", x: 360, y: 100, label: "Q=0", color: "green" },
  { type: "led", id: "led_qn", x: 360, y: 140, label: "Q'=1", color: "yellow", highlight: true },
  // Explanation
  { type: "label", id: "lbl_exp1", x: 210, y: 200, text: "J=0, K=1: RESET mode" },
  { type: "label", id: "lbl_exp2", x: 210, y: 225, text: "On clock edge: Q → 0" },
  { type: "label", id: "lbl_exp3", x: 210, y: 250, text: "Result: Q=0, Q'=1 ✓" },
]};

/** Step 8: Test J=1, K=1 (Toggle) */
export const step08: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 210, y: 20, text: "Test: J=1, K=1 (Toggle Mode)" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 70 }, { x: 280, y: 70 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 170 }, { x: 280, y: 170 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 70 }, { x: 140, y: 170 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 280, y: 70 }, { x: 280, y: 170 }] },
  { type: "label", id: "lbl_ff", x: 210, y: 120, text: "JK-FF" },
  // Input states
  { type: "wire", id: "w_j_in", points: [{ x: 60, y: 90 }, { x: 140, y: 90 }], highlight: true },
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 120 }, { x: 140, y: 120 }], highlight: true },
  { type: "wire", id: "w_k_in", points: [{ x: 60, y: 150 }, { x: 140, y: 150 }], highlight: true },
  { type: "label", id: "lbl_j_val", x: 40, y: 90, text: "J=1" },
  { type: "label", id: "lbl_clk_val", x: 30, y: 120, text: "CLK↓" },
  { type: "label", id: "lbl_k_val", x: 40, y: 150, text: "K=1" },
  // Clock edge symbol
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 115 }, { x: 150, y: 120 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 125 }, { x: 150, y: 120 }] },
  // Outputs - showing toggle
  { type: "wire", id: "w_q_out", points: [{ x: 280, y: 100 }, { x: 340, y: 100 }] },
  { type: "wire", id: "w_qn_out", points: [{ x: 280, y: 140 }, { x: 340, y: 140 }] },
  { type: "led", id: "led_q", x: 360, y: 100, label: "Q→Q'", color: "green", highlight: true },
  { type: "led", id: "led_qn", x: 360, y: 140, label: "Q'→Q", color: "yellow", highlight: true },
  // Explanation
  { type: "label", id: "lbl_exp1", x: 210, y: 200, text: "J=1, K=1: TOGGLE mode" },
  { type: "label", id: "lbl_exp2", x: 210, y: 225, text: "On each clock edge: Q inverts" },
  { type: "label", id: "lbl_exp3", x: 210, y: 250, text: "0→1→0→1... (frequency division)" },
]};

/** Step 9: Rewire for T flip-flop mode (J=K=T) */
export const step09: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 210, y: 20, text: "Rewire for T Flip-Flop Mode" },
  // VCC rail
  { type: "wire", id: "w_vcc", points: [{ x: 100, y: 40 }, { x: 320, y: 40 }] },
  { type: "label", id: "lbl_vcc", x: 340, y: 40, text: "+5V" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 70 }, { x: 280, y: 70 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 190 }, { x: 280, y: 190 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 70 }, { x: 140, y: 190 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 280, y: 70 }, { x: 280, y: 190 }] },
  { type: "label", id: "lbl_ff", x: 210, y: 130, text: "T-FF" },
  // SET and CLR tied to VCC
  { type: "wire", id: "w_set_vcc", points: [{ x: 180, y: 40 }, { x: 180, y: 70 }] },
  { type: "wire", id: "w_clr_vcc", points: [{ x: 240, y: 40 }, { x: 240, y: 70 }] },
  { type: "junction", id: "j_set", x: 180, y: 40 },
  { type: "junction", id: "j_clr", x: 240, y: 40 },
  // T input connected to both J and K
  { type: "wire", id: "w_t_in", points: [{ x: 40, y: 130 }, { x: 100, y: 130 }], highlight: true },
  { type: "wire", id: "w_t_to_j", points: [{ x: 100, y: 130 }, { x: 100, y: 95 }, { x: 140, y: 95 }], highlight: true },
  { type: "wire", id: "w_t_to_k", points: [{ x: 100, y: 130 }, { x: 100, y: 165 }, { x: 140, y: 165 }], highlight: true },
  { type: "junction", id: "j_t", x: 100, y: 130 },
  { type: "label", id: "lbl_t_sw", x: 25, y: 130, text: "T" },
  // CLK input
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 180 }, { x: 140, y: 130 }] },
  { type: "label", id: "lbl_clk_sw", x: 30, y: 180, text: "CLK" },
  // Clock edge symbol
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 125 }, { x: 150, y: 130 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 135 }, { x: 150, y: 130 }] },
  // Pin labels
  { type: "label", id: "lbl_j", x: 155, y: 95, text: "J" },
  { type: "label", id: "lbl_clk", x: 155, y: 130, text: "CLK" },
  { type: "label", id: "lbl_k", x: 155, y: 165, text: "K" },
  { type: "label", id: "lbl_q", x: 260, y: 110, text: "Q" },
  { type: "label", id: "lbl_qn", x: 260, y: 150, text: "Q'" },
  // Output LEDs
  { type: "wire", id: "w_q_out", points: [{ x: 280, y: 110 }, { x: 340, y: 110 }] },
  { type: "wire", id: "w_qn_out", points: [{ x: 280, y: 150 }, { x: 340, y: 150 }] },
  { type: "led", id: "led_q", x: 360, y: 110, label: "Q", color: "green" },
  { type: "led", id: "led_qn", x: 360, y: 150, label: "Q'", color: "yellow" },
  // Note
  { type: "label", id: "lbl_note", x: 210, y: 230, text: "T connected to both J and K" },
  { type: "label", id: "lbl_note2", x: 210, y: 255, text: "JK flip-flop becomes T flip-flop" },
]};

/** Step 10: T mode toggle test */
export const step10: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 210, y: 20, text: "T Flip-Flop — Toggle Test" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 60 }, { x: 280, y: 60 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 140 }, { x: 280, y: 140 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 60 }, { x: 140, y: 140 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 280, y: 60 }, { x: 280, y: 140 }] },
  { type: "label", id: "lbl_ff", x: 210, y: 100, text: "T-FF" },
  // T=1 input
  { type: "wire", id: "w_t_in", points: [{ x: 60, y: 80 }, { x: 140, y: 80 }], highlight: true },
  { type: "label", id: "lbl_t_val", x: 40, y: 80, text: "T=1" },
  // CLK input
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 120 }, { x: 140, y: 120 }], highlight: true },
  { type: "label", id: "lbl_clk_val", x: 30, y: 120, text: "CLK↓" },
  // Clock edge symbol
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 115 }, { x: 150, y: 120 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 125 }, { x: 150, y: 120 }] },
  // Outputs
  { type: "wire", id: "w_q_out", points: [{ x: 280, y: 85 }, { x: 340, y: 85 }] },
  { type: "wire", id: "w_qn_out", points: [{ x: 280, y: 115 }, { x: 340, y: 115 }] },
  { type: "led", id: "led_q", x: 360, y: 85, label: "Q", color: "green", highlight: true },
  { type: "led", id: "led_qn", x: 360, y: 115, label: "Q'", color: "yellow", highlight: true },
  // Timing diagram representation
  { type: "label", id: "lbl_timing", x: 210, y: 170, text: "T=1 Timing:" },
  // CLK pulses
  { type: "label", id: "lbl_clk_t", x: 60, y: 195, text: "CLK:" },
  { type: "wire", id: "w_clk1", points: [{ x: 100, y: 195 }, { x: 120, y: 195 }, { x: 120, y: 180 }, { x: 140, y: 180 }] },
  { type: "wire", id: "w_clk2", points: [{ x: 140, y: 180 }, { x: 140, y: 195 }, { x: 160, y: 195 }, { x: 160, y: 180 }, { x: 180, y: 180 }] },
  { type: "wire", id: "w_clk3", points: [{ x: 180, y: 180 }, { x: 180, y: 195 }, { x: 200, y: 195 }, { x: 200, y: 180 }, { x: 220, y: 180 }] },
  // Q output
  { type: "label", id: "lbl_q_t", x: 60, y: 235, text: "Q:" },
  { type: "wire", id: "w_q1", points: [{ x: 100, y: 235 }, { x: 140, y: 235 }] },
  { type: "wire", id: "w_q2", points: [{ x: 140, y: 235 }, { x: 140, y: 220 }, { x: 180, y: 220 }] },
  { type: "wire", id: "w_q3", points: [{ x: 180, y: 220 }, { x: 180, y: 235 }, { x: 220, y: 235 }] },
  // Note
  { type: "label", id: "lbl_note1", x: 320, y: 200, text: "T=1: Toggle" },
  { type: "label", id: "lbl_note2", x: 320, y: 225, text: "on each" },
  { type: "label", id: "lbl_note3", x: 320, y: 250, text: "CLK edge" },
  { type: "label", id: "lbl_app", x: 210, y: 280, text: "Application: Frequency divider (÷2)" },
]};

/** Indexed array */
export const jkTFlipFlopStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
  step06, step07, step08, step09, step10,
];

/** Theory diagram */
export const jkTFlipFlopTheoryDiagram: SchematicData = step05;
