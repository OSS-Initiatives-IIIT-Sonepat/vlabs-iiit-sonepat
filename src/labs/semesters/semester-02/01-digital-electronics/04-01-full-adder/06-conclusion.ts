import { type LabSection } from "@/labs/lab-content.types";

export const conclusion: LabSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The observed outputs match the truth table of a full adder. The Sum output equals A ⊕ B ⊕ Cin and the Cout output equals A·B + Cin·(A ⊕ B) for all eight input combinations, so the circuit correctly adds three 1-bit numbers.",
  ],
};
