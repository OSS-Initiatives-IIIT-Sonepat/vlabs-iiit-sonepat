import { type TheorySection } from "@/labs/lab-content.types";
import { binaryAdder4TheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/binary-adder-4";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An arithmetic microoperation works on numbers held in registers. Addition is R3 ← R1 + R2. Subtraction is R3 ← R1 − R2, built as R1 plus the 2's complement of R2. A register is incremented with R1 ← R1 + 1 and decremented with R1 ← R1 − 1.",
    "The circuit that forms the sum of two binary numbers is a binary adder. It is a row of full adders. The carry out of one stage is the carry into the next higher stage.",
    "Bit 0 is the low-order bit, on the right. A = 1101 and B = 0111, with C0 = 0. The carries into the four stages are 1, 1, 1, and 0, and the sum is C4 S3 S2 S1 S0 = 1 0 1 0 0.",
    "An n-bit adder needs n full adders. The A bits can come from one register, such as R1, and the B bits from another, such as R2. The sum can be written into a third register, or back over R1 or R2.",
  ],
  circuitDiagram: binaryAdder4TheoryDiagram,
};
