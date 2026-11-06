import { type TheorySection } from "@/labs/lab-content.types";
import { assemblerSecondPassTheoryDiagram } from "@/labs/schematics/semester-03/08-assembly-systems/assembler-second-pass";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The second pass already has a symbol table. It scans one line at a time and keeps a location counter, LC.",
    "A pseudo-instruction does not become a memory word. ORG sets LC. END stops the pass.",
    "A memory-reference instruction takes its opcode from bits 2–4 and its address from the symbol table. LDA, ADD, BSA, and BUN are memory-reference instructions. ADD is the arithmetic one, BSA calls a subroutine, and BUN branches, which is how a loop returns.",
    "Anything else is tested as a non-MRI. A decimal or hex constant is converted and stored at LC. An I/O instruction such as INP has its own binary word, F800. An unrecognised line is an error.",
    "A stored word is written at the address in LC, and LC then increments by one.",
  ],
  circuitDiagram: assemblerSecondPassTheoryDiagram,
};
