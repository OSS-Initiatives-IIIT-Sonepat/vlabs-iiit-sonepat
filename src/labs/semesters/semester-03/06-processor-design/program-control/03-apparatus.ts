import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Status bit Z",
      specification: "1, the accumulator is zero",
      quantity: "1",
    },
    {
      name: "Program counter",
      specification: "101, the branch instruction",
      quantity: "1",
    },
    { name: "Target", specification: "200", quantity: "1" },
  ],
};
