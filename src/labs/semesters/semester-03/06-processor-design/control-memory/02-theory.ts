import { type TheorySection } from "@/labs/lab-content.types";
import { controlMemoryTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/control-memory";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Control memory holds the microprogram. CAR is its address register. The word at CAR is the current microinstruction.",
    "CAR is 15. Control memory 15 holds the micro-operations for this step, and the next-address field updates CAR afterward.",
  ],
  circuitDiagram: controlMemoryTheoryDiagram,
};
