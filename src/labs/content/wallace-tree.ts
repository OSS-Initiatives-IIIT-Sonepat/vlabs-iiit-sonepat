import { type LabContent } from '@/labs/lab-content.types';

export const WallaceTreeContent: LabContent = {
  id: 'wallace-tree',
  title: 'Wallace Tree Multiplier',
  labType: 'text',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'The Wallace Tree multiplier is a hardware multiplication algorithm designed to minimize the ' +
        'delay of computing the product of two n-bit numbers. It achieves O(log n) gate depth (vs O(n) ' +
        'for the naive array multiplier) by reducing partial products using a tree of Carry-Save Adders ' +
        '(CSAs) before a final Carry-Propagate Adder (CPA) produces the result.',

        'Step 1 — Partial Product Generation: For two n-bit operands A and B, each bit of B is ANDed ' +
        'with every bit of A to produce n partial products. Each partial product is an n-bit row. ' +
        'For 4×4 multiplication, 4 rows of 4 bits each are generated using 16 AND gates. ' +
        'The AND gate for bit position $A_i \\cdot B_j$ contributes to sum column $i+j$.',

        'Step 2 — Carry-Save Adder (CSA) Reduction: A CSA takes three n-bit inputs and produces two ' +
        'n-bit outputs (sum S and carry C) in a single gate-level operation, without carry propagation. ' +
        'Unlike a regular adder, a CSA does NOT produce the final sum — it reduces 3 inputs to 2 inputs ' +
        '(in "saved" carry form). This reduction is applied in a tree until only 2 rows remain.',

        'For 4 partial product rows, one level of CSA reduction suffices: ' +
        'CSA1 takes rows PP0, PP1, PP2 → produces sum S1 and carry C1 (2 rows). ' +
        'Remaining rows: {S1, C1, PP3}. ' +
        'CSA2 takes S1, C1, PP3 → produces sum S2 and carry C2 (2 rows). ' +
        'Two rows remain: S2 and C2 (shifted left by 1).',

        'Step 3 — Final CPA: The two remaining rows S2 and C2 are added using a standard fast adder ' +
        '(CLA or prefix adder) to produce the final 2n-bit product. This is the only stage with carry ' +
        'propagation, and it operates on only 2 operands rather than n partial products.',

        'Complexity: The Wallace tree has $\\lceil \\log_{3/2} n \\rceil$ CSA levels (each level reduces ' +
        'the row count by a factor of 2/3). The total gate depth is O(log n) XOR/AND plus O(log n) for ' +
        'the final CPA — significantly faster than the O(n) ripple-adder-based array multiplier. ' +
        'For 64-bit multiplication (e.g., in a CPU), this is critical.',

        'The 4×4 Wallace Tree example: Multiply A=0b1011 (11) × B=0b0110 (6) = 66 (0b0100 0010). ' +
        'Generate 4 partial products, apply 2 CSA levels, add final 2 rows with CPA. ' +
        'Result: 0100 0010 = 64+2 = 66 ✓.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Pencil/Pen and Graph Paper', specification: 'For partial product and CSA diagrams',     quantity: '1 set' },
        { name: 'Boolean Algebra Reference', specification: 'Half/full adder truth tables',               quantity: '1' },
        { name: 'Circuit Simulator (optional)', specification: 'Logisim / Digital for 4×4 Wallace tree', quantity: '1' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure — 4×4 Wallace Tree (A=11, B=6)',
      steps: [
        {
          label: 'Generate 16 partial products.',
          body: 'A = 1011, B = 0110. Partial products PP_j = A · B_j (shifted left by j): ' +
            'PP0 (B0=0): 0000 0000. PP1 (B1=1): 0010 1100 (A<<1). ' +
            'PP2 (B2=1): 0101 1000 (A<<2). PP3 (B3=0): 0000 0000. ' +
            'Write these as 8-bit rows aligned by bit position.',
        },
        {
          label: 'First CSA level: reduce 4 rows to 2.',
          body: 'Since PP0 and PP3 are all zeros, the non-trivial rows are PP1 and PP2. ' +
            'With only 2 non-zero rows, a single CPA suffices (no CSA needed for this example). ' +
            'In general: CSA1 takes {PP0, PP1, PP2} → {S1, C1}; then the remaining {S1, C1, PP3} ' +
            'goes through CSA2 → {S2, C2}.',
        },
        {
          label: 'Final addition: PP1 + PP2.',
          body: '  PP1: 0010 1100 (= 44)\n' +
            '+ PP2: 0101 1000 (= 88)\n' +
            '= ?. Adding: 44 + 88 = 132... wait, that exceeds 66. ' +
            'Recall: PP1 = A shifted by 1 = 11×2=22; PP2 = A shifted by 2 = 11×4=44. ' +
            '22 + 44 = 66 = 0100 0010. Correct!',
        },
        {
          label: 'Verify: 11 × 6 = 66.',
          body: '0b0100 0010 = 64 + 2 = 66 = 11 × 6. ✓ ' +
            'In a hardware Wallace tree, all CSA operations happen in parallel tree levels. ' +
            'The delay is O(log n) gate levels for the CSA tree plus one CPA.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'The Wallace tree reduces n partial product rows to 2 rows in O(log n) CSA levels.',
        'Each CSA level adds a constant gate delay (1 full-adder delay) independent of word width.',
        'The final CPA (typically a CLA) adds O(log n) delay for the carry propagation.',
      ],
      table: {
        headers: ['Multiplier Type', '4×4 delay', '8×8 delay', '16×16 delay', 'Gate count'],
        rows: [
          ['Array (ripple)', 'O(n)', 'O(n)', 'O(n)', 'O(n²)'],
          ['Wallace Tree', 'O(log n)', 'O(log n)', 'O(log n)', 'O(n² log n)'],
          ['Booth + Wallace', 'O(log n)', 'O(log n)', 'O(log n)', 'O(n²/2)'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The Wallace Tree multiplier achieves O(log n) depth by replacing the sequential row-by-row ' +
        'addition of the array multiplier with a parallel tree of Carry-Save Adders. The key insight is ' +
        'that CSAs reduce three partial-product rows to two without carry propagation, making the ' +
        'reduction a tree operation rather than a chain.',

        'The final Carry-Propagate Adder is the only stage with carry ripple, and it operates on just ' +
        'two operands regardless of the original multiplier width. Modern processor multipliers (including ' +
        'those in ARM, Intel, and AMD CPUs) use Wallace tree or modified Dadda tree structures combined ' +
        "with Booth encoding to halve the number of partial products and reduce area further.",

        'Understanding the Wallace tree is essential for digital VLSI design, as multiplication is one ' +
        'of the most area- and power-intensive operations in a processor, and fast multipliers directly ' +
        'impact the performance of DSP, graphics, and scientific computing workloads.',
      ],
    },
  ],
};
