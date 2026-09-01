import { type Circuit } from '@/labs/types';

// ── SR Latch (74HC279) ────────────────────────────────────────────────────
//
// 74HC279 pin layout (latch 1, gate at col 5):
//   e-bank: S=p1(col5), R=p2(col6), Q=p3(col7), ... GND=p8(col11)
//   f-bank: VCC=p16(col5)
//
// Active-low inputs: S_bar=LOW → SET (Q=1), R_bar=LOW → RESET (Q=0)
//
// Output path (TOP bank, row 'c'):
//   IC q (col7,e) → w_q_out → r_q.p1 (col19,c)
//   r_q.p2 (col22,c) → w_q_led → led_q.anode (col24,c)
//   led_q.cathode (col25,c) → w_q_gnd → gnd_top

export const SRLatchCircuit: Circuit = {
  id: 'sr-latch',
  title: 'SR Latch using 74HC279',
  description:
    'Construct and test an SR latch using the 74HC279 quad SR latch IC. ' +
    'Demonstrate set, reset, hold, and forbidden states.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── IC ────────────────────────────────────────────────────────────────
    { id: 'sr1', type: 'sr-latch', mountedAt: { board: 'bb', col: 5, row: 'e' } },

    // ── Output path: Q → resistor → LED → GND (top bank, row 'c') ────────
    { id: 'r_q',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 19, row: 'c' } },
    { id: 'led_q', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 24, row: 'c' } },

    // ── Input wires (active-low) ──────────────────────────────────────────
    // S_bar: col 1 row a → IC pin 's'
    { id: 'w_s_sr1', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'sr1', pin: 's' } },
    // R_bar: col 2 row a → IC pin 'r'
    { id: 'w_r_sr1', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'sr1', pin: 'r' } },

    // ── Output wires: q → r_q → led_q → GND ─────────────────────────────
    { id: 'w_q_out', type: 'wire', color: 'green',
      from: { ic: 'sr1', pin: 'q' },
      to:   { component: 'r_q', end: 'p1' } },
    { id: 'w_q_led', type: 'wire', color: 'green',
      from: { component: 'r_q', end: 'p2' },
      to:   { led: 'led_q', end: 'anode' } },
    { id: 'w_q_gnd', type: 'wire', color: 'black',
      from: { led: 'led_q', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body:
        'The solderless breadboard is your build surface. ' +
        'Holes in the same column and bank (a–e or f–j) are electrically connected. ' +
        'The centre gap isolates the two banks so ICs straddle it. ' +
        'Red rail = VCC (+5 V), blue rail = GND (0 V).',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC279 SR latch IC',
      body:
        'Mount the 74HC279 straddling the centre gap at column 5. ' +
        'The IC contains four independent SR latches. ' +
        'We use latch 1: S_bar at col 5 (e), R_bar at col 6 (e), Q at col 7 (e). ' +
        'Active-low inputs mean a LOW signal activates Set or Reset.',
      show: ['bb', 'sr1'],
      highlight: 'sr1',
    },
    {
      title: 'Wire the S_bar and R_bar inputs',
      body:
        'Blue wire: col 1 row a → IC pin S_bar. ' +
        'Orange wire: col 2 row a → IC pin R_bar. ' +
        'These board tie points are your external input nodes. ' +
        'Driving a node LOW (to GND) activates that input.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1'],
      activeInputs: { S_bar: 1, R_bar: 1 },
    },
    {
      title: 'Add 330 Ω current-limiting resistor',
      body:
        'Insert the 330 Ω resistor at col 19 row c (top bank). ' +
        'This limits current through the LED to a safe ~10 mA. ' +
        'r_q.p1 is at col 19, r_q.p2 is at col 22.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1', 'r_q'],
      activeInputs: { S_bar: 1, R_bar: 1 },
    },
    {
      title: 'Add the Q-output LED',
      body:
        'Place the green LED at col 24 row c (top bank). ' +
        'Anode at col 24, cathode at col 25. ' +
        'When Q is HIGH the LED glows, indicating the SET state.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1', 'r_q', 'led_q'],
      activeInputs: { S_bar: 1, R_bar: 1 },
    },
    {
      title: 'Connect the output path',
      body:
        'Green wire: IC pin Q → r_q.p1. ' +
        'Green wire: r_q.p2 → led_q anode. ' +
        'Black wire: led_q cathode → GND rail. ' +
        'The circuit is now complete.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1',
             'r_q', 'led_q', 'w_q_out', 'w_q_led', 'w_q_gnd'],
      activeInputs: { S_bar: 1, R_bar: 1 },
    },
    {
      title: 'Test RESET: S_bar=1, R_bar=0 → Q=0',
      body:
        'Pull R_bar LOW (R_bar=0) while S_bar stays HIGH (S_bar=1). ' +
        'The reset input is active → Q goes LOW → LED is OFF. ' +
        'The latch is in RESET state.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1',
             'r_q', 'led_q', 'w_q_out', 'w_q_led', 'w_q_gnd'],
      activeInputs: { S_bar: 1, R_bar: 0 },
    },
    {
      title: 'Test SET: S_bar=0, R_bar=1 → Q=1',
      body:
        'Now pull S_bar LOW (S_bar=0) while R_bar returns HIGH (R_bar=1). ' +
        'The set input is active → Q goes HIGH → LED turns ON. ' +
        'The latch is in SET state.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1',
             'r_q', 'led_q', 'w_q_out', 'w_q_led', 'w_q_gnd'],
      highlight: 'led_q',
      activeInputs: { S_bar: 0, R_bar: 1 },
    },
    {
      title: 'Test HOLD: S_bar=1, R_bar=1 → Q unchanged',
      body:
        'Release both inputs (both HIGH). ' +
        'Neither Set nor Reset is active → Q retains its previous value. ' +
        'The LED stays ON (Q was SET). This is memory — the latch holds its state.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1',
             'r_q', 'led_q', 'w_q_out', 'w_q_led', 'w_q_gnd'],
      activeInputs: { S_bar: 1, R_bar: 1 },
    },
    {
      title: 'Test FORBIDDEN state: S_bar=0, R_bar=0 → Q=undefined',
      body:
        'Drive BOTH S_bar and R_bar LOW simultaneously. ' +
        'This is the forbidden state — both SET and RESET are asserted at once. ' +
        'Q becomes indeterminate (shown as X). ' +
        'When inputs return to HOLD the output is unpredictable. Avoid this in real designs.',
      show: ['bb', 'sr1', 'w_s_sr1', 'w_r_sr1',
             'r_q', 'led_q', 'w_q_out', 'w_q_led', 'w_q_gnd'],
      activeInputs: { S_bar: 0, R_bar: 0 },
    },
  ],

  truthTable: {
    inputs:  ['S_bar', 'R_bar'],
    outputs: ['Q'],
    rows: [
      { inputs: { S_bar: 1, R_bar: 0 }, outputs: { Q: 0 } },  // RESET
      { inputs: { S_bar: 0, R_bar: 1 }, outputs: { Q: 1 } },  // SET
      { inputs: { S_bar: 1, R_bar: 1 }, outputs: { Q: 0 } },  // HOLD (shown after RESET)
    ],
  },
};
