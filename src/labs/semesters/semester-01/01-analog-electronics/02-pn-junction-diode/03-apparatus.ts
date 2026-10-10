import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    {
      name: "Breadboard",
      specification: "830-point solderless breadboard",
      quantity: "1",
    },
    {
      name: "P-N junction diode",
      specification: "1N4148 silicon diode",
      quantity: "1",
    },
    {
      name: "Series resistor",
      specification: "1 kΩ",
      quantity: "1",
    },
    {
      name: "DC power supply",
      specification: "Variable DC source",
      quantity: "1",
    },
    {
      name: "Milliammeter",
      specification: "0–100 mA DC",
      quantity: "1",
    },
    {
      name: "Voltmeter",
      specification: "0–15 V DC",
      quantity: "1",
    },
    {
      name: "Connecting wires",
      specification: "Breadboard jumper wires",
      quantity: "As required",
    },
  ],
};
