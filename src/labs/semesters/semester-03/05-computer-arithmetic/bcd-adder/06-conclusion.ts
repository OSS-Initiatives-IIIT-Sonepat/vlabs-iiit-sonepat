import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "BCD addition is a binary add followed by a correction of 6 whenever the sum is greater than 9.",
    "The correction test C = K + Z8·Z4 + Z8·Z2 catches both a carry out and the illegal nibbles 1010 through 1111.",
  ],
};
