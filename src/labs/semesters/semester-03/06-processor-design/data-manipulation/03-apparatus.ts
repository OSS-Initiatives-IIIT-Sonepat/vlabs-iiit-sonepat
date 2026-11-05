import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "MOV", specification: "R2 = 0101 copied to R1", quantity: "1" },
    { name: "ADD", specification: "0101 + 0011", quantity: "1" },
    { name: "XOR and SHR", specification: "0101 ⊕ 0011, and 0101 shifted", quantity: "1" },
  ],
};
