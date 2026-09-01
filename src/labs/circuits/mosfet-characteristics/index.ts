import { CB } from '@/labs/builder';

// ── MOSFET Drain and Transfer Characteristics ─────────────────────────────
//
// Topology:
//   VCC → R_D (1 kΩ) → drain → 2N7000 N-ch MOSFET → source → GND
//   LED (yellow) on drain node — visualises drain current I_D
//   R_pot (10 kΩ) from VCC to GND provides gate voltage divider
//
// Breadboard layout:
//   R_D   (1 kΩ)   — col 5,  row c  (drain resistor)
//   LED   'yellow' — col 10, row c  (I_D indicator)
//   R_pot (10 kΩ)  — col 15, row c  (gate voltage divider / VGS set)

export const MosfetCharacteristicsCircuit = new CB(
  'mosfet-characteristics',
  'Drain and Transfer Characteristics of N-Channel MOSFET (2N7000)',
  'Plot the output (ID vs VDS) and transfer (ID vs VGS) characteristics of a 2N7000 N-channel MOSFET.',
)
  .board()
  .psu('psu', [
    { board: 'bb', rail: 'vcc_top', col: 5 },
    { board: 'bb', rail: 'gnd_top', col: 5 },
  ])
  .dmm('dmm', [
    { board: 'bb', col: 8, row: 'c' },
    { board: 'bb', col: 8, row: 'd' },
  ])

  // ── Components ────────────────────────────────────────────────────────
  .resistor('r_d',    1_000,  5, 'c')    // drain resistor
  .led('led_drain', 'yellow', 10, 'c')   // drain current indicator
  .resistor('r_pot', 10_000, 15, 'c')   // gate bias / VGS divider

  // ── Ammeter wires (orange) on drain path ──────────────────────────────
  .wire('w_amm_in',  'orange',
    { board: 'bb', rail: 'vcc_top', col: 5 },
    { board: 'bb', col: 8, row: 'd' })
  .wire('w_amm_out', 'orange',
    { board: 'bb', col: 8, row: 'c' },
    { component: 'r_d', end: 'p1' })

  // ── Power wires ────────────────────────────────────────────────────────
  // R_D → LED drain indicator
  .wire('w_rd_led', 'green',
    { component: 'r_d', end: 'p2' },
    { led: 'led_drain', end: 'anode' })
  // LED cathode → GND (drain → source path through MOSFET symbolised by LED→GND)
  .wireLedToGnd('w_led_gnd', 'led_drain', 11)

  // R_pot: top to VCC, bottom to GND — wiper is the gate voltage VGS
  .wire('w_vcc_rpot', 'red',
    { board: 'bb', rail: 'vcc_top', col: 15 },
    { component: 'r_pot', end: 'p1' })
  .wireGnd('w_rpot_gnd', { component: 'r_pot', end: 'p2' }, 18)

  // Gate wire from divider midpoint to gate (represented as a node wire at col 16)
  .wire('w_gate', 'yellow',
    { board: 'bb', col: 16, row: 'c' },
    { board: 'bb', col: 12, row: 'c' })

  // ── Steps ─────────────────────────────────────────────────────────────
  // Step 0
  .step('Place the breadboard',
    'The 830-point solderless breadboard is your build surface. '
    + 'Red rails = VCC (+10 V), blue rails = GND. '
    + 'You will sweep VGS (gate voltage) to plot transfer characteristics and '
    + 'sweep VDS (drain-source voltage) to plot output characteristics.')
    .show('bb')

  // Step 1
  .step('Connect the DC power supply',
    'Place the variable DC supply to the left. '
    + 'Red wire: PSU (+) → VCC rail at col 5. Black wire: PSU (−) → GND rail at col 5. '
    + 'The supply will be adjusted during sweeps — keep at 0 V for now.')
    .show('psu')

  // Step 2
  .step('Connect the DMM as a drain ammeter',
    'Set DMM to DC mA mode. '
    + 'Orange wire 1: VCC rail (col 5) → col 8 row d (ammeter input). '
    + 'Orange wire 2: col 8 row c → R_D left lead. '
    + 'This measures drain current $I_D$ directly in series with the drain resistor.')
    .show('dmm', 'w_amm_in', 'w_amm_out')

  // Step 3
  .step('Place the drain resistor R_D (1 kΩ)',
    'Insert R_D (1 kΩ, Brown–Black–Red–Gold) at col 5–8, row c. '
    + 'This limits drain current and allows $V_{DS}$ to be calculated: '
    + '$V_{DS} = V_{DD} - I_D \\times R_D$. '
    + 'Wire R_D → LED anode (green) to complete the drain path.')
    .show('r_d', 'w_rd_led')
    .highlight('r_d')

  // Step 4
  .step('Place the gate voltage divider R_pot (10 kΩ)',
    'Insert R_pot (10 kΩ) at col 15–18, row c. '
    + 'Wire: VCC rail → R_pot top (red), R_pot bottom → GND (black). '
    + 'The wiper (col 16 row c) provides the gate voltage $V_{GS}$. '
    + 'Wire the gate node (col 16) to col 12 (MOSFET gate pin) with a yellow wire.')
    .show('r_pot', 'w_vcc_rpot', 'w_rpot_gnd', 'w_gate')
    .highlight('r_pot')

  // Step 5
  .step('Place the drain current indicator LED (yellow)',
    'Insert the yellow LED at col 10–11, row c — anode (longer lead) at col 10. '
    + 'The LED represents the MOSFET drain–source channel: '
    + 'when $V_{GS} > V_{TH} \\approx 2\\,\\text{V}$, the channel opens and the LED glows. '
    + 'Wire LED cathode → GND rail at col 11.')
    .show('led_drain', 'w_led_gnd')
    .highlight('led_drain')

  // Step 6
  .step('Transfer characteristic sweep: I_D vs V_GS',
    'Set $V_{DS} = 5\\,\\text{V}$ (fixed PSU). Slowly increase gate voltage from 0 V to 5 V '
    + 'using an external variable resistor or second PSU on the gate. '
    + 'Record $I_D$ (DMM) at each $V_{GS}$ step (0.5 V increments). '
    + 'Threshold $V_{TH} \\approx 2\\,\\text{V}$ — drain current begins to flow above this. '
    + 'In saturation: $I_D = K(V_{GS} - V_{TH})^2$.')
    .show()
    .power({ Vgs: 1 })
    .supply(5.0)
    .reading('psu', '5.00 V')
    .reading('dmm', 'ID = 3.20 mA')
    .glow('led_drain', 0.4)

  // Step 7
  .step('Output characteristic sweep: I_D vs V_DS',
    'Fix $V_{GS} = 4\\,\\text{V}$ (gate well above $V_{TH}$). '
    + 'Sweep $V_{DS}$ from 0 V to 10 V in 0.5 V steps by adjusting the supply. '
    + 'Record $I_D$ at each step. Observe: linear region ($V_{DS} < V_{GS} - V_{TH} \\approx 2\\,\\text{V}$), '
    + 'then saturation ($I_D$ nearly constant) once $V_{DS} > V_{GS} - V_{TH}$. '
    + 'The LED brightness saturates correspondingly.')
    .show()
    .power({ Vds: 1 })
    .supply(8.0)
    .reading('psu', '8.00 V')
    .reading('dmm', 'ID = 6.40 mA')
    .glow('led_drain', 0.6)

  .build();
