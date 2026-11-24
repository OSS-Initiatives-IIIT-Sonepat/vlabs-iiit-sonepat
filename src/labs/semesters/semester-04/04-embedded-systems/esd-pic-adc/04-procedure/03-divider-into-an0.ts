import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { DIVIDER } from "../components";
import { adcPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Build the divider into AN0",
  body: "In the bottom bank, place R2 (10 kΩ) in row h from column 42 to 45 and R3 (10 kΩ) in row i from column 45 to 48. Join column 42 to the bottom + rail and column 48 to the bottom − rail. Column 45 is the middle point, at 2.5 V: run a yellow jumper from it to RA0/AN0 (pin 2, column 4).",
  show: [...SUPPLY, ...SYSTEM_PIC, ...DIVIDER],
  highlight: "r_top",
  supplyVoltage: 5,
  readings: { "AN0 voltage": "2.50 V" },
  schematic: adcPicDiagrams[3],
};
