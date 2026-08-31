import { type Circuit } from '@/labs/types';

// ── Ohm's Law Circuit ────────────────────────────────────────────────────
// Visual/analog (Zener pattern — no simulation).
// Series circuit: VCC → R1 (1 kΩ) → LED (current indicator) → GND
// Blue voltmeter probe wires across the resistor.
//
// Layout:
//   R1 (1 kΩ) at col 5, row c   — spans cols 5–8
//   LED (green) at col 10, row c — anode col 10, cathode col 11

export const OhmsLawCircuit: Circuit = {
  id: 'ohms-law',
  title: "Ohm's Law",
  description:
    'Demonstrates Ohm\'s Law (V = I × R) using a 1 kΩ resistor and an LED as a current indicator. ' +
    'Voltmeter probes across the resistor measure the voltage drop. ' +
    'By varying the supply voltage and measuring current, the linear V-I relationship is observed.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'r1',   type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'led1', type: 'led', color: 'green',  mountedAt: { board: 'bb', col: 10, row: 'c' } },

    // ── VCC rail → R1 left lead ───────────────────────────────────────────
    { id: 'w_vcc', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { component: 'r1', end: 'p1' } },

    // ── R1 right lead → LED anode ─────────────────────────────────────────
    { id: 'w_r1_led', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { led: 'led1', end: 'anode' } },

    // ── LED cathode → GND rail ────────────────────────────────────────────
    { id: 'w_gnd', type: 'wire', color: 'black',
      from: { led: 'led1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 11 } },

    // ── Voltmeter probes across R1 (blue) ─────────────────────────────────
    { id: 'w_vm_pos', type: 'wire', color: 'blue',
      from: { component: 'r1', end: 'p1' },
      to:   { board: 'bb', col: 5, row: 'a' } },
    { id: 'w_vm_neg', type: 'wire', color: 'blue',
      from: { component: 'r1', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'a' } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. Red rails = VCC, blue rails = GND. ' +
        'We will build a simple series circuit to verify Ohm\'s Law: V = I × R.',
      show: ['bb'],
    },
    {
      title: 'Place the 1 kΩ resistor',
      body: 'Insert the 1 kΩ resistor at cols 5–8, row c. ' +
        'Colour bands: Brown-Black-Red = 1000 Ω. ' +
        'This is the component under test — we will measure the voltage across it.',
      show: ['bb', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place the LED (current indicator)',
      body: 'Insert the green LED at cols 10–11, row c. ' +
        'The LED serves as a visual current indicator: brighter = more current flowing.',
      show: ['bb', 'r1', 'led1'],
      highlight: 'led1',
    },
    {
      title: 'Wire VCC to resistor',
      body: 'Red wire: VCC rail (col 5) → R1 left lead (p1). ' +
        'This provides the supply voltage to the circuit.',
      show: ['bb', 'r1', 'led1', 'w_vcc'],
    },
    {
      title: 'Wire LED to GND',
      body: 'Black wire: LED cathode (col 11) → GND rail. ' +
        'Current path is now: VCC → R1 → LED → GND.',
      show: ['bb', 'r1', 'led1', 'w_vcc', 'w_r1_led', 'w_gnd'],
    },
    {
      title: 'Add voltmeter probes across resistor',
      body: 'Blue wires: probe the voltage at each end of R1. ' +
        'Positive probe at R1 p1 (col 5, row a), negative at R1 p2 (col 8, row a). ' +
        'The voltmeter reads V_R = I × R. With 5 V supply and ~2 V LED drop, ' +
        'V_R ≈ 3 V, so I ≈ 3 mA.',
      show: ['bb', 'r1', 'led1', 'w_vcc', 'w_r1_led', 'w_gnd', 'w_vm_pos', 'w_vm_neg'],
    },
  ],
};
