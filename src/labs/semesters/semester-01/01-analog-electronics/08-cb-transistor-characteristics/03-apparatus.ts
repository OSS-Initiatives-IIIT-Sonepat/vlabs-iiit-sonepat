import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    { name: "NPN transistor", specification: "BC547", quantity: "1" },
    { name: "Resistor (R_E)", specification: "470 Ω, 0.25 W", quantity: "1" },
    {
      name: "Variable DC power supply",
      specification: "V_EE: 0-5 V, V_CC: 0-12 V",
      quantity: "2",
    },
    {
      name: "Milliammeter",
      specification: "0-100 mA, analogue",
      quantity: "2",
    },
    { name: "Voltmeter", specification: "0-15 V DC, analogue", quantity: "1" },
    {
      name: "Digital multimeter",
      specification: "DC volts range",
      quantity: "1",
    },
    { name: "Breadboard", specification: "30 columns", quantity: "1" },
    { name: "Connecting wires", specification: "single-core", quantity: "3" },
  ],
};
