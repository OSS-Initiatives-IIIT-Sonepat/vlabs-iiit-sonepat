import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoBlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Insert the 220 ohm resistor",
  body: "Push the 220 ohm resistor across row c, from column 3 to column 6. One leg goes in column 3 and the other in column 6. The resistor limits the LED current, so never skip it.",
  show: ["bb", "uno", "r1"],
  highlight: "r1",
  schematic: arduinoBlinkDiagrams[1],
};
