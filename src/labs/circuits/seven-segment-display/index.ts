import { type Circuit } from '@/labs/types';

// ── Seven Segment Display Circuit ────────────────────────────────────────
// Visual/analog — no simulation, no truth table.
// 7 LEDs representing segments a–g, each with a 330 Ω resistor.
// VCC → resistor → LED → GND for each segment.
//
// Layout:
//   Segment a: r_a (col 3 row c)  → led_a (col 10 row c)
//   Segment b: r_b (col 3 row h)  → led_b (col 13 row c)
//   Segment c: r_c (col 13 row h) → led_c (col 16 row c)
//   Segment d: r_d (col 23 row c) → led_d (col 10 row h)
//   Segment e: r_e (col 23 row h) → led_e (col 13 row h) — shifted to avoid conflict
//   Segment f: r_f (col 33 row c) → led_f (col 16 row h)
//   Segment g: r_g (col 33 row h) → led_g (col 19 row c)

export const SevenSegmentDisplayCircuit: Circuit = {
  id: 'seven-segment-display',
  title: 'Seven Segment Display',
  description:
    'A seven-segment display built from 7 individual LEDs (segments a through g), ' +
    'each driven through a 330 Ω current-limiting resistor. ' +
    'By selectively enabling segments, any decimal digit (0–9) can be displayed.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Resistors (330 Ω each) ────────────────────────────────────────────
    { id: 'r_a', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 3,  row: 'c' } },
    { id: 'r_b', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 3,  row: 'h' } },
    { id: 'r_c', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 8,  row: 'c' } },
    { id: 'r_d', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 8,  row: 'h' } },
    { id: 'r_e', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 13, row: 'c' } },
    { id: 'r_f', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 13, row: 'h' } },
    { id: 'r_g', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 18, row: 'c' } },

    // ── LEDs (segments a–g) ───────────────────────────────────────────────
    { id: 'led_a', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 23, row: 'c' } },
    { id: 'led_b', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 23, row: 'h' } },
    { id: 'led_c', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 26, row: 'c' } },
    { id: 'led_d', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 26, row: 'h' } },
    { id: 'led_e', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 29, row: 'c' } },
    { id: 'led_f', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 29, row: 'h' } },
    { id: 'led_g', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 32, row: 'c' } },

    // ── VCC → resistors ──────────────────────────────────────────────────
    { id: 'w_vcc_ra', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 3 },  to: { component: 'r_a', end: 'p1' } },
    { id: 'w_vcc_rb', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 2 },  to: { component: 'r_b', end: 'p1' } },
    { id: 'w_vcc_rc', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 8 },  to: { component: 'r_c', end: 'p1' } },
    { id: 'w_vcc_rd', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 7 },  to: { component: 'r_d', end: 'p1' } },
    { id: 'w_vcc_re', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 13 }, to: { component: 'r_e', end: 'p1' } },
    { id: 'w_vcc_rf', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 12 }, to: { component: 'r_f', end: 'p1' } },
    { id: 'w_vcc_rg', type: 'wire', color: 'red', from: { board: 'bb', rail: 'vcc_top', col: 18 }, to: { component: 'r_g', end: 'p1' } },

    // ── Resistors → LED anodes ───────────────────────────────────────────
    { id: 'w_ra_leda', type: 'wire', color: 'orange', from: { component: 'r_a', end: 'p2' }, to: { led: 'led_a', end: 'anode' } },
    { id: 'w_rb_ledb', type: 'wire', color: 'orange', from: { component: 'r_b', end: 'p2' }, to: { led: 'led_b', end: 'anode' } },
    { id: 'w_rc_ledc', type: 'wire', color: 'orange', from: { component: 'r_c', end: 'p2' }, to: { led: 'led_c', end: 'anode' } },
    { id: 'w_rd_ledd', type: 'wire', color: 'orange', from: { component: 'r_d', end: 'p2' }, to: { led: 'led_d', end: 'anode' } },
    { id: 'w_re_lede', type: 'wire', color: 'orange', from: { component: 'r_e', end: 'p2' }, to: { led: 'led_e', end: 'anode' } },
    { id: 'w_rf_ledf', type: 'wire', color: 'orange', from: { component: 'r_f', end: 'p2' }, to: { led: 'led_f', end: 'anode' } },
    { id: 'w_rg_ledg', type: 'wire', color: 'orange', from: { component: 'r_g', end: 'p2' }, to: { led: 'led_g', end: 'anode' } },

    // ── LED cathodes → GND ───────────────────────────────────────────────
    { id: 'w_leda_gnd', type: 'wire', color: 'black', from: { led: 'led_a', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 24 } },
    { id: 'w_ledb_gnd', type: 'wire', color: 'black', from: { led: 'led_b', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 25 } },
    { id: 'w_ledc_gnd', type: 'wire', color: 'black', from: { led: 'led_c', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 27 } },
    { id: 'w_ledd_gnd', type: 'wire', color: 'black', from: { led: 'led_d', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 28 } },
    { id: 'w_lede_gnd', type: 'wire', color: 'black', from: { led: 'led_e', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 30 } },
    { id: 'w_ledf_gnd', type: 'wire', color: 'black', from: { led: 'led_f', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 31 } },
    { id: 'w_ledg_gnd', type: 'wire', color: 'black', from: { led: 'led_g', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 33 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a seven-segment display from 7 individual LEDs, ' +
        'each representing one segment (a through g).',
      show: ['bb'],
    },
    {
      title: 'Place all 7 segment LEDs',
      body: 'Insert 7 red LEDs: led_a through led_g. These represent the seven segments of the display. ' +
        'Segments a-c-e-g on the top bank, b-d-f on the bottom bank.',
      show: ['bb', 'led_a', 'led_b', 'led_c', 'led_d', 'led_e', 'led_f', 'led_g'],
      highlight: 'led_a',
    },
    {
      title: 'Place all 7 current-limiting resistors',
      body: 'Insert 7 × 330 Ω resistors (r_a through r_g). Each limits current to ~10 mA per segment.',
      show: ['bb', 'led_a', 'led_b', 'led_c', 'led_d', 'led_e', 'led_f', 'led_g',
        'r_a', 'r_b', 'r_c', 'r_d', 'r_e', 'r_f', 'r_g'],
      highlight: 'r_a',
    },
    {
      title: 'Wire VCC to all resistors',
      body: 'Red wires: VCC rail → each resistor p1. In practice, a BCD-to-7-segment decoder IC ' +
        'would selectively drive each segment.',
      show: ['bb', 'led_a', 'led_b', 'led_c', 'led_d', 'led_e', 'led_f', 'led_g',
        'r_a', 'r_b', 'r_c', 'r_d', 'r_e', 'r_f', 'r_g',
        'w_vcc_ra', 'w_vcc_rb', 'w_vcc_rc', 'w_vcc_rd', 'w_vcc_re', 'w_vcc_rf', 'w_vcc_rg'],
    },
    {
      title: 'Wire resistors to LED anodes',
      body: 'Orange wires: each resistor p2 → corresponding LED anode. ' +
        'Seven parallel paths, one per segment.',
      show: ['bb', 'led_a', 'led_b', 'led_c', 'led_d', 'led_e', 'led_f', 'led_g',
        'r_a', 'r_b', 'r_c', 'r_d', 'r_e', 'r_f', 'r_g',
        'w_vcc_ra', 'w_vcc_rb', 'w_vcc_rc', 'w_vcc_rd', 'w_vcc_re', 'w_vcc_rf', 'w_vcc_rg',
        'w_ra_leda', 'w_rb_ledb', 'w_rc_ledc', 'w_rd_ledd', 'w_re_lede', 'w_rf_ledf', 'w_rg_ledg'],
    },
    {
      title: 'Wire all LED cathodes to GND — display complete',
      body: 'Black wires: all LED cathodes → GND rail. With all segments lit, the display shows "8". ' +
        'Selectively disconnecting segments displays other digits (e.g., a+b+c+d+e+f = "0", b+c = "1").',
      show: ['bb', 'led_a', 'led_b', 'led_c', 'led_d', 'led_e', 'led_f', 'led_g',
        'r_a', 'r_b', 'r_c', 'r_d', 'r_e', 'r_f', 'r_g',
        'w_vcc_ra', 'w_vcc_rb', 'w_vcc_rc', 'w_vcc_rd', 'w_vcc_re', 'w_vcc_rf', 'w_vcc_rg',
        'w_ra_leda', 'w_rb_ledb', 'w_rc_ledc', 'w_rd_ledd', 'w_re_lede', 'w_rf_ledf', 'w_rg_ledg',
        'w_leda_gnd', 'w_ledb_gnd', 'w_ledc_gnd', 'w_ledd_gnd', 'w_lede_gnd', 'w_ledf_gnd', 'w_ledg_gnd'],
    },
  ],
};
