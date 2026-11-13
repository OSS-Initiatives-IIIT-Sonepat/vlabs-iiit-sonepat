import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32BlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Place the ESP32",
  body: "Place the breadboard, and the ESP32 DevKit on the right. Check the pin labels on the board: GPIO2 is on the right-hand header, near the top end.",
  show: ["bb", "esp"],
  highlight: "esp",
  schematic: esp32BlinkDiagrams[0],
};
