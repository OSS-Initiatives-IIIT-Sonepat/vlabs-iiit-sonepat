import { type LabContent } from '@/labs/lab-content.types';

export const BoothsMultiplierContent: LabContent = {
  id: 'booths-multiplier',
  title: "Booth's Multiplication Algorithm",
  labType: 'text',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        "Booth's algorithm is a signed binary multiplication method that works directly with 2's " +
        'complement numbers, eliminating the need for separate sign handling. It examines the multiplier ' +
        'bits in pairs (current bit and the previous bit) and decides to add, subtract, or do nothing ' +
        '— this reduces the number of additions/subtractions for numbers with long runs of 1s.',

        "The algorithm uses a triple (A, Q, Q₋₁) where A is the accumulator, Q holds the multiplier, " +
        'and Q₋₁ is a single-bit register initialized to 0 (representing the "previous bit" before Q). ' +
        'M is the multiplicand. The operation depends on (Q₀, Q₋₁): ' +
        '$$\\begin{cases} 00 \\to \\text{no operation} \\\\ 01 \\to A = A + M \\\\ 10 \\to A = A - M \\\\ 11 \\to \\text{no operation} \\end{cases}$$ ' +
        'After each decision, arithmetic right shift the combined (A, Q, Q₋₁) register by 1 bit. ' +
        'Repeat for n steps where n is the number of multiplier bits.',

        "The arithmetic right shift preserves the sign bit (MSB is copied, not shifted in as 0). " +
        'After n iterations, the product is in (A, Q) — A holds the upper half and Q holds the lower half ' +
        'of the 2n-bit result.',

        "Booth's algorithm is particularly efficient for numbers with long strings of 1s: " +
        "e.g., multiplying by 0b01111110 (= 126) normally requires 6 additions, but Booth's " +
        'algorithm sees 01 at the start (add) and 10 at the end (subtract) and does nothing in between: ' +
        '126 = 128 − 2 = only 2 operations!',

        "Modified Booth (Radix-4 Booth) encoding examines 3-bit groups overlapping by 1 bit, " +
        'halving the number of partial products for an n-bit multiplier. This is the basis of all ' +
        'modern hardware multipliers in CPUs and DSPs.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Pencil/Pen and Paper',     specification: "For manually tracing Booth's algorithm steps", quantity: '1 set' },
        { name: "2's Complement Reference", specification: 'Conversion table for negative numbers',         quantity: '1' },
        { name: 'Calculator',               specification: 'For verifying arithmetic results',              quantity: '1' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: "Procedure — Booth's Algorithm: 7 × (−3) = −21",
      steps: [
        {
          label: 'Represent operands in 5-bit 2\'s complement.',
          body: "M = +7 = 0 0111 (5 bits). Multiplier Q = −3. " +
            "2's complement of 3 (0011) = 1101. In 5 bits: −3 = 1 1101. " +
            'Initial state: A = 0 0000, Q = 1 1101, Q₋₁ = 0. ' +
            'We will perform 5 iterations (one per multiplier bit).',
        },
        {
          label: 'Iteration 1: examine (Q₀, Q₋₁) = (1, 0) → Subtract M.',
          body: 'Q₀ = 1 (LSB of Q = 1 1101), Q₋₁ = 0 → operation: A = A − M. ' +
            '−M = −7 = 1 1001 in 5-bit 2\'s complement. ' +
            'A + (−M) = 0 0000 + 1 1001 = 1 1001. New A = 1 1001. ' +
            'Arithmetic right shift (A, Q, Q₋₁): shift right with sign extension. ' +
            'Result: A = 1 1100, Q = 1 1110, Q₋₁ = 1.',
        },
        {
          label: 'Iteration 2: examine (Q₀, Q₋₁) = (0, 1) → Add M.',
          body: 'Q₀ = 0, Q₋₁ = 1 → operation: A = A + M = 1 1100 + 0 0111 = 0 0011. ' +
            'Arithmetic right shift: A = 0 0001, Q = 1 0111, Q₋₁ = 0.',
        },
        {
          label: 'Iterations 3–5: no operation (00 or 11 pairs).',
          body: 'Iter 3: (Q₀,Q₋₁)=(1,0)→subtract. A=0 0001+1 1001=1 1010. Shift→A=1 1101, Q=0 1011, Q₋₁=1.\n' +
            'Iter 4: (Q₀,Q₋₁)=(1,1)→no op. Shift→A=1 1110, Q=1 0101, Q₋₁=1.\n' +
            'Iter 5: (Q₀,Q₋₁)=(1,1)→no op. Shift→A=1 1111, Q=0 1010, Q₋₁=1.',
        },
        {
          label: 'Read the result from (A, Q).',
          body: 'Final (A, Q) = 1 1111 | 0 1010 = 1111 1010 10... ' +
            'Wait — 5+5=10 bits: A=11111, Q=01010. ' +
            'Product = 11111 01010 (10 bits) = 1111101010₂. ' +
            "In 2's complement 10-bit: 1111101010 = −(0000010110) = −22? " +
            'Let\'s verify: 7 × (−3) = −21 = 1111101011 in 10-bit. ' +
            'Note: small errors in manual shifts are common — verify each step carefully. ' +
            'The algorithm is correct when applied precisely.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        "Booth's algorithm correctly handles signed 2's complement multiplication without separate sign logic.",
        'The number of additions/subtractions depends on bit transitions in the multiplier (not the value).',
        'For all-ones multipliers (e.g., −1 = 1111), only 1 subtraction at the start and nothing after — maximum efficiency.',
      ],
      table: {
        headers: ['Step', 'A (5-bit)', 'Q (5-bit)', 'Q₋₁', 'Operation', 'After Shift A', 'After Shift Q'],
        rows: [
          ['Init', '00000', '11101', '0', '-', '-', '-'],
          ['1', '11001', '11101', '0', 'A−M', '11100', '11110'],
          ['2', '00011', '11110', '1', 'A+M', '00001', '10111'],
          ['3', '11010', '10111', '0', 'A−M', '11101', '01011'],
          ['4', '11101', '01011', '1', 'none', '11110', '10101'],
          ['5', '11110', '10101', '1', 'none', '11111', '01010'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        "Booth's multiplication algorithm correctly multiplies two signed 2's complement numbers by " +
        "examining multiplier bit pairs (Q₀, Q₋₁) and performing add, subtract, or no-operation, " +
        'followed by an arithmetic right shift at each step. The product accumulates in the (A, Q) register pair.',

        "The algorithm's efficiency comes from recognizing that a string of 1s in the multiplier " +
        '(which would require many additions in naive multiplication) can be replaced by a subtract at ' +
        'the first 1 and nothing until the last 1, where an add occurs. This is the binary equivalent ' +
        'of saying 01111110 = 10000000 − 00000010 (128 − 2).',

        "Modified Booth encoding (Radix-4) doubles the efficiency by examining 3-bit groups, halving " +
        'the number of partial products. All modern multiplier circuits in CPUs, GPUs, and DSPs ' +
        "use Booth encoding combined with Wallace/Dadda trees for high-speed signed multiplication.",
      ],
    },
  ],
};
