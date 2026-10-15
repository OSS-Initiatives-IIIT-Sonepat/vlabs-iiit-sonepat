import { s2Encoder4to2StepSchematics } from "@/labs/schematics/s2-encoder-4to2-schematics";
import { step as s01 } from "./01-set-up-breadboard-and-power-supply";
import { step as s02 } from "./02-wire-or-gates-for-outputs-a-and-b";
import { step as s03 } from "./03-connect-all-input-lines";
import { step as s04 } from "./04-test-each-input-line-individually";
import { step as s05 } from "./05-test-priority-behaviour-with-simultaneous-inputs";

import { type SceneProcedureStep } from "@/labs/experiments/types";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: s2Encoder4to2StepSchematics[0] },
  { ...s02, schematic: s2Encoder4to2StepSchematics[1] },
  { ...s03, schematic: s2Encoder4to2StepSchematics[2] },
  { ...s04, schematic: s2Encoder4to2StepSchematics[3] },
  { ...s05, schematic: s2Encoder4to2StepSchematics[4] },
];
