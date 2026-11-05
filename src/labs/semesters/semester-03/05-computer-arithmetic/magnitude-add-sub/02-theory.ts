import { type TheorySection } from "@/labs/lab-content.types";
import { magnitudeAddSubTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/magnitude-add-sub";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The sign bits decide the magnitude operation. For a subtract, equal signs mean subtract the magnitudes: EA ← A + B' + 1, and AVF stays 0. Different signs mean add the magnitudes.",
    "If the end-carry E is 0, A was smaller, so the magnitude is complemented and incremented and the sign flips. If E is 1 and the magnitude becomes 0, the sign is forced to 0.",
    "Adding +9 and +9 has equal signs, so the magnitudes add. 1001 + 1001 = 10010, E = 1, and AVF takes E.",
  ],
  circuitDiagram: magnitudeAddSubTheoryDiagram,
};
