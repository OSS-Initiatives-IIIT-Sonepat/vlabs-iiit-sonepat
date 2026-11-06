import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "Adding one to a register is a chain of half adders whose low stage is given the constant 1. For 1101 the chain produces 1110, and the carry out of bit 3 is 0. A 4-bit adder with B = 0000 and C0 = 1 does the same work.",
  ],
};
