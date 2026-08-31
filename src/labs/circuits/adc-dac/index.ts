import { type Circuit } from '@/labs/types';

// ── ADC/DAC (R-2R Ladder DAC) Circuit ────────────────────────────────────
// Visual/analog — no simulation, no truth table.
// 4-bit R-2R ladder DAC: alternating 2 kΩ and 1 kΩ resistors.
//   r1 (2 kΩ, col 3 row c) — shunt to GND
//   r2 (1 kΩ, col 8 row c) — series
//   r3 (2 kΩ, col 13 row c) — shunt to GND
//   r4 (1 kΩ, col 18 row c) — series
// Output LED (green, col 23 row c) shows analog level.
// VCC/GND taps provide digital input levels.

export const AdcDacCircuit: Circuit = {
  id: 'adc-dac',
  title: 'ADC / DAC (R-2R Ladder)',
  description:
    'A 4-bit R-2R resistor ladder DAC (Digital-to-Analog Converter). ' +
    'Alternating 2 kΩ (shunt) and 1 kΩ (series) resistors form a binary-weighted voltage divider. ' +
    'Each input bit contributes a proportional voltage to the analog output. ' +
    'The green LED brightness indicates the output analog level.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Ladder resistors ──────────────────────────────────────────────────
    { id: 'r1', type: 'resistor', ohms: 2000, mountedAt: { board: 'bb', col: 3,  row: 'c' } },
    { id: 'r2', type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 8,  row: 'c' } },
    { id: 'r3', type: 'resistor', ohms: 2000, mountedAt: { board: 'bb', col: 13, row: 'c' } },
    { id: 'r4', type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 18, row: 'c' } },

    // ── Output LED ────────────────────────────────────────────────────────
    { id: 'led_out', type: 'led', color: 'green', mountedAt: { board: 'bb', col: 23, row: 'c' } },

    // ── Bit 0 (LSB): VCC → r1 p1 (shunt input) ──────────────────────────
    { id: 'w_bit0_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 3 },
      to:   { component: 'r1', end: 'p1' } },

    // ── r1 p2 → ladder junction (col 6, row c) → r2 p1 ──────────────────
    { id: 'w_r1_junc1', type: 'wire', color: 'white',
      from: { component: 'r1', end: 'p2' },
      to:   { board: 'bb', col: 6, row: 'c' } },
    { id: 'w_junc1_r2', type: 'wire', color: 'white',
      from: { board: 'bb', col: 6, row: 'd' },
      to:   { component: 'r2', end: 'p1' } },

    // ── Bit 1: VCC → junction at r2-r3 (col 11 row d) ───────────────────
    { id: 'w_bit1_junc2', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 11 },
      to:   { board: 'bb', col: 11, row: 'b' } },

    // ── r2 p2 → junction 2 (col 11, row c) → r3 p1 ─────────────────────
    { id: 'w_r2_junc2', type: 'wire', color: 'white',
      from: { component: 'r2', end: 'p2' },
      to:   { board: 'bb', col: 11, row: 'c' } },
    { id: 'w_junc2_r3', type: 'wire', color: 'white',
      from: { board: 'bb', col: 11, row: 'd' },
      to:   { component: 'r3', end: 'p1' } },

    // ── Bit 2: VCC → junction at r3-r4 (col 16 row d) ───────────────────
    { id: 'w_bit2_junc3', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 16 },
      to:   { board: 'bb', col: 16, row: 'b' } },

    // ── r3 p2 → junction 3 (col 16, row c) → r4 p1 ─────────────────────
    { id: 'w_r3_junc3', type: 'wire', color: 'white',
      from: { component: 'r3', end: 'p2' },
      to:   { board: 'bb', col: 16, row: 'c' } },
    { id: 'w_junc3_r4', type: 'wire', color: 'white',
      from: { board: 'bb', col: 16, row: 'd' },
      to:   { component: 'r4', end: 'p1' } },

    // ── Bit 3 (MSB): VCC → junction at r4 output (col 21 row d) ─────────
    { id: 'w_bit3_junc4', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 21 },
      to:   { board: 'bb', col: 21, row: 'b' } },

    // ── r4 p2 → output junction (col 21, row c) → LED anode ─────────────
    { id: 'w_r4_out', type: 'wire', color: 'green',
      from: { component: 'r4', end: 'p2' },
      to:   { board: 'bb', col: 21, row: 'c' } },
    { id: 'w_out_led', type: 'wire', color: 'green',
      from: { board: 'bb', col: 21, row: 'd' },
      to:   { led: 'led_out', end: 'anode' } },

    // ── LED cathode → GND ────────────────────────────────────────────────
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led_out', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 24 } },

    // ── Shunt GND connections (r1 and r3 lower ends) ─────────────────────
    { id: 'w_r1_gnd', type: 'wire', color: 'black',
      from: { board: 'bb', col: 6, row: 'e' },
      to:   { board: 'bb', rail: 'gnd_top', col: 6 } },
    { id: 'w_r3_gnd', type: 'wire', color: 'black',
      from: { board: 'bb', col: 16, row: 'e' },
      to:   { board: 'bb', rail: 'gnd_top', col: 16 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a 4-bit R-2R ladder DAC — ' +
        'a simple digital-to-analog converter using only resistors.',
      show: ['bb'],
    },
    {
      title: 'Place the ladder resistors',
      body: 'Insert R1 (2 kΩ, col 3), R2 (1 kΩ, col 8), R3 (2 kΩ, col 13), R4 (1 kΩ, col 18) — all row c. ' +
        'The alternating 2R/R pattern creates binary-weighted voltage division.',
      show: ['bb', 'r1', 'r2', 'r3', 'r4'],
      highlight: 'r1',
    },
    {
      title: 'Place the output LED',
      body: 'Insert the green LED at col 23, row c. Its brightness is proportional to the ' +
        'analog output voltage of the DAC.',
      show: ['bb', 'r1', 'r2', 'r3', 'r4', 'led_out'],
      highlight: 'led_out',
    },
    {
      title: 'Wire the ladder chain',
      body: 'White wires connect each resistor to the next through junction nodes. ' +
        'This forms the R-2R ladder backbone: r1 → r2 → r3 → r4 → output.',
      show: ['bb', 'r1', 'r2', 'r3', 'r4', 'led_out',
        'w_r1_junc1', 'w_junc1_r2', 'w_r2_junc2', 'w_junc2_r3', 'w_r3_junc3', 'w_junc3_r4'],
    },
    {
      title: 'Wire digital input taps',
      body: 'Red wires: VCC rail → each ladder junction (bits 0–3). ' +
        'Each bit tap adds a binary-weighted contribution to the output. ' +
        'In practice, these would be driven by digital logic HIGH/LOW.',
      show: ['bb', 'r1', 'r2', 'r3', 'r4', 'led_out',
        'w_r1_junc1', 'w_junc1_r2', 'w_r2_junc2', 'w_junc2_r3', 'w_r3_junc3', 'w_junc3_r4',
        'w_bit0_r1', 'w_bit1_junc2', 'w_bit2_junc3', 'w_bit3_junc4'],
    },
    {
      title: 'Wire output and GND connections',
      body: 'Green wires: r4 output → LED anode. Black wires: LED cathode → GND, ' +
        'shunt resistor GND taps. The ladder is complete.',
      show: ['bb', 'r1', 'r2', 'r3', 'r4', 'led_out',
        'w_r1_junc1', 'w_junc1_r2', 'w_r2_junc2', 'w_junc2_r3', 'w_r3_junc3', 'w_junc3_r4',
        'w_bit0_r1', 'w_bit1_junc2', 'w_bit2_junc3', 'w_bit3_junc4',
        'w_r4_out', 'w_out_led', 'w_led_gnd', 'w_r1_gnd', 'w_r3_gnd'],
    },
    {
      title: 'Test the DAC',
      body: 'Toggle each input bit (connect to VCC or GND). With all bits HIGH (1111 = 15), ' +
        'output is near VCC. With 1000 (MSB only), output ≈ VCC/2. ' +
        'The LED brightness changes proportionally to the digital input value.',
      show: ['bb', 'r1', 'r2', 'r3', 'r4', 'led_out',
        'w_r1_junc1', 'w_junc1_r2', 'w_r2_junc2', 'w_junc2_r3', 'w_r3_junc3', 'w_junc3_r4',
        'w_bit0_r1', 'w_bit1_junc2', 'w_bit2_junc3', 'w_bit3_junc4',
        'w_r4_out', 'w_out_led', 'w_led_gnd', 'w_r1_gnd', 'w_r3_gnd'],
    },
  ],
};
