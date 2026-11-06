import { type TheorySection } from "@/labs/lab-content.types";
import { accumulatorUnitTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/accumulator-unit";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The accumulator holds the running result. DR supplies the second operand for ADD and AND.",
    "ADD is AC ← AC + DR. AND is AC ← AC ∧ DR. CMA complements AC and does not use DR. A logical shift moves the bits of AC and fills the vacant bit with 0.",
    "Each of these is selected inside the same unit. The examples below all start from AC = 0101 and DR = 0011, so the four results can be compared.",
  ],
  circuitDiagram: accumulatorUnitTheoryDiagram,
};
