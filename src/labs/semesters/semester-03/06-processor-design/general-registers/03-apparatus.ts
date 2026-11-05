import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Registers R2 and R3", specification: "Hold 4 and 5", quantity: "1" },
    { name: "A bus and B bus", specification: "Selected by SELA and SELB", quantity: "1" },
    { name: "ALU", specification: "OPR = 00010 is ADD", quantity: "1" },
    { name: "Destination decoder", specification: "SELD = 001 loads R1", quantity: "1" },
  ],
};
