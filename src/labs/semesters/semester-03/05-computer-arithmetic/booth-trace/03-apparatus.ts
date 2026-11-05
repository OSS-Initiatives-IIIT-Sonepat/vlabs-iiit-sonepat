import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
  {
    "name": "Register AC",
    "specification": "Accumulator, five bits",
    "quantity": "1"
  },
  {
    "name": "Register Q",
    "specification": "Multiplier, five bits",
    "quantity": "1"
  },
  {
    "name": "Bit Q-1",
    "specification": "The multiplier bit that just shifted out",
    "quantity": "1"
  },
  {
    "name": "Register BR",
    "specification": "Multiplicand, held at 10111",
    "quantity": "1"
  }
],
};
