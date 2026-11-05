import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Attached processor", specification: "Local memory and a high-speed bus", quantity: "1" },
    { name: "SIMD array", specification: "PE1 … PEn, each with memory Mi", quantity: "1" },
    { name: "Control", specification: "One instruction for every element", quantity: "1" },
  ],
};
