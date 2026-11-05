import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "D1", specification: "Priority 1, requesting", quantity: "1" },
    { name: "D2", specification: "Priority 2, requesting", quantity: "1" },
  ],
};
