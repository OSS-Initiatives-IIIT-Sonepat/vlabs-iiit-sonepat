import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32AnatomyDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "10. How a sketch runs",
  body: "An ESP32 sketch has the same shape as an Arduino one. setup() runs once at power-up and sets the pins up with pinMode(). loop() then runs again and again. Only the pin numbers change, and the voltage: HIGH is 3.3 V.",
  show: ["bb", "esp", "usb"],
  highlight: "esp",
  schematic: esp32AnatomyDiagrams[2],
};
