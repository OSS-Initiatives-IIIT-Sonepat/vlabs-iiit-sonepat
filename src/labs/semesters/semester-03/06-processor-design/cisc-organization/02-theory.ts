import { type TheorySection } from "@/labs/lab-content.types";
import { ciscOrganizationTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/cisc-organization";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "ADD X, Y means M[X] ← M[X] + M[Y]. One instruction names two memory operands and a variable-length encoding.",
    "The micro-operations are read M[X], read M[Y], add, and write M[X]. Here M[X] is 4 and M[Y] is 5, so M[X] becomes 9.",
  ],
  circuitDiagram: ciscOrganizationTheoryDiagram,
};
