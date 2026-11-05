import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Instruction word", specification: "16 bits, I and opcode and address", quantity: "1" },
    { name: "Memory-reference decoder", specification: "Opcodes 000 to 110", quantity: "1" },
    { name: "Register-reference flags", specification: "Opcode 111, I = 0", quantity: "1" },
    { name: "I/O decoder", specification: "Opcode 111, I = 1", quantity: "1" },
  ],
};
