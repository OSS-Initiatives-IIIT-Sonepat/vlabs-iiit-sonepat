import { type Circuit } from '@/labs/types';

// ── Thevenin Theorem Circuit ─────────────────────────────────────────────
// Visual/analog — no simulation.
// VCC → R1 (1 kΩ, col 5 row c) → node A → R2 (2.2 kΩ, col 10 row c) → GND
// From node A: R_load (1 kΩ, col 15 row c) → LED (green, col 20 row c) → GND
// Blue voltmeter probes at node A.
//
// Thevenin equivalent: V_th = VCC × R2/(R1+R2), R_th = R1‖R2

export const TheveninTheoremCircuit: Circuit = {
  id: 'thevenin-theorem',
  title: 'Thevenin Theorem',
  description:
    'Demonstrates Thevenin\'s theorem by reducing a two-resistor network to its Thevenin equivalent. ' +
    'VCC drives R1 (1 kΩ) and R2 (2.2 kΩ) in a voltage divider. Node A feeds a 1 kΩ load. ' +
    'V_th = VCC × R2/(R1+R2) and R_th = R1‖R2 predict the load voltage and current.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Network resistors ─────────────────────────────────────────────────
    { id: 'r1', type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'r2', type: 'resistor', ohms: 2200, mountedAt: { board: 'bb', col: 10, row: 'c' } },

    // ── Load and indicator ────────────────────────────────────────────────
    { id: 'r_load', type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 15, row: 'c' } },
    { id: 'led1',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 20, row: 'c' } },

    // ── VCC → R1 p1 ──────────────────────────────────────────────────────
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { component: 'r1', end: 'p1' } },

    // ── R1 p2 → node A (col 8, row c) ────────────────────────────────────
    { id: 'w_r1_nodeA', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'c' } },

    // ── Node A → R2 p1 ───────────────────────────────────────────────────
    { id: 'w_nodeA_r2', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 8, row: 'd' },
      to:   { component: 'r2', end: 'p1' } },

    // ── R2 p2 → GND rail ─────────────────────────────────────────────────
    { id: 'w_r2_gnd', type: 'wire', color: 'black',
      from: { component: 'r2', end: 'p2' },
      to:   { board: 'bb', rail: 'gnd_top', col: 13 } },

    // ── Node A → R_load p1 ───────────────────────────────────────────────
    { id: 'w_nodeA_rload', type: 'wire', color: 'green',
      from: { board: 'bb', col: 8, row: 'b' },
      to:   { component: 'r_load', end: 'p1' } },

    // ── R_load p2 → LED anode ────────────────────────────────────────────
    { id: 'w_rload_led', type: 'wire', color: 'green',
      from: { component: 'r_load', end: 'p2' },
      to:   { led: 'led1', end: 'anode' } },

    // ── LED cathode → GND ────────────────────────────────────────────────
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 21 } },

    // ── Voltmeter probes at node A (blue) ────────────────────────────────
    { id: 'w_vm_pos', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 8, row: 'a' },
      to:   { board: 'bb', col: 7, row: 'a' } },
    { id: 'w_vm_neg', type: 'wire', color: 'blue',
      from: { board: 'bb', rail: 'gnd_top', col: 8 },
      to:   { board: 'bb', col: 9, row: 'a' } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a resistive network and verify Thevenin\'s theorem.',
      show: ['bb'],
    },
    {
      title: 'Place R1 (1 kΩ)',
      body: 'Insert R1 (1 kΩ) at cols 5–8, row c. This connects VCC to node A.',
      show: ['bb', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place R2 (2.2 kΩ)',
      body: 'Insert R2 (2.2 kΩ) at cols 10–13, row c. This connects node A to GND, ' +
        'forming a voltage divider with R1.',
      show: ['bb', 'r1', 'r2'],
      highlight: 'r2',
    },
    {
      title: 'Place the load resistor',
      body: 'Insert R_load (1 kΩ) at cols 15–18, row c. Connected from node A, ' +
        'it draws current from the Thevenin equivalent source.',
      show: ['bb', 'r1', 'r2', 'r_load'],
      highlight: 'r_load',
    },
    {
      title: 'Place the indicator LED',
      body: 'Insert the green LED at cols 20–21, row c. Its brightness indicates load current.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1'],
      highlight: 'led1',
    },
    {
      title: 'Wire VCC to R1 and R1 to node A',
      body: 'Red wire: VCC → R1 p1. Orange wire: R1 p2 → node A (col 8).',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1', 'w_vcc_r1', 'w_r1_nodeA'],
    },
    {
      title: 'Wire node A to R2 and R2 to GND',
      body: 'Orange wire: node A (col 8 row d) → R2 p1. Black wire: R2 p2 → GND rail. ' +
        'The voltage divider is complete.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_r1_nodeA', 'w_nodeA_r2', 'w_r2_gnd'],
    },
    {
      title: 'Wire load path',
      body: 'Green wires: node A (col 8 row b) → R_load p1, R_load p2 → LED anode. ' +
        'Black wire: LED cathode → GND.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_r1_nodeA', 'w_nodeA_r2', 'w_r2_gnd',
        'w_nodeA_rload', 'w_rload_led', 'w_led_gnd'],
    },
    {
      title: 'Add voltmeter probes at node A',
      body: 'Blue wires: voltmeter probes measure V_th at node A. ' +
        'V_th = VCC × 2200/(1000+2200) ≈ 3.44 V. R_th = 1000‖2200 ≈ 687 Ω. ' +
        'Load voltage = V_th × R_load/(R_th + R_load).',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_r1_nodeA', 'w_nodeA_r2', 'w_r2_gnd',
        'w_nodeA_rload', 'w_rload_led', 'w_led_gnd',
        'w_vm_pos', 'w_vm_neg'],
    },
  ],
};
