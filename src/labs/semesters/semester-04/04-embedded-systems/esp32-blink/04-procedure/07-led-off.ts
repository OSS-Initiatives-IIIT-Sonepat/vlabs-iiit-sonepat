import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32BlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "The LED turns off",
  body: "Half a second later GPIO2 goes LOW, and both LEDs turn off. The cycle repeats every second. Change the delays to 100 and watch the blink speed up.",
  show: ["bb", "esp", "r1", "led1", "w_gpio2", "w_gnd_esp", "w_led_gnd"],
  highlight: "led1",
  ledBrightness: { led1: 0 },
  readings: { GPIO2: "LOW (0 V)" },
  schematic: esp32BlinkDiagrams[3],
};
