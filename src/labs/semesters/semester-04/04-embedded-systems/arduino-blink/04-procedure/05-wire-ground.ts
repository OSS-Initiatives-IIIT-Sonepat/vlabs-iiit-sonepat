import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoBlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Connect the ground",
  body: "Run a black jumper from the Arduino GND pin to the top ground rail, column 1. Run a second black jumper from the LED cathode (column 7) to the same ground rail. Both ends now share one ground.",
  show: ["bb", "uno", "r1", "led1", "w_d13", "w_gnd_uno", "w_led_gnd"],
  highlight: "w_led_gnd",
  schematic: arduinoBlinkDiagrams[3],
};
