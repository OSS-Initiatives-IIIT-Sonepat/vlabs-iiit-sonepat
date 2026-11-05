import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "ADD 1547 is an instruction code. ADD is the opcode and is given one unique binary code. 1547 is the address that goes with it.",
    "The memory is 4096 words by 16 bits. An instruction spends bits 15 to 12 on the opcode and bits 11 to 0 on the address. A data word spends all 16 bits on the operand. The result is added into the accumulator.",
    "With I = 0 the instruction at address 22, 0 ADD 457, adds the word stored at 457. With I = 1 the instruction at address 35, 1 ADD 300, reads 1350 from word 300 and adds the word stored at 1350.",
  ],
  table: {
    headers: ["Address", "I", "Instruction", "Operand address", "Added to AC"],
    rows: [
      ["22", "0", "ADD 457", "457", "word 457"],
      ["35", "1", "ADD 300", "1350, read from word 300", "word 1350"],
    ],
  },
};
