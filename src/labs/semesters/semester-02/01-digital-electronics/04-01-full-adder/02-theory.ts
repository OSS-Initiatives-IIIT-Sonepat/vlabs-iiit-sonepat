import { type LabSection } from "@/labs/lab-content.types";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A full adder is a combinational circuit that adds three 1-bit inputs: the two operand bits A and B, and a carry-in Cin coming from the previous stage. It produces a Sum bit and a carry-out Cout. Chaining full adders gives a multi-bit ripple-carry adder.",
    "Boolean expressions: Sum = A ⊕ B ⊕ Cin and Cout = A·B + Cin·(A ⊕ B).",
    "Construction: a full adder is two half adders joined by an OR gate. The first half adder produces x = A ⊕ B and the partial carry A·B. The second half adder adds Cin to x, giving Sum = x ⊕ Cin and the partial carry Cin·x. The OR gate merges the two partial carries: Cout = A·B + Cin·x.",
    "Gates used: two XOR (74HC86), two AND (74HC08) and one OR (74HC32). Inputs are applied at the tie-points on the left of the breadboard and the outputs are shown on LEDs through 330 Ω current-limiting resistors.",
    "Working: Sum is 1 when an odd number of inputs are 1. Cout is 1 when at least two inputs are 1, which is the majority function of A, B and Cin.",
  ],
};
