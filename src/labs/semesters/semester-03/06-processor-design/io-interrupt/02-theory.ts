import { type TheorySection } from "@/labs/lab-content.types";
import { ioInterruptTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/io-interrupt";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A computer does nothing useful until it can exchange information with the outside. The basic computer uses a terminal: a keyboard for input and a printer for output. Each character is an 8-bit alphanumeric code. The keyboard shifts that code, one bit at a time, through the transmitter interface into the input register INPR. The printer takes its character from the output register OUTR, through the receiver interface, again one bit at a time. INPR and OUTR themselves move a whole character in parallel to and from the accumulator AC.",
    "Two flags say when a transfer is allowed. FGI starts at 0. Striking a key shifts a character into INPR and sets FGI to 1. While FGI stays 1, another key is ignored. The computer tests the flag, copies INPR into AC(0–7), and clears FGI, which lets the next key in. FGO works the other way and starts at 1, meaning the printer is free. The computer copies AC(0–7) into OUTR and clears FGO. The printer prints the character and, when it has finished, sets FGO back to 1. Until that happens the computer must not load a new character.",
    "Six instructions do this work. They are input-output instructions, so $D_7 I T_3 = p$, and one bit of IR(6–11) selects which one. INP does $AC(0\\text{–}7) \\leftarrow INPR$ and $FGI \\leftarrow 0$. OUT does $OUTR \\leftarrow AC(0\\text{–}7)$ and $FGO \\leftarrow 0$. SKI skips the next instruction when FGI is 1. SKO skips when FGO is 1. ION sets the interrupt-enable flip-flop, $IEN \\leftarrow 1$. IOF clears it, $IEN \\leftarrow 0$.",
    "The interrupt cycle is a branch-and-save done by the hardware, so the program does not have to keep testing the flags. Flip-flop R chooses the cycle. R = 0 means an ordinary instruction cycle: fetch, decode, execute. At the end of execute the control looks at IEN. If IEN is 0, interrupts are off and the next instruction cycle begins. If IEN is 1, the flags are tested. FGI = 1 or FGO = 1 sets R to 1. If both flags are 0, nothing is waiting and the next instruction cycle begins. The setting of R is allowed on any clock except $T_0$, $T_1$, and $T_2$: $T_0' T_1' T_2' (IEN)(FGI + FGO): R \\leftarrow 1$.",
    "When R is 1 at the end of execute, the next cycle is the interrupt cycle instead of a fetch. It takes three clocks. $RT_0$ clears AR and copies PC into TR. $RT_1$ stores TR at that address, so $M[0] \\leftarrow PC$, and clears PC. $RT_2$ increments PC to 1, then clears IEN, R, and SC. The following fetch is therefore the instruction at address 1, and interrupts stay off until the program turns them on again. In the demonstration, the interrupt happens with PC = 256. Afterwards location 0 holds 256 and PC is 1. Location 1 is BUN 1120, the start of the I/O program. That program returns with BUN 0 and the indirect bit set, so the branch target is the 256 saved in location 0.",
  ],
  circuitDiagram: ioInterruptTheoryDiagram,
};
