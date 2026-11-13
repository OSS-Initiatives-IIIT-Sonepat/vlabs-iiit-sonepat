import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32PwmDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Connect the ground",
  body: "Run a black jumper from the ESP32 GND pin to the ground rail, column 1, and another from the LED cathode (column 7) to the same rail.",
  show: ["bb", "esp", "r1", "led1", "w_gpio5", "w_gnd_esp", "w_led_gnd"],
  highlight: "w_led_gnd",
  schematic: esp32PwmDiagrams[3],
};
