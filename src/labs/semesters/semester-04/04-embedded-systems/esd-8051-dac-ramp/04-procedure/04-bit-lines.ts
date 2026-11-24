import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LADDER, BITS } from "../components";
import { dac8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Connect the bit lines",
  body: "Connect P1.0 (pin 1) to column 38, P1.1 to column 44, P1.2 to column 50 and P1.3 to column 56, all in row i. Each bit now drives its node through 2R: P1.3 reaches the output node N3 directly and has the largest weight, P1.0 reaches N0 at the far end and has the smallest.",
  show: [...SUPPLY, ...SYSTEM_8051, ...LADDER, ...BITS],
  highlight: "w_b3",
  supplyVoltage: 5,
  schematic: dac8051Diagrams[4],
};
