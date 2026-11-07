import { type TheorySection } from "@/labs/lab-content.types";
import { multiply8bitTheoryDiagram } from "@/labs/schematics/semester-04/01-8085-assembly-programming/assembly-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The 8085 microprocessor does not have a dedicated hardware multiply instruction. Multiplication is implemented in software using repeated addition: A × B = A added B times. The result is stored as a 16-bit value in the HL register pair to handle products up to 255 × 255 = 65025.",
    "The algorithm initialises a 16-bit accumulator (H=00H, L=00H) to zero. A loop counter is set to the multiplier B. In each iteration, the multiplicand A is added to L. If an 8-bit carry results from this addition, it is propagated to H using the ADC instruction.",
    "The INX H and DCX H instructions increment/decrement the HL pair without affecting flags. DCR B decrements the loop counter; when B reaches 0 the Zero flag is set. JNZ (Jump if Not Zero) branches back to the loop body while B ≠ 0.",
    "Key instructions: MVI loads immediate data. DAD H doubles HL (shift-left), which is an alternative for powers-of-two multiplication. MOV copies between registers. SHLD stores HL to memory so the 16-bit product can be written out.",
    "The time complexity is O(B) additions, so this method is slow for large multipliers. A faster approach uses shift-and-add (binary multiplication), but the repeated-addition approach is simpler to understand for introductory labs.",
  ],
  circuitDiagram: multiply8bitTheoryDiagram,
};
