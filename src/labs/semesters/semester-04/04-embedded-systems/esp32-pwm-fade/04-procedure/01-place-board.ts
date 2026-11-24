import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32PwmDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Place the ESP32",
  body: "Place the breadboard and the ESP32 DevKit on the right.",
  show: ["bb", "esp"],
  highlight: "esp",
  schematic: esp32PwmDiagrams[0],
};
