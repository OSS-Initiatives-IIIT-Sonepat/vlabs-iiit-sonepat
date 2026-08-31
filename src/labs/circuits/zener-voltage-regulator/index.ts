import { type Circuit } from '@/labs/types';

// ── Zener Voltage Regulator Circuit ──────────────────────────────────────
// Visual/analog — no simulation.
// VCC → R_series (470 Ω) → junction (col 8) → Zener LED (yellow) → GND
//                           junction → R_load (1 kΩ, bottom bank) → GND
// Blue voltmeter probes across the load.
//
// Layout:
//   R_series (470 Ω)  at col 5, row c  — spans cols 5–8
//   Junction node      at col 8
//   Zener (yellow LED) at col 12, row c — anode col 12, cathode col 13
//   R_load (1 kΩ)      at col 12, row h — spans cols 12–15

export const ZenerVoltageRegulatorCircuit: Circuit = {
  id: 'zener-voltage-regulator',
  title: 'Zener Voltage Regulator',
  description:
    'A Zener diode voltage regulator circuit. The 470 Ω series resistor limits current from VCC. ' +
    'The Zener diode (modelled as yellow LED) clamps the voltage at its breakdown value. ' +
    'A 1 kΩ load resistor draws regulated current. Blue voltmeter probes monitor the output.',

  components: [
    { id: 'bb', type: 'breadboard' },

    // ── Components ────────────────────────────────────────────────────────
    { id: 'r_series', type: 'resistor', ohms: 470,  mountedAt: { board: 'bb', col: 5,  row: 'c' } },
    { id: 'zener',    type: 'led', color: 'yellow',  mountedAt: { board: 'bb', col: 12, row: 'c' } },
    { id: 'r_load',   type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 12, row: 'h' } },

    // ── VCC rail → R_series p1 ────────────────────────────────────────────
    { id: 'w_vcc_rseries', type: 'wire', color: 'red',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { component: 'r_series', end: 'p1' } },

    // ── R_series p2 → junction (col 8, row c → col 8, row d) ─────────────
    { id: 'w_rseries_junc', type: 'wire', color: 'orange',
      from: { component: 'r_series', end: 'p2' },
      to:   { board: 'bb', col: 8, row: 'c' } },

    // ── Junction → Zener anode ────────────────────────────────────────────
    { id: 'w_junc_zener', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 8, row: 'd' },
      to:   { led: 'zener', end: 'anode' } },

    // ── Zener cathode → GND rail ──────────────────────────────────────────
    { id: 'w_zener_gnd', type: 'wire', color: 'black',
      from: { led: 'zener', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 13 } },

    // ── Junction → R_load p1 (top bank to bottom bank) ───────────────────
    { id: 'w_junc_rload', type: 'wire', color: 'green',
      from: { board: 'bb', col: 8, row: 'h' },
      to:   { component: 'r_load', end: 'p1' } },

    // ── R_load p2 → GND rail ─────────────────────────────────────────────
    { id: 'w_rload_gnd', type: 'wire', color: 'black',
      from: { component: 'r_load', end: 'p2' },
      to:   { board: 'bb', rail: 'gnd_top', col: 15 } },

    // ── Voltmeter probes across load (blue) ──────────────────────────────
    { id: 'w_vm_pos', type: 'wire', color: 'blue',
      from: { component: 'r_load', end: 'p1' },
      to:   { board: 'bb', col: 12, row: 'j' } },
    { id: 'w_vm_neg', type: 'wire', color: 'blue',
      from: { component: 'r_load', end: 'p2' },
      to:   { board: 'bb', col: 15, row: 'j' } },
  ],

  steps: [
    {
      title: 'Start with the breadboard',
      body: 'Place the breadboard. Red rails = VCC, blue rails = GND. ' +
        'We will build a Zener voltage regulator with a parallel load.',
      show: ['bb'],
    },
    {
      title: 'Place the 470 Ω series resistor',
      body: 'Insert R_series (470 Ω) at cols 5–8, row c. ' +
        'This drops excess voltage so the Zener operates in breakdown.',
      show: ['bb', 'r_series'],
      highlight: 'r_series',
    },
    {
      title: 'Place the Zener diode',
      body: 'Insert the Zener diode (yellow LED) at cols 12–13, row c. ' +
        'In reverse bias, it clamps the output voltage at V_Z.',
      show: ['bb', 'r_series', 'zener'],
      highlight: 'zener',
    },
    {
      title: 'Place the 1 kΩ load resistor',
      body: 'Insert R_load (1 kΩ) at cols 12–15, row h (bottom bank). ' +
        'The load draws current from the regulated output node.',
      show: ['bb', 'r_series', 'zener', 'r_load'],
      highlight: 'r_load',
    },
    {
      title: 'Wire VCC to series resistor and junction',
      body: 'Red wire: VCC rail → R_series p1. Orange wires: R_series p2 → junction at col 8, ' +
        'then junction → Zener anode.',
      show: ['bb', 'r_series', 'zener', 'r_load', 'w_vcc_rseries', 'w_rseries_junc', 'w_junc_zener'],
    },
    {
      title: 'Wire Zener and load to GND',
      body: 'Black wires: Zener cathode → GND rail, R_load p2 → GND rail. ' +
        'Green wire: junction (col 8 row h) → R_load p1.',
      show: ['bb', 'r_series', 'zener', 'r_load',
        'w_vcc_rseries', 'w_rseries_junc', 'w_junc_zener',
        'w_zener_gnd', 'w_junc_rload', 'w_rload_gnd'],
    },
    {
      title: 'Add voltmeter probes across load',
      body: 'Blue wires: probe the voltage across R_load (cols 12 and 15, row j). ' +
        'The Zener clamps the output regardless of input variations.',
      show: ['bb', 'r_series', 'zener', 'r_load',
        'w_vcc_rseries', 'w_rseries_junc', 'w_junc_zener',
        'w_zener_gnd', 'w_junc_rload', 'w_rload_gnd',
        'w_vm_pos', 'w_vm_neg'],
    },
    {
      title: 'Observe regulation',
      body: 'Vary the supply voltage. The load voltage remains approximately constant at V_Z ' +
        'as long as the Zener remains in breakdown. This is the principle of Zener regulation.',
      show: ['bb', 'r_series', 'zener', 'r_load',
        'w_vcc_rseries', 'w_rseries_junc', 'w_junc_zener',
        'w_zener_gnd', 'w_junc_rload', 'w_rload_gnd',
        'w_vm_pos', 'w_vm_neg'],
    },
  ],
};
