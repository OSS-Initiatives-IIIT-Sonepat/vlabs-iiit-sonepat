import { type TheorySection } from "@/labs/lab-content.types";
import { pipelineOverlapTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/pipeline-overlap";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A pipeline segment is a processing circuit followed by a register. The slide uses four: S1 R1, S2 R2, S3 R3, S4 R4.",
    "Once every segment is busy, one result leaves on each clock. The speedup approaches the number of segments, which is 4.",
  ],
  circuitDiagram: pipelineOverlapTheoryDiagram,
};
