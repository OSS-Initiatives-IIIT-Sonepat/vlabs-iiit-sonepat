import { type TheorySection } from "@/labs/lab-content.types";
import { karnaughMapTheoryDiagram } from "@/labs/schematics/semester-03/04-computer-organisation-architecture/03-karnaugh-map";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram: karnaughMapTheoryDiagram,
  paragraphs: [
    "A Karnaugh map is a truth table drawn so that cells which differ by one variable share an edge. Adjacent 1s — including cells that wrap around an edge, and the four corners — combine by the theorem $x + \\bar{x} = 1$ and drop that variable.",
    "Groups must be powers of two: 1, 2, 4, 8, or 16 cells. A legal group is as large as possible, and every 1 must sit in at least one group. A group of $2^k$ cells on an $n$-variable map produces a product of $n - k$ literals. Don't-care cells (×) may join a group when they enlarge it, and they may be left out when they do not.",
    "The map in this lab is $F(A,B,C,D) = \\sum m(0,1,2,5,6,7,8,9,10,14)$. The same function is reduced again by the Quine–McCluskey method in the next experiment, so the two results can be compared cell by cell.",
    "Gate-level minimisation in Digital Electronics already builds one 3-variable K-map result, $F = AB + AC$, on a breadboard. This lab is the 4-variable map itself, which is the hand method used before that wiring.",
  ],
};
