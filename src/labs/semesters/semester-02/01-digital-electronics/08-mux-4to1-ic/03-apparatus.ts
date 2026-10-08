import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    { name: "Breadboard", specification: "830-point", quantity: "1" },
    { name: "DC power supply", specification: "+5 V", quantity: "1" },
    {
      name: "74HC153 dual 4:1 multiplexer IC",
      specification: "DIP-16",
      quantity: "1",
    },
    { name: "Resistor", specification: "330 Ω", quantity: "1" },
    { name: "LED", specification: "Green, 5 mm", quantity: "1" },
    {
      name: "Connecting wires",
      specification: "Single-core jumper",
      quantity: "1",
    },
  ],
};
