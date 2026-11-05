import { type TheorySection } from "@/labs/lab-content.types";
import { microinstructionFormatTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/microinstruction-format";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A horizontal-style word here has micro-operation fields F1 F2 F3, a condition select CD, a branch type BR, and an address AD.",
    "F1 selects the ALU add. CD is 0, so the branch is not conditional. BR says the next address is AD, and AD holds 41.",
  ],
  circuitDiagram: microinstructionFormatTheoryDiagram,
};
