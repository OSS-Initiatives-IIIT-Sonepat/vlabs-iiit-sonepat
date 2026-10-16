import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const apparatus: Section = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "NPN transistor BC547",
      specification: "TO-92, hFE 110–800, Ic(max) 100 mA. Quantity: 1",
    },
    {
      name: "Red LED",
      specification: "5 mm, Vf ≈ 1.9 V at 10 mA. Quantity: 1",
    },
    {
      name: "Resistors",
      specification: "1/4 W, ±5%: 330 Ω, 10 kΩ and 1 MΩ, one of each. Quantity: 3",
    },
    {
      name: "DC regulated power supply",
      specification: "+5 V, 500 mA. Quantity: 1",
    },
    {
      name: "Digital multimeters",
      specification: "DC voltage range, for VCE and VBE. Quantity: 2",
    },
    {
      name: "Breadboard",
      specification: "Solderless breadboard with power rails. Quantity: 1",
    },
    {
      name: "Connecting wires",
      specification: "Single-strand jumper wires. As required",
    },
  ],
};
