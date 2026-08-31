import { type LabContent } from '@/labs/lab-content.types';

export const NortonTheoremContent: LabContent = {
  id: 'norton-theorem',
  title: "Norton's Theorem",
  circuitId: 'norton-theorem',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        "Norton's Theorem states that any linear two-terminal network can be replaced by an equivalent circuit consisting of a single current source I_N (Norton current) in parallel with a single resistance R_N (Norton resistance). I_N equals the short-circuit current flowing between the output terminals when they are connected directly together. R_N equals the Thevenin resistance R_th — the equivalent resistance seen at the terminals with all independent sources killed.",
        "Norton's and Thevenin's theorems are dual representations of the same equivalent circuit. They are related by a simple source transformation: V_th = I_N × R_N and R_th = R_N. Any Thevenin equivalent can be converted to a Norton equivalent and vice versa. The choice between them depends on which form is more convenient for the analysis at hand.",
        'To find I_N experimentally: short-circuit the output terminals A-B with a low-resistance ammeter and measure the short-circuit current I_sc = I_N. To find R_N: remove the short-circuit, kill all independent sources, and measure resistance at A-B (same as R_th). With I_N and R_N known, the Norton equivalent is fully characterised.',
        'In this experiment the same two-terminal resistor network used for the Thevenin experiment is analysed using Norton\'s theorem. I_N and R_N are measured experimentally, the Norton equivalent is constructed, and load voltages are compared with those from the original network to verify the theorem. The relationship I_N = V_th / R_th is also confirmed.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'DC Regulated Power Supply', specification: '0–15 V, 1 A', quantity: '1' },
        { name: 'Resistor R1', specification: '1 kΩ, ±1%, 0.25 W', quantity: '1' },
        { name: 'Resistor R2', specification: '2.2 kΩ, ±1%, 0.25 W', quantity: '1' },
        { name: 'Resistor R_N (for Norton equivalent)', specification: '688 Ω (nearest: 680 Ω), 0.25 W', quantity: '1' },
        { name: 'Resistor R_L (Load)', specification: '3.3 kΩ, ±1%, 0.25 W', quantity: '1' },
        { name: 'Digital Multimeter', specification: 'Voltage, current & resistance measurement', quantity: '2' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '15' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Build the original network',
          body: 'Connect the same voltage-divider network as in the Thevenin experiment: R1 (1 kΩ) in series with R2 (2.2 kΩ) across a 9 V supply, with output terminals A (between R1 and R2) and B (ground). Verify with a voltmeter that the open-circuit voltage V_oc ≈ 6.19 V, consistent with the Thevenin result.',
          circuitStepIndex: 6,
        },
        {
          label: 'Measure I_N (short-circuit current)',
          body: 'Set the ammeter to the DC milliamp range. Connect the ammeter directly between terminals A and B (effectively short-circuiting the output). The ammeter reading is the short-circuit current I_sc = I_N. For this network, I_N = V_s / R1 = 9 V / 1 kΩ = 9 mA (R2 is bypassed by the short). Record the measured I_N.',
          circuitStepIndex: 8,
        },
        {
          label: 'Measure R_N (Norton resistance)',
          body: 'Remove the ammeter (open the short). Switch off and disconnect the supply; replace it with a short-circuit jumper to kill the voltage source. Measure the resistance between A and B using the ohmmeter. With the supply shorted, R1 and R2 are in parallel: R_N = R1 ‖ R2 ≈ 688 Ω. Record the measured value.',
          circuitStepIndex: 8,
        },
        {
          label: 'Verify I_N = V_th / R_th relationship',
          body: 'Using the previously measured V_th (≈ 6.15 V) from the Thevenin experiment and the measured R_N (≈ 695 Ω), compute I_N_calc = V_th / R_N. Compare this calculated value with the directly measured I_N. They should agree within 1%, confirming the duality relationship between Thevenin and Norton equivalents.',
          circuitStepIndex: 8,
        },
        {
          label: 'Build Norton equivalent and verify load voltage',
          body: 'Construct the Norton equivalent circuit: a current source set to I_N in parallel with resistor R_N. Since a practical bench current source may not be available, derive it from the verified Thevenin equivalent by source transformation. Connect load R_L (3.3 kΩ) across the Norton equivalent output and measure V_L. Compare this with the load voltage from the original network and the Thevenin equivalent, confirming all three give the same result.',
          circuitStepIndex: 8,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        "Norton parameters and load voltage comparison between the original network and the Norton equivalent circuit are tabulated below.",
      ],
      table: {
        headers: ['Parameter', 'Theoretical Value', 'Measured Value', 'Error (%)'],
        rows: [
          ['I_N (mA)', 9.00, 8.93, 0.78],
          ['R_N (kΩ)', 0.688, 0.695, 1.02],
          ['I_N from V_th/R_N (mA)', 8.99, 8.85, 1.56],
          ['V_L (Original circuit, R_L=3.3kΩ) (V)', 5.12, 5.09, 0.59],
          ['V_L (Norton equivalent, R_L=3.3kΩ) (V)', 5.12, 5.10, 0.39],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        "Norton's Theorem is verified. The short-circuit current I_N and Norton resistance R_N were determined experimentally and agree with theoretical calculations within 1%.",
        "The load voltage obtained from the Norton equivalent circuit matches that from the original network within 0.6%, confirming that the Norton equivalent is a valid and accurate representation of the original complex network at the load terminals.",
        "The duality relationship I_N = V_th / R_th = V_th / R_N was confirmed experimentally, reinforcing the conceptual link between Norton's and Thevenin's theorems. Both theorems are equally powerful tools for simplifying complex linear networks for load analysis.",
      ],
    },
  ],
};
