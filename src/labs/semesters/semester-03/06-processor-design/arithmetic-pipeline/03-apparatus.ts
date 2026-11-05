import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "X", specification: "0.9504 × 10³", quantity: "1" },
    { name: "Y", specification: "0.8200 × 10²", quantity: "1" },
    {
      name: "Stages",
      specification: "Compare, align, add, normalize",
      quantity: "1",
    },
  ],
};
