import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "CAR", specification: "15", quantity: "1" },
    {
      name: "Control memory",
      specification: "A ROM of microinstructions",
      quantity: "1",
    },
    {
      name: "Word 15",
      specification: "The current control word",
      quantity: "1",
    },
  ],
};
