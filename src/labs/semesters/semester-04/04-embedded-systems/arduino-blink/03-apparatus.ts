import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Arduino Uno R3", quantity: "1" },
    { name: "Breadboard", specification: "830 tie-point", quantity: "1" },
    { name: "Resistor", specification: "220 ohm, 1/4 W", quantity: "1" },
    { name: "LED", specification: "Red, 5 mm", quantity: "1" },
    { name: "Jumper wires", specification: "Orange and black", quantity: "3" },
    { name: "USB-B cable and Arduino IDE", quantity: "1" },
  ],
};
