import { type TheorySection } from "@/labs/lab-content.types";
import { arrayProcessorsTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/array-processors";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An attached array processor sits beside a general-purpose computer, with its own local memory and a high-speed bus.",
    "A SIMD array has a master control unit and processing elements PE1 through PEn. Each element has its own memory Mi.",
  ],
  circuitDiagram: arrayProcessorsTheoryDiagram,
};
