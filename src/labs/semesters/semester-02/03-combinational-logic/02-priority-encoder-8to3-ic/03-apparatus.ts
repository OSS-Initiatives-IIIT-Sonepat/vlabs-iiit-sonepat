import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const apparatus: Section = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "74HC148 IC", specification: "8-to-3 line priority encoder, DIP-16, 5 V. Quantity: 1" },
    { name: "LEDs", specification: "5 mm: 3 red (A2, A1, A0), 1 yellow (GS'), 1 green (EO'). Quantity: 5" },
    { name: "Resistors", specification: "330 Ω (LED current limiting) × 5 and 10 kΩ (input pull-ups) × 8. Quantity: 13" },
    { name: "DIP switch", specification: "8-way, for inputs I0–I7 (each switch pulls its input to ground). Quantity: 1" },
    { name: "DC regulated power supply", specification: "+5 V, 500 mA. Quantity: 1" },
    { name: "Breadboard", specification: "Long solderless breadboard (60 columns) with power rails. Quantity: 1" },
    { name: "Connecting wires", specification: "Single-strand jumper wires, assorted colours. As required" },
  ],
};
