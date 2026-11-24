import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Digital IC trainer / +5 V DC power supply",
      specification: "Regulated +5 V DC, 500 mA",
      quantity: "1",
    },
    {
      name: "Breadboard",
      specification: "Long solderless breadboard (60 columns)",
      quantity: "1",
    },
    {
      name: "74HC86 XOR Gate IC",
      specification: "Quad 2-input XOR gate, DIP-14 — one for each converter",
      quantity: "2",
    },
    {
      name: "Red LED",
      specification: "5 mm (G₃ and B₃ output bits)",
      quantity: "2",
    },
    {
      name: "Yellow LED",
      specification: "5 mm (G₂ and B₂ output bits)",
      quantity: "2",
    },
    {
      name: "Green LED",
      specification: "5 mm (G₁ and B₁ output bits)",
      quantity: "2",
    },
    {
      name: "Blue LED",
      specification: "5 mm (G₀ and B₀ output bits)",
      quantity: "2",
    },
    {
      name: "Resistor",
      specification: "330 Ω, 1/4 W carbon film (current limiter)",
      quantity: "8",
    },
    {
      name: "Connecting wires",
      specification: "Single-core jumper wires, assorted colours",
      quantity: "As required",
    },
  ],
};
