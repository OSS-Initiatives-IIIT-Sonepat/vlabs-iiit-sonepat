import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Segments", specification: "FI, DA, FO, EX", quantity: "1" },
    {
      name: "Branch",
      specification: "Empties the pipe and updates PC",
      quantity: "1",
    },
  ],
};
