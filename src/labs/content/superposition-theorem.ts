import { type LabContent } from '@/labs/lab-content.types';

export const SuperpositionTheoremContent: LabContent = {
  id: 'superposition-theorem',
  title: 'Superposition Theorem',
  circuitId: 'superposition-theorem',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'The Superposition Theorem states that in any linear bilateral network containing more than one independent source, the current through or voltage across any element is equal to the algebraic sum of the currents or voltages produced by each independent source acting alone, with all other independent sources replaced by their internal impedances (voltage sources short-circuited, current sources open-circuited).',
        'The theorem is valid for any linear circuit because the principle of superposition — a direct consequence of linearity — guarantees that the response of a linear system to multiple simultaneous inputs equals the sum of the responses to each input applied independently. Non-linear elements such as diodes and transistors (when not linearised around a Q-point) do not satisfy superposition.',
        'Practical procedure: (1) Kill all sources except one. A voltage source is "killed" by replacing it with a short circuit (wire) — because an ideal voltage source has zero internal resistance. A current source is killed by replacing it with an open circuit — because an ideal current source has infinite internal resistance. (2) Analyse the simplified circuit to find the partial response. (3) Repeat for each independent source. (4) Sum all partial responses algebraically to obtain the total response.',
        'This experiment uses a two-source resistor network. The current through the load resistor R3 is measured with both sources active, then individually (killing the other source), and the algebraic sum of the two partial currents is compared with the total measured current to verify the theorem.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'DC Regulated Power Supply', specification: '0–15 V, 1 A (two channels)', quantity: '2' },
        { name: 'Resistor R1', specification: '1 kΩ, ±1%, 0.25 W', quantity: '1' },
        { name: 'Resistor R2', specification: '2.2 kΩ, ±1%, 0.25 W', quantity: '1' },
        { name: 'Resistor R3 (Load)', specification: '3.3 kΩ, ±1%, 0.25 W', quantity: '1' },
        { name: 'Digital Multimeter', specification: 'Voltage & current measurement', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '15' },
        { name: 'Short-circuit Link', specification: 'Jumper wire for killing voltage source', quantity: '2' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Assemble two-source circuit',
          body: 'Connect R1 between the positive terminal of V1 (9 V) and a central node N. Connect R2 between the positive terminal of V2 (6 V) and the same node N. Connect the load R3 from node N to the common ground. Both supply negatives share the ground rail. Insert the ammeter in series with R3 to measure the load current I_total. Record the reading.',
          circuitStepIndex: 6,
        },
        {
          label: 'Kill V2 — analyse due to V1 alone',
          body: 'Switch off supply V2. Replace V2 with a short-circuit jumper (connect its positive terminal directly to ground) to simulate zero internal resistance. Re-energise V1. Measure the current I_R3_V1 through R3. This is the partial response due to V1 acting alone. Record the reading including sign/direction.',
          circuitStepIndex: 7,
        },
        {
          label: 'Kill V1 — analyse due to V2 alone',
          body: 'Restore V2 and now kill V1: switch off V1 and replace it with a short-circuit jumper. Re-energise V2. Measure the current I_R3_V2 through R3. Carefully note the direction of the current — it may oppose I_R3_V1. Assign appropriate signs: positive if in the same direction as I_total, negative if opposing.',
          circuitStepIndex: 7,
        },
        {
          label: 'Apply superposition and compare',
          body: 'Compute the superposition result: I_super = I_R3_V1 + I_R3_V2 (with signs). Compare I_super with I_total measured in Step 1. The percentage error should be less than 2%. If a larger discrepancy is observed, check that the short-circuit jumper replacement was performed correctly and that the resistor values are accurate.',
          circuitStepIndex: 7,
        },
        {
          label: 'Verify voltage across R3 by superposition',
          body: 'Repeat the entire procedure but measure voltages across R3 (V_R3) instead of current. Compute V_super = V_R3_V1 + V_R3_V2 and compare with the total voltage V_R3_total. This dual verification (both current and voltage) strengthens confidence in the theorem and also confirms that V = IR holds consistently for the load resistor throughout.',
          circuitStepIndex: 7,
        },
        {
          label: 'Tabulate and calculate theoretical values',
          body: 'Calculate theoretical values of I_R3_V1 and I_R3_V2 using series-parallel resistor analysis or the voltage divider rule for each single-source sub-circuit. Compare the theoretical partial currents with the measured ones and record the percentage error in the observation table.',
          circuitStepIndex: 7,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Measured values of load current under each condition are tabulated below. The algebraic sum of individual contributions should equal the total response.',
      ],
      table: {
        headers: ['Condition', 'I_R3 Measured (mA)', 'I_R3 Theoretical (mA)', 'Error (%)'],
        rows: [
          ['Both sources active (I_total)', 3.21, 3.24, 0.93],
          ['V1 alone (I_R3_V1)', 2.45, 2.47, 0.81],
          ['V2 alone (I_R3_V2)', 0.76, 0.77, 1.30],
          ['Superposition sum I_R3_V1 + I_R3_V2', 3.21, 3.24, 0.93],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        "The Superposition Theorem is verified. The algebraic sum of the partial load currents (V1 acting alone and V2 acting alone) equals the total load current when both sources are active simultaneously, within the experimental error of less than 1.5%.",
        'The small discrepancy between the superposition sum and the directly measured total is due to resistor tolerances and contact resistances at the breadboard terminals. These errors are well within the ±5% tolerance band of the components used.',
        'This theorem is a powerful circuit analysis tool: by reducing a multi-source problem into a series of single-source problems, complex networks become tractable. The result also confirms the linearity of the resistor network under the test conditions.',
      ],
    },
  ],
};
