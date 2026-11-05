import { type TheorySection } from "@/labs/lab-content.types";
import { boothMultiplierTheoryDiagram } from "@/labs/schematics/semester-03/01-combinational-arithmetic/booths-multiplier";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram: boothMultiplierTheoryDiagram,
  paragraphs: [
    "Booth's algorithm is a signed binary multiplication method that works directly with 2's complement numbers, eliminating the need for separate sign handling. It examines the multiplier bits in pairs (current bit and the previous bit) and decides to add, subtract, or do nothing — this reduces the number of additions/subtractions for numbers with long runs of 1s.",
    'The algorithm uses a triple (A, Q, Q₋₁) where A is the accumulator, Q holds the multiplier, and Q₋₁ is a single-bit register initialized to 0 (representing the "previous bit" before Q). M is the multiplicand. The operation depends on (Q₀, Q₋₁): $$\\begin{cases} 00 \\to \\text{no operation} \\\\ 01 \\to A = A + M \\\\ 10 \\to A = A - M \\\\ 11 \\to \\text{no operation} \\end{cases}$$ After each decision, arithmetic right shift the combined (A, Q, Q₋₁) register by 1 bit. Repeat for n steps where n is the number of multiplier bits.',
    "The arithmetic right shift preserves the sign bit (MSB is copied, not shifted in as 0). After n iterations, the product is in (A, Q) — A holds the upper half and Q holds the lower half of the 2n-bit result.",
    "Booth's algorithm is particularly efficient for numbers with long strings of 1s: e.g., multiplying by 0b01111110 (= 126) normally requires 6 additions, but Booth's algorithm sees 01 at the start (add) and 10 at the end (subtract) and does nothing in between: 126 = 128 − 2 = only 2 operations!",
    "Modified Booth (Radix-4 Booth) encoding examines 3-bit groups overlapping by 1 bit, halving the number of partial products for an n-bit multiplier. This is the basis of all modern hardware multipliers in CPUs and DSPs.",
  ],
};
