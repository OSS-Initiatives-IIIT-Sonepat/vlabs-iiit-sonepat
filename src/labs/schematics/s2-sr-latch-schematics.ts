import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * SR Latch — progressive 2D schematics.
 * Active-low S' (Set) and R' (Reset) inputs.
 * 74HC279 Quad SR Latch representation.
 * Shows cross-coupled NOR/NAND structure.
 */

const W = 400;
const H = 280;

/** Step 1: place-breadboard — Breadboard setup */
export const step01_placeBreadboard: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "SR Latch — Breadboard Setup" },
  // Breadboard representation
  { type: "wire", id: "bb_top", points: [{ x: 60, y: 60 }, { x: 340, y: 60 }] },
  { type: "wire", id: "bb_bottom", points: [{ x: 60, y: 240 }, { x: 340, y: 240 }] },
  { type: "wire", id: "bb_left", points: [{ x: 60, y: 60 }, { x: 60, y: 240 }] },
  { type: "wire", id: "bb_right", points: [{ x: 340, y: 60 }, { x: 340, y: 240 }] },
  // Power rails
  { type: "wire", id: "w_vcc_rail", points: [{ x: 70, y: 75 }, { x: 330, y: 75 }] },
  { type: "label", id: "lbl_vcc", x: 40, y: 75, text: "+5V" },
  { type: "wire", id: "w_gnd_rail", points: [{ x: 70, y: 225 }, { x: 330, y: 225 }] },
  { type: "label", id: "lbl_gnd", x: 40, y: 225, text: "GND" },
  // IC placement area
  { type: "wire", id: "ic_area", points: [{ x: 140, y: 120 }, { x: 260, y: 120 }, { x: 260, y: 180 }, { x: 140, y: 180 }, { x: 140, y: 120 }] },
  { type: "label", id: "lbl_ic_place", x: 200, y: 150, text: "74HC279" },
  { type: "label", id: "lbl_note", x: 200, y: 260, text: "Place IC across center channel" },
]};

/** Step 2: place-74hc279 — IC pinout */
export const step02_place74hc279: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "SR Latch — 74HC279 Pinout" },
  // IC outline
  { type: "wire", id: "ic_box", points: [{ x: 120, y: 60 }, { x: 280, y: 60 }, { x: 280, y: 220 }, { x: 120, y: 220 }, { x: 120, y: 60 }] },
  { type: "label", id: "lbl_ic", x: 200, y: 85, text: "74HC279" },
  { type: "label", id: "lbl_quad", x: 200, y: 105, text: "Quad SR Latch" },
  // Notch
  { type: "wire", id: "notch", points: [{ x: 185, y: 60 }, { x: 200, y: 50 }, { x: 215, y: 60 }] },
  // Pin labels (left side - 1-8)
  { type: "label", id: "lbl_pin1", x: 110, y: 75, text: "1-R1'" },
  { type: "label", id: "lbl_pin2", x: 110, y: 95, text: "2-S1a'" },
  { type: "label", id: "lbl_pin3", x: 110, y: 115, text: "3-S1b'" },
  { type: "label", id: "lbl_pin4", x: 110, y: 135, text: "4-Q1" },
  { type: "label", id: "lbl_pin5", x: 110, y: 155, text: "5-R2'" },
  { type: "label", id: "lbl_pin6", x: 110, y: 175, text: "6-S2'" },
  { type: "label", id: "lbl_pin7", x: 110, y: 195, text: "7-Q2" },
  { type: "label", id: "lbl_pin8", x: 110, y: 215, text: "8-GND" },
  // Pin labels (right side - 16-9)
  { type: "label", id: "lbl_pin16", x: 290, y: 75, text: "Vcc-16" },
  { type: "label", id: "lbl_pin15", x: 290, y: 95, text: "R4'-15" },
  { type: "label", id: "lbl_pin14", x: 290, y: 115, text: "S4'-14" },
  { type: "label", id: "lbl_pin13", x: 290, y: 135, text: "Q4-13" },
  { type: "label", id: "lbl_pin12", x: 290, y: 155, text: "R3'-12" },
  { type: "label", id: "lbl_pin11", x: 290, y: 175, text: "S3a'-11" },
  { type: "label", id: "lbl_pin10", x: 290, y: 195, text: "S3b'-10" },
  { type: "label", id: "lbl_pin9", x: 290, y: 215, text: "Q3-9" },
  // Note
  { type: "label", id: "lbl_note", x: 200, y: 250, text: "Active-low inputs (S', R')" },
]};

/** Step 3: wire-s-bar-r-bar-inputs — Connect S' and R' inputs */
export const step03_wireSBarRBarInputs: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "SR Latch — Input Wiring" },
  // Simplified latch box
  { type: "wire", id: "latch_box", points: [{ x: 160, y: 80 }, { x: 280, y: 80 }, { x: 280, y: 180 }, { x: 160, y: 180 }, { x: 160, y: 80 }] },
  { type: "label", id: "lbl_latch", x: 220, y: 100, text: "SR Latch" },
  // S' input
  { type: "label", id: "lbl_s_bar", x: 150, y: 115, text: "S'" },
  { type: "wire", id: "w_s_in", points: [{ x: 60, y: 115 }, { x: 160, y: 115 }], highlight: true },
  // R' input
  { type: "label", id: "lbl_r_bar", x: 150, y: 155, text: "R'" },
  { type: "wire", id: "w_r_in", points: [{ x: 60, y: 155 }, { x: 160, y: 155 }], highlight: true },
  // Input switches
  { type: "wire", id: "sw_s_box", points: [{ x: 40, y: 100 }, { x: 80, y: 100 }, { x: 80, y: 130 }, { x: 40, y: 130 }, { x: 40, y: 100 }] },
  { type: "label", id: "lbl_sw_s", x: 60, y: 90, text: "SW-S" },
  { type: "wire", id: "sw_r_box", points: [{ x: 40, y: 140 }, { x: 80, y: 140 }, { x: 80, y: 170 }, { x: 40, y: 170 }, { x: 40, y: 140 }] },
  { type: "label", id: "lbl_sw_r", x: 60, y: 183, text: "SW-R" },
  // Q output
  { type: "label", id: "lbl_q", x: 290, y: 115, text: "Q" },
  { type: "wire", id: "w_q_out", points: [{ x: 280, y: 115 }, { x: 340, y: 115 }] },
  // Q' output
  { type: "label", id: "lbl_q_bar", x: 290, y: 155, text: "Q'" },
  { type: "wire", id: "w_q_bar_out", points: [{ x: 280, y: 155 }, { x: 340, y: 155 }] },
  // Truth table hint
  { type: "label", id: "lbl_active_low", x: 200, y: 210, text: "Active-LOW: 0=Active, 1=Inactive" },
  { type: "label", id: "lbl_hint", x: 200, y: 230, text: "Pull-up resistors keep inputs HIGH" },
]};

/** Step 4: place-resistor — Pull-up resistors */
export const step04_placeResistor: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "SR Latch — Pull-up Resistors" },
  // Vcc rail
  { type: "wire", id: "w_vcc", points: [{ x: 40, y: 50 }, { x: 140, y: 50 }] },
  { type: "label", id: "lbl_vcc", x: 20, y: 50, text: "+5V" },
  // Latch box
  { type: "wire", id: "latch_box", points: [{ x: 180, y: 90 }, { x: 280, y: 90 }, { x: 280, y: 170 }, { x: 180, y: 170 }, { x: 180, y: 90 }] },
  { type: "label", id: "lbl_latch", x: 230, y: 110, text: "SR Latch" },
  // S' input with pull-up
  { type: "label", id: "lbl_s_bar", x: 170, y: 115, text: "S'" },
  { type: "wire", id: "w_s_pu_vcc", points: [{ x: 80, y: 50 }, { x: 80, y: 70 }] },
  { type: "wire", id: "r_s_box", points: [{ x: 75, y: 70 }, { x: 85, y: 70 }, { x: 85, y: 95 }, { x: 75, y: 95 }, { x: 75, y: 70 }], highlight: true },
  { type: "label", id: "lbl_r_s", x: 95, y: 82, text: "10k" },
  { type: "wire", id: "w_s_pu_in", points: [{ x: 80, y: 95 }, { x: 80, y: 115 }, { x: 180, y: 115 }] },
  // R' input with pull-up
  { type: "label", id: "lbl_r_bar", x: 170, y: 150, text: "R'" },
  { type: "wire", id: "w_r_pu_vcc", points: [{ x: 120, y: 50 }, { x: 120, y: 70 }] },
  { type: "wire", id: "r_r_box", points: [{ x: 115, y: 70 }, { x: 125, y: 70 }, { x: 125, y: 95 }, { x: 115, y: 95 }, { x: 115, y: 70 }], highlight: true },
  { type: "label", id: "lbl_r_r", x: 135, y: 82, text: "10k" },
  { type: "wire", id: "w_r_pu_in", points: [{ x: 120, y: 95 }, { x: 120, y: 150 }, { x: 180, y: 150 }] },
  // Switch connections (to GND)
  { type: "wire", id: "w_s_sw", points: [{ x: 80, y: 115 }, { x: 40, y: 115 }] },
  { type: "wire", id: "w_r_sw", points: [{ x: 120, y: 150 }, { x: 40, y: 150 }] },
  { type: "junction", id: "j_s", x: 80, y: 115 },
  { type: "junction", id: "j_r", x: 120, y: 150 },
  // GND symbols
  { type: "label", id: "lbl_gnd_s", x: 30, y: 115, text: "SW" },
  { type: "label", id: "lbl_gnd_r", x: 30, y: 150, text: "SW" },
  // Outputs
  { type: "wire", id: "w_q", points: [{ x: 280, y: 115 }, { x: 340, y: 115 }] },
  { type: "label", id: "lbl_q", x: 350, y: 115, text: "Q" },
  { type: "wire", id: "w_q_bar", points: [{ x: 280, y: 150 }, { x: 340, y: 150 }] },
  { type: "label", id: "lbl_q_bar", x: 350, y: 150, text: "Q'" },
  // Note
  { type: "label", id: "lbl_note", x: 200, y: 210, text: "Pull-ups ensure HIGH when switch open" },
  { type: "label", id: "lbl_note2", x: 200, y: 230, text: "Press switch to pull input LOW (active)" },
]};

/** Step 5: place-q-led — Q output LED indicator */
export const step05_placeQLed: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "SR Latch — Output LED" },
  // Latch box
  { type: "wire", id: "latch_box", points: [{ x: 140, y: 80 }, { x: 240, y: 80 }, { x: 240, y: 160 }, { x: 140, y: 160 }, { x: 140, y: 80 }] },
  { type: "label", id: "lbl_latch", x: 190, y: 100, text: "SR Latch" },
  // Inputs
  { type: "wire", id: "w_s", points: [{ x: 80, y: 105 }, { x: 140, y: 105 }] },
  { type: "label", id: "lbl_s", x: 60, y: 105, text: "S'" },
  { type: "wire", id: "w_r", points: [{ x: 80, y: 140 }, { x: 140, y: 140 }] },
  { type: "label", id: "lbl_r", x: 60, y: 140, text: "R'" },
  // Q output with LED
  { type: "wire", id: "w_q_out", points: [{ x: 240, y: 105 }, { x: 280, y: 105 }] },
  { type: "label", id: "lbl_q", x: 250, y: 90, text: "Q" },
  // LED and resistor
  { type: "wire", id: "r_led_box", points: [{ x: 280, y: 100 }, { x: 295, y: 100 }, { x: 295, y: 115 }, { x: 280, y: 115 }, { x: 280, y: 100 }] },
  { type: "label", id: "lbl_r_led", x: 287, y: 125, text: "330R" },
  { type: "wire", id: "w_led_r", points: [{ x: 295, y: 105 }, { x: 320, y: 105 }] },
  { type: "led", id: "led_q", x: 340, y: 105, label: "Q", color: "green", highlight: true },
  { type: "wire", id: "w_led_gnd", points: [{ x: 360, y: 105 }, { x: 380, y: 105 }, { x: 380, y: 200 }] },
  { type: "label", id: "lbl_gnd", x: 375, y: 215, text: "GND" },
  // Q' output
  { type: "wire", id: "w_q_bar_out", points: [{ x: 240, y: 140 }, { x: 280, y: 140 }] },
  { type: "label", id: "lbl_q_bar", x: 285, y: 140, text: "Q'" },
  // Note
  { type: "label", id: "lbl_note", x: 200, y: 195, text: "LED ON = Q is HIGH (Set state)" },
  { type: "label", id: "lbl_note2", x: 200, y: 215, text: "LED OFF = Q is LOW (Reset state)" },
]};

/** Step 6: connect-output — Complete output connections */
export const step06_connectOutput: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "SR Latch — Complete Wiring" },
  // Cross-coupled NAND internal structure
  { type: "label", id: "lbl_struct", x: 200, y: 50, text: "Internal: Cross-coupled NANDs" },
  // NAND gates
  { type: "nand-gate", id: "NAND1", x: 160, y: 100, label: "N1" },
  { type: "nand-gate", id: "NAND2", x: 160, y: 170, label: "N2" },
  // S' input
  { type: "wire", id: "w_s_in", points: [{ x: 40, y: 92 }, { x: 134, y: 92 }] },
  { type: "label", id: "lbl_s", x: 25, y: 92, text: "S'" },
  // R' input
  { type: "wire", id: "w_r_in", points: [{ x: 40, y: 178 }, { x: 134, y: 178 }] },
  { type: "label", id: "lbl_r", x: 25, y: 178, text: "R'" },
  // Cross-coupling: Q → NAND2 input
  { type: "wire", id: "w_q_cross", points: [{ x: 192, y: 100 }, { x: 220, y: 100 }, { x: 220, y: 140 }, { x: 120, y: 140 }, { x: 120, y: 162 }, { x: 134, y: 162 }], highlight: true },
  // Cross-coupling: Q' → NAND1 input
  { type: "wire", id: "w_q_bar_cross", points: [{ x: 192, y: 170 }, { x: 230, y: 170 }, { x: 230, y: 130 }, { x: 110, y: 130 }, { x: 110, y: 108 }, { x: 134, y: 108 }], highlight: true },
  // Q output
  { type: "wire", id: "w_q_out", points: [{ x: 220, y: 100 }, { x: 290, y: 100 }] },
  { type: "led", id: "led_q", x: 310, y: 100, label: "Q", color: "green" },
  { type: "junction", id: "j_q", x: 220, y: 100 },
  // Q' output
  { type: "wire", id: "w_q_bar_out", points: [{ x: 230, y: 170 }, { x: 290, y: 170 }] },
  { type: "led", id: "led_q_bar", x: 310, y: 170, label: "Q'", color: "red" },
  { type: "junction", id: "j_q_bar", x: 230, y: 170 },
  // Note
  { type: "label", id: "lbl_note", x: 200, y: 220, text: "Cross-coupling creates memory" },
  { type: "label", id: "lbl_note2", x: 200, y: 240, text: "Q and Q' are always complementary" },
]};

/** Step 7: test-reset-s1r0 — Test RESET state (S'=1, R'=0) */
export const step07_testResetS1R0: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "SR Latch — RESET Test (S'=1, R'=0)" },
  // Latch box
  { type: "wire", id: "latch_box", points: [{ x: 140, y: 80 }, { x: 260, y: 80 }, { x: 260, y: 180 }, { x: 140, y: 180 }, { x: 140, y: 80 }] },
  { type: "label", id: "lbl_latch", x: 200, y: 100, text: "SR Latch" },
  // S'=1 (inactive)
  { type: "wire", id: "w_s_in", points: [{ x: 60, y: 110 }, { x: 140, y: 110 }] },
  { type: "label", id: "lbl_s", x: 30, y: 110, text: "S'=1" },
  { type: "label", id: "lbl_s_state", x: 80, y: 130, text: "(inactive)" },
  // R'=0 (active)
  { type: "wire", id: "w_r_in", points: [{ x: 60, y: 160 }, { x: 140, y: 160 }], highlight: true },
  { type: "label", id: "lbl_r", x: 30, y: 160, text: "R'=0" },
  { type: "label", id: "lbl_r_state", x: 80, y: 175, text: "(ACTIVE)" },
  // Q=0 (reset)
  { type: "wire", id: "w_q_out", points: [{ x: 260, y: 110 }, { x: 320, y: 110 }] },
  { type: "led", id: "led_q", x: 340, y: 110, label: "Q=0", color: "red" },
  // Q'=1
  { type: "wire", id: "w_q_bar_out", points: [{ x: 260, y: 160 }, { x: 320, y: 160 }] },
  { type: "led", id: "led_q_bar", x: 340, y: 160, label: "Q'=1", color: "green", highlight: true },
  // Truth table row
  { type: "label", id: "lbl_truth", x: 200, y: 215, text: "S'=1, R'=0 → Q=0, Q'=1" },
  { type: "label", id: "lbl_state", x: 200, y: 240, text: "RESET STATE" },
]};

/** Step 8: test-set-s0r1 — Test SET state (S'=0, R'=1) */
export const step08_testSetS0R1: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "SR Latch — SET Test (S'=0, R'=1)" },
  // Latch box
  { type: "wire", id: "latch_box", points: [{ x: 140, y: 80 }, { x: 260, y: 80 }, { x: 260, y: 180 }, { x: 140, y: 180 }, { x: 140, y: 80 }] },
  { type: "label", id: "lbl_latch", x: 200, y: 100, text: "SR Latch" },
  // S'=0 (active)
  { type: "wire", id: "w_s_in", points: [{ x: 60, y: 110 }, { x: 140, y: 110 }], highlight: true },
  { type: "label", id: "lbl_s", x: 30, y: 110, text: "S'=0" },
  { type: "label", id: "lbl_s_state", x: 80, y: 130, text: "(ACTIVE)" },
  // R'=1 (inactive)
  { type: "wire", id: "w_r_in", points: [{ x: 60, y: 160 }, { x: 140, y: 160 }] },
  { type: "label", id: "lbl_r", x: 30, y: 160, text: "R'=1" },
  { type: "label", id: "lbl_r_state", x: 80, y: 175, text: "(inactive)" },
  // Q=1 (set)
  { type: "wire", id: "w_q_out", points: [{ x: 260, y: 110 }, { x: 320, y: 110 }] },
  { type: "led", id: "led_q", x: 340, y: 110, label: "Q=1", color: "green", highlight: true },
  // Q'=0
  { type: "wire", id: "w_q_bar_out", points: [{ x: 260, y: 160 }, { x: 320, y: 160 }] },
  { type: "led", id: "led_q_bar", x: 340, y: 160, label: "Q'=0", color: "red" },
  // Truth table row
  { type: "label", id: "lbl_truth", x: 200, y: 215, text: "S'=0, R'=1 → Q=1, Q'=0" },
  { type: "label", id: "lbl_state", x: 200, y: 240, text: "SET STATE" },
]};

/** Step 9: test-hold-both1 — Test HOLD state (S'=1, R'=1) */
export const step09_testHoldBoth1: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "SR Latch — HOLD Test (S'=1, R'=1)" },
  // Latch box
  { type: "wire", id: "latch_box", points: [{ x: 140, y: 80 }, { x: 260, y: 80 }, { x: 260, y: 180 }, { x: 140, y: 180 }, { x: 140, y: 80 }] },
  { type: "label", id: "lbl_latch", x: 200, y: 100, text: "SR Latch" },
  // S'=1 (inactive)
  { type: "wire", id: "w_s_in", points: [{ x: 60, y: 110 }, { x: 140, y: 110 }] },
  { type: "label", id: "lbl_s", x: 30, y: 110, text: "S'=1" },
  { type: "label", id: "lbl_s_state", x: 80, y: 130, text: "(inactive)" },
  // R'=1 (inactive)
  { type: "wire", id: "w_r_in", points: [{ x: 60, y: 160 }, { x: 140, y: 160 }] },
  { type: "label", id: "lbl_r", x: 30, y: 160, text: "R'=1" },
  { type: "label", id: "lbl_r_state", x: 80, y: 175, text: "(inactive)" },
  // Q = previous (hold)
  { type: "wire", id: "w_q_out", points: [{ x: 260, y: 110 }, { x: 320, y: 110 }] },
  { type: "led", id: "led_q", x: 340, y: 110, label: "Q", color: "yellow", highlight: true },
  // Q' = previous complement
  { type: "wire", id: "w_q_bar_out", points: [{ x: 260, y: 160 }, { x: 320, y: 160 }] },
  { type: "led", id: "led_q_bar", x: 340, y: 160, label: "Q'", color: "yellow", highlight: true },
  // Explanation
  { type: "label", id: "lbl_truth", x: 200, y: 215, text: "S'=1, R'=1 → Q=Qprev, Q'=Q'prev" },
  { type: "label", id: "lbl_state", x: 200, y: 240, text: "HOLD STATE (Memory)" },
  { type: "label", id: "lbl_note", x: 200, y: 260, text: "Output retains previous value" },
]};

/** Step 10: observe-forbidden-both0 — Forbidden state (S'=0, R'=0) */
export const step10_observeForbiddenBoth0: SchematicData = { width: W, height: H, elements: [
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "SR Latch — FORBIDDEN (S'=0, R'=0)" },
  // Latch box with warning
  { type: "wire", id: "latch_box", points: [{ x: 140, y: 80 }, { x: 260, y: 80 }, { x: 260, y: 180 }, { x: 140, y: 180 }, { x: 140, y: 80 }] },
  { type: "label", id: "lbl_latch", x: 200, y: 100, text: "SR Latch" },
  // S'=0 (both active - forbidden!)
  { type: "wire", id: "w_s_in", points: [{ x: 60, y: 110 }, { x: 140, y: 110 }], highlight: true },
  { type: "label", id: "lbl_s", x: 30, y: 110, text: "S'=0" },
  // R'=0 (both active - forbidden!)
  { type: "wire", id: "w_r_in", points: [{ x: 60, y: 160 }, { x: 140, y: 160 }], highlight: true },
  { type: "label", id: "lbl_r", x: 30, y: 160, text: "R'=0" },
  // Both outputs try to go HIGH
  { type: "wire", id: "w_q_out", points: [{ x: 260, y: 110 }, { x: 320, y: 110 }] },
  { type: "led", id: "led_q", x: 340, y: 110, label: "Q=1?", color: "red", highlight: true },
  { type: "wire", id: "w_q_bar_out", points: [{ x: 260, y: 160 }, { x: 320, y: 160 }] },
  { type: "led", id: "led_q_bar", x: 340, y: 160, label: "Q'=1?", color: "red", highlight: true },
  // Warning
  { type: "label", id: "lbl_warning", x: 200, y: 210, text: "FORBIDDEN STATE!" },
  { type: "label", id: "lbl_why1", x: 200, y: 235, text: "Q=Q'=1 violates complementarity" },
  { type: "label", id: "lbl_why2", x: 200, y: 255, text: "Race condition when released" },
  { type: "label", id: "lbl_avoid", x: 200, y: 275, text: "AVOID this input combination!" },
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
  { type: "label", id: "lbl_title", x: 200, y: 20, text: "SR Latch (Active-Low)" },
  // Cross-coupled NANDs
  { type: "nand-gate", id: "NAND1", x: 180, y: 90, label: "N1" },
  { type: "nand-gate", id: "NAND2", x: 180, y: 160, label: "N2" },
  // S' input
  { type: "wire", id: "w_s_in", points: [{ x: 40, y: 82 }, { x: 154, y: 82 }] },
  { type: "label", id: "lbl_s", x: 25, y: 82, text: "S'" },
  // R' input
  { type: "wire", id: "w_r_in", points: [{ x: 40, y: 168 }, { x: 154, y: 168 }] },
  { type: "label", id: "lbl_r", x: 25, y: 168, text: "R'" },
  // Cross-coupling
  { type: "wire", id: "w_q_to_n2", points: [{ x: 212, y: 90 }, { x: 240, y: 90 }, { x: 240, y: 120 }, { x: 130, y: 120 }, { x: 130, y: 152 }, { x: 154, y: 152 }] },
  { type: "wire", id: "w_qb_to_n1", points: [{ x: 212, y: 160 }, { x: 250, y: 160 }, { x: 250, y: 130 }, { x: 120, y: 130 }, { x: 120, y: 98 }, { x: 154, y: 98 }] },
  // Q output
  { type: "wire", id: "w_q_out", points: [{ x: 240, y: 90 }, { x: 320, y: 90 }] },
  { type: "junction", id: "j_q", x: 240, y: 90 },
  { type: "led", id: "led_q", x: 340, y: 90, label: "Q", color: "green" },
  // Q' output
  { type: "wire", id: "w_qb_out", points: [{ x: 250, y: 160 }, { x: 320, y: 160 }] },
  { type: "junction", id: "j_qb", x: 250, y: 160 },
  { type: "led", id: "led_qb", x: 340, y: 160, label: "Q'", color: "red" },
  // Truth table
  { type: "label", id: "lbl_truth_header", x: 200, y: 205, text: "S' R' | Q  Q'" },
  { type: "label", id: "lbl_truth_set", x: 200, y: 220, text: " 0  1 | 1  0  (SET)" },
  { type: "label", id: "lbl_truth_reset", x: 200, y: 235, text: " 1  0 | 0  1  (RESET)" },
  { type: "label", id: "lbl_truth_hold", x: 200, y: 250, text: " 1  1 | Q  Q' (HOLD)" },
]};
