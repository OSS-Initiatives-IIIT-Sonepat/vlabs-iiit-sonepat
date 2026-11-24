import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Inductor",
      specification: "10 mH",
      quantity: "1",
    },
    {
      name: "Capacitor",
      specification: "0.1 µF and 0.22 µF",
      quantity: "1 each",
    },
    {
      name: "Resistor",
      specification: "1 kΩ and 470 Ω, 0.25 W",
      quantity: "1 each",
    },
    {
      name: "Function generator",
      specification: "Sine wave, 2 V peak-to-peak, 50 Hz to 20 kHz",
      quantity: "1",
    },
    {
      name: "Cathode ray oscilloscope",
      specification: "Across the parallel combination",
      quantity: "1",
    },
    {
      name: "AC milliammeter",
      specification: "Line current, and capacitor branch current",
      quantity: "2",
    },
    {
      name: "Breadboard and jumpers",
      specification: "Solderless breadboard",
      quantity: "1",
    },
  ],
};
