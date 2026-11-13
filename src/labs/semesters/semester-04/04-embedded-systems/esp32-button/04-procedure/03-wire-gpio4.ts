import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32ButtonDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Wire GPIO4 to the button",
  body: "Connect a blue jumper from the ESP32 GPIO4 pin to column 9, row a. This is the input pin.",
  show: ["bb", "esp", "btn1", "w_gpio4"],
  highlight: "w_gpio4",
  schematic: esp32ButtonDiagrams[2],
};
