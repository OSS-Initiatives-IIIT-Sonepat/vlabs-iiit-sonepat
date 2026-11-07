import { type TheorySection } from "@/labs/lab-content.types";
import { arraySquareTheoryDiagram } from "@/labs/schematics/semester-04/01-8085-assembly-programming/assembly-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Squaring each element of an array requires reading each byte, computing its square (using the repeated-addition multiplication subroutine), and writing the 16-bit result back to a result array. This exercise combines array traversal with subroutine calls.",
    "The CALL instruction pushes the next PC onto the stack and jumps to the subroutine address. RET pops the return address from the stack and jumps back. The stack pointer SP must be initialised (LXI SP) before any CALL/PUSH/POP is used.",
    "The multiply subroutine accepts the number in B and computes B×B. The result is kept in HL (16-bit). On return, H holds the high byte and L holds the low byte of the square. The calling code then uses SHLD to store the result.",
    "The HL register pair serves dual purpose: as the array pointer before and after each CALL, and as the 16-bit result register inside the multiply subroutine. Care must be taken to save/restore HL around the call using PUSH H and POP H, or to use DE as the array pointer instead.",
    "For elements 0-15, the squares fit in 8 bits (max 225=E1H). For elements up to 255, the maximum square is 65025=FE01H, requiring two bytes. We use DE as the input pointer and store results at a separate output area.",
  ],
  circuitDiagram: arraySquareTheoryDiagram,
};
