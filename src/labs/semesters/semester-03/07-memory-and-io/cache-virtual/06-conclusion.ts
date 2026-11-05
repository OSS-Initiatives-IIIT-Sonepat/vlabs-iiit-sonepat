import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
  "The three cache maps differ in how many lines are allowed to hold a given address.",
  "A page table is the map from a page number to a frame. A missing frame is a page fault."
],
};
