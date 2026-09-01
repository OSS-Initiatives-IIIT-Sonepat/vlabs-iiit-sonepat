import { type Circuit } from '@/labs/types';

// ── 4-bit Binary Adder using 74HC283 ─────────────────────────────────────────
// 74HC283 4-bit full adder (DIP-16)
//
// Pin map at col 7:
//   e-bank: s2(7),b2(8),a2(9),s1(10),a1(11),b1(12),c0(13),GND(14)
//   f-bank: VCC(7),c4(8),s4(9),a4(10),b4(11),s3(12),a3(13),b3(14)
//
// Wiring:
//   C0     → GND (no carry-in)
//   A1–A4  → cols 1–4 row a
//   B1–B4  → cols 1–4 row b
//   S1–S4  → output LEDs
//   C4     → carry-out LED
//
// Output layout:
//   S1: r_s1 (col 22, c) → led_s1 (col 26, c)
//   S2: r_s2 (col 22, h) → led_s2 (col 26, h)
//   S3: r_s3 (col 29, c) → led_s3 (col 33, c)
//   S4: r_s4 (col 29, h) → led_s4 (col 33, h)
//   C4: r_c4 (col 36, c) → led_c4 (col 40, c)

export const BinaryAdder4bit: Circuit = {
  id: 'binary-adder-4bit',
  title: '4-bit Binary Adder using 74HC283',
  description:
    'Adds two 4-bit binary numbers A (A4–A1) and B (B4–B1) to produce a 4-bit Sum (S4–S1) ' +
    'and a Carry-out (C4). ' +
    'Uses the 74HC283 ripple-carry 4-bit full adder IC. C0 (carry-in) is tied to GND.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── 74HC283 IC ────────────────────────────────────────────────────────
    { id: 'adder', type: 'adder-4bit', mountedAt: { board: 'bb', col: 7, row: 'e' } },

    // ── Output resistors ──────────────────────────────────────────────────
    { id: 'r_s1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'r_s2', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'h' } },
    { id: 'r_s3', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 29, row: 'c' } },
    { id: 'r_s4', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 29, row: 'h' } },
    { id: 'r_c4', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 36, row: 'c' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_s1', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 26, row: 'c' } },
    { id: 'led_s2', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 26, row: 'h' } },
    { id: 'led_s3', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 33, row: 'c' } },
    { id: 'led_s4', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 33, row: 'h' } },
    { id: 'led_c4', type: 'led', color: 'white',  mountedAt: { board: 'bb', col: 40, row: 'c' } },

    // ── C0 tied to GND ────────────────────────────────────────────────────
    { id: 'w_c0_gnd', type: 'wire', color: 'black',
      from: { ic: 'adder', pin: 'c0' },
      to:   { board: 'bb', rail: 'gnd_top', col: 13 } },

    // ── A input wires (row a) ─────────────────────────────────────────────
    { id: 'w_a1_adder', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'adder', pin: 'a1' } },
    { id: 'w_a2_adder', type: 'wire', color: 'red',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'adder', pin: 'a2' } },
    { id: 'w_a3_adder', type: 'wire', color: 'red',
      from: { board: 'bb', col: 3, row: 'a' },
      to:   { ic: 'adder', pin: 'a3' } },
    { id: 'w_a4_adder', type: 'wire', color: 'red',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'adder', pin: 'a4' } },

    // ── B input wires (row b) ─────────────────────────────────────────────
    { id: 'w_b1_adder', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { ic: 'adder', pin: 'b1' } },
    { id: 'w_b2_adder', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'adder', pin: 'b2' } },
    { id: 'w_b3_adder', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 3, row: 'b' },
      to:   { ic: 'adder', pin: 'b3' } },
    { id: 'w_b4_adder', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 4, row: 'b' },
      to:   { ic: 'adder', pin: 'b4' } },

    // ── Output wires: sum pins → resistors → LEDs → GND ──────────────────
    { id: 'w_s1_r',  type: 'wire', color: 'red',
      from: { ic: 'adder', pin: 's1' }, to: { component: 'r_s1', end: 'p1' } },
    { id: 'w_s1_led', type: 'wire', color: 'red',
      from: { component: 'r_s1', end: 'p2' }, to: { led: 'led_s1', end: 'anode' } },
    { id: 'w_s1_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s1', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },

    { id: 'w_s2_r',  type: 'wire', color: 'yellow',
      from: { ic: 'adder', pin: 's2' }, to: { component: 'r_s2', end: 'p1' } },
    { id: 'w_s2_led', type: 'wire', color: 'yellow',
      from: { component: 'r_s2', end: 'p2' }, to: { led: 'led_s2', end: 'anode' } },
    { id: 'w_s2_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s2', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },

    { id: 'w_s3_r',  type: 'wire', color: 'green',
      from: { ic: 'adder', pin: 's3' }, to: { component: 'r_s3', end: 'p1' } },
    { id: 'w_s3_led', type: 'wire', color: 'green',
      from: { component: 'r_s3', end: 'p2' }, to: { led: 'led_s3', end: 'anode' } },
    { id: 'w_s3_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s3', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 3 } },

    { id: 'w_s4_r',  type: 'wire', color: 'blue',
      from: { ic: 'adder', pin: 's4' }, to: { component: 'r_s4', end: 'p1' } },
    { id: 'w_s4_led', type: 'wire', color: 'blue',
      from: { component: 'r_s4', end: 'p2' }, to: { led: 'led_s4', end: 'anode' } },
    { id: 'w_s4_gnd', type: 'wire', color: 'black',
      from: { led: 'led_s4', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 4 } },

    { id: 'w_c4_r',  type: 'wire', color: 'white',
      from: { ic: 'adder', pin: 'c4' }, to: { component: 'r_c4', end: 'p1' } },
    { id: 'w_c4_led', type: 'wire', color: 'white',
      from: { component: 'r_c4', end: 'p2' }, to: { led: 'led_c4', end: 'anode' } },
    { id: 'w_c4_gnd', type: 'wire', color: 'black',
      from: { led: 'led_c4', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 5 } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'The 74HC283 is a 4-bit binary full adder using carry-lookahead logic. ' +
        'It adds A[4:1] + B[4:1] + C0 and produces Sum S[4:1] and carry-out C4. ' +
        'C0 is the carry-in, tied to GND here (no initial carry).',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC283',
      body: 'Mount the 74HC283 DIP-16 at column 7, straddling the centre gap. ' +
        'Pin 1 (S2) at col 7, row e. ' +
        'Connect VCC and GND supply pins to the power rails.',
      show: ['bb', 'adder'],
      highlight: 'adder',
    },
    {
      title: 'Tie C0 to GND',
      body: 'Connect a black wire from the C0 pin (col 13, row e) to the GND rail. ' +
        'C0=0 means no carry-in; the circuit performs simple addition A + B. ' +
        'Tie C0 to VCC (+1) to add A + B + 1.',
      show: ['bb', 'adder', 'w_c0_gnd'],
    },
    {
      title: 'Wire A inputs (red)',
      body: 'Red wires: col 1 row a → a1, col 2 row a → a2, col 3 row a → a3, col 4 row a → a4. ' +
        'A1 is the LSB; A4 is the MSB. Use DIP switches or wire to VCC/GND.',
      show: ['bb', 'adder', 'w_c0_gnd',
             'w_a1_adder', 'w_a2_adder', 'w_a3_adder', 'w_a4_adder'],
      activeInputs: { A4: 0, A3: 0, A2: 1, A1: 1, B4: 0, B3: 1, B2: 0, B1: 1, C0: 0 },
    },
    {
      title: 'Wire B inputs (blue)',
      body: 'Blue wires: col 1 row b → b1, col 2 row b → b2, col 3 row b → b3, col 4 row b → b4. ' +
        'B1 is the LSB; B4 is the MSB. Both A and B banks are now wired.',
      show: ['bb', 'adder', 'w_c0_gnd',
             'w_a1_adder', 'w_a2_adder', 'w_a3_adder', 'w_a4_adder',
             'w_b1_adder', 'w_b2_adder', 'w_b3_adder', 'w_b4_adder'],
      activeInputs: { A4: 0, A3: 0, A2: 1, A1: 1, B4: 0, B3: 1, B2: 0, B1: 1, C0: 0 },
    },
    {
      title: 'Wire output LEDs (S1–S4, C4)',
      body: 'Five LED paths: S1 (red), S2 (yellow), S3 (green), S4 (blue) in alternating banks. ' +
        'C4 (white) at far right for carry-out. All cathodes to GND rail.',
      show: ['bb', 'adder', 'w_c0_gnd',
             'w_a1_adder', 'w_a2_adder', 'w_a3_adder', 'w_a4_adder',
             'w_b1_adder', 'w_b2_adder', 'w_b3_adder', 'w_b4_adder',
             'r_s1', 'r_s2', 'r_s3', 'r_s4', 'r_c4',
             'led_s1', 'led_s2', 'led_s3', 'led_s4', 'led_c4',
             'w_s1_r', 'w_s1_led', 'w_s1_gnd',
             'w_s2_r', 'w_s2_led', 'w_s2_gnd',
             'w_s3_r', 'w_s3_led', 'w_s3_gnd',
             'w_s4_r', 'w_s4_led', 'w_s4_gnd',
             'w_c4_r', 'w_c4_led', 'w_c4_gnd'],
      activeInputs: { A4: 0, A3: 0, A2: 1, A1: 1, B4: 0, B3: 1, B2: 0, B1: 1, C0: 0 },
    },
    {
      title: 'Test: 3 + 5 = 8 (A=0011, B=0101)',
      body: 'Set A4=0,A3=0,A2=1,A1=1 (decimal 3) and B4=0,B3=1,B2=0,B1=1 (decimal 5). ' +
        'Expected sum = 8 = 1000: only S4 (blue) should light. C4=0 (no overflow).',
      show: ['bb', 'adder', 'w_c0_gnd',
             'w_a1_adder', 'w_a2_adder', 'w_a3_adder', 'w_a4_adder',
             'w_b1_adder', 'w_b2_adder', 'w_b3_adder', 'w_b4_adder',
             'r_s1', 'r_s2', 'r_s3', 'r_s4', 'r_c4',
             'led_s1', 'led_s2', 'led_s3', 'led_s4', 'led_c4',
             'w_s1_r', 'w_s1_led', 'w_s1_gnd',
             'w_s2_r', 'w_s2_led', 'w_s2_gnd',
             'w_s3_r', 'w_s3_led', 'w_s3_gnd',
             'w_s4_r', 'w_s4_led', 'w_s4_gnd',
             'w_c4_r', 'w_c4_led', 'w_c4_gnd'],
      activeInputs: { A4: 0, A3: 0, A2: 1, A1: 1, B4: 0, B3: 1, B2: 0, B1: 1, C0: 0 },
      highlight: 'led_s4',
    },
    {
      title: 'Test: 7 + 9 = 16 (A=0111, B=1001)',
      body: 'Set A=0111 (7) and B=1001 (9). Sum = 16 = 5-bit 10000. ' +
        'S4–S1 = 0000 (all LEDs off), C4=1 (white carry LED ON). ' +
        'The carry indicates the result exceeds 4 bits.',
      show: ['bb', 'adder', 'w_c0_gnd',
             'w_a1_adder', 'w_a2_adder', 'w_a3_adder', 'w_a4_adder',
             'w_b1_adder', 'w_b2_adder', 'w_b3_adder', 'w_b4_adder',
             'r_s1', 'r_s2', 'r_s3', 'r_s4', 'r_c4',
             'led_s1', 'led_s2', 'led_s3', 'led_s4', 'led_c4',
             'w_s1_r', 'w_s1_led', 'w_s1_gnd',
             'w_s2_r', 'w_s2_led', 'w_s2_gnd',
             'w_s3_r', 'w_s3_led', 'w_s3_gnd',
             'w_s4_r', 'w_s4_led', 'w_s4_gnd',
             'w_c4_r', 'w_c4_led', 'w_c4_gnd'],
      activeInputs: { A4: 0, A3: 1, A2: 1, A1: 1, B4: 1, B3: 0, B2: 0, B1: 1, C0: 0 },
      highlight: 'led_c4',
    },
  ],

  truthTable: {
    inputs:  ['A4', 'A3', 'A2', 'A1', 'B4', 'B3', 'B2', 'B1', 'C0'],
    outputs: ['S4', 'S3', 'S2', 'S1', 'C4'],
    rows: [
      { inputs: { A4: 0, A3: 0, A2: 1, A1: 1, B4: 0, B3: 1, B2: 0, B1: 1, C0: 0 }, outputs: { S4: 1, S3: 0, S2: 0, S1: 0, C4: 0 } },
      { inputs: { A4: 0, A3: 1, A2: 1, A1: 1, B4: 1, B3: 0, B2: 0, B1: 1, C0: 0 }, outputs: { S4: 0, S3: 0, S2: 0, S1: 0, C4: 1 } },
      { inputs: { A4: 1, A3: 0, A2: 1, A1: 0, B4: 0, B3: 0, B2: 1, B1: 0, C0: 0 }, outputs: { S4: 1, S3: 1, S2: 0, S1: 0, C4: 0 } },
      { inputs: { A4: 1, A3: 1, A2: 1, A1: 1, B4: 1, B3: 1, B2: 1, B1: 1, C0: 0 }, outputs: { S4: 1, S3: 1, S2: 1, S1: 0, C4: 1 } },
    ],
  },
};
