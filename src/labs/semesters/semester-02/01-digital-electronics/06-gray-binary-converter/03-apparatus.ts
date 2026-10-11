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
      specification: "Quad 2-input XOR gate, DIP-14, 5 V CMOS",
      quantity: "1",
    },
    {
      name: "Red LED",
      specification: "5 mm, Vf ≈ 2.0 V (G₃ output bit)",
      quantity: "1",
    },
    {
      name: "Yellow LED",
      specification: "5 mm, Vf ≈ 2.1 V (G₂ output bit)",
      quantity: "1",
    },
    {
      name: "Green LED",
      specification: "5 mm, Vf ≈ 2.0 V (G₁ output bit)",
      quantity: "1",
    },
    {
      name: "Blue LED",
      specification: "5 mm, Vf ≈ 3.0 V (G₀ output bit)",
      quantity: "1",
    },
    {
      name: "Resistor",
      specification: "330 Ω, 1/4 W carbon film (current limiter)",
      quantity: "4",
    },
    {
      name: "Connecting wires",
      specification: "Single-core jumper wires, assorted colours",
      quantity: "As required",
    },
  ],
};
