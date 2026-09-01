import { type Circuit } from '@/labs/types';

// ── 4-bit Binary Subtractor using 74HC283 + XOR Inversion ────────────────────
// A − B = A + B' + 1  (two's complement subtraction)
//
// Four XOR gates invert B bits (each XOR has input-B tied to VCC = constant 1,
// acting as an inverter). C0 is tied to VCC (+1) to complete the 2's complement.
//
// XOR gate placement (B inversion):
//   xor_b1 (col 3, e)  — invert B1
//   xor_b2 (col 3, h)  — invert B2
//   xor_b3 (col 7, e)  — invert B3
//   xor_b4 (col 7, h)  — invert B4
//
// 74HC283 adder:
//   adder_sub at col 13 row e
//   Pin map: s2(13),b2(14),a2(15),s1(16),a1(17),b1(18),c0(19),GND(20)
//            VCC(13f),c4(14f),s4(15f),a4(16f),b4(17f),s3(18f),a3(19f),b3(20f)
//
// Output layout:
//   S1: r_s1 (col 28, c) → led_s1 (col 32, c)
//   S2: r_s2 (col 28, h) → led_s2 (col 32, h)
//   S3: r_s3 (col 35, c) → led_s3 (col 39, c)
//   S4: r_s4 (col 35, h) → led_s4 (col 39, h)
//   C4: r_c4 (col 42, c) → led_c4 (col 46, c)

export const BinarySubtractor4bit: Circuit = {
  id: 'binary-subtractor-4bit',
  title: '4-bit Binary Subtractor using 74HC283 and XOR Inversion',
  description:
    'Subtracts B from A (A − B) by computing A + B\' + 1 using two\'s complement. ' +
    'Four XOR gates invert each B bit; C0=1 adds the extra 1. ' +
    'The 74HC283 adder performs the final addition.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── XOR gates (B inversion) ───────────────────────────────────────────
    { id: 'xor_b1', type: 'xor-gate', mountedAt: { board: 'bb', col: 3,  row: 'e' } },
    { id: 'xor_b2', type: 'xor-gate', mountedAt: { board: 'bb', col: 3,  row: 'h' } },
    { id: 'xor_b3', type: 'xor-gate', mountedAt: { board: 'bb', col: 7,  row: 'e' } },
    { id: 'xor_b4', type: 'xor-gate', mountedAt: { board: 'bb', col: 7,  row: 'h' } },

    // ── 74HC283 adder ─────────────────────────────────────────────────────
    { id: 'adder_sub', type: 'adder-4bit', mountedAt: { board: 'bb', col: 13, row: 'e' } },

    // ── Output resistors ──────────────────────────────────────────────────
    { id: 'r_s1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 28, row: 'c' } },
    { id: 'r_s2', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 28, row: 'h' } },
    { id: 'r_s3', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 35, row: 'c' } },
    { id: 'r_s4', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 35, row: 'h' } },
    { id: 'r_c4', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 42, row: 'c' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_s1', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 32, row: 'c' } },
    { id: 'led_s2', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 32, row: 'h' } },
    { id: 'led_s3', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 39, row: 'c' } },
    { id: 'led_s4', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 39, row: 'h' } },
    { id: 'led_c4', type: 'led', color: 'white',  mountedAt: { board: 'bb', col: 46, row: 'c' } },

    // ── VCC wires to XOR gate B-inputs (constant 1 = invert function) ─────
    { id: 'w_vcc_xb1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 3 },
      to:   { ic: 'xor_b1', pin: 'B' } },
    { id: 'w_vcc_xb2', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 4 },
      to:   { ic: 'xor_b2', pin: 'B' } },
    { id: 'w_vcc_xb3', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { ic: 'xor_b3', pin: 'B' } },
    { id: 'w_vcc_xb4', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 6 },
      to:   { ic: 'xor_b4', pin: 'B' } },

    // ── C0 tied to VCC (+1 for 2's complement) ────────────────────────────
    { id: 'w_c0_vcc', type: 'wire', color: 'red',
      from: { ic: 'adder_sub', pin: 'c0' },
      to:   { board: 'bb', rail: 'vcc_top', col: 19 } },

    // ── A input wires (row a, directly to adder) ──────────────────────────
    { id: 'w_a1_adder_sub', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'adder_sub', pin: 'a1' } },
    { id: 'w_a2_adder_sub', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'adder_sub', pin: 'a2' } },
    { id: 'w_a3_adder_sub', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 3, row: 'a' },
      to:   { ic: 'adder_sub', pin: 'a3' } },
    { id: 'w_a4_adder_sub', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'adder_sub', pin: 'a4' } },

    // ── B inputs through XOR inverters then to adder ──────────────────────
    { id: 'w_b1_xor', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { ic: 'xor_b1', pin: 'A' } },
    { id: 'w_b2_xor', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'xor_b2', pin: 'A' } },
    { id: 'w_b3_xor', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 3, row: 'b' },
      to:   { ic: 'xor_b3', pin: 'A' } },
    { id: 'w_b4_xor', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 4, row: 'b' },
      to:   { ic: 'xor_b4', pin: 'A' } },

    // ── XOR outputs → adder B inputs ──────────────────────────────────────
    { id: 'w_xb1_adder', type: 'wire', color: 'white',
      from: { ic: 'xor_b1', pin: 'Y' },
      to:   { ic: 'adder_sub', pin: 'b1' } },
    { id: 'w_xb2_adder', type: 'wire', color: 'white',
      from: { ic: 'xor_b2', pin: 'Y' },
      to:   { ic: 'adder_sub', pin: 'b2' } },
    { id: 'w_xb3_adder', type: 'wire', color: 'white',
      from: { ic: 'xor_b3', pin: 'Y' },
      to:   { ic: 'adder_sub', pin: 'b3' } },
    { id: 'w_xb4_adder', type: 'wire', color: 'white',
      from: { ic: 'xor_b4', pin: 'Y' },
      to:   { ic: 'adder_sub', pin: 'b4' } },

    // ── Output wires: sum pins → resistors → LEDs → GND ──────────────────
    { id: 'w_s1_r',   type: 'wire', color: 'red',
      from: { ic: 'adder_sub', pin: 's1' }, to: { component: 'r_s1', end: 'p1' } },
    { id: 'w_s1_led', type: 'wire', color: 'red',
      from: { component: 'r_s1', end: 'p2' }, to: { led: 'led_s1', end: 'anode' } },
    { id: 'w_s1_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s1', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },

    { id: 'w_s2_r',   type: 'wire', color: 'yellow',
      from: { ic: 'adder_sub', pin: 's2' }, to: { component: 'r_s2', end: 'p1' } },
    { id: 'w_s2_led', type: 'wire', color: 'yellow',
      from: { component: 'r_s2', end: 'p2' }, to: { led: 'led_s2', end: 'anode' } },
    { id: 'w_s2_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s2', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },

    { id: 'w_s3_r',   type: 'wire', color: 'green',
      from: { ic: 'adder_sub', pin: 's3' }, to: { component: 'r_s3', end: 'p1' } },
    { id: 'w_s3_led', type: 'wire', color: 'green',
      from: { component: 'r_s3', end: 'p2' }, to: { led: 'led_s3', end: 'anode' } },
    { id: 'w_s3_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s3', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 3 } },

    { id: 'w_s4_r',   type: 'wire', color: 'blue',
      from: { ic: 'adder_sub', pin: 's4' }, to: { component: 'r_s4', end: 'p1' } },
    { id: 'w_s4_led', type: 'wire', color: 'blue',
      from: { component: 'r_s4', end: 'p2' }, to: { led: 'led_s4', end: 'anode' } },
    { id: 'w_s4_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s4', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 4 } },

    { id: 'w_c4_r',   type: 'wire', color: 'white',
      from: { ic: 'adder_sub', pin: 'c4' }, to: { component: 'r_c4', end: 'p1' } },
    { id: 'w_c4_led', type: 'wire', color: 'white',
      from: { component: 'r_c4', end: 'p2' }, to: { led: 'led_c4', end: 'anode' } },
    { id: 'w_c4_gnd', type: 'wire', color: 'black',
      from: { led: 'led_c4', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 5 } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'Binary subtraction A − B = A + B\' + 1 using two\'s complement. ' +
        'XOR gates with one input tied HIGH invert each B bit (XNOR → NOT). ' +
        'Setting C0=1 adds the required +1 to complete the two\'s complement.',
      show: ['bb'],
    },
    {
      title: 'Place XOR inverter gates',
      body: 'Mount xor_b1 at col 3 row e and xor_b2 at col 3 row h for B1, B2 inversions. ' +
        'Mount xor_b3 at col 7 row e and xor_b4 at col 7 row h for B3, B4. ' +
        'Connect VCC (red wires) to pin B of each XOR gate — this converts XOR into NOT.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4'],
      highlight: 'xor_b1',
    },
    {
      title: 'Place the 74HC283 adder',
      body: 'Mount the 74HC283 at col 13 row e. ' +
        'This adds A + B\' where B\' comes from the XOR inverters. ' +
        'Connect VCC and GND supply pins.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub'],
      highlight: 'adder_sub',
    },
    {
      title: 'Tie C0 to VCC (+1)',
      body: 'Connect a red wire from the C0 pin (col 19, row e of adder) to the VCC rail. ' +
        'C0=1 adds the final +1 needed for two\'s complement: A − B = A + B\' + 1.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub', 'w_c0_vcc'],
    },
    {
      title: 'Wire A inputs directly to adder',
      body: 'Orange wires: col 1–4 row a → adder pins a1–a4. ' +
        'A inputs bypass the XOR gates — only B is inverted.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub', 'w_c0_vcc',
             'w_a1_adder_sub', 'w_a2_adder_sub', 'w_a3_adder_sub', 'w_a4_adder_sub'],
      activeInputs: { A4: 1, A3: 0, A2: 0, A1: 0, B4: 0, B3: 1, B2: 0, B1: 1 },
    },
    {
      title: 'Wire B inputs through XOR inverters',
      body: 'Blue wires: col 1–4 row b → XOR gate A-inputs. ' +
        'White wires: XOR outputs → adder b1–b4 pins. ' +
        'B bits are inverted before reaching the adder.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub', 'w_c0_vcc',
             'w_a1_adder_sub', 'w_a2_adder_sub', 'w_a3_adder_sub', 'w_a4_adder_sub',
             'w_b1_xor', 'w_b2_xor', 'w_b3_xor', 'w_b4_xor',
             'w_xb1_adder', 'w_xb2_adder', 'w_xb3_adder', 'w_xb4_adder'],
      activeInputs: { A4: 1, A3: 0, A2: 0, A1: 0, B4: 0, B3: 1, B2: 0, B1: 1 },
    },
    {
      title: 'Wire output LEDs',
      body: 'Five LED paths for S1–S4 and C4. C4=1 means A < B (borrow in unsigned subtraction). ' +
        'Connect all cathodes to GND. Circuit is complete.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub', 'w_c0_vcc',
             'w_a1_adder_sub', 'w_a2_adder_sub', 'w_a3_adder_sub', 'w_a4_adder_sub',
             'w_b1_xor', 'w_b2_xor', 'w_b3_xor', 'w_b4_xor',
             'w_xb1_adder', 'w_xb2_adder', 'w_xb3_adder', 'w_xb4_adder',
             'r_s1', 'r_s2', 'r_s3', 'r_s4', 'r_c4',
             'led_s1', 'led_s2', 'led_s3', 'led_s4', 'led_c4',
             'w_s1_r', 'w_s1_led', 'w_s1_gnd',
             'w_s2_r', 'w_s2_led', 'w_s2_gnd',
             'w_s3_r', 'w_s3_led', 'w_s3_gnd',
             'w_s4_r', 'w_s4_led', 'w_s4_gnd',
             'w_c4_r', 'w_c4_led', 'w_c4_gnd'],
      activeInputs: { A4: 1, A3: 0, A2: 0, A1: 0, B4: 0, B3: 1, B2: 0, B1: 1 },
    },
    {
      title: 'Test: 8 − 5 = 3 (A=1000, B=0101)',
      body: 'A=1000 (8), B=0101 (5). Expected result = 3 = 0011. ' +
        'S2 (yellow) and S1 (red) should light. C4=1 (carry set means A≥B, result valid).',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub', 'w_c0_vcc',
             'w_a1_adder_sub', 'w_a2_adder_sub', 'w_a3_adder_sub', 'w_a4_adder_sub',
             'w_b1_xor', 'w_b2_xor', 'w_b3_xor', 'w_b4_xor',
             'w_xb1_adder', 'w_xb2_adder', 'w_xb3_adder', 'w_xb4_adder',
             'r_s1', 'r_s2', 'r_s3', 'r_s4', 'r_c4',
             'led_s1', 'led_s2', 'led_s3', 'led_s4', 'led_c4',
             'w_s1_r', 'w_s1_led', 'w_s1_gnd',
             'w_s2_r', 'w_s2_led', 'w_s2_gnd',
             'w_s3_r', 'w_s3_led', 'w_s3_gnd',
             'w_s4_r', 'w_s4_led', 'w_s4_gnd',
             'w_c4_r', 'w_c4_led', 'w_c4_gnd'],
      activeInputs: { A4: 1, A3: 0, A2: 0, A1: 0, B4: 0, B3: 1, B2: 0, B1: 1 },
      highlight: 'led_s2',
    },
    {
      title: 'Test: 5 − 8 = −3 (A=0101, B=1000)',
      body: 'A=0101 (5), B=1000 (8). Result in 4-bit 2\'s complement = 1101 (13 unsigned). ' +
        'S4, S3, S1 light. C4=0 (no borrow carry — indicates A<B in unsigned view). ' +
        'Read as signed: 1101 = −3.',
      show: ['bb', 'xor_b1', 'xor_b2', 'xor_b3', 'xor_b4',
             'w_vcc_xb1', 'w_vcc_xb2', 'w_vcc_xb3', 'w_vcc_xb4',
             'adder_sub', 'w_c0_vcc',
             'w_a1_adder_sub', 'w_a2_adder_sub', 'w_a3_adder_sub', 'w_a4_adder_sub',
             'w_b1_xor', 'w_b2_xor', 'w_b3_xor', 'w_b4_xor',
             'w_xb1_adder', 'w_xb2_adder', 'w_xb3_adder', 'w_xb4_adder',
             'r_s1', 'r_s2', 'r_s3', 'r_s4', 'r_c4',
             'led_s1', 'led_s2', 'led_s3', 'led_s4', 'led_c4',
             'w_s1_r', 'w_s1_led', 'w_s1_gnd',
             'w_s2_r', 'w_s2_led', 'w_s2_gnd',
             'w_s3_r', 'w_s3_led', 'w_s3_gnd',
             'w_s4_r', 'w_s4_led', 'w_s4_gnd',
             'w_c4_r', 'w_c4_led', 'w_c4_gnd'],
      activeInputs: { A4: 0, A3: 1, A2: 0, A1: 1, B4: 1, B3: 0, B2: 0, B1: 0 },
      highlight: 'led_s4',
    },
  ],

  truthTable: {
    inputs:  ['A4', 'A3', 'A2', 'A1', 'B4', 'B3', 'B2', 'B1'],
    outputs: ['S4', 'S3', 'S2', 'S1', 'C4'],
    rows: [
      { inputs: { A4: 1, A3: 0, A2: 0, A1: 0, B4: 0, B3: 1, B2: 0, B1: 1 }, outputs: { S4: 0, S3: 0, S2: 1, S1: 1, C4: 1 } },
      { inputs: { A4: 0, A3: 1, A2: 0, A1: 1, B4: 1, B3: 0, B2: 0, B1: 0 }, outputs: { S4: 1, S3: 1, S2: 0, S1: 1, C4: 0 } },
      { inputs: { A4: 1, A3: 1, A2: 1, A1: 1, B4: 0, B3: 1, B2: 1, B1: 0 }, outputs: { S4: 1, S3: 0, S2: 0, S1: 1, C4: 1 } },
      { inputs: { A4: 0, A3: 1, A2: 0, A1: 0, B4: 0, B3: 1, B2: 0, B1: 0 }, outputs: { S4: 0, S3: 0, S2: 0, S1: 0, C4: 1 } },
    ],
  },
};
