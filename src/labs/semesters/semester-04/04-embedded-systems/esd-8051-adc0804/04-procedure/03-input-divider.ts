import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { ADC, DIVIDER } from "../components";
import { adc8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Build the input divider",
  body: "In the bottom bank, place R1 (10 kΩ) in row h from column 50 to 53 and R2 (10 kΩ) in row i from column 53 to 56. Join column 50 to the bottom + rail and column 56 to the bottom − rail. Column 53 is the middle point: run a yellow jumper from it to VIN+ (pin 6). VIN+ is now 2.5 V.",
  show: [...SUPPLY, ...ADC, ...SYSTEM_8051, ...DIVIDER],
  highlight: "r_top",
  supplyVoltage: 5,
  schematic: adc8051Diagrams[2],
};
