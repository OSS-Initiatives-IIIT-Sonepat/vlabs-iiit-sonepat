import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Terminal",
      specification: "keyboard and printer, 8-bit characters",
      quantity: "1",
    },
    {
      name: "Input register",
      specification: "INPR, 8 bits, and flag FGI",
      quantity: "1",
    },
    {
      name: "Output register",
      specification: "OUTR, 8 bits, and flag FGO",
      quantity: "1",
    },
    {
      name: "Accumulator",
      specification: "AC, the low 8 bits exchange the character",
      quantity: "1",
    },
    { name: "Interrupt flip-flops", specification: "IEN and R", quantity: "2" },
    {
      name: "Memory",
      specification:
        "location 0 holds the return address, location 1 holds the branch",
      quantity: "1",
    },
  ],
};
