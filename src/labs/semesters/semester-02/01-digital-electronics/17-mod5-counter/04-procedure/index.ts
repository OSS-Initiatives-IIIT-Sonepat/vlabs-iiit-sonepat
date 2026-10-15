import { type SceneProcedureStep } from "@/labs/experiments/types";
import { mod5CounterStepSchematics } from "@/labs/schematics/s2-mod5-counter-schematics";

import { step as s01 } from "./01-check-ics";
import { step as s02 } from "./02-power-and-toggle";
import { step as s03 } from "./03-up-clock-chain";
import { step as s04 } from "./04-up-indicators";
import { step as s05 } from "./05-up-reset";
import { step as s06 } from "./06-test-up";
import { step as s07 } from "./07-convert-down";
import { step as s08 } from "./08-test-down";
import { step as s09 } from "./09-timing-diagram";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: mod5CounterStepSchematics[0] },
  { ...s02, schematic: mod5CounterStepSchematics[1] },
  { ...s03, schematic: mod5CounterStepSchematics[2] },
  { ...s04, schematic: mod5CounterStepSchematics[3] },
  { ...s05, schematic: mod5CounterStepSchematics[4] },
  { ...s06, schematic: mod5CounterStepSchematics[5] },
  { ...s07, schematic: mod5CounterStepSchematics[6] },
  { ...s08, schematic: mod5CounterStepSchematics[7] },
  { ...s09, schematic: mod5CounterStepSchematics[8] },
];
