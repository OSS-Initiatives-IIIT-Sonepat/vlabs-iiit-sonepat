import { type TheorySection } from "@/labs/lab-content.types";
import { generalRegistersTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/general-registers";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Seven registers meet two multiplexers. SELA chooses the register on the A bus and SELB chooses the register on the B bus. The ALU operation is OPR, and a 3×8 decoder SELD loads the result into one register.",
    "For R1 ← R2 + R3 the control word is SELA = 010, SELB = 011, SELD = 001, OPR = 00010. Binary 010 selects R2, 011 selects R3, and 001 selects R1.",
  ],
  circuitDiagram: generalRegistersTheoryDiagram,
};
