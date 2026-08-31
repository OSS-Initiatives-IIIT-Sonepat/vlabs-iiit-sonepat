import { type LabContent } from '@/labs/lab-content.types';

export const ZenerVoltageRegulatorContent: LabContent = {
  id: 'zener-voltage-regulator',
  title: 'Zener Diode as a Voltage Regulator',
  circuitId: 'zener-voltage-regulator',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A Zener voltage regulator maintains a constant output voltage across a load despite variations in input voltage (line regulation) or load current (load regulation). The Zener diode operates in reverse breakdown where its terminal voltage V_Z stays nearly constant over a wide current range.',
        'The basic shunt regulator circuit consists of a series resistor R_S and a Zener diode in parallel with the load R_L. The series resistor drops the excess voltage (V_in − V_Z) and limits current. When load current changes, the Zener current adjusts inversely (I_Z = I_total − I_L) to maintain V_out = V_Z.',
        'Line regulation quantifies how much V_out changes per unit change in V_in: LineReg = ΔV_out/ΔV_in. Load regulation quantifies change due to load current: LoadReg = (V_NL − V_FL)/V_FL × 100%. A good regulator has both values close to zero.',
        'Design constraints: the Zener must stay in breakdown (I_Z > I_Z_min) at full load, and must not exceed rated power (P_Z = V_Z × I_Z_max) at no load. The series resistor value R_S = (V_in_min − V_Z) / (I_Z_min + I_L_max) determines the design trade-off.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard', specification: '830 tie-point', quantity: '1' },
        { name: 'Zener Diode', specification: '1N4733A, V_Z = 5.1 V, 1 W', quantity: '1' },
        { name: 'Series Resistor R_S', specification: '470 Ω, ½ W', quantity: '1' },
        { name: 'Load Resistor R_L', specification: '1 kΩ, 2.2 kΩ, 4.7 kΩ (¼ W each)', quantity: '1 each' },
        { name: 'Regulated DC Power Supply', specification: '0–12 V variable', quantity: '1' },
        { name: 'Digital Multimeter (×2)', specification: 'Input and output voltage measurement', quantity: '2' },
        { name: 'Connecting Wires', specification: 'M-M jumper wires', quantity: '1 set' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Assemble the regulator circuit.',
          circuitStepIndex: 5,
          body: 'Connect supply positive → 470 Ω series resistor → node A. From node A, connect the Zener cathode (and load resistor R_L = 1 kΩ). Connect Zener anode and the other end of R_L to GND. Place Voltmeter 1 at the supply input and Voltmeter 2 at node A (output). Start with supply at 0 V.',
        },
        {
          label: 'Measure line regulation (no load first).',
          circuitStepIndex: 7,
          body: 'Remove R_L (open circuit, no load). Increase supply from 0 V to 10 V in 0.5 V steps. Record V_in and V_out at each step. Before the Zener breaks down (V_in < 5.5 V), V_out rises with V_in. Once V_in > 5.5 V, V_out should clamp near 5.1 V. Verify regulation kicks in.',
        },
        {
          label: 'Record line regulation with load.',
          circuitStepIndex: 7,
          body: 'Connect R_L = 1 kΩ. Vary V_in from 6 V to 10 V in 0.5 V steps. Record V_out at each step. Calculate Line Regulation = ΔV_out / ΔV_in. A well-designed circuit should show < 0.1 V variation in V_out over a 4 V input range.',
        },
        {
          label: 'Measure load regulation.',
          circuitStepIndex: 7,
          body: 'Fix V_in = 9 V. Measure V_out with no load (R_L = open). Then connect R_L = 4.7 kΩ, 2.2 kΩ, 1 kΩ in turn, measuring V_out and I_L at each. Calculate Load Regulation = (V_NL − V_FL) / V_FL × 100%. Verify that V_out stays near 5.1 V across all loads.',
        },
        {
          label: 'Observe regulator limits.',
          circuitStepIndex: 7,
          body: 'Reduce V_in below the Zener voltage (< 5 V). Observe V_out drops below 5.1 V — regulation fails. Now increase load (decrease R_L below 500 Ω) until the total current exceeds the Zener\'s capacity. Observe V_out drops. These are the design limits of the shunt regulator. Record the minimum R_L for proper regulation.',
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Zener: 1N4733A (V_Z = 5.1 V, 1 W). R_S = 470 Ω. Supply variable 0–10 V.',
        'Nominal output voltage V_out ≈ 5.1 V (in regulation range).',
        'Maximum safe Zener current: I_Z_max = P_Z / V_Z = 1 / 5.1 ≈ 196 mA.',
      ],
      table: {
        headers: ['V_in (V)', 'V_out — No Load (V)', 'V_out — R_L=1kΩ (V)', 'V_out — R_L=470Ω (V)'],
        rows: [
          [4,  '3.98', '3.96', '3.90'],
          [6,  '5.10', '5.09', '5.07'],
          [8,  '5.11', '5.10', '5.08'],
          [10, '5.12', '5.11', '5.09'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The Zener shunt regulator successfully maintained an output voltage of approximately 5.1 V despite variations in both input voltage (line regulation) and load current (load regulation). The regulated output remained within ±0.05 V for V_in between 6 V and 10 V with a 1 kΩ load.',
        'Line regulation was found to be excellent once the Zener entered breakdown. Load regulation was also satisfactory for load resistances down to 470 Ω, beyond which the voltage began to sag as total current exceeded the design margin.',
        'This experiment demonstrated the fundamental voltage-regulation principle using a Zener diode. While a simple shunt regulator wastes power in the series resistor, it is adequate for low-power reference applications. More efficient regulators using op-amps or dedicated IC regulators (e.g., LM7805) build on this same Zener reference concept.',
      ],
    },
  ],
};
