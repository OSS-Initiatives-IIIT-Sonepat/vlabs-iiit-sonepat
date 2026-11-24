import { type TheorySection } from "@/labs/lab-content.types";
import { arduinoAnalogDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A microcontroller cannot measure a voltage directly as a number. Its analog-to-digital converter (ADC) compares the input with the supply and produces a count. The Uno's ADC has 10 bits, so the count runs from 0 to 1023 for inputs from 0 V to 5 V.",
    "The voltage is recovered with V = reading x 5 / 1023. A reading of 512 means about 2.5 V. The step size, one count, is 5 / 1023, about 4.9 mV.",
    "A voltage divider makes a known voltage from two resistors. With R1 and R2 equal (10 kohm each), the middle point sits at V = 5 x R2 / (R1 + R2) = 2.5 V. The ADC pin draws very little current, so the divider voltage is not disturbed.",
    "Real sensors such as thermistors and potentiometers work the same way: the sensor changes one resistor, the middle point moves, and the ADC reads the change.",
  ],
  circuitDiagram: arduinoAnalogDiagrams[4],
};
