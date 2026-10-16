import { type SceneProcedureStep } from "@/labs/experiments/types";
import { basicComponentsStepSchematics } from "@/labs/schematics/semester-01/01-analog-electronics/01-study-basic-components";

import { step as s01 } from "./01-place-breadboard";
import { step as s02 } from "./02-regulated-power-supply";
import { step as s03 } from "./03-passive-components";
import { step as s04 } from "./04-active-components";
import { step as s05 } from "./05-led-circuit";
import { step as s06 } from "./06-multimeter";
import { step as s07 } from "./07-function-generator";
import { step as s08 } from "./08-cro";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: basicComponentsStepSchematics[0] },
  { ...s02, schematic: basicComponentsStepSchematics[1] },
  { ...s03, schematic: basicComponentsStepSchematics[2] },
  { ...s04, schematic: basicComponentsStepSchematics[3] },
  { ...s05, schematic: basicComponentsStepSchematics[4] },
  { ...s06, schematic: basicComponentsStepSchematics[5] },
  { ...s07, schematic: basicComponentsStepSchematics[6] },
  { ...s08, schematic: basicComponentsStepSchematics[7] },
];
