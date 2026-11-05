import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Memory 100", specification: "Holds 4", quantity: "1" },
    { name: "R3", specification: "Holds 5", quantity: "1" },
    { name: "Memory 200", specification: "Receives the sum", quantity: "1" },
  ],
};
