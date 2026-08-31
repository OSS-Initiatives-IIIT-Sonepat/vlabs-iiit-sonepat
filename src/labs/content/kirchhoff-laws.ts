import { type LabContent } from '@/labs/lab-content.types';

export const KirchhoffLawsContent: LabContent = {
  id: 'kirchhoff-laws',
  title: "Kirchhoff's Current and Voltage Laws",
  circuitId: 'kirchhoff-laws',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        "Kirchhoff's Current Law (KCL) states that the algebraic sum of all currents entering and leaving any node (junction) in a circuit is zero. In other words, charge is conserved at every node: ΣI_in = ΣI_out. This is a direct consequence of the law of conservation of electric charge and applies to every node in any lumped-parameter circuit at all times.",
        "Kirchhoff's Voltage Law (KVL) states that the algebraic sum of all potential differences (EMFs and voltage drops) around any closed loop in a circuit is zero: ΣV = 0. This follows from the conservation of energy — a charge carrier travelling around a closed loop returns to the same potential it started from, so the net energy gained equals the net energy lost.",
        'Together KCL and KVL form the foundation for all systematic circuit analysis techniques including mesh analysis, nodal analysis, superposition, and Thevenin/Norton equivalents. They hold for any network — DC or AC, linear or nonlinear — as long as the lumped-circuit assumption is valid (circuit dimensions much smaller than the signal wavelength).',
        'In this experiment a resistor network with two DC sources is built. Currents at each node and voltages around each loop are measured. The measured values are substituted into KCL and KVL equations and the algebraic sums are confirmed to be zero within experimental error, thereby validating both laws.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'DC Regulated Power Supply', specification: '0–15 V, 1 A (two channels)', quantity: '2' },
        { name: 'Resistor R1', specification: '1 kΩ, ±5%, 0.25 W', quantity: '1' },
        { name: 'Resistor R2', specification: '2.2 kΩ, ±5%, 0.25 W', quantity: '1' },
        { name: 'Resistor R3', specification: '3.3 kΩ, ±5%, 0.25 W', quantity: '1' },
        { name: 'Digital Multimeter', specification: 'Voltage & current ranges', quantity: '2' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '20' },
        { name: 'Milliammeter', specification: '0–50 mA DC, three units', quantity: '3' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Build the resistor network',
          body: 'On the breadboard, connect R1 (1 kΩ) from the node A to the positive terminal of source V1 (set to 9 V), R2 (2.2 kΩ) from node A to the positive terminal of source V2 (set to 6 V), and R3 (3.3 kΩ) from node A to the common ground. Both supply negatives share the same ground rail. This creates a single node A where three branch currents meet — suitable for KCL verification.',
          circuitStepIndex: 7,
        },
        {
          label: 'Insert ammeters in each branch',
          body: 'Break each branch at a convenient point and insert an ammeter (in series) to measure the branch current. Label the three ammeters as measuring I1 (through R1), I2 (through R2), and I3 (through R3). Set each ammeter to the DC milliamp range. Positive current is defined as flowing into node A; adjust polarity markings accordingly after first measurements.',
          circuitStepIndex: 8,
        },
        {
          label: 'Measure branch currents (KCL check)',
          body: 'Switch on both supplies. Record I1, I2, and I3 from the three ammeters. Compute the algebraic sum: I1 + I2 − I3 (signs depend on the chosen current directions). According to KCL this sum must equal zero. A small discrepancy (< 2%) is acceptable due to meter accuracy and resistor tolerance.',
          circuitStepIndex: 8,
        },
        {
          label: 'Measure voltages around Loop 1 (KVL check)',
          body: 'Identify Loop 1: V1 → R1 → Node A → R3 → Ground → V1. Using the voltmeter, measure V_R1 (across R1) and V_R3 (across R3). Apply KVL: V1 − V_R1 − V_R3 = 0. Record all values and compute the sum. The result should be within ±0.1 V of zero, accounting for meter and supply tolerances.',
          circuitStepIndex: 8,
        },
        {
          label: 'Measure voltages around Loop 2 (KVL check)',
          body: 'Identify Loop 2: V2 → R2 → Node A → R3 → Ground → V2. Measure V_R2 and V_R3 (same value as before). Apply KVL: V2 − V_R2 − V_R3 = 0. If V_R3 was already measured, only V_R2 needs a fresh reading. Confirm the algebraic sum is zero and compare the nodal voltage at A from both loops.',
          circuitStepIndex: 8,
        },
        {
          label: 'Vary supply voltages and repeat',
          body: 'Change V1 to 12 V (keeping V2 = 6 V) and repeat all current and voltage measurements. Record the new set of readings in the observation table. Verify that KCL and KVL still hold for the modified supply conditions. This demonstrates that the laws are universal and not specific to a single operating point.',
          circuitStepIndex: 8,
        },
        {
          label: 'Compute theoretical values and compare',
          body: 'Using the known resistor values and supply voltages, calculate the theoretical branch currents via simultaneous KCL/KVL equations (or nodal analysis). Compare the theoretical values with the measured values. Calculate the percentage error for each branch current and each loop voltage. Summarise findings to confirm both laws.',
          circuitStepIndex: 8,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Record branch currents and voltages for both supply configurations. Verify KCL at node A and KVL around each loop by computing the algebraic sums.',
      ],
      table: {
        headers: ['Condition', 'I1 (mA)', 'I2 (mA)', 'I3 (mA)', 'I1+I2-I3 (mA)', 'V_R1 (V)', 'V_R2 (V)', 'V_R3 (V)', 'KVL L1 (V)', 'KVL L2 (V)'],
        rows: [
          ['V1=9V, V2=6V', 5.14, 1.43, 6.57, 0.00, 5.14, 3.14, 3.86, 0.00, 0.00],
          ['V1=12V, V2=6V', 7.06, 1.17, 8.23, 0.00, 7.06, 2.57, 4.94, 0.00, 0.00],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        "The experiment verifies both of Kirchhoff's Laws. At node A, the algebraic sum of all branch currents is found to be zero for both supply configurations, confirming KCL.",
        "Around each closed loop, the algebraic sum of all EMFs and voltage drops is zero within experimental error (< 1%), confirming KVL. The small residual error is attributable to resistor tolerances, contact resistance, and instrument accuracy.",
        "These results demonstrate that KCL and KVL are reliable analytical tools for DC circuit analysis. Mastery of these laws is prerequisite to more advanced network theorems such as Superposition, Thevenin, and Norton.",
      ],
    },
  ],
};
