import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "ESP32-DevKitC",
      specification: "ESP-WROOM-32, 38 pins",
      quantity: "1",
    },
    { name: "Breadboard", specification: "830 tie-point", quantity: "1" },
    { name: "Push-button", specification: "Tactile, 4-leg", quantity: "1" },
    { name: "Jumper wires", specification: "Blue and black", quantity: "2" },
    { name: "Micro-USB cable and Arduino IDE", quantity: "1" },
  ],
};
