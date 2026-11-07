import { type TheorySection } from "@/labs/lab-content.types";
import { addSubCarryTheoryDiagram } from "@/labs/schematics/semester-04/01-8085-assembly-programming/assembly-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "When two 8-bit numbers are added, the result can exceed 8 bits (exceed 255). In such cases the Carry flag (CY) is set and the 9th bit is lost unless we explicitly handle it. The 8085 provides ADC (Add with Carry) and SBB (Subtract with Borrow) instructions for multi-precision arithmetic.",
    "The ADC r instruction adds the contents of register r plus the Carry flag to the accumulator: A = A + r + CY. This enables chained multi-byte addition. For a 16-bit result of adding two 8-bit numbers, the lower byte is stored in A and the carry is added to 00H to form the upper byte.",
    "Similarly, SBB r performs A = A - r - CY, enabling multi-byte subtraction with borrow propagation. The Carry flag acts as a borrow flag in subtraction: if CY=1 after SUB, a borrow occurred.",
    "A common technique is to use the HL register pair to store a 16-bit result. H holds the upper byte (carry) and L holds the lower byte (sum). The DAD instruction can add two 16-bit register pairs together.",
    "Algorithm: Load NUM1 → ADD NUM2 → store low byte (SUM_L). Load 00H → ADC 00H (adds carry) → store high byte (SUM_H). For subtraction: Load NUM1 → SUB NUM2. If CY set, complement and add 1 for absolute value.",
  ],
  circuitDiagram: addSubCarryTheoryDiagram,
};
