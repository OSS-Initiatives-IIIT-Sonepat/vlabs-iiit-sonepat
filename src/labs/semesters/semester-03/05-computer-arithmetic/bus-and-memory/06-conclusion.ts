import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A bus transfer is a three-state enable, not a private wire. A memory transfer is that same bus plus the address in AR and a read or a write.",
  ],
};
