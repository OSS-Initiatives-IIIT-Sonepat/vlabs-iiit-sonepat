import { type TheorySection } from "@/labs/lab-content.types";
import { riscPipelineTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/risc-pipeline";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A RISC pipeline in this chapter has three segments: I fetches the instruction, A performs the ALU operation, and E executes.",
    "Load R1, Load R2, Add R1+R2 conflicts, because the add needs both loads. A no-operation is inserted. A delayed branch fills its delay slot the same way.",
  ],
  circuitDiagram: riscPipelineTheoryDiagram,
};
