import { type Circuit } from '@/labs/types';

// ── MUX-Based Logic: AND via 2:1 MUX ─────────────────────────────────────
// Implements AND function using a 2:1 MUX structure (NOT + 2×AND + OR).
//
// Key insight: Y = MUX(I0, I1, S) = (NOT S · I0) OR (S · I1)
// To get AND(A,B): set S=A, I0=0 (GND), I1=B
//   Y = (NOT A · 0) OR (A · B) = A · B
//
// Gate-level build:
//   not1  (col 4):  A → NOT → NOT_A
//   and1  (col 11): NOT_A · 0(GND)  = 0  (I0 path, always 0)
//   and2  (col 18): A · B           = AB (I1 path, active when S=A=1)
//   or1   (col 22): and1.Y | and2.Y = Y  (final output)
//
// Inputs: A at col 1 row a (select), B at col 2 row a (data I1).

export const MuxBasedLogicCircuit: Circuit = {
  id: 'mux-based-logic',
  title: 'MUX-Based Logic: AND Function',
  description:
    'Implements the AND function using a 2:1 MUX structure (NOT + 2×AND + OR). ' +
    'By tying I0=GND (0), I1=B, and S=A, the MUX output Y = A·B. ' +
    'Demonstrates that multiplexers are universal logic elements.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── ICs (same MUX topology as mux-2to1) ────────────────────────────────
    { id: 'not1', type: 'not-gate', mountedAt: { board: 'bb', col: 4,  row: 'e' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 11, row: 'e' } },
    { id: 'and2', type: 'and-gate', mountedAt: { board: 'bb', col: 18, row: 'e' } },
    { id: 'or1',  type: 'or-gate',  mountedAt: { board: 'bb', col: 22, row: 'e' } },

    // ── Output path ─────────────────────────────────────────────────────────
    { id: 'r_out',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 26, row: 'c' } },
    { id: 'led_out', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 31, row: 'c' } },

    // ── Input wires: A (select) ─────────────────────────────────────────────
    // A → NOT (to generate NOT_A)
    { id: 'w_a_not', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'not1', pin: 'A' } },
    // A → AND2 pin A (S · I1 path: when S=1, pass I1)
    { id: 'w_a_and2', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { ic: 'and2', pin: 'A' } },

    // ── NOT_A → AND1 pin A ──────────────────────────────────────────────────
    { id: 'w_nota_and1', type: 'wire', color: 'white',
      from: { ic: 'not1', pin: 'Y' },
      to:   { ic: 'and1', pin: 'A' } },

    // ── I0 = GND → AND1 pin B (data=0 when S=0) ────────────────────────────
    { id: 'w_gnd_and1', type: 'wire', color: 'black',
      from: { board: 'bb', rail: 'gnd_top', col: 11 },
      to:   { ic: 'and1', pin: 'B' } },

    // ── Input wire: B (data I1) → AND2 pin B ───────────────────────────────
    { id: 'w_b_and2', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'and2', pin: 'B' } },

    // ── AND outputs → OR ────────────────────────────────────────────────────
    { id: 'w_and1_or', type: 'wire', color: 'yellow',
      from: { ic: 'and1', pin: 'Y' },
      to:   { ic: 'or1', pin: 'A' } },
    { id: 'w_and2_or', type: 'wire', color: 'yellow',
      from: { ic: 'and2', pin: 'Y' },
      to:   { ic: 'or1', pin: 'B' } },

    // ── Output: OR.Y → resistor → LED → GND ────────────────────────────────
    { id: 'w_out_r', type: 'wire', color: 'green',
      from: { ic: 'or1', pin: 'Y' },
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
      title: 'Place breadboard',
      body: 'A 2:1 MUX can implement any 2-input function by choosing the right data inputs. ' +
        'Here we implement AND(A,B) by setting I0=0, I1=B, S=A.',
      show: ['bb'],
    },
    {
      title: 'Place NOT gate',
      body: 'NOT gate at col 4 inverts the select signal A. ' +
        'NOT_A enables the I0 path (and1) when A=0.',
      show: ['bb', 'not1'],
      highlight: 'not1',
    },
    {
      title: 'Place AND gates',
      body: 'AND1 at col 11: I0 path (NOT_A · GND = always 0). ' +
        'AND2 at col 18: I1 path (A · B = AB when A=1). ' +
        'Since I0 is tied to GND, the I0 path can never produce a 1.',
      show: ['bb', 'not1', 'and1', 'and2'],
      highlight: 'and1',
    },
    {
      title: 'Place OR gate',
      body: 'OR gate at col 22 combines both MUX data paths. ' +
        'Y = (NOT_A · 0) OR (A · B) = A · B.',
      show: ['bb', 'not1', 'and1', 'and2', 'or1'],
      highlight: 'or1',
    },
    {
      title: 'Wire inputs and internal connections',
      body: 'Red: A (col 1) → NOT and AND2.A (select). ' +
        'Blue: B (col 2) → AND2.B (data I1). ' +
        'Black: GND rail → AND1.B (I0=0). ' +
        'White: NOT.Y → AND1.A. Yellow: both AND outputs → OR inputs.',
      show: [
        'bb', 'not1', 'and1', 'and2', 'or1',
        'w_a_not', 'w_a_and2', 'w_nota_and1', 'w_gnd_and1',
        'w_b_and2', 'w_and1_or', 'w_and2_or',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Add output components and wires',
      body: '330 Ω resistor at col 26, row c. Green LED at col 31, row c. ' +
        'OR.Y → resistor → LED → GND. The LED lights when Y=1 (both A and B are HIGH).',
      show: [
        'bb', 'not1', 'and1', 'and2', 'or1',
        'w_a_not', 'w_a_and2', 'w_nota_and1', 'w_gnd_and1',
        'w_b_and2', 'w_and1_or', 'w_and2_or',
        'r_out', 'led_out', 'w_out_r', 'w_out_led', 'w_out_gnd',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Test: A=1, B=1 → Y=1',
      body: 'Both inputs HIGH. A=1 selects the I1 path: AND2 = 1·1 = 1. OR outputs 1. LED ON. ' +
        'This confirms the MUX implements AND correctly.',
      show: [
        'bb', 'not1', 'and1', 'and2', 'or1',
        'w_a_not', 'w_a_and2', 'w_nota_and1', 'w_gnd_and1',
        'w_b_and2', 'w_and1_or', 'w_and2_or',
        'r_out', 'led_out', 'w_out_r', 'w_out_led', 'w_out_gnd',
      ],
      highlight: 'led_out',
      activeInputs: { A: 1, B: 1 },
    },
    {
      title: 'Test: A=1, B=0 → Y=0',
      body: 'A=1 selects I1 path, but B=0 so AND2 = 1·0 = 0. LED OFF. ' +
        'MUX faithfully reproduces AND behaviour.',
      show: [
        'bb', 'not1', 'and1', 'and2', 'or1',
        'w_a_not', 'w_a_and2', 'w_nota_and1', 'w_gnd_and1',
        'w_b_and2', 'w_and1_or', 'w_and2_or',
        'r_out', 'led_out', 'w_out_r', 'w_out_led', 'w_out_gnd',
      ],
      activeInputs: { A: 1, B: 0 },
    },
  ],

  truthTable: {
    inputs:  ['A', 'B'],
    outputs: ['Y'],
    rows: [
      { inputs: { A: 0, B: 0 }, outputs: { Y: 0 } },
      { inputs: { A: 0, B: 1 }, outputs: { Y: 0 } },
      { inputs: { A: 1, B: 0 }, outputs: { Y: 0 } },
      { inputs: { A: 1, B: 1 }, outputs: { Y: 1 } },
    ],
  },
};
