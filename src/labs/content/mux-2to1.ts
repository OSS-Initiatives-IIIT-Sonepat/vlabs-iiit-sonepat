import { type LabContent } from '@/labs/lab-content.types';

export const Mux2to1Content: LabContent = {
  id: 'mux-2to1',
  title: '2:1 Multiplexer',
  circuitId: 'mux',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A Multiplexer (MUX) is a combinational logic circuit that selects one of several input data lines and routes it to a single output line. The selection is controlled by select (address) inputs. A 2:1 MUX has two data inputs (A and B), one select input (S), and one output (Y). It acts as a digitally controlled switch: when S = 0, the output follows input A; when S = 1, the output follows input B.',
        'The Boolean expression for a 2:1 MUX is: Y = A·S\' + B·S. This can be derived from the truth table: for S=0, the B term (B·S = B·0 = 0) drops out and Y = A·1 = A; for S=1, the A term (A·S\' = A·0 = 0) drops out and Y = B·1 = B. The expression is a sum-of-products (SOP) form and maps directly to a two-AND, one-OR, one-NOT gate implementation.',
        'Gate-level implementation of the 2:1 MUX: one NOT gate (74HC04) to generate S\'; two AND gates (74HC08) — one computing A·S\' and the other computing B·S; one OR gate (74HC32) combining the AND outputs. Total ICs: 1× 74HC04, 1× 74HC08, 1× 74HC32. This is the canonical gate-level realisation.',
        'MUX circuits are fundamental in digital systems: they implement data routing in buses, enable time-division multiplexing (TDM) in communication systems, implement any Boolean function (a 2ⁿ:1 MUX can implement any n-variable function by connecting its data inputs to the required minterms), and form the basis of FPGA look-up tables (LUTs).',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC04 Hex Inverter IC', specification: 'DIP-14 (NOT gate for S\')', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC32 Quad 2-input OR IC', specification: 'DIP-14', quantity: '1' },
        { name: 'LED', specification: 'Green, 5 mm (output Y)', quantity: '1' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '1' },
        { name: 'SPDT Switch / Jumper', specification: 'Logic input (A, B, S)', quantity: '3' },
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
          body: 'Connect the 5 V supply to the breadboard power rails. Insert all three ICs (74HC04, 74HC08, 74HC32) on the breadboard, each straddling the centre groove. Connect pin 14 to +5 V and pin 7 to GND for all ICs. Prepare three input switches (A, B, S) using the HIGH/LOW switch arrangement. Label them clearly; S is the select line and A, B are the data inputs.',
          circuitStepIndex: 0,
        },
        {
          label: 'Wire the NOT gate for select complement',
          body: "Wire NOT gate (74HC04, pin 1→2): connect the select input S to pin 1. The complement S' appears on pin 2. This single NOT gate is the only active logic element solely dedicated to the control path. Verify that S' correctly toggles opposite to S by probing with a multimeter at this stage — when S = HIGH (+5 V), pin 2 should read LOW (≈0 V).",
          circuitStepIndex: 1,
        },
        {
          label: 'Wire the two AND gates',
          body: "Wire AND gate 1 (74HC08, pins 1,2→3): connect data input A to pin 1 and S' (74HC04 pin 2) to pin 2. Output A·S' appears on pin 3. Wire AND gate 2 (74HC08, pins 4,5→6): connect data input B to pin 4 and S to pin 5. Output B·S appears on pin 6. Both AND gates are implementing the two product terms of the MUX Boolean expression.",
          circuitStepIndex: 2,
        },
        {
          label: 'Wire the OR gate for output Y',
          body: "Wire OR gate (74HC32, pins 1,2→3): connect A·S' (74HC08 pin 3) to pin 1 and B·S (74HC08 pin 6) to pin 2. The MUX output Y = A·S' + B·S appears on pin 3. Connect pin 3 through a 330 Ω current-limiting resistor to the anode of the green LED; cathode to GND. The LED illuminates when Y = 1.",
          circuitStepIndex: 3,
        },
        {
          label: 'Wire all signal connections and verify',
          body: 'Trace all connections: A → AND1 pin 1; B → AND2 pin 4; S → NOT pin 1 AND AND2 pin 5; S\' (NOT out) → AND1 pin 2. Confirm no floating inputs on unused gates — tie unused inputs to GND. Apply S=0 and toggle A between 0 and 1: the LED should mirror A. Apply S=1 and toggle B: the LED should mirror B while ignoring A.',
          circuitStepIndex: 4,
        },
        {
          label: 'Test S=0 and S=1 routing systematically',
          body: 'Test all eight combinations of (A, B, S). For S=0: Y should equal A regardless of B — verify (A=0,B=0,S=0)→Y=0, (A=0,B=1,S=0)→Y=0, (A=1,B=0,S=0)→Y=1, (A=1,B=1,S=0)→Y=1. For S=1: Y should equal B regardless of A — verify (A=0,B=0,S=1)→Y=0, (A=0,B=1,S=1)→Y=1, (A=1,B=0,S=1)→Y=0, (A=1,B=1,S=1)→Y=1. Record all observations.',
          circuitStepIndex: 5,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        "2:1 MUX truth table. Y = A·S' + B·S. When S=0, Y follows A; when S=1, Y follows B.",
      ],
      table: {
        headers: ['A', 'B', 'S', 'Y (observed)', 'Y (expected)', 'Selected input'],
        rows: [
          [0, 0, 0, 0, 0, 'A'],
          [0, 1, 0, 0, 0, 'A'],
          [1, 0, 0, 1, 1, 'A'],
          [1, 1, 0, 1, 1, 'A'],
          [0, 0, 1, 0, 0, 'B'],
          [0, 1, 1, 1, 1, 'B'],
          [1, 0, 1, 0, 0, 'B'],
          [1, 1, 1, 1, 1, 'B'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The 2:1 Multiplexer has been successfully implemented using 74HC04 (NOT), 74HC08 (AND), and 74HC32 (OR) ICs. All eight input combinations were tested and the observed output Y correctly follows input A when S=0 and input B when S=1.',
        'The MUX functions as a digitally controlled data selector, routing exactly one of its input signals to the output based on the binary value of the select line. The gate-level implementation confirms the Boolean expression Y = A·S\' + B·S.',
        'The 2:1 MUX is a foundational building block: larger MUX circuits (4:1, 8:1) are constructed by hierarchically combining 2:1 MUXes. In programmable logic, MUX-based LUTs form the core of FPGA fabric, and understanding the 2:1 MUX behaviour is essential for all subsequent digital design work.',
      ],
    },
  ],
};
