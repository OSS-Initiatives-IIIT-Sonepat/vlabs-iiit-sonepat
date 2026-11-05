import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "One flowchart is the whole basic computer. Start clears SC, IEN, and R. R = 0 fetches and decodes. R = 1 saves PC at location 0 and branches to location 1.",
    "D7 separates register and input-output instructions from memory-reference instructions, and I separates each pair. Execute clears SC. Control returns along the border to R, and the next cycle begins.",
  ],
};
