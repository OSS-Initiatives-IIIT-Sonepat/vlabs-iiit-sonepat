import { type Circuit } from '@/labs/types';

// ── Half-Wave Rectifier Circuit ──────────────────────────────────────────
// Visual/analog — no simulation.
// VCC → Diode (yellow LED, col 8 row c) → R_load (1 kΩ, col 12 row c) → GND
// Blue voltmeter probes across the load resistor.
//
// Layout:
//   Diode (yellow LED) at col 8, row c — anode col 8, cathode col 9
//   R_load (1 kΩ)      at col 12, row c — spans cols 12–15

export const HalfWaveRectifierCircuit: Circuit = {
  id: 'half-wave-rectifier',
  title: 'Half-Wave Rectifier',
  description:
    'A half-wave rectifier using a single diode (modelled as a yellow LED). ' +
    'Only the positive half-cycle of the AC input passes through to the 1 kΩ load. ' +
    'Blue voltmeter probes across the load show the pulsating DC output.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'diode',  type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 8,  row: 'c' } },
    { id: 'r_load', type: 'resistor', ohms: 1000,  mountedAt: { board: 'bb', col: 12, row: 'c' } },

    // ── VCC rail → diode anode ────────────────────────────────────────────
    { id: 'w_vcc_diode', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 8 },
      to:   { led: 'diode', end: 'anode' } },

    // ── Diode cathode → R_load p1 ────────────────────────────────────────
    { id: 'w_diode_rload', type: 'wire', color: 'orange',
      from: { led: 'diode', end: 'cathode' },
      to:   { component: 'r_load', end: 'p1' } },

    // ── R_load p2 → GND rail ─────────────────────────────────────────────
    { id: 'w_rload_gnd', type: 'wire', color: 'black',
      from: { component: 'r_load', end: 'p2' },
      to:   { board: 'bb', rail: 'gnd_top', col: 15 } },

    // ── Voltmeter probes across R_load (blue) ────────────────────────────
    { id: 'w_vm_pos', type: 'wire', color: 'blue',
      from: { component: 'r_load', end: 'p1' },
      to:   { board: 'bb', col: 12, row: 'a' } },
    { id: 'w_vm_neg', type: 'wire', color: 'blue',
      from: { component: 'r_load', end: 'p2' },
      to:   { board: 'bb', col: 15, row: 'a' } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. Red rails = VCC (AC source positive), blue rails = GND. ' +
        'We will build a half-wave rectifier that passes only positive half-cycles.',
      show: ['bb'],
    },
    {
      title: 'Place the diode',
      body: 'Insert the yellow LED (diode stand-in) at cols 8–9, row c. ' +
        'Anode at col 8, cathode at col 9. Current flows anode → cathode during positive half-cycles.',
      show: ['bb', 'diode'],
      highlight: 'diode',
    },
    {
      title: 'Place the 1 kΩ load resistor',
      body: 'Insert R_load (1 kΩ) at cols 12–15, row c. ' +
        'This is the load across which we measure the rectified output.',
      show: ['bb', 'diode', 'r_load'],
      highlight: 'r_load',
    },
    {
      title: 'Wire VCC to diode anode',
      body: 'Red wire: VCC rail (col 8) → diode anode. ' +
        'The AC source feeds the diode.',
      show: ['bb', 'diode', 'r_load', 'w_vcc_diode'],
    },
    {
      title: 'Wire diode to load',
      body: 'Orange wire: diode cathode (col 9) → R_load p1 (col 12). ' +
        'Rectified current flows into the load.',
      show: ['bb', 'diode', 'r_load', 'w_vcc_diode', 'w_diode_rload'],
    },
    {
      title: 'Wire load to GND',
      body: 'Black wire: R_load p2 (col 15) → GND rail. ' +
        'Circuit complete: VCC → Diode → R_load → GND.',
      show: ['bb', 'diode', 'r_load', 'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd'],
    },
    {
      title: 'Add voltmeter probes across load',
      body: 'Blue wires: probe voltage across R_load (col 12 and col 15, row a). ' +
        'Output is pulsating DC — only positive half-cycles appear across the load.',
      show: ['bb', 'diode', 'r_load', 'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd',
        'w_vm_pos', 'w_vm_neg'],
    },
  ],
};
