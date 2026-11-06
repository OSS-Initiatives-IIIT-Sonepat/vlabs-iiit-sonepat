import { type TheorySection } from "@/labs/lab-content.types";
import { memoryReferenceTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/memory-reference";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Opcodes 000 through 110 are the memory-reference instructions: AND, ADD, LDA, STA, BUN, BSA, and ISZ. By the time $T_4$ begins, the effective address is already in AR. If the instruction was direct, that address was copied from IR at $T_2$. If it was indirect, $T_3$ replaced it with $M[AR]$. Every one of these instructions ends by clearing SC, so the next clock returns the machine to $T_0$.",
    "AND, ADD, and LDA all read the operand first. At $T_4$, $DR \\leftarrow M[AR]$. AND then forms $AC \\leftarrow AC \\wedge DR$: each bit of AC is ANDed with the same bit of the operand, and the result is written back into AC. ADD forms $AC \\leftarrow AC + DR$ and stores the carry out in the extended-accumulator flip-flop, $E \\leftarrow C_{out}$. LDA copies the operand with $AC \\leftarrow DR$. The memory word is not changed by any of these three.",
    "STA writes the other way. It needs no read and no second clock: at $T_4$, $M[AR] \\leftarrow AC$, and SC is cleared. AC itself is left as it was. BUN is the unconditional branch. At $T_4$, $PC \\leftarrow AR$. The instruction that follows is not the next word in memory. The next fetch is taken from the effective address.",
    "BSA calls a subroutine. During the fetch, PC was already incremented, so PC holds the address of the instruction after the BSA. At $T_4$ that address is saved and AR is stepped onto the subroutine: $M[AR] \\leftarrow PC$, $AR \\leftarrow AR + 1$. At $T_5$, $PC \\leftarrow AR$ and SC is cleared. In the figure, BSA 135 sits at address 20, so at $T_4$ the PC is 21 and AR is 135. After the call, location 135 holds 21 and PC holds 136, which is the first word of the subroutine. The subroutine returns with BUN 135 and the indirect bit set. The 1 in front of BUN means the branch target is $M[135]$, the saved 21, not the address 135 itself.",
    "ISZ increments a memory word and skips the next instruction if the new value is zero. A word cannot be incremented inside the memory, so the control reads it, adds one, and writes it back. $T_4$ does $DR \\leftarrow M[AR]$. $T_5$ does $DR \\leftarrow DR + 1$. $T_6$ does $M[AR] \\leftarrow DR$, and if $DR = 0$ then $PC \\leftarrow PC + 1$. SC is cleared on that same clock. The extra increment of PC is the skip.",
  ],
  circuitDiagram: memoryReferenceTheoryDiagram,
};
