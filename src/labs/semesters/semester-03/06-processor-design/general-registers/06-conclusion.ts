import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A general-register operation is one control word: SELA, SELB, SELD, and OPR. For this add, those fields are 010, 011, 001, and 00010, and R1 becomes 9.",
  ],
};
