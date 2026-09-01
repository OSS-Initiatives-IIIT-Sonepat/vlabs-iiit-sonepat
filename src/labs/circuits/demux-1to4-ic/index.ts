import { type Circuit } from '@/labs/types';

// ── 1:4 Demultiplexer using 74HC139 ──────────────────────────────────────────
// 74HC139 dual 2:4 DEMUX (DIP-16) — using channel 1
//
// Pin map at col 7:
//   e-bank: en_bar(7), a(8), b(9), y0(10), y1(11), y2(12), y3(13), GND(14)
//   f-bank: VCC(7)
//
// Outputs Y0–Y3 are active-LOW: the selected output goes LOW, others HIGH.
//
// Wiring:
//   EN_bar → GND (always enabled)
//   A, B   → select inputs (col 4, col 5 row a)
//   Y0–Y3  → 330 Ω → LEDs → GND  (LED lights when output = LOW)
//
// Output layout (active-low LEDs):
//   Y0: r_y0 (col 18, c) → led_y0 (col 22, c)
//   Y1: r_y1 (col 18, h) → led_y1 (col 22, h)
//   Y2: r_y2 (col 25, c) → led_y2 (col 29, c)
//   Y3: r_y3 (col 25, h) → led_y3 (col 29, h)

export const Demux1to4IC: Circuit = {
  id: 'demux-1to4-ic',
  title: '1:4 Demultiplexer using 74HC139',
  description:
    'A 1:4 demultiplexer routes a single enable signal to one of four outputs based on ' +
    'two select lines (A, B). The 74HC139 has active-LOW outputs: the selected output goes LOW. ' +
    'Implemented using the 74HC139 dual 2-to-4 decoder/demultiplexer IC.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── 74HC139 IC ────────────────────────────────────────────────────────
    { id: 'demux14', type: 'demux-1to4', mountedAt: { board: 'bb', col: 7, row: 'e' } },

    // ── Output resistors ──────────────────────────────────────────────────
    { id: 'r_y0', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 18, row: 'c' } },
    { id: 'r_y1', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 18, row: 'h' } },
    { id: 'r_y2', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 25, row: 'c' } },
    { id: 'r_y3', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 25, row: 'h' } },

    // ── Output LEDs (active-low: LED ON when output LOW) ──────────────────
    { id: 'led_y0', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'led_y1', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 22, row: 'h' } },
    { id: 'led_y2', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 29, row: 'c' } },
    { id: 'led_y3', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 29, row: 'h' } },

    // ── Enable: EN_bar tied to GND ────────────────────────────────────────
    { id: 'w_en_gnd', type: 'wire', color: 'black',
      from: { ic: 'demux14', pin: 'en_bar' },
      to:   { board: 'bb', rail: 'gnd_top', col: 7 } },

    // ── Select input wires ────────────────────────────────────────────────
    { id: 'w_a_demux14', type: 'wire', color: 'red',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'demux14', pin: 'a' } },
    { id: 'w_b_demux14', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 5, row: 'a' },
      to:   { ic: 'demux14', pin: 'b' } },

    // ── Output wires: y0–y3 → resistors → LEDs → GND ─────────────────────
    { id: 'w_y0_r',   type: 'wire', color: 'red',
      from: { ic: 'demux14', pin: 'y0' }, to: { component: 'r_y0', end: 'p1' } },
    { id: 'w_y0_led', type: 'wire', color: 'red',
      from: { component: 'r_y0', end: 'p2' }, to: { led: 'led_y0', end: 'anode' } },
    { id: 'w_y0_gnd', type: 'wire', color: 'black',
      from: { led: 'led_y0', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 1 } },

    { id: 'w_y1_r',   type: 'wire', color: 'yellow',
      from: { ic: 'demux14', pin: 'y1' }, to: { component: 'r_y1', end: 'p1' } },
    { id: 'w_y1_led', type: 'wire', color: 'yellow',
      from: { component: 'r_y1', end: 'p2' }, to: { led: 'led_y1', end: 'anode' } },
    { id: 'w_y1_gnd', type: 'wire', color: 'black',
      from: { led: 'led_y1', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 2 } },

    { id: 'w_y2_r',   type: 'wire', color: 'green',
      from: { ic: 'demux14', pin: 'y2' }, to: { component: 'r_y2', end: 'p1' } },
    { id: 'w_y2_led', type: 'wire', color: 'green',
      from: { component: 'r_y2', end: 'p2' }, to: { led: 'led_y2', end: 'anode' } },
    { id: 'w_y2_gnd', type: 'wire', color: 'black',
      from: { led: 'led_y2', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 3 } },

    { id: 'w_y3_r',   type: 'wire', color: 'blue',
      from: { ic: 'demux14', pin: 'y3' }, to: { component: 'r_y3', end: 'p1' } },
    { id: 'w_y3_led', type: 'wire', color: 'blue',
      from: { component: 'r_y3', end: 'p2' }, to: { led: 'led_y3', end: 'anode' } },
    { id: 'w_y3_gnd', type: 'wire', color: 'black',
      from: { led: 'led_y3', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 4 } },
  ],

  steps: [
    {
      title: 'Place the breadboard',
      body: 'A 1:4 demultiplexer routes one input to one of four outputs. ' +
        'The 74HC139 outputs are active-LOW: the selected output pin goes LOW (0 V). ' +
        'LEDs connected between output and GND will illuminate when selected.',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC139',
      body: 'Mount the 74HC139 DIP-16 IC at column 7, straddling the centre gap. ' +
        'Pin 1 (EN_bar) lands at col 7, row e. ' +
        'This IC contains two independent 2:4 demultiplexers; we use channel 1.',
      show: ['bb', 'demux14'],
      highlight: 'demux14',
    },
    {
      title: 'Tie EN_bar to GND (enable)',
      body: 'EN_bar is active-low enable. Connect a black wire from the en_bar pin to GND rail. ' +
        'The demultiplexer is now permanently enabled. ' +
        'If EN_bar were HIGH, all outputs would remain HIGH regardless of A and B.',
      show: ['bb', 'demux14', 'w_en_gnd'],
    },
    {
      title: 'Wire select inputs A and B',
      body: 'Red wire: col 4 row a → pin a (LSB). Orange wire: col 5 row a → pin b (MSB). ' +
        'AB=00→Y0 active, AB=01→Y1, AB=10→Y2, AB=11→Y3.',
      show: ['bb', 'demux14', 'w_en_gnd', 'w_a_demux14', 'w_b_demux14'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Wire output Y0–Y3 to LEDs',
      body: 'Each output pin drives a 330 Ω resistor, then an LED to GND. ' +
        'Since outputs are active-LOW, a LOW output forward-biases the LED. ' +
        'Four paths, two in top bank (c) and two in bottom bank (h).',
      show: ['bb', 'demux14', 'w_en_gnd', 'w_a_demux14', 'w_b_demux14',
             'r_y0', 'r_y1', 'r_y2', 'r_y3',
             'led_y0', 'led_y1', 'led_y2', 'led_y3',
             'w_y0_r', 'w_y0_led', 'w_y0_gnd',
             'w_y1_r', 'w_y1_led', 'w_y1_gnd',
             'w_y2_r', 'w_y2_led', 'w_y2_gnd',
             'w_y3_r', 'w_y3_led', 'w_y3_gnd'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Test: A=0, B=0 → Y0 active (LED0 ON)',
      body: 'AB=00 selects output Y0. Y0 goes LOW → red LED (led_y0) lights. ' +
        'Y1, Y2, Y3 remain HIGH → their LEDs are OFF. ' +
        'This confirms the 74HC139 decodes AB=00 to output 0.',
      show: ['bb', 'demux14', 'w_en_gnd', 'w_a_demux14', 'w_b_demux14',
             'r_y0', 'r_y1', 'r_y2', 'r_y3',
             'led_y0', 'led_y1', 'led_y2', 'led_y3',
             'w_y0_r', 'w_y0_led', 'w_y0_gnd',
             'w_y1_r', 'w_y1_led', 'w_y1_gnd',
             'w_y2_r', 'w_y2_led', 'w_y2_gnd',
             'w_y3_r', 'w_y3_led', 'w_y3_gnd'],
      activeInputs: { A: 0, B: 0 },
      highlight: 'led_y0',
    },
    {
      title: 'Test: A=1, B=1 → Y3 active (LED3 ON)',
      body: 'AB=11 selects output Y3. Y3 goes LOW → blue LED (led_y3) lights. ' +
        'Y0, Y1, Y2 remain HIGH → their LEDs are OFF. ' +
        'Verify all four combinations: AB=00→Y0, 01→Y1, 10→Y2, 11→Y3.',
      show: ['bb', 'demux14', 'w_en_gnd', 'w_a_demux14', 'w_b_demux14',
             'r_y0', 'r_y1', 'r_y2', 'r_y3',
             'led_y0', 'led_y1', 'led_y2', 'led_y3',
             'w_y0_r', 'w_y0_led', 'w_y0_gnd',
             'w_y1_r', 'w_y1_led', 'w_y1_gnd',
             'w_y2_r', 'w_y2_led', 'w_y2_gnd',
             'w_y3_r', 'w_y3_led', 'w_y3_gnd'],
      activeInputs: { A: 1, B: 1 },
      highlight: 'led_y3',
    },
  ],

  truthTable: {
    inputs:  ['A', 'B'],
    outputs: ['Y0', 'Y1', 'Y2', 'Y3'],
    rows: [
      { inputs: { A: 0, B: 0 }, outputs: { Y0: 0, Y1: 1, Y2: 1, Y3: 1 } },
      { inputs: { A: 0, B: 1 }, outputs: { Y0: 1, Y1: 0, Y2: 1, Y3: 1 } },
      { inputs: { A: 1, B: 0 }, outputs: { Y0: 1, Y1: 1, Y2: 0, Y3: 1 } },
      { inputs: { A: 1, B: 1 }, outputs: { Y0: 1, Y1: 1, Y2: 1, Y3: 0 } },
    ],
  },
};
