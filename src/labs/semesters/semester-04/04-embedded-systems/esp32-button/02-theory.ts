import { type TheorySection } from "@/labs/lab-content.types";
import { esp32ButtonDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An input left open floats, and the ESP32 reads noise. INPUT_PULLUP connects an internal resistor, roughly 45 kohm, from the pin to 3.3 V. With the button open, GPIO4 reads HIGH (1). Pressing the button joins GPIO4 to GND, and the pin reads LOW (0).",
    "The read is inverted: pressed means LOW. The 3.3 V level matters here. A 5 V button or sensor must never be wired straight to a GPIO input, because the pin is not 5 V tolerant. Use a level shifter or a divider when the signal is 5 V.",
    "Like any mechanical switch, the button bounces. A delay of about 20 ms after a change is a simple fix that is good enough for this experiment.",
  ],
  circuitDiagram: esp32ButtonDiagrams[3],
};
