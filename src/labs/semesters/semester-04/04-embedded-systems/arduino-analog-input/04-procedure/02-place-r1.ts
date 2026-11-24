import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoAnalogDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Place R1 (top resistor)",
  body: "Place the first 10 kohm resistor across row c, from column 2 to column 5. This is R1, the resistor that connects to 5 V.",
  show: ["bb", "uno", "r1"],
  highlight: "r1",
  schematic: arduinoAnalogDiagrams[1],
};
