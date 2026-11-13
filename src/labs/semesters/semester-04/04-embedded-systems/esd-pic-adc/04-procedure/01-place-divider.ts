import { type SceneProcedureStep } from "@/labs/experiments/types";
import { dividerOnPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Place the trainer and the divider",
  body: "Place the breadboard and the PIC18F4550 trainer on the right. Push the two 10 kohm resistors across row c: the first from column 2 to column 5, the second from column 5 to column 8. Column 5 is the middle point.",
  show: ["bb", "pic", "r_top", "r_bot"],
  highlight: "r_bot",
  schematic: dividerOnPin("PIC18 RA0 (AN0)")[3],
};
