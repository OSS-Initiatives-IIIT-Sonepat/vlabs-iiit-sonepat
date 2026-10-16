import { step as s01 } from "./01-place-the-breadboard-and-connect-the-dual-12-v-s";
import { step as s02 } from "./02-connect-the-dmm-to-measure-op-amp-output-voltage";
import { step as s03 } from "./03-assemble-the-inverting-amplifier-phase-a";
import { step as s04 } from "./04-measure-the-inverting-amplifier-voltage-gain";
import { step as s05 } from "./05-assemble-the-non-inverting-amplifier-phase-b";
import { step as s06 } from "./06-measure-the-non-inverting-amplifier-gain-and-com";

import { type SceneProcedureStep } from "@/labs/experiments/types";
import { opampCircuitsStepSchematics } from "@/labs/schematics/semester-01/01-analog-electronics/13-opamp-circuits";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: opampCircuitsStepSchematics[0] },
  { ...s02, schematic: opampCircuitsStepSchematics[1] },
  { ...s03, schematic: opampCircuitsStepSchematics[2] },
  { ...s04, schematic: opampCircuitsStepSchematics[3] },
  { ...s05, schematic: opampCircuitsStepSchematics[4] },
  { ...s06, schematic: opampCircuitsStepSchematics[5] },
];
