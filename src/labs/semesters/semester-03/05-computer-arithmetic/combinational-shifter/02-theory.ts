import { type TheorySection } from "@/labs/lab-content.types";
import { combinationalShifterTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/combinational-shifter";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A logical shift writes 0 into the end that opens up. With R1 = 1101, a logical shift left gives 1010 and a logical shift right gives 0110.",
    "A circular shift, also called a rotate, connects the bit that falls off back to the serial input. Nothing is lost. Circular left of 1101 is 1011. Circular right is 1110.",
    "An arithmetic shift treats the word as a signed number. Shift left multiplies by 2, so 1101 becomes 1010. Shift right divides by 2 and copies the sign bit into the vacated place, so 1101 becomes 1110.",
    "The combinational shifter has data inputs A0 through A3 and outputs H0 through H3. Index 0 is the left bit of the written word. IR is the serial input for a shift right. IL is the serial input for a shift left.",
    "One select line S drives every multiplexer. S = 0 takes the upper input, and the bits move down the drawing: that is a shift right. H0 = IR, H1 = A0, H2 = A1, and H3 = A2. S = 1 takes the lower input, and the bits move up: H0 = A1, H1 = A2, H2 = A3, and H3 = IL.",
    "The three kinds of shift are the same wiring. Only IR and IL change. A logical shift ties the serial input to 0. A circular shift ties it to the bit that just shifted out. An arithmetic shift right ties IR to the sign bit A0, and an arithmetic shift left ties IL to 0.",
  ],
  circuitDiagram: combinationalShifterTheoryDiagram,
};
