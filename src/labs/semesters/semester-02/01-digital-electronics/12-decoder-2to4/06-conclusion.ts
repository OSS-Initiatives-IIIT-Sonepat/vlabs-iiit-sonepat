import { type LabSection } from "@/labs/lab-content.types";

export const conclusion: LabSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The 2-to-4 decoder was built with NOR, XOR and AND gates. For every combination of $A_1A_0$ exactly one output went high, matching the truth table and verifying the design.",
  ],
};
