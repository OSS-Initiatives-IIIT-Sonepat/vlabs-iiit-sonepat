import { type Circuit } from '@/labs/types';

// ── MOD-5 Asynchronous Counter (74HC93) ───────────────────────────────────
//
// 74HC93 pin layout (IC at col 5):
//   e-bank: CLK_B=p1(col5), R01=p2(col6), R02=p3(col7), GND=p8(col11)
//   f-bank: CLK_A=p1(col5), VCC=p6(col10), QA=p7(col11),
//            QD=p3(col7),  QC=p4(col8),  QB=p5(col9)
//
// 4-bit counter: CLK_A clocks QA; connect QA → CLK_B for full 4-bit count.
// MOD-5 reset: count=5 (binary 0101: QA=1,QB=0,QC=1,QD=0).
//   R01=QA, R02=QC → when both HIGH (count=5), circuit resets to 0000.
//
// Output LED layout:
//   QA (LSB) → r_qa (col 20, c) → led_qa (red,   col 24, c) → GND
//   QB       → r_qb (col 20, h) → led_qb (yellow, col 24, h) → GND
//   QC       → r_qc (col 27, c) → led_qc (green,  col 31, c) → GND
//   QD (MSB) → r_qd (col 27, h) → led_qd (blue,   col 31, h) → GND

export const Mod5CounterCircuit: Circuit = {
  id: 'mod5-counter',
  title: 'MOD-5 Asynchronous Counter using 74HC93',
  description:
    'Design a MOD-5 counter using the 74HC93 by connecting reset inputs to detect ' +
    'count=5 (0101) and reset to 0000.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── IC ────────────────────────────────────────────────────────────────
    { id: 'ctr', type: 'counter-4bit-async', mountedAt: { board: 'bb', col: 5, row: 'e' } },

    // ── CLK input: col 1 row a → CLK_A ───────────────────────────────────
    { id: 'w_clk_ctr', type: 'wire', color: 'yellow',
      from: { board: 'bb', col: 1, row: 'a' },
      to:   { ic: 'ctr', pin: 'clk_a' } },

    // ── QA → CLK_B: 4-bit ripple counter connection ───────────────────────
    { id: 'w_qa_clkb', type: 'wire', color: 'white',
      from: { ic: 'ctr', pin: 'qa' },
      to:   { ic: 'ctr', pin: 'clk_b' } },

    // ── MOD-5 reset feedback: QA → R01, QC → R02 ─────────────────────────
    { id: 'w_qa_r01', type: 'wire', color: 'red',
      from: { ic: 'ctr', pin: 'qa' },
      to:   { ic: 'ctr', pin: 'r01' } },
    { id: 'w_qc_r02', type: 'wire', color: 'red',
      from: { ic: 'ctr', pin: 'qc' },
      to:   { ic: 'ctr', pin: 'r02' } },

    // ── QA output path (TOP bank, row 'c') — LSB ──────────────────────────
    { id: 'r_qa',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'c' } },
    { id: 'led_qa', type: 'led', color: 'red',    mountedAt: { board: 'bb', col: 24, row: 'c' } },

    { id: 'w_qa_out', type: 'wire', color: 'red',
      from: { ic: 'ctr', pin: 'qa' },
      to:   { component: 'r_qa', end: 'p1' } },
    { id: 'w_qa_led', type: 'wire', color: 'red',
      from: { component: 'r_qa', end: 'p2' },
      to:   { led: 'led_qa', end: 'anode' } },
    { id: 'w_qa_gnd', type: 'wire', color: 'black',
      from: { led: 'led_qa', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 1 } },

    // ── QB output path (BOTTOM bank, row 'h') ─────────────────────────────
    { id: 'r_qb',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 20, row: 'h' } },
    { id: 'led_qb', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 24, row: 'h' } },

    { id: 'w_qb_out', type: 'wire', color: 'yellow',
      from: { ic: 'ctr', pin: 'qb' },
      to:   { component: 'r_qb', end: 'p1' } },
    { id: 'w_qb_led', type: 'wire', color: 'yellow',
      from: { component: 'r_qb', end: 'p2' },
      to:   { led: 'led_qb', end: 'anode' } },
    { id: 'w_qb_gnd', type: 'wire', color: 'black',
      from: { led: 'led_qb', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 2 } },

    // ── QC output path (TOP bank, row 'c', offset cols) ───────────────────
    { id: 'r_qc',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 27, row: 'c' } },
    { id: 'led_qc', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 31, row: 'c' } },

    { id: 'w_qc_out', type: 'wire', color: 'green',
      from: { ic: 'ctr', pin: 'qc' },
      to:   { component: 'r_qc', end: 'p1' } },
    { id: 'w_qc_led', type: 'wire', color: 'green',
      from: { component: 'r_qc', end: 'p2' },
      to:   { led: 'led_qc', end: 'anode' } },
    { id: 'w_qc_gnd', type: 'wire', color: 'black',
      from: { led: 'led_qc', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 3 } },

    // ── QD output path (BOTTOM bank, row 'h', offset cols) — MSB ──────────
    { id: 'r_qd',   type: 'resistor', ohms: 330, mountedAt: { board: 'bb', col: 27, row: 'h' } },
    { id: 'led_qd', type: 'led', color: 'blue',   mountedAt: { board: 'bb', col: 31, row: 'h' } },

    { id: 'w_qd_out', type: 'wire', color: 'blue',
      from: { ic: 'ctr', pin: 'qd' },
      to:   { component: 'r_qd', end: 'p1' } },
    { id: 'w_qd_led', type: 'wire', color: 'blue',
      from: { component: 'r_qd', end: 'p2' },
      to:   { led: 'led_qd', end: 'anode' } },
    { id: 'w_qd_gnd', type: 'wire', color: 'black',
      from: { led: 'led_qd', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 4 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body:
        'The solderless breadboard is your build surface. ' +
        'The centre gap isolates the two banks. ' +
        'Red rail = VCC (+5 V), blue rail = GND (0 V).',
      show: ['bb'],
    },
    {
      title: 'Place the 74HC93 4-bit ripple counter IC',
      body:
        'Mount the 74HC93 straddling the centre gap at column 5. ' +
        'CLK_A (col 5,f) clocks QA alone (÷2). ' +
        'CLK_B (col 5,e) clocks the QB–QD chain (÷8). ' +
        'R01 and R02 are master reset inputs: both HIGH → all outputs LOW.',
      show: ['bb', 'ctr'],
      highlight: 'ctr',
    },
    {
      title: 'Connect QA → CLK_B (4-bit mode)',
      body:
        'White wire: IC pin QA → IC pin CLK_B. ' +
        'This chains the QA flip-flop output into the QB–QD chain input. ' +
        'The result is a full 4-bit ripple counter: every CLK_A falling edge ' +
        'advances the 4-bit count by one.',
      show: ['bb', 'ctr', 'w_qa_clkb'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Connect MOD-5 reset feedback: QA → R01, QC → R02',
      body:
        'Red wire: QA → R01. Red wire: QC → R02. ' +
        'Binary 5 = 0101: QA=1 and QC=1, QB=0, QD=0. ' +
        'When both R01 and R02 are HIGH simultaneously the IC resets to 0000. ' +
        'The count=5 state is transient — the circuit immediately resets, ' +
        'so the visible sequence is 0→1→2→3→4→0→…',
      show: ['bb', 'ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Add four output LEDs and resistors',
      body:
        'Red LED (QA) — col 24 top. Yellow LED (QB) — col 24 bottom. ' +
        'Green LED (QC) — col 31 top. Blue LED (QD) — col 31 bottom. ' +
        '330 Ω resistors before each LED. ' +
        'Reading the LEDs left-to-right gives the binary count QD QC QB QA.',
      show: ['bb', 'ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Connect output wires and CLK input',
      body:
        'Connect each output wire: QA/QB/QC/QD → resistor.p1, resistor.p2 → LED anode, LED cathode → GND. ' +
        'Yellow wire: col 1 row a → CLK_A. ' +
        'Circuit is complete. Starting count: 0000.',
      show: ['bb', 'ctr', 'w_clk_ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd',
             'w_qa_out', 'w_qa_led', 'w_qa_gnd',
             'w_qb_out', 'w_qb_led', 'w_qb_gnd',
             'w_qc_out', 'w_qc_led', 'w_qc_gnd',
             'w_qd_out', 'w_qd_led', 'w_qd_gnd'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Count 1: CLK pulse → 0001',
      body:
        'Apply first CLK pulse (HIGH→LOW). Count advances to 1 (0001). ' +
        'QA=1 (red LED ON), QB=0, QC=0, QD=0.',
      show: ['bb', 'ctr', 'w_clk_ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd',
             'w_qa_out', 'w_qa_led', 'w_qa_gnd',
             'w_qb_out', 'w_qb_led', 'w_qb_gnd',
             'w_qc_out', 'w_qc_led', 'w_qc_gnd',
             'w_qd_out', 'w_qd_led', 'w_qd_gnd'],
      activeInputs: { CLK: 1 },
    },
    {
      title: 'Count 2: CLK pulse → 0010',
      body:
        'Second pulse. Count = 2 (0010). ' +
        'QA=0, QB=1 (yellow ON), QC=0, QD=0.',
      show: ['bb', 'ctr', 'w_clk_ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd',
             'w_qa_out', 'w_qa_led', 'w_qa_gnd',
             'w_qb_out', 'w_qb_led', 'w_qb_gnd',
             'w_qc_out', 'w_qc_led', 'w_qc_gnd',
             'w_qd_out', 'w_qd_led', 'w_qd_gnd'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Count 3: CLK pulse → 0011',
      body:
        'Third pulse. Count = 3 (0011). ' +
        'QA=1 (red ON), QB=1 (yellow ON), QC=0, QD=0.',
      show: ['bb', 'ctr', 'w_clk_ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd',
             'w_qa_out', 'w_qa_led', 'w_qa_gnd',
             'w_qb_out', 'w_qb_led', 'w_qb_gnd',
             'w_qc_out', 'w_qc_led', 'w_qc_gnd',
             'w_qd_out', 'w_qd_led', 'w_qd_gnd'],
      activeInputs: { CLK: 1 },
    },
    {
      title: 'Count 4: CLK pulse → 0100',
      body:
        'Fourth pulse. Count = 4 (0100). ' +
        'QA=0, QB=0, QC=1 (green ON), QD=0.',
      show: ['bb', 'ctr', 'w_clk_ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd',
             'w_qa_out', 'w_qa_led', 'w_qa_gnd',
             'w_qb_out', 'w_qb_led', 'w_qb_gnd',
             'w_qc_out', 'w_qc_led', 'w_qc_gnd',
             'w_qd_out', 'w_qd_led', 'w_qd_gnd'],
      activeInputs: { CLK: 0 },
    },
    {
      title: 'Count 5 → immediate reset back to 0',
      body:
        'Fifth pulse. The counter briefly reaches 5 (0101: QA=1, QC=1). ' +
        'R01=QA=1 AND R02=QC=1 → master reset fires instantly → 0000. ' +
        'Count=5 is transient and not visible on the LEDs. ' +
        'The cycle repeats: 0→1→2→3→4→0→… (MOD-5 sequence).',
      show: ['bb', 'ctr', 'w_clk_ctr', 'w_qa_clkb', 'w_qa_r01', 'w_qc_r02',
             'r_qa', 'led_qa', 'r_qb', 'led_qb', 'r_qc', 'led_qc', 'r_qd', 'led_qd',
             'w_qa_out', 'w_qa_led', 'w_qa_gnd',
             'w_qb_out', 'w_qb_led', 'w_qb_gnd',
             'w_qc_out', 'w_qc_led', 'w_qc_gnd',
             'w_qd_out', 'w_qd_led', 'w_qd_gnd'],
      highlight: 'ctr',
      activeInputs: { CLK: 1 },
    },
  ],

  truthTable: {
    inputs:  ['CLK'],
    outputs: ['QD', 'QC', 'QB', 'QA'],
    rows: [
      { inputs: { CLK: 0 }, outputs: { QD: 0, QC: 0, QB: 0, QA: 0 } },  // count 0
      { inputs: { CLK: 1 }, outputs: { QD: 0, QC: 0, QB: 0, QA: 1 } },  // count 1
      { inputs: { CLK: 0 }, outputs: { QD: 0, QC: 0, QB: 1, QA: 0 } },  // count 2
      { inputs: { CLK: 1 }, outputs: { QD: 0, QC: 0, QB: 1, QA: 1 } },  // count 3
      { inputs: { CLK: 0 }, outputs: { QD: 0, QC: 1, QB: 0, QA: 0 } },  // count 4
      { inputs: { CLK: 1 }, outputs: { QD: 0, QC: 0, QB: 0, QA: 0 } },  // reset to 0
    ],
  },
};
