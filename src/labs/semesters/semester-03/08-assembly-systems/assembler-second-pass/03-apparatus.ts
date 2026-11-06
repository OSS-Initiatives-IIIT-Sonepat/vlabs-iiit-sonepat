import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Location counter",
      specification: "LC, starts at 0",
      quantity: "1",
    },
    {
      name: "Symbol table",
      specification: "X = 106, Y = 107, SUB = 108",
      quantity: "1",
    },
    {
      name: "Source line",
      specification: "One assembly statement",
      quantity: "1",
    },
    {
      name: "Memory word",
      specification: "The binary instruction stored at LC",
      quantity: "1",
    },
  ],
};
