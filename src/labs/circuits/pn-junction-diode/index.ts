import { type Circuit } from '@/labs/types';

// ── PN Junction Diode Circuit ────────────────────────────────────────────
// Visual/analog — no simulation.
// Series circuit: VCC → R1 (470 Ω) → LED yellow (diode stand-in) → GND
// Blue voltmeter probes across the LED (diode).
//
// Layout:
//   R1 (470 Ω) at col 5, row c  — spans cols 5–8
//   LED (yellow) at col 10, row c — anode col 10, cathode col 11

export const PnJunctionDiodeCircuit: Circuit = {
  id: 'pn-junction-diode',
  title: 'PN Junction Diode',
  description:
    'Demonstrates the V-I characteristics of a PN junction diode. ' +
    'A 470 Ω current-limiting resistor protects the diode (modelled as a yellow LED). ' +
    'Blue voltmeter probes across the diode measure the forward voltage drop (~0.7 V for Si).',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'r1', type: 'resistor', ohms: 470, mountedAt: { board: 'bb', col: 5, row: 'c' } },
    { id: 'diode', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 10, row: 'c' } },

    // ── VCC rail → R1 left lead ───────────────────────────────────────────
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { component: 'r1', end: 'p1' } },

    // ── R1 right lead → diode anode ───────────────────────────────────────
    { id: 'w_r1_diode', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { led: 'diode', end: 'anode' } },

    // ── Diode cathode → GND rail ──────────────────────────────────────────
    { id: 'w_diode_gnd', type: 'wire', color: 'black',
      from: { led: 'diode', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 11 } },

    // ── Voltmeter probes across diode (blue) ──────────────────────────────
    { id: 'w_vm_pos', type: 'wire', color: 'blue',
      from: { led: 'diode', end: 'anode' },
      to:   { board: 'bb', col: 10, row: 'a' } },
    { id: 'w_vm_neg', type: 'wire', color: 'blue',
      from: { led: 'diode', end: 'cathode' },
      to:   { board: 'bb', col: 11, row: 'a' } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. Red rails = VCC, blue rails = GND. ' +
        'We will build a simple series circuit to study the PN junction diode characteristics.',
      show: ['bb'],
    },
    {
      title: 'Place the 470 Ω resistor',
      body: 'Insert the 470 Ω current-limiting resistor at cols 5–8, row c. ' +
        'Colour bands: Yellow-Violet-Brown = 470 Ω. ' +
        'This protects the diode from excessive current.',
      show: ['bb', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place the diode (LED stand-in)',
      body: 'Insert the yellow LED at cols 10–11, row c. ' +
        'It represents a silicon PN junction diode. Anode at col 10, cathode at col 11.',
      show: ['bb', 'r1', 'diode'],
      highlight: 'diode',
    },
    {
      title: 'Wire VCC to resistor',
      body: 'Red wire: VCC rail (col 5) → R1 left lead (p1). ' +
        'This provides the forward-bias supply voltage.',
      show: ['bb', 'r1', 'diode', 'w_vcc_r1'],
    },
    {
      title: 'Wire resistor to diode',
      body: 'Orange wire: R1 right lead (p2) → diode anode (col 10). ' +
        'Current flows through the resistor into the diode.',
      show: ['bb', 'r1', 'diode', 'w_vcc_r1', 'w_r1_diode'],
    },
    {
      title: 'Wire diode to GND',
      body: 'Black wire: diode cathode (col 11) → GND rail. ' +
        'The series circuit is now complete: VCC → R1 → Diode → GND.',
      show: ['bb', 'r1', 'diode', 'w_vcc_r1', 'w_r1_diode', 'w_diode_gnd'],
    },
    {
      title: 'Add voltmeter probes across diode',
      body: 'Blue wires: voltmeter probes across the diode (col 10 row a and col 11 row a). ' +
        'In forward bias the voltage drop is ~0.7 V for silicon. ' +
        'Vary the supply to trace the V-I characteristic curve.',
      show: ['bb', 'r1', 'diode', 'w_vcc_r1', 'w_r1_diode', 'w_diode_gnd', 'w_vm_pos', 'w_vm_neg'],
    },
  ],
};
