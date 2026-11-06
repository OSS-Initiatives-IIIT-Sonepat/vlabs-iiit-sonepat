import { type TheorySection } from "@/labs/lab-content.types";
import { addressingModesTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/addressing-modes";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The addressing mode says where the operand is. Implied mode uses AC, as in CMA. Immediate mode carries the operand in the instruction, as in MOV R1, 05H. Register mode uses a CPU register, as in MOV AX, BX.",
    "Register indirect mode uses the address stored in a register. Direct mode uses the address field, as in ADD 457. Relative, indexed, and base modes add PC, XR, or a base register to that field.",
  ],
  circuitDiagram: addressingModesTheoryDiagram,
};
