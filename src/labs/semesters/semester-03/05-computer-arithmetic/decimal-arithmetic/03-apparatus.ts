import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Digit A", specification: "BCD 1001, the value 9", quantity: "1" },
    { name: "Digit B", specification: "BCD 0111, the value 7", quantity: "1" },
    { name: "Correction", specification: "0110, added when K = 1", quantity: "1" },
  ],
};
