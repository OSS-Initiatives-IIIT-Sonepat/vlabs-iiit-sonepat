import { type LabSection } from "@/labs/lab-content.types";

export const conclusion: LabSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A MOD-5 asynchronous UP counter and a MOD-5 asynchronous DOWN counter were designed with three JK flip-flops in toggle mode. The UP counter counted 0 to 4 and the DOWN counter counted 4 to 0, and both repeated correctly.",
    "The UP counter was truncated to MOD-5 by clearing all flip-flops through NAND($Q_A$, $Q_C$) at state 101. The DOWN counter was truncated by detecting 111 with NAND($Q_A$, $Q_B$, $Q_C$) and clearing $A$ and $B$, which reloads 100. Both counters divide the clock frequency by 5, and both are self-starting.",
  ],
};
