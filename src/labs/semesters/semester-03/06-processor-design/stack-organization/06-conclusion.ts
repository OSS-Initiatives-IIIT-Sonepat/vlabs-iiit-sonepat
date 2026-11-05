import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A register stack pushes by incrementing SP and then writing. A memory stack pushes by decrementing SP and then writing. POP on the register stack reads first and then decrements SP.",
  ],
};
