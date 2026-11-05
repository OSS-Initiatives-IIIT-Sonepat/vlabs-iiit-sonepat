import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Matrices", specification: "Two 3×3 arrays", quantity: "1" },
    { name: "Inner product", specification: "3 multiply-adds per row", quantity: "1" },
    { name: "Memory", specification: "Four interleaved modules", quantity: "1" },
  ],
};
