import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "PIC18F4550 trainer", quantity: "1" },
    { name: "Breadboard", specification: "830 tie-point", quantity: "1" },
    { name: "Resistor", specification: "10 kohm, 1/4 W", quantity: "2" },
    { name: "Resistor", specification: "330 ohm, 1/4 W", quantity: "1" },
    { name: "LED", specification: "Red, 5 mm", quantity: "1" },
    { name: "Jumper wires", quantity: "7" },
  ],
};
