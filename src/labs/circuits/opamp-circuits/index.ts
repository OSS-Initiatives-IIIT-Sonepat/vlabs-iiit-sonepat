import { CB } from '@/labs/builder';

// ── Op-Amp Amplifier Circuits (LM741) ────────────────────────────────────
//
// Two op-amp configurations on the same breadboard:
//
// PHASE A — Inverting Amplifier (cols 3–14):
//   R_in (10 kΩ) at col 3, row c  — input resistor
//   R_f1 (100 kΩ) at col 8, row c — feedback resistor
//   LED_inv (red) at col 14, row c — output indicator
//   Av = -Rf/Rin = -100k/10k = -10
//
// PHASE B — Non-Inverting Amplifier (cols 17–28):
//   R1_ni (10 kΩ) at col 17, row c  — gain-set resistor to GND
//   R_f2  (100 kΩ) at col 22, row c — feedback resistor
//   LED_ni (green) at col 27, row c — output indicator
//   Av = 1 + Rf/R1 = 1 + 100k/10k = +11

export const OpampCircuitsCircuit = new CB(
  'opamp-circuits',
  'Inverting and Non-Inverting Op-Amp Amplifiers (LM741)',
  'Build and characterise inverting (Av=−10) and non-inverting (Av=+11) amplifier circuits using the LM741 op-amp.',
)
  .board()
  .psu('psu', [
    { board: 'bb', rail: 'vcc_top', col: 3 },
    { board: 'bb', rail: 'gnd_top', col: 3 },
  ])
  .dmm('dmm', [
    { board: 'bb', col: 5, row: 'c' },
    { board: 'bb', col: 5, row: 'd' },
  ])

  // ── PHASE A: Inverting Amplifier components ───────────────────────────
  .resistor('r_in',   10_000,  3, 'c')   // input resistor
  .resistor('r_f1',  100_000,  8, 'c')   // feedback resistor
  .led('led_inv', 'red',      14, 'c')   // output indicator

  // Inverting amp wires
  .wire('w_rin_in', 'blue',
    { board: 'bb', col: 3, row: 'c' },
    { component: 'r_in', end: 'p1' })
  .wire('w_rin_inv', 'orange',
    { component: 'r_in', end: 'p2' },
    { component: 'r_f1', end: 'p1' })
  .wire('w_rf1_out', 'green',
    { component: 'r_f1', end: 'p2' },
    { led: 'led_inv', end: 'anode' })
  .wireLedToGnd('w_ledinv_gnd', 'led_inv', 15)
  // Non-inverting input tied to GND (virtual ground concept)
  .wireGnd('w_ninv_gnd', { board: 'bb', col: 7, row: 'c' }, 7)

  // ── PHASE B: Non-Inverting Amplifier components ───────────────────────
  .resistor('r1_ni',  10_000, 17, 'c')   // R1 (ground-side gain resistor)
  .resistor('r_f2',  100_000, 22, 'c')   // feedback resistor
  .led('led_ni', 'green',    27, 'c')    // output indicator

  // Non-inverting amp wires
  .wire('w_sig_ni', 'blue',
    { board: 'bb', col: 17, row: 'c' },
    { component: 'r1_ni', end: 'p1' })
  .wireGnd('w_r1ni_gnd', { component: 'r1_ni', end: 'p2' }, 20)
  .wire('w_rf2_out', 'green',
    { component: 'r_f2', end: 'p2' },
    { led: 'led_ni', end: 'anode' })
  .wireLedToGnd('w_ledni_gnd', 'led_ni', 28)
  // Feedback from output back to inverting input
  .wire('w_fb_ni', 'orange',
    { led: 'led_ni', end: 'anode' },
    { component: 'r_f2', end: 'p1' })

  // ── Steps ─────────────────────────────────────────────────────────────
  // Step 0
  .step('Place the breadboard',
    'The 830-point solderless breadboard is your build surface. '
    + 'Red rails = +V (±12 V positive rail), blue rails = GND or negative rail. '
    + 'Phase A (inverting, cols 3–14) and Phase B (non-inverting, cols 17–28) share the same board.')
    .show('bb')

  // Step 1
  .step('Connect the dual-supply power supply (±12 V)',
    'The LM741 requires a dual (split) supply. '
    + 'Connect PSU (+12 V) to VCC rail at col 3 (red wire). '
    + 'Connect PSU (−12 V) to GND rail at col 3 (blue wire) — this rail is V−. '
    + 'Connect signal GND (0 V) to a separate row for reference. '
    + 'Verify ±12 V with DMM before proceeding.')
    .show('psu')

  // Step 2
  .step('Connect the DMM to measure output voltage',
    'Set DMM to DC Voltage, 20 V range. '
    + 'Connect DMM (+) probe to col 5 row c (output node) and DMM (−) probe to signal GND. '
    + 'This will read the op-amp output voltage $V_{out}$ directly.')
    .show('dmm')

  // Step 3
  .step('Assemble Phase A — Inverting Amplifier',
    'Insert R_in (10 kΩ) at col 3–6, row c. '
    + 'Insert R_f1 (100 kΩ) at col 8–11, row c. '
    + 'Wire signal input (blue) to R_in left lead (col 3). '
    + 'Wire R_in right → R_f1 left (orange — this is the op-amp virtual-ground inverting input). '
    + 'Wire R_f1 right → LED_inv anode (green). '
    + 'Wire LED_inv cathode → GND (black). '
    + 'Tie the non-inverting input (col 7) to GND — this is the virtual ground node. '
    + 'Gain: $A_v = -R_f/R_{in} = -100/10 = -10$.')
    .show('r_in', 'r_f1', 'led_inv',
          'w_rin_in', 'w_rin_inv', 'w_rf1_out', 'w_ledinv_gnd', 'w_ninv_gnd')
    .highlight('r_in')

  // Step 4
  .step('Measure inverting amplifier gain',
    'Apply $V_{in} = +0.5\\,\\text{V}$ DC to the input (col 3 row c). '
    + 'Read $V_{out}$ on the DMM. '
    + 'Expected: $V_{out} = -10 \\times 0.5 = -5.0\\,\\text{V}$ (inverted, 10× larger). '
    + 'The LED lights at reduced brightness (limited by current through R_f1). '
    + 'Vary $V_{in}$ from −0.5 V to +0.5 V and verify the linear $V_{out} = -10 V_{in}$ relationship.')
    .show()
    .power({ Vcc: 1 })
    .supply(12.0)
    .reading('psu', '±12.0 V')
    .reading('dmm', 'Vout = −4.97 V')
    .glow('led_inv', 0.45)

  // Step 5
  .step('Assemble Phase B — Non-Inverting Amplifier',
    'Insert R1_ni (10 kΩ) at col 17–20, row c. '
    + 'Wire R1_ni bottom → GND (black). '
    + 'Insert R_f2 (100 kΩ) at col 22–25, row c. '
    + 'Wire feedback: LED_ni anode → R_f2 right (orange — output fed back to inverting input). '
    + 'Wire R_f2 left → R1_ni top (inverting input node). '
    + 'Wire R_f2 right → LED_ni anode (green). '
    + 'Wire LED_ni cathode → GND (black). '
    + 'Signal input goes directly to the non-inverting (+) input (col 17). '
    + 'Gain: $A_v = 1 + R_f/R_1 = 1 + 100/10 = +11$.')
    .show('r1_ni', 'r_f2', 'led_ni',
          'w_sig_ni', 'w_r1ni_gnd', 'w_rf2_out', 'w_ledni_gnd', 'w_fb_ni')
    .highlight('r1_ni')

  // Step 6
  .step('Measure non-inverting amplifier gain',
    'Apply $V_{in} = +0.5\\,\\text{V}$ DC to the non-inverting input (col 17). '
    + 'Read $V_{out}$ on DMM at the output node (LED_ni anode). '
    + 'Expected: $V_{out} = +11 \\times 0.5 = +5.5\\,\\text{V}$ (same polarity, 11× larger). '
    + 'Compare LED_ni brightness with LED_inv — both should be similar since $|V_{out}|$ is similar. '
    + 'Vary $V_{in}$ from 0 to +1.0 V and verify the linear relationship.')
    .show()
    .power({ Vcc: 1 })
    .supply(12.0)
    .reading('psu', '±12.0 V')
    .reading('dmm', 'Vout = +5.48 V')
    .glow('led_inv', 0.45)
    .glow('led_ni', 0.50)

  .build();
