import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoButtonDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Wire pin D2 to the button",
  body: "Connect a blue jumper from Arduino pin D2 to the breadboard at column 9, row a. This is the input. The sketch enables its internal pull-up, so no resistor is needed.",
  show: ["bb", "uno", "btn1", "w_d2"],
  highlight: "w_d2",
  schematic: arduinoButtonDiagrams[2],
};
