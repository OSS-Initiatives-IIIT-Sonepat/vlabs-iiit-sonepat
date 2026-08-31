import { type LabContent } from '@/labs/lab-content.types';

export const Decoder2to4Content: LabContent = {
  id: 'decoder-2to4',
  title: '2:4 Binary Decoder',
  circuitId: 'decoder',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A binary decoder converts an n-bit binary input code into one of 2ⁿ output lines. A 2:4 decoder takes a 2-bit input (A, B) and asserts exactly one of four output lines (Y0, Y1, Y2, Y3) corresponding to the decimal value of the binary input. At any given time, exactly one output is HIGH (active-high decoder) and the remaining three are LOW. Alternatively, an active-low decoder has exactly one output LOW while the others are HIGH.',
        'The Boolean expressions for an active-high 2:4 decoder are derived from minterms: Y0 = A\'·B\' (minterm 0 — inputs 00); Y1 = A\'·B (minterm 1 — inputs 01); Y2 = A·B\' (minterm 2 — inputs 10); Y3 = A·B (minterm 3 — inputs 11). Each output is a unique minterm of the two input variables. Four AND gates and two NOT gates implement the decoder.',
        'Gate-level implementation: two NOT gates (74HC04) generate A\' and B\'; four AND gates (74HC08 — uses all four gates in one IC) each implement one minterm (Y0=A\'B\', Y1=A\'B, Y2=AB\', Y3=AB). Total ICs: 1× 74HC04, 1× 74HC08. This is a complete one-IC-each solution. Commercial decoders such as the 74HC139 (dual 2:4) or 74HC138 (3:8) include an active-low enable input for chip-select and cascading.',
        'Applications of 2:4 decoders include: memory address decoding (selecting one of four memory chips based on two address lines), instruction decoding in CPUs (activating one of four functional units), display digit selection in multiplexed 7-segment displays, and as a fundamental sub-block in larger decoders (two 2:4 decoders plus an inverter form a 3:8 decoder).',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC04 Hex Inverter IC', specification: 'DIP-14 (two NOT gates used)', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14 (all four AND gates used)', quantity: '1' },
        { name: 'LED', specification: '5 mm, four different colours (Y0–Y3)', quantity: '4' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '4' },
        { name: 'SPDT Switch / Jumper', specification: 'Logic input (A, B)', quantity: '2' },
        { name: 'DC Power Supply', specification: '5 V regulated', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '20' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Set up breadboard and power supply',
          body: 'Connect the 5 V supply to the breadboard power rails. Insert both ICs (74HC04 and 74HC08) on the breadboard. Connect pin 14 to +5 V and pin 7 to GND for both. Prepare two input switches (A and B) with 10 kΩ pull-down resistors. Connect four LEDs (with 330 Ω series resistors) at conveniently located rows for outputs Y0, Y1, Y2, Y3. Label each LED.',
          circuitStepIndex: 0,
        },
        {
          label: 'Wire NOT gates for input complements',
          body: "Wire NOT gate 1 (74HC04, pin 1→2): connect input A to pin 1. A' appears on pin 2. Wire NOT gate 2 (74HC04, pin 3→4): connect input B to pin 3. B' appears on pin 4. These two complement signals, together with the original A and B, provide all four literals needed for the four AND gates. Verify the NOT outputs toggle correctly with a multimeter.",
          circuitStepIndex: 1,
        },
        {
          label: 'Wire all four AND gates for minterm outputs',
          body: "Wire AND gate 1 (74HC08, pins 1,2→3): connect A' (74HC04 pin 2) to pin 1 and B' (74HC04 pin 4) to pin 2. Y0 = A'B' on pin 3. Wire AND gate 2 (pins 4,5→6): connect A' to pin 4 and B to pin 5. Y1 = A'B on pin 6. Wire AND gate 3 (pins 9,10→8): connect A to pin 10 and B' to pin 9. Y2 = AB' on pin 8. Wire AND gate 4 (pins 12,13→11): connect A to pin 12 and B to pin 13. Y3 = AB on pin 11.",
          circuitStepIndex: 2,
        },
        {
          label: 'Connect LED output indicators',
          body: 'Connect each AND gate output through a 330 Ω resistor to the corresponding LED anode: Y0 (AND gate 1, pin 3) → LED0 (rightmost); Y1 (pin 6) → LED1; Y2 (pin 8) → LED2; Y3 (pin 11) → LED3 (leftmost). All LED cathodes connect to GND. At any input code, exactly one LED should illuminate. If more than one LED is ON, check for wiring errors on the NOT or AND gate connections.',
          circuitStepIndex: 3,
        },
        {
          label: 'Test all 4 input combinations and verify one-hot output',
          body: 'Apply each of the four input combinations (A,B): (0,0), (0,1), (1,0), (1,1). For (0,0): only LED0 (Y0) should be ON. For (0,1): only LED1 (Y1) should be ON. For (1,0): only LED2 (Y2) should be ON. For (1,1): only LED3 (Y3) should be ON. Confirm the one-hot property: exactly one LED lit at a time. Record all observations. Use a multimeter to verify output logic levels at each AND gate output.',
          circuitStepIndex: 4,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        "2:4 Decoder truth table. Y0=A'B', Y1=A'B, Y2=AB', Y3=AB. Exactly one output is HIGH for each input combination.",
      ],
      table: {
        headers: ['A', 'B', 'Y0 (obs)', 'Y1 (obs)', 'Y2 (obs)', 'Y3 (obs)', 'Y0 (exp)', 'Y1 (exp)', 'Y2 (exp)', 'Y3 (exp)'],
        rows: [
          [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
          [0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
          [1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        "The 2:4 Binary Decoder has been successfully implemented using 74HC04 (NOT) and 74HC08 (AND) ICs. All four input combinations were tested and the one-hot output property is confirmed — exactly one of the four output LEDs is ON for each unique input code.",
        "The observed outputs Y0 through Y3 match the expected minterm expressions (A'B', A'B, AB', AB) exactly. The decoder correctly maps each 2-bit binary address to a unique, mutually exclusive output line.",
        'This circuit demonstrates the fundamental operation of address decoding. In a real memory system, the four outputs would connect to the chip-enable (CE) pins of four separate memory chips, allowing the CPU to access one chip at a time based on the two most-significant address bits.',
      ],
    },
  ],
};
