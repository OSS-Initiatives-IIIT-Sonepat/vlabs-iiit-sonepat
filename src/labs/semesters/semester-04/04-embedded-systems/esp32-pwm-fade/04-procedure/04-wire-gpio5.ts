import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32PwmDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Wire GPIO5 to the resistor",
  body: "Connect a purple jumper from the ESP32 GPIO5 pin to column 3, row a. GPIO5 is the PWM output.",
  show: ["bb", "esp", "r1", "led1", "w_gpio5"],
  highlight: "w_gpio5",
  schematic: esp32PwmDiagrams[2],
};
