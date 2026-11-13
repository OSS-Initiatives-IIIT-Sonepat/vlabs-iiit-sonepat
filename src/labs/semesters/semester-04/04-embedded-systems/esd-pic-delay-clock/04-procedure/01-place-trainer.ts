import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Place the trainer",
  body: "Place the breadboard, and the PIC18F4550 trainer on the right. Its ports are labelled along the edges: RA on the left, RB on the right, RC along the top and RD along the bottom.",
  show: ["bb", "pic"],
  highlight: "pic",
  schematic: ledFromPin("PIC18 RD0", "330 ohm")[0],
};
