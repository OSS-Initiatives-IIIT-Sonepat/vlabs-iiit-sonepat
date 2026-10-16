import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ohmsLawStepSchematics } from "@/labs/schematics/semester-01/01-analog-electronics/ohms-law";

import { step as s01 } from "./01-set-up-breadboard";
import { step as s02 } from "./02-insert-resistor-ammeter";
import { step as s03 } from "./03-connect-voltmeter";
import { step as s04 } from "./04-record-zero-reading";
import { step as s05 } from "./05-vary-voltage-record";
import { step as s06 } from "./06-repeat-second-resistor";
import { step as s07 } from "./07-plot-graph";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: ohmsLawStepSchematics[0] },
  { ...s02, schematic: ohmsLawStepSchematics[1] },
  { ...s03, schematic: ohmsLawStepSchematics[2] },
  { ...s04, schematic: ohmsLawStepSchematics[3] },
  { ...s05, schematic: ohmsLawStepSchematics[4] },
  { ...s06, schematic: ohmsLawStepSchematics[5] },
  { ...s07, schematic: ohmsLawStepSchematics[6] },
];
