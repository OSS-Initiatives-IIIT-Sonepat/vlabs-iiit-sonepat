import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    {
      name: "Breadboard (wide, 100-column)",
      specification: "830-point",
      quantity: "1",
    },
    {
      name: "IC 74HC86 (quad 2-input XOR)",
      specification: "DIP-14",
      quantity: "2",
    },
    {
      name: "IC 74HC08 (quad 2-input AND)",
      specification: "DIP-14",
      quantity: "2",
    },
    {
      name: "IC 74HC32 (quad 2-input OR)",
      specification: "DIP-14",
      quantity: "1",
    },
    { name: "LED (green)", specification: "5 mm, sum outputs", quantity: "4" },
    {
      name: "LED (yellow)",
      specification: "5 mm, carry output",
      quantity: "1",
    },
    { name: "Resistor", specification: "330 \u03a9, 1/4 W", quantity: "5" },
    { name: "DC power supply", specification: "+5 V", quantity: "1" },
    {
      name: "Connecting wires",
      specification: "single-core, assorted colours",
      quantity: "As required",
    },
  ],
};
