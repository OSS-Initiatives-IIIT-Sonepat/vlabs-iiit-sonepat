import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-build-low-pass";
import { step as s02 } from "./02-connect-instruments";
import { step as s03 } from "./03-sweep-below-cutoff";
import { step as s04 } from "./04-find-cutoff";
import { step as s05 } from "./05-sweep-above-cutoff";
import { step as s06 } from "./06-build-high-pass";
import { step as s07 } from "./07-high-pass-low-frequency";
import { step as s08 } from "./08-high-pass-cutoff";
import { step as s09 } from "./09-high-pass-and-plot";

import { rcFiltersStepSchematics } from "@/labs/schematics/semester-01/01-analog-electronics/14-rc-filters";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05, s06, s07, s08, s09].map(
  (s, i) => ({ ...s, schematic: rcFiltersStepSchematics[i] }),
);
