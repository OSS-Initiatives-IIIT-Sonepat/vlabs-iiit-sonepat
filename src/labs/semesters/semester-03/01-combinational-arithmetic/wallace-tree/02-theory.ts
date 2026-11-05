import { type TheorySection } from "@/labs/lab-content.types";
import { wallaceTreeTheoryDiagram } from "@/labs/schematics/semester-03/01-combinational-arithmetic/wallace-tree";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram: wallaceTreeTheoryDiagram,
  paragraphs: [
    "The Wallace Tree multiplier is a hardware multiplication algorithm designed to minimize the delay of computing the product of two n-bit numbers. It achieves O(log n) gate depth (vs O(n) for the naive array multiplier) by reducing partial products using a tree of Carry-Save Adders (CSAs) before a final Carry-Propagate Adder (CPA) produces the result.",
    "Step 1 — Partial Product Generation: For two n-bit operands A and B, each bit of B is ANDed with every bit of A to produce n partial products. Each partial product is an n-bit row. For 4×4 multiplication, 4 rows of 4 bits each are generated using 16 AND gates. The AND gate for bit position $A_i \\cdot B_j$ contributes to sum column $i+j$.",
    'Step 2 — Carry-Save Adder (CSA) Reduction: A CSA takes three n-bit inputs and produces two n-bit outputs (sum S and carry C) in a single gate-level operation, without carry propagation. Unlike a regular adder, a CSA does NOT produce the final sum — it reduces 3 inputs to 2 inputs (in "saved" carry form). This reduction is applied in a tree until only 2 rows remain.',
    "For 4 partial product rows, one level of CSA reduction suffices: CSA1 takes rows PP0, PP1, PP2 → produces sum S1 and carry C1 (2 rows). Remaining rows: {S1, C1, PP3}. CSA2 takes S1, C1, PP3 → produces sum S2 and carry C2 (2 rows). Two rows remain: S2 and C2 (shifted left by 1).",
    "Step 3 — Final CPA: The two remaining rows S2 and C2 are added using a standard fast adder (CLA or prefix adder) to produce the final 2n-bit product. This is the only stage with carry propagation, and it operates on only 2 operands rather than n partial products.",
    "Complexity: The Wallace tree has $\\lceil \\log_{3/2} n \\rceil$ CSA levels (each level reduces the row count by a factor of 2/3). The total gate depth is O(log n) XOR/AND plus O(log n) for the final CPA — significantly faster than the O(n) ripple-adder-based array multiplier. For 64-bit multiplication (e.g., in a CPU), this is critical.",
    "The 4×4 Wallace Tree example: Multiply A=0b1011 (11) × B=0b0110 (6) = 66 (0b0100 0010). Generate 4 partial products, apply 2 CSA levels, add final 2 rows with CPA. Result: 0100 0010 = 64+2 = 66 ✓.",
  ],
};
