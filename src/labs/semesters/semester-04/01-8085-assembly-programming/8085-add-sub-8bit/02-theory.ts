import { type TheorySection } from "@/labs/lab-content.types";
import { addSub8bitTheoryDiagram } from "@/labs/schematics/semester-04/01-8085-assembly-programming/assembly-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The Intel 8085 microprocessor is an 8-bit processor that performs arithmetic operations through its Arithmetic and Logic Unit (ALU). The accumulator register A is the central register in all arithmetic operations and always holds one of the operands as well as the result.",
    "The ADD instruction adds the content of any 8-bit register (B, C, D, E, H, L) or memory location M to the accumulator and stores the result back in A. Syntax: ADD r. The instruction affects the Sign (S), Zero (Z), Auxiliary Carry (AC), Parity (P), and Carry (CY) flags.",
    "The SUB instruction subtracts the content of a register from the accumulator using 2's complement subtraction. If the minuend is less than the subtrahend, the Carry flag (CY) is set indicating a borrow. Syntax: SUB r.",
    "LDA (Load Accumulator) loads the byte at a 16-bit memory address into A. STA (Store Accumulator) stores A to a 16-bit address. MOV copies data between registers. XCHG swaps HL and DE. None of these data-transfer instructions change the flags.",
    "Algorithm: Load NUM1 from 8000H → save to B. Load NUM2 → ADD B gives sum, store to 8002H. Reload NUM1 → B=NUM1. Load NUM2 → C=NUM2. MOV A,B then SUB C gives difference, store to 8003H.",
  ],
  circuitDiagram: addSub8bitTheoryDiagram,
};
