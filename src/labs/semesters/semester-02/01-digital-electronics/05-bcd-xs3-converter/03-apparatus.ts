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
      name: "NOT gate IC",
      specification: "74HC04 (Hex inverter, DIP-14)",
      quantity: "1",
    },
    {
      name: "AND gate IC",
      specification: "74HC08 (Quad 2-input AND, DIP-14)",
      quantity: "1",
    },
    {
      name: "OR gate IC",
      specification: "74HC32 (Quad 2-input OR, DIP-14)",
      quantity: "1",
    },
    {
      name: "XOR gate IC",
      specification: "74HC86 (Quad 2-input XOR, DIP-14)",
      quantity: "1",
    },
    {
      name: "Red LED",
      specification: "5 mm, Vf ≈ 2.0 V (W output bit)",
      quantity: "1",
    },
    {
      name: "Yellow LED",
      specification: "5 mm, Vf ≈ 2.1 V (X output bit)",
      quantity: "1",
    },
    {
      name: "Green LED",
      specification: "5 mm, Vf ≈ 2.0 V (Y output bit)",
      quantity: "1",
    },
    {
      name: "Blue LED",
      specification: "5 mm, Vf ≈ 3.0 V (Z output bit)",
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
