import { type TheorySection } from "@/labs/lab-content.types";
import { quineMccluskeyTheoryDiagram } from "@/labs/schematics/semester-03/04-computer-organisation-architecture/04-quine-mccluskey";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram: quineMccluskeyTheoryDiagram,
  paragraphs: [
    "Quine–McCluskey is the tabular form of a Karnaugh map. List every minterm as a binary string, sorted by the number of 1s. Combine two strings that differ in exactly one bit, replace that bit with a dash, and tick both parents. Repeat on the combined rows until nothing else merges. Unticked rows are the prime implicants.",
    "A prime-implicant chart has one column per minterm and one row per prime implicant. A column with a single cross marks an essential prime implicant: that term must appear in every minimal cover. Cover those minterms, then pick the smallest set of remaining implicants that covers the rest.",
    "The function is again $F(A,B,C,D) = \\sum m(0,1,2,5,6,7,8,9,10,14)$, so the chart should finish at the same expression the K-map produced: $F = \\bar{B}\\bar{C} + C\\bar{D} + \\bar{A}BD$.",
  ],
};
