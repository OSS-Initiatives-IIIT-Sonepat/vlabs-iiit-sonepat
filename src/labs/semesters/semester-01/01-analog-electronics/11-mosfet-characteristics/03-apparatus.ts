import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "N-channel enhancement MOSFET",
      specification: "2N7000 or equivalent",
      quantity: "1",
    },
    {
      name: "Variable DC supply (drain supply, VDD)",
      specification: "0 - 15 V",
      quantity: "1",
    },
    {
      name: "Variable DC supply (gate supply, VGS)",
      specification: "0 - 6 V",
      quantity: "1",
    },
    {
      name: "Resistor (drain resistor RD)",
      specification: "100 Ω, 0.5 W",
      quantity: "1",
    },
    { name: "Digital multimeter", specification: "3.5 digit", quantity: "3" },
    { name: "Breadboard and connecting wires", quantity: "1" },
  ],
};
