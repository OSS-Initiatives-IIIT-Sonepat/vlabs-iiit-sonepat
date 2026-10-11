import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The 4-bit Binary-to-Gray code converter was successfully designed, constructed on the solderless breadboard, and experimentally verified using 74HC86 XOR gate ICs.",
    "The measured output LED logic levels perfectly matched the theoretical truth table for all sixteen binary combinations (0000₂ through 1111₂), confirming the core equations G₃ = B₃, G₂ = B₃ ⊕ B₂, G₁ = B₂ ⊕ B₁, and G₀ = B₁ ⊕ B₀.",
    "The unit-distance property of Gray code was experimentally validated: consecutive count states produced exactly one bit transition at a time, preventing multi-bit asynchronous race conditions and eliminating transient switching noise.",
    "The complementary reverse operation (Gray-to-Binary conversion) was analyzed and proven mathematically (B₃ = G₃, B₂ = B₃ ⊕ G₂, B₁ = B₂ ⊕ G₁, B₀ = B₁ ⊕ G₀), demonstrating the duality and importance of unit-distance codes in precision digital measurement systems.",
  ],
};
