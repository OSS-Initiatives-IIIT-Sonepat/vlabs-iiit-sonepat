import { type Circuit } from '@/labs/types';

// ── Half Adder ────────────────────────────────────────────────────────────
// A + B → Sum (A XOR B) and Carry (A AND B)
//
// Output path layout — key invariant: each path's resistor columns must NOT
// overlap with any other path's columns IN THE SAME BANK, to avoid
// unintentional net merges in the union-find netlist.
//
// Sum path  (TOP bank, row 'c'):
//   XOR.Y (col9,'e')  → w_xor_out → r_sum.p1 (col22,'c')
//   r_sum.p2 (col25,'c') → w_sum_led → led_sum.anode (col27,'c')
//   led_sum.cathode (col28,'c') → w_sum_gnd → gnd_top
//
// Carry path (BOTTOM bank, row 'h') — different bank = different nets:
//   AND.Y (col18,'e') → w_and_out → r_carry.p1 (col22,'h')
//   r_carry.p2 (col25,'h') → w_carry_led → led_carry.anode (col27,'h')
//   led_carry.cathode (col28,'h') → w_carry_gnd → gnd_top

export const HalfAdder: Circuit = {
  id: 'half-adder',
  title: 'Half Adder',
  description:
    'A half adder adds two single-bit inputs A and B. ' +
    'It produces a Sum bit (A XOR B) and a Carry bit (A AND B). ' +
    'Built on a breadboard using one XOR gate, one AND gate, two LEDs, and two resistors.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── ICs ───────────────────────────────────────────────────────────────
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 7,  row: 'e' } },
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 16, row: 'e' } },

    // ── Sum output path (TOP bank, row 'c') ───────────────────────────────
    // Resistor cols 22–25 (p1=22, p2=25).
    // LED at col 27 (anode=27, cathode=28) — col gap 26 keeps them separate.
    { id: 'r_sum',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'led_sum', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 27, row: 'c' } },

    // ── Carry output path (BOTTOM bank, row 'h') — isolated from Sum ──────
    // Same column numbers but bottom bank → "tie:N:bot" ≠ "tie:N:top".
    { id: 'r_carry',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'h' } },
    { id: 'led_carry', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 27, row: 'h' } },

    // ── Input wires: A (red) ──────────────────────────────────────────────
    { id: 'w_a_xor', type: 'wire', color: 'red',
      from: { board: 'bb', col: 3, row: 'a' },
      to:   { ic: 'xor1', pin: 'A' } },
    { id: 'w_a_and', type: 'wire', color: 'red',
      from: { board: 'bb', col: 3, row: 'b' },
      to:   { ic: 'and1', pin: 'A' } },

    // ── Input wires: B (blue) ─────────────────────────────────────────────
    { id: 'w_b_xor', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'xor1', pin: 'B' } },
    { id: 'w_b_and', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 4, row: 'b' },
      to:   { ic: 'and1', pin: 'B' } },

    // ── Sum output: XOR.Y → r_sum → led_sum → GND ─────────────────────────
    { id: 'w_xor_out', type: 'wire', color: 'green',
      from: { ic: 'xor1', pin: 'Y' },
      to:   { component: 'r_sum', end: 'p1' } },
    { id: 'w_sum_led', type: 'wire', color: 'green',
      from: { component: 'r_sum', end: 'p2' },
      to:   { led: 'led_sum', end: 'anode' } },
    { id: 'w_sum_gnd', type: 'wire', color: 'black',
      from: { led: 'led_sum', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },

    // ── Carry output: AND.Y → r_carry → led_carry → GND ──────────────────
    { id: 'w_and_out', type: 'wire', color: 'orange',
      from: { ic: 'and1', pin: 'Y' },
      to:   { component: 'r_carry', end: 'p1' } },
    { id: 'w_carry_led', type: 'wire', color: 'yellow',
      from: { component: 'r_carry', end: 'p2' },
      to:   { led: 'led_carry', end: 'anode' } },
    { id: 'w_carry_gnd', type: 'wire', color: 'black',
      from: { led: 'led_carry', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'The solderless breadboard is your build surface. ' +
        'All holes in the same column and same bank (a–e or f–j) are electrically connected. ' +
        'The centre gap isolates the two banks so ICs straddle it — each pin gets its own node. ' +
        'Red rails = VCC (+), blue rails = GND (−).',
      show: ['bb'],
    },
    {
      title: 'Place the XOR gate (74HC86)',
      body: 'Mount the 74HC86 XOR gate straddling the centre gap at column 7. ' +
        'Notch faces left (pin 1 at col 7, row e). ' +
        'XOR output is HIGH only when inputs differ: A ⊕ B. This is the Sum bit.',
      show: ['bb', 'xor1'],
      highlight: 'xor1',
    },
    {
      title: 'Place the AND gate (74HC08)',
      body: 'Mount the 74HC08 AND gate at column 16. ' +
        'AND output is HIGH only when both inputs are HIGH: A · B. This is the Carry bit.',
      show: ['bb', 'xor1', 'and1'],
      highlight: 'and1',
    },
    {
      title: 'Wire inputs A and B',
      body: 'Red wire: col 3 row a → XOR pin A. Col 3 row b → AND pin A. ' +
        'Blue wire: col 4 row a → XOR pin B. Col 4 row b → AND pin B. ' +
        'Both gates see the same A and B inputs.',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Add 330 Ω resistors',
      body: 'r_sum (col 22–25, row c) and r_carry (col 22–25, row h — bottom bank). ' +
        'Using different banks keeps their electrical paths completely separate.',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
             'r_sum', 'r_carry'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Add output LEDs',
      body: 'Green LED (Sum) at col 27–28, row c. ' +
        'Yellow LED (Carry) at col 27–28, row h (bottom bank).',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
             'r_sum', 'r_carry', 'led_sum', 'led_carry'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Connect all output wires',
      body: 'Green: XOR.Y → r_sum.p1. Green: r_sum.p2 → led_sum.anode. ' +
        'Orange: AND.Y → r_carry.p1. Yellow: r_carry.p2 → led_carry.anode. ' +
        'Black: both LED cathodes to GND rail. Circuit complete.',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
             'r_sum', 'r_carry', 'led_sum', 'led_carry',
             'w_xor_out', 'w_sum_led', 'w_and_out', 'w_carry_led',
             'w_sum_gnd', 'w_carry_gnd'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Test: A=0, B=1 → Sum=1, Carry=0',
      body: '0+1=01 in binary. XOR sees different inputs → Sum HIGH → green LED ON. ' +
        'AND sees one LOW → Carry LOW → yellow LED OFF.',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
             'r_sum', 'r_carry', 'led_sum', 'led_carry',
             'w_xor_out', 'w_sum_led', 'w_and_out', 'w_carry_led',
             'w_sum_gnd', 'w_carry_gnd'],
      activeInputs: { A: 0, B: 1 },
    },
    {
      title: 'Test: A=1, B=1 → Sum=0, Carry=1',
      body: '1+1=10 in binary. XOR sees equal inputs → Sum LOW → green LED OFF. ' +
        'AND sees both HIGH → Carry HIGH → yellow LED ON.',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
             'r_sum', 'r_carry', 'led_sum', 'led_carry',
             'w_xor_out', 'w_sum_led', 'w_and_out', 'w_carry_led',
             'w_sum_gnd', 'w_carry_gnd'],
      highlight: 'led_carry',
      activeInputs: { A: 1, B: 1 },
    },
  ],

  truthTable: {
    inputs:  ['A', 'B'],
    outputs: ['Sum', 'Carry'],
    rows: [
      { inputs: { A: 0, B: 0 }, outputs: { Sum: 0, Carry: 0 } },
      { inputs: { A: 0, B: 1 }, outputs: { Sum: 1, Carry: 0 } },
      { inputs: { A: 1, B: 0 }, outputs: { Sum: 1, Carry: 0 } },
      { inputs: { A: 1, B: 1 }, outputs: { Sum: 0, Carry: 1 } },
    ],
  },
};
