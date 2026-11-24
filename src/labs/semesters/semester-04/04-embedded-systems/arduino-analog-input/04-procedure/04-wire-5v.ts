import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoAnalogDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Supply 5 V to R1",
  body: "Connect a red jumper from the Arduino 5V pin to the top rail, column 2. Connect a second red jumper from the rail, column 2, to the leg of R1 in column 2.",
  show: ["bb", "uno", "r1", "r2", "w_5v_uno", "w_5v_r1"],
  highlight: "w_5v_r1",
  schematic: arduinoAnalogDiagrams[1],
};
