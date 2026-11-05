import { type TheorySection } from "@/labs/lab-content.types";
import { instructionPipelineTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/instruction-pipeline";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
  "A pipeline overlaps instructions. While one instruction is decoded, the next can be fetched. The four stages here are IF, ID, EX, and WB.",
  "Three instructions enter one per clock. A stage lamp is on when that stage holds an instruction. After a branch, the lamps go out: the instructions that were fetched past the branch are discarded.",
  "The arithmetic pipeline in the later frame adds 0.9504 × 10² and 0.8200 × 10². The mantissa sum is 1.7704, which normalises to 0.1770 × 10³."
],
  circuitDiagram: instructionPipelineTheoryDiagram,
};
