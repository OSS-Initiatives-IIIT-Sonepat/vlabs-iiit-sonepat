import { type LabContent } from '@/labs/lab-content.types';

export const Mux4to1ICContent: LabContent = {
  id: 'mux-4to1-ic',
  title: '4:1 Multiplexer using 74HC153',
  circuitId: 'mux-4to1-ic',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A multiplexer (MUX) is a combinational circuit that selects one of several input data lines ' +
        'and routes it to a single output. A 4:1 MUX has four data inputs (I0–I3), two select inputs ' +
        '(S1, S0), and one output (Y). The select lines encode a 2-bit binary address that determines ' +
        'which input is connected to the output: Y = I(S1·2 + S0).',

        'The Boolean expression for a 4:1 MUX output is: ' +
        'Y = S1\'·S0\'·I0 + S1\'·S0·I1 + S1·S0\'·I2 + S1·S0·I3. ' +
        'Each term is a minterm of the select inputs ANDed with the corresponding data input. ' +
        'MUXes are universal logic elements: any Boolean function of n variables can be ' +
        'implemented with a 2ⁿ-to-1 MUX by applying function values to data inputs.',

        'The 74HC153 is a dual 4:1 multiplexer in a DIP-16 package. It contains two independent ' +
        '4:1 MUX channels sharing the same select lines S1 and S0. ' +
        'Each channel has its own enable input (EN1_bar, EN2_bar) that is active-LOW. ' +
        'When EN_bar = LOW (enabled), Y = selected input; when EN_bar = HIGH, Y = LOW regardless of S and I. ' +
        'In this experiment, EN1_bar is tied permanently to GND to enable channel 1.',

        'Multiplexers find use in data routing, bus control, function generators, and parallel-to-serial ' +
        'conversion. The 74HC153 operates from 2 V to 6 V with propagation delays under 10 ns at 5 V, ' +
        'making it suitable for high-speed digital switching applications.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard',   quantity: '1' },
        { name: '74HC153 MUX IC',            specification: 'Dual 4:1 multiplexer, DIP-16, 5 V CMOS',        quantity: '1' },
        { name: 'Green LED',                 specification: '5 mm, Vf ≈ 2.0 V (Y output indicator)',         quantity: '1' },
        { name: 'Resistor 330 Ω',            specification: '¼ W, carbon film, LED current limiter',        quantity: '1' },
        { name: 'DIP Switch (6-pole)',        specification: 'For toggling I0–I3 and S0, S1 inputs',          quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '+5 V DC, 500 mA',                               quantity: '1' },
        { name: 'Digital Multimeter',        specification: 'For verifying output logic levels',              quantity: '1' },
        { name: 'Connecting Wires',          specification: 'M-M jumper wires, assorted colours',            quantity: '1 set' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Inspect and place the breadboard.',
          circuitStepIndex: 0,
          body: 'Set up the breadboard and power rails. The 74HC153 is a 16-pin IC, ' +
            'so it will span columns 8–15 across the centre gap. ' +
            'Identify that pin 1 (EN1_bar) is at column 8 row e when the notch faces left.',
        },
        {
          label: 'Mount the 74HC153 IC.',
          circuitStepIndex: 1,
          body: 'Place the 74HC153 at column 8 straddling the centre gap. ' +
            'Connect pin 16 (VCC, col 8 row f) to the +5 V rail. ' +
            'Connect pin 8 (GND, col 15 row e) to the GND rail. ' +
            'Verify the IC is firmly seated with all 16 pins engaged.',
        },
        {
          label: 'Tie EN1_bar to GND.',
          circuitStepIndex: 2,
          body: 'Connect a black wire from the EN1_bar pin (col 8, row e) to the GND rail. ' +
            'This permanently enables channel 1. ' +
            'Without this connection, the output Y1 will remain LOW regardless of inputs.',
        },
        {
          label: 'Wire data inputs I0–I3.',
          circuitStepIndex: 3,
          body: 'White wires: col 1 row a → pin i0_1 (col 13), col 2 → i1_1 (col 12), ' +
            'col 3 → i2_1 (col 11), col 4 → i3_1 (col 10). ' +
            'Connect each col to a DIP switch: one side to the column hole, other side to VCC or GND. ' +
            'Set I0=1, I1=0, I2=1, I3=0 for the test.',
        },
        {
          label: 'Wire select inputs S0 and S1.',
          circuitStepIndex: 4,
          body: 'Red wire: col 5 row a → pin s0 (col 9, row f — f-bank, LSB of select). ' +
            'Orange wire: col 6 row a → pin s1 (col 9, row e — e-bank, MSB of select). ' +
            'Connect to DIP switches to allow toggling.',
        },
        {
          label: 'Wire output Y1 to LED.',
          circuitStepIndex: 5,
          body: 'Green wire: pin y1 (col 14, row e) → r_out p1 (col 20, row c). ' +
            'Green wire: r_out p2 → led_out anode (col 24, row c). ' +
            'Black wire: led_out cathode → GND rail. ' +
            'Apply +5 V. Circuit is complete.',
        },
        {
          label: 'Test all four select combinations.',
          circuitStepIndex: 6,
          body: 'With I0=1, I1=0, I2=1, I3=0: ' +
            'S=00 → Y=I0=1 (LED ON); S=01 → Y=I1=0 (LED OFF); ' +
            'S=10 → Y=I2=1 (LED ON); S=11 → Y=I3=0 (LED OFF). ' +
            'Record observations. Change data input values and observe that ' +
            'the output always mirrors the selected input.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V. 74HC153 enabled with EN1_bar = LOW.',
        'Test data pattern: I0=1, I1=0, I2=1, I3=0.',
        'LED state (ON = HIGH output) matches the value of the selected data input in all cases.',
      ],
      table: {
        headers: ['S1', 'S0', 'Selected Input', 'I Value', 'Y Output', 'LED'],
        rows: [
          [0, 0, 'I0', 1, 1, 'ON'],
          [0, 1, 'I1', 0, 0, 'OFF'],
          [1, 0, 'I2', 1, 1, 'ON'],
          [1, 1, 'I3', 0, 0, 'OFF'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 4:1 multiplexer experiment using the 74HC153 IC was successfully completed. ' +
        'The output LED faithfully replicated the logic level of the data input selected by ' +
        'the two-bit select code S1, S0 in all four combinations.',

        'The MUX correctly implemented the function Y = S1\'S0\'·I0 + S1\'S0·I1 + S1S0\'·I2 + S1S0·I3. ' +
        'Changing the data inputs while holding select constant immediately updated the output, ' +
        'confirming the combinational (memoryless) nature of the circuit.',

        'The 74HC153 dual-channel design allows two independent 4:1 MUX operations from a single IC, ' +
        'making it area-efficient for multiplexing pairs of signals. ' +
        'Applications include data buses, function generators, and programmable logic building blocks.',
      ],
    },
  ],
};
