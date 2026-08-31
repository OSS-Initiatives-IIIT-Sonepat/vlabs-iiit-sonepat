import { type Circuit } from '@/labs/types';

// ── DEMUX Address Decoder ─────────────────────────────────────────────────
// Identical 1:2 DEMUX topology (NOT + 2×AND) repurposed as an address decoder.
//
// Address decoder interpretation:
//   EN  = chip enable (active HIGH)
//   A0  = address bit
//   Y0  = device 0 select (A0=0, EN=1)
//   Y1  = device 1 select (A0=1, EN=1)
//
// Logic:
//   Y0 = (NOT A0) AND EN   — select device 0 when address = 0
//   Y1 = A0 AND EN         — select device 1 when address = 1
//
// Gate placement (same as demux):
//   NOT at col 5, AND1 at col 12, AND2 at col 19

export const DemuxAddressDecoderCircuit: Circuit = {
  id: 'demux-address-decoder',
  title: 'Address Decoder (1:2 DEMUX)',
  description:
    'A 1-to-2 address decoder built from the same NOT + 2×AND topology as a 1:2 DEMUX. ' +
    'Address line A0 selects one of two device outputs (Y0 or Y1). ' +
    'Enable line EN must be HIGH for any output to be active. ' +
    'Demonstrates how demultiplexers serve as address decoders in memory systems.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── ICs ─────────────────────────────────────────────────────────────────
    { id: 'not1', type: 'not-gate', mountedAt: { board: 'bb', col: 5,  row: 'e' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 12, row: 'e' } },
    { id: 'and2', type: 'and-gate', mountedAt: { board: 'bb', col: 19, row: 'e' } },

    // ── Output paths ────────────────────────────────────────────────────────
    { id: 'r_y0',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 23, row: 'c' } },
    { id: 'r_y1',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 23, row: 'h' } },
    { id: 'led_y0', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 27, row: 'c' } },
    { id: 'led_y1', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 27, row: 'h' } },

    // ── Input wires: A0 (address) ───────────────────────────────────────────
    // A0 → NOT (to generate NOT_A0)
    { id: 'w_a0_not', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'not1', pin: 'A' } },
    // NOT_A0 → AND1 pin A
    { id: 'w_na0_and1', type: 'wire', color: 'white',
      from: { ic: 'not1', pin: 'Y' },
      to:   { ic: 'and1', pin: 'A' } },
    // A0 → AND2 pin A (direct address line)
    { id: 'w_a0_and2', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'and2', pin: 'A' } },

    // ── Input wires: EN (enable) ────────────────────────────────────────────
    // EN → AND1 pin B
    { id: 'w_en_and1', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'and1', pin: 'B' } },
    // EN → AND2 pin B
    { id: 'w_en_and2', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { ic: 'and2', pin: 'B' } },

    // ── Y0 output: AND1.Y → r_y0 → led_y0 → GND ───────────────────────────
    { id: 'w_y0_r',   type: 'wire', color: 'green',
      from: { ic: 'and1', pin: 'Y' },
      to:   { component: 'r_y0', end: 'p1' } },
    { id: 'w_y0_led', type: 'wire', color: 'green',
      from: { component: 'r_y0', end: 'p2' },
      to:   { led: 'led_y0', end: 'anode' } },
    { id: 'w_gnd1', type: 'wire', color: 'black',
      from: { led: 'led_y0', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },

    // ── Y1 output: AND2.Y → r_y1 → led_y1 → GND ───────────────────────────
    { id: 'w_y1_r',   type: 'wire', color: 'yellow',
      from: { ic: 'and2', pin: 'Y' },
      to:   { component: 'r_y1', end: 'p1' } },
    { id: 'w_y1_led', type: 'wire', color: 'yellow',
      from: { component: 'r_y1', end: 'p2' },
      to:   { led: 'led_y1', end: 'anode' } },
    { id: 'w_gnd2', type: 'wire', color: 'black',
      from: { led: 'led_y1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    {
      title: 'Place breadboard',
      body: 'An address decoder selects one of N devices based on an address input. ' +
        'This 1-to-2 decoder uses the same NOT + 2×AND topology as a 1:2 DEMUX.',
      show: ['bb'],
    },
    {
      title: 'Place NOT gate',
      body: 'NOT gate at col 5 inverts address line A0. ' +
        'When A0=0, NOT_A0=1 enables AND1 (device 0 path).',
      show: ['bb', 'not1'],
      highlight: 'not1',
    },
    {
      title: 'Place AND gates',
      body: 'AND1 at col 12: Y0 = NOT_A0 · EN (device 0 selected when A0=0). ' +
        'AND2 at col 19: Y1 = A0 · EN (device 1 selected when A0=1). ' +
        'Both require EN=1 to activate.',
      show: ['bb', 'not1', 'and1', 'and2'],
      highlight: 'and1',
    },
    {
      title: 'Wire inputs',
      body: 'Red: EN (enable, col 1) → both AND gates pin B. ' +
        'Orange: A0 (address, col 2) → NOT and AND2.A. ' +
        'White: NOT.Y → AND1.A (inverted address).',
      show: [
        'bb', 'not1', 'and1', 'and2',
        'w_a0_not', 'w_na0_and1', 'w_a0_and2',
        'w_en_and1', 'w_en_and2',
      ],
      activeInputs: { A0: 0, EN: 0 },
    },
    {
      title: 'Add output LEDs and resistors',
      body: 'Green LED (Y0, device 0) at col 27, row c. ' +
        'Yellow LED (Y1, device 1) at col 27, row h. ' +
        '330 Ω resistors limit current on each path.',
      show: [
        'bb', 'not1', 'and1', 'and2',
        'w_a0_not', 'w_na0_and1', 'w_a0_and2',
        'w_en_and1', 'w_en_and2',
        'r_y0', 'r_y1', 'led_y0', 'led_y1',
        'w_y0_r', 'w_y0_led', 'w_y1_r', 'w_y1_led',
        'w_gnd1', 'w_gnd2',
      ],
      activeInputs: { A0: 0, EN: 0 },
    },
    {
      title: 'Test: A0=0, EN=1 → Device 0 selected',
      body: 'Address 0 with enable HIGH. Y0=1 (green LED ON), Y1=0 (yellow OFF). ' +
        'Device 0 is selected — its chip-select line is active.',
      show: [
        'bb', 'not1', 'and1', 'and2',
        'w_a0_not', 'w_na0_and1', 'w_a0_and2',
        'w_en_and1', 'w_en_and2',
        'r_y0', 'r_y1', 'led_y0', 'led_y1',
        'w_y0_r', 'w_y0_led', 'w_y1_r', 'w_y1_led',
        'w_gnd1', 'w_gnd2',
      ],
      highlight: 'led_y0',
      activeInputs: { A0: 0, EN: 1 },
    },
    {
      title: 'Test: A0=1, EN=1 → Device 1 selected',
      body: 'Address 1 with enable HIGH. Y0=0 (green OFF), Y1=1 (yellow LED ON). ' +
        'Device 1 is now selected. Only one device is active at a time.',
      show: [
        'bb', 'not1', 'and1', 'and2',
        'w_a0_not', 'w_na0_and1', 'w_a0_and2',
        'w_en_and1', 'w_en_and2',
        'r_y0', 'r_y1', 'led_y0', 'led_y1',
        'w_y0_r', 'w_y0_led', 'w_y1_r', 'w_y1_led',
        'w_gnd1', 'w_gnd2',
      ],
      highlight: 'led_y1',
      activeInputs: { A0: 1, EN: 1 },
    },
    {
      title: 'Test: EN=0 → No device selected',
      body: 'Enable LOW disables both outputs regardless of address. Y0=0, Y1=0. ' +
        'Both LEDs OFF. The decoder is inactive — no device is selected.',
      show: [
        'bb', 'not1', 'and1', 'and2',
        'w_a0_not', 'w_na0_and1', 'w_a0_and2',
        'w_en_and1', 'w_en_and2',
        'r_y0', 'r_y1', 'led_y0', 'led_y1',
        'w_y0_r', 'w_y0_led', 'w_y1_r', 'w_y1_led',
        'w_gnd1', 'w_gnd2',
      ],
      activeInputs: { A0: 1, EN: 0 },
    },
  ],

  truthTable: {
    inputs:  ['A0', 'EN'],
    outputs: ['Y0', 'Y1'],
    rows: [
      { inputs: { A0: 0, EN: 0 }, outputs: { Y0: 0, Y1: 0 } },
      { inputs: { A0: 0, EN: 1 }, outputs: { Y0: 1, Y1: 0 } },
      { inputs: { A0: 1, EN: 0 }, outputs: { Y0: 0, Y1: 0 } },
      { inputs: { A0: 1, EN: 1 }, outputs: { Y0: 0, Y1: 1 } },
    ],
  },
};
