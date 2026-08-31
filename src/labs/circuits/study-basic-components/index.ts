import { type Circuit } from '@/labs/types';

// ── Study Basic Components ────────────────────────────────────────────────
// Visual-only circuit (no simulation). Shows common electronic components
// on a breadboard: resistor, LED, and capacitor with connecting wires.
//
// Layout:
//   Resistor (470 Ω) at col 5, row c  — spans cols 5–8
//   LED (red)         at col 10, row c — anode col 10, cathode col 11
//   Capacitor (100µF) at col 15, row c — spans cols 15–18
//   VCC → resistor → LED → GND

export const StudyBasicComponentsCircuit: Circuit = {
  id: 'study-basic-components',
  title: 'Study of Basic Electronic Components',
  description:
    'A visual introduction to basic electronic components: resistor, LED, and capacitor. ' +
    'Components are placed on a breadboard with wires showing a simple series circuit. ' +
    'No simulation — this lab is for identification and familiarisation.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'r1',  type: 'resistor',  ohms: 470,        mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'led1', type: 'led',       color: 'red',     mountedAt: { board: 'bb', col: 10, row: 'c' } },
    { id: 'c1',  type: 'capacitor', capacitance: 100,  mountedAt: { board: 'bb', col: 15, row: 'c' } },

    // ── Wires: VCC → R1 → LED → GND ──────────────────────────────────────
    { id: 'w_vcc_r1', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { component: 'r1', end: 'p1' } },

    { id: 'w_r1_led', type: 'wire', color: 'orange',
      from: { component: 'r1', end: 'p2' },
      to:   { led: 'led1', end: 'anode' } },

    { id: 'w_led_gnd', type: 'wire', color: 'black',
      from: { led: 'led1', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 11 } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'The solderless breadboard is your build surface. ' +
        'Holes in the same column and bank (a–e or f–j) are electrically connected. ' +
        'Red rails = VCC (+5 V), blue rails = GND (0 V).',
      show: ['bb'],
    },
    {
      title: 'Place the 470 Ω resistor',
      body: 'Insert the resistor at cols 5–8, row c. ' +
        'Resistors limit current flow. The colour bands indicate the resistance value: ' +
        'Yellow-Violet-Brown = 470 Ω.',
      show: ['bb', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place the LED',
      body: 'Insert the red LED at cols 10–11, row c. ' +
        'The longer leg (anode, col 10) connects towards the positive side. ' +
        'The shorter leg (cathode, col 11) connects towards ground. ' +
        'LEDs emit light when current flows through them in the forward direction.',
      show: ['bb', 'r1', 'led1'],
      highlight: 'led1',
    },
    {
      title: 'Place the 100 µF capacitor',
      body: 'Insert the electrolytic capacitor at cols 15–18, row c. ' +
        'Capacitors store charge. The longer lead is positive. ' +
        'The 100 µF rating tells you how much charge it can hold.',
      show: ['bb', 'r1', 'led1', 'c1'],
      highlight: 'c1',
    },
    {
      title: 'Wire the series circuit',
      body: 'Red wire: VCC rail → resistor left lead (p1). ' +
        'Orange jumper: resistor right lead (p2) → LED anode. ' +
        'Black wire: LED cathode → GND rail. ' +
        'Current path: VCC → R1 (limits current) → LED (emits light) → GND.',
      show: ['bb', 'r1', 'led1', 'c1', 'w_vcc_r1', 'w_r1_led', 'w_led_gnd'],
    },
  ],
};
