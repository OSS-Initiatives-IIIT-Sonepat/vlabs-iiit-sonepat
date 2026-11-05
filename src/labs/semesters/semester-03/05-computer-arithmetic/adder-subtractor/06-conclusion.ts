import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A 4-bit adder becomes a subtractor when each B bit is XORed with 1 and the carry into bit 0 is held at 1. One mode wire M does both jobs. For A = 1010 and B = 0011, M = 0 gives 01101 and M = 1 gives 10111.",
  ],
};
