import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    {
      name: "Digital IC trainer / DC power supply",
      specification: "Regulated +5 V",
      quantity: "1",
    },
    {
      name: "Breadboard",
      specification: "Standard, 830 points",
      quantity: "1",
    },
    {
      name: "Dual JK flip-flop IC",
      specification: "74HC76, negative-edge triggered, with PRE and CLR",
      quantity: "2",
    },
    {
      name: "Quad 2-input NAND gate IC",
      specification: "74HC00",
      quantity: "1",
    },
    {
      name: "Triple 3-input NAND gate IC",
      specification: "74HC10",
      quantity: "1",
    },
    { name: "LED", specification: "5 mm, any colour", quantity: "3" },
    { name: "Resistor", specification: "330 Ω, 1/4 W", quantity: "3" },
    {
      name: "Clock source",
      specification: "1 Hz clock from the trainer, or a debounced pulse switch",
      quantity: "1",
    },
    {
      name: "CRO (optional)",
      specification: "Dual channel, for timing diagram",
      quantity: "1",
    },
    {
      name: "Connecting wires",
      specification: "Single-core, jumper type",
      quantity: "As required",
    },
  ],
};
