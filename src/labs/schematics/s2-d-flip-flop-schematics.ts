import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * D Flip-Flop (74HC74) — progressive 2D schematics.
 * Edge-triggered storage element
 * D input captured on rising clock edge
 * Q output holds data, Q' is complement
 * PRE and CLR are active-low asynchronous controls
 */

const W = 400;
const H = 280;

/** Step 1: Place breadboard - Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "D Flip-Flop (74HC74)" },
  { type: "label", id: "lbl_desc1", x: 200, y: 60, text: "Edge-triggered data latch" },
  { type: "label", id: "lbl_desc2", x: 200, y: 90, text: "D = Data input" },
  { type: "label", id: "lbl_desc3", x: 200, y: 115, text: "CLK = Clock (rising edge trigger)" },
  { type: "label", id: "lbl_desc4", x: 200, y: 140, text: "Q = Output, Q' = Complement" },
  { type: "label", id: "lbl_truth", x: 200, y: 180, text: "Truth Table:" },
  { type: "label", id: "lbl_t1", x: 200, y: 205, text: "CLK↑ + D=0 → Q=0" },
  { type: "label", id: "lbl_t2", x: 200, y: 230, text: "CLK↑ + D=1 → Q=1" },
  { type: "label", id: "lbl_t3", x: 200, y: 255, text: "No CLK edge → Q unchanged" },
]};

/** Step 2: Place 74HC74 - Show flip-flop symbol */
export const step02: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "74HC74 D Flip-Flop Symbol" },
  // Flip-flop box representation
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 80 }, { x: 260, y: 80 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 180 }, { x: 260, y: 180 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 80 }, { x: 140, y: 180 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 260, y: 80 }, { x: 260, y: 180 }] },
  { type: "label", id: "lbl_ff", x: 200, y: 130, text: "D-FF" },
  // Pin labels inside box
  { type: "label", id: "lbl_d_in", x: 155, y: 110, text: "D" },
  { type: "label", id: "lbl_clk_in", x: 155, y: 150, text: "CLK" },
  { type: "label", id: "lbl_q_out", x: 245, y: 110, text: "Q" },
  { type: "label", id: "lbl_qn_out", x: 245, y: 150, text: "Q'" },
  // Clock edge symbol (triangle)
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 145 }, { x: 150, y: 150 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 155 }, { x: 150, y: 150 }] },
  // Asynchronous inputs (top)
  { type: "label", id: "lbl_pre", x: 170, y: 68, text: "PRE" },
  { type: "label", id: "lbl_clr", x: 225, y: 68, text: "CLR" },
  // Pin connections
  { type: "wire", id: "w_pre", points: [{ x: 175, y: 60 }, { x: 175, y: 80 }], highlight: true },
  { type: "wire", id: "w_clr", points: [{ x: 225, y: 60 }, { x: 225, y: 80 }], highlight: true },
  // Note
  { type: "label", id: "lbl_note", x: 200, y: 220, text: "PRE, CLR: Active-low async controls" },
  { type: "label", id: "lbl_note2", x: 200, y: 245, text: "74HC74 has 2 D flip-flops" },
]};

/** Step 3: Tie PRE and CLR high */
export const step03: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Tie PRE and CLR High" },
  // VCC rail
  { type: "wire", id: "w_vcc", points: [{ x: 100, y: 40 }, { x: 300, y: 40 }], highlight: true },
  { type: "label", id: "lbl_vcc", x: 320, y: 40, text: "+5V" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 80 }, { x: 260, y: 80 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 180 }, { x: 260, y: 180 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 80 }, { x: 140, y: 180 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 260, y: 80 }, { x: 260, y: 180 }] },
  { type: "label", id: "lbl_ff", x: 200, y: 130, text: "D-FF" },
  // PRE and CLR tied to VCC
  { type: "wire", id: "w_pre_vcc", points: [{ x: 175, y: 40 }, { x: 175, y: 80 }], highlight: true },
  { type: "wire", id: "w_clr_vcc", points: [{ x: 225, y: 40 }, { x: 225, y: 80 }], highlight: true },
  { type: "junction", id: "j_pre", x: 175, y: 40 },
  { type: "junction", id: "j_clr", x: 225, y: 40 },
  // Labels
  { type: "label", id: "lbl_pre", x: 160, y: 68, text: "PRE" },
  { type: "label", id: "lbl_clr", x: 230, y: 68, text: "CLR" },
  { type: "label", id: "lbl_d", x: 155, y: 110, text: "D" },
  { type: "label", id: "lbl_clk", x: 155, y: 150, text: "CLK" },
  { type: "label", id: "lbl_q", x: 245, y: 110, text: "Q" },
  { type: "label", id: "lbl_qn", x: 245, y: 150, text: "Q'" },
  // Explanation
  { type: "label", id: "lbl_note1", x: 200, y: 210, text: "PRE=1, CLR=1: Normal operation" },
  { type: "label", id: "lbl_note2", x: 200, y: 235, text: "Only clock edge affects output" },
]};

/** Step 4: Wire D and CLK inputs */
export const step04: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Wire D and CLK Inputs" },
  // VCC rail
  { type: "wire", id: "w_vcc", points: [{ x: 100, y: 40 }, { x: 300, y: 40 }] },
  { type: "label", id: "lbl_vcc", x: 320, y: 40, text: "+5V" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 80 }, { x: 260, y: 80 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 180 }, { x: 260, y: 180 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 80 }, { x: 140, y: 180 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 260, y: 80 }, { x: 260, y: 180 }] },
  { type: "label", id: "lbl_ff", x: 200, y: 130, text: "D-FF" },
  // PRE and CLR tied to VCC
  { type: "wire", id: "w_pre_vcc", points: [{ x: 175, y: 40 }, { x: 175, y: 80 }] },
  { type: "wire", id: "w_clr_vcc", points: [{ x: 225, y: 40 }, { x: 225, y: 80 }] },
  { type: "junction", id: "j_pre", x: 175, y: 40 },
  { type: "junction", id: "j_clr", x: 225, y: 40 },
  // D input wire
  { type: "wire", id: "w_d_in", points: [{ x: 60, y: 110 }, { x: 140, y: 110 }], highlight: true },
  { type: "label", id: "lbl_d_sw", x: 40, y: 110, text: "D" },
  // CLK input wire
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 150 }, { x: 140, y: 150 }], highlight: true },
  { type: "label", id: "lbl_clk_sw", x: 30, y: 150, text: "CLK" },
  // Clock edge symbol
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 145 }, { x: 150, y: 150 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 155 }, { x: 150, y: 150 }] },
  // Pin labels
  { type: "label", id: "lbl_d", x: 155, y: 110, text: "D" },
  { type: "label", id: "lbl_clk", x: 155, y: 150, text: "CLK" },
  { type: "label", id: "lbl_q", x: 245, y: 110, text: "Q" },
  { type: "label", id: "lbl_qn", x: 245, y: 150, text: "Q'" },
  // Note
  { type: "label", id: "lbl_note", x: 200, y: 220, text: "D: Connect to switch (data input)" },
  { type: "label", id: "lbl_note2", x: 200, y: 245, text: "CLK: Connect to pushbutton" },
]};

/** Step 5: Add output LEDs */
export const step05: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Add Output LEDs" },
  // VCC rail
  { type: "wire", id: "w_vcc", points: [{ x: 100, y: 40 }, { x: 300, y: 40 }] },
  { type: "label", id: "lbl_vcc", x: 320, y: 40, text: "+5V" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 80 }, { x: 260, y: 80 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 180 }, { x: 260, y: 180 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 80 }, { x: 140, y: 180 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 260, y: 80 }, { x: 260, y: 180 }] },
  { type: "label", id: "lbl_ff", x: 200, y: 130, text: "D-FF" },
  // PRE and CLR
  { type: "wire", id: "w_pre_vcc", points: [{ x: 175, y: 40 }, { x: 175, y: 80 }] },
  { type: "wire", id: "w_clr_vcc", points: [{ x: 225, y: 40 }, { x: 225, y: 80 }] },
  { type: "junction", id: "j_pre", x: 175, y: 40 },
  { type: "junction", id: "j_clr", x: 225, y: 40 },
  // Inputs
  { type: "wire", id: "w_d_in", points: [{ x: 60, y: 110 }, { x: 140, y: 110 }] },
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 150 }, { x: 140, y: 150 }] },
  { type: "label", id: "lbl_d_sw", x: 40, y: 110, text: "D" },
  { type: "label", id: "lbl_clk_sw", x: 30, y: 150, text: "CLK" },
  // Output wires to LEDs
  { type: "wire", id: "w_q_out", points: [{ x: 260, y: 110 }, { x: 320, y: 110 }], highlight: true },
  { type: "wire", id: "w_qn_out", points: [{ x: 260, y: 150 }, { x: 320, y: 150 }], highlight: true },
  // LEDs
  { type: "led", id: "led_q", x: 340, y: 110, label: "Q", color: "green", highlight: true },
  { type: "led", id: "led_qn", x: 340, y: 150, label: "Q'", color: "yellow", highlight: true },
  // Pin labels
  { type: "label", id: "lbl_d", x: 155, y: 110, text: "D" },
  { type: "label", id: "lbl_clk", x: 155, y: 150, text: "CLK" },
  { type: "label", id: "lbl_q", x: 245, y: 110, text: "Q" },
  { type: "label", id: "lbl_qn", x: 245, y: 150, text: "Q'" },
  // Note
  { type: "label", id: "lbl_note", x: 200, y: 220, text: "Q and Q' are always complementary" },
]};

/** Step 6: Connect output paths - Complete circuit */
export const step06: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "D Flip-Flop — Complete Circuit" },
  // VCC rail
  { type: "wire", id: "w_vcc", points: [{ x: 100, y: 40 }, { x: 300, y: 40 }] },
  { type: "label", id: "lbl_vcc", x: 320, y: 40, text: "+5V" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 80 }, { x: 260, y: 80 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 180 }, { x: 260, y: 180 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 80 }, { x: 140, y: 180 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 260, y: 80 }, { x: 260, y: 180 }] },
  { type: "label", id: "lbl_ff", x: 200, y: 130, text: "D-FF" },
  // PRE and CLR
  { type: "wire", id: "w_pre_vcc", points: [{ x: 175, y: 40 }, { x: 175, y: 80 }] },
  { type: "wire", id: "w_clr_vcc", points: [{ x: 225, y: 40 }, { x: 225, y: 80 }] },
  { type: "junction", id: "j_pre", x: 175, y: 40 },
  { type: "junction", id: "j_clr", x: 225, y: 40 },
  // Inputs
  { type: "wire", id: "w_d_in", points: [{ x: 60, y: 110 }, { x: 140, y: 110 }] },
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 150 }, { x: 140, y: 150 }] },
  { type: "label", id: "lbl_d_sw", x: 40, y: 110, text: "D" },
  { type: "label", id: "lbl_clk_sw", x: 30, y: 150, text: "CLK" },
  // Clock edge symbol
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 145 }, { x: 150, y: 150 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 155 }, { x: 150, y: 150 }] },
  // Outputs to LEDs
  { type: "wire", id: "w_q_out", points: [{ x: 260, y: 110 }, { x: 320, y: 110 }] },
  { type: "wire", id: "w_qn_out", points: [{ x: 260, y: 150 }, { x: 320, y: 150 }] },
  { type: "led", id: "led_q", x: 340, y: 110, label: "Q", color: "green" },
  { type: "led", id: "led_qn", x: 340, y: 150, label: "Q'", color: "yellow" },
  // Pin labels
  { type: "label", id: "lbl_d", x: 155, y: 110, text: "D" },
  { type: "label", id: "lbl_clk", x: 155, y: 150, text: "CLK" },
  { type: "label", id: "lbl_q", x: 245, y: 110, text: "Q" },
  { type: "label", id: "lbl_qn", x: 245, y: 150, text: "Q'" },
  // GND
  { type: "wire", id: "w_gnd", points: [{ x: 100, y: 220 }, { x: 300, y: 220 }] },
  { type: "ground", id: "GND", x: 100, y: 230 },
  { type: "label", id: "lbl_gnd", x: 320, y: 220, text: "GND" },
]};

/** Step 7: Test D=0 on rising edge */
export const step07: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Test: D=0 on Rising CLK Edge" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 80 }, { x: 260, y: 80 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 160 }, { x: 260, y: 160 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 80 }, { x: 140, y: 160 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 260, y: 80 }, { x: 260, y: 160 }] },
  { type: "label", id: "lbl_ff", x: 200, y: 120, text: "D-FF" },
  // Input states
  { type: "wire", id: "w_d_in", points: [{ x: 60, y: 100 }, { x: 140, y: 100 }] },
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 140 }, { x: 140, y: 140 }], highlight: true },
  { type: "label", id: "lbl_d_val", x: 40, y: 100, text: "D=0" },
  { type: "label", id: "lbl_clk_val", x: 30, y: 140, text: "CLK↑" },
  // Clock edge symbol
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 135 }, { x: 150, y: 140 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 145 }, { x: 150, y: 140 }] },
  // Outputs
  { type: "wire", id: "w_q_out", points: [{ x: 260, y: 100 }, { x: 320, y: 100 }] },
  { type: "wire", id: "w_qn_out", points: [{ x: 260, y: 140 }, { x: 320, y: 140 }] },
  { type: "led", id: "led_q", x: 340, y: 100, label: "Q=0", color: "green" },
  { type: "led", id: "led_qn", x: 340, y: 140, label: "Q'=1", color: "yellow", highlight: true },
  // Explanation
  { type: "label", id: "lbl_exp1", x: 200, y: 200, text: "On rising clock edge:" },
  { type: "label", id: "lbl_exp2", x: 200, y: 225, text: "D value (0) captured into Q" },
  { type: "label", id: "lbl_exp3", x: 200, y: 250, text: "Q=0, Q'=1 ✓" },
]};

/** Step 8: Test D=1 on rising edge */
export const step08: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Test: D=1 on Rising CLK Edge" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 80 }, { x: 260, y: 80 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 160 }, { x: 260, y: 160 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 80 }, { x: 140, y: 160 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 260, y: 80 }, { x: 260, y: 160 }] },
  { type: "label", id: "lbl_ff", x: 200, y: 120, text: "D-FF" },
  // Input states
  { type: "wire", id: "w_d_in", points: [{ x: 60, y: 100 }, { x: 140, y: 100 }], highlight: true },
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 140 }, { x: 140, y: 140 }], highlight: true },
  { type: "label", id: "lbl_d_val", x: 40, y: 100, text: "D=1" },
  { type: "label", id: "lbl_clk_val", x: 30, y: 140, text: "CLK↑" },
  // Clock edge symbol
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 135 }, { x: 150, y: 140 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 145 }, { x: 150, y: 140 }] },
  // Outputs
  { type: "wire", id: "w_q_out", points: [{ x: 260, y: 100 }, { x: 320, y: 100 }] },
  { type: "wire", id: "w_qn_out", points: [{ x: 260, y: 140 }, { x: 320, y: 140 }] },
  { type: "led", id: "led_q", x: 340, y: 100, label: "Q=1", color: "green", highlight: true },
  { type: "led", id: "led_qn", x: 340, y: 140, label: "Q'=0", color: "yellow" },
  // Explanation
  { type: "label", id: "lbl_exp1", x: 200, y: 200, text: "On rising clock edge:" },
  { type: "label", id: "lbl_exp2", x: 200, y: 225, text: "D value (1) captured into Q" },
  { type: "label", id: "lbl_exp3", x: 200, y: 250, text: "Q=1, Q'=0 ✓" },
]};

/** Step 9: Test D change with no clock - Q unchanged */
export const step09: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "Test: D Changes, No CLK Edge" },
  // Flip-flop box
  { type: "wire", id: "w_box_top", points: [{ x: 140, y: 80 }, { x: 260, y: 80 }] },
  { type: "wire", id: "w_box_bot", points: [{ x: 140, y: 160 }, { x: 260, y: 160 }] },
  { type: "wire", id: "w_box_left", points: [{ x: 140, y: 80 }, { x: 140, y: 160 }] },
  { type: "wire", id: "w_box_right", points: [{ x: 260, y: 80 }, { x: 260, y: 160 }] },
  { type: "label", id: "lbl_ff", x: 200, y: 120, text: "D-FF" },
  // Input states - D changing but CLK stable
  { type: "wire", id: "w_d_in", points: [{ x: 60, y: 100 }, { x: 140, y: 100 }], highlight: true },
  { type: "wire", id: "w_clk_in", points: [{ x: 60, y: 140 }, { x: 140, y: 140 }] },
  { type: "label", id: "lbl_d_val", x: 25, y: 100, text: "D=0→1" },
  { type: "label", id: "lbl_clk_val", x: 25, y: 140, text: "CLK=0" },
  // Clock edge symbol
  { type: "wire", id: "w_clk_tri1", points: [{ x: 140, y: 135 }, { x: 150, y: 140 }] },
  { type: "wire", id: "w_clk_tri2", points: [{ x: 140, y: 145 }, { x: 150, y: 140 }] },
  // Outputs - unchanged from previous state
  { type: "wire", id: "w_q_out", points: [{ x: 260, y: 100 }, { x: 320, y: 100 }] },
  { type: "wire", id: "w_qn_out", points: [{ x: 260, y: 140 }, { x: 320, y: 140 }] },
  { type: "led", id: "led_q", x: 340, y: 100, label: "Q", color: "green" },
  { type: "led", id: "led_qn", x: 340, y: 140, label: "Q'", color: "yellow" },
  { type: "label", id: "lbl_unch", x: 360, y: 120, text: "(unchanged)" },
  // Explanation
  { type: "label", id: "lbl_exp1", x: 200, y: 195, text: "Key Property: Edge-Triggered" },
  { type: "label", id: "lbl_exp2", x: 200, y: 220, text: "Q only changes on CLK rising edge" },
  { type: "label", id: "lbl_exp3", x: 200, y: 245, text: "D changes are ignored without CLK edge" },
  { type: "label", id: "lbl_exp4", x: 200, y: 270, text: "This prevents glitches and race conditions" },
]};

/** Indexed array */
export const dFlipFlopStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
  step06, step07, step08, step09,
];

/** Theory diagram */
export const dFlipFlopTheoryDiagram: SchematicData = step06;
