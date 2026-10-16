import { type LabSection } from "@/labs/lab-content.types";
import { s2HalfAdderSubtractorTheoryDiagram } from "@/labs/schematics/semester-02/01-digital-electronics/03-half-adder-subtractor";

export const theory: LabSection = {
  id: "theory",
  title: "Theory",
  type: "text",
  paragraphs: [
    "A half adder adds two single-bit numbers A and B. It produces two outputs: Sum and Carry. The Sum is $A \\oplus B$ and the Carry is $A \\cdot B$. It is called 'half' because it has no carry input, so it cannot be chained directly to add multi-bit numbers.",
    "A half subtractor subtracts B from A (both single bits). It produces a Difference and a Borrow. The Difference is $A \\oplus B$ and the Borrow is $\\overline{A} \\cdot B$. A borrow is needed only when A = 0 and B = 1.",
    "Notice that the Sum of the half adder and the Difference of the half subtractor are the same expression, $A \\oplus B$. One XOR gate therefore drives a single output that is read as Sum when adding and as Difference when subtracting.",
    "The two circuits differ only in their second output. The adder takes Carry = $A \\cdot B$ directly, while the subtractor first inverts A with a NOT gate and then ANDs it with B to get Borrow = $\\overline{A} \\cdot B$.",
    "Gates used: one XOR (74HC86), two AND (74HC08) and one NOT (74HC04). Truth table, for inputs A and B: (0,0) gives Sum/Diff = 0, Carry = 0, Borrow = 0. (0,1) gives Sum/Diff = 1, Carry = 0, Borrow = 1. (1,0) gives Sum/Diff = 1, Carry = 0, Borrow = 0. (1,1) gives Sum/Diff = 0, Carry = 1, Borrow = 0.",
  ],
  audioPath:
    "/semesters/semester-02/01-digital-electronics/half-adder-subtractor/02_theory_english.mp3",
  circuitDiagram: s2HalfAdderSubtractorTheoryDiagram,
};
