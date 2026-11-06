import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "Register transfer language writes a copy as R2 ← R1. A control function P in front of the colon lets the copy happen only when P is 1, on the clock edge. R2's lamps match R1 only after that edge.",
  ],
};
