import { type SceneProcedureStep } from "@/labs/experiments/types";
import { r2rLadder } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Place the trainer and the ladder",
  body: "Place the breadboard and the 8051 trainer on the right. Place the four ladder resistors along row c at columns 3, 8, 13 and 18: 20 kohm, 10 kohm, 20 kohm and 10 kohm. The junctions are at columns 6, 11, 16 and 21.",
  show: ["bb", "mcu", "r1", "r2", "r3", "r4"],
  highlight: "r1",
  schematic: r2rLadder()[2],
};
