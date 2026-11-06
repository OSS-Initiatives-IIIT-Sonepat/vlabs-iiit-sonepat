import { type TheorySection } from "@/labs/lab-content.types";
import { programLoopTheoryDiagram } from "@/labs/schematics/semester-03/08-assembly-systems/program-loop";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A loop is a branch back to an earlier instruction. This one loads CNT, adds a word of all ones (the value −1), stores CNT, and tests AC.",
    "SZA skips the next instruction when AC is 0. While AC is not 0, BUN LOP returns to the load. When AC becomes 0, SZA skips the branch and HLT stops the program.",
    "CNT starts at 2, so the body runs twice.",
  ],
  circuitDiagram: programLoopTheoryDiagram,
};
