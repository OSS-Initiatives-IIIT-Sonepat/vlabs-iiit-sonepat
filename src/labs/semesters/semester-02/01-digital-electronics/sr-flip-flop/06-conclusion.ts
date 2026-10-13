import { type LabSection } from "@/labs/lab-content.types";

export const conclusion: LabSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The S-R flip-flop was constructed from two cross-coupled NOR gates. It set for $S=1, R=0$, reset for $S=0, R=1$ and held its previous state for $S=R=0$, which shows that it stores one bit. The condition $S=R=1$ forced both outputs to 0 and is therefore not allowed in normal operation.",
  ],
};
