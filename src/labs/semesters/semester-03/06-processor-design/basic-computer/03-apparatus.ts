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
      name: "CPU chip",
      specification: "DIP-16, program counter on the address pins",
      quantity: "1",
    },
    {
      name: "RAM chip",
      specification: "DIP-16, four stored words",
      quantity: "1",
    },
    {
      name: "LED",
      specification: "5 mm, data bits D0 to D3",
      quantity: "4",
    },
    {
      name: "330 ohm resistor",
      specification: "0.25 W, LED current limit",
      quantity: "4",
    },
    {
      name: "Jumper wire",
      specification: "22 AWG solid-core",
      quantity: "1 set",
    },
  ],
};
