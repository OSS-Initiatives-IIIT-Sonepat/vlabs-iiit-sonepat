import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Symbol table",
      specification: "A = 106, B = 107, C = 108",
      quantity: "1",
    },
    {
      name: "Memory word",
      specification: "One 16-bit instruction",
      quantity: "1",
    },
    {
      name: "Accumulator",
      specification: "The value after each instruction",
      quantity: "1",
    },
  ],
};
