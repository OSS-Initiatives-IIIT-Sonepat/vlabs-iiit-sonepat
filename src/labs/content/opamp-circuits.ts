import { type LabContent } from '@/labs/lab-content.types';

export const OpampCircuitsContent: LabContent = {
  id: 'opamp-circuits',
  title: 'Inverting and Non-Inverting Op-Amp Amplifiers (LM741)',
  circuitId: 'opamp-circuits',

  sections: [
    // ── THEORY ─────────────────────────────────────────────────────────────
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'An **operational amplifier (op-amp)** is a high-gain differential amplifier IC. '
        + 'The LM741 has an open-loop voltage gain $A_{OL} \\approx 200{,}000$ (106 dB), input impedance '
        + '$Z_{in} > 2\\,\\text{M}\\Omega$, and output impedance $Z_{out} < 75\\,\\Omega$ under closed-loop conditions. '
        + 'When negative feedback is applied, two **virtual ground rules** hold: '
        + '(1) $V_+ = V_-$ (the differential input is forced to zero), and '
        + '(2) $I_+ = I_- = 0$ (no current flows into the input terminals).',

        'For the **inverting amplifier**, the signal enters the inverting (−) input through $R_{in}$; '
        + 'the non-inverting (+) input is grounded. Virtual ground forces $V_- = 0$, so all of $V_{in}$ '
        + 'drops across $R_{in}$ setting $I_{in} = V_{in}/R_{in}$. This current must flow through $R_f$ '
        + '(since $I_- = 0$), giving $V_{out} = -I_{in} R_f$:'
        + '$$A_v = \\frac{V_{out}}{V_{in}} = -\\frac{R_f}{R_{in}} = -\\frac{100\\,\\text{k}}{10\\,\\text{k}} = -10$$'
        + 'The negative sign indicates **180° phase inversion**. Input impedance equals $R_{in} = 10\\,\\text{k}\\Omega$.',

        'For the **non-inverting amplifier**, $V_{in}$ connects directly to $V_+$. Virtual ground forces '
        + '$V_- = V_{in}$, so the voltage divider $R_1$–$R_f$ must produce $V_{in}$ at the inverting input:'
        + '$$V_{in} = V_{out}\\frac{R_1}{R_1 + R_f} \\implies A_v = 1 + \\frac{R_f}{R_1} = 1 + \\frac{100\\,\\text{k}}{10\\,\\text{k}} = +11$$'
        + 'No phase inversion occurs. Input impedance is $Z_{in} \\approx A_{OL} \\times Z_{diff}$ — essentially infinite.',

        '**Practical limitations**: the LM741 has a unity-gain bandwidth (GBW) of $\\approx 1\\,\\text{MHz}$, '
        + 'so the bandwidth at gain 10 is $f_{-3\\text{dB}} \\approx 1\\,\\text{MHz}/10 = 100\\,\\text{kHz}$ (inverting) '
        + 'and $1\\,\\text{MHz}/11 \\approx 91\\,\\text{kHz}$ (non-inverting). '
        + 'The output will be clipped if $|V_{out}|$ exceeds $V_{CC} - 1.5\\,\\text{V} \\approx \\pm 10.5\\,\\text{V}$ '
        + '(rail-to-rail headroom). The slew rate ($0.5\\,\\text{V}/\\mu\\text{s}$) limits large-signal bandwidth.',
      ],
    },

    // ── APPARATUS ───────────────────────────────────────────────────────────
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',          specification: '830 tie-point, solderless',                          quantity: '1' },
        { name: 'LM741 Op-Amp',        specification: 'DIP-8, $A_{OL}\\approx 200{,}000$, GBW = 1 MHz',    quantity: '2' },
        { name: 'R_in Inverting',      specification: '$10\\,\\text{k}\\Omega$, ¼ W',                      quantity: '1' },
        { name: 'R_f1 Feedback (inv)', specification: '$100\\,\\text{k}\\Omega$, ¼ W',                     quantity: '1' },
        { name: 'R1_ni Non-inv',       specification: '$10\\,\\text{k}\\Omega$, ¼ W',                      quantity: '1' },
        { name: 'R_f2 Feedback (NI)',  specification: '$100\\,\\text{k}\\Omega$, ¼ W',                     quantity: '1' },
        { name: 'Dual DC Supply',      specification: '±12 V regulated, 500 mA',                           quantity: '1' },
        { name: 'Digital Multimeter',  specification: 'DC voltage, 20 V range',                            quantity: '2' },
        { name: 'LEDs',                specification: 'Red (inverting) and green (non-inverting), 5 mm',   quantity: '1 each' },
        { name: 'Signal Generator',    specification: 'DC–1 MHz, adjustable amplitude',                    quantity: '1' },
        { name: 'Jumper wires',        specification: 'Assorted colours',                                  quantity: '1 set' },
      ],
    },

    // ── PROCEDURE ────────────────────────────────────────────────────────────
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Place the breadboard and connect the dual ±12 V supply.',
          circuitStepIndex: 1,
          body: 'Place the breadboard. Connect the dual supply: +12 V → VCC rail at col 3, '
              + '−12 V → GND rail at col 3 (this becomes V− bus), and the supply mid-point (signal GND, 0 V) '
              + 'to a separate node. Verify ±12 V with DMM before inserting any ICs.',
        },
        {
          label: 'Connect the DMM to measure op-amp output voltage.',
          circuitStepIndex: 2,
          body: 'Set DMM to **DC Voltage, 20 V range**. '
              + 'Connect DMM (+) probe to col 5 row c (op-amp output) and (−) probe to signal GND. '
              + 'The DMM will display $V_{out}$ for both configurations.',
        },
        {
          label: 'Assemble the inverting amplifier (Phase A).',
          circuitStepIndex: 3,
          body: 'Insert the LM741 op-amp (DIP-8) straddling the centre gap, pin 1 at col 5. '
              + 'Insert R_in (10 kΩ) at col 3–6, row c; wire signal input (blue) to R_in left. '
              + 'Insert R_f1 (100 kΩ) at col 8–11, row c; wire R_in right → R_f1 left (orange). '
              + 'Wire R_f1 right → LED_inv anode (green); LED_inv cathode → GND (black). '
              + 'Tie non-inverting input (pin 3, col 7) to signal GND. '
              + 'Connect V+ (pin 7) to +12 V rail, V− (pin 4) to −12 V rail.',
        },
        {
          label: 'Measure the inverting amplifier voltage gain.',
          circuitStepIndex: 4,
          body: 'Apply $V_{in} = +0.5\\,\\text{V}$ DC to R_in input. Read $V_{out}$ on DMM. '
              + 'Repeat for $V_{in} = 0, \\pm 0.2, \\pm 0.5, \\pm 0.8, \\pm 1.0\\,\\text{V}$. '
              + 'Calculate $A_v = V_{out}/V_{in}$ at each step. '
              + 'Verify $A_v \\approx -10$ and record any saturation at $|V_{out}| > 10.5\\,\\text{V}$.',
        },
        {
          label: 'Assemble the non-inverting amplifier (Phase B).',
          circuitStepIndex: 5,
          body: 'Insert the second LM741 in the Phase B area (col 19 area). '
              + 'Insert R1_ni (10 kΩ) at col 17–20, row c; wire bottom → GND (black). '
              + 'Insert R_f2 (100 kΩ) at col 22–25, row c. '
              + 'Wire: op-amp output → R_f2 right → LED_ni anode (green); LED_ni cathode → GND. '
              + 'Wire feedback: op-amp output → R_f2 → R1_ni top (inverting input). '
              + 'Signal input goes to op-amp non-inverting (+) input (col 17). '
              + 'Connect V+/V− supply rails.',
        },
        {
          label: 'Measure the non-inverting amplifier gain and compare.',
          circuitStepIndex: 6,
          body: 'Apply $V_{in} = +0.5\\,\\text{V}$ to the non-inverting input. Read $V_{out}$. '
              + 'Repeat for $V_{in} = 0, 0.2, 0.5, 0.8, 1.0\\,\\text{V}$. '
              + 'Verify $A_v \\approx +11$ and that no phase inversion occurs. '
              + 'Note: actual measured gain is typically 9.85–9.98 (inverting) and 10.8–10.95 (non-inv) '
              + 'due to finite $A_{OL}$, input bias currents, and resistor tolerances.',
        },
      ],
    },

    // ── OBSERVATIONS ────────────────────────────────────────────────────────
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Op-amp: LM741. $V_{CC} = \\pm 12\\,\\text{V}$. '
        + '$R_{in} = 10\\,\\text{k}\\Omega$, $R_{f1} = 100\\,\\text{k}\\Omega$ (theoretical $A_v = -10$). '
        + '$R_{1,ni} = 10\\,\\text{k}\\Omega$, $R_{f2} = 100\\,\\text{k}\\Omega$ (theoretical $A_v = +11$).',
        'Both op-amps powered from ±12 V. Output measured with DMM. Signal: DC.',
      ],
      table: {
        headers: ['$V_{in}$ (V)', '$V_{out}$ Inv (V)', '$A_v$ Inv', '$V_{out}$ NI (V)', '$A_v$ NI'],
        rows: [
          ['-1.0', '+9.97', '-9.97', '-11.0', '(clipped)'],
          ['-0.5', '+4.98', '-9.96', '-5.48',  '-10.96'],
          ['-0.2', '+1.99', '-9.95', '-2.19',  '-10.95'],
          [ '0.0', '0.00',  '—',    '0.00',   '—'],
          [ '0.2', '-1.99', '-9.95', '2.19',   '+10.95'],
          [ '0.5', '-4.98', '-9.96', '5.48',   '+10.96'],
          [ '1.0', '-9.97', '-9.97', '10.90',  '+10.90'],
        ],
      },
    },

    // ── CONCLUSION ──────────────────────────────────────────────────────────
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The inverting and non-inverting op-amp amplifier circuits were successfully assembled and '
        + 'characterised. The inverting amplifier produced $A_v \\approx -9.96$, and the non-inverting '
        + 'amplifier produced $A_v \\approx +10.96$, compared with theoretical values of −10 and +11 '
        + 'respectively. The small discrepancy (< 0.5 %) arises from finite open-loop gain $A_{OL}$: '
        + 'the actual closed-loop gain is $A_{CL} = A_{OL}/(1 + A_{OL}/|A_{ideal}|)$.',

        'Phase inversion was clearly demonstrated in the inverting configuration — a positive DC input '
        + 'produced a negative output — while the non-inverting configuration preserved signal polarity. '
        + 'Output clipping occurred at $|V_{out}| \\approx 10.5\\,\\text{V}$ (supply rails minus headroom), '
        + 'confirming the LM741 is not a rail-to-rail device.',

        'These experiments establish the two fundamental op-amp feedback topologies that underpin '
        + 'virtually all linear analog circuit design: instrumentation amplifiers, active filters, '
        + 'integrators, differentiators, and summing amplifiers all use the virtual-ground principle '
        + 'demonstrated here. Replacing LM741 with a modern rail-to-rail op-amp (e.g. LM358, TL071) '
        + 'extends the usable output swing and bandwidth-gain product.',
      ],
    },
  ],
};
