import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32ButtonDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Press the button",
  body: "Press and hold the button. GPIO4 is joined to ground and the Serial Monitor prints 0. Release it and the value returns to 1.",
  show: ["bb", "esp", "btn1", "w_gpio4", "w_btn_gnd", "w_gnd_esp"],
  highlight: "btn1",
  readings: { GPIO4: "0 (LOW, pressed)" },
  schematic: esp32ButtonDiagrams[3],
};
