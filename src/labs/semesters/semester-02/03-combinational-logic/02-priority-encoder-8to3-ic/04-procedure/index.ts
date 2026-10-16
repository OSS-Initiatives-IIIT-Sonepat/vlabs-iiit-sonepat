import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-and-power";
import { step as s02 } from "./02-enable-input";
import { step as s03 } from "./03-wire-data-inputs";
import { step as s04 } from "./04-wire-output-leds";
import { step as s05 } from "./05-test-single-input";
import { step as s06 } from "./06-test-priority";
import { step as s07 } from "./07-test-highest-priority";
import { step as s08 } from "./08-disable-encoder";

import { priorityEncoder8to3IcStepSchematics } from "@/labs/schematics/semester-02/03-combinational-logic/02-priority-encoder-8to3-ic";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05, s06, s07, s08].map(
  (s, i) => ({ ...s, schematic: priorityEncoder8to3IcStepSchematics[i] }),
);
