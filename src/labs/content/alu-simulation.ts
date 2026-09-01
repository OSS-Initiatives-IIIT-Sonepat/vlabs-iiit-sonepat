import { type LabContent } from '@/labs/lab-content.types';

export const aluSimulation: LabContent = {
  id: 'alu-simulation',
  title: '4-bit ALU Operations',
  labType: 'simulation',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'An Arithmetic Logic Unit (ALU) is the combinational circuit within a CPU that performs integer arithmetic and bitwise logic operations. A 4-bit ALU operates on two 4-bit operands (A and B) and produces a 4-bit result along with status flags.',
        'The ALU supports eight operations in this simulator: ADD, SUB (using two\'s complement), AND, OR, XOR, NOT A (bitwise complement of A), NAND, and NOR.',
        'Two\'s complement subtraction: A − B is implemented as A + (~B + 1). This allows the same adder hardware to perform both addition and subtraction.',
        'Flag generation: The Zero flag (Z) is set when the result equals zero. The Sign flag (S) reflects the most significant bit of the result, indicating a negative value in signed arithmetic. The Carry flag (CY) captures the carry-out from the MSB adder stage. The Overflow flag (OV) detects signed arithmetic overflow — when the mathematical result cannot be represented in 4-bit two\'s complement. The Parity flag (P) is 1 when the result has an even number of 1-bits.',
        'Signed overflow occurs when two positive numbers add to give a negative result, or two negative numbers add to give a positive result. For 4-bit two\'s complement: numbers range from −8 (1000₂) to +7 (0111₂).',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus',
      items: [
        { name: 'Virtual 4-bit ALU Module', specification: 'Software simulation — no physical components required' },
        { name: 'Input Registers A and B', specification: '4-bit each, toggle-bit interface' },
        { name: 'Operation Selector', specification: '8-operation multiplexer: ADD, SUB, AND, OR, XOR, NOT, NAND, NOR' },
        { name: 'Flag Register', specification: 'Z, S, CY, OV, P flags — 1-bit each' },
        { name: 'Result Register', specification: '4-bit output with hex and decimal display' },
      ],
    },
    {
      id: 'simulation',
      type: 'simulation',
      title: 'Simulation',
      simType: 'alu',
      description: 'Click any bit cell to toggle it. Change the operation using the dropdown — results update automatically.',
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'ADD with carry',
          body: 'Set Input A = 1111 (0xF = 15) and Input B = 0001 (0x1 = 1). Select ADD.\nObserve: Result = 0000, CY=1 (carry out), Z=1 (result is zero), OV=0.\nThis demonstrates unsigned overflow: 15 + 1 = 16, but only 4 bits are kept.',
        },
        {
          label: 'Signed overflow',
          body: 'Set A = 0111 (7) and B = 0001 (1). Select ADD.\nObserve: Result = 1000 (−8 in two\'s complement), OV=1.\nAdding two positive numbers gives a negative result — this is signed overflow.',
        },
        {
          label: 'SUB with borrow',
          body: 'Set A = 0011 (3) and B = 0101 (5). Select SUB.\nObserve: CY=1 (borrow needed), Result = 1110 (−2 in two\'s complement = 14 unsigned).',
        },
        {
          label: 'Bitwise AND',
          body: 'Set A = 1010 and B = 1100. Select AND.\nExpected: 1010 & 1100 = 1000.\nAND is used for masking: it clears specific bits while preserving others.',
        },
        {
          label: 'XOR for comparison',
          body: 'Set A and B to equal values, e.g. both = 0110. Select XOR.\nObserve: Result = 0000, Z=1. XOR of equal values is always zero — useful for equality testing.',
        },
        {
          label: 'Parity check',
          body: 'Try several different values and observe the Parity flag P.\nP=1 when the result has an even number of 1-bits (even parity).\nTry A=0111, B=0000, ADD: Result=0111 has three 1-bits → P=0 (odd parity).',
        },
      ],
    },
    {
      id: 'observation',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Record the results of each ALU operation below. Note any flag states that differ from your predictions.',
      ],
      table: {
        headers: ['Operation', 'A (hex)', 'B (hex)', 'Result (hex)', 'Z', 'S', 'CY', 'OV', 'P'],
        rows: [
          ['ADD', '0xF', '0x1', '', '', '', '', '', ''],
          ['ADD', '0x7', '0x1', '', '', '', '', '', ''],
          ['SUB', '0x3', '0x5', '', '', '', '', '', ''],
          ['AND', '0xA', '0xC', '', '', '', '', '', ''],
          ['OR',  '0xA', '0xC', '', '', '', '', '', ''],
          ['XOR', '0x6', '0x6', '', '', '', '', '', ''],
          ['NOT A', '0x5', '—', '', '', '', '', '', ''],
          ['NAND', '0xF', '0xF', '', '', '', '', '', ''],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'Through this simulation we observed the operation of a 4-bit ALU performing all eight fundamental operations. The flag register accurately captures the arithmetic state after each operation.',
        'Key findings: (1) Unsigned carry and signed overflow are distinct conditions and require separate flags. (2) Subtraction is implemented via two\'s complement addition, unifying the adder hardware. (3) Bitwise operations generate flags just like arithmetic operations, enabling conditional branching in real CPUs.',
        'The 4-bit ALU forms the computational core of every processor. Modern CPUs extend this to 64 bits and add many more operations, but the fundamental flag logic remains the same.',
      ],
    },
  ],
};
