import { type Circuit } from '@/labs/types';

// ── Logic Gates ───────────────────────────────────────────────────────────
// All 7 standard logic gates: AND, OR, NOT, NAND, NOR, XOR, XNOR
// Inputs A and B fan out to every gate. NOT uses only A.
//
// Gate layout (all straddle centre gap at row 'e'):
//   and1  → col 4     or1  → col 7     not1 → col 10
//   nand1 → col 13    nor1 → col 16    xor1 → col 19    xnor1 → col 22
//
// Output paths use alternating top/bottom banks to avoid column overlaps:
//   AND  → r_and  (col 26, row c)  → led_and  (col 31, row c)
//   OR   → r_or   (col 26, row h)  → led_or   (col 31, row h)
//   NOT  → r_not  (col 33, row c)  → led_not  (col 38, row c)
//   NAND → r_nand (col 33, row h)  → led_nand (col 38, row h)
//   NOR  → r_nor  (col 40, row c)  → led_nor  (col 45, row c)
//   XOR  → r_xor  (col 40, row h)  → led_xor  (col 45, row h)
//   XNOR → r_xnor (col 47, row c)  → led_xnor (col 52, row c)

export const LogicGatesCircuit: Circuit = {
  id: 'logic-gates',
  title: 'Logic Gates',
  description:
    'All seven standard logic gates demonstrated side by side: ' +
    'AND, OR, NOT, NAND, NOR, XOR, and XNOR. ' +
    'Inputs A and B are fanned out to every gate (NOT uses only A). ' +
    'Each gate drives its own LED through a 330 Ω resistor.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Gate ICs ──────────────────────────────────────────────────────────
    { id: 'and1',  type: 'and-gate',  mountedAt: { board: 'bb', col: 4,  row: 'e' } },
    { id: 'or1',   type: 'or-gate',   mountedAt: { board: 'bb', col: 7,  row: 'e' } },
    { id: 'not1',  type: 'not-gate',  mountedAt: { board: 'bb', col: 10, row: 'e' } },
    { id: 'nand1', type: 'nand-gate', mountedAt: { board: 'bb', col: 13, row: 'e' } },
    { id: 'nor1',  type: 'nor-gate',  mountedAt: { board: 'bb', col: 16, row: 'e' } },
    { id: 'xor1',  type: 'xor-gate',  mountedAt: { board: 'bb', col: 19, row: 'e' } },
    { id: 'xnor1', type: 'xnor-gate', mountedAt: { board: 'bb', col: 22, row: 'e' } },

    // ── Output resistors (330 Ω) ──────────────────────────────────────────
    { id: 'r_and',  type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 26, row: 'c' } },
    { id: 'r_or',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 26, row: 'h' } },
    { id: 'r_not',  type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 33, row: 'c' } },
    { id: 'r_nand', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 33, row: 'h' } },
    { id: 'r_nor',  type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 40, row: 'c' } },
    { id: 'r_xor',  type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 40, row: 'h' } },
    { id: 'r_xnor', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 47, row: 'c' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_and',  type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 31, row: 'c' } },
    { id: 'led_or',   type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 31, row: 'h' } },
    { id: 'led_not',  type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 38, row: 'c' } },
    { id: 'led_nand', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 38, row: 'h' } },
    { id: 'led_nor',  type: 'led', color: 'white',  mountedAt: { board: 'bb', col: 45, row: 'c' } },
    { id: 'led_xor',  type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 45, row: 'h' } },
    { id: 'led_xnor', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 52, row: 'c' } },

    // ── Input wires: A (red) — col 1 row a fans out ──────────────────────
    { id: 'w_a_and',  type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'a' }, to: { ic: 'and1',  pin: 'A' } },
    { id: 'w_a_or',   type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'b' }, to: { ic: 'or1',   pin: 'A' } },
    { id: 'w_a_not',  type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'c' }, to: { ic: 'not1',  pin: 'A' } },
    { id: 'w_a_nand', type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'd' }, to: { ic: 'nand1', pin: 'A' } },
    { id: 'w_a_nor',  type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'g' }, to: { ic: 'nor1',  pin: 'A' } },
    { id: 'w_a_xor',  type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'h' }, to: { ic: 'xor1',  pin: 'A' } },
    { id: 'w_a_xnor', type: 'wire', color: 'red', from: { board: 'bb', col: 1, row: 'i' }, to: { ic: 'xnor1', pin: 'A' } },

    // ── Input wires: B (blue) — col 2 row a fans out ─────────────────────
    { id: 'w_b_and',  type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'a' }, to: { ic: 'and1',  pin: 'B' } },
    { id: 'w_b_or',   type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'b' }, to: { ic: 'or1',   pin: 'B' } },
    { id: 'w_b_nand', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'c' }, to: { ic: 'nand1', pin: 'B' } },
    { id: 'w_b_nor',  type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'd' }, to: { ic: 'nor1',  pin: 'B' } },
    { id: 'w_b_xor',  type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'g' }, to: { ic: 'xor1',  pin: 'B' } },
    { id: 'w_b_xnor', type: 'wire', color: 'blue', from: { board: 'bb', col: 2, row: 'h' }, to: { ic: 'xnor1', pin: 'B' } },

    // ── Gate output → resistor wires ──────────────────────────────────────
    { id: 'w_and_out',  type: 'wire', color: 'green',  from: { ic: 'and1',  pin: 'Y' }, to: { component: 'r_and',  end: 'p1' } },
    { id: 'w_or_out',   type: 'wire', color: 'green',  from: { ic: 'or1',   pin: 'Y' }, to: { component: 'r_or',   end: 'p1' } },
    { id: 'w_not_out',  type: 'wire', color: 'yellow', from: { ic: 'not1',  pin: 'Y' }, to: { component: 'r_not',  end: 'p1' } },
    { id: 'w_nand_out', type: 'wire', color: 'orange', from: { ic: 'nand1', pin: 'Y' }, to: { component: 'r_nand', end: 'p1' } },
    { id: 'w_nor_out',  type: 'wire', color: 'white',  from: { ic: 'nor1',  pin: 'Y' }, to: { component: 'r_nor',  end: 'p1' } },
    { id: 'w_xor_out',  type: 'wire', color: 'purple', from: { ic: 'xor1',  pin: 'Y' }, to: { component: 'r_xor',  end: 'p1' } },
    { id: 'w_xnor_out', type: 'wire', color: 'green',  from: { ic: 'xnor1', pin: 'Y' }, to: { component: 'r_xnor', end: 'p1' } },

    // ── Resistor → LED anode wires ────────────────────────────────────────
    { id: 'w_and_led',  type: 'wire', color: 'green',  from: { component: 'r_and',  end: 'p2' }, to: { led: 'led_and',  end: 'anode' } },
    { id: 'w_or_led',   type: 'wire', color: 'green',  from: { component: 'r_or',   end: 'p2' }, to: { led: 'led_or',   end: 'anode' } },
    { id: 'w_not_led',  type: 'wire', color: 'yellow', from: { component: 'r_not',  end: 'p2' }, to: { led: 'led_not',  end: 'anode' } },
    { id: 'w_nand_led', type: 'wire', color: 'orange', from: { component: 'r_nand', end: 'p2' }, to: { led: 'led_nand', end: 'anode' } },
    { id: 'w_nor_led',  type: 'wire', color: 'white',  from: { component: 'r_nor',  end: 'p2' }, to: { led: 'led_nor',  end: 'anode' } },
    { id: 'w_xor_led',  type: 'wire', color: 'purple', from: { component: 'r_xor',  end: 'p2' }, to: { led: 'led_xor',  end: 'anode' } },
    { id: 'w_xnor_led', type: 'wire', color: 'green',  from: { component: 'r_xnor', end: 'p2' }, to: { led: 'led_xnor', end: 'anode' } },

    // ── LED cathode → GND wires ───────────────────────────────────────────
    { id: 'w_and_gnd',  type: 'wire', color: 'black', from: { led: 'led_and',  end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 32 } },
    { id: 'w_or_gnd',   type: 'wire', color: 'black', from: { led: 'led_or',   end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 33 } },
    { id: 'w_not_gnd',  type: 'wire', color: 'black', from: { led: 'led_not',  end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 39 } },
    { id: 'w_nand_gnd', type: 'wire', color: 'black', from: { led: 'led_nand', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 40 } },
    { id: 'w_nor_gnd',  type: 'wire', color: 'black', from: { led: 'led_nor',  end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 46 } },
    { id: 'w_xor_gnd',  type: 'wire', color: 'black', from: { led: 'led_xor',  end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 47 } },
    { id: 'w_xnor_gnd', type: 'wire', color: 'black', from: { led: 'led_xnor', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 53 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'The breadboard is the build surface. Red rails = VCC, blue rails = GND. ' +
        'We will place all seven standard gates across the board.',
      show: ['bb'],
    },
    {
      title: 'Place AND and OR gates',
      body: '74HC08 AND gate at col 4 and 74HC32 OR gate at col 7. ' +
        'AND outputs HIGH only when both inputs are HIGH. ' +
        'OR outputs HIGH when at least one input is HIGH.',
      show: ['bb', 'and1', 'or1'],
      highlight: 'and1',
    },
    {
      title: 'Place NOT gate',
      body: '74HC04 NOT (inverter) gate at col 10. ' +
        'It has only one input (A) and outputs the complement: Y = NOT A.',
      show: ['bb', 'and1', 'or1', 'not1'],
      highlight: 'not1',
    },
    {
      title: 'Place NAND and NOR gates',
      body: '74HC00 NAND gate at col 13 and 74HC02 NOR gate at col 16. ' +
        'NAND = NOT(AND), NOR = NOT(OR). These are universal gates.',
      show: ['bb', 'and1', 'or1', 'not1', 'nand1', 'nor1'],
      highlight: 'nand1',
    },
    {
      title: 'Place XOR and XNOR gates',
      body: '74HC86 XOR gate at col 19 and 74HC266 XNOR gate at col 22. ' +
        'XOR outputs HIGH when inputs differ. XNOR outputs HIGH when inputs match.',
      show: ['bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1'],
      highlight: 'xor1',
    },
    {
      title: 'Wire inputs A and B',
      body: 'Red wires: input A (col 1) fans out to all seven gate A pins. ' +
        'Blue wires: input B (col 2) fans out to six gates (NOT has no B). ' +
        'Every gate sees the same A and B signals.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Add 330 Ω resistors',
      body: 'Seven 330 Ω resistors, one per gate output. ' +
        'Placed in alternating top/bottom banks to avoid column overlaps.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Add output LEDs',
      body: 'Seven LEDs, one per gate. Each LED anode connects to its resistor, cathode to GND.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
        'led_and', 'led_or', 'led_not', 'led_nand', 'led_nor', 'led_xor', 'led_xnor',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Connect all output wires',
      body: 'Gate Y pins → resistors → LED anodes, LED cathodes → GND. Circuit complete.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
        'led_and', 'led_or', 'led_not', 'led_nand', 'led_nor', 'led_xor', 'led_xnor',
        'w_and_out', 'w_or_out', 'w_not_out', 'w_nand_out', 'w_nor_out', 'w_xor_out', 'w_xnor_out',
        'w_and_led', 'w_or_led', 'w_not_led', 'w_nand_led', 'w_nor_led', 'w_xor_led', 'w_xnor_led',
        'w_and_gnd', 'w_or_gnd', 'w_not_gnd', 'w_nand_gnd', 'w_nor_gnd', 'w_xor_gnd', 'w_xnor_gnd',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Test: A=0, B=0',
      body: 'AND=0, OR=0, NOT=1, NAND=1, NOR=1, XOR=0, XNOR=1. ' +
        'Inverted gates (NOT, NAND, NOR, XNOR) light up.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
        'led_and', 'led_or', 'led_not', 'led_nand', 'led_nor', 'led_xor', 'led_xnor',
        'w_and_out', 'w_or_out', 'w_not_out', 'w_nand_out', 'w_nor_out', 'w_xor_out', 'w_xnor_out',
        'w_and_led', 'w_or_led', 'w_not_led', 'w_nand_led', 'w_nor_led', 'w_xor_led', 'w_xnor_led',
        'w_and_gnd', 'w_or_gnd', 'w_not_gnd', 'w_nand_gnd', 'w_nor_gnd', 'w_xor_gnd', 'w_xnor_gnd',
      ],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Test: A=0, B=1',
      body: 'AND=0, OR=1, NOT=1, NAND=1, NOR=0, XOR=1, XNOR=0. ' +
        'OR and XOR detect the single HIGH input.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
        'led_and', 'led_or', 'led_not', 'led_nand', 'led_nor', 'led_xor', 'led_xnor',
        'w_and_out', 'w_or_out', 'w_not_out', 'w_nand_out', 'w_nor_out', 'w_xor_out', 'w_xnor_out',
        'w_and_led', 'w_or_led', 'w_not_led', 'w_nand_led', 'w_nor_led', 'w_xor_led', 'w_xnor_led',
        'w_and_gnd', 'w_or_gnd', 'w_not_gnd', 'w_nand_gnd', 'w_nor_gnd', 'w_xor_gnd', 'w_xnor_gnd',
      ],
      activeInputs: { A: 0, B: 1 },
    },
    {
      title: 'Test: A=1, B=0',
      body: 'AND=0, OR=1, NOT=0, NAND=1, NOR=0, XOR=1, XNOR=0. ' +
        'NOT flips since A is now HIGH.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
        'led_and', 'led_or', 'led_not', 'led_nand', 'led_nor', 'led_xor', 'led_xnor',
        'w_and_out', 'w_or_out', 'w_not_out', 'w_nand_out', 'w_nor_out', 'w_xor_out', 'w_xnor_out',
        'w_and_led', 'w_or_led', 'w_not_led', 'w_nand_led', 'w_nor_led', 'w_xor_led', 'w_xnor_led',
        'w_and_gnd', 'w_or_gnd', 'w_not_gnd', 'w_nand_gnd', 'w_nor_gnd', 'w_xor_gnd', 'w_xnor_gnd',
      ],
      activeInputs: { A: 1, B: 0 },
    },
    {
      title: 'Test: A=1, B=1',
      body: 'AND=1, OR=1, NOT=0, NAND=0, NOR=0, XOR=0, XNOR=1. ' +
        'AND finally lights up. XNOR detects matching inputs.',
      show: [
        'bb', 'and1', 'or1', 'not1', 'nand1', 'nor1', 'xor1', 'xnor1',
        'w_a_and', 'w_a_or', 'w_a_not', 'w_a_nand', 'w_a_nor', 'w_a_xor', 'w_a_xnor',
        'w_b_and', 'w_b_or', 'w_b_nand', 'w_b_nor', 'w_b_xor', 'w_b_xnor',
        'r_and', 'r_or', 'r_not', 'r_nand', 'r_nor', 'r_xor', 'r_xnor',
        'led_and', 'led_or', 'led_not', 'led_nand', 'led_nor', 'led_xor', 'led_xnor',
        'w_and_out', 'w_or_out', 'w_not_out', 'w_nand_out', 'w_nor_out', 'w_xor_out', 'w_xnor_out',
        'w_and_led', 'w_or_led', 'w_not_led', 'w_nand_led', 'w_nor_led', 'w_xor_led', 'w_xnor_led',
        'w_and_gnd', 'w_or_gnd', 'w_not_gnd', 'w_nand_gnd', 'w_nor_gnd', 'w_xor_gnd', 'w_xnor_gnd',
      ],
      highlight: 'led_and',
      activeInputs: { A: 1, B: 1 },
    },
  ],

  truthTable: {
    inputs:  ['A', 'B'],
    outputs: ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'],
    rows: [
      { inputs: { A: 0, B: 0 }, outputs: { AND: 0, OR: 0, NOT: 1, NAND: 1, NOR: 1, XOR: 0, XNOR: 1 } },
      { inputs: { A: 0, B: 1 }, outputs: { AND: 0, OR: 1, NOT: 1, NAND: 1, NOR: 0, XOR: 1, XNOR: 0 } },
      { inputs: { A: 1, B: 0 }, outputs: { AND: 0, OR: 1, NOT: 0, NAND: 1, NOR: 0, XOR: 1, XNOR: 0 } },
      { inputs: { A: 1, B: 1 }, outputs: { AND: 1, OR: 1, NOT: 0, NAND: 0, NOR: 0, XOR: 0, XNOR: 1 } },
    ],
  },
};
