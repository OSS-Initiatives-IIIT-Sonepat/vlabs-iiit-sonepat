import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "An instruction code pairs an opcode with an address. The opcode needs at least n bits to name 2^n operations. In the 4096 × 16 stored-program memory, 12 bits address every word and the other 4 bits name the operation. On the basic computer, bit 15 of that word is the mode I and bits 14 to 12 remain the opcode.",
    "I = 0 uses the address written in the instruction, so 0 ADD 457 at address 22 adds memory word 457 to AC. I = 1 uses that address to fetch the operand address, so 1 ADD 300 at address 35 reads 1350 from word 300 and adds memory word 1350 to AC.",
  ],
};
