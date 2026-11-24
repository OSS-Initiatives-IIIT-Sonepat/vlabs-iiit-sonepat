import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A software delay is only as accurate as the clock it runs on. Halving the clock doubles every delay. Hardware timers, covered in the next experiments, keep time without blocking the CPU.",
  ],
};
