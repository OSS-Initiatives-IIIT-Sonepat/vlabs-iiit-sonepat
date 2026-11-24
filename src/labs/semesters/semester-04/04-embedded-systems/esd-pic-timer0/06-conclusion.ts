import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A hardware timer with a prescaler and an interrupt gives exact timing without blocking the CPU. The timer value is worked out from the clock, so changing the clock or the prescaler changes the timing in a predictable way.",
  ],
};
