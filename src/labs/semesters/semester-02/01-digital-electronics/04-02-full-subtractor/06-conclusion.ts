import { type LabSection } from "@/labs/lab-content.types";

export const conclusion: LabSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The observed outputs match the truth table of a full subtractor. The Difference equals A ⊕ B ⊕ Bin and the Borrow equals A'·B + Bin·(A ⊕ B)' for all eight input combinations. A borrow is generated whenever B + Bin is greater than A, and the circuit can be cascaded to subtract multi-bit numbers.",
  ],
};
