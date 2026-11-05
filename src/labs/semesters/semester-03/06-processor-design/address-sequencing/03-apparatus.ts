import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Opcode mapping", specification: "Sends CAR to 40", quantity: "1" },
    { name: "Increment", specification: "40 becomes 41", quantity: "1" },
    { name: "Branch and return", specification: "60, and the saved 16", quantity: "1" },
  ],
};
