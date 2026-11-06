import { type TheorySection } from "@/labs/lab-content.types";
import { flynnTaxonomyTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/flynn-taxonomy";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Flynn's four classes come from two questions: one instruction stream or many, and one data stream or many.",
    "One instruction and one data stream is SISD, an ordinary CPU. One instruction and many data streams is SIMD, an array. Many of both is MIMD. Many instructions and one data stream is MISD.",
  ],
  circuitDiagram: flynnTaxonomyTheoryDiagram,
};
