import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "NPN transistor",
      specification: "BC547",
      quantity: "1",
    },
    {
      name: "Base resistor",
      specification: "100 kΩ, 0.25 W",
      quantity: "1",
    },
    {
      name: "DC regulated supply",
      specification: "0–12 V, one for VBB and one for VCC",
      quantity: "2",
    },
    {
      name: "DC microammeter",
      specification: "0–100 µA, for IB",
      quantity: "1",
    },
    {
      name: "DC milliammeter",
      specification: "0–10 mA, for IC",
      quantity: "1",
    },
    {
      name: "DC voltmeter",
      specification: "0–10 V, for VBE and VCE",
      quantity: "2",
    },
    {
      name: "Breadboard and jumpers",
      specification: "Solderless breadboard",
      quantity: "1",
    },
  ],
};
