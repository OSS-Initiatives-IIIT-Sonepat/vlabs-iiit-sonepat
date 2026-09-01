import { type LabContent } from '@/labs/lab-content.types';

export const GateLevelMinimizationContent: LabContent = {
  id: 'gate-level-minimization',
  title: 'Gate-Level Minimization using Karnaugh Maps',
  labType: 'text',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Gate-level minimization is the process of finding the simplest Boolean expression for a logic ' +
        'function, thereby reducing the number of gates and interconnects in the final circuit. The ' +
        'Karnaugh map (K-map) is a graphical method that exploits human pattern recognition to identify ' +
        'adjacent minterms that can be combined into simpler product terms.',

        'A minterm is a product term in which every variable appears exactly once (complemented or ' +
        'uncomplemented). A maxterm is its dual — a sum term where every variable appears exactly once. ' +
        'The canonical Sum of Products (SOP) form lists all minterms where the function is 1; the ' +
        'canonical Product of Sums (POS) form lists all maxterms where the function is 0.',

        'In a K-map, cells are arranged so that adjacent cells (including wrap-around edges) differ in ' +
        'exactly one variable (Gray code ordering). Groups of 1, 2, 4, or 8 adjacent 1-cells can be ' +
        'combined: a group of $2^k$ cells eliminates $k$ variables from the product term, ' +
        'yielding a simpler implicant.',

        'An implicant is any product term that covers at least one 1-cell of the function. A prime ' +
        'implicant (PI) is a maximal implicant — it cannot be combined with any other implicant to ' +
        'form a larger group. An essential prime implicant (EPI) is a PI that covers at least one ' +
        '1-cell that no other PI covers; EPIs must be included in the minimal cover.',

        "Don't care conditions (marked with X in the K-map) represent input combinations that either " +
        'cannot occur or whose output is irrelevant. They may be treated as 1 when grouping to form ' +
        "larger groups, but they need not be covered by any implicant. Strategic use of don't cares " +
        'can significantly reduce the complexity of the minimized expression.',

        'For a 2-variable K-map: 4 cells, groups of 1/2/4. ' +
        'For a 3-variable K-map: 8 cells, groups up to 8. ' +
        'For a 4-variable K-map: 16 cells, groups up to 16. ' +
        'The procedure: (1) fill the K-map from the truth table, (2) identify all prime implicants, ' +
        '(3) select essential prime implicants, (4) cover remaining 1-cells with fewest additional PIs.',

        'Example: $F(A,B,C,D) = \\Sigma m(1,3,7,11,15)$. ' +
        'Plotting minterms 1(0001), 3(0011), 7(0111), 11(1011), 15(1111) on the K-map reveals: ' +
        'a group of 4 cells at minterms {3,7,11,15} → $CD$; ' +
        'a group of 2 cells at minterms {1,3} → $\\overline{A}\\overline{B}D$. ' +
        "Minterm 1 is only covered by the second group, making it essential. " +
        "Final minimized SOP: $F = CD + \\overline{A}\\overline{B}D$.",
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'Pencil/Pen and Graph Paper', specification: 'For drawing K-maps manually',                quantity: '1 set' },
        { name: 'Logic Gate Reference Sheet', specification: 'AND, OR, NOT, NAND, NOR, XOR truth tables',  quantity: '1' },
        { name: 'Boolean Algebra Laws Sheet', specification: "De Morgan's, absorption, distribution laws", quantity: '1' },
        { name: 'Digital Logic Design Textbook', specification: 'Mano / Morris for detailed K-map examples', quantity: '1' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure — Minimizing f = Σm(0,2,5,7)',
      steps: [
        {
          label: 'Write the truth table for 3 variables.',
          body: 'List all 8 minterms for variables A, B, C (m0 through m7). ' +
            'Mark output f = 1 for minterms 0, 2, 5, 7: ' +
            'm0 (000)=1, m2 (010)=1, m5 (101)=1, m7 (111)=1. ' +
            'All other minterms have f = 0.',
        },
        {
          label: 'Draw the 3-variable K-map.',
          body: 'Draw a 2×4 grid. Label rows with A (0, 1) and columns with BC in Gray code order (00, 01, 11, 10). ' +
            'Fill in f values: row A=0: [1, 0, 0, 1]; row A=1: [0, 1, 1, 0]. ' +
            'The 1-cells are at positions (A=0,BC=00), (A=0,BC=10), (A=1,BC=01), (A=1,BC=11).',
        },
        {
          label: 'Identify prime implicants.',
          body: 'Group 1: minterms {0, 2} — cells (A=0,BC=00) and (A=0,BC=10) are adjacent (differ only in B). ' +
            'Product term: $\\overline{A}\\overline{C}$ (A=0, C=0 in both). ' +
            'Group 2: minterms {5, 7} — cells (A=1,BC=01) and (A=1,BC=11) differ only in B. ' +
            'Product term: $AC$ (A=1, C=1 in both). ' +
            'No larger groups are possible. These are both prime implicants.',
        },
        {
          label: 'Check for essential prime implicants.',
          body: 'Minterm 0 is covered only by Group 1 → Group 1 is essential. ' +
            'Minterm 5 is covered only by Group 2 → Group 2 is essential. ' +
            'Together they cover all four 1-cells. ' +
            'Minimized SOP: $f = \\overline{A}\\overline{C} + AC$.',
        },
        {
          label: 'Verify the simplified expression.',
          body: 'Check $f = \\overline{A}\\overline{C} + AC$ against the truth table: ' +
            'm0 (A=0,C=0): $1·1+0=1$ ✓, m2 (A=0,C=0): same $=1$ ✓, ' +
            'm5 (A=1,C=1): $0+1·1=1$ ✓, m7 (A=1,C=1): same $=1$ ✓. ' +
            'All other minterms evaluate to 0 ✓. ' +
            'Notice: $f = \\overline{A}\\overline{C} + AC = \\overline{A \\oplus C}$ — this is XNOR!',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'The 3-variable K-map for f = Σm(0,2,5,7) yielded exactly two prime implicants, both essential.',
        'The canonical SOP has 4 minterms (4 × 3-literal AND terms + OR = 13 literals). ' +
        'The minimized SOP has 2 terms (2 × 2-literal AND terms + OR = 5 literals). ' +
        'This represents a 62% reduction in literal count.',
        'Further simplification: the result is XNOR(A,C), requiring just one 2-input XNOR gate.',
      ],
      table: {
        headers: ['A', 'B', 'C', 'f', 'K-map Group'],
        rows: [
          [0, 0, 0, 1, 'Group 1 (A\'C\')'],
          [0, 0, 1, 0, '-'],
          [0, 1, 0, 1, 'Group 1 (A\'C\')'],
          [0, 1, 1, 0, '-'],
          [1, 0, 0, 0, '-'],
          [1, 0, 1, 1, 'Group 2 (AC)'],
          [1, 1, 0, 0, '-'],
          [1, 1, 1, 1, 'Group 2 (AC)'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The Karnaugh map method was applied to minimize f = Σm(0,2,5,7) for three variables. ' +
        'The canonical SOP was reduced from four 3-literal product terms to two 2-literal terms: ' +
        '$f = \\overline{A}\\overline{C} + AC$, equivalent to XNOR(A,C).',

        'The procedure demonstrated identification of prime implicants by grouping adjacent 1-cells ' +
        'in the K-map, and selection of essential prime implicants that must appear in any minimal cover. ' +
        "Don't care conditions (not present in this example) can further reduce complexity when applicable.",

        'K-maps are practical for up to 4–5 variables. For larger functions, algorithmic methods such as ' +
        'the Quine–McCluskey algorithm or modern EDA tools (espresso, ABC) are used, which implement ' +
        'the same theoretical principles computationally.',
      ],
    },
  ],
};
