import { type SceneProcedureStep } from "@/labs/experiments/types";
import { buttonOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Place the trainer and the button",
  body: "Place the breadboard and the PIC18F4550 trainer on the right. Push the push-button across row c, from column 9 to column 11.",
  show: ["bb", "pic", "btn1"],
  highlight: "btn1",
  schematic: buttonOnPin("PIC18 RB0", "down")[2],
};
