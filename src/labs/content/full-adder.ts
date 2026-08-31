import { type LabContent } from '@/labs/lab-content.types';

export const FullAdderContent: LabContent = {
  id: 'full-adder',
  title: 'Full Adder',
  circuitId: 'full-adder',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A Full Adder is a combinational logic circuit that computes the arithmetic sum of three input bits: augend A, addend B, and carry-in Cin. It produces two outputs: the Sum bit and the Carry-out bit (Cout). Unlike a Half Adder, the Full Adder can accept a carry from a previous less-significant stage, making it suitable for chaining into multi-bit ripple-carry or carry-look-ahead adder architectures.',
        'The Boolean expressions for a Full Adder are derived from its truth table. Sum = A ⊕ B ⊕ Cin (three-input XOR). Cout = (A · B) + (B · Cin) + (A · Cin) = (A · B) + Cin · (A ⊕ B). The Cout expression can be factored using the intermediate XOR term P = A ⊕ B: Cout = (A · B) + (Cin · P), which directly maps to the gate-level implementation: two XOR gates for Sum, two AND gates and one OR gate for Cout.',
        'Gate-level implementation using 74HC-series ICs: two 74HC86 (quad XOR) gates for the Sum path, two gates from a 74HC08 (quad AND) for the carry generation, and one gate from a 74HC32 (quad OR) for the carry combination. Total IC count: 1× 74HC86, 1× 74HC08, 1× 74HC32. All three ICs are DIP-14 packages powered from a 5 V supply.',
        'A 4-bit ripple-carry adder is constructed by cascading four Full Adders in series, with each stage\'s Cout connected to the next stage\'s Cin. The carry "ripples" from LSB to MSB, introducing a cumulative propagation delay. The total worst-case delay is 4 × (carry propagation time per stage), which limits the maximum operating frequency of the adder.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC86 Quad 2-input XOR IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC32 Quad 2-input OR IC', specification: 'DIP-14', quantity: '1' },
        { name: 'LED', specification: 'Green, 5 mm (for Sum output)', quantity: '1' },
        { name: 'LED', specification: 'Red, 5 mm (for Cout output)', quantity: '1' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '2' },
        { name: 'SPDT Switch / Jumper', specification: 'Input logic selection (A, B, Cin)', quantity: '3' },
        { name: 'DC Power Supply', specification: '5 V regulated', quantity: '1' },
        { name: 'Bread Board', specification: 'Full size, 830 tie-points', quantity: '1' },
        { name: 'Connecting Wires', specification: '22 AWG solid-core jumper wires', quantity: '30' },
      ],
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Set up breadboard and power supply',
          body: 'Place the breadboard on a static-free surface and connect the 5 V regulated supply to the power rails. Set up three input switches (A, B, Cin): wire each switch so that one position drives the line to +5 V (logic 1) via a direct connection and the other position drives it to GND through a 10 kΩ pull-down resistor (logic 0). Verify the supply voltage at the power rails with a multimeter before inserting ICs.',
          circuitStepIndex: 0,
        },
        {
          label: 'Insert and connect the XOR gates (74HC86)',
          body: 'Insert the 74HC86 straddling the centre groove. Connect pin 14 to +5 V and pin 7 to GND. Wire XOR gate 1 (pins 1 and 2 inputs, pin 3 output): connect input A to pin 1 and input B to pin 2. The output P = A ⊕ B appears on pin 3. Wire XOR gate 2 (pins 4 and 5 inputs, pin 6 output): connect P (pin 3) to pin 4 and Cin to pin 5. The Sum output S = P ⊕ Cin appears on pin 6. Connect pin 6 through a 330 Ω resistor to the green LED.',
          circuitStepIndex: 1,
        },
        {
          label: 'Insert and connect the AND gates (74HC08)',
          body: 'Insert the 74HC08, powering pin 14 (+5 V) and pin 7 (GND). Wire AND gate 1 (pins 1, 2 → pin 3): connect A to pin 1 and B to pin 2. This generates the carry term G1 = A·B on pin 3. Wire AND gate 2 (pins 4, 5 → pin 6): connect the P signal (XOR gate 1 output, pin 3 of 74HC86) to pin 4 and Cin to pin 5. This generates G2 = P·Cin = (A⊕B)·Cin on pin 6.',
          circuitStepIndex: 2,
        },
        {
          label: 'Insert and connect the OR gate (74HC32)',
          body: 'Insert the 74HC32, powering pin 14 (+5 V) and pin 7 (GND). Wire OR gate 1 (pins 1, 2 → pin 3): connect G1 (AND gate 1 output, pin 3 of 74HC08) to pin 1 and G2 (AND gate 2 output, pin 6 of 74HC08) to pin 2. The Carry-out Cout = G1 + G2 appears on pin 3. Connect pin 3 through a 330 Ω resistor to the red LED.',
          circuitStepIndex: 3,
        },
        {
          label: 'Wire all input connections',
          body: 'Double-check that all three inputs A, B, and Cin are connected to the correct IC pins: A → XOR1 pin 1, AND1 pin 1; B → XOR1 pin 2, AND1 pin 2; Cin → XOR2 pin 5, AND2 pin 5; P (XOR1 out) → XOR2 pin 4, AND2 pin 4. Verify all inter-IC wires. Confirm no pins are left floating (all unused gate inputs must be tied to Vcc or GND).',
          circuitStepIndex: 4,
        },
        {
          label: 'Connect internal wires between ICs',
          body: 'Verify the intermediate signal P = A ⊕ B (pin 3 of 74HC86) reaches both pin 4 of the second XOR gate (on the same 74HC86 IC) and pin 4 of 74HC08 (AND gate 2). Verify G1 (pin 3 of 74HC08) and G2 (pin 6 of 74HC08) both reach the OR gate inputs (pins 1 and 2 of 74HC32). Use short jumper wires and organise them neatly to facilitate fault-finding.',
          circuitStepIndex: 5,
        },
        {
          label: 'Test all 8 input combinations and verify outputs',
          body: 'Apply all eight input combinations (A, B, Cin) from 000 to 111 in binary order. For each combination, record the state of the green LED (Sum) and red LED (Cout). Compare with the Full Adder truth table. For example: (1,1,1) should give Sum=1, Cout=1. If any discrepancy is found, use a multimeter to probe intermediate signals P, G1, G2 and isolate the fault.',
          circuitStepIndex: 6,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Truth table verification for the Full Adder. Sum = A⊕B⊕Cin, Cout = AB + Cin(A⊕B). LED ON = logic 1.',
      ],
      table: {
        headers: ['A', 'B', 'Cin', 'Sum (observed)', 'Cout (observed)', 'Sum (expected)', 'Cout (expected)'],
        rows: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 1, 1, 0, 1, 0],
          [0, 1, 0, 1, 0, 1, 0],
          [0, 1, 1, 0, 1, 0, 1],
          [1, 0, 0, 1, 0, 1, 0],
          [1, 0, 1, 0, 1, 0, 1],
          [1, 1, 0, 0, 1, 0, 1],
          [1, 1, 1, 1, 1, 1, 1],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The Full Adder circuit has been successfully implemented using 74HC86 (XOR), 74HC08 (AND), and 74HC32 (OR) ICs. All eight input combinations were tested and the observed Sum and Carry-out outputs match the theoretical truth table exactly.',
        'The two-level gate implementation (XOR→Sum, AND/OR→Cout) correctly performs single-bit binary addition with carry-in. The intermediate signal P = A⊕B is efficiently shared between the Sum and Cout paths, minimising gate count.',
        'The Full Adder is a critical building block of arithmetic logic units (ALUs). Understanding its gate-level implementation provides the foundation for designing multi-bit adders, subtractors, comparators, and more complex arithmetic circuits.',
      ],
    },
  ],
};
