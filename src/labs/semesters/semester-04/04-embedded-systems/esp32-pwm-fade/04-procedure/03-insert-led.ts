import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32PwmDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Insert the LED",
  body: "Place the green LED in row c, anode (long leg) in column 6 and cathode (short leg) in column 7.",
  show: ["bb", "esp", "r1", "led1"],
  highlight: "led1",
  schematic: esp32PwmDiagrams[2],
};
