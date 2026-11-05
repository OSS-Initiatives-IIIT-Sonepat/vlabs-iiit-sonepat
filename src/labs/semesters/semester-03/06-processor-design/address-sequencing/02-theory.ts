import { type TheorySection } from "@/labs/lab-content.types";
import { addressSequencingTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/address-sequencing";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "After a microinstruction, CAR becomes CAR + 1, a branch address, an address mapped from the opcode, or the address saved for a micro-subroutine.",
    "In this trace the opcode maps to 40, the next word is 41, a branch field holds 60, and a return uses the saved address 16.",
  ],
  circuitDiagram: addressSequencingTheoryDiagram,
};
