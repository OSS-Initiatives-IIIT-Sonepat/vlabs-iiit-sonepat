import { type TheorySection } from "@/labs/lab-content.types";
import { s2BcdXs3ConverterTheoryDiagram } from "@/labs/schematics/semester-02/01-digital-electronics/05-bcd-xs3-converter";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Digital code converters are combinational circuits that translate information encoded in one binary format into another equivalent representation without altering the underlying numerical value. Code converters are fundamental in digital telecommunication, display decoders, error detection systems, and arithmetic processing units.",
    "Binary Coded Decimal (BCD / 8421 code) represents each decimal digit (0 through 9) using a unique 4-bit binary group (0000₂ to 1001₂). The remaining six combinations (1010₂ to 1111₂) are invalid states treated as don't-care conditions during circuit synthesis.",
    "Excess-3 (XS-3) code is an unweighted, self-complementing binary code formed by adding 3 (0011₂) to each 4-bit BCD digit. Its primary advantage is that the 9's complement of any decimal digit directly corresponds to the 1's complement (bitwise inversion) of its Excess-3 code, which substantially simplifies subtraction operations in digital arithmetic circuits.",
    "Using Karnaugh maps (K-maps) to minimise the output functions with inputs A (MSB), B, C, D (LSB) and don't-cares for states 10 through 15, the simplified Boolean equations for the Excess-3 output bits W (MSB), X, Y, Z (LSB) are: W = A + B(C + D), X = B ⊕ (C + D), Y = (C ⊕ D)', and Z = D'. Here, (C + D) is shared between the generation of W and X, demonstrating resource sharing in multi-output combinational logic.",
    "The physical realization utilizes standard 74HC CMOS logic IC packages: 74HC04 (Hex Inverter), 74HC08 (Quad 2-Input AND Gate), 74HC32 (Quad 2-Input OR Gate), and 74HC86 (Quad 2-Input XOR Gate), powered by a regulated +5 V DC supply. Output logic states are monitored using four colored LEDs (W = Red, X = Yellow, Y = Green, Z = Blue) protected by 330 Ω current-limiting resistors.",
  ],
  circuitDiagram: s2BcdXs3ConverterTheoryDiagram,
};
