import { type TheorySection } from "@/labs/lab-content.types";
import { instructionCycleTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/instruction-cycle";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A program in the memory of the basic computer is a sequence of instructions. The control unit handles each one in the same four phases, then comes back for the next. It fetches the instruction from memory, decodes it, reads the effective address if the address is indirect, and executes it. After execute, the sequence counter is cleared and the next fetch begins at $T_0$. The loop stops only when a HLT instruction is encountered.",
    "Before the program runs, PC holds the address of the first instruction. The fetch and decode micro-operations are the same for every instruction. At $T_0$, $AR \\leftarrow PC$. Memory is addressed by AR, so the word about to be read is the instruction. At $T_1$, $IR \\leftarrow M[AR]$ and $PC \\leftarrow PC + 1$. The instruction code is now in IR, and PC already points at the instruction that follows. At $T_2$ the opcode $IR(12\\text{–}14)$ is decoded into one of $D_0$ through $D_7$, the address field is copied by $AR \\leftarrow IR(0\\text{–}11)$, and the mode bit is copied by $I \\leftarrow IR(15)$.",
    "Those two bits decide the rest of the cycle. $D_7 = 1$ only when the opcode is 111, so the instruction is not a memory reference. $I$ then splits that case. $I = 0$ is a register-reference instruction, such as CLA, CLE, CMA, CME, CIR, CIL, INC, SPA, SNA, SZA, SZE, or HLT. $I = 1$ is an input-output instruction: INP, OUT, SKI, SKO, ION, or IOF. Neither kind reads an operand from memory. Both execute at $T_3$, and both end with $SC \\leftarrow 0$.",
    "$D_7 = 0$ is a memory-reference instruction: AND, ADD, LDA, STA, BUN, BSA, or ISZ. If $I = 0$ the address already in AR is the effective address, so $T_3$ does nothing. If $I = 1$ the word at $M[AR]$ is not the operand. It is the address of the operand, and $T_3$ performs $AR \\leftarrow M[AR]$. Either way, $T_4$ executes the memory-reference instruction and clears SC. The next clock then produces $T_0$, and the instruction at the new PC is fetched.",
  ],
  circuitDiagram: instructionCycleTheoryDiagram,
};
