import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    { name: "Breadboard", specification: "830-point", quantity: "1" },
    { name: "DC power supply", specification: "+5 V", quantity: "1" },
    {
      name: "74HC139 dual 2-to-4 decoder/demultiplexer IC",
      specification: "DIP-16",
      quantity: "1",
    },
    { name: "Resistor", specification: "330 Ω", quantity: "4" },
    { name: "LED", specification: "Green, 5 mm", quantity: "4" },
    {
      name: "Connecting wires",
      specification: "Single-core jumper",
      quantity: "1",
    },
  ],
};
