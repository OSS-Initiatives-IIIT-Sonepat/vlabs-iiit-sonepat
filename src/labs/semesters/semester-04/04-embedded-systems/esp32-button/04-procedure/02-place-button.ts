import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32ButtonDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Place the push-button",
  body: "Push the four-leg push-button across row c, from column 9 to column 11. It joins its two sides when pressed.",
  show: ["bb", "esp", "btn1"],
  highlight: "btn1",
  schematic: esp32ButtonDiagrams[2],
};
