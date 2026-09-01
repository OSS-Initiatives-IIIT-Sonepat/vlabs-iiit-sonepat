import { type Circuit } from '@/labs/types';

// ── 1-bit Digital Magnitude Comparator ───────────────────────────────────────
//
// EQ (A=B) : XNOR gate — xnor1 at col 4, row e
// GT (A>B) : A AND NOT_B — not1 at col 10, row e; and1 at col 16, row e
// LT (A<B) : NOT_A AND B — not2 at col 10, row h; and2 at col 16, row h
//
// Output LEDs:
//   led_eq  yellow  col 22 row c  (EQ)
//   led_gt  red     col 22 row h  (GT)
//   led_lt  green   col 25 row c  (LT)

export const DigitalComparator: Circuit = {
  id: 'digital-comparator',
  title: '4-bit Digital Magnitude Comparator',
  description:
    'Implement a 1-bit magnitude comparator showing A=B (XNOR), A>B (A·B\u2019), ' +
    'and A<B (A\u2019·B). Extend the concept to 4-bit magnitude comparison.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Gates ─────────────────────────────────────────────────────────────
    { id: 'xnor1', type: 'xnor-gate', mountedAt: { board: 'bb', col: 4,  row: 'e' } },
    { id: 'not1',  type: 'not-gate',  mountedAt: { board: 'bb', col: 10, row: 'e' } },
    { id: 'and1',  type: 'and-gate',  mountedAt: { board: 'bb', col: 16, row: 'e' } },
    { id: 'not2',  type: 'not-gate',  mountedAt: { board: 'bb', col: 10, row: 'h' } },
    { id: 'and2',  type: 'and-gate',  mountedAt: { board: 'bb', col: 16, row: 'h' } },

    // ── Output resistors ──────────────────────────────────────────────────
    { id: 'r_eq', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'c' } },
    { id: 'r_gt', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'h' } },
    { id: 'r_lt', type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 23, row: 'c' } },

    // ── Output LEDs ───────────────────────────────────────────────────────
    { id: 'led_eq', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 22, row: 'c' } },
    { id: 'led_gt', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 22, row: 'h' } },
    { id: 'led_lt', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 25, row: 'c' } },

    // ── Input A → xnor1.A, and1.A ────────────────────────────────────────
    { id: 'w_a_xnor', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'xnor1', pin: 'A' } },
    { id: 'w_a_and1', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'b' },
      to:   { ic: 'and1', pin: 'A' } },
    { id: 'w_a_not2', type: 'wire', color: 'red',
      from: { board: 'bb', col: 1, row: 'c' },
      to:   { ic: 'not2', pin: 'A' } },

    // ── Input B → xnor1.B, not1.A, and2.B ────────────────────────────────
    { id: 'w_b_xnor', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'a' },
      to:   { ic: 'xnor1', pin: 'B' } },
    { id: 'w_b_not1', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'b' },
      to:   { ic: 'not1', pin: 'A' } },
    { id: 'w_b_and2', type: 'wire', color: 'blue',
      from: { board: 'bb', col: 2, row: 'c' },
      to:   { ic: 'and2', pin: 'B' } },

    // ── NOT_B → and1.B (GT path) ──────────────────────────────────────────
    { id: 'w_notb_and1', type: 'wire', color: 'orange',
      from: { ic: 'not1', pin: 'Y' },
      to:   { ic: 'and1', pin: 'B' } },

    // ── NOT_A → and2.A (LT path) ──────────────────────────────────────────
    { id: 'w_nota_and2', type: 'wire', color: 'purple',
      from: { ic: 'not2', pin: 'Y' },
      to:   { ic: 'and2', pin: 'A' } },

    // ── EQ output: xnor1.Y → r_eq → led_eq → GND ────────────────────────
    { id: 'w_xnor_req',  type: 'wire', color: 'yellow',
      from: { ic: 'xnor1', pin: 'Y' },
      to:   { component: 'r_eq', end: 'p1' } },
    { id: 'w_req_led',   type: 'wire', color: 'yellow',
      from: { component: 'r_eq', end: 'p2' },
      to:   { led: 'led_eq', end: 'anode' } },
    { id: 'w_eq_gnd',    type: 'wire', color: 'black',
      from: { led: 'led_eq', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },

    // ── GT output: and1.Y → r_gt → led_gt → GND ─────────────────────────
    { id: 'w_and1_rgt', type: 'wire', color: 'red',
      from: { ic: 'and1', pin: 'Y' },
      to:   { component: 'r_gt', end: 'p1' } },
    { id: 'w_rgt_led',  type: 'wire', color: 'red',
      from: { component: 'r_gt', end: 'p2' },
      to:   { led: 'led_gt', end: 'anode' } },
    { id: 'w_gt_gnd',   type: 'wire', color: 'black',
      from: { led: 'led_gt', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 2 } },

    // ── LT output: and2.Y → r_lt → led_lt → GND ─────────────────────────
    { id: 'w_and2_rlt', type: 'wire', color: 'green',
      from: { ic: 'and2', pin: 'Y' },
      to:   { component: 'r_lt', end: 'p1' } },
    { id: 'w_rlt_led',  type: 'wire', color: 'green',
      from: { component: 'r_lt', end: 'p2' },
      to:   { led: 'led_lt', end: 'anode' } },
    { id: 'w_lt_gnd',   type: 'wire', color: 'black',
      from: { led: 'led_lt', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 3 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the solderless breadboard. ' +
        'We will build a 1-bit magnitude comparator with three outputs: EQ (A=B), GT (A>B), LT (A<B). ' +
        'Three LEDs — yellow (EQ), red (GT), green (LT) — indicate the result.',
      show: ['bb'],
    },
    {
      title: 'Place gates',
      body: 'Mount: 74HC266 XNOR at col 4 (EQ); 74HC04 NOT at col 10 row e (for B\u2019); ' +
        '74HC08 AND at col 16 row e (GT: A·B\u2019); 74HC04 NOT at col 10 row h (for A\u2019); ' +
        '74HC08 AND at col 16 row h (LT: A\u2019·B).',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2'],
      highlight: 'xnor1',
    },
    {
      title: 'Wire inputs A and B',
      body: 'A (red): col 1 rows a,b,c → xnor1.A, and1.A, not2.A. ' +
        'B (blue): col 2 rows a,b,c → xnor1.B, not1.A, and2.B.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Connect internal wires',
      body: 'Orange: NOT1.Y (B\u2019) → AND1.B. Purple: NOT2.Y (A\u2019) → AND2.A. ' +
        'This completes the GT and LT logic paths.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2',
             'w_notb_and1', 'w_nota_and2'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Add resistors and LEDs, wire outputs',
      body: 'Yellow LED (EQ) at col 22 row c; Red LED (GT) at col 22 row h; Green LED (LT) at col 25 row c. ' +
        '330 Ω resistors in series before each LED. All cathodes to GND rail.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2',
             'w_notb_and1', 'w_nota_and2',
             'r_eq', 'r_gt', 'r_lt', 'led_eq', 'led_gt', 'led_lt',
             'w_xnor_req', 'w_req_led', 'w_eq_gnd',
             'w_and1_rgt', 'w_rgt_led', 'w_gt_gnd',
             'w_and2_rlt', 'w_rlt_led', 'w_lt_gnd'],
      activeInputs: { A: 0, B: 0 },
    },
    {
      title: 'Test: A=0, B=0 → EQ=1',
      body: 'XNOR(0,0)=1 → yellow LED ON. AND1(0,1)=0 → red LED OFF. AND2(1,0)=0 → green LED OFF. A equals B.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2',
             'w_notb_and1', 'w_nota_and2',
             'r_eq', 'r_gt', 'r_lt', 'led_eq', 'led_gt', 'led_lt',
             'w_xnor_req', 'w_req_led', 'w_eq_gnd',
             'w_and1_rgt', 'w_rgt_led', 'w_gt_gnd',
             'w_and2_rlt', 'w_rlt_led', 'w_lt_gnd'],
      activeInputs: { A: 0, B: 0 },
      highlight: 'led_eq',
    },
    {
      title: 'Test: A=1, B=0 → GT=1',
      body: 'XNOR(1,0)=0 → yellow OFF. AND1(1, NOT0=1)=1 → red LED ON. AND2(NOT1=0, 0)=0 → green OFF. A>B.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2',
             'w_notb_and1', 'w_nota_and2',
             'r_eq', 'r_gt', 'r_lt', 'led_eq', 'led_gt', 'led_lt',
             'w_xnor_req', 'w_req_led', 'w_eq_gnd',
             'w_and1_rgt', 'w_rgt_led', 'w_gt_gnd',
             'w_and2_rlt', 'w_rlt_led', 'w_lt_gnd'],
      activeInputs: { A: 1, B: 0 },
      highlight: 'led_gt',
    },
    {
      title: 'Test: A=0, B=1 → LT=1',
      body: 'XNOR(0,1)=0 → yellow OFF. AND1(0, NOT1=0)=0 → red OFF. AND2(NOT0=1, 1)=1 → green LED ON. A<B.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2',
             'w_notb_and1', 'w_nota_and2',
             'r_eq', 'r_gt', 'r_lt', 'led_eq', 'led_gt', 'led_lt',
             'w_xnor_req', 'w_req_led', 'w_eq_gnd',
             'w_and1_rgt', 'w_rgt_led', 'w_gt_gnd',
             'w_and2_rlt', 'w_rlt_led', 'w_lt_gnd'],
      activeInputs: { A: 0, B: 1 },
      highlight: 'led_lt',
    },
    {
      title: 'Test: A=1, B=1 → EQ=1',
      body: 'XNOR(1,1)=1 → yellow LED ON. Both GT and LT outputs LOW. A equals B again.',
      show: ['bb', 'xnor1', 'not1', 'and1', 'not2', 'and2',
             'w_a_xnor', 'w_a_and1', 'w_a_not2',
             'w_b_xnor', 'w_b_not1', 'w_b_and2',
             'w_notb_and1', 'w_nota_and2',
             'r_eq', 'r_gt', 'r_lt', 'led_eq', 'led_gt', 'led_lt',
             'w_xnor_req', 'w_req_led', 'w_eq_gnd',
             'w_and1_rgt', 'w_rgt_led', 'w_gt_gnd',
             'w_and2_rlt', 'w_rlt_led', 'w_lt_gnd'],
      activeInputs: { A: 1, B: 1 },
      highlight: 'led_eq',
    },
  ],

  truthTable: {
    inputs:  ['A', 'B'],
    outputs: ['EQ', 'GT', 'LT'],
    rows: [
      { inputs: { A: 0, B: 0 }, outputs: { EQ: 1, GT: 0, LT: 0 } },
      { inputs: { A: 0, B: 1 }, outputs: { EQ: 0, GT: 0, LT: 1 } },
      { inputs: { A: 1, B: 0 }, outputs: { EQ: 0, GT: 1, LT: 0 } },
      { inputs: { A: 1, B: 1 }, outputs: { EQ: 1, GT: 0, LT: 0 } },
    ],
  },
};
