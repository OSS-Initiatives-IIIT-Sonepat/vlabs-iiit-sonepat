import { CB } from '@/labs/builder';

// ── BJT Bias Configurations ───────────────────────────────────────────────
//
// Two biasing schemes on the same breadboard:
//
// PHASE A — Fixed Bias (cols 3–12):
//   VCC → R_B (470 kΩ) → base → collector → R_C1 (4.7 kΩ) → VCC
//   LED_A (red) on collector output node
//
// PHASE B — Voltage-Divider Bias (cols 15–28):
//   VCC → R1 (100 kΩ) → base node → R2 (10 kΩ) → GND
//   VCC → R_C2 (4.7 kΩ) → collector → emitter → R_E (1 kΩ) → GND
//   LED_B (green) on collector output node

export const BjtBiasCircuit = new CB(
  'bjt-bias',
  'BJT Bias Configurations — Fixed Bias and Voltage-Divider Bias',
  'Design and test two BJT biasing schemes for BC547. Compare Q-point stability of fixed bias ' +
  '(RB to VCC) versus voltage-divider bias (R1+R2+RE).',
)
  .board()
  .psu('psu', [
    { board: 'bb', rail: 'vcc_top', col: 3 },
    { board: 'bb', rail: 'gnd_top', col: 3 },
  ])
  .dmm('dmm', [
    { board: 'bb', col: 6, row: 'c' },
    { board: 'bb', col: 6, row: 'd' },
  ])

  // ── PHASE A: Fixed Bias components ────────────────────────────────────
  .resistor('r_b',  470_000,  3,  'c')   // base resistor
  .resistor('r_c1',   4_700,  7,  'c')   // collector load A
  .led('led_a', 'red',       12,  'c')   // output indicator A

  // Fixed bias wires
  .wire('w_vcc_rb', 'red',
    { board: 'bb', rail: 'vcc_top', col: 3 },
    { component: 'r_b', end: 'p1' })
  .wire('w_vcc_rc1', 'red',
    { board: 'bb', rail: 'vcc_top', col: 7 },
    { component: 'r_c1', end: 'p1' })
  // Ammeter in series on collector path
  .wire('w_amm_in',  'orange',
    { board: 'bb', rail: 'vcc_top', col: 6 },
    { board: 'bb', col: 6, row: 'd' })
  .wire('w_amm_out', 'orange',
    { board: 'bb', col: 6, row: 'c' },
    { component: 'r_c1', end: 'p1' })
  // R_C1 → LED_A
  .wire('w_rc1_leda', 'green',
    { component: 'r_c1', end: 'p2' },
    { led: 'led_a', end: 'anode' })
  // LED_A cathode → GND
  .wireLedToGnd('w_leda_gnd', 'led_a', 13)

  // ── PHASE B: Voltage-Divider Bias components ──────────────────────────
  .resistor('r1',   100_000, 15,  'c')   // top divider resistor
  .resistor('r2',    10_000, 15,  'h')   // bottom divider resistor
  .resistor('r_c2',   4_700, 20,  'c')   // collector load B
  .resistor('r_e',    1_000, 20,  'h')   // emitter degeneration
  .led('led_b', 'green',    25,  'c')   // output indicator B

  // VDB wires
  .wire('w_vcc_r1', 'red',
    { board: 'bb', rail: 'vcc_top', col: 15 },
    { component: 'r1', end: 'p1' })
  .wireGnd('w_r2_gnd', { component: 'r2', end: 'p2' }, 18)
  .wire('w_vcc_rc2', 'red',
    { board: 'bb', rail: 'vcc_top', col: 20 },
    { component: 'r_c2', end: 'p1' })
  .wireGnd('w_re_gnd', { component: 'r_e', end: 'p2' }, 23)
  // R_C2 → LED_B
  .wire('w_rc2_ledb', 'green',
    { component: 'r_c2', end: 'p2' },
    { led: 'led_b', end: 'anode' })
  // LED_B cathode → GND
  .wireLedToGnd('w_ledb_gnd', 'led_b', 26)

  // ── Steps ─────────────────────────────────────────────────────────────
  // Step 0
  .step('Place the breadboard',
    'The 830-point solderless breadboard is your build surface. '
    + 'Red rails = VCC (+12 V), blue rails = GND. '
    + 'You will build Phase A (fixed bias) on the left half and Phase B (VDB) on the right half.')
    .show('bb')

  // Step 1
  .step('Connect the DC power supply',
    'Place the DC supply beside the board. '
    + 'Red wire: PSU (+) → VCC rail at col 3. Black wire: PSU (−) → GND rail at col 3. '
    + 'Set to 12 V and leave switched off until circuits are complete.')
    .show('psu', 'w_vcc_rb')

  // Step 2
  .step('Connect the DMM as an ammeter (series, fixed-bias collector path)',
    'Set DMM to DC mA. '
    + 'Orange wire 1: VCC rail (col 6) → col 6 row d. '
    + 'Orange wire 2: col 6 row c → R_C1 left lead. '
    + 'This places the ammeter in series to measure Phase A collector current $I_{C(A)}$.')
    .show('dmm', 'w_amm_in', 'w_amm_out')

  // Step 3
  .step('Assemble Phase A — Fixed Bias circuit',
    'Insert R_B (470 kΩ) at col 3–6, row c. Wire: VCC rail → R_B left lead (red). '
    + 'Insert R_C1 (4.7 kΩ) at col 7–10, row c. Wire: VCC rail → R_C1 (red). '
    + 'Insert LED_A (red) at col 12–13, row c. '
    + 'Wire R_C1 right lead → LED_A anode (green). Wire LED_A cathode → GND.')
    .show('r_b', 'r_c1', 'led_a', 'w_vcc_rc1', 'w_rc1_leda', 'w_leda_gnd')
    .highlight('r_b')

  // Step 4
  .step('Measure fixed-bias Q-point',
    'Power on (12 V). The fixed-bias base current is $I_B = (V_{CC} - V_{BE})/R_B = (12-0.7)/470\\text{k} \\approx 24\\,\\mu\\text{A}$. '
    + 'Collector current $I_C = \\beta I_B \\approx 200 \\times 24 = 4.8\\,\\text{mA}$. '
    + 'Record DMM reading ($I_C$) and use second DMM to measure $V_{CE}$. Observe LED_A brightness.')
    .show()
    .power({ Vcc: 1 })
    .supply(12.0)
    .reading('psu', '12.00 V')
    .reading('dmm', 'IC = 4.82 mA')
    .glow('led_a', 0.65)

  // Step 5
  .step('Assemble Phase B — Voltage-Divider Bias circuit',
    'Insert R1 (100 kΩ) at col 15–18, row c. Insert R2 (10 kΩ) at col 15–18, row h. '
    + 'Wire VCC → R1 (red). Wire R2 bottom → GND (black). '
    + 'Insert R_C2 (4.7 kΩ) at col 20–23, row c; wire VCC → R_C2 (red). '
    + 'Insert R_E (1 kΩ) at col 20–23, row h; wire R_E bottom → GND (black). '
    + 'Insert LED_B (green) at col 25–26, row c; wire R_C2 → LED_B anode, LED_B cathode → GND.')
    .show('r1', 'r2', 'r_c2', 'r_e', 'led_b',
          'w_vcc_r1', 'w_r2_gnd', 'w_vcc_rc2', 'w_re_gnd', 'w_rc2_ledb', 'w_ledb_gnd')
    .highlight('r1')

  // Step 6
  .step('Measure VDB Q-point and compare stability',
    'Power on (12 V). VDB base voltage: $V_B = V_{CC} \\times R2/(R1+R2) = 12 \\times 10/110 \\approx 1.09\\,\\text{V}$. '
    + '$I_C \\approx (V_B - 0.7)/R_E = 0.39/1000 \\approx 0.39\\,\\text{mA}$. '
    + 'Record DMM ($I_C$) and $V_{CE}$ for Phase B. Compare LED_A vs LED_B brightness — '
    + 'LED_B is dimmer but its bias point is far more stable against $\\beta$ variation.')
    .show()
    .power({ Vcc: 1 })
    .supply(12.0)
    .reading('psu', '12.00 V')
    .reading('dmm', 'IC = 0.39 mA')
    .glow('led_a', 0.65)
    .glow('led_b', 0.18)

  .build();
