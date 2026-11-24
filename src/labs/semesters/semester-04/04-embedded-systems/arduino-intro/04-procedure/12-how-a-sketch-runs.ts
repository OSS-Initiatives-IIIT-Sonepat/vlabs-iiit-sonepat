import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoAnatomyDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "12. How a sketch runs",
  body: "A sketch has two required functions. setup() runs once when the board powers up and sets each pin's direction with pinMode(). loop() runs again and again for as long as the board is on, and does the work: it reads inputs and writes outputs. The schematic shows that cycle.",
  show: ["bb", "uno", "usb", "bat"],
  highlight: "uno",
  schematic: arduinoAnatomyDiagrams[2],
};
