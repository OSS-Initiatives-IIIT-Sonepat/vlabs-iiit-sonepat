import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const apparatus: Section = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Inductor",
      specification: "10 mH axial choke, winding resistance below 30 Ω. Quantity: 1",
    },
    {
      name: "Capacitor",
      specification: "0.1 µF polyester film, ±10%. Quantity: 1",
    },
    {
      name: "Resistor",
      specification: "100 Ω, 1/4 W, ±5%. Quantity: 1",
    },
    {
      name: "Function generator",
      specification: "Sine wave output, 100 Hz – 100 kHz, set to 2 V peak-to-peak. Quantity: 1",
    },
    {
      name: "Cathode ray oscilloscope (CRO)",
      specification: "Dual-trace, 20 MHz: CH1 across R, CH2 on the input for phase. Quantity: 1",
    },
    {
      name: "Digital multimeter",
      specification: "AC voltage range, used across the capacitor. Quantity: 1",
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
