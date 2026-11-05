import { type TheorySection } from "@/labs/lab-content.types";
import { signedAdditionTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/signed-addition";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
  "A signed number in this unit is a sign bit and a magnitude. As is the sign of A and Bs is the sign of B. A 0 sign is positive.",
  "When the signs match, add the magnitudes. The result keeps the sign As. When the signs differ, add the two's complement of B's magnitude. That is a subtraction.",
  "E is the carry out of the magnitude adder. AVF, the overflow flag, is set when that magnitude does not fit. The last step of this lab checks +6 + +3."
],
  circuitDiagram: signedAdditionTheoryDiagram,
};
