import { type Circuit } from '@/labs/types';

// ── JK and T Flip-Flop (74HC76) ───────────────────────────────────────────
//
// 74HC76 pin layout (gate 1, IC at col 5):
//   e-bank: CLK=p1(col5), SET_bar=p2(col6), K=p3(col7), J=p4(col8),
//           Q_bar=p5(col9), Q=p6(col10), GND=p7(col11)
//   f-bank: VCC=p16(col5), CLR_bar=p2(col6)
//
// Falling-edge triggered. Active-low async SET_bar and CLR_bar.
//
// T flip-flop derived by tying J=K=T.
//
// Q output path (TOP bank, row 'c'): IC 'out' → r_q → led_q (green) → GND
// T-mode indicator (BOTTOM bank, row 'h'): extra yellow LED on Q

export const JKTFlipFlopCircuit: Circuit = {
  id: 'jk-t-flip-flop',
  title: 'JK Flip-Flop and T Flip-Flop using 74HC76',
  description:
    'Implement a JK flip-flop using 74HC76 and derive a T flip-flop by connecting J=K=T.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── IC ────────────────────────────────────────────────────────────────
    { id: 'jk1', type: 'jk-ff', mountedAt: { board: 'bb', col: 5, row: 'e' } },

    // ── Async SET_bar and CLR_bar tied HIGH (inactive) ────────────────────
    { id: 'w_set_vcc', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 6 },
      to:   { ic: 'jk1', pin: 'set' } },
    { id: 'w_clr_vcc', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 7 },
      to:   { ic: 'jk1', pin: 'clr' } },

    // ── JK mode input wires ───────────────────────────────────────────────
    // J: col 1 row a → IC pin 'j'
    { id: 'w_j_jk1', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'jk1', pin: 'j' } },
    // K: col 2 row a → IC pin 'k'
    { id: 'w_k_jk1', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'jk1', pin: 'k' } },
    // CLK: col 3 row a → IC pin 'clk'
    { id: 'w_clk_jk1', type: 'wire', color: 'yellow',
      from: { board: 'bb', col: 3, row: 'a' },
      to:   { ic: 'jk1', pin: 'clk' } },

    // ── T mode: T input also to K (J and K share the same source for T mode) ─
    // In T mode (steps 5–6) T is driven from col 4 row a to IC pin 'k' as well.
    // We include a second wire from col 4 → k for the T mode demo.
    // The w_k_jk1 wire can be replaced by this T wire in practice.
    { id: 'w_t_jk1', type: 'wire', color: 'purple',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'jk1', pin: 'k' } },

    // ── Q output path (TOP bank, row 'c') ─────────────────────────────────
    { id: 'r_q',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'c' } },
    { id: 'led_q', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 25, row: 'c' } },

    { id: 'w_q_out', type: 'wire', color: 'green',
      from: { ic: 'jk1', pin: 'out' },
      to:   { component: 'r_q', end: 'p1' } },
    { id: 'w_q_led', type: 'wire', color: 'green',
      from: { component: 'r_q', end: 'p2' },
      to:   { led: 'led_q', end: 'anode' } },
    { id: 'w_q_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },

    // ── Q_bar output path (BOTTOM bank, row 'h') ──────────────────────────
    { id: 'r_qbar',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'h' } },
    { id: 'led_qbar', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 25, row: 'h' } },

    { id: 'w_qbar_out', type: 'wire', color: 'orange',
      from: { ic: 'jk1', pin: 'q_bar' },
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
        'Holes in the same column and bank are electrically connected. ' +
        'The centre gap isolates the two banks so ICs straddle it.',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC76 JK flip-flop IC',
      body:
        'Mount the 74HC76 straddling the centre gap at column 5. ' +
        'Gate 1 pins: CLK (col 5,e), SET_bar (col 6,e), K (col 7,e), J (col 8,e), ' +
        'Q_bar (col 9,e), Q (col 10,e). ' +
        'This is a falling-edge-triggered JK FF with active-low async controls.',
      show: ['bb', 'jk1'],
      highlight: 'jk1',
    },
    {
      title: 'Tie SET_bar and CLR_bar HIGH (async controls inactive)',
      body:
        'Red wires: SET_bar (col 6,e) → VCC, CLR_bar (col 6,f) → VCC. ' +
        'Pulling these HIGH disables the asynchronous preset and clear. ' +
        'Q is now controlled only by J, K, and the falling clock edge.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc'],
      activeInputs: { J: 0, K: 0, CLK: 0 },
    },
    {
      title: 'Wire J, K, and CLK inputs (JK mode)',
      body:
        'Blue wire: col 1 row a → J input. ' +
        'Orange wire: col 2 row a → K input. ' +
        'Yellow wire: col 3 row a → CLK input. ' +
        'J and K are sampled on the falling clock edge (HIGH→LOW transition).',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_j_jk1', 'w_k_jk1', 'w_clk_jk1'],
      activeInputs: { J: 0, K: 0, CLK: 0 },
    },
    {
      title: 'Add Q and Q̄ output LEDs',
      body:
        'Green LED (Q) — top bank row c: r_q at col 20, led_q at col 25. ' +
        'Yellow LED (Q̄) — bottom bank row h: r_qbar at col 20, led_qbar at col 25. ' +
        'Connect output wires from IC Q → r_q → led_q → GND, and IC Q̄ → r_qbar → led_qbar → GND.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_j_jk1', 'w_k_jk1', 'w_clk_jk1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { J: 0, K: 0, CLK: 0 },
    },
    {
      title: 'JK Test: J=1, K=0 → SET on falling edge',
      body:
        'Set J=1, K=0. Pulse CLK HIGH→LOW (falling edge). ' +
        'JK truth: J=1 K=0 → Q=1 (SET). ' +
        'Green LED turns ON, yellow LED turns OFF.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_j_jk1', 'w_k_jk1', 'w_clk_jk1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      highlight: 'led_q',
      activeInputs: { J: 1, K: 0, CLK: 0 },
    },
    {
      title: 'JK Test: J=0, K=1 → RESET on falling edge',
      body:
        'Set J=0, K=1. Pulse CLK HIGH→LOW. ' +
        'JK truth: J=0 K=1 → Q=0 (RESET). ' +
        'Green LED turns OFF, yellow LED turns ON.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_j_jk1', 'w_k_jk1', 'w_clk_jk1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { J: 0, K: 1, CLK: 0 },
    },
    {
      title: 'JK Test: J=1, K=1 → TOGGLE on falling edge',
      body:
        'Set J=1, K=1. Pulse CLK HIGH→LOW. ' +
        'JK truth: J=1 K=1 → Q toggles (Q_next = NOT Q). ' +
        'If Q was 0, it becomes 1. Pulse again to toggle back. ' +
        'This makes the JK FF a frequency divider.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_j_jk1', 'w_k_jk1', 'w_clk_jk1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { J: 1, K: 1, CLK: 0 },
    },
    {
      title: 'Rewire for T mode: connect T to both J and K',
      body:
        'Remove the separate J and K wires. ' +
        'Connect a single T input (col 4 row a, purple wire) to both J and K pins. ' +
        'With J=K=T: when T=0 the FF holds, when T=1 the FF toggles on each clock edge. ' +
        'This is identical to a T flip-flop — useful for binary counters.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_t_jk1', 'w_clk_jk1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      activeInputs: { J: 1, K: 1, CLK: 0 },
    },
    {
      title: 'T mode: T=1 → Q toggles on every falling clock edge',
      body:
        'Set T=1 (so J=K=1). Pulse CLK repeatedly. ' +
        'Q toggles every clock cycle: 0→1→0→1→… ' +
        'The output frequency is exactly half the clock frequency — a ÷2 divider. ' +
        'This is the basis of binary ripple counters.',
      show: ['bb', 'jk1', 'w_set_vcc', 'w_clr_vcc',
             'w_t_jk1', 'w_clk_jk1',
             'r_q', 'led_q', 'r_qbar', 'led_qbar',
             'w_q_out', 'w_q_led', 'w_q_gnd',
             'w_qbar_out', 'w_qbar_led', 'w_qbar_gnd'],
      highlight: 'led_q',
      activeInputs: { J: 1, K: 1, CLK: 1 },
    },
  ],

  truthTable: {
    inputs:  ['J', 'K', 'CLK'],
    outputs: ['Q'],
    rows: [
      { inputs: { J: 0, K: 0, CLK: 0 }, outputs: { Q: 0 } },  // HOLD (Q was 0)
      { inputs: { J: 0, K: 1, CLK: 0 }, outputs: { Q: 0 } },  // RESET
      { inputs: { J: 1, K: 0, CLK: 0 }, outputs: { Q: 1 } },  // SET
      { inputs: { J: 1, K: 1, CLK: 0 }, outputs: { Q: 1 } },  // TOGGLE (shown from Q=0)
    ],
  },
};
