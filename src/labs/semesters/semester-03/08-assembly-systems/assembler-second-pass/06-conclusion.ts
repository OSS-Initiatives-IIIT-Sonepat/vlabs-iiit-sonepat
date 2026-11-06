import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The second pass is one flowchart: scan a line, send pseudo-instructions to LC, send memory-reference instructions through the symbol table, and send everything else through the non-MRI path.",
    "A loop, a subroutine call, an arithmetic instruction, and an I/O instruction are four lines in that same pass. Each becomes one stored word, except ORG and END.",
  ],
};
