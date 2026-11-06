import { type TheorySection } from "@/labs/lab-content.types";
import { bcdAdderTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/bcd-adder";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A BCD digit is four bits that must stay in the range 0 to 9. Two digits added as binary can produce 10 to 18, which is not a BCD digit.",
    "The correction bit is C = K + Z8·Z4 + Z8·Z2. K is the carry out of the first adder. Z8, Z4, and Z2 are the binary sum bits of weights 8, 4, and 2.",
    "When C is 1 the second adder adds 0110, which is 6. The carry out of that adder is the tens digit. This lab checks 9 + 5 = 14, written 0001 0100.",
  ],
  circuitDiagram: bcdAdderTheoryDiagram,
};
