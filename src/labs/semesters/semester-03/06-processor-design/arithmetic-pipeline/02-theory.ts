import { type TheorySection } from "@/labs/lab-content.types";
import { arithmeticPipelineTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/arithmetic-pipeline";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "X = 0.9504 × 10³ and Y = 0.8200 × 10². The first segment compares the exponents. The second shifts Y to 0.0820 × 10³.",
    "The third adds the mantissas: Z = 1.0324 × 10³. The fourth normalizes that to 0.10324 × 10⁴.",
  ],
  circuitDiagram: arithmeticPipelineTheoryDiagram,
};
