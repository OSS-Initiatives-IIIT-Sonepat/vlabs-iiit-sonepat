import { type Circuit } from '@/labs/types';

// ── Superposition Theorem Circuit ────────────────────────────────────────
// Visual/analog — no simulation.
// Two sources (both from VCC rail at different columns) feed through
// R1 (1 kΩ) and R2 (2.2 kΩ) to a common junction. The junction drives
// R_load (3.3 kΩ) → LED (red) → GND.
//
// Layout:
//   R1 (1 kΩ)   at col 3, row c — from VCC col 3
//   R2 (2.2 kΩ) at col 3, row h — from VCC col 1
//   Junction at col 8
//   R_load (3.3 kΩ) at col 10, row c
//   LED (red) at col 15, row c

export const SuperpositionTheoremCircuit: Circuit = {
  id: 'superposition-theorem',
  title: 'Superposition Theorem',
  description:
    'Demonstrates the superposition theorem: the response in any branch of a linear circuit ' +
    'with multiple sources equals the algebraic sum of responses due to each source acting alone. ' +
    'Two voltage sources feed R1 (1 kΩ) and R2 (2.2 kΩ) to a common node with a 3.3 kΩ load.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'r1',     type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 3,  row: 'c' } },
    { id: 'r2',     type: 'resistor', ohms: 2200, mountedAt: { board: 'bb', col: 3,  row: 'h' } },
    { id: 'r_load', type: 'resistor', ohms: 3300, mountedAt: { board: 'bb', col: 10, row: 'c' } },
    { id: 'led1',   type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 15, row: 'c' } },

    // ── Source 1: VCC → R1 p1 ─────────────────────────────────────────────
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 3 },
      to:   { component: 'r1', end: 'p1' } },

    // ── Source 2: VCC → R2 p1 ─────────────────────────────────────────────
    { id: 'w_vcc_r2', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 1 },
      to:   { component: 'r2', end: 'p1' } },

    // ── R1 p2 → junction (col 8, row c) ──────────────────────────────────
    { id: 'w_r1_junc', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'c' } },

    // ── R2 p2 → junction (col 8, row h → col 8, row d via column) ───────
    { id: 'w_r2_junc', type: 'wire', color: 'orange',
      from: { component: 'r2', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'h' } },

    // ── Junction link top ↔ bottom bank ──────────────────────────────────
    { id: 'w_junc_link', type: 'wire', color: 'white',
      from: { board: 'bb', col: 8, row: 'd' },
      to:   { board: 'bb', col: 8, row: 'g' } },

    // ── Junction → R_load p1 ─────────────────────────────────────────────
    { id: 'w_junc_rload', type: 'wire', color: 'green',
      from: { board: 'bb', col: 8, row: 'b' },
      to:   { component: 'r_load', end: 'p1' } },

    // ── R_load p2 → LED anode ────────────────────────────────────────────
    { id: 'w_rload_led', type: 'wire', color: 'green',
      from: { component: 'r_load', end: 'p2' },
      to:   { led: 'led1', end: 'anode' } },

    // ── LED cathode → GND rail ───────────────────────────────────────────
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 16 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a circuit with two voltage sources to demonstrate superposition.',
      show: ['bb'],
    },
    {
      title: 'Place R1 (1 kΩ) — Source 1 path',
      body: 'Insert R1 (1 kΩ) at cols 3–6, row c (top bank). ' +
        'This carries current from the first voltage source.',
      show: ['bb', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place R2 (2.2 kΩ) — Source 2 path',
      body: 'Insert R2 (2.2 kΩ) at cols 3–6, row h (bottom bank). ' +
        'This carries current from the second voltage source.',
      show: ['bb', 'r1', 'r2'],
      highlight: 'r2',
    },
    {
      title: 'Place R_load and LED',
      body: 'Insert R_load (3.3 kΩ) at cols 10–13, row c. Red LED at cols 15–16, row c. ' +
        'LED brightness indicates the combined current from both sources.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1'],
      highlight: 'r_load',
    },
    {
      title: 'Wire both sources to resistors',
      body: 'Red wires: VCC (col 3) → R1 p1, VCC (col 1) → R2 p1. ' +
        'Two independent source connections.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1', 'w_vcc_r1', 'w_vcc_r2'],
    },
    {
      title: 'Wire resistors to junction',
      body: 'Orange wires: R1 p2 → junction (col 8 row c), R2 p2 → junction (col 8 row h). ' +
        'White wire bridges top and bottom banks at col 8.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_vcc_r2', 'w_r1_junc', 'w_r2_junc', 'w_junc_link'],
    },
    {
      title: 'Wire junction to load path',
      body: 'Green wires: junction → R_load p1, R_load p2 → LED anode. ' +
        'Black wire: LED cathode → GND.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_vcc_r2', 'w_r1_junc', 'w_r2_junc', 'w_junc_link',
        'w_junc_rload', 'w_rload_led', 'w_led_gnd'],
    },
    {
      title: 'Verify superposition',
      body: 'To verify: (1) Remove Source 2 (short R2), measure I_load due to Source 1 only. ' +
        '(2) Remove Source 1, measure due to Source 2 only. ' +
        '(3) Sum equals the total measured with both active.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_vcc_r2', 'w_r1_junc', 'w_r2_junc', 'w_junc_link',
        'w_junc_rload', 'w_rload_led', 'w_led_gnd'],
    },
  ],
};
