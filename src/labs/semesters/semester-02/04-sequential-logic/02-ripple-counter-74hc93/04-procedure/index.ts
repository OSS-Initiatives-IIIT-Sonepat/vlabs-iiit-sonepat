import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-and-power";
import { step as s02 } from "./02-tie-reset-inputs";
import { step as s03 } from "./03-wire-output-leds";
import { step as s04 } from "./04-clock-divide-by-two";
import { step as s05 } from "./05-cascade-mod16";
import { step as s06 } from "./06-count-and-roll-over";
import { step as s07 } from "./07-decade-reset-wiring";
import { step as s08 } from "./08-decade-roll-over";

import { rippleCounter74hc93StepSchematics } from "@/labs/schematics/semester-02/04-sequential-logic/02-ripple-counter-74hc93";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05, s06, s07, s08].map(
  (s, i) => ({ ...s, schematic: rippleCounter74hc93StepSchematics[i] }),
);
