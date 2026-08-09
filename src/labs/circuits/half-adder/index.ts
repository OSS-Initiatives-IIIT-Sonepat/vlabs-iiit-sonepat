import { type Circuit } from '@/labs/types';

// ── Half Adder ────────────────────────────────────────────────────────────
// A + B = Sum (XOR), Carry (AND)
// All PinRefs are typed objects — no string parsing.

export const HalfAdder: Circuit = {
  id: 'half-adder',
  title: 'Half Adder',
  description:
    'A half adder adds two single-bit inputs A and B. ' +
    'It produces a Sum bit (A XOR B) and a Carry bit (A AND B). ' +
    'Built on a breadboard using one XOR gate, one AND gate, two LEDs, and two resistors.',

  components: [
    // ── Breadboard ─────────────────────────────────────────────────────
    { id: 'bb', type: 'breadboard' },

    // ── ICs ────────────────────────────────────────────────────────────
    // XOR gate: pins land in holes (7,e) … (13,e) / (7,f) … (13,f)
    { id: 'xor1', type: 'xor-gate', mountedAt: { board: 'bb', col: 7,  row: 'e' } },
    // AND gate: pins land in holes (16,e) … (22,e) / (16,f) … (22,f)
    { id: 'and1', type: 'and-gate', mountedAt: { board: 'bb', col: 16, row: 'e' } },

    // ── Output resistors ───────────────────────────────────────────────
    // Span: col → col+3 on row c
    { id: 'r_sum',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'r_carry', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 26, row: 'c' } },

    // ── Output LEDs ────────────────────────────────────────────────────
    // Span: col (anode) → col+1 (cathode) on row c
    { id: 'led_sum',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 24, row: 'c' } },
    { id: 'led_carry', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 28, row: 'c' } },

    // ── Input wires: A (red) ────────────────────────────────────────────
    { id: 'w_a_xor', type: 'wire', color: 'red',
      from: { board: 'bb', col: 3, row: 'a' },
      to:   { ic: 'xor1', pin: 'A' } },
    { id: 'w_a_and', type: 'wire', color: 'red',
      from: { board: 'bb', col: 3, row: 'b' },
      to:   { ic: 'and1', pin: 'A' } },

    // ── Input wires: B (blue) ───────────────────────────────────────────
    { id: 'w_b_xor', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 4, row: 'a' },
      to:   { ic: 'xor1', pin: 'B' } },
    { id: 'w_b_and', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 4, row: 'b' },
      to:   { ic: 'and1', pin: 'B' } },

    // ── XOR output → Sum resistor → Sum LED (green) ────────────────────
    { id: 'w_xor_out', type: 'wire', color: 'green',
      from: { ic: 'xor1', pin: 'Y' },
      to:   { component: 'r_sum', end: 'p1' } },
    { id: 'w_sum_led', type: 'wire', color: 'green',
      from: { component: 'r_sum', end: 'p2' },
      to:   { led: 'led_sum', end: 'anode' } },

    // ── AND output → Carry resistor → Carry LED (yellow) ───────────────
    { id: 'w_and_out', type: 'wire', color: 'orange',
      from: { ic: 'and1', pin: 'Y' },
      to:   { component: 'r_carry', end: 'p1' } },
    { id: 'w_carry_led', type: 'wire', color: 'yellow',
      from: { component: 'r_carry', end: 'p2' },
      to:   { led: 'led_carry', end: 'anode' } },

    // ── Ground returns ──────────────────────────────────────────────────
    { id: 'w_sum_gnd', type: 'wire', color: 'black',
      from: { led: 'led_sum',   end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },
    { id: 'w_carry_gnd', type: 'wire', color: 'black',
      from: { led: 'led_carry', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 2 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'The solderless breadboard is your build surface. ' +
        'Columns are electrically connected — everything in the same column shares a node. ' +
        'The centre gap splits rows a–e from f–j: ICs straddle it so each pin gets its own node. ' +
        'The red (+) and blue (–) rails run the full length for power.',
      show: ['bb'],
    },
    {
      title: 'Place the XOR gate',
      body: 'Mount the 74HC86 XOR gate straddling the centre gap at column 7. ' +
        'Pin 1 (notch side) faces left. ' +
        'XOR logic: output is HIGH only when inputs differ — A ≠ B. ' +
        'This produces the Sum bit.',
      show: ['bb', 'xor1'],
      highlight: 'xor1',
    },
    {
      title: 'Place the AND gate',
      body: 'Mount the 74HC08 AND gate at column 16. ' +
        'AND logic: output is HIGH only when both inputs are HIGH — A = 1 AND B = 1. ' +
        'This produces the Carry bit.',
      show: ['bb', 'xor1', 'and1'],
      highlight: 'and1',
    },
    {
      title: 'Wire inputs A and B',
      body: 'Red wire: column 3 → XOR pin-A and AND pin-A. ' +
        'Blue wire: column 4 → XOR pin-B and AND pin-B. ' +
        'Both gates share the same inputs.',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and'],
      highlight: 'w_a_xor',
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Add resistors and output LEDs',
      body: 'Each output needs a 330Ω current-limiting resistor in series with an LED. ' +
        'Green LED = Sum. Yellow LED = Carry. ' +
        'The resistor protects the LED from too much current.',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
             'r_sum', 'r_carry', 'led_sum', 'led_carry'],
      highlight: 'r_sum',
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Connect the output wires',
      body: 'Green wire: XOR output → 330Ω → green LED. ' +
        'Orange wire: AND output → 330Ω → yellow LED. ' +
        'Black wires: both LED cathodes to the ground rail. Circuit complete.',
      show: ['bb', 'xor1', 'and1', 'w_a_xor', 'w_a_and', 'w_b_xor', 'w_b_and',
             'r_sum', 'r_carry', 'led_sum', 'led_carry',
             'w_xor_out', 'w_sum_led', 'w_and_out', 'w_carry_led',
             'w_sum_gnd', 'w_carry_gnd'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Test: A=1, B=1 → Sum=0, Carry=1',
      body: 'Apply HIGH to both inputs. 1 + 1 = 10 in binary. ' +
        'XOR sees equal inputs → output LOW → green LED off. ' +
        'AND sees both HIGH → output HIGH → yellow LED on.',
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
