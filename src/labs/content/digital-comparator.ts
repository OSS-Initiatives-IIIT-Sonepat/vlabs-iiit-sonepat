import { type LabContent } from '@/labs/lab-content.types';

export const DigitalComparatorContent: LabContent = {
  id: 'digital-comparator',
  title: '4-bit Digital Magnitude Comparator',
  circuitId: 'digital-comparator',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A digital magnitude comparator compares two binary numbers and produces three outputs: ' +
        'EQ (A = B), GT (A > B), and LT (A < B). For any input pair, exactly one of these outputs ' +
        'is HIGH. Comparators are essential in sorting networks, address decoders, and ALU flag generation.',

        'For a 1-bit comparator, the logic is straightforward. The equality output uses the XNOR ' +
        'function — XNOR(A, B) is HIGH only when A and B are equal: ' +
        '$$EQ = \\overline{A \\oplus B} = A \\cdot B + \\overline{A} \\cdot \\overline{B}$$ ' +
        'The greater-than output requires A to be HIGH and B to be LOW, implemented with A AND NOT_B: ' +
        '$$GT = A \\cdot \\overline{B}$$ ' +
        'The less-than output requires A to be LOW and B to be HIGH: ' +
        '$$LT = \\overline{A} \\cdot B$$',

        'For a 4-bit comparator (A[3:0] vs B[3:0]), comparison starts from the most-significant bit. ' +
        'If A3 ≠ B3, the result is determined immediately. If A3 = B3, comparison cascades to bit 2, ' +
        'then bit 1, then bit 0. The 74LS85 / 74HC85 IC implements this cascade logic with dedicated ' +
        'cascade inputs (IAGTB, IAEQB, IALTB) allowing multiple comparators to be chained for wider words.',

        'The IC 74HC266 (quad XNOR, DIP-14) and 74HC04 (hex inverter) combined with 74HC08 (AND gates) ' +
        'implement the three output functions on this breadboard. Three LEDs — yellow (EQ), red (GT), ' +
        'green (LT) — indicate the comparison result.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard', quantity: '1' },
        { name: '74HC266 XNOR Gate IC',     specification: 'Quad 2-input XNOR, DIP-14, 5 V supply',       quantity: '1' },
        { name: '74HC04 NOT Gate IC',       specification: 'Hex inverter, DIP-14, 5 V supply',             quantity: '1' },
        { name: '74HC08 AND Gate IC',       specification: 'Quad 2-input AND, DIP-14, 5 V supply',         quantity: '1' },
        { name: 'Yellow LED',               specification: '5 mm, forward voltage ≈ 2.1 V (EQ output)',    quantity: '1' },
        { name: 'Red LED',                  specification: '5 mm, forward voltage ≈ 1.8 V (GT output)',    quantity: '1' },
        { name: 'Green LED',                specification: '5 mm, forward voltage ≈ 2.0 V (LT output)',    quantity: '1' },
        { name: 'Resistor 330 Ω',           specification: '¼ W, carbon film, current limiter for LEDs',   quantity: '3' },
        { name: 'DIP Switch (2-position)',  specification: 'For toggling inputs A and B',                  quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '+5 V DC, 500 mA',                             quantity: '1' },
        { name: 'Connecting Wires',         specification: 'M-M jumper wires, assorted colours',           quantity: '1 set' },
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
          body: 'Place the breadboard on a clean, dry surface. Identify terminal strips and power rails. ' +
            'Red rail = VCC (+5 V), blue rail = GND.',
        },
        {
          label: 'Place all five gates.',
          circuitStepIndex: 1,
          body: 'Mount five ICs: 74HC266 XNOR at col 4 row e (EQ path); ' +
            '74HC04 NOT at col 10 row e (to generate NOT_B for GT path); ' +
            '74HC08 AND at col 16 row e (GT: A · NOT_B); ' +
            '74HC04 NOT at col 10 row h (to generate NOT_A for LT path); ' +
            '74HC08 AND at col 16 row h (LT: NOT_A · B). ' +
            'Press each IC firmly until all pins are seated.',
        },
        {
          label: 'Wire inputs A and B.',
          circuitStepIndex: 2,
          body: 'A (red): col 1 row a → xnor1.A; col 1 row b → and1.A; col 1 row c → not2.A (for NOT_A). ' +
            'B (blue): col 2 row a → xnor1.B; col 2 row b → not1.A (for NOT_B); col 2 row c → and2.B. ' +
            'Inputs A and B are distributed to all gates that need them.',
        },
        {
          label: 'Connect internal wires.',
          circuitStepIndex: 3,
          body: 'Orange wire: NOT1.Y (B\u2019) → AND1.B — completes the A · B\u2019 (GT) path. ' +
            'Purple wire: NOT2.Y (A\u2019) → AND2.A — completes the A\u2019 · B (LT) path.',
        },
        {
          label: 'Add resistors, LEDs, and wire outputs.',
          circuitStepIndex: 4,
          body: 'Place 330 Ω resistors and LEDs for each output: ' +
            'Yellow LED (EQ) at col 22 row c; Red LED (GT) at col 22 row h; Green LED (LT) at col 25 row c. ' +
            'Wire each gate output through its resistor to LED anode. ' +
            'Connect all LED cathodes to GND rail.',
        },
        {
          label: 'Test: A=0, B=0 → EQ=1.',
          circuitStepIndex: 5,
          body: 'Set A=0, B=0. XNOR(0,0)=1 → yellow LED ON. AND1(0, NOT0=1)=0 → red OFF. ' +
            'AND2(NOT0=1, 0)=0 → green OFF. A equals B.',
        },
        {
          label: 'Test: A=1, B=0 → GT=1.',
          circuitStepIndex: 6,
          body: 'Set A=1, B=0. XNOR(1,0)=0 → yellow OFF. AND1(1, NOT0=1)=1 → red LED ON. ' +
            'AND2(NOT1=0, 0)=0 → green OFF. A > B.',
        },
        {
          label: 'Test: A=0, B=1 → LT=1.',
          circuitStepIndex: 7,
          body: 'Set A=0, B=1. XNOR(0,1)=0 → yellow OFF. AND1(0, NOT1=0)=0 → red OFF. ' +
            'AND2(NOT0=1, 1)=1 → green LED ON. A < B.',
        },
        {
          label: 'Test: A=1, B=1 → EQ=1.',
          circuitStepIndex: 8,
          body: 'Set A=1, B=1. XNOR(1,1)=1 → yellow LED ON. GT and LT outputs are both LOW. ' +
            'Record all four test results in the observation table.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V DC. Three ICs powered from the same VCC/GND rails.',
        'LED forward voltages: yellow ≈ 2.1 V, red ≈ 1.8 V, green ≈ 2.0 V. Series resistors = 330 Ω.',
        'Note: exactly one LED is ON for each valid input combination (mutually exclusive outputs).',
      ],
      table: {
        headers: ['A', 'B', 'EQ (Yellow)', 'GT (Red)', 'LT (Green)'],
        rows: [
          [0, 0, 'ON',  'OFF', 'OFF'],
          [0, 1, 'OFF', 'OFF', 'ON' ],
          [1, 0, 'OFF', 'ON',  'OFF'],
          [1, 1, 'ON',  'OFF', 'OFF'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 1-bit digital magnitude comparator was successfully built using XNOR, NOT, and AND gates. ' +
        'The three output LEDs (yellow EQ, red GT, green LT) responded correctly to all four input ' +
        'combinations, verifying the comparator logic.',

        'The mutually exclusive nature of the outputs was confirmed — exactly one LED was ON for each ' +
        'input state. The XNOR gate correctly detected equality; AND gate with an inverted input ' +
        'correctly detected the greater-than and less-than conditions.',

        'This 1-bit comparator forms the building block of wider n-bit comparators. By cascading the ' +
        'comparison from the MSB downwards, a 4-bit comparator (such as the 74HC85) can compare two ' +
        '4-bit numbers with propagation through cascade inputs, enabling arbitrary-width comparison.',
      ],
    },
  ],
};
