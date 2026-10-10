import { type LabSection } from "@/labs/lab-content.types";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A full subtractor is a combinational circuit that subtracts two 1-bit numbers while also accounting for a borrow coming from the previous stage. It has three inputs: the minuend A, the subtrahend B and the borrow-in Bin. It produces a Difference D = A − B − Bin and a borrow-out Bout.",
    "Boolean expressions: D = A ⊕ B ⊕ Bin and Bout = A'·B + Bin·(A ⊕ B)'. The Difference has the same expression as the Sum of a full adder; only the borrow differs from the carry.",
    "Simplified borrow logic: since A'·B = B·(A ⊕ B), the borrow can be written as a selection. When A ≠ B, Bout = B (a borrow occurs only for A = 0, B = 1). When A = B, the borrow-in simply passes through, so Bout = Bin.",
    "Implementation used in this lab (5 gates): x = A ⊕ B, D = x ⊕ Bin, t = B ⊕ Bin, g = x · t and Bout = Bin ⊕ g. If x = 0 then g = 0 and Bout = Bin. If x = 1 then g = B ⊕ Bin and Bout = Bin ⊕ B ⊕ Bin = B. This is equivalent to the textbook equation and needs no NOT gates.",
    "Gates used: four XOR (74HC86) and one AND (74HC08). Inputs are applied at the tie-points on the left of the breadboard and the outputs are shown on LEDs through 330 Ω current-limiting resistors.",
  ],
};
