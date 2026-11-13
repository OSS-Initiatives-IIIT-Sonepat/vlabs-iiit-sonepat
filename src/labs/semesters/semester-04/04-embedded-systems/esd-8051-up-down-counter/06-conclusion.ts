import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "Reading an input pin inside the loop lets the program change behaviour at run time. The up/down counter combines an input read, a decision and an output write, which is the core of most embedded control code.",
  ],
};
