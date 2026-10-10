import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    {
      name: "Regulated DC power supply",
      specification: "0-30 V, 2 A",
      quantity: "1",
    },
    { name: "Digital multimeter", specification: "3.5 digit", quantity: "1" },
    {
      name: "Function generator",
      specification: "0.1 Hz - 1 MHz, 50 Ω output",
      quantity: "1",
    },
    {
      name: "Cathode ray oscilloscope",
      specification: "20 MHz, dual channel",
      quantity: "1",
    },
    { name: "Bread board", specification: "830 tie-points", quantity: "1" },
    { name: "Resistors", specification: "330 Ω, 1 kΩ, 0.25 W", quantity: "2" },
    { name: "Capacitor", specification: "0.1 µF", quantity: "1" },
    { name: "LED", specification: "Green, 5 mm", quantity: "1" },
    { name: "Diode", specification: "1N4148", quantity: "1" },
    { name: "NPN transistor", specification: "BC547", quantity: "1" },
    {
      name: "Connecting wires and probes",
      specification: "Single-strand 22 AWG, BNC probes",
      quantity: "As required",
    },
  ],
};
