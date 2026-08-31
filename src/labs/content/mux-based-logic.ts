import { type LabContent } from '@/labs/lab-content.types';

export const MuxBasedLogicContent: LabContent = {
  id: 'mux-based-logic',
  title: 'MUX-based Logic (Boolean Functions with MUX)',
  circuitId: 'mux-based-logic',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A 2:1 MUX is a universal logic element in the sense that any two-variable Boolean function can be realised by connecting constant logic values (0 or 1) or one of the input variables to its two data inputs, while using the other variable as the select input. A 2ⁿ:1 MUX can implement any n-variable Boolean function with no additional gates by exhaustively mapping the function\'s truth table to the data inputs.',
        'For a 2:1 MUX with select S and data inputs D0, D1 — output Y = D0·S\' + D1·S. To implement any 2-variable function f(A, B), assign S = A (one variable controls selection), then set D0 and D1 based on the function\'s behaviour: D0 = f(A=0, B) = a function of B only; D1 = f(A=1, B) = a function of B only. The possible values for D0 and D1 are {0, 1, B, B\'}.',
        'Example implementations: AND(A,B) — with S=A: f(0,B)=0, f(1,B)=B → D0=0, D1=B. OR(A,B) — with S=A: f(0,B)=B, f(1,B)=1 → D0=B, D1=1. XOR(A,B) — with S=A: f(0,B)=B, f(1,B)=B\' → D0=B, D1=B\'. XNOR(A,B) — D0=B\', D1=B. These assignments are read directly from columns of the truth table where A=0 and A=1 respectively.',
        'MUX-based logic synthesis is practically important in FPGAs (Field-Programmable Gate Arrays), where each logic cell is a small MUX-based Look-Up Table (LUT). A 4-input LUT can implement any 4-variable Boolean function by programming its 16 data inputs. Understanding MUX-as-logic reduces design to a table look-up, eliminating the need for algebraic minimisation in hardware.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: '74HC04 Hex Inverter IC', specification: 'DIP-14 (for B\' when needed)', quantity: '1' },
        { name: '74HC08 Quad 2-input AND IC', specification: 'DIP-14', quantity: '1' },
        { name: '74HC32 Quad 2-input OR IC', specification: 'DIP-14', quantity: '1' },
        { name: 'LED', specification: 'Green, 5 mm (output Y)', quantity: '1' },
        { name: 'Resistor (current limiting)', specification: '330 Ω, 0.25 W', quantity: '1' },
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
          label: 'Construct the 2:1 MUX base circuit',
          body: 'Build the standard 2:1 MUX gate circuit from the previous experiment: NOT gate (74HC04) for S\', AND gate 1 computing D0·S\', AND gate 2 computing D1·S, OR gate for the final output Y. Use A as the select line S. Leave the D0 and D1 inputs accessible at the breadboard — these will be changed for each function being implemented.',
          circuitStepIndex: 0,
        },
        {
          label: 'Implement AND(A,B) using the MUX',
          body: 'For AND(A,B) with S=A: connect D0 to GND (constant logic 0) and D1 to input B. The MUX output Y = 0·A\' + B·A = A·B = AND(A,B). Test all four combinations (A,B) ∈ {00,01,10,11} and verify the output matches the AND truth table. Record the LED state for each combination.',
          circuitStepIndex: 1,
        },
        {
          label: 'Implement OR(A,B) using the MUX',
          body: 'For OR(A,B) with S=A: connect D0 to input B (f(0,B)=B) and D1 to +5V (constant logic 1, f(1,B)=1). The MUX output Y = B·A\' + 1·A = A\'B + A = A + B = OR(A,B). Test all four input combinations and verify the output matches the OR truth table. Compare with the direct OR gate output to confirm equivalence.',
          circuitStepIndex: 2,
        },
        {
          label: 'Implement XOR(A,B) using the MUX',
          body: "For XOR(A,B) with S=A: f(0,B)=B and f(1,B)=B' (the complement of B). Connect D0 to B and D1 to B' (output of the NOT gate driven by B instead of A — rewire the 74HC04 input to B for this step). The MUX output Y = B·A' + B'·A = A⊕B = XOR(A,B). Test all four combinations and verify the XOR truth table.",
          circuitStepIndex: 3,
        },
        {
          label: 'Document all three function implementations',
          body: 'Compile the observation table showing, for each function (AND, OR, XOR), the D0 and D1 connections used and the measured outputs for all four (A,B) input combinations. Verify that the MUX correctly realises each Boolean function purely by changing the D0 and D1 wiring — without modifying the MUX structure itself. This demonstrates the programmability of MUX-based logic.',
          circuitStepIndex: 4,
        },
        {
          label: 'Generalise: determine D0, D1 for any function',
          body: 'For an arbitrary 2-variable function f(A,B), write the truth table and read off: D0 = f evaluated with A=0 (a function of B alone); D1 = f evaluated with A=1 (a function of B alone). If D0 or D1 evaluates to a constant {0,1} or to B or B\', wire accordingly. This procedure generalises to any n-variable function using a 2^(n-1):1 MUX with one variable as the data inputs. Demonstrate with NAND(A,B) as an additional exercise.',
          circuitStepIndex: 5,
        },
      ],
    },
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'MUX-based function implementation. Select line S = A for all functions. D0 and D1 are chosen from the function truth table columns at A=0 and A=1 respectively.',
      ],
      table: {
        headers: ['Function', 'D0 (A=0 column)', 'D1 (A=1 column)', 'A=0,B=0', 'A=0,B=1', 'A=1,B=0', 'A=1,B=1'],
        rows: [
          ['AND(A,B)', '0', 'B', 0, 0, 0, 1],
          ['OR(A,B)', 'B', '1', 0, 1, 1, 1],
          ['XOR(A,B)', 'B', "B'", 0, 1, 1, 0],
          ['NAND(A,B)', '1', "B'", 1, 1, 1, 0],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The experiment demonstrates that a 2:1 MUX can implement any 2-variable Boolean function by appropriately connecting its data inputs to constant 0, constant 1, input B, or its complement B\'. The MUX itself requires no modification between functions.',
        'AND, OR, and XOR were successfully realised using the same MUX hardware. The observed outputs matched the expected truth tables in all twelve test cases (four combinations per function).',
        'This MUX-as-logic principle is the operational foundation of FPGA look-up tables (LUTs). In a commercial FPGA, each LUT\'s data bits are programmed during device configuration, effectively implementing any desired Boolean function in a single hardware cell. Understanding this concept bridges the gap between combinational logic theory and modern programmable hardware.',
      ],
    },
  ],
};
