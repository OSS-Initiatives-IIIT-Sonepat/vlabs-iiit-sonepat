import { type TheorySection } from "@/labs/lab-content.types";
import { binaryIncrementerTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/binary-incrementer";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The increment microoperation adds one to a number in a register. For a 4-bit word it is R1 ← R1 + 1. No second register is required: every B bit is 0, and the +1 is the carry into the low bit.",
    "A half adder is enough at each bit, because one input is a single carry rather than a full B bit. The x input is the register bit. The y input is the carry from the next lower bit. Bit 0 has no lower bit, so its y input is the constant 1.",
    "Start from the right. A0 is 1 and y is 1, so the sum bit is 0 and the carry is 1. A1 is 0 and that carry is 1, so the sum bit is 1 and the carry dies. A2 is 1 added to 0, and A3 is 1 added to 0. Both sum bits stay 1, and C4 is 0.",
    "The carries written above the bits are 0, 0, and 1, into bits 3, 2, and 1. The sum is C4 S3 S2 S1 S0 = 0 1110. That is 13 + 1 = 14.",
    "On the board the same operation is a 4-bit adder with B tied to 0000. Leaving C0 at 0 copies A, which is 1101. Raising C0 to 1 produces 1110.",
  ],
  circuitDiagram: binaryIncrementerTheoryDiagram,
};
