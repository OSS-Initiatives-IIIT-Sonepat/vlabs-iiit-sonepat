import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32BlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Insert the 330 ohm resistor",
  body: "Push the 330 ohm resistor across row c, from column 3 to column 6. The 3.3 V logic and the 330 ohm value give a safe LED current.",
  show: ["bb", "esp", "r1"],
  highlight: "r1",
  schematic: esp32BlinkDiagrams[1],
};
