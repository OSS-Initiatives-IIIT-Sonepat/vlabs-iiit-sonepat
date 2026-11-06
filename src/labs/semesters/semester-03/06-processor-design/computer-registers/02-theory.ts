import { type TheorySection } from "@/labs/lab-content.types";
import { computerRegistersTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/computer-registers";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The basic computer keeps the program and the data in one memory of 4096 words, 16 bits each. Eight registers sit around that memory. Twelve-bit registers hold addresses, because $2^{12} = 4096$. Sixteen-bit registers hold a full memory word. The two input-output registers hold one 8-bit character.",
    "The program counter PC holds the address of the next instruction. The address register AR holds the address that is sent to memory. The instruction register IR holds the 16-bit instruction just read. The data register DR holds the operand read from memory. The temporary register TR holds a word the control needs for a moment. The accumulator AC is the processor register: arithmetic and logic results land in AC. The input register INPR holds a character arriving from the keyboard. The output register OUTR holds a character on its way to the printer.",
    "These registers share one common bus. Three select lines, $S_2 S_1 S_0$, decide which unit is allowed to place its contents on that bus. The number printed beside each connection is that select code. 001 selects AR, 010 selects PC, 011 selects DR, 100 selects AC, 101 selects IR, 110 selects TR, and 111 selects the memory. The other units see the word that is on the bus. A load input LD copies the bus into a register. INR increments the register. CLR clears it. A clock edge is what makes LD, INR, and CLR take effect.",
    "Memory is reached through AR. The address lines into memory come from AR. Read copies the selected memory word onto the bus, and from there it can be loaded into DR or IR. Write copies the bus into the memory word selected by AR. Beside AC sits the adder and logic, with the flip-flop E holding the carry out of an addition.",
    "Two transfers show the bus at work. For DR ← AC the select lines are $S_2 S_1 S_0 = 100$, so AC drives the bus, and LD of DR copies that word into DR. For AC ← DR the select lines are $S_2 S_1 S_0 = 011$, so DR drives the bus, and LD of AC copies that word into AC. The same bus and the same clock serve every other register transfer in the machine.",
  ],
  circuitDiagram: computerRegistersTheoryDiagram,
};
