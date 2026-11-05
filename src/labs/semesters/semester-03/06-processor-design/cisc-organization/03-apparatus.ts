import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "M[X]", specification: "Starts at 4", quantity: "1" },
    { name: "M[Y]", specification: "Holds 5", quantity: "1" },
    { name: "Microprogram", specification: "Four steps for one opcode", quantity: "1" },
  ],
};
