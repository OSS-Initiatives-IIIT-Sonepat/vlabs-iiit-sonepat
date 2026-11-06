import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The breadboard selects AND, OR, or XOR with S1 and S0. A full ALU repeats that slice for every bit and adds an adder, so the same select lines also cover addition and two's-complement subtraction. The flags below are read from that wider result, not from the single LED.",
    "Key findings: (1) Unsigned carry and signed overflow are distinct conditions and require separate flags. (2) Subtraction is implemented via two's complement addition, unifying the adder hardware. (3) Bitwise operations generate flags just like arithmetic operations, enabling conditional branching in real CPUs.",
    "The 4-bit ALU forms the computational core of every processor. Modern CPUs extend this to 64 bits and add many more operations, but the fundamental flag logic remains the same.",
  ],
};
