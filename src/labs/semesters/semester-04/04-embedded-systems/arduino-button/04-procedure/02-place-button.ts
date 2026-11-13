import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoButtonDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Place the push-button",
  body: "Push the four-leg push-button across the centre of row c, from column 9 to column 11. Its two sides are the two switch contacts: the button joins them when pressed.",
  show: ["bb", "uno", "btn1"],
  highlight: "btn1",
  schematic: arduinoButtonDiagrams[2],
};
