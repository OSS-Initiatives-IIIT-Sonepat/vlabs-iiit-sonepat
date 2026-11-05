import { type TheorySection } from "@/labs/lab-content.types";
import { riscOrganizationTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/risc-organization";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A RISC arithmetic instruction names only registers. Memory is touched by load and store.",
    "LD R1, 100 reads M[100] = 4. ADD R2, R1, R3 with R3 = 5 writes 9 into R2. ST 200, R2 writes 9 to M[200]. Each instruction is one fixed-length word.",
  ],
  circuitDiagram: riscOrganizationTheoryDiagram,
};
