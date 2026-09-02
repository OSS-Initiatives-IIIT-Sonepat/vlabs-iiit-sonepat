import { type Circuit } from '@/labs/types';

// ── Full Adder Ripple Carry (4-bit) ──────────────────────────────────────
// DIGITAL with simulation.
// 4-bit ripple carry adder: chain four full adders.
//
// FA0: xor1(col3,e),  and1(col3,h),  xor2(col8,e),  and2(col8,h),  or1(col13,e)
// FA1: xor3(col18,e), and3(col18,h), xor4(col23,e), and4(col23,h), or2(col28,e)
// FA2: xor5(col33,e), and5(col33,h), xor6(col38,e), and6(col38,h), or3(col43,e)
// FA3: xor7(col48,e), and7(col48,h), xor8(col53,e), and8(col53,h), or4(col58,e)
//
// Inputs: A0, B0 → FA0;  A1, B1 → FA1;  A2, B2 → FA2;  A3, B3 → FA3;  Cin = GND.
// Carry chain: or1.Y → FA1 Cin;  or2.Y → FA2 Cin;  or3.Y → FA3 Cin.
// Outputs: S0 = xor2.Y, S1 = xor4.Y, S2 = xor6.Y, S3 = xor8.Y,
//          Cout = or4.Y → resistors → LEDs → GND.

export const FullAdderRippleCircuit: Circuit = {
  id: 'full-adder-ripple',
  title: '4-bit Ripple Carry Adder',
  description:
    'A 4-bit ripple carry adder built from four cascaded full adders. Each full adder uses ' +
    '2 XOR gates, 2 AND gates, and 1 OR gate. The carry-out of each stage feeds the carry-in ' +
    'of the next. Inputs: A3A2A1A0 + B3B2B1B0 + Cin. Outputs: Cout, S3, S2, S1, S0.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── FA0 gates (bit 0, LSB) ─────────────────────────────────────────
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 3,  row: 'e' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 3,  row: 'h' } },
    { id: 'xor2', type: 'xor-gate', mountedAt: { board: 'bb', col: 8,  row: 'e' } },
    { id: 'and2', type: 'and-gate', mountedAt: { board: 'bb', col: 8,  row: 'h' } },
    { id: 'or1',  type: 'or-gate',  mountedAt: { board: 'bb', col: 13, row: 'e' } },

    // ── FA1 gates (bit 1) ──────────────────────────────────────────────
    { id: 'xor3', type: 'xor-gate', mountedAt: { board: 'bb', col: 18, row: 'e' } },
    { id: 'and3', type: 'and-gate', mountedAt: { board: 'bb', col: 18, row: 'h' } },
    { id: 'xor4', type: 'xor-gate', mountedAt: { board: 'bb', col: 23, row: 'e' } },
    { id: 'and4', type: 'and-gate', mountedAt: { board: 'bb', col: 23, row: 'h' } },
    { id: 'or2',  type: 'or-gate',  mountedAt: { board: 'bb', col: 28, row: 'e' } },

    // ── FA2 gates (bit 2) ──────────────────────────────────────────────
    { id: 'xor5', type: 'xor-gate', mountedAt: { board: 'bb', col: 33, row: 'e' } },
    { id: 'and5', type: 'and-gate', mountedAt: { board: 'bb', col: 33, row: 'h' } },
    { id: 'xor6', type: 'xor-gate', mountedAt: { board: 'bb', col: 38, row: 'e' } },
    { id: 'and6', type: 'and-gate', mountedAt: { board: 'bb', col: 38, row: 'h' } },
    { id: 'or3',  type: 'or-gate',  mountedAt: { board: 'bb', col: 43, row: 'e' } },

    // ── FA3 gates (bit 3, MSB) ─────────────────────────────────────────
    { id: 'xor7', type: 'xor-gate', mountedAt: { board: 'bb', col: 48, row: 'e' } },
    { id: 'and7', type: 'and-gate', mountedAt: { board: 'bb', col: 48, row: 'h' } },
    { id: 'xor8', type: 'xor-gate', mountedAt: { board: 'bb', col: 53, row: 'e' } },
    { id: 'and8', type: 'and-gate', mountedAt: { board: 'bb', col: 53, row: 'h' } },
    { id: 'or4',  type: 'or-gate',  mountedAt: { board: 'bb', col: 58, row: 'e' } },

    // ── Output resistors ──────────────────────────────────────────────────
    // Alternate top bank (row c) and bot bank (row h) to avoid tie-point shorts.
    // Within each bank, successive outputs are spaced 8 cols apart to prevent
    // LED cathode ↔ resistor p1 overlap (resistor spans 4 cols, LED spans 2).
    { id: 'r_s0',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 63, row: 'c' } },
    { id: 'r_s1',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 63, row: 'h' } },
    { id: 'r_s2',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 71, row: 'c' } },
    { id: 'r_s3',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 71, row: 'h' } },
    { id: 'r_cout', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 79, row: 'c' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_s0',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 67, row: 'c' } },
    { id: 'led_s1',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 67, row: 'h' } },
    { id: 'led_s2',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 75, row: 'c' } },
    { id: 'led_s3',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 75, row: 'h' } },
    { id: 'led_cout', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 83, row: 'c' } },

    // ── FA0 inputs: A0, B0 ────────────────────────────────────────────────
    { id: 'w_a0_xor1', type: 'wire', color: 'red',  from: { board: 'bb', col: 1, row: 'a' }, to: { ic: 'xor1', pin: 'A' } },
    { id: 'w_a0_and1', type: 'wire', color: 'red',  from: { board: 'bb', col: 1, row: 'b' }, to: { ic: 'and1', pin: 'A' } },
    { id: 'w_b0_xor1', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'xor1', pin: 'B' } },
    { id: 'w_b0_and1', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'b' }, to: { ic: 'and1', pin: 'B' } },

    // ── FA0 Cin = GND ─────────────────────────────────────────────────────
    { id: 'w_cin_xor2', type: 'wire', color: 'black', from: { board: 'bb', rail: 'gnd_top', col: 7 }, to: { ic: 'xor2', pin: 'B' } },
    { id: 'w_cin_and2', type: 'wire', color: 'black', from: { board: 'bb', rail: 'gnd_top', col: 8 }, to: { ic: 'and2', pin: 'B' } },

    // ── FA0 internal wires ────────────────────────────────────────────────
    { id: 'w_xor1_xor2', type: 'wire', color: 'white', from: { ic: 'xor1', pin: 'Y' }, to: { ic: 'xor2', pin: 'A' } },
    { id: 'w_xor1_and2', type: 'wire', color: 'white', from: { ic: 'xor1', pin: 'Y' }, to: { ic: 'and2', pin: 'A' } },
    { id: 'w_and1_or1',  type: 'wire', color: 'yellow', from: { ic: 'and1', pin: 'Y' }, to: { ic: 'or1', pin: 'A' } },
    { id: 'w_and2_or1',  type: 'wire', color: 'yellow', from: { ic: 'and2', pin: 'Y' }, to: { ic: 'or1', pin: 'B' } },

    // ── FA1 inputs: A1, B1 ────────────────────────────────────────────────
    { id: 'w_a1_xor3', type: 'wire', color: 'red',  from: { board: 'bb', col: 16, row: 'a' }, to: { ic: 'xor3', pin: 'A' } },
    { id: 'w_a1_and3', type: 'wire', color: 'red',  from: { board: 'bb', col: 16, row: 'b' }, to: { ic: 'and3', pin: 'A' } },
    { id: 'w_b1_xor3', type: 'wire', color: 'blue', from: { board: 'bb', col: 17, row: 'a' }, to: { ic: 'xor3', pin: 'B' } },
    { id: 'w_b1_and3', type: 'wire', color: 'blue', from: { board: 'bb', col: 17, row: 'b' }, to: { ic: 'and3', pin: 'B' } },

    // ── Carry: FA0 → FA1 (or1.Y → xor4.B, and4.B) ───────────────────────
    { id: 'w_c1_xor4', type: 'wire', color: 'purple', from: { ic: 'or1', pin: 'Y' }, to: { ic: 'xor4', pin: 'B' } },
    { id: 'w_c1_and4', type: 'wire', color: 'purple', from: { ic: 'or1', pin: 'Y' }, to: { ic: 'and4', pin: 'B' } },

    // ── FA1 internal wires ────────────────────────────────────────────────
    { id: 'w_xor3_xor4', type: 'wire', color: 'white', from: { ic: 'xor3', pin: 'Y' }, to: { ic: 'xor4', pin: 'A' } },
    { id: 'w_xor3_and4', type: 'wire', color: 'white', from: { ic: 'xor3', pin: 'Y' }, to: { ic: 'and4', pin: 'A' } },
    { id: 'w_and3_or2',  type: 'wire', color: 'yellow', from: { ic: 'and3', pin: 'Y' }, to: { ic: 'or2', pin: 'A' } },
    { id: 'w_and4_or2',  type: 'wire', color: 'yellow', from: { ic: 'and4', pin: 'Y' }, to: { ic: 'or2', pin: 'B' } },

    // ── FA2 inputs: A2, B2 ────────────────────────────────────────────────
    { id: 'w_a2_xor5', type: 'wire', color: 'red',  from: { board: 'bb', col: 31, row: 'a' }, to: { ic: 'xor5', pin: 'A' } },
    { id: 'w_a2_and5', type: 'wire', color: 'red',  from: { board: 'bb', col: 31, row: 'b' }, to: { ic: 'and5', pin: 'A' } },
    { id: 'w_b2_xor5', type: 'wire', color: 'blue', from: { board: 'bb', col: 32, row: 'a' }, to: { ic: 'xor5', pin: 'B' } },
    { id: 'w_b2_and5', type: 'wire', color: 'blue', from: { board: 'bb', col: 32, row: 'b' }, to: { ic: 'and5', pin: 'B' } },

    // ── Carry: FA1 → FA2 (or2.Y → xor6.B, and6.B) ───────────────────────
    { id: 'w_c2_xor6', type: 'wire', color: 'purple', from: { ic: 'or2', pin: 'Y' }, to: { ic: 'xor6', pin: 'B' } },
    { id: 'w_c2_and6', type: 'wire', color: 'purple', from: { ic: 'or2', pin: 'Y' }, to: { ic: 'and6', pin: 'B' } },

    // ── FA2 internal wires ────────────────────────────────────────────────
    { id: 'w_xor5_xor6', type: 'wire', color: 'white', from: { ic: 'xor5', pin: 'Y' }, to: { ic: 'xor6', pin: 'A' } },
    { id: 'w_xor5_and6', type: 'wire', color: 'white', from: { ic: 'xor5', pin: 'Y' }, to: { ic: 'and6', pin: 'A' } },
    { id: 'w_and5_or3',  type: 'wire', color: 'yellow', from: { ic: 'and5', pin: 'Y' }, to: { ic: 'or3', pin: 'A' } },
    { id: 'w_and6_or3',  type: 'wire', color: 'yellow', from: { ic: 'and6', pin: 'Y' }, to: { ic: 'or3', pin: 'B' } },

    // ── FA3 inputs: A3, B3 ────────────────────────────────────────────────
    { id: 'w_a3_xor7', type: 'wire', color: 'red',  from: { board: 'bb', col: 46, row: 'a' }, to: { ic: 'xor7', pin: 'A' } },
    { id: 'w_a3_and7', type: 'wire', color: 'red',  from: { board: 'bb', col: 46, row: 'b' }, to: { ic: 'and7', pin: 'A' } },
    { id: 'w_b3_xor7', type: 'wire', color: 'blue', from: { board: 'bb', col: 47, row: 'a' }, to: { ic: 'xor7', pin: 'B' } },
    { id: 'w_b3_and7', type: 'wire', color: 'blue', from: { board: 'bb', col: 47, row: 'b' }, to: { ic: 'and7', pin: 'B' } },

    // ── Carry: FA2 → FA3 (or3.Y → xor8.B, and8.B) ───────────────────────
    { id: 'w_c3_xor8', type: 'wire', color: 'purple', from: { ic: 'or3', pin: 'Y' }, to: { ic: 'xor8', pin: 'B' } },
    { id: 'w_c3_and8', type: 'wire', color: 'purple', from: { ic: 'or3', pin: 'Y' }, to: { ic: 'and8', pin: 'B' } },

    // ── FA3 internal wires ────────────────────────────────────────────────
    { id: 'w_xor7_xor8', type: 'wire', color: 'white', from: { ic: 'xor7', pin: 'Y' }, to: { ic: 'xor8', pin: 'A' } },
    { id: 'w_xor7_and8', type: 'wire', color: 'white', from: { ic: 'xor7', pin: 'Y' }, to: { ic: 'and8', pin: 'A' } },
    { id: 'w_and7_or4',  type: 'wire', color: 'yellow', from: { ic: 'and7', pin: 'Y' }, to: { ic: 'or4', pin: 'A' } },
    { id: 'w_and8_or4',  type: 'wire', color: 'yellow', from: { ic: 'and8', pin: 'Y' }, to: { ic: 'or4', pin: 'B' } },

    // ── S0 output: xor2.Y → r_s0 → led_s0 → GND ─────────────────────────
    { id: 'w_s0_r',   type: 'wire', color: 'green', from: { ic: 'xor2', pin: 'Y' },       to: { component: 'r_s0', end: 'p1' } },
    { id: 'w_s0_led', type: 'wire', color: 'green', from: { component: 'r_s0', end: 'p2' }, to: { led: 'led_s0', end: 'anode' } },
    { id: 'w_s0_gnd', type: 'wire', color: 'black', from: { led: 'led_s0', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 68 } },

    // ── S1 output: xor4.Y → r_s1 → led_s1 → GND ─────────────────────────
    { id: 'w_s1_r',   type: 'wire', color: 'green', from: { ic: 'xor4', pin: 'Y' },       to: { component: 'r_s1', end: 'p1' } },
    { id: 'w_s1_led', type: 'wire', color: 'green', from: { component: 'r_s1', end: 'p2' }, to: { led: 'led_s1', end: 'anode' } },
    { id: 'w_s1_gnd', type: 'wire', color: 'black', from: { led: 'led_s1', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 69 } },

    // ── S2 output: xor6.Y → r_s2 → led_s2 → GND ─────────────────────────
    { id: 'w_s2_r',   type: 'wire', color: 'green', from: { ic: 'xor6', pin: 'Y' },       to: { component: 'r_s2', end: 'p1' } },
    { id: 'w_s2_led', type: 'wire', color: 'green', from: { component: 'r_s2', end: 'p2' }, to: { led: 'led_s2', end: 'anode' } },
    { id: 'w_s2_gnd', type: 'wire', color: 'black', from: { led: 'led_s2', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 76 } },

    // ── S3 output: xor8.Y → r_s3 → led_s3 → GND ─────────────────────────
    { id: 'w_s3_r',   type: 'wire', color: 'green', from: { ic: 'xor8', pin: 'Y' },       to: { component: 'r_s3', end: 'p1' } },
    { id: 'w_s3_led', type: 'wire', color: 'green', from: { component: 'r_s3', end: 'p2' }, to: { led: 'led_s3', end: 'anode' } },
    { id: 'w_s3_gnd', type: 'wire', color: 'black', from: { led: 'led_s3', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 76 } },

    // ── Cout output: or4.Y → r_cout → led_cout → GND ─────────────────────
    { id: 'w_cout_r',   type: 'wire', color: 'orange', from: { ic: 'or4', pin: 'Y' },         to: { component: 'r_cout', end: 'p1' } },
    { id: 'w_cout_led', type: 'wire', color: 'yellow', from: { component: 'r_cout', end: 'p2' }, to: { led: 'led_cout', end: 'anode' } },
    { id: 'w_cout_gnd', type: 'wire', color: 'black',  from: { led: 'led_cout', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 84 } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'The base for our 4-bit ripple carry adder. This circuit chains four full adders, ' +
        'requiring 20 logic gates (8 XOR, 8 AND, 4 OR) and significant wiring.',
      show: ['bb'],
    },
    {
      title: 'Place FA0 gates (bit 0, LSB)',
      body: 'Full Adder 0: xor1 (col 3), and1 (col 3 row h), xor2 (col 8), and2 (col 8 row h), or1 (col 13). ' +
        'FA0 handles the least-significant bit (A0 + B0 + Cin).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1'],
      highlight: 'xor1',
    },
    {
      title: 'Place FA1 gates (bit 1)',
      body: 'Full Adder 1: xor3 (col 18), and3 (col 18 row h), xor4 (col 23), and4 (col 23 row h), or2 (col 28). ' +
        'FA1 handles the next bit (A1 + B1 + C1).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2'],
      highlight: 'xor3',
    },
    {
      title: 'Place FA2 gates (bit 2)',
      body: 'Full Adder 2: xor5 (col 33), and5 (col 33 row h), xor6 (col 38), and6 (col 38 row h), or3 (col 43). ' +
        'FA2 handles bit 2 (A2 + B2 + C2).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3'],
      highlight: 'xor5',
    },
    {
      title: 'Place FA3 gates (bit 3, MSB)',
      body: 'Full Adder 3: xor7 (col 48), and7 (col 48 row h), xor8 (col 53), and8 (col 53 row h), or4 (col 58). ' +
        'FA3 handles the most-significant bit (A3 + B3 + C3).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4'],
      highlight: 'xor7',
    },
    {
      title: 'Place output resistors and LEDs',
      body: '330 Ω resistors and LEDs for S0–S3 (green) and Cout (yellow). ' +
        'Five output indicators show the 5-bit result {Cout, S3, S2, S1, S0}.',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4',
        'r_s0', 'r_s1', 'r_s2', 'r_s3', 'r_cout',
        'led_s0', 'led_s1', 'led_s2', 'led_s3', 'led_cout'],
      highlight: 'led_s0',
    },
    {
      title: 'Wire FA0 inputs (A0, B0, Cin=GND)',
      body: 'Red = A0 (col 1), Blue = B0 (col 2), each to xor1 and and1. ' +
        'Black = Cin tied to GND rail (no initial carry).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4',
        'r_s0', 'r_s1', 'r_s2', 'r_s3', 'r_cout',
        'led_s0', 'led_s1', 'led_s2', 'led_s3', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2'],
      activeInputs: { A0: 0, B0: 0, A1: 0, B1: 0, A2: 0, B2: 0, A3: 0, B3: 0 },
    },
    {
      title: 'Wire FA0 internal connections',
      body: 'White: xor1.Y → xor2.A and and2.A. Yellow: and1.Y → or1.A, and2.Y → or1.B.',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4',
        'r_s0', 'r_s1', 'r_s2', 'r_s3', 'r_cout',
        'led_s0', 'led_s1', 'led_s2', 'led_s3', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2',
        'w_xor1_xor2', 'w_xor1_and2', 'w_and1_or1', 'w_and2_or1'],
      activeInputs: { A0: 0, B0: 0, A1: 0, B1: 0, A2: 0, B2: 0, A3: 0, B3: 0 },
    },
    {
      title: 'Wire FA1 inputs and carry FA0→FA1',
      body: 'Red = A1 (col 16), Blue = B1 (col 17). Purple wires: or1.Y (FA0 carry-out) → xor4.B and and4.B (FA1 carry-in).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4',
        'r_s0', 'r_s1', 'r_s2', 'r_s3', 'r_cout',
        'led_s0', 'led_s1', 'led_s2', 'led_s3', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2',
        'w_xor1_xor2', 'w_xor1_and2', 'w_and1_or1', 'w_and2_or1',
        'w_a1_xor3', 'w_a1_and3', 'w_b1_xor3', 'w_b1_and3',
        'w_c1_xor4', 'w_c1_and4',
        'w_xor3_xor4', 'w_xor3_and4', 'w_and3_or2', 'w_and4_or2'],
      activeInputs: { A0: 0, B0: 0, A1: 0, B1: 0, A2: 0, B2: 0, A3: 0, B3: 0 },
    },
    {
      title: 'Wire FA2 inputs and carry FA1→FA2',
      body: 'Red = A2 (col 31), Blue = B2 (col 32). Purple wires: or2.Y (FA1 carry-out) → xor6.B and and6.B (FA2 carry-in).',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4',
        'r_s0', 'r_s1', 'r_s2', 'r_s3', 'r_cout',
        'led_s0', 'led_s1', 'led_s2', 'led_s3', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2',
        'w_xor1_xor2', 'w_xor1_and2', 'w_and1_or1', 'w_and2_or1',
        'w_a1_xor3', 'w_a1_and3', 'w_b1_xor3', 'w_b1_and3',
        'w_c1_xor4', 'w_c1_and4',
        'w_xor3_xor4', 'w_xor3_and4', 'w_and3_or2', 'w_and4_or2',
        'w_a2_xor5', 'w_a2_and5', 'w_b2_xor5', 'w_b2_and5',
        'w_c2_xor6', 'w_c2_and6',
        'w_xor5_xor6', 'w_xor5_and6', 'w_and5_or3', 'w_and6_or3'],
      activeInputs: { A0: 0, B0: 0, A1: 0, B1: 0, A2: 0, B2: 0, A3: 0, B3: 0 },
    },
    {
      title: 'Wire FA3 inputs, carry FA2→FA3, and all outputs',
      body: 'Red = A3 (col 46), Blue = B3 (col 47). Purple: or3.Y → FA3 carry-in. ' +
        'Output wires: S0–S3 and Cout each through 330 Ω resistor to LED to GND. ' +
        'Test: 1111 + 1111 = 11110 → S0=0, S1=1, S2=1, S3=1, Cout=1.',
      show: ['bb', 'xor1', 'and1', 'xor2', 'and2', 'or1', 'xor3', 'and3', 'xor4', 'and4', 'or2',
        'xor5', 'and5', 'xor6', 'and6', 'or3', 'xor7', 'and7', 'xor8', 'and8', 'or4',
        'r_s0', 'r_s1', 'r_s2', 'r_s3', 'r_cout',
        'led_s0', 'led_s1', 'led_s2', 'led_s3', 'led_cout',
        'w_a0_xor1', 'w_a0_and1', 'w_b0_xor1', 'w_b0_and1', 'w_cin_xor2', 'w_cin_and2',
        'w_xor1_xor2', 'w_xor1_and2', 'w_and1_or1', 'w_and2_or1',
        'w_a1_xor3', 'w_a1_and3', 'w_b1_xor3', 'w_b1_and3',
        'w_c1_xor4', 'w_c1_and4',
        'w_xor3_xor4', 'w_xor3_and4', 'w_and3_or2', 'w_and4_or2',
        'w_a2_xor5', 'w_a2_and5', 'w_b2_xor5', 'w_b2_and5',
        'w_c2_xor6', 'w_c2_and6',
        'w_xor5_xor6', 'w_xor5_and6', 'w_and5_or3', 'w_and6_or3',
        'w_a3_xor7', 'w_a3_and7', 'w_b3_xor7', 'w_b3_and7',
        'w_c3_xor8', 'w_c3_and8',
        'w_xor7_xor8', 'w_xor7_and8', 'w_and7_or4', 'w_and8_or4',
        'w_s0_r', 'w_s0_led', 'w_s0_gnd',
        'w_s1_r', 'w_s1_led', 'w_s1_gnd',
        'w_s2_r', 'w_s2_led', 'w_s2_gnd',
        'w_s3_r', 'w_s3_led', 'w_s3_gnd',
        'w_cout_r', 'w_cout_led', 'w_cout_gnd'],
      highlight: 'led_cout',
      activeInputs: { A0: 1, B0: 1, A1: 1, B1: 1, A2: 1, B2: 1, A3: 1, B3: 1 },
    },
  ],

  truthTable: {
    inputs:  ['A3', 'A2', 'A1', 'A0', 'B3', 'B2', 'B1', 'B0'],
    outputs: ['Cout', 'S3', 'S2', 'S1', 'S0'],
    rows: [
      // 0000 + 0000 = 00000
      { inputs: { A3: 0, A2: 0, A1: 0, A0: 0, B3: 0, B2: 0, B1: 0, B0: 0 }, outputs: { Cout: 0, S3: 0, S2: 0, S1: 0, S0: 0 } },
      // 0001 + 0010 = 00011
      { inputs: { A3: 0, A2: 0, A1: 0, A0: 1, B3: 0, B2: 0, B1: 1, B0: 0 }, outputs: { Cout: 0, S3: 0, S2: 0, S1: 1, S0: 1 } },
      // 0011 + 0101 = 01000
      { inputs: { A3: 0, A2: 0, A1: 1, A0: 1, B3: 0, B2: 1, B1: 0, B0: 1 }, outputs: { Cout: 0, S3: 1, S2: 0, S1: 0, S0: 0 } },
      // 0111 + 0001 = 01000
      { inputs: { A3: 0, A2: 1, A1: 1, A0: 1, B3: 0, B2: 0, B1: 0, B0: 1 }, outputs: { Cout: 0, S3: 1, S2: 0, S1: 0, S0: 0 } },
      // 1010 + 0101 = 01111
      { inputs: { A3: 1, A2: 0, A1: 1, A0: 0, B3: 0, B2: 1, B1: 0, B0: 1 }, outputs: { Cout: 0, S3: 1, S2: 1, S1: 1, S0: 1 } },
      // 1111 + 0001 = 10000
      { inputs: { A3: 1, A2: 1, A1: 1, A0: 1, B3: 0, B2: 0, B1: 0, B0: 1 }, outputs: { Cout: 1, S3: 0, S2: 0, S1: 0, S0: 0 } },
      // 1111 + 1111 = 11110
      { inputs: { A3: 1, A2: 1, A1: 1, A0: 1, B3: 1, B2: 1, B1: 1, B0: 1 }, outputs: { Cout: 1, S3: 1, S2: 1, S1: 1, S0: 0 } },
    ],
  },
};
