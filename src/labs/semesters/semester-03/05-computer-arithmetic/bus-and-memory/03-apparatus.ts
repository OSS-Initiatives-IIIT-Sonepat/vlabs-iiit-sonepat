import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Address register", specification: "Holds 5", quantity: "1" },
    { name: "Register R1", specification: "Holds 1010, three-state output", quantity: "1" },
    { name: "Memory word 5", specification: "Starts as 1100", quantity: "1" },
    { name: "Data register", specification: "Loads from the bus or drives it", quantity: "1" },
  ],
};
