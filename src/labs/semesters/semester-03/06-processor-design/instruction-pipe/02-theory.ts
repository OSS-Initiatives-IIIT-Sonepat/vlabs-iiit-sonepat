import { type TheorySection } from "@/labs/lab-content.types";
import { instructionPipeTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/instruction-pipe";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The four segments are FI, DA, FO, and EX: fetch the instruction, decode and form the effective address, fetch the operand, then execute.",
    "A taken branch empties the pipe and updates the PC. An interrupt leaves the pipe for interrupt handling.",
  ],
  circuitDiagram: instructionPipeTheoryDiagram,
};
