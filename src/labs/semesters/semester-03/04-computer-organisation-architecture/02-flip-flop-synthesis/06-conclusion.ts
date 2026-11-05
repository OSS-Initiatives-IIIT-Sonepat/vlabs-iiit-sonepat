import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "Flip-flop synthesis starts from the next-state table. SR, JK, D, and T are four encodings of the same one-bit memory, related by $Q^+ = S + \\bar{R} Q$, $Q^+ = J\\bar{Q} + \\bar{K} Q$, $Q^+ = D$, and $Q^+ = T \\oplus Q$.",
    "The excitation table turns a desired transition into pin values. Setting $J = D$ and $K = \\bar{D}$ makes a JK flip-flop behave as a D flip-flop, which is the register cell used by the Registers and Counters lab.",
  ],
};
