import { type TheorySection } from "@/labs/lab-content.types";
import { fullSubtractorTheoryDiagram } from "@/labs/schematics/semester-01/02-computer-application/full-subtractor";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A Full Subtractor is a combinational logic circuit that performs binary subtraction of three bits: minuend A, subtrahend B, and borrow-in Bin (carry from a previous less-significant stage). It produces two outputs: the Difference D and the Borrow-out Bout. The Full Subtractor extends the Half Subtractor by handling the additional borrow-in bit, enabling cascading for multi-bit subtraction.",
    "The Boolean expressions for the Full Subtractor are derived from its truth table using Karnaugh maps or direct observation: Difference D = A ⊕ B ⊕ Bin. Borrow-out Bout = A'·B + A'·Bin + B·Bin = A'·(B + Bin) + B·Bin. An equivalent factored form convenient for implementation is: Bout = A'·B + Bin·(A ⊕ B)' = A'·B + Bin·(A XNOR B), but the most gate-efficient realisation uses the intermediate term P = A ⊕ B: Bout = A'·B + Bin·P', where P' = NOT(A⊕B). Alternatively, Bout = (A·B')'·... A cleaner derivation: Bout = A'·B·Bin' + A'·B'·Bin + A·B·Bin + A'·B·Bin, which simplifies to A'B + BinB + A'Bin.",
    "Gate-level implementation: two XOR gates (74HC86) compute P = A⊕B and D = P⊕Bin. A NOT gate (74HC04) computes A'. Two AND gates (74HC08) compute A'·B and Bin·(A'·B + additional terms) — depending on the chosen minimised expression. One OR gate (74HC32) combines the AND terms to produce Bout. Total ICs: 1× 74HC86, 1× 74HC04, 1× 74HC08, 1× 74HC32.",
    "A Full Subtractor can also be realised from two Half Subtractors: first HS computes D1 = A⊕B and Bout1 = A'·B; second HS computes D = D1⊕Bin and Bout2 = D1'·Bin; final Bout = Bout1 + Bout2 via one OR gate. This modular construction mirrors the Full Adder from two Half Adders and is instructive for understanding combinational design methodology.",
  ],
  circuitDiagram: fullSubtractorTheoryDiagram,
};
