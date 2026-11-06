import { type TheorySection } from "@/labs/lab-content.types";
import { registerTransferTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/register-transfer";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A register is named with a capital letter. MAR, PC, IR, and R1 are registers. Bits are numbered from the right, and a register such as PC can be split into PC(H) and PC(L).",
    "R2 ← R1 copies the contents of R1 into R2. With a control function it becomes P : R2 ← R1, which means the copy happens only when P is 1, on the clock edge. On the board that condition is an AND gate, and the function generator is the clock.",
  ],
  circuitDiagram: registerTransferTheoryDiagram,
};
