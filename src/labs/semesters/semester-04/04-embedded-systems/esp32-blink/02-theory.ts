import { type TheorySection } from "@/labs/lab-content.types";
import { esp32BlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A GPIO set HIGH drives about 3.3 V. The LED needs about 2 V to glow, so the resistor sees about 1.3 V. A 330 ohm resistor passes roughly 1.3 / 330 = 4 mA, which is enough for a bright indicator and safe for the pin.",
    "The ESP32 can source more current than this, but the limit is still shared among all pins. Keep each LED current under about 10 mA, and never drive a motor or relay from a GPIO pin directly.",
    "GPIO2 is also connected to the blue on-board LED, so the sketch lights that LED too. The external LED here makes the current path visible on the breadboard.",
  ],
  circuitDiagram: esp32BlinkDiagrams[3],
};
