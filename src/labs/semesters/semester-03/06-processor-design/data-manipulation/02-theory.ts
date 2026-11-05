import { type TheorySection } from "@/labs/lab-content.types";
import { dataManipulationTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/data-manipulation";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Data-transfer instructions copy a word and do not combine two values. MOV R1, R2 copies R2 into R1.",
    "ADD combines values arithmetically, XOR combines them logically, and SHR moves the bits of one register.",
  ],
  circuitDiagram: dataManipulationTheoryDiagram,
};
