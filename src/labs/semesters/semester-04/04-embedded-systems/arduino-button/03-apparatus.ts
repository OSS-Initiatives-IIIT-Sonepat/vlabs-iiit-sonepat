import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Arduino Uno R3", quantity: "1" },
    { name: "Breadboard", specification: "830 tie-point", quantity: "1" },
    { name: "Push-button", specification: "Tactile, 4-leg", quantity: "1" },
    { name: "Jumper wires", specification: "Blue and black", quantity: "2" },
    { name: "USB-B cable and Arduino IDE", quantity: "1" },
  ],
};
