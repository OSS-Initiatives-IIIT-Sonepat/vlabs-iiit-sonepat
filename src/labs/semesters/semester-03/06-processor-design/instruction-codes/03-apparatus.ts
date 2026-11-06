import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Memory", specification: "4096 words x 16 bits", quantity: "1" },
    {
      name: "Control register",
      specification: "Holds the instruction read from memory",
      quantity: "1",
    },
    {
      name: "Accumulator (AC)",
      specification: "Processor register that receives the operand",
      quantity: "1",
    },
  ],
};
