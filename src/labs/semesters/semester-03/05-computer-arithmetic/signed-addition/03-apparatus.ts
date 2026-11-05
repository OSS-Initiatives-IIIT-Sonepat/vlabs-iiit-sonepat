import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Sign bit As",
      specification: "Sign of the first operand",
      quantity: "1",
    },
    {
      name: "Sign bit Bs",
      specification: "Sign of the second operand",
      quantity: "1",
    },
    {
      name: "Magnitude adder",
      specification: "Adds A and B, or A and the complement of B",
      quantity: "1",
    },
    {
      name: "End carry E",
      specification: "Carry out of the magnitude",
      quantity: "1",
    },
    {
      name: "Overflow flag AVF",
      specification: "Set when the magnitude does not fit",
      quantity: "1",
    },
  ],
};
