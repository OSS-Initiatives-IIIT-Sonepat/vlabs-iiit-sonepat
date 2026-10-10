import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    {
      name: "Long breadboard",
      specification: "60-column solderless",
      quantity: "1",
    },
    {
      name: "NOR gate IC",
      specification: "74HC02 (quad 2-input NOR) – one gate used",
      quantity: "1",
    },
    {
      name: "XOR gate IC",
      specification: "74HC86 (quad 2-input XOR) – one gate used",
      quantity: "1",
    },
    {
      name: "AND gate IC",
      specification: "74HC08 (quad 2-input AND) – one gate used per IC",
      quantity: "3",
    },
    { name: "Resistor", specification: "330 Ω, 1/4 W", quantity: "4" },
    {
      name: "LED",
      specification: "Green, yellow, red, blue, 5 mm",
      quantity: "4",
    },
    { name: "DC power supply", specification: "+5 V", quantity: "1" },
    {
      name: "Jumper wires",
      specification: "Assorted colours",
      quantity: "As required",
    },
  ],
};
