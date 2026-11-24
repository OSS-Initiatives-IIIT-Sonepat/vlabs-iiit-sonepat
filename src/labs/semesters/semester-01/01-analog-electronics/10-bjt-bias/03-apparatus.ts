import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Breadboard",
      specification: "830 tie-point, solderless",
      quantity: "1",
    },
    {
      name: "BC547 NPN Transistor",
      specification: "TO-92, $\\beta \\approx 200$",
      quantity: "2",
    },
    {
      name: "R_B Fixed Bias",
      specification: "$470\\,\\text{k}\\Omega$, ¼ W",
      quantity: "1",
    },
    {
      name: "R1 VDB Top Resistor",
      specification: "$100\\,\\text{k}\\Omega$, ¼ W",
      quantity: "1",
    },
    {
      name: "R2 VDB Bottom Resistor",
      specification: "$10\\,\\text{k}\\Omega$, ¼ W",
      quantity: "1",
    },
    {
      name: "R_C Collector Load",
      specification: "$4.7\\,\\text{k}\\Omega$, ¼ W",
      quantity: "2",
    },
    {
      name: "R_E Emitter Resistor",
      specification: "$1\\,\\text{k}\\Omega$, ¼ W",
      quantity: "1",
    },
    {
      name: "DC Power Supply",
      specification: "12 V regulated, 500 mA",
      quantity: "1",
    },
    {
      name: "Digital Multimeter",
      specification: "DC voltage + DC mA",
      quantity: "2",
    },
    {
      name: "Jumper wires",
      specification: "Red and black",
      quantity: "1 set",
    },
  ],
};
