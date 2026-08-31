import { type Circuit } from '@/labs/types';

// ── Full Adder Ripple Carry (2-bit) ──────────────────────────────────────
// DIGITAL with simulation.
// 2-bit ripple carry adder: chain two full adders.
//
// FA1: xor1(col3,e), and1(col3,h), xor2(col8,e), and2(col8,h), or1(col13,e)
// FA2: xor3(col18,e), and3(col18,h), xor4(col23,e), and4(col23,h), or2(col28,e)
//
// Inputs: A0, B0 → FA1;  A1, B1 → FA2;  Cin = GND.
// Carry out of FA1 (or1.Y) → FA2 Cin (xor4.B, and4.B).
// Outputs: S0 = xor2.Y, S1 = xor4.Y, Cout = or2.Y → resistors → LEDs → GND.

export const FullAdderRippleCircuit: Circuit = {
  id: 'full-adder-ripple',
  title: '2-Bit Ripple Carry Adder',
  description:
    'A 2-bit ripple carry adder built from two cascaded full adders. Each full adder uses ' +
    '2 XOR gates, 2 AND gates, and 1 OR gate. The carry-out of FA1 feeds the carry-in of FA2. ' +
    'Inputs: A1A0 + B1B0 + Cin. Outputs: Cout, S1, S0.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── FA1 gates ─────────────────────────────────────────────────────────
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 3,  row: 'e' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 3,  row: 'h' } },
    { id: 'xor2', type: 'xor-gate', mountedAt: { board: 'bb', col: 8,  row: 'e' } },
    { id: 'and2', type: 'and-gate', mountedAt: { board: 'bb', col: 8,  row: 'h' } },
    { id: 'or1',  type: 'or-gate',  mountedAt: { board: 'bb', col: 13, row: 'e' } },

    // ── FA2 gates ─────────────────────────────────────────────────────────
    { id: 'xor3', type: 'xor-gate', mountedAt: { board: 'bb', col: 18, row: 'e' } },
    { id: 'and3', type: 'and-gate', mountedAt: { board: 'bb', col: 18, row: 'h' } },
    { id: 'xor4', type: 'xor-gate', mountedAt: { board: 'bb', col: 23, row: 'e' } },
    { id: 'and4', type: 'and-gate', mountedAt: { board: 'bb', col: 23, row: 'h' } },
    { id: 'or2',  type: 'or-gate',  mountedAt: { board: 'bb', col: 28, row: 'e' } },

    // ── Output resistors ──────────────────────────────────────────────────
    { id: 'r_s0',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 33, row: 'c' } },
    { id: 'r_s1',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 33, row: 'h' } },
    { id: 'r_cout', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 38, row: 'c' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_s0',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 37, row: 'c' } },
    { id: 'led_s1',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 37, row: 'h' } },
    { id: 'led_cout', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 42, row: 'c' } },

    // ── FA1 inputs: A0, B0 ────────────────────────────────────────────────
    { id: 'w_a0_xor1', type: 'wire', color: 'red',  from: { board: 'bb', col: 1, row: 'a' }, to: { ic: 'xor1', pin: 'A' } },
    { id: 'w_a0_and1', type: 'wire', color: 'red',  from: { board: 'bb', col: 1, row: 'b' }, to: { ic: 'and1', pin: 'A' } },
    { id: 'w_b0_xor1', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'xor1', pin: 'B' } },
    { id: 'w_b0_and1', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'b' }, to: { ic: 'and1', pin: 'B' } },

    // ── FA1 Cin = GND ─────────────────────────────────────────────────────
    { id: 'w_cin_xor2', type: 'wire', color: 'black', from: { board: 'bb', rail: 'gnd_top', col: 7 }, to: { ic: 'xor2', pin: 'B' } },
    { id: 'w_cin_and2', type: 'wire', color: 'black', from: { board: 'bb', rail: 'gnd_top', col: 8 }, to: { ic: 'and2', pin: 'B' } },

    // ── FA1 internal wires ────────────────────────────────────────────────
    { id: 'w_xor1_xor2', type: 'wire', color: 'white', from: { ic: 'xor1', pin: 'Y' }, to: { ic: 'xor2', pin: 'A' } },
    { id: 'w_xor1_and2', type: 'wire', color: 'white', from: { ic: 'xor1', pin: 'Y' }, to: { ic: 'and2', pin: 'A' } },
    { id: 'w_and1_or1',  type: 'wire', color: 'yellow', from: { ic: 'and1', pin: 'Y' }, to: { ic: 'or1', pin: 'A' } },
    { id: 'w_and2_or1',  type: 'wire', color: 'yellow', from: { ic: 'and2', pin: 'Y' }, to: { ic: 'or1', pin: 'B' } },

    // ── FA2 inputs: A1, B1 ────────────────────────────────────────────────
    { id: 'w_a1_xor3', type: 'wire', color: 'red',  from: { board: 'bb', col: 16, row: 'a' }, to: { ic: 'xor3', pin: 'A' } },
    { id: 'w_a1_and3', type: 'wire', color: 'red',  from: { board: 'bb', col: 16, row: 'b' }, to: { ic: 'and3', pin: 'A' } },
    { id: 'w_b1_xor3', type: 'wire', color: 'blue', from: { board: 'bb', col: 17, row: 'a' }, to: { ic: 'xor3', pin: 'B' } },
    { id: 'w_b1_and3', type: 'wire', color: 'blue', from: { board: 'bb', col: 17, row: 'b' }, to: { ic: 'and3', pin: 'B' } },

    // ── Carry propagation: FA1 carry (or1.Y) → FA2 Cin (xor4.B, and4.B) ─
    { id: 'w_carry_xor4', type: 'wire', color: 'purple', from: { ic: 'or1', pin: 'Y' }, to: { ic: 'xor4', pin: 'B' } },
    { id: 'w_carry_and4', type: 'wire', color: 'purple', from: { ic: 'or1', pin: 'Y' }, to: { ic: 'and4', pin: 'B' } },

    // ── FA2 internal wires ────────────────────────────────────────────────
    { id: 'w_xor3_xor4', type: 'wire', color: 'white', from: { ic: 'xor3', pin: 'Y' }, to: { ic: 'xor4', pin: 'A' } },
    { id: 'w_xor3_and4', type: 'wire', color: 'white', from: { ic: 'xor3', pin: 'Y' }, to: { ic: 'and4', pin: 'A' } },
    { id: 'w_and3_or2',  type: 'wire', color: 'yellow', from: { ic: 'and3', pin: 'Y' }, to: { ic: 'or2', pin: 'A' } },
    { id: 'w_and4_or2',  type: 'wire', color: 'yellow', from: { ic: 'and4', pin: 'Y' }, to: { ic: 'or2', pin: 'B' } },

    // ── S0 output: xor2.Y → r_s0 → led_s0 → GND ─────────────────────────
    { id: 'w_s0_r',   type: 'wire', color: 'green', from: { ic: 'xor2', pin: 'Y' },       to: { component: 'r_s0', end: 'p1' } },
    { id: 'w_s0_led', type: 'wire', color: 'green', from: { component: 'r_s0', end: 'p2' }, to: { led: 'led_s0', end: 'anode' } },
    { id: 'w_s0_gnd', type: 'wire', color: 'black', from: { led: 'led_s0', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 38 } },

    // ── S1 output: xor4.Y → r_s1 → led_s1 → GND ─────────────────────────
    { id: 'w_s1_r',   type: 'wire', color: 'green', from: { ic: 'xor4', pin: 'Y' },       to: { component: 'r_s1', end: 'p1' } },
    { id: 'w_s1_led', type: 'wire', color: 'green', from: { component: 'r_s1', end: 'p2' }, to: { led: 'led_s1', end: 'anode' } },
    { id: 'w_s1_gnd', type: 'wire', color: 'black', from: { led: 'led_s1', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 39 } },

    // ── Cout output: or2.Y → r_cout → led_cout → GND ─────────────────────
    { id: 'w_cout_r',   type: 'wire', color: 'orange', from: { ic: 'or2', pin: 'Y' },         to: { component: 'r_cout', end: 'p1' } },
    { id: 'w_cout_led', type: 'wire', color: 'yellow', from: { component: 'r_cout', end: 'p2' }, to: { led: 'led_cout', end: 'anode' } },
    { id: 'w_cout_gnd', type: 'wire', color: 'black',  from: { led: 'led_cout', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 43 } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'The base for our 2-bit ripple carry adder. This circuit chains two full adders, ' +
        'requiring 10 logic gates and significant wiring.',
      show: ['bb'],
    },
    {
      title: 'Place FA1 gates',
      body: 'Full Adder 1: xor1 (col 3), and1 (col 3 row h), xor2 (col 8), and2 (col 8 row h), or1 (col 13). ' +
        'FA1 handles the least-significant bit (A0 + B0 + Cin).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1'],
      highlight: 'xor1',
    },
    {
      title: 'Place FA2 gates',
      body: 'Full Adder 2: xor3 (col 18), and3 (col 18 row h), xor4 (col 23), and4 (col 23 row h), or2 (col 28). ' +
        'FA2 handles the next bit (A1 + B1 + C1).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2'],
      highlight: 'xor3',
    },
    {
      title: 'Place output resistors and LEDs',
      body: '330 Ω resistors and LEDs for S0 (green), S1 (green), and Cout (yellow). ' +
        'Three output indicators show the 3-bit result.',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'r_s0', 'r_s1', 'r_cout', 'led_s0', 'led_s1', 'led_cout'],
      highlight: 'led_s0',
    },
    {
      title: 'Wire FA1 inputs (A0, B0, Cin=GND)',
      body: 'Red = A0 (col 1), Blue = B0 (col 2), each to xor1 and and1. ' +
        'Black = Cin tied to GND rail (no initial carry).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'r_s0', 'r_s1', 'r_cout', 'led_s0', 'led_s1', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2'],
      activeInputs: { A0: 0, B0: 0, A1: 0, B1: 0 },
    },
    {
      title: 'Wire FA1 internal connections',
      body: 'White: xor1.Y → xor2.A and and2.A. Yellow: and1.Y → or1.A, and2.Y → or1.B.',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'r_s0', 'r_s1', 'r_cout', 'led_s0', 'led_s1', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2',
        'w_xor1_xor2', 'w_xor1_and2', 'w_and1_or1', 'w_and2_or1'],
      activeInputs: { A0: 0, B0: 0, A1: 0, B1: 0 },
    },
    {
      title: 'Wire FA2 inputs and carry propagation',
      body: 'Red = A1 (col 16), Blue = B1 (col 17). Purple wires: or1.Y (FA1 carry) → xor4.B and and4.B.',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'r_s0', 'r_s1', 'r_cout', 'led_s0', 'led_s1', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2',
        'w_xor1_xor2', 'w_xor1_and2', 'w_and1_or1', 'w_and2_or1',
        'w_a1_xor3', 'w_a1_and3', 'w_b1_xor3', 'w_b1_and3',
        'w_carry_xor4', 'w_carry_and4'],
      activeInputs: { A0: 0, B0: 0, A1: 0, B1: 0 },
    },
    {
      title: 'Wire FA2 internals and outputs',
      body: 'FA2 internal wires mirror FA1. Output wires: S0, S1, Cout each through 330 Ω resistor to LED to GND. ' +
        'Test: 11 + 11 = 110 → A0=1, B0=1, A1=1, B1=1 → S0=0, S1=1, Cout=1.',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'r_s0', 'r_s1', 'r_cout', 'led_s0', 'led_s1', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2',
        'w_xor1_xor2', 'w_xor1_and2', 'w_and1_or1', 'w_and2_or1',
        'w_a1_xor3', 'w_a1_and3', 'w_b1_xor3', 'w_b1_and3',
        'w_carry_xor4', 'w_carry_and4',
        'w_xor3_xor4', 'w_xor3_and4', 'w_and3_or2', 'w_and4_or2',
        'w_s0_r', 'w_s0_led', 'w_s0_gnd',
        'w_s1_r', 'w_s1_led', 'w_s1_gnd',
        'w_cout_r', 'w_cout_led', 'w_cout_gnd'],
      highlight: 'led_cout',
      activeInputs: { A0: 1, B0: 1, A1: 1, B1: 1 },
    },
  ],

  truthTable: {
    inputs:  ['A1', 'A0', 'B1', 'B0'],
    outputs: ['Cout', 'S1', 'S0'],
    rows: [
      // 00 + 00 = 000
      { inputs: { A1: 0, A0: 0, B1: 0, B0: 0 }, outputs: { Cout: 0, S1: 0, S0: 0 } },
      // 00 + 01 = 001
      { inputs: { A1: 0, A0: 0, B1: 0, B0: 1 }, outputs: { Cout: 0, S1: 0, S0: 1 } },
      // 00 + 10 = 010
      { inputs: { A1: 0, A0: 0, B1: 1, B0: 0 }, outputs: { Cout: 0, S1: 1, S0: 0 } },
      // 00 + 11 = 011
      { inputs: { A1: 0, A0: 0, B1: 1, B0: 1 }, outputs: { Cout: 0, S1: 1, S0: 1 } },
      // 01 + 00 = 001
      { inputs: { A1: 0, A0: 1, B1: 0, B0: 0 }, outputs: { Cout: 0, S1: 0, S0: 1 } },
      // 01 + 01 = 010
      { inputs: { A1: 0, A0: 1, B1: 0, B0: 1 }, outputs: { Cout: 0, S1: 1, S0: 0 } },
      // 01 + 10 = 011
      { inputs: { A1: 0, A0: 1, B1: 1, B0: 0 }, outputs: { Cout: 0, S1: 1, S0: 1 } },
      // 01 + 11 = 100
      { inputs: { A1: 0, A0: 1, B1: 1, B0: 1 }, outputs: { Cout: 1, S1: 0, S0: 0 } },
      // 10 + 00 = 010
      { inputs: { A1: 1, A0: 0, B1: 0, B0: 0 }, outputs: { Cout: 0, S1: 1, S0: 0 } },
      // 10 + 01 = 011
      { inputs: { A1: 1, A0: 0, B1: 0, B0: 1 }, outputs: { Cout: 0, S1: 1, S0: 1 } },
      // 10 + 10 = 100
      { inputs: { A1: 1, A0: 0, B1: 1, B0: 0 }, outputs: { Cout: 1, S1: 0, S0: 0 } },
      // 10 + 11 = 101
      { inputs: { A1: 1, A0: 0, B1: 1, B0: 1 }, outputs: { Cout: 1, S1: 0, S0: 1 } },
      // 11 + 00 = 011
      { inputs: { A1: 1, A0: 1, B1: 0, B0: 0 }, outputs: { Cout: 0, S1: 1, S0: 1 } },
      // 11 + 01 = 100
      { inputs: { A1: 1, A0: 1, B1: 0, B0: 1 }, outputs: { Cout: 1, S1: 0, S0: 0 } },
      // 11 + 10 = 101
      { inputs: { A1: 1, A0: 1, B1: 1, B0: 0 }, outputs: { Cout: 1, S1: 0, S0: 1 } },
      // 11 + 11 = 110
      { inputs: { A1: 1, A0: 1, B1: 1, B0: 1 }, outputs: { Cout: 1, S1: 1, S0: 0 } },
    ],
  },
};
