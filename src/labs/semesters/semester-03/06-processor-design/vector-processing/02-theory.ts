import { type TheorySection } from "@/labs/lab-content.types";
import { vectorProcessingTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/vector-processing";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A 3×3 matrix product does three inner products, and each inner product is three multiply-adds. That is 9 × 3 = 27 operations.",
    "The same stream can use four interleaved memory modules so consecutive elements do not wait on one bank.",
  ],
  circuitDiagram: vectorProcessingTheoryDiagram,
};
