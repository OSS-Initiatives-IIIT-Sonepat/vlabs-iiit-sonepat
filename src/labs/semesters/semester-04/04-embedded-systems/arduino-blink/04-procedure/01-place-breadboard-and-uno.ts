import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoBlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Place the board",
  body: "Place the breadboard on the bench. Place the Arduino Uno on the right of it. Its USB port is the cable you will plug into the PC.",
  show: ["bb", "uno"],
  highlight: "uno",
  schematic: arduinoBlinkDiagrams[0],
};
