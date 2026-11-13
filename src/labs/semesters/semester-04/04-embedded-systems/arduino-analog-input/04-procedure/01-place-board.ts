import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoAnalogDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Place the board",
  body: "Place the breadboard and the Arduino Uno on the right.",
  show: ["bb", "uno"],
  highlight: "uno",
  schematic: arduinoAnalogDiagrams[0],
};
