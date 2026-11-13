import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoAnalogDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Wire the middle point to A0",
  body: "Connect a yellow jumper from analog pin A0 to column 5, row a. Column 5 is where R1 and R2 meet, so A0 reads the divider voltage.",
  show: ["bb", "uno", "r1", "r2", "w_5v_uno", "w_5v_r1", "w_a0"],
  highlight: "w_a0",
  schematic: arduinoAnalogDiagrams[2],
};
