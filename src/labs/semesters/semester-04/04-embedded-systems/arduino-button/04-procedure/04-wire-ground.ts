import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoButtonDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Connect the button to ground",
  body: "Run a black jumper from column 11, row a to the ground rail. Run another black jumper from the Arduino GND pin to the same rail, column 1.",
  show: ["bb", "uno", "btn1", "w_d2", "w_btn_gnd", "w_gnd_uno"],
  highlight: "w_btn_gnd",
  schematic: arduinoButtonDiagrams[3],
};
