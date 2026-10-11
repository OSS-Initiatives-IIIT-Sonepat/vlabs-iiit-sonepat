import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const apparatus: Section = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Op-amp IC LM741",
      specification:
        "General-purpose op-amp, 8-pin DIP. Quantity: 2 (one for each amplifier, built side by side)",
    },
    {
      name: "Dual DC regulated power supply",
      specification:
        "Two channels, 0–30 V: channel 1 set to +12 V and channel 2 to −12 V about a common ground. Quantity: 1",
    },
    {
      name: "Function generator",
      specification:
        "Sine wave output, 1 kHz, adjustable to 1 V peak-to-peak. Quantity: 1 (one connection per amplifier)",
    },
    {
      name: "Cathode ray oscilloscope (CRO)",
      specification:
        "Dual-trace, 20 MHz or higher, with two probes. Quantity: 1 (one connection per amplifier)",
    },
    {
      name: "Resistors",
      specification:
        "1/4 W, ±5%: 10 kΩ, 22 kΩ, 47 kΩ and 100 kΩ, one of each. Quantity: 4",
    },
    {
      name: "Digital multimeter",
      specification:
        "For checking resistor values and supply voltages. Quantity: 1",
    },
    {
      name: "Breadboard",
      specification:
        "Solderless, 60-column long breadboard with power rails. Quantity: 1",
    },
    {
      name: "Connecting wires and probe leads",
      specification: "Single-strand jumper wires and BNC leads. As required",
    },
  ],
};
