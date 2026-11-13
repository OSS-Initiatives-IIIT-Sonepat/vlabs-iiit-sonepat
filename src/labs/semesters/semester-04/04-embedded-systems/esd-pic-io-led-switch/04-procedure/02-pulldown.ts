import { type SceneProcedureStep } from "@/labs/experiments/types";
import { buttonOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Add the 10 kohm pull-down",
  body: "Place the 10 kohm resistor across row e, from column 9 to column 12. Its left leg shares column 9 with the button, so the input is held at 0 V when the button is open.",
  show: ["bb", "pic", "btn1", "r_pd"],
  highlight: "r_pd",
  schematic: buttonOnPin("PIC18 RB0", "down")[1],
};
