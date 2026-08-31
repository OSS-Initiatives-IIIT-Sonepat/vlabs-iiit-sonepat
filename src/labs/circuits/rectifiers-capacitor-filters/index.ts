import { type Circuit } from '@/labs/types';

// ── Rectifiers with Capacitor Filters ────────────────────────────────────
// Visual/analog — no simulation.
// VCC → Diode (yellow LED, col 5 row c) → R_load (1 kΩ, col 10 row c) → GND
// Capacitor (100 µF, col 15 row c) from load junction to GND.
// Blue voltmeter probes across the load.

export const RectifiersCapacitorFiltersCircuit: Circuit = {
  id: 'rectifiers-capacitor-filters',
  title: 'Rectifiers with Capacitor Filters',
  description:
    'A half-wave rectifier with a smoothing capacitor. The diode (yellow LED) rectifies AC, ' +
    'and the 100 µF capacitor filters the pulsating DC into a smoother output. ' +
    'The 1 kΩ load draws current while the capacitor maintains voltage between peaks.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'diode',  type: 'led', color: 'yellow',      mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'r_load', type: 'resistor', ohms: 1000,       mountedAt: { board: 'bb', col: 10, row: 'c' } },
    { id: 'c1',     type: 'capacitor', capacitance: 100, mountedAt: { board: 'bb', col: 15, row: 'c' } },

    // ── VCC rail → diode anode ────────────────────────────────────────────
    { id: 'w_vcc_diode', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { led: 'diode', end: 'anode' } },

    // ── Diode cathode → R_load p1 ────────────────────────────────────────
    { id: 'w_diode_rload', type: 'wire', color: 'orange',
      from: { led: 'diode', end: 'cathode' },
      to:   { component: 'r_load', end: 'p1' } },

    // ── R_load p2 → GND rail ─────────────────────────────────────────────
    { id: 'w_rload_gnd', type: 'wire', color: 'black',
      from: { component: 'r_load', end: 'p2' },
      to:   { board: 'bb', rail: 'gnd_top', col: 13 } },

    // ── Capacitor: junction (col 10, row d) → capacitor p1 ───────────────
    { id: 'w_junc_cap', type: 'wire', color: 'green',
      from: { board: 'bb', col: 10, row: 'd' },
      to:   { component: 'c1', end: 'p1' } },

    // ── Capacitor p2 → GND rail ──────────────────────────────────────────
    { id: 'w_cap_gnd', type: 'wire', color: 'black',
      from: { component: 'c1', end: 'p2' },
      to:   { board: 'bb', rail: 'gnd_top', col: 18 } },

    // ── Voltmeter probes across R_load (blue) ────────────────────────────
    { id: 'w_vm_pos', type: 'wire', color: 'blue',
      from: { component: 'r_load', end: 'p1' },
      to:   { board: 'bb', col: 10, row: 'a' } },
    { id: 'w_vm_neg', type: 'wire', color: 'blue',
      from: { component: 'r_load', end: 'p2' },
      to:   { board: 'bb', col: 13, row: 'a' } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. We will build a half-wave rectifier with a smoothing capacitor filter.',
      show: ['bb'],
    },
    {
      title: 'Place the diode',
      body: 'Insert the yellow LED (diode stand-in) at cols 5–6, row c. ' +
        'It passes only positive half-cycles to the load.',
      show: ['bb', 'diode'],
      highlight: 'diode',
    },
    {
      title: 'Place the 1 kΩ load resistor',
      body: 'Insert R_load (1 kΩ) at cols 10–13, row c. This is the load that draws current.',
      show: ['bb', 'diode', 'r_load'],
      highlight: 'r_load',
    },
    {
      title: 'Place the 100 µF filter capacitor',
      body: 'Insert the 100 µF capacitor at cols 15–18, row c. ' +
        'It stores charge during peaks and releases during valleys, smoothing the output.',
      show: ['bb', 'diode', 'r_load', 'c1'],
      highlight: 'c1',
    },
    {
      title: 'Wire the rectifier path',
      body: 'Red wire: VCC → diode anode. Orange wire: diode cathode → R_load p1. ' +
        'Black wire: R_load p2 → GND. Current path established.',
      show: ['bb', 'diode', 'r_load', 'c1', 'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd'],
    },
    {
      title: 'Wire the capacitor filter',
      body: 'Green wire: load junction (col 10 row d) → capacitor p1. ' +
        'Black wire: capacitor p2 → GND rail. The capacitor is in parallel with the load.',
      show: ['bb', 'diode', 'r_load', 'c1',
        'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd',
        'w_junc_cap', 'w_cap_gnd'],
    },
    {
      title: 'Add voltmeter probes',
      body: 'Blue wires: probe voltage across R_load (col 10 and col 13, row a). ' +
        'With the capacitor, the output ripple is significantly reduced compared to unfiltered rectification.',
      show: ['bb', 'diode', 'r_load', 'c1',
        'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd',
        'w_junc_cap', 'w_cap_gnd',
        'w_vm_pos', 'w_vm_neg'],
    },
  ],
};
