import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LADDER, BITS, METER } from "../components";
import { dac8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Connect the voltmeter",
  body: "Connect the voltmeter's red probe to the output node N3 (column 49, row b) and its black probe to the top ground rail. With all bits at 0 it reads 0 V.",
  show: [...SUPPLY, ...SYSTEM_8051, ...LADDER, ...BITS, ...METER],
  highlight: "vm",
  supplyVoltage: 5,
  readings: { vm: "0.00 V" },
  schematic: dac8051Diagrams[5],
};
