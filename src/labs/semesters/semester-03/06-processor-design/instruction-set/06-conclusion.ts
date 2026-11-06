import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The opcode selects the class. I is only consulted when the opcode is 111, where it chooses a register operation or an I/O operation.",
  ],
};
