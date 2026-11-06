import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "F fields",
      specification: "F1 = add, F2 and F3 idle",
      quantity: "1",
    },
    {
      name: "CD and BR",
      specification: "Unconditional, use AD",
      quantity: "1",
    },
    { name: "AD", specification: "41", quantity: "1" },
  ],
};
