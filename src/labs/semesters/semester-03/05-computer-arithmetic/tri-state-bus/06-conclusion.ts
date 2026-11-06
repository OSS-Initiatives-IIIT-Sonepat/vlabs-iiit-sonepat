import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "Four tri-state buffers can share one bus line when a 2×4 decoder lets only one of them drive it. The other three outputs stay in high impedance.",
  ],
};
