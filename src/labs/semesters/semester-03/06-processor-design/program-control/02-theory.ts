import { type TheorySection } from "@/labs/lab-content.types";
import { programControlTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/program-control";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Program control reads the status bits. A branch instruction replaces PC when its condition is true and leaves PC to the next instruction when the condition is false.",
    "Here Z = 1 and the branch target is 200. PC is 101, so the branch is taken and the instruction at 102 is skipped.",
  ],
  circuitDiagram: programControlTheoryDiagram,
};
