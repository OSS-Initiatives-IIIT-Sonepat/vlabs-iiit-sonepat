import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Solderless Breadboard",
      specification: "Full-size, 830 tie-points with distribution rails",
      quantity: "1",
    },
    {
      name: "Step-Down Transformer",
      specification: "230 V AC primary, 12 V AC secondary, 50 Hz",
      quantity: "1",
    },
    {
      name: "Semiconductor Rectifier Diode (1N4007)",
      specification:
        "General-purpose silicon rectifier, 1 A, 1000 V PIV, DO-41",
      quantity: "1",
    },
    {
      name: "Load Resistor (R_L)",
      specification: "1 kΩ carbon film, 0.25 W (±5%)",
      quantity: "1",
    },
    {
      name: "Electrolytic Filter Capacitor (C1)",
      specification: "100 µF, 25 V radial electrolytic",
      quantity: "1",
    },
    {
      name: "Cathode Ray Oscilloscope (CRO)",
      specification: "Dual-channel, 20 MHz with 10:1/1:1 probes",
      quantity: "1",
    },
    {
      name: "Digital Multimeter (DMM)",
      specification: "DC and AC RMS voltage measurement",
      quantity: "1",
    },
    {
      name: "Connecting Wires",
      specification: "Single-strand jumper wires, assorted colors",
      quantity: "As required",
    },
  ],
};
