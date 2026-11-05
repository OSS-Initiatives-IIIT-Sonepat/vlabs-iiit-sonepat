import { type TheorySection } from "@/labs/lab-content.types";
import { instructionFormatTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/instruction-format";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The same expression X = (A+B)*(C+D) can be written with three, two, one, or zero addresses in each instruction.",
    "Three-address code names both sources and the destination. Two-address code overwrites one source. One-address code uses the accumulator. Zero-address code uses a stack.",
  ],
  circuitDiagram: instructionFormatTheoryDiagram,
};
