import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32BlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Wire GPIO2 to the resistor",
  body: "Connect an orange jumper from the ESP32 GPIO2 pin to the breadboard at column 3, row a. Row a shares a strip with the resistor leg in column 3.",
  show: ["bb", "esp", "r1", "led1", "w_gpio2"],
  highlight: "w_gpio2",
  schematic: esp32BlinkDiagrams[2],
};
