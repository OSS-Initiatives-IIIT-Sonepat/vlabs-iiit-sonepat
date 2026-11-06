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
      name: "74HC138 decoder IC",
      specification: "DIP-16, selects the word",
      quantity: "1",
    },
    {
      name: "74HC04 hex inverter IC",
      specification: "DIP-14, active-low select to the lamp",
      quantity: "1",
    },
    {
      name: "74HC74 D flip-flop IC",
      specification: "DIP-14, one stored bit",
      quantity: "1",
    },
    {
      name: "LED",
      specification: "5 mm, word select and stored Q",
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
