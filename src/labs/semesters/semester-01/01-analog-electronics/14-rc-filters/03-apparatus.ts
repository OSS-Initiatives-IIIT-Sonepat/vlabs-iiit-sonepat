import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const apparatus: Section = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Function generator",
      specification: "Sine wave output, 10 Hz – 1 MHz, set to 2 V peak-to-peak. Quantity: 1",
    },
    {
      name: "Cathode ray oscilloscope (CRO)",
      specification: "Dual-trace, 20 MHz, CH1 on the output and CH2 on the input for phase measurement. Quantity: 1",
    },
    {
      name: "Resistors",
      specification: "1 kΩ, 1/4 W, ±5%. Quantity: 2",
    },
    {
      name: "Capacitors",
      specification: "0.1 µF ceramic or polyester film, ±10%. Quantity: 2",
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
