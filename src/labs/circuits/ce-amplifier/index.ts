import { type Circuit } from '@/labs/types';

// ── Common-Emitter Amplifier ──────────────────────────────────────────────
// Visual/analog circuit — no simulation or truth table.
//
// Topology:
//   VCC → R1 (100 kΩ) → base junction → R2 (10 kΩ) → GND   (voltage divider bias)
//   VCC → Rc (4.7 kΩ) → collector → emitter → Re (1 kΩ) → GND
//   Collector output → LED indicator
//
// Breadboard layout:
//   R1  (100 kΩ) — col 3, row c  (VCC side of divider)
//   R2  (10 kΩ)  — col 3, row h  (GND side of divider)
//   Rc  (4.7 kΩ) — col 10, row c (collector load)
//   Re  (1 kΩ)   — col 10, row h (emitter degeneration)
//   Q1  NPN BJT   — col 7, row e  (BC547)
//   LED           — col 15, row c (output indicator)

export const CeAmplifierCircuit: Circuit = {
  id: 'ce-amplifier',
  title: 'Common-Emitter (CE) Amplifier',
  description:
    'A single-stage common-emitter amplifier using an NPN transistor (BC547) with voltage-divider bias. ' +
    'R1 (100 kΩ) and R2 (10 kΩ) set the base operating point, Rc (4.7 kΩ) is the collector load, and Re (1 kΩ) provides emitter degeneration. ' +
    'An LED on the collector output indicates signal activity. Visual/analog only — no digital simulation.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Transistor ──────────────────────────────────────────────────────────
    { id: 'q1', type: 'npn-bjt', mountedAt: { board: 'bb', col: 7, row: 'e' } },

    // ── Bias resistors (voltage divider) ────────────────────────────────────
    { id: 'r1', type: 'resistor', ohms: 100_000, mountedAt: { board: 'bb', col: 3, row: 'c' } },
    { id: 'r2', type: 'resistor', ohms: 10_000,  mountedAt: { board: 'bb', col: 3, row: 'h' } },

    // ── Collector & emitter resistors ───────────────────────────────────────
    { id: 'rc', type: 'resistor', ohms: 4_700, mountedAt: { board: 'bb', col: 10, row: 'c' } },
    { id: 're', type: 'resistor', ohms: 1_000, mountedAt: { board: 'bb', col: 10, row: 'h' } },

    // ── Output LED (collector indicator) ────────────────────────────────────
    { id: 'led_out', type: 'led', color: 'red', mountedAt: { board: 'bb', col: 15, row: 'c' } },

    // ── Power wires ─────────────────────────────────────────────────────────
    // VCC → R1 (top of divider)
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 3 },
      to:   { component: 'r1', end: 'p1' } },

    // R2 → GND (bottom of divider)
    { id: 'w_r2_gnd', type: 'wire', color: 'black',
      from: { component: 'r2', end: 'p2' },
      to:   { board: 'bb', rail: 'gnd_top', col: 6 } },

    // R1 → base (R1.p2 → Q1.B)
    { id: 'w_r1_base', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { ic: 'q1', pin: 'B' } },

    // R2 → base (R2.p1 → Q1.B) — shares base node with R1
    { id: 'w_r2_base', type: 'wire', color: 'orange',
      from: { component: 'r2', end: 'p1' },
      to:   { ic: 'q1', pin: 'B' } },

    // VCC → Rc (collector load)
    { id: 'w_vcc_rc', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 10 },
      to:   { component: 'rc', end: 'p1' } },

    // Rc → collector (Rc.p2 → Q1.C)
    { id: 'w_rc_col', type: 'wire', color: 'green',
      from: { component: 'rc', end: 'p2' },
      to:   { ic: 'q1', pin: 'C' } },

    // Emitter → Re (Q1.E → Re.p1)
    { id: 'w_em_re', type: 'wire', color: 'yellow',
      from: { ic: 'q1', pin: 'E' },
      to:   { component: 're', end: 'p1' } },

    // Re → GND
    { id: 'w_re_gnd', type: 'wire', color: 'black',
      from: { component: 're', end: 'p2' },
      to:   { board: 'bb', rail: 'gnd_top', col: 13 } },

    // Collector → LED (output indicator)
    { id: 'w_col_led', type: 'wire', color: 'green',
      from: { component: 'rc', end: 'p2' },
      to:   { led: 'led_out', end: 'anode' } },

    // LED cathode → GND
    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led_out', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 16 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the solderless breadboard. Red rails = VCC (+12 V), blue rails = GND (0 V). ' +
        'The centre gap separates the top bank (rows a–e) from the bottom bank (rows f–j).',
      show: ['bb'],
    },
    {
      title: 'Place the bias resistors (voltage divider)',
      body: 'R1 (100 kΩ) at col 3, row c (top bank) and R2 (10 kΩ) at col 3, row h (bottom bank). ' +
        'Together they form a voltage divider that sets the DC bias point at the transistor base. ' +
        'V_base ≈ VCC × R2/(R1+R2) = 12 × 10/110 ≈ 1.09 V.',
      show: ['bb', 'r1', 'r2'],
      highlight: 'r1',
    },
    {
      title: 'Place collector and emitter resistors',
      body: 'Rc (4.7 kΩ) at col 10, row c — the collector load that develops the output voltage swing. ' +
        'Re (1 kΩ) at col 10, row h — emitter degeneration that stabilises the operating point. ' +
        'Voltage gain ≈ −Rc/Re ≈ −4.7.',
      show: ['bb', 'r1', 'r2', 'rc', 're'],
      highlight: 'rc',
    },
    {
      title: 'Place the NPN transistor (BC547)',
      body: 'Mount Q1 at col 7, row e straddling the centre gap. ' +
        'Pins: Base (B), Collector (C), Emitter (E). ' +
        'The CE configuration is the most common amplifier topology — it provides voltage gain with 180° phase inversion.',
      show: ['bb', 'r1', 'r2', 'rc', 're', 'q1'],
      highlight: 'q1',
    },
    {
      title: 'Add the output LED',
      body: 'Red LED at col 15, row c. It sits on the collector node and indicates output activity. ' +
        'When the transistor conducts, current flows through Rc and the collector voltage drops — the LED brightness varies with signal amplitude.',
      show: ['bb', 'r1', 'r2', 'rc', 're', 'q1', 'led_out'],
      highlight: 'led_out',
    },
    {
      title: 'Wire all connections',
      body: 'Red wires: VCC → R1 (bias top), VCC → Rc (collector supply). ' +
        'Orange wires: R1 and R2 both connect to the transistor base. ' +
        'Green wire: Rc → collector, and Rc → LED anode. ' +
        'Yellow wire: emitter → Re. ' +
        'Black wires: R2 → GND, Re → GND, LED cathode → GND. ' +
        'Circuit complete — the amplifier is biased and ready.',
      show: [
        'bb', 'r1', 'r2', 'rc', 're', 'q1', 'led_out',
        'w_vcc_r1', 'w_r2_gnd', 'w_r1_base', 'w_r2_base',
        'w_vcc_rc', 'w_rc_col', 'w_em_re', 'w_re_gnd',
        'w_col_led', 'w_led_gnd',
      ],
    },
  ],
};
