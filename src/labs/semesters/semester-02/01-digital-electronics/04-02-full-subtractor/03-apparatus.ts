import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Long breadboard",
      specification: "60 columns",
      quantity: "1",
    },
    {
      name: "XOR gate IC",
      specification: "74HC86",
      quantity: "4",
    },
    {
      name: "AND gate IC",
      specification: "74HC08",
      quantity: "1",
    },
    {
      name: "LED",
      specification: "Green (Difference), Yellow (Borrow)",
      quantity: "2",
    },
    {
      name: "Resistor",
      specification: "330 Ω, 1/4 W",
      quantity: "2",
    },
    {
      name: "DC supply",
      specification: "+5 V (trainer kit)",
      quantity: "1",
    },
    {
      name: "Connecting wires",
      specification: "Single-strand",
      quantity: "As required",
    },
  ],
};
