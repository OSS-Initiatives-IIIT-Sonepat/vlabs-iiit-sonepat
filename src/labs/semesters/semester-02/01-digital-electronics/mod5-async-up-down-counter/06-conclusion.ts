import { type LabSection } from "@/labs/lab-content.types";

export const conclusion: LabSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The asynchronous counter built from toggle D flip-flops counted 0 → 1 → 2 → 3 → 4 → 0 in up mode and 0 → 4 → 3 → 2 → 1 → 0 in down mode, so it has five stable states and is a MOD-5 up/down counter. The XOR gates select the direction, and the NAND-based reset logic forces the wrap-around. Ripple delay makes asynchronous counters slower than synchronous ones, but they need less logic.",
  ],
} as LabSection;
