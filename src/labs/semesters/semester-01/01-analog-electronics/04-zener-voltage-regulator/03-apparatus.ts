import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "DC regulated power supply",
      specification: "0-30 V, 1 A, variable (1 piece)",
    },
    {
      name: "Zener diode",
      specification: "5.1 V, 500 mW, 1N4733A or BZX55C5V1 (1 piece)",
    },
    { name: "Resistor Rs", specification: "330 Ω, 1/4 W, ±5 % (1 piece)" },
    {
      name: "Load resistors RL and RL2",
      specification: "1 kΩ, 1/4 W, ±5 % (2 pieces)",
    },
    {
      name: "Digital multimeter",
      specification: "DC voltage range 0-20 V (1 piece)",
    },
    { name: "Breadboard", specification: "Solderless (1 piece)" },
    {
      name: "Connecting wires",
      specification: "Single-core, assorted colours",
    },
  ],
};
