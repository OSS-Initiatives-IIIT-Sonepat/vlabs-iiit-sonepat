import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The basic computer keeps addresses in the 12-bit registers PC and AR, a full word in IR, TR, DR, and AC, and one character in the 8-bit registers INPR and OUTR. Memory is 4096 words of 16 bits.",
    "One common bus, chosen by S2 S1 S0, moves a word between those registers. Select 100 with LD of DR gives DR ← AC. Select 011 with LD of AC gives AC ← DR. The clock is what makes the load happen.",
  ],
};
