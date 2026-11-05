import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Breadboard",
      specification: "Long solderless breadboard, 60 columns",
      quantity: "1",
    },
    {
      name: "DC Power Supply",
      specification: "5 V regulated",
      quantity: "1",
    },
    {
      name: "74HC08 quad AND gate IC",
      specification: "DIP-14, partial-product ANDs",
      quantity: "1",
    },
    {
      name: "74HC86 quad XOR gate IC",
      specification: "DIP-14, sum of the column",
      quantity: "1",
    },
    {
      name: "LED",
      specification: "5 mm, sum and carry of the column",
      quantity: "2",
    },
    {
      name: "330 ohm resistor",
      specification: "0.25 W, LED current limit",
      quantity: "2",
    },
    {
      name: "Jumper wire",
      specification: "22 AWG solid-core",
      quantity: "1 set",
    },
  ],
};
