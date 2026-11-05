import { type TheorySection } from "@/labs/lab-content.types";
import { completeComputerDescriptionTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/complete-computer-description";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The basic computer is one loop. At the start, three things are cleared: the sequence counter $SC \\leftarrow 0$, the interrupt enable $IEN \\leftarrow 0$, and the interrupt flip-flop $R \\leftarrow 0$. Clearing SC makes the next timing signal $T_0$. Clearing IEN means an interrupt cannot be accepted until a program executes ION. Clearing R means the first cycle is an instruction cycle.",
    "R is tested at the top of every cycle. $R = 0$ takes the left branch, the instruction cycle. $R = 1$ takes the right branch, the interrupt cycle. Fetch is allowed only while R is 0, so its clocks are written $R'T_0$, $R'T_1$, and $R'T_2$ rather than $T_0$, $T_1$, and $T_2$. $R'T_0$ copies PC into AR. $R'T_1$ reads the instruction into IR and increments PC. $R'T_2$ decodes IR(12–14) into $D_0$ through $D_7$, copies IR(0–11) into AR, and copies IR(15) into I.",
    "The interrupt cycle uses the same three clocks with R held at 1. $RT_0$ clears AR and saves PC in TR. $RT_1$ stores that address at memory location 0 and clears PC. $RT_2$ increments PC to 1, then clears IEN, R, and SC. The next fetch therefore reads the instruction at address 1, and a second interrupt cannot arrive until the service program sets IEN again. On the flowchart the interrupt column joins the instruction column above $D_7$, because both cycles return control to the same decision.",
    "$D_7 = 1$ means the opcode is 111, a register-reference or an input-output instruction. $D_7 = 0$ is a memory-reference instruction. The I bit then splits each of those. For opcode 111, $I = 1$ executes an input-output instruction at $T_3$ and $I = 0$ executes a register-reference instruction at $T_3$. For a memory reference, $I = 1$ is indirect, so $T_3$ does $AR \\leftarrow M[AR]$, and $I = 0$ is direct, so $T_3$ does nothing. Either way the memory-reference instruction itself runs at $T_4$.",
    "Every execute box ends with $SC \\leftarrow 0$. The three arrows at the bottom of the rectangle are that return. Control follows the border back to R, and the next cycle begins. The machine stops only when a halt instruction clears the start-stop flip-flop. Until then the same chart repeats.",
  ],
  circuitDiagram: completeComputerDescriptionTheoryDiagram,
};
