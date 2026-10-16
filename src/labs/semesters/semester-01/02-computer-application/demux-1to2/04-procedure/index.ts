import { step as s01 } from "./01-set-up-breadboard-and-power-supply";
import { step as s02 } from "./02-wire-the-not-gate-for-select-complement";
import { step as s03 } from "./03-wire-the-two-and-gates-for-outputs";
import { step as s04 } from "./04-connect-input-lines-to-both-and-gates";
import { step as s05 } from "./05-test-s-0-and-s-1-routing";

import { type SceneProcedureStep } from "@/labs/experiments/types";
import { demux1to2StepSchematics } from "@/labs/schematics/semester-01/02-computer-application/demux-1to2";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: demux1to2StepSchematics[0] },
  { ...s02, schematic: demux1to2StepSchematics[1] },
  { ...s03, schematic: demux1to2StepSchematics[2] },
  { ...s04, schematic: demux1to2StepSchematics[3] },
  { ...s05, schematic: demux1to2StepSchematics[4] },
];
