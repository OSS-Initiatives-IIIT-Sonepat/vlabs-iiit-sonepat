import { type Circuit } from '@/labs/types';

// ── 8-bit SIPO Shift Register (74HC273 demo) ──────────────────────────────────
//
// 74HC273 DIP-20 pin mapping (simplified for breadboard):
//   Row e: MR_bar(col+0), D0-D7(col+1..8), GND(col+9)
//   Row f: VCC(col+0),   CLK(col+1),   Q0-Q7(col+2..9)
//
// Gate mounted at col 3.
//
// Outputs: 8 LEDs (alternating rows c and h) cols 18-25
// CLK input: col 1 row a
// D0 input:  col 2 row a  (D1 at col 2 row b, rest tied low)

export const ShiftRegister: Circuit = {
  id: 'shift-register',
  title: '8-bit Serial-In Parallel-Out (SIPO) Shift Register using 74HC273',
  description:
    'Load data serially into a 74HC273 8-bit register and observe all 8 parallel outputs on LEDs. ' +
    'Data appears on Q0–Q7 on each rising clock edge.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── 74HC273 8-bit register ─────────────────────────────────────────────
    { id: 'reg8', type: 'register-8bit', mountedAt: { board: 'bb', col: 3, row: 'e' } },

    // ── Output resistors ──────────────────────────────────────────────────
    { id: 'r_q0', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 14, row: 'c' } },
    { id: 'r_q1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 14, row: 'h' } },
    { id: 'r_q2', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 17, row: 'c' } },
    { id: 'r_q3', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 17, row: 'h' } },
    { id: 'r_q4', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'c' } },
    { id: 'r_q5', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'h' } },
    { id: 'r_q6', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 23, row: 'c' } },
    { id: 'r_q7', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 23, row: 'h' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_q0', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 16, row: 'c' } },
    { id: 'led_q1', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 16, row: 'h' } },
    { id: 'led_q2', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 19, row: 'c' } },
    { id: 'led_q3', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 19, row: 'h' } },
    { id: 'led_q4', type: 'led', color: 'white',  mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'led_q5', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 22, row: 'h' } },
    { id: 'led_q6', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 25, row: 'c' } },
    { id: 'led_q7', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 25, row: 'h' } },

    // ── CLK input wire ────────────────────────────────────────────────────
    { id: 'w_clk_reg8', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'reg8', pin: 'clk' } },

    // ── D0, D1 data input wires ───────────────────────────────────────────
    { id: 'w_d0_reg8', type: 'wire', color: 'red',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'reg8', pin: 'd0' } },
    { id: 'w_d1_reg8', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'reg8', pin: 'd1' } },

    // ── MR_bar tied HIGH (no reset) ───────────────────────────────────────
    { id: 'w_mr_high', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 1 },
      to:   { ic: 'reg8', pin: 'mr_bar' } },

    // ── Q0-Q7 output wires → resistors ───────────────────────────────────
    { id: 'w_q0_r', type: 'wire', color: 'red',
      from: { ic: 'reg8', pin: 'q0' },
      to:   { component: 'r_q0', end: 'p1' } },
    { id: 'w_q1_r', type: 'wire', color: 'yellow',
      from: { ic: 'reg8', pin: 'q1' },
      to:   { component: 'r_q1', end: 'p1' } },
    { id: 'w_q2_r', type: 'wire', color: 'green',
      from: { ic: 'reg8', pin: 'q2' },
      to:   { component: 'r_q2', end: 'p1' } },
    { id: 'w_q3_r', type: 'wire', color: 'blue',
      from: { ic: 'reg8', pin: 'q3' },
      to:   { component: 'r_q3', end: 'p1' } },
    { id: 'w_q4_r', type: 'wire', color: 'white',
      from: { ic: 'reg8', pin: 'q4' },
      to:   { component: 'r_q4', end: 'p1' } },
    { id: 'w_q5_r', type: 'wire', color: 'red',
      from: { ic: 'reg8', pin: 'q5' },
      to:   { component: 'r_q5', end: 'p1' } },
    { id: 'w_q6_r', type: 'wire', color: 'yellow',
      from: { ic: 'reg8', pin: 'q6' },
      to:   { component: 'r_q6', end: 'p1' } },
    { id: 'w_q7_r', type: 'wire', color: 'green',
      from: { ic: 'reg8', pin: 'q7' },
      to:   { component: 'r_q7', end: 'p1' } },

    // ── Resistors → LEDs ──────────────────────────────────────────────────
    { id: 'w_r0_led', type: 'wire', color: 'red',
      from: { component: 'r_q0', end: 'p2' },
      to:   { led: 'led_q0', end: 'anode' } },
    { id: 'w_r1_led', type: 'wire', color: 'yellow',
      from: { component: 'r_q1', end: 'p2' },
      to:   { led: 'led_q1', end: 'anode' } },
    { id: 'w_r2_led', type: 'wire', color: 'green',
      from: { component: 'r_q2', end: 'p2' },
      to:   { led: 'led_q2', end: 'anode' } },
    { id: 'w_r3_led', type: 'wire', color: 'blue',
      from: { component: 'r_q3', end: 'p2' },
      to:   { led: 'led_q3', end: 'anode' } },
    { id: 'w_r4_led', type: 'wire', color: 'white',
      from: { component: 'r_q4', end: 'p2' },
      to:   { led: 'led_q4', end: 'anode' } },
    { id: 'w_r5_led', type: 'wire', color: 'red',
      from: { component: 'r_q5', end: 'p2' },
      to:   { led: 'led_q5', end: 'anode' } },
    { id: 'w_r6_led', type: 'wire', color: 'yellow',
      from: { component: 'r_q6', end: 'p2' },
      to:   { led: 'led_q6', end: 'anode' } },
    { id: 'w_r7_led', type: 'wire', color: 'green',
      from: { component: 'r_q7', end: 'p2' },
      to:   { led: 'led_q7', end: 'anode' } },

    // ── LED cathodes → GND ────────────────────────────────────────────────
    { id: 'w_led0_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q0', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },
    { id: 'w_led1_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 2 } },
    { id: 'w_led2_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q2', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 3 } },
    { id: 'w_led3_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q3', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 4 } },
    { id: 'w_led4_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q4', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 5 } },
    { id: 'w_led5_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q5', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 6 } },
    { id: 'w_led6_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q6', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 7 } },
    { id: 'w_led7_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q7', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 8 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the solderless breadboard. We will build an 8-bit parallel-output register ' +
        'using the 74HC273. On each rising CLK edge, the D0–D7 inputs are captured to Q0–Q7, ' +
        'illuminating the corresponding LEDs.',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC273 8-bit register',
      body: 'Mount the 74HC273 DIP-20 IC straddling the centre gap at column 3. ' +
        'Pin 1 (MR_bar, active-low reset) is at col 3, row e. ' +
        'D0–D7 are on the top bank, Q0–Q7 and CLK are on the bottom bank.',
      show: ['bb', 'reg8'],
      highlight: 'reg8',
    },
    {
      title: 'Tie MR_bar HIGH and wire CLK',
      body: 'Red wire: VCC rail → MR_bar pin (col 3, row e) — keeps reset inactive. ' +
        'Orange wire: col 1, row a (CLK input) → reg8 CLK pin. ' +
        'CLK is active on the rising edge.',
      show: ['bb', 'reg8', 'w_mr_high', 'w_clk_reg8'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Wire D0 and D1 data inputs',
      body: 'Red wire: col 2 row a → D0. Blue wire: col 2 row b → D1. ' +
        'Remaining D2–D7 inputs are tied to GND (logic 0) via the GND rail. ' +
        'For this demo we drive only D0 and D1 independently.',
      show: ['bb', 'reg8', 'w_mr_high', 'w_clk_reg8', 'w_d0_reg8', 'w_d1_reg8'],
      activeInputs: { CLK: 0, D0: 0, D1: 0 },
    },
    {
      title: 'Place 8 output LEDs and resistors',
      body: '8 LEDs placed in alternating rows c and h, columns 16–25. ' +
        '330 Ω resistors before each LED anode. All cathodes to GND rail. ' +
        'Colours: red, yellow, green, blue, white, red, yellow, green (Q0–Q7).',
      show: ['bb', 'reg8', 'w_mr_high', 'w_clk_reg8', 'w_d0_reg8', 'w_d1_reg8',
             'r_q0', 'r_q1', 'r_q2', 'r_q3', 'r_q4', 'r_q5', 'r_q6', 'r_q7',
             'led_q0', 'led_q1', 'led_q2', 'led_q3', 'led_q4', 'led_q5', 'led_q6', 'led_q7'],
      activeInputs: { CLK: 0, D0: 0, D1: 0 },
    },
    {
      title: 'Connect Q0–Q7 output wires',
      body: 'Wire reg8 Q0–Q7 pins to their respective resistors p1. ' +
        'Then wire resistors p2 to LED anodes. Circuit is now complete.',
      show: ['bb', 'reg8', 'w_mr_high', 'w_clk_reg8', 'w_d0_reg8', 'w_d1_reg8',
             'r_q0', 'r_q1', 'r_q2', 'r_q3', 'r_q4', 'r_q5', 'r_q6', 'r_q7',
             'led_q0', 'led_q1', 'led_q2', 'led_q3', 'led_q4', 'led_q5', 'led_q6', 'led_q7',
             'w_q0_r', 'w_q1_r', 'w_q2_r', 'w_q3_r', 'w_q4_r', 'w_q5_r', 'w_q6_r', 'w_q7_r',
             'w_r0_led', 'w_r1_led', 'w_r2_led', 'w_r3_led', 'w_r4_led', 'w_r5_led', 'w_r6_led', 'w_r7_led',
             'w_led0_gnd', 'w_led1_gnd', 'w_led2_gnd', 'w_led3_gnd',
             'w_led4_gnd', 'w_led5_gnd', 'w_led6_gnd', 'w_led7_gnd'],
      activeInputs: { CLK: 0, D0: 0, D1: 0 },
    },
    {
      title: 'Test: Load D=0b10110100, apply CLK',
      body: 'Set D7=1, D6=0, D5=1, D4=1, D3=0, D2=1, D1=0, D0=0. ' +
        'Apply a rising CLK edge. Q7–Q0 immediately reflect the data: 1,0,1,1,0,1,0,0. ' +
        'LEDs Q7, Q5, Q4, Q2 should light up (bits that are 1). ' +
        'This demonstrates parallel output from serial-style loading.',
      show: ['bb', 'reg8', 'w_mr_high', 'w_clk_reg8', 'w_d0_reg8', 'w_d1_reg8',
             'r_q0', 'r_q1', 'r_q2', 'r_q3', 'r_q4', 'r_q5', 'r_q6', 'r_q7',
             'led_q0', 'led_q1', 'led_q2', 'led_q3', 'led_q4', 'led_q5', 'led_q6', 'led_q7',
             'w_q0_r', 'w_q1_r', 'w_q2_r', 'w_q3_r', 'w_q4_r', 'w_q5_r', 'w_q6_r', 'w_q7_r',
             'w_r0_led', 'w_r1_led', 'w_r2_led', 'w_r3_led', 'w_r4_led', 'w_r5_led', 'w_r6_led', 'w_r7_led',
             'w_led0_gnd', 'w_led1_gnd', 'w_led2_gnd', 'w_led3_gnd',
             'w_led4_gnd', 'w_led5_gnd', 'w_led6_gnd', 'w_led7_gnd'],
      activeInputs: { CLK: 1, D0: 0, D1: 0 },
    },
  ],

  truthTable: {
    inputs:  ['CLK_edge', 'D[7:0]'],
    outputs: ['Q[7:0]'],
    rows: [
      { inputs: { CLK_edge: 0, 'D[7:0]': 0 }, outputs: { 'Q[7:0]': 0 } },
      { inputs: { CLK_edge: 1, 'D[7:0]': 0 }, outputs: { 'Q[7:0]': 0 } },
      { inputs: { CLK_edge: 1, 'D[7:0]': 180 }, outputs: { 'Q[7:0]': 180 } },
      { inputs: { CLK_edge: 1, 'D[7:0]': 255 }, outputs: { 'Q[7:0]': 255 } },
    ],
  },
};
