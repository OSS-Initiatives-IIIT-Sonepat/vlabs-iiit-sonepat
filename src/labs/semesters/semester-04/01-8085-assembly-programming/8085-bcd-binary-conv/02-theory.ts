import { type TheorySection } from "@/labs/lab-content.types";
import { bcdBinaryTheoryDiagram } from "@/labs/schematics/semester-04/01-8085-assembly-programming/assembly-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "BCD (Binary Coded Decimal) represents each decimal digit as a 4-bit nibble. Packed BCD stores two digits per byte: the upper nibble is the tens digit and the lower nibble is the units digit. For example, decimal 47 is stored as 0100 0111B = 47H in packed BCD.",
    "BCD to Binary conversion: extract the tens digit (upper nibble), multiply it by 10, then add the units digit (lower nibble). In 8085: mask upper nibble with ANI 0F0H, rotate right 4 times (RRC x4 or use RAR/ANI), multiply by 10 using a small loop, then ADD lower nibble.",
    "Binary to BCD conversion: repeatedly divide the binary number by 10 using the repeated-subtraction method. Each subtraction that succeeds contributes one unit to the BCD ones digit. When the quotient of dividing by 10 is non-zero, move it to the tens position. Alternatively, use the successive subtraction of 100, 10, 1.",
    "An important shortcut for binary to BCD: subtract 10 from the number while it is >= 10, counting subtractions. The count becomes the tens digit and the remainder becomes the units digit. Combine them: (tens << 4) | units to form packed BCD.",
    "The ANI instruction is used for masking: ANI 0F0H isolates the upper nibble, ANI 0FH isolates the lower nibble. The RLC/RRC instructions shift bits for nibble extraction. These are purely logical operations and do not set carry in a way that disrupts arithmetic.",
  ],
  circuitDiagram: bcdBinaryTheoryDiagram,
};
