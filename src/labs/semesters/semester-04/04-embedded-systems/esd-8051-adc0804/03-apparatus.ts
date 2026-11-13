import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "8051 trainer", quantity: "1" },
    { name: "ADC0804", specification: "8-bit, DIP-20, 5 V", quantity: "1" },
    { name: "Breadboard", specification: "830 tie-point", quantity: "1" },
    { name: "Resistor", specification: "10 kohm, 1/4 W", quantity: "3" },
    { name: "Capacitor", specification: "150 pF ceramic", quantity: "1" },
    { name: "Jumper wires", quantity: "30" },
    { name: "Keil C51 compiler and programmer", quantity: "1" },
  ],
};
