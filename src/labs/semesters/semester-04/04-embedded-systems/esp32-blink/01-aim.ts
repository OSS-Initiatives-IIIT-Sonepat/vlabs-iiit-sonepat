import { type TheorySection } from "@/labs/lab-content.types";

export const aim: TheorySection = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To drive an LED from an ESP32 GPIO pin at 3.3 V logic, choose a resistor for the lower voltage, and blink the LED from a sketch.",
  ],
};
