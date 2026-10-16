import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-identify-and-place-bc547";
import { step as s02 } from "./02-collector-load";
import { step as s03 } from "./03-input-low-cut-off";
import { step as s04 } from "./04-input-high-saturation";
import { step as s05 } from "./05-weak-base-drive";
import { step as s06 } from "./06-toggle-and-shut-down";

import { transistorSwitchStepSchematics } from "@/labs/schematics/semester-01/01-analog-electronics/17-transistor-switch";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05, s06].map(
  (s, i) => ({ ...s, schematic: transistorSwitchStepSchematics[i] }),
);
