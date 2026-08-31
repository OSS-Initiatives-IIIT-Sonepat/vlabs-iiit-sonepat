import { type Circuit } from '@/labs/types';

// ── Zener V-I Characteristic Circuit ────────────────────────────────────
//
// Two configurations on the SAME breadboard, built up step-by-step:
//
// FORWARD BIAS (steps 0–8):
//   PSU → VCC/GND rails → ammeter (orange, in series) → R1 (470 Ω)
//   → Zener anode → cathode → GND rail
//   Voltmeter probes (blue) across Zener
//
// REVERSE BIAS (steps 9–12):
//   Same but Zener physically reversed at a different position.

export const ZenerDiodeCircuit: Circuit = {
  id: 'zener-diode',
  title: 'V-I Characteristics of Zener Diode',
  description:
    'A 1N4733A Zener diode (V_Z = 5.1 V) in series with a 470 Ω current-limiting resistor. ' +
    'Forward and reverse V-I characteristics are plotted by varying the supply voltage.',

  components: [
    // ── Board ─────────────────────────────────────────────────────────────
    { id: 'bb', type: 'breadboard' },

    // ── Instruments (3D models beside the breadboard) ─────────────────────
    // DC Power Supply — rendered to the LEFT, wires go to VCC/GND rails at col 5
    { id: 'psu', type: 'dc-jack', mountedAt: { board: 'bb', col: 1, row: 'a' },
      terminals: [
        { board: 'bb', rail: 'vcc_top', col: 5 },
        { board: 'bb', rail: 'gnd_top', col: 5 },
      ] },
    // Digital Multimeter (ammeter mode) — rendered to the RIGHT, probes go to ammeter holes
    { id: 'dmm', type: 'potentiometer', mountedAt: { board: 'bb', col: 1, row: 'b' },
      probes: [
        { board: 'bb', col: 3, row: 'd' },
        { board: 'bb', col: 3, row: 'c' },
      ] },

    // ── Ammeter in series ─────────────────────────────────────────────────
    // Orange wire 1: VCC rail (col 5) → ammeter input (col 3 row d)
    { id: 'w_amm_in', type: 'wire', color: 'orange',
      from: { board: 'bb', rail: 'vcc_top', col: 5 },
      to:   { board: 'bb', col: 3, row: 'd' } },
    // Orange wire 2: ammeter output (col 3 row c) → R1 input (col 5 row c)
    // Note: col 3 row c and col 3 row d are in the same column bank = same net
    // So current flows: VCC rail → col3 row d → (same net) → col3 row c → R1
    { id: 'w_amm_out', type: 'wire', color: 'orange',
      from: { board: 'bb', col: 3, row: 'c' },
      to:   { component: 'r1', end: 'p1' } },

    // ── 470 Ω series resistor — cols 5–8, row c ──────────────────────────
    { id: 'r1', type: 'resistor', ohms: 470, mountedAt: { board: 'bb', col: 5, row: 'c' } },

    // ════════════════════════════════════════════════════════════════════════
    // FORWARD BIAS: Zener at cols 10–11, row c (anode=col10, cathode=col11)
    // ════════════════════════════════════════════════════════════════════════
    { id: 'zener_fwd', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 10, row: 'c' } },

    // R1 right (col 8) → Zener_fwd anode (col 10)
    { id: 'w_r1_zfwd', type: 'wire', color: 'green',
      from: { component: 'r1', end: 'p2' },
      to:   { led: 'zener_fwd', end: 'anode' } },

    // Zener_fwd cathode (col 11) → GND rail
    { id: 'w_zfwd_gnd', type: 'wire', color: 'black',
      from: { led: 'zener_fwd', end: 'cathode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 11 } },

    // Voltmeter probes (blue) across forward Zener
    // V+ probe: from Zener anode node down to row 'a' (same column = same net, probe tip in node)
    // V- probe: from GND rail at col 12 to row 'a' col 12 (probe on GND side)
    { id: 'w_vm_fwd_pos', type: 'wire', color: 'blue',
      from: { led: 'zener_fwd', end: 'anode' },
      to:   { board: 'bb', col: 10, row: 'a' } },
    { id: 'w_vm_fwd_neg', type: 'wire', color: 'blue',
      from: { board: 'bb', rail: 'gnd_top', col: 12 },
      to:   { board: 'bb', col: 12, row: 'a' } },

    // ════════════════════════════════════════════════════════════════════════
    // REVERSE BIAS: Zener reversed at cols 15–16, row c
    // ════════════════════════════════════════════════════════════════════════
    { id: 'zener_rev', type: 'led', color: 'red', mountedAt: { board: 'bb', col: 15, row: 'c' } },

    // R1 right → Zener_rev CATHODE (col 16)
    { id: 'w_r1_zrev', type: 'wire', color: 'purple',
      from: { component: 'r1', end: 'p2' },
      to:   { led: 'zener_rev', end: 'cathode' } },

    // Zener_rev anode (col 15) → GND rail
    { id: 'w_zrev_gnd', type: 'wire', color: 'black',
      from: { led: 'zener_rev', end: 'anode' },
      to:   { board: 'bb', rail: 'gnd_top', col: 15 } },

    // Voltmeter probes (blue) across reverse Zener
    // V+ probe: from Zener cathode (supply side, col 16) to row 'a'
    // V- probe: from GND rail at col 13 to row 'a'
    { id: 'w_vm_rev_pos', type: 'wire', color: 'blue',
      from: { led: 'zener_rev', end: 'cathode' },
      to:   { board: 'bb', col: 16, row: 'a' } },
    { id: 'w_vm_rev_neg', type: 'wire', color: 'blue',
      from: { board: 'bb', rail: 'gnd_top', col: 13 },
      to:   { board: 'bb', col: 13, row: 'a' } },
  ],

  steps: [
    // ── FORWARD BIAS ASSEMBLY ───────────────────────────────────────────
    {
      title: 'Place the breadboard',
      body: 'The 830-point solderless breadboard is your build surface. Red rails = VCC (+), blue rails = GND (−). The centre gap isolates rows a–e from f–j.',
      show: ['bb'],
    },
    {
      title: 'Connect the DC power supply',
      body: 'Place the variable DC supply beside the breadboard. Red wire from supply (+) to VCC rail at col 5. Black wire from supply (−) to GND rail at col 5. Set supply to 0 V.',
      show: ['bb', 'psu', 'w_psu_pos', 'w_psu_neg'],
    },
    {
      title: 'Connect the ammeter (DMM) in series',
      body: 'Place the Digital Multimeter in DC mA mode. Orange wire 1: VCC rail → col 3 row d (ammeter input). Orange wire 2: col 3 row c → R₁ input (col 5). The ammeter sits in series — all circuit current passes through it, measuring I_Z directly.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out'],
    },
    {
      title: 'Place the 470 Ω series resistor',
      body: 'Insert R₁ (470 Ω) at cols 5–8, row c. Colour bands: Yellow–Violet–Brown–Gold. This limits Zener current to safe levels.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1'],
      highlight: 'r1',
    },
    {
      title: 'Place the Zener diode (forward bias)',
      body: 'Insert the 1N4733A at cols 10–11, row c. ANODE (longer lead) at col 10, CATHODE (banded end) at col 11. In forward bias, current flows anode → cathode.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_fwd'],
      highlight: 'zener_fwd',
    },
    {
      title: 'Wire R₁ to Zener anode',
      body: 'Green wire: R₁ right lead (col 8) → Zener anode (col 10).',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_fwd', 'w_r1_zfwd'],
    },
    {
      title: 'Wire Zener cathode to GND',
      body: 'Black wire: Zener cathode (col 11) → GND rail. Forward-bias loop complete: PSU → ammeter → R₁ → Zener → GND.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_fwd', 'w_r1_zfwd', 'w_zfwd_gnd'],
    },
    {
      title: 'Connect voltmeter probes across the Zener',
      body: 'Blue wires: V⁺ probe at col 10 (anode side), V⁻ probe at col 11 (cathode side). These measure V_Z directly across the diode.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_fwd', 'w_r1_zfwd', 'w_zfwd_gnd', 'w_vm_fwd_pos', 'w_vm_fwd_neg'],
    },
    {
      title: 'Forward sweep: 0 → 2 V — Zener glows',
      body: 'Power on. Sweep V_s from 0 to 2.0 V in 0.1 V steps. The Zener glows once forward voltage exceeds ~0.65 V. Record V_Z and I_Z at each step.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_fwd', 'w_r1_zfwd', 'w_zfwd_gnd', 'w_vm_fwd_pos', 'w_vm_fwd_neg'],
      activeInputs: { Vcc: 1 },
      supplyVoltage: 1.0,
      readings: { psu: '1.00 V', dmm: '0.62 V  0.81 mA' },
      ledBrightness: { zener_fwd: 0.08 },
    },

    // ── REVERSE BIAS ASSEMBLY ───────────────────────────────────────────
    {
      title: 'Reverse the Zener diode',
      body: 'Power off. Remove forward-bias wires. Place the Zener REVERSED at cols 15–16: cathode (col 16) faces supply, anode (col 15) faces GND. The red color marks the reversed orientation.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_rev'],
      highlight: 'zener_rev',
    },
    {
      title: 'Wire reverse-bias path',
      body: 'Purple wire: R₁ → Zener cathode (col 16). Black wire: Zener anode (col 15) → GND rail. Current enters through the cathode — reverse bias.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_rev', 'w_r1_zrev', 'w_zrev_gnd'],
    },
    {
      title: 'Connect voltmeter (reverse bias)',
      body: 'Blue wires: voltmeter probes across the reversed Zener at cols 15–16.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_rev', 'w_r1_zrev', 'w_zrev_gnd', 'w_vm_rev_pos', 'w_vm_rev_neg'],
    },
    {
      title: 'Reverse sweep: 0 → 10 V — observe breakdown',
      body: 'Power on. Sweep V_s from 0 to 10 V. Near V_Z ≈ 5 V, the Zener enters breakdown — it glows as current rises steeply while voltage clamps at 5.1 V.',
      show: ['bb', 'psu', 'dmm', 'w_amm_in', 'w_amm_out', 'r1', 'zener_rev', 'w_r1_zrev', 'w_zrev_gnd', 'w_vm_rev_pos', 'w_vm_rev_neg'],
      activeInputs: { Vcc: 1 },
      supplyVoltage: 8.0,
      readings: { psu: '8.00 V', dmm: '-5.12 V  6.13 mA' },
      ledBrightness: { zener_rev: 0.4 },
    },
  ],
};
