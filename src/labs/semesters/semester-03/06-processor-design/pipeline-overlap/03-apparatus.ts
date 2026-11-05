import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Segments", specification: "S1 R1, S2 R2, S3 R3, S4 R4", quantity: "1" },
    { name: "Instructions", specification: "I1, I2, I3", quantity: "1" },
  ],
};
