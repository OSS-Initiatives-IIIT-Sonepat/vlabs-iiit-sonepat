import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-identify-lm741-pins";
import { step as s02 } from "./02-set-up-supply";
import { step as s03 } from "./03-inverting-power-pins";
import { step as s04 } from "./04-inverting-resistors";
import { step as s05 } from "./05-inverting-instruments";
import { step as s06 } from "./06-measure-inverting-gain";
import { step as s07 } from "./07-observe-saturation";
import { step as s08 } from "./08-vary-feedback-inverting";
import { step as s09 } from "./09-non-inverting-power-pins";
import { step as s10 } from "./10-non-inverting-resistors";
import { step as s11 } from "./11-measure-non-inverting-gain";
import { step as s12 } from "./12-vary-feedback-non-inverting";
import { step as s13 } from "./13-calculate-error-and-shut-down";

import { opampInvertingNonInvertingStepSchematics } from "@/labs/schematics/semester-01/01-analog-electronics/10-inverting-non-inverting-opamp";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: opampInvertingNonInvertingStepSchematics[0] },
  { ...s02, schematic: opampInvertingNonInvertingStepSchematics[1] },
  { ...s03, schematic: opampInvertingNonInvertingStepSchematics[2] },
  { ...s04, schematic: opampInvertingNonInvertingStepSchematics[3] },
  { ...s05, schematic: opampInvertingNonInvertingStepSchematics[4] },
  { ...s06, schematic: opampInvertingNonInvertingStepSchematics[5] },
  { ...s07, schematic: opampInvertingNonInvertingStepSchematics[6] },
  { ...s08, schematic: opampInvertingNonInvertingStepSchematics[7] },
  { ...s09, schematic: opampInvertingNonInvertingStepSchematics[8] },
  { ...s10, schematic: opampInvertingNonInvertingStepSchematics[9] },
  { ...s11, schematic: opampInvertingNonInvertingStepSchematics[10] },
  { ...s12, schematic: opampInvertingNonInvertingStepSchematics[11] },
  { ...s13, schematic: opampInvertingNonInvertingStepSchematics[12] },
];
