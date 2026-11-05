import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "Booth recodes a run of 1s as one subtraction and one addition, then shifts. The extra bit Q-1 remembers the bit that just left Q.",
    "Five cycles on these five-bit registers produce the positive product of two negative numbers.",
  ],
};
