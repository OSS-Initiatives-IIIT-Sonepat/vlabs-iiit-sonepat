import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The seven memory-reference instructions execute from T4, with the effective address already in AR. AND, ADD, and LDA read the operand through DR. STA stores AC. BUN replaces PC. Each of them clears SC when it finishes.",
    "BSA saves the return address at the effective address, points AR at the next word, and then copies that word's address into PC. ISZ reads a memory word into DR, increments it, stores it back, and skips the next instruction when the result is zero.",
  ],
};
