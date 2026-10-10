import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-breadboard";
import { step as s02 } from "./02-regulated-power-supply";
import { step as s03 } from "./03-passive-components";
import { step as s04 } from "./04-active-components";
import { step as s05 } from "./05-led-circuit";
import { step as s06 } from "./06-multimeter";
import { step as s07 } from "./07-function-generator";
import { step as s08 } from "./08-cro";

export const procedureSteps: SceneProcedureStep[] = [
  s01,
  s02,
  s03,
  s04,
  s05,
  s06,
  s07,
  s08,
];
