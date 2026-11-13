import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "AT89S52 (8051) microcontroller",
      specification: "40-pin DIP, 5 V",
      quantity: "1",
    },
    {
      name: "Quartz crystal",
      specification: "11.0592 MHz, HC-49/S",
      quantity: "1",
    },
    { name: "Ceramic capacitor", specification: "22 pF", quantity: "2" },
    {
      name: "Electrolytic capacitor",
      specification: "10 µF, 16 V",
      quantity: "1",
    },
    {
      name: "Resistor",
      specification: "10 kohm (reset), 1/4 W",
      quantity: "1",
    },
    {
      name: "Breadboard",
      specification: "Full size, 60 columns",
      quantity: "1",
    },
    { name: "Resistor", specification: "10 kohm (R), 1/4 W", quantity: "3" },
    { name: "Resistor", specification: "20 kohm (2R), 1/4 W", quantity: "5" },
    { name: "Voltmeter", specification: "0 to 20 V DC", quantity: "1" },
    { name: "DC power supply", specification: "5 V regulated", quantity: "1" },
    {
      name: "Jumper wires",
      specification: "Assorted colours",
      quantity: "as needed",
    },
    { name: "ISP programmer and Keil C51", quantity: "1" },
  ],
};
