import { type TheorySection } from "@/labs/lab-content.types";
import { arithmeticLogicShiftTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/arithmetic-logic-shift";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A computer does not give every register its own adder. The registers share one arithmetic logic unit. The words to be operated on are placed on the ALU inputs, the ALU produces F, and F is written back to a register.",
    "One stage is drawn here. The arithmetic stage outputs Di. Its multiplexer sets Y to 0, B, B', or all 1s, and Di = Ai + Y + Cin. The logic stage outputs Ei. The same S1 and S0 choose AND, OR, XOR, or the complement of Ai.",
    "A 4×1 multiplexer on the stage output selects F. S3 S2 = 00 selects Di. 01 selects Ei. 10 selects the shift-right input, which is Ai−1, and a 0 enters at the left end. 11 selects the shift-left input, which is Ai+1, and a 0 enters at the right end.",
    "A is tied to 1101 and B to 0011, written with the left bit as index 0. The arithmetic results, carry included and then the four lamps, are 0 1101, 0 1110, 1 0000, 1 0001, 1 1001, 1 1010, 1 1100, and 1 1101. The lamps show only F. On an add they are dark, because the 1 is the carry.",
    "The logic results are 0001, 1111, 1110, and 0010. Shift right reads 0110. Shift left reads 1010.",
  ],
  circuitDiagram: arithmeticLogicShiftTheoryDiagram,
};
