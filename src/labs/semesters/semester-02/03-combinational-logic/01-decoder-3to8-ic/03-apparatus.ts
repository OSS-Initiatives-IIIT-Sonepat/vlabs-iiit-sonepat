import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const apparatus: Section = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "74HC138 IC", specification: "3-to-8 line decoder/demultiplexer, DIP-16, 5 V. Quantity: 1" },
    { name: "LEDs", specification: "5 mm: 4 red (Y0–Y3) and 4 green (Y4–Y7). Quantity: 8" },
    { name: "Resistors", specification: "330 Ω, 1/4 W, current limiting. Quantity: 8" },
    { name: "DIP switch", specification: "3-way, for address inputs A2, A1 and A0. Quantity: 1" },
    { name: "DC regulated power supply", specification: "+5 V, 500 mA. Quantity: 1" },
    { name: "Breadboard", specification: "Long solderless breadboard (60 columns) with power rails. Quantity: 1" },
    { name: "Connecting wires", specification: "Single-strand jumper wires, assorted colours. As required" },
  ],
};
