import { type Circuit } from '@/labs/types';

// ── D Flip-Flop (74HC74) ──────────────────────────────────────────────────
//
// 74HC74 pin layout (gate 1, IC at col 5):
//   e-bank: CLR_bar=p1(col5), D=p2(col6), CLK=p3(col7), SET_bar=p4(col8), Q=p5(col9), Q_bar=p6(col10), GND=p7(col11)
//   f-bank: VCC=p14(col5)
//
// Rising-edge triggered. Async PRE_bar (set_bar) and CLR_bar (active-low).
//
// Output paths:
//   Q path   (TOP bank, row 'c'): IC 'out'  → r_q    → led_q    (green)  → GND
//   Q̄ path  (BOT bank, row 'h'): IC 'q_bar' → r_qbar → led_qbar (red)   → GND

export const DFlipFlopCircuit: Circuit = {
  id: 'd-flip-flop',
  title: 'D Flip-Flop using 74HC74 (Rising-Edge Triggered)',
  description:
    'Construct a D flip-flop using 74HC74 and demonstrate data capture on the rising ' +
    'clock edge, plus asynchronous preset and clear.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── IC ────────────────────────────────────────────────────────────────
    { id: 'dff1', type: 'dff', mountedAt: { board: 'bb', col: 5, row: 'e' } },

    // ── Async controls tied HIGH (inactive) ───────────────────────────────
    // CLR_bar → VCC: connect col 5 (e-bank, CLR_bar pin) to VCC rail
    { id: 'w_clr_vcc', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { ic: 'dff1', pin: 'clr_bar' } },
    // SET_bar → VCC: connect col 8 (e-bank, SET_bar pin) to VCC rail
    { id: 'w_set_vcc', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 8 },
      to:   { ic: 'dff1', pin: 'set_bar' } },

    // ── Input wires ───────────────────────────────────────────────────────
    // D input: col 1 row a → IC pin 'in'
    { id: 'w_d_dff1', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'dff1', pin: 'in' } },
    // CLK input: col 2 row a → IC pin 'clk'
    { id: 'w_clk_dff1', type: 'wire', color: 'yellow',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'dff1', pin: 'clk' } },

    // ── Q output path (TOP bank, row 'c') ─────────────────────────────────
    { id: 'r_q',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 21, row: 'c' } },
    { id: 'led_q', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 26, row: 'c' } },

    { id: 'w_q_out', type: 'wire', color: 'green',
      from: { ic: 'dff1', pin: 'out' },
      to:   { component: 'r_q', end: 'p1' } },
    { id: 'w_q_led', type: 'wire', color: 'green',
      from: { component: 'r_q', end: 'p2' },
      to:   { led: 'led_q', end: 'anode' } },
    { id: 'w_q_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },

    // ── Q_bar output path (BOTTOM bank, row 'h') ──────────────────────────
    { id: 'r_qbar',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 21, row: 'h' } },
    { id: 'led_qbar', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 26, row: 'h' } },

    { id: 'w_qbar_out', type: 'wire', color: 'orange',
      from: { ic: 'dff1', pin: 'q_bar' },
      to:   { component: 'r_qbar', end: 'p1' } },
    { id: 'w_qbar_led', type: 'wire', color: 'orange',
      from: { component: 'r_qbar', end: 'p2' },
      to:   { led: 'led_qbar', end: 'anode' } },
    { id: 'w_qbar_gnd', type: 'wire', color: 'black',
      from: { led: 'led_qbar', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body:
        'The solderless breadboard is your build surface. ' +
        'All holes in the same column and bank (a–e or f–j) are electrically connected. ' +
        'The centre gap isolates the two banks so ICs straddle it. ' +
        'Red rail = VCC (+5 V), blue rail = GND (0 V).',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC74 D flip-flop IC',
      body:
        'Mount the 74HC74 straddling the centre gap at column 5. ' +
        'Gate 1 pins: CLR_bar (col 5,e), D (col 6,e), CLK (col 7,e), ' +
        'SET_bar (col 8,e), Q (col 9,e), Q_bar (col 10,e). ' +
        'This is a rising-edge-triggered flip-flop: Q captures D only on a LOW→HIGH clock transition.',
      show: ['bb', 'dff1'],
      highlight: 'dff1',
    },
    {
      title: 'Tie PRE_bar and CLR_bar to VCC (inactive)',
      body:
        'Connect both async control pins to VCC (+5 V) with red wires. ' +
        'PRE_bar (SET_bar) HIGH = preset disabled. CLR_bar HIGH = clear disabled. ' +
        'In this state only the clock edge controls Q.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc'],
      activeInputs: { D: 0, CLK: 0 },
    },
    {
      title: 'Wire the D and CLK inputs',
      body:
        'Blue wire: col 1 row a → D (data) input. ' +
        'Yellow wire: col 2 row a → CLK input. ' +
        'D is sampled only at the clock rising edge — changes to D between edges are ignored.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc', 'w_d_dff1', 'w_clk_dff1'],
      activeInputs: { D: 0, CLK: 0 },
    },
    {
      title: 'Add resistors and LEDs for Q and Q̄',
      body:
        'Green LED path (Q) — top bank row c: r_q at col 21, led_q at col 26. ' +
        'Red LED path (Q̄) — bottom bank row h: r_qbar at col 21, led_qbar at col 26. ' +
        'Both use 330 Ω to limit current. Q and Q̄ are always complementary.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc', 'w_d_dff1', 'w_clk_dff1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar'],
      activeInputs: { D: 0, CLK: 0 },
    },
    {
      title: 'Connect the output paths',
      body:
        'Green wires: IC pin Q → r_q.p1 → r_q.p2 → led_q anode → GND. ' +
        'Orange wires: IC pin Q̄ → r_qbar.p1 → r_qbar.p2 → led_qbar anode → GND. ' +
        'Black wires: both LED cathodes to GND rail. Circuit complete.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc', 'w_d_dff1', 'w_clk_dff1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { D: 0, CLK: 0 },
    },
    {
      title: 'Test: D=0, CLK rising edge → Q=0',
      body:
        'Set D=0. Then pulse CLK: LOW → HIGH (rising edge). ' +
        'Q captures D=0 → Q=0, Q̄=1. Green LED OFF, red LED ON. ' +
        'The flip-flop stores logic 0.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc', 'w_d_dff1', 'w_clk_dff1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { D: 0, CLK: 1 },
    },
    {
      title: 'Test: D=1, CLK rising edge → Q=1',
      body:
        'Now set D=1, then pulse CLK again (LOW→HIGH). ' +
        'Q captures D=1 → Q=1, Q̄=0. Green LED ON, red LED OFF. ' +
        'The flip-flop stores logic 1.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc', 'w_d_dff1', 'w_clk_dff1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      highlight: 'led_q',
      activeInputs: { D: 1, CLK: 1 },
    },
    {
      title: 'Test: Change D without clocking → Q unchanged (hold)',
      body:
        'Set D=0 but do NOT pulse CLK. ' +
        'Q remains 1 (from previous step) — green LED stays ON. ' +
        'This demonstrates the fundamental property of edge-triggered storage: ' +
        'D must be stable before the clock edge (setup time) to guarantee capture.',
      show: ['bb', 'dff1', 'w_clr_vcc', 'w_set_vcc', 'w_d_dff1', 'w_clk_dff1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { D: 0, CLK: 0 },
    },
  ],

  truthTable: {
    inputs:  ['D', 'CLK'],
    outputs: ['Q'],
    rows: [
      { inputs: { D: 0, CLK: 1 }, outputs: { Q: 0 } },  // rising edge, D=0
      { inputs: { D: 1, CLK: 1 }, outputs: { Q: 1 } },  // rising edge, D=1
      { inputs: { D: 0, CLK: 0 }, outputs: { Q: 1 } },  // no edge, D changed, Q holds
    ],
  },
};
