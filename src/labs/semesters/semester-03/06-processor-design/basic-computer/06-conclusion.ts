import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The program counter is the address on the pins. Memory answers with the word stored there.",
    "Direct and indirect addressing differ in whether the address field names the operand or names a pointer to the operand.",
  ],
};
