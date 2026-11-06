import { type TheorySection } from "@/labs/lab-content.types";
import { machineAndAssemblyTheoryDiagram } from "@/labs/schematics/semester-03/08-assembly-systems/machine-and-assembly";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A machine instruction is the 16-bit word stored in memory. An assembly line is the same instruction written with a mnemonic and a symbol.",
    "LDA A with A at address 106 is the word 206A. ADD B with B at 107 is 106B. CMA has no address and is the register instruction 7200. STA C with C at 108 is 306C.",
    "A at 106 holds 0100 and B at 107 holds 0011. The program loads, adds, complements, and stores.",
  ],
  circuitDiagram: machineAndAssemblyTheoryDiagram,
};
