import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Minuend A", specification: "+5, sign 0, magnitude 0101", quantity: "1" },
    { name: "Subtrahend B", specification: "+7, sign 0, magnitude 0111", quantity: "1" },
    { name: "Add overflow pair", specification: "+9 and +9, magnitudes 1001", quantity: "1" },
  ],
};
