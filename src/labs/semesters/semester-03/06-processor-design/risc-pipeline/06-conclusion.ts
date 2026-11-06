import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A three-segment RISC pipe inserts a no-operation when an add follows the two loads that produce its operands.",
  ],
};
