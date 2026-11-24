import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The ESP32 drives an LED from a GPIO pin at 3.3 V. The resistor is chosen for the lower voltage. The sketch is the same as the Arduino version, with different pin numbers.",
  ],
};
