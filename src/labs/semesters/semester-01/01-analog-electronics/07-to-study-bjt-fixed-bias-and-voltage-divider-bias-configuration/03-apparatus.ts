import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "NPN Bipolar Junction Transistor (BC547)",
      specification:
        "General-purpose silicon NPN transistor, TO-92 package, $\\beta \\approx 110\\text{–}800$",
      quantity: "2",
    },
    {
      name: "Regulated DC Power Supply",
      specification: "0 – 30 V, 2 A adjustable bench DC supply",
      quantity: "1",
    },
    {
      name: "Digital Multimeter (DMM)",
      specification:
        "DC voltage (mV/V) and current ($\\mu\\text{A}$/mA) measurement",
      quantity: "1",
    },
    {
      name: "Resistor $R_B$ (Fixed Bias Base Resistor)",
      specification: "470 k$\\Omega$, 0.25 W carbon film (±5%)",
      quantity: "1",
    },
    {
      name: "Resistors $R_1, R_2$ (Voltage Divider Network)",
      specification:
        "$R_1 = 100\\text{ k}\\Omega$, $R_2 = 10\\text{ k}\\Omega$, 0.25 W (±5%)",
      quantity: "1 each",
    },
    {
      name: "Resistor $R_C$ (Collector Load Resistor)",
      specification: "4.7 k$\\Omega$, 0.25 W carbon film (±5%)",
      quantity: "2",
    },
    {
      name: "Resistor $R_E$ (Emitter Stabilizing Resistor)",
      specification: "1 k$\\Omega$, 0.25 W carbon film (±5%)",
      quantity: "1",
    },
    {
      name: "Solderless Breadboard",
      specification:
        "Full size, 830 tie-points with standard power distribution rails",
      quantity: "1",
    },
    {
      name: "Connecting Wires",
      specification: "Single-core 22 AWG breadboard jumper wires",
      quantity: "As required",
    },
  ],
};
