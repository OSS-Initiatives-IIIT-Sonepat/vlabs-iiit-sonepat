import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Registers", specification: "R2 = 4, R3 = 5", quantity: "1" },
    {
      name: "Accumulator",
      specification: "Starts at 0 for the one-address form",
      quantity: "1",
    },
    {
      name: "Stack",
      specification: "Holds 4 then 5 for the zero-address form",
      quantity: "1",
    },
  ],
};
