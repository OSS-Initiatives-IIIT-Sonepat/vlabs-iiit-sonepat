import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Accumulator", specification: "Starts at 0101", quantity: "1" },
    { name: "Data register", specification: "Holds 0011", quantity: "1" },
    { name: "Adder", specification: "AC + DR", quantity: "1" },
    { name: "Logic and shift", specification: "AND, complement, and shift right", quantity: "1" },
  ],
};
