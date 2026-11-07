import { type TheorySection } from "@/labs/lab-content.types";
import { bcdAdditionTheoryDiagram } from "@/labs/schematics/semester-04/01-8085-assembly-programming/assembly-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Binary Coded Decimal (BCD) is a encoding where each decimal digit is represented by 4 binary bits. For example, decimal 25 is stored as 0010 0101B in packed BCD, not as 00011001B (binary 25). Packed BCD stores two decimal digits per byte.",
    "When two BCD numbers are added using the standard ADD instruction, the result may not be a valid BCD number because the binary addition does not respect the decimal digit boundary at nibble (4-bit) level. For example, adding BCD 09 + 01 gives binary 0AH, but the correct BCD result is 10H.",
    "The DAA (Decimal Adjust Accumulator) instruction corrects the result in A after an ADD/ADC operation. It adds 06H to the lower nibble if it exceeds 9 or if the Auxiliary Carry (AC) is set. It adds 60H to the upper nibble if it exceeds 9 or if the Carry (CY) is set. DAA updates all flags.",
    "The process: perform binary ADD of two packed BCD bytes, then execute DAA. The accumulator will then contain the correct packed BCD result. If the decimal sum exceeds 99, the Carry flag is set after DAA indicating a carry into the hundreds digit.",
    "DAA examines four conditions: (1) lower nibble > 9, (2) AC=1, (3) upper nibble > 9, (4) CY=1. For each condition the appropriate 06H or 60H correction is applied.",
  ],
  circuitDiagram: bcdAdditionTheoryDiagram,
};
