import { type TheorySection } from "@/labs/lab-content.types";
import { decimalArithmeticTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/decimal-arithmetic";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A BCD digit is four bits, 0000 through 1001. Add 0110 when the carry K is 1, or when Z8(Z4 + Z2) is 1.",
    "1001 + 0111 = 1 0000. K is 1, so add 0110. The BCD result is 0001 0110, which is 16.",
  ],
  circuitDiagram: decimalArithmeticTheoryDiagram,
};
