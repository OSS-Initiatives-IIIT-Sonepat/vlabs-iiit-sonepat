import { type TheorySection } from "@/labs/lab-content.types";
import { instructionSetTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/instruction-set";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A basic-computer instruction is 16 bits: I, a 3-bit opcode, and 12 address bits.",
    "Opcodes 000 through 110 are memory-reference instructions. AND, ADD, LDA, STA, BUN, BSA, and ISZ each name a memory address.",
    "Opcode 111 with I = 0 is a register-reference instruction. The address bits are flags such as CLA (7800) and CMA (7200).",
    "Opcode 111 with I = 1 is an I/O instruction. INP is F800, OUT is F400, and SKI is F200.",
  ],
  circuitDiagram: instructionSetTheoryDiagram,
};
