import { type Circuit } from '@/labs/types';

// ── Full-Wave Bridge Rectifier Circuit ───────────────────────────────────
// Visual/analog — no simulation.
// Bridge of 4 LEDs (diodes): d1(col5 row c), d2(col5 row h), d3(col10 row c), d4(col10 row h).
// R_load (1 kΩ, col15 row c). Output indicator LED (green, col20 row c).
//
// Bridge topology:
//   VCC → d1 anode, d1 cathode → top node → d3 anode side
//   d3 cathode → GND.  d2 & d4 form the other pair.
//   Load is connected across the DC output nodes.

export const FullWaveRectifierCircuit: Circuit = {
  id: 'full-wave-rectifier',
  title: 'Full-Wave Bridge Rectifier',
  description:
    'A full-wave bridge rectifier using four diodes (modelled as yellow LEDs). ' +
    'Both positive and negative half-cycles are rectified to produce a smoother pulsating DC. ' +
    'A 1 kΩ load resistor and green output LED indicate the rectified output.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Bridge diodes (yellow LEDs) ───────────────────────────────────────
    { id: 'd1', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'd2', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 5,  row: 'h' } },
    { id: 'd3', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 10, row: 'c' } },
    { id: 'd4', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 10, row: 'h' } },

    // ── Load resistor and output LED ──────────────────────────────────────
    { id: 'r_load',   type: 'resistor', ohms: 1000,  mountedAt: { board: 'bb', col: 15, row: 'c' } },
    { id: 'led_out',  type: 'led', color: 'green',   mountedAt: { board: 'bb', col: 20, row: 'c' } },

    // ── VCC → d1 anode ────────────────────────────────────────────────────
    { id: 'w_vcc_d1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { led: 'd1', end: 'anode' } },

    // ── d1 cathode → top DC+ node (col 8, row b) ─────────────────────────
    { id: 'w_d1_dcplus', type: 'wire', color: 'orange',
      from: { led: 'd1', end: 'cathode' },
      to:   { board: 'bb', col: 8, row: 'b' } },

    // ── d3 anode → top DC+ node ───────────────────────────────────────────
    { id: 'w_d3_dcplus', type: 'wire', color: 'orange',
      from: { led: 'd3', end: 'anode' },
      to:   { board: 'bb', col: 8, row: 'c' } },

    // ── d3 cathode → GND ──────────────────────────────────────────────────
    { id: 'w_d3_gnd', type: 'wire', color: 'black',
      from: { led: 'd3', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 11 } },

    // ── VCC → d2 anode (bottom bank, other half-cycle) ───────────────────
    { id: 'w_vcc_d2', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 3 },
      to:   { led: 'd2', end: 'anode' } },

    // ── d2 cathode → bottom DC+ node (col 8, row i) ──────────────────────
    { id: 'w_d2_dcplus', type: 'wire', color: 'orange',
      from: { led: 'd2', end: 'cathode' },
      to:   { board: 'bb', col: 8, row: 'i' } },

    // ── d4 anode → bottom DC+ node ───────────────────────────────────────
    { id: 'w_d4_dcplus', type: 'wire', color: 'orange',
      from: { led: 'd4', end: 'anode' },
      to:   { board: 'bb', col: 8, row: 'h' } },

    // ── d4 cathode → GND ─────────────────────────────────────────────────
    { id: 'w_d4_gnd', type: 'wire', color: 'black',
      from: { led: 'd4', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 13 } },

    // ── DC+ node → R_load p1 ─────────────────────────────────────────────
    { id: 'w_dcplus_rload', type: 'wire', color: 'green',
      from: { board: 'bb', col: 8, row: 'a' },
      to:   { component: 'r_load', end: 'p1' } },

    // ── R_load p2 → output LED anode ─────────────────────────────────────
    { id: 'w_rload_led', type: 'wire', color: 'green',
      from: { component: 'r_load', end: 'p2' },
      to:   { led: 'led_out', end: 'anode' } },

    // ── Output LED cathode → GND ─────────────────────────────────────────
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led_out', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 21 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a full-wave bridge rectifier using four diodes.',
      show: ['bb'],
    },
    {
      title: 'Place bridge diodes (d1, d2)',
      body: 'Insert d1 (col 5, row c, top bank) and d2 (col 5, row h, bottom bank). ' +
        'These form the left arm of the bridge.',
      show: ['bb', 'd1', 'd2'],
      highlight: 'd1',
    },
    {
      title: 'Place bridge diodes (d3, d4)',
      body: 'Insert d3 (col 10, row c, top bank) and d4 (col 10, row h, bottom bank). ' +
        'These form the right arm of the bridge.',
      show: ['bb', 'd1', 'd2', 'd3', 'd4'],
      highlight: 'd3',
    },
    {
      title: 'Place load resistor and output LED',
      body: 'Insert R_load (1 kΩ) at col 15 row c and the green output LED at col 20 row c. ' +
        'The LED indicates rectified DC output.',
      show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out'],
      highlight: 'r_load',
    },
    {
      title: 'Wire VCC to bridge inputs',
      body: 'Red wires: VCC → d1 anode (col 5) and VCC → d2 anode (col 3). ' +
        'AC input feeds both arms of the bridge.',
      show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out',
        'w_vcc_d1', 'w_vcc_d2'],
    },
    {
      title: 'Wire bridge internal connections',
      body: 'Orange wires connect diode outputs to DC+ junction nodes (col 8). ' +
        'Both half-cycles produce current at the same polarity at the DC+ node.',
      show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out',
        'w_vcc_d1', 'w_vcc_d2',
        'w_d1_dcplus', 'w_d3_dcplus', 'w_d2_dcplus', 'w_d4_dcplus'],
    },
    {
      title: 'Wire GND connections',
      body: 'Black wires: d3 cathode → GND, d4 cathode → GND. ' +
        'Completes the return path for both half-cycles.',
      show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out',
        'w_vcc_d1', 'w_vcc_d2',
        'w_d1_dcplus', 'w_d3_dcplus', 'w_d2_dcplus', 'w_d4_dcplus',
        'w_d3_gnd', 'w_d4_gnd'],
    },
    {
      title: 'Wire load and output LED',
      body: 'Green wires: DC+ node → R_load → output LED. Black wire: LED cathode → GND. ' +
        'The green LED lights on both half-cycles, confirming full-wave rectification.',
      show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out',
        'w_vcc_d1', 'w_vcc_d2',
        'w_d1_dcplus', 'w_d3_dcplus', 'w_d2_dcplus', 'w_d4_dcplus',
        'w_d3_gnd', 'w_d4_gnd',
        'w_dcplus_rload', 'w_rload_led', 'w_led_gnd'],
    },
  ],
};
