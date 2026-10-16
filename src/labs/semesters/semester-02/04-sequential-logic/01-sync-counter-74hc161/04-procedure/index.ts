import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-and-power";
import { step as s02 } from "./02-tie-control-inputs";
import { step as s03 } from "./03-wire-output-leds";
import { step as s04 } from "./04-apply-clock";
import { step as s05 } from "./05-terminal-count";
import { step as s06 } from "./06-asynchronous-clear";
import { step as s07 } from "./07-mod10-decode";
import { step as s08 } from "./08-mod10-reload";

import { syncCounter74hc161StepSchematics } from "@/labs/schematics/semester-02/04-sequential-logic/01-sync-counter-74hc161";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05, s06, s07, s08].map(
  (s, i) => ({ ...s, schematic: syncCounter74hc161StepSchematics[i] }),
);
