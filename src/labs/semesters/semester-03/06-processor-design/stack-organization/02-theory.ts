import { type TheorySection } from "@/labs/lab-content.types";
import { stackOrganizationTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/stack-organization";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A register stack of 64 words uses a 6-bit stack pointer. PUSH increments SP and then writes DR. POP reads M[SP] and then decrements SP. FULL and EMTY record the two ends.",
    "A memory stack is the other direction. PUSH decrements SP and then writes. The memory figure splits the address space into program, data, and stack, with PC, AR, and SP pointing at each.",
  ],
  circuitDiagram: stackOrganizationTheoryDiagram,
};
