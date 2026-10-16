import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const apparatus: Section = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "74HC161 IC", specification: "4-bit synchronous binary counter, DIP-16, 5 V. Quantity: 1" },
    { name: "74HC00 IC", specification: "Quad 2-input NAND gate, DIP-14, for the MOD-10 decode. Quantity: 1" },
    { name: "LEDs", specification: "5 mm: 4 red (Q0–Q3) and 1 yellow (RCO). Quantity: 5" },
    { name: "Resistors", specification: "330 Ω, 1/4 W, current limiting. Quantity: 5" },
    { name: "Function generator", specification: "Square wave, 0–5 V (TTL output), set to 1 Hz as the clock. Quantity: 1" },
    { name: "DC regulated power supply", specification: "+5 V, 500 mA. Quantity: 1" },
    { name: "Breadboard", specification: "Long solderless breadboard (60 columns) with power rails. Quantity: 1" },
    { name: "Connecting wires", specification: "Single-strand jumper wires, assorted colours. As required" },
  ],
};
