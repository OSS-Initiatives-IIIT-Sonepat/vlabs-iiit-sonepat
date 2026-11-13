import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoButtonDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Press the button",
  body: "Press and hold the button. The button joins D2 to ground, so the pin reads LOW. The Serial Monitor now prints 0. Release it and the value returns to 1.",
  show: ["bb", "uno", "btn1", "w_d2", "w_btn_gnd", "w_gnd_uno", "usb"],
  highlight: "btn1",
  readings: { D2: "0 (LOW, pressed)" },
  schematic: arduinoButtonDiagrams[3],
};
