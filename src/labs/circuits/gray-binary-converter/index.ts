import { type Circuit } from '@/labs/types';

// ── Gray Code to Binary Converter ────────────────────────────────────────────
// Binary → Gray:  G3=B3,  G2=B3⊕B2,  G1=B2⊕B1,  G0=B1⊕B0
//
// Circuit uses 3 XOR gates for G2, G1, G0.
// G3 = B3 is a straight wire (no gate needed).
//
// Layout:
//   xor1  (col 5, e)  → G2 = B3 XOR B2
//   xor2  (col 12, e) → G1 = B2 XOR B1
//   xor3  (col 19, e) → G0 = B1 XOR B0
//
// Output paths:
//   G3: direct wire B3 → r_g3 (col 22, h) → led_g3 (col 26, h)
//   G2: xor1.Y → r_g2 (col 8,  c) → led_g2 (col 12, c)
//   G1: xor2.Y → r_g1 (col 15, c) → led_g1 (col 19, c)
//   G0: xor3.Y → r_g0 (col 22, c) → led_g0 (col 26, c)

export const GrayBinaryConverter: Circuit = {
  id: 'gray-binary-converter',
  title: 'Gray Code to Binary and Binary to Gray Code Converters',
  description:
    'Demonstrates the Binary-to-Gray code conversion using three XOR gates. ' +
    'G3=B3 (pass-through), G2=B3⊕B2, G1=B2⊕B1, G0=B1⊕B0. ' +
    'Gray code has the property that adjacent values differ by exactly one bit.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Gate ICs ──────────────────────────────────────────────────────────
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 5,  row: 'e' } }, // G2
    { id: 'xor2', type: 'xor-gate', mountedAt: { board: 'bb', col: 12, row: 'e' } }, // G1
    { id: 'xor3', type: 'xor-gate', mountedAt: { board: 'bb', col: 19, row: 'e' } }, // G0

    // ── Resistors ─────────────────────────────────────────────────────────
    { id: 'r_g3', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'h' } },
    { id: 'r_g2', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 8,  row: 'c' } },
    { id: 'r_g1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 15, row: 'c' } },
    { id: 'r_g0', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_g3', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 26, row: 'h' } },
    { id: 'led_g2', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 12, row: 'c' } },
    { id: 'led_g1', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 19, row: 'c' } },
    { id: 'led_g0', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 26, row: 'c' } },

    // ── Input wires ───────────────────────────────────────────────────────
    // B3 → xor1.A and r_g3 (G3 pass-through)
    { id: 'w_b3_xor1', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'xor1', pin: 'A' } },
    { id: 'w_b3_g3', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { component: 'r_g3', end: 'p1' } },

    // B2 → xor1.B and xor2.A
    { id: 'w_b2_xor1', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'xor1', pin: 'B' } },
    { id: 'w_b2_xor2', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'xor2', pin: 'A' } },

    // B1 → xor2.B and xor3.A
    { id: 'w_b1_xor2', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 3, row: 'a' },
      to:   { ic: 'xor2', pin: 'B' } },
    { id: 'w_b1_xor3', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 3, row: 'b' },
      to:   { ic: 'xor3', pin: 'A' } },

    // B0 → xor3.B
    { id: 'w_b0_xor3', type: 'wire', color: 'green',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'xor3', pin: 'B' } },

    // ── Output wires: XOR outputs → resistors → LEDs → GND ───────────────
    { id: 'w_g3_led',  type: 'wire', color: 'red',
      from: { component: 'r_g3', end: 'p2' }, to: { led: 'led_g3', end: 'anode' } },
    { id: 'w_g3_gnd',  type: 'wire', color: 'black',
      from: { led: 'led_g3', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 4 } },

    { id: 'w_xor1_r',  type: 'wire', color: 'yellow',
      from: { ic: 'xor1', pin: 'Y' }, to: { component: 'r_g2', end: 'p1' } },
    { id: 'w_g2_led',  type: 'wire', color: 'yellow',
      from: { component: 'r_g2', end: 'p2' }, to: { led: 'led_g2', end: 'anode' } },
    { id: 'w_g2_gnd',  type: 'wire', color: 'black',
      from: { led: 'led_g2', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },

    { id: 'w_xor2_r',  type: 'wire', color: 'green',
      from: { ic: 'xor2', pin: 'Y' }, to: { component: 'r_g1', end: 'p1' } },
    { id: 'w_g1_led',  type: 'wire', color: 'green',
      from: { component: 'r_g1', end: 'p2' }, to: { led: 'led_g1', end: 'anode' } },
    { id: 'w_g1_gnd',  type: 'wire', color: 'black',
      from: { led: 'led_g1', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },

    { id: 'w_xor3_r',  type: 'wire', color: 'blue',
      from: { ic: 'xor3', pin: 'Y' }, to: { component: 'r_g0', end: 'p1' } },
    { id: 'w_g0_led',  type: 'wire', color: 'blue',
      from: { component: 'r_g0', end: 'p2' }, to: { led: 'led_g0', end: 'anode' } },
    { id: 'w_g0_gnd',  type: 'wire', color: 'black',
      from: { led: 'led_g0', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 3 } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'The binary-to-Gray converter uses three XOR gates. ' +
        'MSB G3 passes straight through (G3=B3). ' +
        'Each lower bit is XORed with the next-higher binary bit.',
      show: ['bb'],
    },
    {
      title: 'Place the three XOR gates',
      body: 'Mount xor1 (74HC86) at col 5 for G2 = B3 ⊕ B2. ' +
        'Mount xor2 at col 12 for G1 = B2 ⊕ B1. ' +
        'Mount xor3 at col 19 for G0 = B1 ⊕ B0.',
      show: ['bb', 'xor1', 'xor2', 'xor3'],
      highlight: 'xor1',
    },
    {
      title: 'Wire all inputs',
      body: 'B3 (col 1): fans to xor1.A and r_g3 (G3 pass-through). ' +
        'B2 (col 2): fans to xor1.B and xor2.A. ' +
        'B1 (col 3): fans to xor2.B and xor3.A. ' +
        'B0 (col 4): goes to xor3.B only.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b3_g3', 'w_b2_xor1', 'w_b2_xor2',
             'w_b1_xor2', 'w_b1_xor3', 'w_b0_xor3'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Add resistors and LEDs',
      body: 'Place 330 Ω resistors for each output. ' +
        'G3 (red LED) in bottom bank at col 22–26 row h (isolated from G0). ' +
        'G2 (yellow), G1 (green), G0 (blue) in top bank at cols 8, 15, 22. ' +
        'Connect GND returns.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b3_g3', 'w_b2_xor1', 'w_b2_xor2',
             'w_b1_xor2', 'w_b1_xor3', 'w_b0_xor3',
             'r_g3', 'r_g2', 'r_g1', 'r_g0',
             'led_g3', 'led_g2', 'led_g1', 'led_g0'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Connect all output wires',
      body: 'Connect XOR outputs to resistors, resistors to LED anodes, and LED cathodes to GND rail. ' +
        'B3 passthrough wire to r_g3.p1. Four output LED paths completed.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b3_g3', 'w_b2_xor1', 'w_b2_xor2',
             'w_b1_xor2', 'w_b1_xor3', 'w_b0_xor3',
             'r_g3', 'r_g2', 'r_g1', 'r_g0',
             'led_g3', 'led_g2', 'led_g1', 'led_g0',
             'w_g3_led', 'w_g3_gnd',
             'w_xor1_r', 'w_g2_led', 'w_g2_gnd',
             'w_xor2_r', 'w_g1_led', 'w_g1_gnd',
             'w_xor3_r', 'w_g0_led', 'w_g0_gnd'],
      activeInputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
    },
    {
      title: 'Test: Binary 0011 → Gray 0010',
      body: 'Set B3=0, B2=0, B1=1, B0=1. Expected Gray: G3=0, G2=0, G1=1, G0=0. ' +
        'Only G1 (green LED) should light. ' +
        'G1 = B2⊕B1 = 0⊕1 = 1, G0 = B1⊕B0 = 1⊕1 = 0.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b3_g3', 'w_b2_xor1', 'w_b2_xor2',
             'w_b1_xor2', 'w_b1_xor3', 'w_b0_xor3',
             'r_g3', 'r_g2', 'r_g1', 'r_g0',
             'led_g3', 'led_g2', 'led_g1', 'led_g0',
             'w_g3_led', 'w_g3_gnd',
             'w_xor1_r', 'w_g2_led', 'w_g2_gnd',
             'w_xor2_r', 'w_g1_led', 'w_g1_gnd',
             'w_xor3_r', 'w_g0_led', 'w_g0_gnd'],
      activeInputs: { B3: 0, B2: 0, B1: 1, B0: 1 },
      highlight: 'led_g1',
    },
    {
      title: 'Test: Binary 0111 → Gray 0100',
      body: 'Set B3=0, B2=1, B1=1, B0=1. Expected Gray: G3=0, G2=1, G1=0, G0=0. ' +
        'Only G2 (yellow LED) should light. ' +
        'G2 = B3⊕B2 = 0⊕1 = 1.',
      show: ['bb', 'xor1', 'xor2', 'xor3',
             'w_b3_xor1', 'w_b3_g3', 'w_b2_xor1', 'w_b2_xor2',
             'w_b1_xor2', 'w_b1_xor3', 'w_b0_xor3',
             'r_g3', 'r_g2', 'r_g1', 'r_g0',
             'led_g3', 'led_g2', 'led_g1', 'led_g0',
             'w_g3_led', 'w_g3_gnd',
             'w_xor1_r', 'w_g2_led', 'w_g2_gnd',
             'w_xor2_r', 'w_g1_led', 'w_g1_gnd',
             'w_xor3_r', 'w_g0_led', 'w_g0_gnd'],
      activeInputs: { B3: 0, B2: 1, B1: 1, B0: 1 },
      highlight: 'led_g2',
    },
  ],

  truthTable: {
    inputs:  ['B3', 'B2', 'B1', 'B0'],
    outputs: ['G3', 'G2', 'G1', 'G0'],
    rows: [
      { inputs: { B3: 0, B2: 0, B1: 0, B0: 0 }, outputs: { G3: 0, G2: 0, G1: 0, G0: 0 } },
      { inputs: { B3: 0, B2: 0, B1: 0, B0: 1 }, outputs: { G3: 0, G2: 0, G1: 0, G0: 1 } },
      { inputs: { B3: 0, B2: 0, B1: 1, B0: 0 }, outputs: { G3: 0, G2: 0, G1: 1, G0: 1 } },
      { inputs: { B3: 0, B2: 0, B1: 1, B0: 1 }, outputs: { G3: 0, G2: 0, G1: 1, G0: 0 } },
      { inputs: { B3: 0, B2: 1, B1: 0, B0: 0 }, outputs: { G3: 0, G2: 1, G1: 1, G0: 0 } },
      { inputs: { B3: 0, B2: 1, B1: 0, B0: 1 }, outputs: { G3: 0, G2: 1, G1: 1, G0: 1 } },
      { inputs: { B3: 0, B2: 1, B1: 1, B0: 0 }, outputs: { G3: 0, G2: 1, G1: 0, G0: 1 } },
      { inputs: { B3: 0, B2: 1, B1: 1, B0: 1 }, outputs: { G3: 0, G2: 1, G1: 0, G0: 0 } },
    ],
  },
};
