import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoBlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Watch it turn off",
  body: "After 500 ms the sketch sets pin 13 LOW and the LED turns off. The cycle repeats every second. Change the two delay(500) values to 100 to see the blink speed up.",
  show: ["bb", "uno", "r1", "led1", "w_d13", "w_gnd_uno", "w_led_gnd"],
  highlight: "led1",
  ledBrightness: { led1: 0 },
  readings: { D13: "LOW (0 V)" },
  schematic: arduinoBlinkDiagrams[3],
};
