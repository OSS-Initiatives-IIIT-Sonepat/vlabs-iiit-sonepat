import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Program counter", specification: "Starts at 100", quantity: "1" },
    {
      name: "Address and instruction registers",
      specification: "AR and IR",
      quantity: "1",
    },
    {
      name: "Accumulator and data register",
      specification: "AC and DR",
      quantity: "1",
    },
    {
      name: "Memory word 108",
      specification: "Holds the operand 5",
      quantity: "1",
    },
  ],
};
