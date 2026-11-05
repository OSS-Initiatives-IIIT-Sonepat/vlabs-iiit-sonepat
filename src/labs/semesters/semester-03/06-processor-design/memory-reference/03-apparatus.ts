import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Accumulator", specification: "AC, 16 bits, and the carry flip-flop E", quantity: "1" },
    { name: "Data register", specification: "DR, 16 bits, holds the operand read from memory", quantity: "1" },
    { name: "Address register", specification: "AR, 12 bits, the effective address", quantity: "1" },
    { name: "Program counter", specification: "PC, 12 bits", quantity: "1" },
    { name: "Memory", specification: "4096 words x 16 bits", quantity: "1" },
    { name: "Sequence counter", specification: "SC, cleared when the instruction finishes", quantity: "1" },
  ],
};
