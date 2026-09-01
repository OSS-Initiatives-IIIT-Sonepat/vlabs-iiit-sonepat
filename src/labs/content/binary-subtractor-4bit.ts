import { type LabContent } from '@/labs/lab-content.types';

export const BinarySubtractor4bitContent: LabContent = {
  id: 'binary-subtractor-4bit',
  title: '4-bit Binary Subtractor using 74HC283 and XOR Inversion',
  circuitId: 'binary-subtractor-4bit',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Binary subtraction can be performed using an adder by exploiting two\'s complement representation. ' +
        'The two\'s complement of a number N is obtained by inverting all bits (one\'s complement) ' +
        'and adding 1. Therefore: A − B = A + (two\'s complement of B) = A + B\' + 1, ' +
        'where B\' denotes the bitwise complement of B.',

        'XOR gates implement programmable inversion: when one input of an XOR is tied HIGH (1), ' +
        'the output is the complement of the other input (X ⊕ 1 = X\'). ' +
        'When tied LOW (0), the XOR passes the input unchanged (X ⊕ 0 = X). ' +
        'In this circuit, the B-input of each XOR gate is permanently tied to VCC, ' +
        'so all four XOR gates act as inverters for B1–B4.',

        'The carry-in C0 of the 74HC283 is tied to VCC (HIGH), providing the +1 needed ' +
        'to complete the two\'s complement. The adder therefore computes: ' +
        'A + B\' + 1 = A − B (in two\'s complement arithmetic). ' +
        'The carry-out C4 indicates the sign of the result: ' +
        'C4=1 means A ≥ B (positive or zero result); C4=0 means A < B (negative result in 4-bit unsigned).',

        'For signed 4-bit arithmetic (−8 to +7), results outside this range indicate overflow. ' +
        'When A ≥ B, the result S4–S1 is the correct magnitude. ' +
        'When A < B, S4–S1 holds the two\'s complement of (B−A); to recover the magnitude, ' +
        'invert S4–S1 and add 1. This experiment demonstrates both cases.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard',   quantity: '1' },
        { name: '74HC86 XOR Gate IC',        specification: 'Quad 2-input XOR, DIP-14, 5 V CMOS (for inversion)', quantity: '1' },
        { name: '74HC283 Adder IC',          specification: '4-bit binary full adder, DIP-16, 5 V CMOS',     quantity: '1' },
        { name: 'Red LED',                   specification: '5 mm, Vf ≈ 2.0 V (S1 output)',                  quantity: '1' },
        { name: 'Yellow LED',                specification: '5 mm, Vf ≈ 2.1 V (S2 output)',                  quantity: '1' },
        { name: 'Green LED',                 specification: '5 mm, Vf ≈ 2.0 V (S3 output)',                  quantity: '1' },
        { name: 'Blue LED',                  specification: '5 mm, Vf ≈ 3.0 V (S4 output)',                  quantity: '1' },
        { name: 'White LED',                 specification: '5 mm, Vf ≈ 3.2 V (C4 borrow indicator)',        quantity: '1' },
        { name: 'Resistor 330 Ω',            specification: '¼ W, carbon film',                             quantity: '5' },
        { name: 'DIP Switch (8-pole)',        specification: 'For toggling A1–A4 and B1–B4 inputs',           quantity: '1' },
        { name: 'Regulated DC Power Supply', specification: '+5 V DC, 500 mA',                               quantity: '1' },
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
          body: 'Set up the breadboard. Plan the layout: four XOR gates in cols 3–10, ' +
            '74HC283 adder in cols 13–20, output LEDs in cols 28–46. ' +
            'This circuit uses two ICs: one quad-XOR (74HC86) and one 4-bit adder (74HC283).',
        },
        {
          label: 'Place XOR inverter gates and tie B-inputs to VCC.',
          circuitStepIndex: 1,
          body: 'Mount xor_b1 at col 3 row e; xor_b2 at col 3 row h; xor_b3 at col 7 row e; xor_b4 at col 7 row h. ' +
            'Connect a red wire from VCC rail to pin B of each XOR gate. ' +
            'Each XOR now functions as a NOT gate: output = NOT(A-input).',
        },
        {
          label: 'Place the 74HC283 adder at column 13.',
          circuitStepIndex: 2,
          body: 'Mount the 74HC283 DIP-16 at column 13. ' +
            'Connect pin 16 (col 13, row f) to VCC rail. Connect pin 8 (col 20, row e) to GND rail. ' +
            'This IC will perform A + B\' where B\' comes from the XOR inverters.',
        },
        {
          label: 'Tie C0 to VCC (+1).',
          circuitStepIndex: 3,
          body: 'Connect a red wire from the C0 pin (col 19, row e) to the VCC rail (+5 V). ' +
            'C0=1 adds the +1 required to complete two\'s complement: A + B\' + 1 = A − B. ' +
            'This is the critical step that converts the adder into a subtractor.',
        },
        {
          label: 'Wire A inputs directly to adder.',
          circuitStepIndex: 4,
          body: 'Orange wires from row a: col 1 → a1, col 2 → a2, col 3 → a3, col 4 → a4. ' +
            'A inputs bypass the XOR inverters and connect directly to the adder A-input pins. ' +
            'A is the minuend (the number being subtracted from).',
        },
        {
          label: 'Wire B inputs through XOR inverters.',
          circuitStepIndex: 5,
          body: 'Blue wires from row b: col 1 → xor_b1 pin A, col 2 → xor_b2 pin A, ' +
            'col 3 → xor_b3 pin A, col 4 → xor_b4 pin A. ' +
            'White wires from each XOR output to the adder b-pins: xor_b1.Y → b1, etc. ' +
            'B is the subtrahend; it is inverted before entering the adder.',
        },
        {
          label: 'Wire output LEDs and test.',
          circuitStepIndex: 6,
          body: 'Wire five LED paths for S1–S4 and C4 to the GND rail via 330 Ω resistors. ' +
            'Apply +5 V. With A=B, the result should be 0000 with C4=1 (borrow cleared). ' +
            'Verify the LED pattern represents the correct difference.',
        },
        {
          label: 'Test 8 − 5 = 3.',
          circuitStepIndex: 7,
          body: 'Set A=1000 (A4=1) and B=0101 (B3=1, B1=1). ' +
            'Expected result: 3 = 0011. Led_s2 (yellow) and led_s1 (red) should light. ' +
            'C4=1 (white LED ON) confirms no borrow — A ≥ B.',
        },
        {
          label: 'Test 5 − 8 = −3.',
          circuitStepIndex: 8,
          body: 'Set A=0101 (A3=A1=1) and B=1000 (B4=1). ' +
            'Result in 4-bit two\'s complement = 1101 (unsigned value 13). ' +
            'Led_s4, led_s3, led_s1 light. C4=0 (white LED OFF) indicates borrow — A < B. ' +
            'To read the signed magnitude: invert 1101 = 0010, add 1 → 0011 = 3. So result = −3.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply: VCC = +5 V. C0 = 1 (tied to VCC for two\'s complement).',
        'C4=1 → result ≥ 0 (A ≥ B, no borrow). C4=0 → result < 0 (A < B, borrow occurred).',
        'For negative results, the 4-bit output is the two\'s complement of the magnitude.',
      ],
      table: {
        headers: ['A', 'B', 'A−B', 'S4 S3 S2 S1', 'C4', 'Interpretation'],
        rows: [
          [8,  5,   3, '0 0 1 1', 1, '+3 (no borrow)'],
          [5,  8,  -3, '1 1 0 1', 0, '−3 (borrow, 2\'s comp)'],
          [15, 9,   6, '0 1 1 0', 1, '+6 (no borrow)'],
          [4,  4,   0, '0 0 0 0', 1, '0 (equal)'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 4-bit binary subtractor was successfully implemented by combining a 74HC86 XOR quad gate ' +
        'with a 74HC283 4-bit adder. The XOR gates tied to VCC inverted the B operand, and C0=1 ' +
        'completed the two\'s complement, implementing A − B = A + B\' + 1.',

        'The output LEDs correctly displayed the difference for both A≥B (positive result, C4=1) ' +
        'and A<B (negative result in two\'s complement, C4=0) cases, validating the two\'s complement ' +
        'subtraction method without requiring a dedicated subtractor IC.',

        'This technique generalises to any adder: by XORing each B bit with a mode-select signal M, ' +
        'the same circuit can function as either an adder (M=0, C0=0) or a subtractor (M=1, C0=1). ' +
        'This adder/subtractor duality is the basis of the arithmetic logic unit in every processor.',
      ],
    },
  ],
};
