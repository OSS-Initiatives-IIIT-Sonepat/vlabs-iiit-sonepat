import { type LabContent } from '@/labs/lab-content.types';

export const HalfAdderContent: LabContent = {
  id: 'half-adder',
  title: 'Half Adder',
  circuitId: 'half-adder',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A half adder is a combinational logic circuit that performs addition of two single-bit binary inputs, ' +
        'A and B. It produces two outputs: a Sum bit and a Carry bit. The Sum is the result of the XOR ' +
        'operation on A and B (Sum = A ⊕ B), while the Carry is the result of the AND operation ' +
        '(Carry = A · B). The name "half" adder reflects that it cannot handle a carry input from a ' +
        'previous stage — that capability belongs to the full adder.',

        'The XOR gate (74HC86) implements the Sum output. It produces a HIGH output only when its two ' +
        'inputs differ — that is, when exactly one of A or B is HIGH. The AND gate (74HC08) implements ' +
        'the Carry output. It produces a HIGH output only when both A and B are HIGH simultaneously, ' +
        'representing a carry into the next binary digit position.',

        'In binary arithmetic, 0+0=00, 0+1=01, 1+0=01, and 1+1=10. The two bits of the result map ' +
        'directly to the Carry (most significant) and Sum (least significant) outputs of the half adder. ' +
        'The circuit is the fundamental building block of all binary adder architectures and forms the ' +
        'basis of arithmetic logic units (ALUs) in processors.',

        'Both the 74HC86 (XOR) and 74HC08 (AND) are CMOS logic ICs operating from 2 V to 6 V. ' +
        'They are quad-gate packages, meaning each IC contains four independent gates. In this experiment ' +
        'only one gate from each IC is used. Current-limiting resistors (330 Ω) protect the output LEDs ' +
        'from excessive current draw.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Breadboard',              specification: 'Standard 830-tie-point solderless breadboard', quantity: '1' },
        { name: '74HC86 XOR Gate IC',      specification: 'Quad 2-input XOR, DIP-14, 5 V supply',         quantity: '1' },
        { name: '74HC08 AND Gate IC',      specification: 'Quad 2-input AND, DIP-14, 5 V supply',         quantity: '1' },
        { name: 'Green LED',               specification: '5 mm, forward voltage ≈ 2.0 V (Sum output)',    quantity: '1' },
        { name: 'Yellow LED',              specification: '5 mm, forward voltage ≈ 2.1 V (Carry output)',  quantity: '1' },
        { name: 'Resistor 330 Ω',          specification: '¼ W, carbon film, current limiter for LEDs',   quantity: '2' },
        { name: 'Push Button / DIP Switch', specification: 'For toggling logic inputs A and B',            quantity: '2' },
        { name: 'Regulated DC Power Supply', specification: '+5 V DC, 500 mA',                             quantity: '1' },
        { name: 'Digital Multimeter',      specification: 'For verifying supply voltage and continuity',   quantity: '1' },
        { name: 'Connecting Wires',        specification: 'M-M jumper wires, assorted colours',            quantity: '1 set' },
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
          body:
            'Place the breadboard on a clean, dry surface. Identify the terminal strips (rows a–e and f–j) ' +
            'and the power rails (red = VCC, blue = GND) running along each long edge. ' +
            'The centre gap electrically isolates the two halves of each row, allowing ICs to straddle it ' +
            'so that each pin lands in its own independent node.',
        },
        {
          label: 'Mount the 74HC86 XOR gate at column 7.',
          circuitStepIndex: 1,
          body:
            'Orient the 74HC86 DIP-14 IC so that pin 1 (marked by a notch or dot on the package) ' +
            'is at the top-left. Straddle it across the centre gap starting at column 7 — pins 1–7 ' +
            'land in rows e (columns 7–13) and pins 8–14 land in rows f (columns 13–7). ' +
            'Press firmly until all 14 pins are seated. This IC provides the XOR function for the Sum output.',
        },
        {
          label: 'Mount the 74HC08 AND gate at column 16.',
          circuitStepIndex: 2,
          body:
            'Place the 74HC08 DIP-14 IC in the same orientation, straddling the centre gap at column 16. ' +
            'Pins 1–7 land in rows e (columns 16–22) and pins 8–14 land in rows f (columns 22–16). ' +
            'This IC provides the AND function for the Carry output. ' +
            'Leave at least one column gap between the two ICs to avoid accidental bridging.',
        },
        {
          label: 'Wire input A (red) to both gates.',
          circuitStepIndex: 3,
          body:
            'Connect a red wire from column 3, row a (your input-A node) to the XOR gate pin A ' +
            '(column 7, row e). Then connect a second red wire from column 3, row b to the AND gate ' +
            'pin A (column 16, row e). Both gates now share the same A input. ' +
            'If using a push button for A, connect one terminal to column 3 and the other to the VCC rail.',
        },
        {
          label: 'Wire input B (blue) to both gates.',
          circuitStepIndex: 3,
          body:
            'Connect a blue wire from column 4, row a to the XOR gate pin B (column 8, row e). ' +
            'Then connect a second blue wire from column 4, row b to the AND gate pin B (column 17, row e). ' +
            'Both gates now also share input B. ' +
            'Verify the two input nodes are electrically separate — A and B must not bridge.',
        },
        {
          label: 'Place the 330 Ω resistors and output LEDs.',
          circuitStepIndex: 4,
          body:
            'Insert the first 330 Ω resistor spanning columns 22–25, row c (Sum path). ' +
            'Insert the green LED with its anode at column 25, row c and cathode at column 26, row c. ' +
            'Insert the second 330 Ω resistor spanning columns 26–29, row c (Carry path). ' +
            'Insert the yellow LED with its anode at column 29, row c and cathode at column 30, row c. ' +
            'Always keep the current-limiting resistor in series before the LED anode.',
        },
        {
          label: 'Connect the output wires and ground returns.',
          circuitStepIndex: 5,
          body:
            'Green wire: XOR output (column 9, row e) → left end of Sum resistor (column 22, row c). ' +
            'Orange wire: AND output (column 18, row e) → left end of Carry resistor (column 26, row c). ' +
            'Black wire: green LED cathode → GND rail. Black wire: yellow LED cathode → GND rail. ' +
            'Red wire: VCC pin of both ICs (pins 14) → VCC rail. Black wire: GND pins (pins 7) → GND rail.',
        },
        {
          label: 'Double-check all connections, then power on.',
          circuitStepIndex: 5,
          body:
            'Before applying power, trace every connection against the schematic. ' +
            'Check IC supply pins (VCC and GND) are connected. Verify no wire bridges across the centre gap. ' +
            'Set input switches A=0, B=0 (both LOW). ' +
            'Connect +5 V DC supply to the VCC rail and GND to the GND rail. ' +
            'Neither LED should light — this matches the truth table row A=0, B=0 → Sum=0, Carry=0.',
        },
        {
          label: 'Test all four input combinations.',
          circuitStepIndex: 6,
          body:
            'Toggle inputs through all four states and observe the LEDs:\n' +
            'A=0, B=0 → Sum=0 (green off), Carry=0 (yellow off)\n' +
            'A=0, B=1 → Sum=1 (green ON), Carry=0 (yellow off)\n' +
            'A=1, B=0 → Sum=1 (green ON), Carry=0 (yellow off)\n' +
            'A=1, B=1 → Sum=0 (green off), Carry=1 (yellow ON)\n' +
            'Record your observations in the table. Compare with the expected truth table.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Supply voltage VCC = +5 V DC. Both ICs (74HC86 and 74HC08) powered from the same rail.',
        'LED forward voltage: green ≈ 2.0 V, yellow ≈ 2.1 V. Series resistor = 330 Ω.',
        'LED current when ON: I = (VCC − V_f) / R = (5 − 2.0) / 330 ≈ 9.1 mA (within safe range).',
      ],
      table: {
        headers: ['Input A', 'Input B', 'Sum (XOR)', 'Carry (AND)', 'Green LED', 'Yellow LED'],
        rows: [
          [0, 0, 0, 0, 'OFF', 'OFF'],
          [0, 1, 1, 0, 'ON',  'OFF'],
          [1, 0, 1, 0, 'ON',  'OFF'],
          [1, 1, 0, 1, 'OFF', 'ON' ],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The half adder circuit was successfully constructed on the breadboard using a 74HC86 XOR gate ' +
        'and a 74HC08 AND gate. The green LED (Sum output) and yellow LED (Carry output) responded ' +
        'correctly to all four input combinations, confirming the truth table for binary addition of ' +
        'two single-bit numbers.',

        'The XOR gate correctly produced a HIGH Sum output only when the inputs differed (A≠B), and the ' +
        'AND gate correctly produced a HIGH Carry output only when both inputs were HIGH (A=B=1). ' +
        'The measured LED states matched the theoretical truth table in all cases, validating the ' +
        'combinational logic implementation.',

        'This experiment demonstrates the foundational role of the half adder in digital arithmetic. ' +
        'By chaining two half adders with an OR gate, a full adder capable of handling a carry-in ' +
        'can be constructed, forming the basis of multi-bit binary adders used in all modern processors.',
      ],
    },
  ],
};
