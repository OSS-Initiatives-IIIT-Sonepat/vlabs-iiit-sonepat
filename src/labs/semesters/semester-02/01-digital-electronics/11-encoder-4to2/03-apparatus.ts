import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "74HC32 Quad 2-input OR IC",
      specification: "DIP-14 (two OR gates used)",
      quantity: "1",
    },
    {
      name: "74HC04 Hex Inverter IC",
      specification: "DIP-14 (one inverter used, I2′)",
      quantity: "1",
    },
    {
      name: "74HC08 Quad 2-input AND IC",
      specification: "DIP-14 (one AND gate used, I1·I2′)",
      quantity: "1",
    },
    {
      name: "LED",
      specification: "Red, 5 mm (output A — MSB)",
      quantity: "1",
    },
    {
      name: "LED",
      specification: "Green, 5 mm (output B — LSB)",
      quantity: "1",
    },
    {
      name: "Resistor (current limiting)",
      specification: "330 Ω, 0.25 W",
      quantity: "2",
    },
    {
      name: "SPDT Switch / Jumper",
      specification: "Logic input (I0, I1, I2, I3 — one active at a time)",
      quantity: "4",
    },
    {
      name: "DC Power Supply",
      specification: "5 V regulated",
      quantity: "1",
    },
    {
      name: "Bread Board",
      specification: "Full size, 830 tie-points",
      quantity: "1",
    },
    {
      name: "Connecting Wires",
      specification: "22 AWG solid-core jumper wires",
      quantity: "15",
    },
  ],
};
