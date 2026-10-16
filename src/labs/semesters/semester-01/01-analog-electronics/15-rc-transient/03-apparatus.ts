import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const apparatus: Section = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Function generator",
      specification: "Square-wave output with DC offset, set to 0–5 V (5 V peak-to-peak, +2.5 V offset) at 100 Hz. Quantity: 1",
    },
    {
      name: "Cathode ray oscilloscope (CRO)",
      specification: "Dual-trace, 20 MHz, DC coupling, 1 V/div and 1 ms/div. Quantity: 1",
    },
    {
      name: "Resistors",
      specification: "1/4 W, ±5%: 10 kΩ and 4.7 kΩ, one of each. Quantity: 2",
    },
    {
      name: "Capacitor",
      specification: "0.1 µF polyester film, ±10%. Quantity: 1",
    },
    {
      name: "Breadboard",
      specification: "Solderless breadboard with power rails. Quantity: 1",
    },
    {
      name: "Connecting wires and probe leads",
      specification: "Single-strand jumper wires and BNC leads. As required",
    },
  ],
};
