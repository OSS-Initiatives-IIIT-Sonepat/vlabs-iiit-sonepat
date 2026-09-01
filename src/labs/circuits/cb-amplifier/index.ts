import { CB } from '@/labs/builder';

// ── Common-Base Amplifier ─────────────────────────────────────────────────
//
// Topology (BC547 in common-base):
//   VCC → R_C (4.7 kΩ) → collector → (output node) → LED indicator
//   Emitter input → R_E (1 kΩ) → GND
//   Base COMMON (grounded via short)
//   Ammeter (DMM) in series on collector path measures I_C
//
// Breadboard layout:
//   R_E  (1 kΩ)   — col 5, row c   (emitter resistor)
//   R_C  (4.7 kΩ) — col 10, row c  (collector load)
//   C_in (10 µF)  — col 15, row c  (coupling capacitor)
//   LED  'yellow' — col 20, row c  (collector output indicator)

export const CbAmplifierCircuit = new CB(
  'cb-amplifier',
  'Common-Base Amplifier Characteristics',
  'Study the input/output characteristics of a BC547 transistor in common-base configuration. ' +
  'Measure collector current IC vs VCB (output) and emitter current IE vs VEB (input).',
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
  // ── Passive components ─────────────────────────────────────────────────
  .resistor('r_e', 1_000,   5,  'c')
  .resistor('r_c', 4_700,  10,  'c')
  .capacitor('c_in', 10,   15,  'c')
  .led('led_out', 'yellow', 20, 'c')

  // ── Ammeter wires (orange, in series on collector path) ────────────────
  .wire('w_amm_in',  'orange',
    { board: 'bb', rail: 'vcc_top', col: 5 },
    { board: 'bb', col: 8, row: 'd' })
  .wire('w_amm_out', 'orange',
    { board: 'bb', col: 8, row: 'c' },
    { component: 'r_c', end: 'p1' })

  // ── Power wires ────────────────────────────────────────────────────────
  // R_E: emitter bias — GND side of R_E
  .wireGnd('w_re_gnd', { component: 'r_e', end: 'p2' }, 7)

  // R_C collector path: ammeter out → R_C already wired above via w_amm_out
  // R_C → LED anode
  .wire('w_rc_led', 'green',
    { component: 'r_c', end: 'p2' },
    { led: 'led_out', end: 'anode' })

  // C_in: input coupling cap — left lead to R_E input node
  .wire('w_cin_re', 'blue',
    { component: 'r_e', end: 'p1' },
    { board: 'bb', col: 15, row: 'c' })

  // LED cathode → GND
  .wireLedToGnd('w_led_gnd', 'led_out', 21)

  // ── Steps ──────────────────────────────────────────────────────────────
  // Step 0
  .step('Place the breadboard',
    'The 830-point solderless breadboard is your build surface. Red rails = VCC (+9 V), ' +
    'blue rails = GND (0 V). The centre gap isolates rows a–e from f–j.')
    .show('bb')

  // Step 1
  .step('Connect the DC power supply',
    'Place the variable DC supply beside the breadboard. Red wire from supply (+) to VCC rail at ' +
    'col 5. Black wire from supply (−) to GND rail at col 5. Set supply to 0 V initially.')
    .show('psu')

  // Step 2
  .step('Connect the ammeter (DMM) in series',
    'Set the DMM to DC mA mode. Orange wire 1: VCC rail (col 5) → col 8 row d (ammeter input). ' +
    'Orange wire 2: col 8 row c → R_C input (col 10). All collector current flows through the ' +
    'ammeter — this directly measures I_C.')
    .show('dmm', 'w_amm_in', 'w_amm_out')

  // Step 3
  .step('Place the emitter resistor R_E (1 kΩ)',
    'Insert R_E (1 kΩ) at col 5–8, row c. Colour bands: Brown–Black–Red–Gold. ' +
    'This sets the emitter current: I_E ≈ V_E / R_E. The right lead connects to GND rail.')
    .show('r_e', 'w_re_gnd')
    .highlight('r_e')

  // Step 4
  .step('Place the collector resistor R_C (4.7 kΩ)',
    'Insert R_C (4.7 kΩ) at col 10–13, row c. Colour bands: Yellow–Violet–Red–Gold. ' +
    'The collector load converts I_C into output voltage: V_C = V_CC − I_C × R_C.')
    .show('r_c')
    .highlight('r_c')

  // Step 5
  .step('Place the input coupling capacitor C_in (10 µF)',
    'Insert C_in (10 µF electrolytic) at col 15, row c. Positive lead faces the input signal; ' +
    'it blocks DC from the signal source while passing AC into the emitter node. ' +
    'Wire from R_E input node (col 5) to C_in positive lead (col 15).')
    .show('c_in', 'w_cin_re')
    .highlight('c_in')

  // Step 6
  .step('Place the output indicator LED (yellow)',
    'Insert the yellow LED at col 20–21, row c. Anode (longer lead) at col 20, cathode at col 21. ' +
    'It sits on the collector output node and visualises I_C — brighter = higher collector current.')
    .show('led_out', 'w_led_gnd')
    .highlight('led_out')

  // Step 7
  .step('Wire R_C to LED anode',
    'Green wire: R_C right lead (col 13) → LED anode (col 20). ' +
    'The collector output path is now: VCC → ammeter → R_C → LED → GND. ' +
    'Also verify the base is connected to GND (common-base condition).')
    .show('w_rc_led')

  // Step 8
  .step('Power on and measure I_C vs V_CB',
    'Set V_CC = 9 V. Vary V_EB from 0 to 0.8 V in 0.1 V steps by adjusting the PSU. ' +
    'Record I_C (DMM) at each step. For output characteristics, fix V_EB = 0.65 V and ' +
    'sweep V_CB from 0 to 9 V. The LED glows proportional to I_C.')
    .show()
    .power({ Vcc: 1 })
    .supply(9.0)
    .reading('psu', '9.00 V')
    .reading('dmm', 'IC = 2.10 mA')
    .glow('led_out', 0.45)

  .build();
