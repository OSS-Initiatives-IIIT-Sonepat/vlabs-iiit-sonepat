import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoAnalogDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Place R2 (bottom resistor)",
  body: "Place the second 10 kohm resistor across row c, from column 5 to column 8. Column 5 is now the middle point of the divider.",
  show: ["bb", "uno", "r1", "r2"],
  highlight: "r2",
  schematic: arduinoAnalogDiagrams[3],
};
