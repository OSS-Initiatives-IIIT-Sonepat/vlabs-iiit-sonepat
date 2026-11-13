import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoBlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Wire pin D13 to the resistor",
  body: "Connect an orange jumper from Arduino pin D13 to the breadboard at column 3, row a. Row a shares a strip with the resistor leg in column 3, so the signal reaches the resistor.",
  show: ["bb", "uno", "r1", "led1", "w_d13"],
  highlight: "w_d13",
  schematic: arduinoBlinkDiagrams[2],
};
