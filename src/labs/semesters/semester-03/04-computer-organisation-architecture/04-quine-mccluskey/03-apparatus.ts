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
      name: "74HC04 hex inverter IC",
      specification: "DIP-14",
      quantity: "2",
    },
    {
      name: "74HC00 quad NAND gate IC",
      specification: "DIP-14, NAND-NAND form of the cover",
      quantity: "2",
    },
    {
      name: "LED",
      specification: "5 mm, F",
      quantity: "1",
    },
    {
      name: "330 ohm resistor",
      specification: "0.25 W, LED current limit",
      quantity: "1",
    },
    {
      name: "Jumper wire",
      specification: "22 AWG solid-core",
      quantity: "1 set",
    },
  ],
};
