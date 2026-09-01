import { type LabContent } from '@/labs/lab-content.types';

export const ClaAdderContent: LabContent = {
  id: 'cla-adder',
  title: 'Carry-Look-Ahead Adder (CLA)',
  labType: 'text',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A Ripple Carry Adder (RCA) chains n full adders in series: each stage must wait for the carry ' +
        'from the previous stage before it can compute its sum and carry. The total propagation delay ' +
        'is $n \\times t_{FA}$ where $t_{FA}$ is the delay through one full adder. For a 64-bit adder, ' +
        'this means 64 gate delays — unacceptably slow for modern processors.',

        'The Carry-Look-Ahead Adder (CLA) solves this by pre-computing all carry signals in parallel ' +
        'before the actual addition. Two auxiliary signals are defined for each bit position $i$: ' +
        'the Generate signal $G_i = A_i \\cdot B_i$ (this stage will definitely produce a carry regardless of carry-in) ' +
        'and the Propagate signal $P_i = A_i \\oplus B_i$ (this stage will propagate an incoming carry).',

        'With G and P defined, the carry into bit position $i+1$ is: ' +
        '$$C_{i+1} = G_i + P_i \\cdot C_i$$ ' +
        'Expanding this recursively for a 4-bit CLA: ' +
        '$$C_1 = G_0 + P_0 C_0$$ ' +
        '$$C_2 = G_1 + P_1 G_0 + P_1 P_0 C_0$$ ' +
        '$$C_3 = G_2 + P_2 G_1 + P_2 P_1 G_0 + P_2 P_1 P_0 C_0$$ ' +
        '$$C_4 = G_3 + P_3 G_2 + P_3 P_2 G_1 + P_3 P_2 P_1 G_0 + P_3 P_2 P_1 P_0 C_0$$ ' +
        'All four carry signals are computed simultaneously from the original inputs — O(1) depth, not O(n).',

        'The sum bits are then: $S_i = P_i \\oplus C_i$ (since $P_i = A_i \\oplus B_i$, this gives the XOR of three signals). ' +
        'The CLA logic block computes G, P, and all carries in a fixed number of gate levels (typically 2–3 AND-OR levels). ' +
        'Sum computation adds one more XOR level. Total: $\\approx 4$ gate levels for any width, vs $2n$ for RCA.',

        'Block CLA (BCLA) extends this to wider adders: a 16-bit CLA uses four 4-bit CLA units, with a ' +
        'second-level CLA that looks ahead across the four blocks using block-level Generate and Propagate ' +
        'signals. This gives O(log n) depth for arbitrary width.',

        'The 74HC283 is a 4-bit CLA adder IC — it implements exactly the equations above in CMOS logic, ' +
        'providing fast binary addition with carry-in and carry-out for cascading.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Pencil/Pen and Paper',     specification: 'For working through CLA equations',            quantity: '1 set' },
        { name: '74HC283 CLA Adder IC',     specification: '4-bit binary full adder with fast carry',      quantity: '1 (ref)' },
        { name: 'Logic Analyser / Simulator', specification: 'For measuring propagation delay comparison', quantity: '1 (opt)' },
        { name: 'Digital Logic Textbook',   specification: 'Mano or Patterson & Hennessy for CLA chapter', quantity: '1' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure — Verify CLA Equations',
      steps: [
        {
          label: 'Add A=0b1010 and B=0b0110 using RCA.',
          body: 'Ripple carry: start at bit 0. ' +
            'Bit 0: 0+0=0, C1=0. Bit 1: 1+1=0, C2=1. Bit 2: 0+1+C2=0, C3=1. Bit 3: 1+0+C3=0, C4=1. ' +
            'Result: 0b10000 (16 + 0 = 16 = 10+6). ' +
            'Ripple carry requires 4 sequential stages.',
        },
        {
          label: 'Compute G and P for the same inputs.',
          body: 'G_i = A_i · B_i and P_i = A_i ⊕ B_i for each bit: ' +
            'Bit 0: A0=0,B0=0 → G0=0, P0=0. ' +
            'Bit 1: A1=1,B1=1 → G1=1, P1=0. ' +
            'Bit 2: A2=0,B2=1 → G2=0, P2=1. ' +
            'Bit 3: A3=1,B3=0 → G3=0, P3=1.',
        },
        {
          label: 'Compute all carries in parallel using CLA equations.',
          body: 'C0=0 (carry-in). Using the CLA equations with G/P computed above: ' +
            'C1 = G0 + P0·C0 = 0 + 0·0 = 0. ' +
            'C2 = G1 + P1·G0 + P1·P0·C0 = 1 + 0 + 0 = 1. ' +
            'C3 = G2 + P2·G1 + P2·P1·G0 + P2·P1·P0·C0 = 0 + 1·1 + 0 + 0 = 1. ' +
            'C4 = G3 + P3·G2 + P3·P2·G1 + ... = 0 + 1·0 + 1·1·1 + 0 = 1. ' +
            'All carries computed simultaneously!',
        },
        {
          label: 'Compute sum bits.',
          body: 'S_i = P_i ⊕ C_i: ' +
            'S0 = P0 ⊕ C0 = 0 ⊕ 0 = 0. ' +
            'S1 = P1 ⊕ C1 = 0 ⊕ 0 = 0. ' +
            'S2 = P2 ⊕ C2 = 1 ⊕ 1 = 0. ' +
            'S3 = P3 ⊕ C3 = 1 ⊕ 1 = 0. ' +
            'Result: S[3:0]=0000, C4=1 → 1 0000 = 16 ✓.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Both RCA and CLA give the same result for the addition. The difference is in propagation delay.',
        'The CLA computes all carry bits in one parallel operation using AND-OR logic, independent of word width.',
      ],
      table: {
        headers: ['Adder Type', '4-bit delay', '8-bit delay', '16-bit delay', '32-bit delay'],
        rows: [
          ['Ripple Carry (RCA)', '4 × t_FA', '8 × t_FA', '16 × t_FA', '32 × t_FA'],
          ['Carry Look-Ahead (CLA)', '~4 levels', '~4 levels', '~6 levels (2-level CLA)', '~8 levels (3-level)'],
          ['74HC283 (4-bit CLA)', '9 ns (typ)', '18 ns (2×283)', '36 ns (4×283)', '72 ns (8×283)'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The Carry-Look-Ahead Adder eliminates the sequential carry propagation of the ripple carry adder ' +
        'by computing all carry signals simultaneously using pre-computed Generate and Propagate signals. ' +
        'The key insight is that $C_{i+1} = G_i + P_i \\cdot C_i$ can be fully expanded for any bit position ' +
        'using only the original inputs and carry-in, enabling parallel computation.',

        'The 4-bit CLA equations demonstrate O(1) carry propagation depth (fixed gate levels regardless ' +
        'of the position). Extending to wider words uses hierarchical block CLA, achieving O(log n) depth ' +
        'for n-bit addition — critical for the arithmetic units of high-performance processors.',

        'Modern processor ALUs use variations of CLA logic (prefix adders: Kogge-Stone, Brent-Kung, ' +
        'Han-Carlson) that further optimize the trade-off between gate depth, fan-out, and wiring area ' +
        'in VLSI implementations.',
      ],
    },
  ],
};
