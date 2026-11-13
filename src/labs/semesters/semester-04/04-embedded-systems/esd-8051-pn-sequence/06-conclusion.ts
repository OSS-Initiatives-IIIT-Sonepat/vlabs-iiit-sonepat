import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "An 8-bit LFSR with a maximal tap set gives a sequence of 255 states before it repeats. XOR feedback and a shift are all the logic needed, so the same generator fits in a few lines of C or a few instructions of assembly.",
  ],
};
