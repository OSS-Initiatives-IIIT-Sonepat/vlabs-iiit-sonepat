import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoBlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Insert the LED",
  body: "Place the LED in row c with its long leg (anode, +) in column 6, on the same strip as the resistor's far end. The short leg (cathode, -) goes in column 7.",
  show: ["bb", "uno", "r1", "led1"],
  highlight: "led1",
  schematic: arduinoBlinkDiagrams[2],
};
