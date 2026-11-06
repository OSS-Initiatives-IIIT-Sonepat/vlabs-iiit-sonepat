import { type TheorySection } from "@/labs/lab-content.types";
import { parallelProcessingTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/parallel-processing";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Four additions have no data dependence. Two processors can each take two of them.",
    "In series the four adds take four steps. In parallel they take two steps, then a join.",
  ],
  circuitDiagram: parallelProcessingTheoryDiagram,
};
