import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "PIC18F4550 trainer",
      specification: "40-pin, 8-bit, internal oscillator",
      quantity: "1",
    },
    { name: "Breadboard", specification: "830 tie-point", quantity: "1" },
    { name: "Resistor", specification: "330 ohm, 1/4 W", quantity: "1" },
    { name: "LED", specification: "Red, 5 mm", quantity: "1" },
    {
      name: "Jumper wires",
      specification: "Red, orange, black",
      quantity: "4",
    },
    { name: "USB programmer and MPLAB XC8 compiler", quantity: "1" },
  ],
};
