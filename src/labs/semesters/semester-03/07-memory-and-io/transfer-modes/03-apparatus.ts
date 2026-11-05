import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Byte", specification: "One input character", quantity: "1" },
    {
      name: "CPU",
      specification: "Can poll, can be interrupted, or can release the bus",
      quantity: "1",
    },
  ],
};
