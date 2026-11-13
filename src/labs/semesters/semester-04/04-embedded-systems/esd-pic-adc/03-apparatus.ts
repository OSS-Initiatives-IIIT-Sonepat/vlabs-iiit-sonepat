import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "PIC18F4550 microcontroller",
      specification: "40-pin DIP, 5 V, internal oscillator",
      quantity: "1",
    },
    {
      name: "Ceramic capacitor",
      specification: "100 nF (decoupling)",
      quantity: "2",
    },
    {
      name: "Resistor",
      specification: "10 kohm (MCLR pull-up), 1/4 W",
      quantity: "1",
    },
    {
      name: "Breadboard",
      specification: "Full size, 60 columns",
      quantity: "1",
    },
    { name: "Resistor", specification: "10 kohm, 1/4 W", quantity: "2" },
    { name: "Resistor", specification: "330 ohm, 1/4 W", quantity: "1" },
    { name: "LED", specification: "Red, 5 mm", quantity: "1" },
    { name: "DC power supply", specification: "5 V regulated", quantity: "1" },
    {
      name: "Jumper wires",
      specification: "Assorted colours",
      quantity: "as needed",
    },
    { name: "PICkit programmer and MPLAB XC8", quantity: "1" },
  ],
};
