import { type LabContent } from '@/labs/lab-content.types';

export const PnJunctionDiodeContent: LabContent = {
  id: 'pn-junction-diode',
  title: 'V-I Characteristics of PN Junction Diode',
  circuitId: 'pn-junction-diode',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A PN junction diode is formed by joining a P-type semiconductor (excess holes) with an N-type semiconductor (excess electrons). At the junction, electrons and holes recombine to form a depletion region with a built-in potential barrier of approximately 0.6–0.7 V for silicon.',
        'In forward bias, the external positive voltage reduces the depletion barrier. When the applied voltage exceeds the threshold (V_th ≈ 0.6–0.7 V for silicon), current rises exponentially: I = I_s(e^(qV/nkT) − 1). In reverse bias, only a tiny leakage current (I_s, the reverse saturation current) flows until the breakdown voltage is reached.',
        'The V-I characteristic curve has three distinct regions: forward bias (exponential rise beyond V_th), reverse bias (near-zero leakage current), and reverse breakdown (sharp rise in current at V_BR). The 1N4148 silicon diode has V_th ≈ 0.65 V, reverse leakage < 25 nA, and V_BR = 75 V.',
        'The dynamic resistance r_d = dV/dI at any operating point on the forward characteristic equals nkT/qI, which decreases as current increases — meaning the diode becomes a better conductor as current rises. At room temperature, kT/q ≈ 26 mV, so at I = 1 mA, r_d ≈ 26 Ω.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point', quantity: '1' },
        { name: '1N4148 Silicon Diode', specification: 'V_BR = 75 V, I_F = 200 mA', quantity: '1' },
        { name: 'Resistor 470 Ω', specification: '¼ W, series current-limiter', quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '0–12 V variable, 1 A', quantity: '1' },
        { name: 'Digital Multimeter (×2)', specification: 'One for voltage, one for current', quantity: '2' },
        { name: 'Connecting Wires', specification: 'M-M jumper wires', quantity: '1 set' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Build the forward-bias circuit.',
          circuitStepIndex: 5,
          body: 'Connect the power supply positive terminal → 470 Ω series resistor → diode anode. Connect diode cathode → power supply negative terminal (GND). Place Voltmeter 1 across the diode (anode to cathode). Place Ammeter in series (between resistor and anode). Set supply to 0 V.',
        },
        {
          label: 'Record forward V-I data points.',
          circuitStepIndex: 6,
          body: 'Slowly increase the supply voltage in steps of 0.1 V from 0 to 1.0 V. At each step, record the diode voltage V_D (voltmeter reading) and current I (ammeter reading). Note that current remains near zero until V_D ≈ 0.5 V, then rises sharply. Continue until current reaches ~20 mA (or supply limit). Record at least 15 data points.',
        },
        {
          label: 'Plot the forward characteristic.',
          circuitStepIndex: 6,
          body: 'On graph paper, plot V_D (x-axis, 0–1.0 V) versus I (y-axis, 0–25 mA). The curve should show a knee at approximately 0.6–0.65 V and then a steep near-linear rise. Draw a tangent to the steep region and calculate the dynamic resistance: r_d = ΔV/ΔI. Compare with the theoretical r_d = 26/I_mA (in ohms).',
        },
        {
          label: 'Rebuild for reverse-bias measurement.',
          circuitStepIndex: 6,
          body: 'Reverse the diode in the circuit — connect the cathode to the supply positive terminal and the anode to GND through the resistor. Place the voltmeter across the diode. Increase supply from 0 to 10 V in 1 V steps. Record the tiny leakage current (µA range — switch the ammeter to µA mode). Note that current stays essentially flat until breakdown voltage (not reached with 1N4148 at 10 V).',
        },
        {
          label: 'Plot reverse characteristic and combine.',
          circuitStepIndex: 6,
          body: 'Plot the reverse-bias region on the same graph with the x-axis extended to −10 V. The reverse current should be flat near zero (< 1 µA). Draw the complete V-I characteristic combining forward and reverse data. Identify: threshold voltage V_th, forward operating region, and reverse leakage region.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Diode: 1N4148. Series resistor: 470 Ω. Supply variable from 0–10 V.',
        'Threshold voltage V_th (forward): approximately 0.62–0.65 V.',
        'Maximum forward current tested: ~15 mA at V_supply = 8 V.',
        'Reverse leakage current at −10 V: < 1 µA (below DMM resolution).',
      ],
      table: {
        headers: ['V_supply (V)', 'V_D (V)', 'I_D (mA)', 'Region'],
        rows: [
          [0.0, 0.00, 0.00, 'Cut-off'],
          [0.5, 0.49, 0.00, 'Cut-off'],
          [1.0, 0.62, 0.80, 'Forward active'],
          [2.0, 0.66, 2.85, 'Forward active'],
          [5.0, 0.69, 9.17, 'Forward active'],
          [8.0, 0.71, 15.5, 'Forward active'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The V-I characteristics of the 1N4148 PN junction diode were successfully plotted for both forward and reverse bias conditions. The forward characteristic exhibited the expected exponential rise beyond the threshold voltage of approximately 0.65 V, confirming the Shockley diode equation.',
        'The dynamic resistance calculated from the slope of the forward characteristic was consistent with the theoretical value r_d = nkT/qI. In reverse bias, the leakage current was below the multimeter resolution, confirming the blocking behaviour of a reverse-biased junction.',
        'This experiment establishes a clear understanding of diode non-linearity, the threshold voltage concept, and the difference between ideal and real diode behaviour — fundamentals essential for rectifier, clipping, and clamping circuit design.',
      ],
    },
  ],
};
