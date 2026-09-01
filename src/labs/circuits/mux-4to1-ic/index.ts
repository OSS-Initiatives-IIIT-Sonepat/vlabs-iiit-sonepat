import { type Circuit } from '@/labs/types';

// ── 4:1 Multiplexer using 74HC153 ────────────────────────────────────────────
// 74HC153 dual 4:1 MUX (DIP-16) — using channel 1 (Y1 output)
//
// Pin map at col 8:
//   e-bank: en1_bar(8), s1(9), i3_1(10), i2_1(11), i1_1(12), i0_1(13), y1(14), GND(15)
//   f-bank: VCC(8), s0(9), y2(10), i0_2(11), i1_2(12), i2_2(13), i3_2(14), en2_bar(15)
//
// Wiring:
//   EN1_bar → GND (always enabled)
//   S1, S0  → select inputs (col 5, col 6 row a)
//   I0–I3   → data inputs  (cols 1–4 row a)
//   Y1      → r_out (col 20, c) → led_out (col 24, c) → GND

export const Mux4to1IC: Circuit = {
  id: 'mux-4to1-ic',
  title: '4:1 Multiplexer using 74HC153',
  description:
    'A 4:1 multiplexer routes one of four data inputs (I0–I3) to the output Y ' +
    'based on two select lines (S1, S0). ' +
    'Implemented using the 74HC153 dual 4-to-1 multiplexer IC.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── 74HC153 IC ────────────────────────────────────────────────────────
    { id: 'mux41', type: 'mux-4to1', mountedAt: { board: 'bb', col: 8, row: 'e' } },

    // ── Output resistor and LED ───────────────────────────────────────────
    { id: 'r_out',  type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'c' } },
    { id: 'led_out', type: 'led', color: 'green', mountedAt: { board: 'bb', col: 24, row: 'c' } },

    // ── Select input wires ────────────────────────────────────────────────
    { id: 'w_s0_mux41', type: 'wire', color: 'red',
      from: { board: 'bb', col: 5, row: 'a' },
      to:   { ic: 'mux41', pin: 's0' } },
    { id: 'w_s1_mux41', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 6, row: 'a' },
      to:   { ic: 'mux41', pin: 's1' } },

    // ── Data input wires ──────────────────────────────────────────────────
    { id: 'w_i0_mux41', type: 'wire', color: 'white',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'mux41', pin: 'i0_1' } },
    { id: 'w_i1_mux41', type: 'wire', color: 'white',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'mux41', pin: 'i1_1' } },
    { id: 'w_i2_mux41', type: 'wire', color: 'white',
      from: { board: 'bb', col: 3, row: 'a' },
      to:   { ic: 'mux41', pin: 'i2_1' } },
    { id: 'w_i3_mux41', type: 'wire', color: 'white',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'mux41', pin: 'i3_1' } },

    // ── Enable: EN1_bar tied to GND ───────────────────────────────────────
    { id: 'w_en_gnd', type: 'wire', color: 'black',
      from: { ic: 'mux41', pin: 'en1_bar' },
      to:   { board: 'bb', rail: 'gnd_top', col: 8 } },

    // ── Output path: y1 → r_out → led_out → GND ──────────────────────────
    { id: 'w_y1_r',   type: 'wire', color: 'green',
      from: { ic: 'mux41', pin: 'y1' },
      to:   { component: 'r_out', end: 'p1' } },
    { id: 'w_out_led', type: 'wire', color: 'green',
      from: { component: 'r_out', end: 'p2' },
      to:   { led: 'led_out', end: 'anode' } },
    { id: 'w_out_gnd', type: 'wire', color: 'black',
      from: { led: 'led_out', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'A 4:1 multiplexer selects one of four data inputs based on two select lines. ' +
        'With S1=0,S0=0 → Y=I0; S1=0,S0=1 → Y=I1; S1=1,S0=0 → Y=I2; S1=1,S0=1 → Y=I3. ' +
        'The 74HC153 is a DIP-16 dual 4:1 MUX.',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC153',
      body: 'Mount the 74HC153 straddling the centre gap at column 8. ' +
        'Pin 1 (EN1_bar) at col 8 row e. ' +
        'The IC contains two independent 4:1 MUX channels; we use channel 1 (Y1).',
      show: ['bb', 'mux41'],
      highlight: 'mux41',
    },
    {
      title: 'Wire EN1_bar to GND (enable)',
      body: 'The enable input EN1_bar is active-low. ' +
        'Connect a black wire from mux41 en1_bar pin to the GND rail. ' +
        'This permanently enables channel 1.',
      show: ['bb', 'mux41', 'w_en_gnd'],
    },
    {
      title: 'Wire data inputs I0–I3',
      body: 'White wires from cols 1–4 (row a) to IC pins i0_1–i3_1. ' +
        'These are the four data inputs. Set I0=1, I1=0, I2=1, I3=0 for testing, ' +
        'or connect to DIP switches.',
      show: ['bb', 'mux41', 'w_en_gnd',
             'w_i0_mux41', 'w_i1_mux41', 'w_i2_mux41', 'w_i3_mux41'],
      activeInputs: { S1: 0, S0: 0, I0: 1, I1: 0, I2: 1, I3: 0 },
    },
    {
      title: 'Wire select inputs S0, S1',
      body: 'Red wire: col 5 row a → s0 pin (LSB of select). ' +
        'Orange wire: col 6 row a → s1 pin (MSB of select). ' +
        'S1,S0 together select which data input reaches the output.',
      show: ['bb', 'mux41', 'w_en_gnd',
             'w_i0_mux41', 'w_i1_mux41', 'w_i2_mux41', 'w_i3_mux41',
             'w_s0_mux41', 'w_s1_mux41'],
      activeInputs: { S1: 0, S0: 0, I0: 1, I1: 0, I2: 1, I3: 0 },
    },
    {
      title: 'Wire output Y1 → resistor → LED',
      body: 'Green wire from y1 pin → r_out p1 (col 20, c). ' +
        'Green wire r_out p2 → led_out anode (col 24, c). ' +
        'Black wire: led cathode → GND rail. Circuit is complete.',
      show: ['bb', 'mux41', 'w_en_gnd',
             'w_i0_mux41', 'w_i1_mux41', 'w_i2_mux41', 'w_i3_mux41',
             'w_s0_mux41', 'w_s1_mux41',
             'r_out', 'led_out', 'w_y1_r', 'w_out_led', 'w_out_gnd'],
      activeInputs: { S1: 0, S0: 0, I0: 1, I1: 0, I2: 1, I3: 0 },
    },
    {
      title: 'Test: S=00 selects I0',
      body: 'S1=0, S0=0. Output Y = I0. ' +
        'If I0=1, LED is ON. If I0=0, LED is OFF. ' +
        'Verify that only the I0 data value appears at the output.',
      show: ['bb', 'mux41', 'w_en_gnd',
             'w_i0_mux41', 'w_i1_mux41', 'w_i2_mux41', 'w_i3_mux41',
             'w_s0_mux41', 'w_s1_mux41',
             'r_out', 'led_out', 'w_y1_r', 'w_out_led', 'w_out_gnd'],
      activeInputs: { S1: 0, S0: 0, I0: 1, I1: 0, I2: 1, I3: 0 },
      highlight: 'led_out',
    },
    {
      title: 'Test: S=01 selects I1',
      body: 'S1=0, S0=1. Output Y = I1. ' +
        'With I1=0, LED is OFF. Change S0 from 0 to 1 — no gate delays, output follows instantly.',
      show: ['bb', 'mux41', 'w_en_gnd',
             'w_i0_mux41', 'w_i1_mux41', 'w_i2_mux41', 'w_i3_mux41',
             'w_s0_mux41', 'w_s1_mux41',
             'r_out', 'led_out', 'w_y1_r', 'w_out_led', 'w_out_gnd'],
      activeInputs: { S1: 0, S0: 1, I0: 1, I1: 0, I2: 1, I3: 0 },
    },
    {
      title: 'Test: S=10 and S=11',
      body: 'S1=1,S0=0 → Y=I2=1 (LED ON). S1=1,S0=1 → Y=I3=0 (LED OFF). ' +
        'The MUX faithfully routes the selected data bit to the output in all four cases.',
      show: ['bb', 'mux41', 'w_en_gnd',
             'w_i0_mux41', 'w_i1_mux41', 'w_i2_mux41', 'w_i3_mux41',
             'w_s0_mux41', 'w_s1_mux41',
             'r_out', 'led_out', 'w_y1_r', 'w_out_led', 'w_out_gnd'],
      activeInputs: { S1: 1, S0: 0, I0: 1, I1: 0, I2: 1, I3: 0 },
      highlight: 'led_out',
    },
  ],

  truthTable: {
    inputs:  ['S1', 'S0', 'I0', 'I1', 'I2', 'I3'],
    outputs: ['Y'],
    rows: [
      { inputs: { S1: 0, S0: 0, I0: 0, I1: 0, I2: 0, I3: 0 }, outputs: { Y: 0 } },
      { inputs: { S1: 0, S0: 0, I0: 1, I1: 0, I2: 0, I3: 0 }, outputs: { Y: 1 } },
      { inputs: { S1: 0, S0: 1, I0: 0, I1: 0, I2: 0, I3: 0 }, outputs: { Y: 0 } },
      { inputs: { S1: 0, S0: 1, I0: 0, I1: 1, I2: 0, I3: 0 }, outputs: { Y: 1 } },
      { inputs: { S1: 1, S0: 0, I0: 0, I1: 0, I2: 0, I3: 0 }, outputs: { Y: 0 } },
      { inputs: { S1: 1, S0: 0, I0: 0, I1: 0, I2: 1, I3: 0 }, outputs: { Y: 1 } },
      { inputs: { S1: 1, S0: 1, I0: 0, I1: 0, I2: 0, I3: 0 }, outputs: { Y: 0 } },
      { inputs: { S1: 1, S0: 1, I0: 0, I1: 0, I2: 0, I3: 1 }, outputs: { Y: 1 } },
    ],
  },
};
