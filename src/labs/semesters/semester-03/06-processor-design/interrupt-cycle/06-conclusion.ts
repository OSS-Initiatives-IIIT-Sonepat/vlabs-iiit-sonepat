import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "An interrupt is three timed transfers, not an extra processor. It saves the return address at memory 0, starts the service program at address 1, and clears IEN so the routine is not interrupted by itself.",
  ],
};
