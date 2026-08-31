import { type Circuit } from '@/labs/types';

// ── Kirchhoff's Laws Circuit ─────────────────────────────────────────────
// Visual/analog — no simulation.
// Two-source, three-resistor network for KCL/KVL verification.
//
// Topology:
//   V1 (VCC rail col 5) → R1 (1 kΩ) → Node A (col 8)
//   V2 (VCC rail col 10) → R2 (2.2 kΩ) → Node A (col 8)
//   Node A → R3 (3.3 kΩ, bottom bank) → LED → GND
//
// Layout:
//   R1 (1 kΩ)    at col 5,  row c — spans cols 5–8
//   R2 (2.2 kΩ)  at col 10, row c — spans cols 10–13
//   R3 (3.3 kΩ)  at col 5,  row h — spans cols 5–8 (bottom bank)
//   LED (red)     at col 15, row c — anode col 15, cathode col 16
//   Node A        at col 8 (shared by R1 p2, R2 reaches via wire, R3 via wire)

export const KirchhoffLawsCircuit: Circuit = {
  id: 'kirchhoff-laws',
  title: "Kirchhoff's Voltage & Current Laws",
  description:
    'Demonstrates Kirchhoff\'s Voltage Law (KVL) and Current Law (KCL) using a two-source, ' +
    'three-resistor network. R1 (1 kΩ) and R2 (2.2 kΩ) feed into node A from separate supply points. ' +
    'R3 (3.3 kΩ) connects node A to GND through an LED indicator. ' +
    'Voltmeter probes verify voltage drops around each loop.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'r1',   type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'r2',   type: 'resistor', ohms: 2200, mountedAt: { board: 'bb', col: 10, row: 'c' } },
    { id: 'r3',   type: 'resistor', ohms: 3300, mountedAt: { board: 'bb', col: 5,  row: 'h' } },
    { id: 'led1', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 15, row: 'c' } },

    // ── V1: VCC → R1 p1 ──────────────────────────────────────────────────
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { component: 'r1', end: 'p1' } },

    // ── V2: VCC → R2 p1 ──────────────────────────────────────────────────
    { id: 'w_vcc_r2', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 10 },
      to:   { component: 'r2', end: 'p1' } },

    // ── R2 p2 → Node A (col 8, row b — joins R1 p2 column) ──────────────
    { id: 'w_r2_nodeA', type: 'wire', color: 'orange',
      from: { component: 'r2', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'b' } },

    // ── Node A link: top bank → bottom bank (col 8 row e → col 8 row f) ─
    { id: 'w_nodeA_link', type: 'wire', color: 'white',
      from: { board: 'bb', col: 8, row: 'e' },
      to:   { board: 'bb', col: 8, row: 'f' } },

    // ── Node A → R3 p1 (col 8 bottom bank → R3 at col 5 row h) ──────────
    { id: 'w_nodeA_r3', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 8, row: 'g' },
      to:   { component: 'r3', end: 'p2' } },

    // ── R3 p1 → LED anode ────────────────────────────────────────────────
    { id: 'w_r3_led', type: 'wire', color: 'yellow',
      from: { component: 'r3', end: 'p1' },
      to:   { led: 'led1', end: 'anode' } },

    // ── LED cathode → GND rail ───────────────────────────────────────────
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 16 } },

    // ── Voltmeter probes across R1 (blue) ────────────────────────────────
    { id: 'w_vm_r1_pos', type: 'wire', color: 'blue',
      from: { component: 'r1', end: 'p1' },
      to:   { board: 'bb', col: 5, row: 'a' } },
    { id: 'w_vm_r1_neg', type: 'wire', color: 'blue',
      from: { component: 'r1', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'a' } },

    // ── Voltmeter probes across R2 (blue) ────────────────────────────────
    { id: 'w_vm_r2_pos', type: 'wire', color: 'blue',
      from: { component: 'r2', end: 'p1' },
      to:   { board: 'bb', col: 10, row: 'a' } },
    { id: 'w_vm_r2_neg', type: 'wire', color: 'blue',
      from: { component: 'r2', end: 'p2' },
      to:   { board: 'bb', col: 13, row: 'a' } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a multi-branch resistor network with two voltage ' +
        'sources to verify Kirchhoff\'s Current and Voltage Laws.',
      show: ['bb'],
    },
    {
      title: 'Place R1 (1 kΩ) — Branch 1',
      body: 'Insert R1 (1 kΩ) at cols 5–8, row c (top bank). ' +
        'Colour bands: Brown-Black-Red. R1 connects V1 to node A at col 8.',
      show: ['bb', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place R2 (2.2 kΩ) — Branch 2',
      body: 'Insert R2 (2.2 kΩ) at cols 10–13, row c. ' +
        'Colour bands: Red-Red-Red. R2 connects V2 to node A.',
      show: ['bb', 'r1', 'r2'],
      highlight: 'r2',
    },
    {
      title: 'Place R3 (3.3 kΩ) — Branch 3',
      body: 'Insert R3 (3.3 kΩ) at cols 5–8, row h (bottom bank). ' +
        'This branch carries the combined current from node A to GND.',
      show: ['bb', 'r1', 'r2', 'r3'],
      highlight: 'r3',
    },
    {
      title: 'Place the LED',
      body: 'Insert the red LED at cols 15–16, row c. ' +
        'It serves as a current indicator in the GND return path.',
      show: ['bb', 'r1', 'r2', 'r3', 'led1'],
      highlight: 'led1',
    },
    {
      title: 'Wire V1 → R1 and V2 → R2',
      body: 'Red wires: VCC (col 5) → R1 p1, VCC (col 10) → R2 p1. ' +
        'These represent two independent voltage source connections.',
      show: ['bb', 'r1', 'r2', 'r3', 'led1', 'w_vcc_r1', 'w_vcc_r2'],
    },
    {
      title: 'Wire node A connections',
      body: 'Orange wire: R2 p2 (col 13) → node A (col 8 row b). ' +
        'White wire: bridges top and bottom banks at col 8. ' +
        'Orange wire: node A bottom (col 8 row g) → R3 p2 (col 8 row h). ' +
        'Node A is where three branch currents meet — the KCL verification point.',
      show: ['bb', 'r1', 'r2', 'r3', 'led1',
        'w_vcc_r1', 'w_vcc_r2', 'w_r2_nodeA', 'w_nodeA_link', 'w_nodeA_r3'],
    },
    {
      title: 'Wire R3 → LED → GND',
      body: 'Yellow wire: R3 p1 → LED anode. Black wire: LED cathode → GND rail. ' +
        'Circuit complete: V1 → R1 → Node A, V2 → R2 → Node A, Node A → R3 → LED → GND.',
      show: ['bb', 'r1', 'r2', 'r3', 'led1',
        'w_vcc_r1', 'w_vcc_r2', 'w_r2_nodeA', 'w_nodeA_link', 'w_nodeA_r3',
        'w_r3_led', 'w_led_gnd'],
    },
    {
      title: 'Add voltmeter probes',
      body: 'Blue wires: voltmeter probes across R1 (cols 5 & 8, row a) and R2 (cols 10 & 13, row a). ' +
        'KVL Loop 1: V1 − V_R1 − V_R3 − V_LED = 0. ' +
        'KVL Loop 2: V2 − V_R2 − V_R3 − V_LED = 0. ' +
        'KCL at node A: I_R1 + I_R2 = I_R3.',
      show: [
        'bb', 'r1', 'r2', 'r3', 'led1',
        'w_vcc_r1', 'w_vcc_r2', 'w_r2_nodeA', 'w_nodeA_link', 'w_nodeA_r3',
        'w_r3_led', 'w_led_gnd',
        'w_vm_r1_pos', 'w_vm_r1_neg', 'w_vm_r2_pos', 'w_vm_r2_neg',
      ],
    },
  ],
};
