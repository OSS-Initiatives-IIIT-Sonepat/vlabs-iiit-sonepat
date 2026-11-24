import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "DC regulated power supply",
      specification: "0–15 V, set to 9 V",
      quantity: "1",
    },
    {
      name: "Source resistor Rs",
      specification: "100 Ω, 0.5 W, ±1%",
      quantity: "1",
    },
    {
      name: "Load resistor",
      specification: "47 Ω, 100 Ω and 220 Ω, 0.5 W",
      quantity: "1 each",
    },
    {
      name: "DC milliammeter",
      specification: "0–100 mA, in series with the load",
      quantity: "1",
    },
    {
      name: "DC voltmeter",
      specification: "0–15 V, across the load",
      quantity: "1",
    },
    {
      name: "Breadboard and jumpers",
      specification: "Solderless breadboard",
      quantity: "1",
    },
  ],
};
