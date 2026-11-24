import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32ButtonDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Connect the button to ground",
  body: "Run a black jumper from column 11, row a to the ground rail. Run another black jumper from the ESP32 GND pin to the same rail, column 1.",
  show: ["bb", "esp", "btn1", "w_gpio4", "w_btn_gnd", "w_gnd_esp"],
  highlight: "w_btn_gnd",
  schematic: esp32ButtonDiagrams[3],
};
