import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ledFromPin } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Place the 8051 trainer",
  body: "Place the breadboard and the 8051 trainer on the right. Its ports are labelled along the edges: P0 along the top, P2 along the bottom, P1 on the left and P3 on the right.",
  show: ["bb", "mcu"],
  highlight: "mcu",
  schematic: ledFromPin("8051 P1.0", "330 ohm")[0],
};
