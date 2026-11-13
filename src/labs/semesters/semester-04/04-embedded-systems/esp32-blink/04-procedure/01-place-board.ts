import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32BlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Place the ESP32",
  body: "Place the breadboard, and the ESP32 DevKit on the right. Read the labels printed beside the pins: GPIO2 is marked S2, on the front row, fifth pin from the USB end.",
  show: ["bb", "esp"],
  highlight: "esp",
  schematic: esp32BlinkDiagrams[0],
};
