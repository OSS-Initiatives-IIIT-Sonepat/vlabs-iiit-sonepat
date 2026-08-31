import { type LabContent } from '@/labs/lab-content.types';

export const FullWaveRectifierContent: LabContent = {
  id: 'full-wave-rectifier',
  title: 'Full-Wave Rectifier',
  circuitId: 'full-wave-rectifier',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A full-wave rectifier converts both positive and negative half-cycles of AC into pulsating DC, doubling the output frequency compared to a half-wave rectifier. Two configurations exist: the centre-tap full-wave rectifier (using two diodes and a centre-tapped transformer) and the bridge rectifier (using four diodes and any transformer secondary).',
        'In the bridge configuration, four diodes (D1–D4) are arranged in a bridge. During the positive AC half-cycle, D1 and D3 conduct; during the negative half-cycle, D2 and D4 conduct. In both cases, current through the load resistor flows in the same direction, producing a full-wave rectified output. The output frequency is twice the input frequency: f_out = 2 × f_in = 100 Hz.',
        'The average DC output voltage of an ideal full-wave bridge rectifier is V_avg = 2V_m/π ≈ 0.637V_m. With two diode drops (each ≈ 0.7 V for silicon), the practical value is V_avg = (2V_m − 1.4)/π. The ripple factor γ = √((π²/8) − 1) ≈ 0.482, which is much better than the half-wave value of 1.21.',
        'A filter capacitor in parallel with the load reduces ripple to γ_C ≈ 1/(2√3 × f × R_L × C). Increasing capacitance or load resistance reduces ripple. A larger capacitor also increases the peak diode current during charging, so practical designs balance ripple reduction against diode current stress.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point', quantity: '1' },
        { name: '1N4007 Rectifier Diode', specification: 'PIV 1000 V, I_F 1 A', quantity: '4' },
        { name: 'Step-down Transformer', specification: '230 V / 9 V, 500 mA', quantity: '1' },
        { name: 'Load Resistor R_L', specification: '1 kΩ, ¼ W', quantity: '1' },
        { name: 'Filter Capacitor', specification: '47 µF / 25 V electrolytic', quantity: '1' },
        { name: 'CRO / Oscilloscope', specification: '20 MHz dual channel', quantity: '1' },
        { name: 'Digital Multimeter', specification: 'AC/DC voltage measurement', quantity: '1' },
        { name: 'Connecting Wires', specification: 'M-M jumper wires', quantity: '1 set' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Build the bridge rectifier (no filter).',
          circuitStepIndex: 3,
          body: 'Arrange four 1N4007 diodes in a bridge on the breadboard. Label the four corners: AC1, AC2 (transformer inputs), DC+ (cathodes of D1, D2 meeting), DC− (anodes of D3, D4 meeting). Connect the AC transformer secondary across AC1 and AC2. Connect R_L = 1 kΩ between DC+ and DC−. Do not connect filter capacitor yet.',
        },
        {
          label: 'Observe the rectified output on CRO.',
          circuitStepIndex: 7,
          body: 'Connect CRO Channel 1 across the transformer secondary (AC input). Connect Channel 2 across R_L (DC output). Power on. Channel 1 shows a full sine wave. Channel 2 should show the full-wave rectified output — a series of positive half-sinusoids at 100 Hz (twice the 50 Hz input). Measure V_m (peak) and V_avg (DC) with the DMM.',
        },
        {
          label: 'Verify output frequency is 100 Hz.',
          circuitStepIndex: 7,
          body: 'On the CRO, set the timebase to 2 ms/div. Count the period of the rectified output. With a 50 Hz input, the rectified output period = 10 ms / 2 = 5 ms, confirming f_out = 100 Hz. Compare with Channel 1 (50 Hz, period = 20 ms). Record the ratio.',
        },
        {
          label: 'Add filter capacitor and observe smoothing.',
          circuitStepIndex: 7,
          body: 'Connect the 47 µF electrolytic capacitor in parallel with R_L (positive lead to DC+, negative to DC−). Observe Channel 2 on the CRO — the waveform should smooth out significantly. The residual ripple rides on top of the DC level. Measure V_avg and V_ripple_pp with the CRO and calculate the ripple factor.',
        },
        {
          label: 'Compare half-wave and full-wave rectification.',
          circuitStepIndex: 7,
          body: 'Remove two adjacent diodes from the bridge to convert it to a half-wave rectifier. Observe the output on the CRO — only every other half-cycle appears, and ripple doubles. Record V_avg and ripple for the half-wave configuration and tabulate the comparison. Restore all four diodes when done.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Transformer secondary: 9 V RMS, 50 Hz. V_m = √2 × 9 ≈ 12.73 V.',
        'Theoretical V_avg (full-wave, two drops) = (2 × 12.73 − 1.4) / π ≈ 7.65 V.',
        'Full-wave output frequency: 100 Hz (period = 5 ms).',
        'Ripple factor without filter (full-wave): 0.482.',
      ],
      table: {
        headers: ['Configuration', 'V_avg (V)', 'Ripple Factor γ', 'Output Frequency'],
        rows: [
          ['Half-wave, no filter',  '3.8', '1.21', '50 Hz'],
          ['Full-wave, no filter',  '7.6', '0.48', '100 Hz'],
          ['Full-wave, 47µF filter','8.2', '0.08', '100 Hz'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The full-wave bridge rectifier successfully converted both half-cycles of the 50 Hz AC input into pulsating DC at 100 Hz. The measured average output voltage agreed closely with the theoretical value, confirming the double-diode-drop deduction.',
        'Adding a 47 µF filter capacitor reduced the ripple factor from 0.48 to approximately 0.08, demonstrating effective smoothing. The full-wave configuration produced a higher average output and lower ripple factor than the half-wave rectifier, explaining why it is universally preferred in practical power supplies.',
        'This experiment bridges the gap between diode theory and power supply design. The bridge configuration, requiring no centre-tapped transformer, is the industry standard for mains-frequency rectification in virtually all electronic equipment.',
      ],
    },
  ],
};
