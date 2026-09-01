import { type Circuit } from '@/labs/types';

// ── Parity Checker/Generator ─────────────────────────────────────────────────
// 4-bit even parity: P = B3 ⊕ B2 ⊕ B1 ⊕ B0
//
// xor1 (col 4, row e) : B3 ⊕ B2
// xor2 (col 11, row e): B1 ⊕ B0
// xor3 (col 18, row e): (B3⊕B2) ⊕ (B1⊕B0) = P
//
// Output path (TOP bank, row c):
//   xor3.Y → r_p (col 22) → led_p (col 26) → GND

export const ParityChecker: Circuit = {
  id: 'parity-checker',
  title: 'Even and Odd Parity Checker/Generator',
  description:
    'Build a 4-bit even parity generator using an XOR gate chain. ' +
    'Verify error detection by checking parity of received data plus parity bit.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── XOR gates ─────────────────────────────────────────────────────────
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 4,  row: 'e' } },
    { id: 'xor2', type: 'xor-gate', mountedAt: { board: 'bb', col: 11, row: 'e' } },
    { id: 'xor3', type: 'xor-gate', mountedAt: { board: 'bb', col: 18, row: 'e' } },

    // ── Output path ───────────────────────────────────────────────────────
    { id: 'r_p',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'led_p', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 26, row: 'c' } },

    // ── Input wires: B3, B2 → xor1 ───────────────────────────────────────
    { id: 'w_b3_xor1', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'xor1', pin: 'A' } },
    { id: 'w_b2_xor1', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { ic: 'xor1', pin: 'B' } },

    // ── Input wires: B1, B0 → xor2 ───────────────────────────────────────
    { id: 'w_b1_xor2', type: 'wire', color: 'red',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'xor2', pin: 'A' } },
    { id: 'w_b0_xor2', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'xor2', pin: 'B' } },

    // ── Internal: xor1.Y → xor3.A, xor2.Y → xor3.B ───────────────────────
    { id: 'w_xor1_xor3', type: 'wire', color: 'orange',
      from: { ic: 'xor1', pin: 'Y' },
      to:   { ic: 'xor3', pin: 'A' } },
    { id: 'w_xor2_xor3', type: 'wire', color: 'purple',
      from: { ic: 'xor2', pin: 'Y' },
      to:   { ic: 'xor3', pin: 'B' } },

    // ── Output: xor3.Y → r_p → led_p → GND ──────────────────────────────
    { id: 'w_xor3_rp', type: 'wire', color: 'green',
      from: { ic: 'xor3', pin: 'Y' },
      to:   { component: 'r_p', end: 'p1' } },
    { id: 'w_rp_led', type: 'wire', color: 'green',
      from: { component: 'r_p', end: 'p2' },
      to:   { led: 'led_p', end: 'anode' } },
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led_p', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the solderless breadboard. The centre gap isolates both banks. ' +
        'Red rail = VCC (+5 V), blue rail = GND. ' +
        'We will build a 4-bit even parity generator using three XOR gates chained together.',
      show: ['bb'],
    },
    {
      title: 'Place xor1 — first stage (B3 ⊕ B2)',
      body: 'Mount a 74HC86 XOR gate at column 4, row e. ' +
        'This gate computes the XOR of the two most-significant bits B3 and B2.',
      show: ['bb', 'xor1'],
      highlight: 'xor1',
    },
    {
      title: 'Place xor2 — second stage (B1 ⊕ B0)',
      body: 'Mount a second 74HC86 XOR gate at column 11. ' +
        'This gate computes the XOR of the two least-significant bits B1 and B0.',
      show: ['bb', 'xor1', 'xor2'],
      highlight: 'xor2',
    },
    {
      title: 'Place xor3 — final stage (parity bit P)',
      body: 'Mount a third 74HC86 XOR gate at column 18. ' +
        'This gate combines the outputs of xor1 and xor2: P = (B3⊕B2)⊕(B1⊕B0).',
      show: ['bb', 'xor1', 'xor2', 'xor3'],
      highlight: 'xor3',
    },
    {
      title: 'Wire inputs B3, B2, B1, B0',
      body: 'Red wires: col 1 row a → xor1.A (B3), col 2 row a → xor2.A (B1). ' +
        'Blue wires: col 1 row b → xor1.B (B2), col 2 row b → xor2.B (B0).',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b2_xor1', 'w_b1_xor2', 'w_b0_xor2'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Connect internal wires (xor1.Y → xor3.A, xor2.Y → xor3.B)',
      body: 'Orange wire: xor1 output → xor3 input A. ' +
        'Purple wire: xor2 output → xor3 input B. ' +
        'The two partial parities now feed the final XOR stage.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b2_xor1', 'w_b1_xor2', 'w_b0_xor2',
             'w_xor1_xor3', 'w_xor2_xor3'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Add resistor and parity LED',
      body: 'Insert 330 Ω resistor at col 22, row c (p1=22, p2=25). ' +
        'Insert green LED at col 26, row c (anode=26, cathode=27). ' +
        'Wire: xor3.Y → r_p.p1; r_p.p2 → led_p.anode; led_p.cathode → GND rail.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b2_xor1', 'w_b1_xor2', 'w_b0_xor2',
             'w_xor1_xor3', 'w_xor2_xor3',
             'r_p', 'led_p', 'w_xor3_rp', 'w_rp_led', 'w_led_gnd'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Test: B=0000 → P=0 (even)',
      body: 'All four inputs LOW. XOR of all zeros = 0. Even parity bit = 0. LED OFF. ' +
        'Even parity means the total count of 1s (including P) is even.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b2_xor1', 'w_b1_xor2', 'w_b0_xor2',
             'w_xor1_xor3', 'w_xor2_xor3',
             'r_p', 'led_p', 'w_xor3_rp', 'w_rp_led', 'w_led_gnd'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Test: B=1010 → P=0 (even)',
      body: 'B3=1, B2=0, B1=1, B0=0. XOR chain: 1⊕0=1, 1⊕0=1, 1⊕1=0. P=0. LED OFF. ' +
        'Data has 2 ones — already even, so parity bit = 0.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b2_xor1', 'w_b1_xor2', 'w_b0_xor2',
             'w_xor1_xor3', 'w_xor2_xor3',
             'r_p', 'led_p', 'w_xor3_rp', 'w_rp_led', 'w_led_gnd'],
      activeInputs: { B3: 1, B2: 0, B1: 1, B0: 0 },
    },
    {
      title: 'Test: B=1011 → P=1 (odd data, parity corrects)',
      body: 'B3=1, B2=0, B1=1, B0=1. XOR chain: 1⊕0=1, 1⊕1=0, 1⊕0=1. P=1. LED ON. ' +
        'Data has 3 ones — odd count, so parity bit = 1 to make total even.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b2_xor1', 'w_b1_xor2', 'w_b0_xor2',
             'w_xor1_xor3', 'w_xor2_xor3',
             'r_p', 'led_p', 'w_xor3_rp', 'w_rp_led', 'w_led_gnd'],
      activeInputs: { B3: 1, B2: 0, B1: 1, B0: 1 },
      highlight: 'led_p',
    },
  ],

  truthTable: {
    inputs:  ['B3', 'B2', 'B1', 'B0'],
    outputs: ['P'],
    rows: [
      { inputs: { B3: 0, B2: 0, B1: 0, B0: 0 }, outputs: { P: 0 } },
      { inputs: { B3: 1, B2: 0, B1: 1, B0: 0 }, outputs: { P: 0 } },
      { inputs: { B3: 1, B2: 0, B1: 1, B0: 1 }, outputs: { P: 1 } },
      { inputs: { B3: 1, B2: 1, B1: 0, B0: 0 }, outputs: { P: 0 } },
    ],
  },
};
