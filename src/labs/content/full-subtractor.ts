import { type LabContent } from '@/labs/lab-content.types';

export const FullSubtractorContent: LabContent = {
  id: 'full-subtractor',
  title: 'Full Subtractor',
  circuitId: 'full-subtractor',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A Full Subtractor is a combinational logic circuit that performs binary subtraction of three bits: minuend A, subtrahend B, and borrow-in Bin (carry from a previous less-significant stage). It produces two outputs: the Difference D and the Borrow-out Bout. The Full Subtractor extends the Half Subtractor by handling the additional borrow-in bit, enabling cascading for multi-bit subtraction.',
        'The Boolean expressions for the Full Subtractor are derived from its truth table using Karnaugh maps or direct observation: Difference D = A ⊕ B ⊕ Bin. Borrow-out Bout = A\'·B + A\'·Bin + B·Bin = A\'·(B + Bin) + B·Bin. An equivalent factored form convenient for implementation is: Bout = A\'·B + Bin·(A ⊕ B)\' = A\'·B + Bin·(A XNOR B), but the most gate-efficient realisation uses the intermediate term P = A ⊕ B: Bout = A\'·B + Bin·P\', where P\' = NOT(A⊕B). Alternatively, Bout = (A·B\')\'·... A cleaner derivation: Bout = A\'·B·Bin\' + A\'·B\'·Bin + A·B·Bin + A\'·B·Bin, which simplifies to A\'B + BinB + A\'Bin.',
        'Gate-level implementation: two XOR gates (74HC86) compute P = A⊕B and D = P⊕Bin. A NOT gate (74HC04) computes A\'. Two AND gates (74HC08) compute A\'·B and Bin·(A\'·B + additional terms) — depending on the chosen minimised expression. One OR gate (74HC32) combines the AND terms to produce Bout. Total ICs: 1× 74HC86, 1× 74HC04, 1× 74HC08, 1× 74HC32.',
        'A Full Subtractor can also be realised from two Half Subtractors: first HS computes D1 = A⊕B and Bout1 = A\'·B; second HS computes D = D1⊕Bin and Bout2 = D1\'·Bin; final Bout = Bout1 + Bout2 via one OR gate. This modular construction mirrors the Full Adder from two Half Adders and is instructive for understanding combinational design methodology.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC86 Quad 2-input XOR IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC04 Hex Inverter IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC32 Quad 2-input OR IC', specification: 'DIP-14', quantity: '1' },
        { name: 'LED', specification: 'Green, 5 mm (Difference output)', quantity: '1' },
        { name: 'LED', specification: 'Red, 5 mm (Borrow-out output)', quantity: '1' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '2' },
        { name: 'SPDT Switch / Jumper', specification: 'Logic input (A, B, Bin)', quantity: '3' },
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
          label: 'Set up breadboard and power rails',
          body: 'Place all four ICs on the breadboard, each straddling the centre groove. Connect pin 14 to +5 V and pin 7 to GND for all ICs (74HC86, 74HC04, 74HC08, 74HC32). Set up three input switches (A, B, Bin) using the HIGH/LOW switch arrangement with 10 kΩ pull-down resistors. Verify supply voltages at each IC\'s Vcc pin before proceeding.',
          circuitStepIndex: 0,
        },
        {
          label: 'Wire XOR gates for Difference path',
          body: 'Wire XOR gate 1 (74HC86, pins 1,2→3): connect A to pin 1, B to pin 2; intermediate term P = A⊕B appears on pin 3. Wire XOR gate 2 (74HC86, pins 4,5→6): connect P (pin 3) to pin 4, Bin to pin 5; Difference output D = P⊕Bin = A⊕B⊕Bin appears on pin 6. Connect pin 6 through a 330 Ω resistor to the green LED (anode); cathode to GND.',
          circuitStepIndex: 1,
        },
        {
          label: 'Wire NOT gate and AND gates for Borrow path',
          body: "Wire NOT gate (74HC04, pin 1→2): connect A to pin 1; A' appears on pin 2. Wire AND gate 1 (74HC08, pins 1,2→3): connect A' (74HC04 pin 2) to pin 1 and B to pin 2; term T1 = A'·B appears on pin 3. Wire AND gate 2 (74HC08, pins 4,5→6): connect B to pin 4 and Bin to pin 5; term T2 = B·Bin appears on pin 6.",
          circuitStepIndex: 2,
        },
        {
          label: 'Wire OR gate for Borrow-out',
          body: 'Wire OR gate 1 (74HC32, pins 1,2→3): connect T1 (74HC08 pin 3) to pin 1 and T2 (74HC08 pin 6) to pin 2. Partial Borrow T1+T2 appears on pin 3. For full accuracy, a third term A\'·Bin should also be ORed in. Wire AND gate 3 (74HC08, pins 9,10→8): connect A\' to pin 10 and Bin to pin 9; T3 = A\'·Bin on pin 8. Wire OR gate 2 (74HC32, pins 4,5→6): connect (T1+T2) to pin 4 and T3 to pin 5; Bout on pin 6. Connect Bout through a 330 Ω resistor to the red LED.',
          circuitStepIndex: 3,
        },
        {
          label: 'Verify all wiring connections',
          body: 'Before applying power, trace every wire: A must reach XOR1 pin 1, NOT pin 1; B must reach XOR1 pin 2, AND1 pin 2, AND2 pin 4; Bin must reach XOR2 pin 5, AND2 pin 5, AND3 pin 9; P (XOR1 out) must reach XOR2 pin 4. Confirm all unused gate inputs are tied to GND (not left floating, as floating CMOS inputs can oscillate and consume excess power).',
          circuitStepIndex: 4,
        },
        {
          label: 'Test all 8 input combinations',
          body: 'Apply all eight input combinations (A, B, Bin) from 000 to 111. For each combination record the Difference LED (green) and Borrow-out LED (red) states. Compare with the Full Subtractor truth table. Key cases: (0,1,0) → D=1, Bout=1; (0,0,1) → D=1, Bout=1; (1,1,1) → D=1, Bout=1; (1,0,0) → D=1, Bout=0. Document any discrepancies and troubleshoot with a probe.',
          circuitStepIndex: 5,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Full Subtractor truth table. D = A⊕B⊕Bin, Bout = A\'B + BBin + A\'Bin.',
      ],
      table: {
        headers: ['A', 'B', 'Bin', 'D (observed)', 'Bout (observed)', 'D (expected)', 'Bout (expected)'],
        rows: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 1, 1, 1, 1, 1],
          [0, 1, 0, 1, 1, 1, 1],
          [0, 1, 1, 0, 1, 0, 1],
          [1, 0, 0, 1, 0, 1, 0],
          [1, 0, 1, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1, 1],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The Full Subtractor circuit has been successfully implemented and verified. All eight input combinations produce the correct Difference and Borrow-out outputs, matching the theoretical truth table.',
        'The circuit correctly handles the three-input subtraction A − B − Bin, including the case where multiple borrows cascade, as evidenced by the correct output for (0,1,1) → D=0, Bout=1 and (1,1,1) → D=1, Bout=1.',
        'By cascading Full Subtractors (connecting each Bout to the next Bin), multi-bit binary subtraction can be performed. In practice, subtraction in digital systems is often implemented using two\'s complement addition, but the Full Subtractor provides direct insight into borrow propagation and binary arithmetic fundamentals.',
      ],
    },
  ],
};
