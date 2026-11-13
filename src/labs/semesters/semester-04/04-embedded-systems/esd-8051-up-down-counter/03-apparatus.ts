import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "8051 trainer", quantity: "1" },
    { name: "Breadboard", specification: "830 tie-point", quantity: "1" },
    { name: "Resistor", specification: "330 ohm, 1/4 W", quantity: "4" },
    { name: "LED", specification: "5 mm, four colours", quantity: "4" },
    { name: "Push-button", specification: "Tactile, 4-leg", quantity: "1" },
    { name: "Jumper wires", quantity: "14" },
    { name: "Keil C51 compiler and programmer", quantity: "1" },
  ],
};
