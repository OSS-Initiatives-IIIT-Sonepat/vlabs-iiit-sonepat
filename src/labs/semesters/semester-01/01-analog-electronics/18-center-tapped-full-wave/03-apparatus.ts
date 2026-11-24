import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Centre-tapped transformer",
      specification: "12-0-12 V secondary, 50 Hz",
      quantity: "1",
    },
    {
      name: "Rectifier diode",
      specification: "1N4007",
      quantity: "2",
    },
    {
      name: "Load resistor",
      specification: "1 kΩ, 0.5 W",
      quantity: "1",
    },
    {
      name: "Filter capacitor",
      specification: "100 µF, 25 V electrolytic",
      quantity: "1",
    },
    {
      name: "DC voltmeter",
      specification: "0–20 V",
      quantity: "1",
    },
    {
      name: "Cathode ray oscilloscope",
      specification: "Across the load",
      quantity: "1",
    },
    {
      name: "Breadboard and jumpers",
      specification: "Solderless breadboard",
      quantity: "1",
    },
  ],
};
