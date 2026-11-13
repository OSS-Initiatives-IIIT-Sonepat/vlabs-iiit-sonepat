import { type SceneProcedureStep } from "@/labs/experiments/types";
import { SUPPLY } from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { intro8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "1. Breadboard and 5 V supply",
  body: "Start with a full-size breadboard and a 5 V bench supply. The supply's red lead goes to the top + rail and its black lead to the top − rail. Two jumpers at the far right copy both rails to the bottom of the board, so +5 V and ground are available along both edges. The 8051 needs a steady 5 V: never feed it from a 9 V battery directly.",
  show: SUPPLY,
  highlight: "psu",
  supplyVoltage: 5,
  schematic: intro8051Diagrams[0],
};
