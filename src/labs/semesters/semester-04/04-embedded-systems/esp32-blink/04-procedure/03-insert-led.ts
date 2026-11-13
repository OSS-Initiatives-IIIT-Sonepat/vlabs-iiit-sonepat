import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32BlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Insert the LED",
  body: "Place the green LED in row c with its anode (long leg) in column 6, on the resistor's far strip. The cathode (short leg) goes in column 7.",
  show: ["bb", "esp", "r1", "led1"],
  highlight: "led1",
  schematic: esp32BlinkDiagrams[2],
};
