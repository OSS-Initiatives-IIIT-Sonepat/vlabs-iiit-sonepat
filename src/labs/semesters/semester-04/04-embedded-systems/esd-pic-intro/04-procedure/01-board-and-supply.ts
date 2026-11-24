import { type SceneProcedureStep } from "@/labs/experiments/types";
import { SUPPLY } from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { introPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "1. Breadboard and 5 V supply",
  body: "Start with a full-size breadboard and a 5 V bench supply: red lead to the top + rail, black lead to the top − rail. Two jumpers at the far right copy both rails to the bottom of the board, so +5 V and ground run along both edges.",
  show: SUPPLY,
  highlight: "psu",
  supplyVoltage: 5,
  schematic: introPicDiagrams[0],
};
