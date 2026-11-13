import { type TheorySection } from "@/labs/lab-content.types";
import { arduinoBlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A digital output pin can be set to HIGH (about 5 V) or LOW (0 V). When pin 13 is HIGH, current flows from the pin, through the resistor, through the LED, and into ground. The LED lights while current flows.",
    "The resistor limits the current. With a 5 V pin and a red LED that drops about 2 V, the current is about (5 - 2) / 220 = 13.6 mA. This is near the 20 mA limit of the ATmega328P pin. Without the resistor, the LED would draw far more current and could burn out the pin.",
    "Pin 13 is also wired to a small on-board LED, marked L, so the sketch also works without any external parts. The external LED here makes the current path easy to see.",
    "The sketch uses delay(), which pauses the whole program. In this experiment the pause is half a second, so the LED is on for half a second and off for half a second.",
  ],
  circuitDiagram: arduinoBlinkDiagrams[3],
};
