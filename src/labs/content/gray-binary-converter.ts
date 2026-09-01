import { type LabContent } from '@/labs/lab-content.types';

export const GrayBinaryConverterContent: LabContent = {
  id: 'gray-binary-converter',
  title: 'Gray Code to Binary and Binary to Gray Code Converters',
  circuitId: 'gray-binary-converter',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Gray code, also called reflected binary code, is a binary numeral system where two successive ' +
        'values differ in only a single bit. This property — the unit-distance property — makes Gray code ' +
        'invaluable in applications where mechanical or electrical glitches during state transitions could ' +
        'be catastrophic, such as shaft encoders, analog-to-digital converters, and error detection systems.',

        'The Binary-to-Gray conversion uses XOR gates: the MSB G3 passes through unchanged (G3 = B3), ' +
        'and each subsequent Gray bit is the XOR of adjacent binary bits: G2 = B3 ⊕ B2, G1 = B2 ⊕ B1, ' +
        'G0 = B1 ⊕ B0. This circuit requires only three 2-input XOR gates for a 4-bit conversion.',

        'The Gray-to-Binary conversion is the inverse process. B3 = G3 (MSB unchanged), ' +
        'then each binary bit is the XOR of all Gray bits above it: B2 = G3 ⊕ G2, ' +
        'B1 = G3 ⊕ G2 ⊕ G1, B0 = G3 ⊕ G2 ⊕ G1 ⊕ G0. ' +
        'This can be implemented with three cascaded XOR gates per bit, ' +
        'or equivalently using XNOR reduction.',

        'The 74HC86 is a quad 2-input XOR gate CMOS IC operating from 2 V to 6 V. ' +
        'Each IC contains four independent XOR gates in a DIP-14 package. ' +
        'One 74HC86 IC provides all three XOR gates needed for the Binary-to-Gray converter ' +
        'demonstrated in this experiment.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',               specification: 'Standard 830-tie-point solderless breadboard',   quantity: '1' },
        { name: '74HC86 XOR Gate IC',        specification: 'Quad 2-input XOR, DIP-14, 5 V CMOS',            quantity: '1' },
        { name: 'Red LED',                   specification: '5 mm, Vf ≈ 2.0 V (G3 output)',                  quantity: '1' },
        { name: 'Yellow LED',                specification: '5 mm, Vf ≈ 2.1 V (G2 output)',                  quantity: '1' },
        { name: 'Green LED',                 specification: '5 mm, Vf ≈ 2.0 V (G1 output)',                  quantity: '1' },
        { name: 'Blue LED',                  specification: '5 mm, Vf ≈ 3.0 V (G0 output)',                  quantity: '1' },
        { name: 'Resistor 330 Ω',            specification: '¼ W, carbon film',                             quantity: '4' },
        { name: 'DIP Switch (4-pole)',        specification: 'For toggling binary inputs B3, B2, B1, B0',     quantity: '1' },
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
          body: 'Set up the solderless breadboard. Identify the power rails (VCC = red, GND = blue). ' +
            'This experiment requires only one 74HC86 XOR gate IC and four LEDs.',
        },
        {
          label: 'Mount the three XOR gates.',
          circuitStepIndex: 1,
          body: 'Mount xor1 (74HC86) at column 5 row e — produces G2 = B3 ⊕ B2. ' +
            'Mount xor2 at column 12 row e — produces G1 = B2 ⊕ B1. ' +
            'Mount xor3 at column 19 row e — produces G0 = B1 ⊕ B0. ' +
            'All three gates may come from a single 74HC86 IC (quad package). ' +
            'Connect pin 14 to VCC and pin 7 to GND.',
        },
        {
          label: 'Wire all binary inputs.',
          circuitStepIndex: 2,
          body: 'B3 (col 1): red wire to xor1.A, plus a separate red wire to r_g3.p1 (G3 pass-through). ' +
            'B2 (col 2): orange wires to xor1.B and xor2.A. ' +
            'B1 (col 3): blue wires to xor2.B and xor3.A. ' +
            'B0 (col 4): green wire to xor3.B only. ' +
            'Set all inputs LOW to start.',
        },
        {
          label: 'Add resistors and LEDs.',
          circuitStepIndex: 3,
          body: 'Place r_g3 (col 22, row h) and led_g3 red (col 26, row h) for G3. ' +
            'Place r_g2 (col 8, row c) and led_g2 yellow (col 12, row c) for G2. ' +
            'Place r_g1 (col 15, row c) and led_g1 green (col 19, row c) for G1. ' +
            'Place r_g0 (col 22, row c) and led_g0 blue (col 26, row c) for G0. ' +
            'G3 and G0 are in different banks to avoid net conflicts.',
        },
        {
          label: 'Connect output wires and ground returns.',
          circuitStepIndex: 4,
          body: 'B3 pass-through: wire from col 1, row b → r_g3 p1. Then r_g3 p2 → led_g3 anode. ' +
            'Each XOR output → resistor p1 → LED anode. All LED cathodes → GND rail. ' +
            'Apply +5 V. With all inputs LOW, all outputs should be LOW and all LEDs off.',
        },
        {
          label: 'Test: Binary 0011 → Gray 0010.',
          circuitStepIndex: 5,
          body: 'Set B3=0, B2=0, B1=1, B0=1. ' +
            'G3=0 (B3 passthrough, off), G2 = 0⊕0 = 0 (off), ' +
            'G1 = 0⊕1 = 1 (green ON), G0 = 1⊕1 = 0 (off). ' +
            'Observe that only the G1 green LED illuminates.',
        },
        {
          label: 'Test: Binary 0111 → Gray 0100.',
          circuitStepIndex: 6,
          body: 'Set B3=0, B2=1, B1=1, B0=1. ' +
            'G2 = 0⊕1 = 1 (yellow ON), G1 = 1⊕1 = 0 (off), G0 = 1⊕1 = 0 (off). ' +
            'Only the G2 yellow LED should illuminate. ' +
            'Compare all 8 combinations with the truth table.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V DC. One 74HC86 quad-XOR IC powers all three XOR gates.',
        'Note the unit-distance property: adjacent Gray code values differ in exactly one bit position.',
        'Decimal 3 (0011) and decimal 4 (0100) in binary differ in three bits, but in Gray code ' +
        '(0010 and 0110) they differ in only one bit — demonstrating the advantage of Gray code.',
      ],
      table: {
        headers: ['B3', 'B2', 'B1', 'B0', 'Decimal', 'G3', 'G2', 'G1', 'G0', 'Gray Code'],
        rows: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, '0000'],
          [0, 0, 0, 1, 1, 0, 0, 0, 1, '0001'],
          [0, 0, 1, 0, 2, 0, 0, 1, 1, '0011'],
          [0, 0, 1, 1, 3, 0, 0, 1, 0, '0010'],
          [0, 1, 0, 0, 4, 0, 1, 1, 0, '0110'],
          [0, 1, 0, 1, 5, 0, 1, 1, 1, '0111'],
          [0, 1, 1, 0, 6, 0, 1, 0, 1, '0101'],
          [0, 1, 1, 1, 7, 0, 1, 0, 0, '0100'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The Binary-to-Gray converter was successfully built using three 74HC86 XOR gates. ' +
        'The output LEDs correctly displayed the Gray code for all 8 tested binary inputs, ' +
        'matching the truth table and confirming the equations G3=B3, G2=B3⊕B2, G1=B2⊕B1, G0=B1⊕B0.',

        'The unit-distance property was verified: consecutive Gray code values differed in exactly ' +
        'one LED state change, whereas direct binary counting shows multiple simultaneous transitions. ' +
        'This makes Gray code ideal for position encoders where multi-bit glitches during transitions ' +
        'could cause large transient errors.',

        'The reverse Gray-to-Binary conversion requires cascading XOR operations (each binary bit ' +
        'depends on all higher Gray bits), which can be implemented with the same XOR gate IC ' +
        'by chaining outputs instead of fanning out from independent inputs.',
      ],
    },
  ],
};
