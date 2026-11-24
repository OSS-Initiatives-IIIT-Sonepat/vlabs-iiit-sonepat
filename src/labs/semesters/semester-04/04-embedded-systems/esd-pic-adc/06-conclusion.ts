import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The PIC18 ADC turns a voltage into a 10-bit number that software can compare, store or display. The same divider idea applies to any sensor that changes a resistance.",
  ],
};
