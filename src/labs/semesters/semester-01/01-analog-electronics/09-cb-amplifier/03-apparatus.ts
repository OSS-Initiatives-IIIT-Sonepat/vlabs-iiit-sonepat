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
      quantity: "1",
    },
    {
      name: "R_E Emitter Resistor",
      specification: "$1\\,\\text{k}\\Omega$, ¼ W",
      quantity: "1",
    },
    {
      name: "R_C Collector Resistor",
      specification: "$4.7\\,\\text{k}\\Omega$, ¼ W",
      quantity: "1",
    },
    {
      name: "C_in Coupling Capacitor",
      specification: "$10\\,\\mu\\text{F}$ / 25 V electrolytic",
      quantity: "1",
    },
    {
      name: "Dual DC Power Supply",
      specification: "Two 0–12 V variable outputs (V_CC and V_EE), 500 mA",
      quantity: "1",
    },
    {
      name: "Digital Multimeter",
      specification: "Two on DC mA (I_E, I_C), one on DC volts",
      quantity: "3",
    },
    {
      name: "Function Generator",
      specification: "1 kHz sine, 20 mV peak-to-peak",
      quantity: "1",
    },
    {
      name: "CRO",
      specification: "Dual trace, AC coupling",
      quantity: "1",
    },
    {
      name: "Breadboard wires",
      specification: "Black and blue jumpers",
      quantity: "1 set",
    },
  ],
};
