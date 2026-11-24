import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoAnalogDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Return the divider to ground",
  body: "Connect a black jumper from R2's far leg (column 8) to the ground rail. Connect the Arduino GND pin to the same rail, column 1. The divider now runs from 5 V to ground.",
  show: [
    "bb",
    "uno",
    "r1",
    "r2",
    "w_5v_uno",
    "w_5v_r1",
    "w_a0",
    "w_r2_gnd",
    "w_gnd_uno",
  ],
  highlight: "w_r2_gnd",
  schematic: arduinoAnalogDiagrams[4],
};
