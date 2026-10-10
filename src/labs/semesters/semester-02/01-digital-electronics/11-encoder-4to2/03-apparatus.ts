import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    {
      name: "Breadboard",
      specification: "30-column solderless",
      quantity: "1",
    },
    {
      name: "OR gate IC",
      specification: "74HC32 (quad 2-input OR) – one gate used per IC",
      quantity: "2",
    },
    { name: "Resistor", specification: "330 Ω, 1/4 W", quantity: "2" },
    { name: "LED", specification: "Green and yellow, 5 mm", quantity: "2" },
    { name: "DC power supply", specification: "+5 V", quantity: "1" },
    {
      name: "Jumper wires",
      specification: "Assorted colours",
      quantity: "As required",
    },
  ],
};
