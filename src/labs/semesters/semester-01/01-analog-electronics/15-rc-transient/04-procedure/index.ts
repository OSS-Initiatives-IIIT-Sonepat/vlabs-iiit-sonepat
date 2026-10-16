import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-build-rc";
import { step as s02 } from "./02-square-wave-and-cro";
import { step as s03 } from "./03-measure-charging-tau";
import { step as s04 } from "./04-measure-discharging-tau";
import { step as s05 } from "./05-verify-five-tau";
import { step as s06 } from "./06-change-resistor";
import { step as s07 } from "./07-compare-and-shut-down";

import { rcTransientStepSchematics } from "@/labs/schematics/semester-01/01-analog-electronics/15-rc-transient";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05, s06, s07].map(
  (s, i) => ({ ...s, schematic: rcTransientStepSchematics[i] }),
);
