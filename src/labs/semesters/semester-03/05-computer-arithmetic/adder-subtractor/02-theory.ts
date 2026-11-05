import { type TheorySection } from "@/labs/lab-content.types";
import { adderSubtractorTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/adder-subtractor";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "One row of full adders can add or subtract. The change is in the B input and in the carry into the low bit. A mode wire M drives both.",
    "Each B bit enters an XOR gate. The other XOR input is M. When M = 0, B ⊕ 0 = B, so the adder sees B unchanged. When M = 1, B ⊕ 1 = B', the 1's complement of B.",
    "M is also the carry into bit 0. M = 0 forces C0 = 0, and the sum is A + B. M = 1 forces C0 = 1, which supplies the +1 of the 2's complement, so the sum is A + B' + 1. That is A − B.",
    "A does not pass through the XOR. A3 A2 A1 A0 goes straight into the four full adders. Bit 3 is the left stage. Carries run from bit 0 toward bit 3, and C4 leaves the left side.",
    "With A = 1010 and B = 0011, M = 0 produces 0 1101, which is 10 + 3 = 13. M = 1 produces 1 0111, which is 10 − 3 = 7. The same lamps show both results.",
  ],
  circuitDiagram: adderSubtractorTheoryDiagram,
};
