import { type Circuit } from '@/labs/types';

// ── Norton Theorem Circuit ───────────────────────────────────────────────
// Visual/analog — no simulation.
// Same network as Thevenin:
//   VCC → R1 (1 kΩ, col 5 row c) → node → R2 (2.2 kΩ, col 10 row c) → GND
//   node → R_load (1 kΩ, col 15 row c) → LED yellow (col 20 row c) → GND
// Orange ammeter wire in series with load to indicate Norton current I_N.

export const NortonTheoremCircuit: Circuit = {
  id: 'norton-theorem',
  title: 'Norton Theorem',
  description:
    'Demonstrates Norton\'s theorem: any linear two-terminal network can be replaced by ' +
    'a current source I_N in parallel with R_N. Same resistive network as Thevenin — ' +
    'VCC, R1 (1 kΩ), R2 (2.2 kΩ) — but analysed for short-circuit current. ' +
    'An ammeter wire (orange) in series with the 1 kΩ load measures the Norton current.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Network resistors ─────────────────────────────────────────────────
    { id: 'r1', type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'r2', type: 'resistor', ohms: 2200, mountedAt: { board: 'bb', col: 10, row: 'c' } },

    // ── Load and indicator ────────────────────────────────────────────────
    { id: 'r_load', type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 15, row: 'c' } },
    { id: 'led1',   type: 'led', color: 'yellow',  mountedAt: { board: 'bb', col: 20, row: 'c' } },

    // ── VCC → R1 p1 ──────────────────────────────────────────────────────
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { component: 'r1', end: 'p1' } },

    // ── R1 p2 → node (col 8, row c) ──────────────────────────────────────
    { id: 'w_r1_node', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'c' } },

    // ── Node → R2 p1 ─────────────────────────────────────────────────────
    { id: 'w_node_r2', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 8, row: 'd' },
      to:   { component: 'r2', end: 'p1' } },

    // ── R2 p2 → GND rail ─────────────────────────────────────────────────
    { id: 'w_r2_gnd', type: 'wire', color: 'black',
      from: { component: 'r2', end: 'p2' },
      to:   { board: 'bb', rail: 'gnd_top', col: 13 } },

    // ── Node → ammeter wire (orange) → R_load p1 ─────────────────────────
    { id: 'w_ammeter', type: 'wire', color: 'orange',
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

    // ── Ammeter indicator probes (orange, in series position) ────────────
    { id: 'w_am_probe_pos', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 8, row: 'a' },
      to:   { board: 'bb', col: 7, row: 'a' } },
    { id: 'w_am_probe_neg', type: 'wire', color: 'orange',
      from: { component: 'r_load', end: 'p1' },
      to:   { board: 'bb', col: 15, row: 'a' } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build the same network as Thevenin but analyse it using Norton\'s theorem.',
      show: ['bb'],
    },
    {
      title: 'Place R1 (1 kΩ)',
      body: 'Insert R1 (1 kΩ) at cols 5–8, row c. Connects VCC to the network node.',
      show: ['bb', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place R2 (2.2 kΩ)',
      body: 'Insert R2 (2.2 kΩ) at cols 10–13, row c. Connects the node to GND.',
      show: ['bb', 'r1', 'r2'],
      highlight: 'r2',
    },
    {
      title: 'Place the load resistor',
      body: 'Insert R_load (1 kΩ) at cols 15–18, row c. The Norton current splits between R_N and R_load.',
      show: ['bb', 'r1', 'r2', 'r_load'],
      highlight: 'r_load',
    },
    {
      title: 'Place the indicator LED',
      body: 'Insert the yellow LED at cols 20–21, row c. Its brightness reflects the load current.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1'],
      highlight: 'led1',
    },
    {
      title: 'Wire VCC to R1, R1 to node, node to R2, R2 to GND',
      body: 'Red wire: VCC → R1 p1. Orange wires: R1 p2 → node (col 8), node → R2 p1. ' +
        'Black wire: R2 p2 → GND. The source network is complete.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_r1_node', 'w_node_r2', 'w_r2_gnd'],
    },
    {
      title: 'Wire ammeter and load path',
      body: 'Orange ammeter wire: node (col 8 row b) → R_load p1. ' +
        'Green wire: R_load p2 → LED anode. Black wire: LED cathode → GND. ' +
        'The ammeter wire represents the series measurement point.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_r1_node', 'w_node_r2', 'w_r2_gnd',
        'w_ammeter', 'w_rload_led', 'w_led_gnd'],
    },
    {
      title: 'Add ammeter probe indicators',
      body: 'Orange probe wires at the ammeter insertion point. ' +
        'I_N = V_th / R_th. With R_load connected, I_load = I_N × R_N / (R_N + R_load).',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_r1_node', 'w_node_r2', 'w_r2_gnd',
        'w_ammeter', 'w_rload_led', 'w_led_gnd',
        'w_am_probe_pos', 'w_am_probe_neg'],
    },
    {
      title: 'Verify Norton equivalence',
      body: 'Short the load terminals to measure I_N directly (short-circuit current). ' +
        'R_N = R1‖R2 = 1000‖2200 ≈ 687 Ω. ' +
        'Norton and Thevenin are duals: I_N = V_th / R_th.',
      show: ['bb', 'r1', 'r2', 'r_load', 'led1',
        'w_vcc_r1', 'w_r1_node', 'w_node_r2', 'w_r2_gnd',
        'w_ammeter', 'w_rload_led', 'w_led_gnd',
        'w_am_probe_pos', 'w_am_probe_neg'],
    },
  ],
};
