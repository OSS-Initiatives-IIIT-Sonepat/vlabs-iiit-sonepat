import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "8051 trainer", quantity: "1" },
    { name: "Breadboard", specification: "830 tie-point", quantity: "1" },
    { name: "Resistor", specification: "20 kohm, 1/4 W", quantity: "2" },
    { name: "Resistor", specification: "10 kohm, 1/4 W", quantity: "2" },
    { name: "Voltmeter", specification: "0 to 15 V DC", quantity: "1" },
    { name: "Jumper wires", quantity: "15" },
    { name: "Keil C51 compiler and programmer", quantity: "1" },
  ],
};
