import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Segments", specification: "I, A, and E", quantity: "1" },
    { name: "Loads", specification: "Load R1, then Load R2", quantity: "1" },
    { name: "Delay", specification: "NOP before Add R1+R2", quantity: "1" },
  ],
};
