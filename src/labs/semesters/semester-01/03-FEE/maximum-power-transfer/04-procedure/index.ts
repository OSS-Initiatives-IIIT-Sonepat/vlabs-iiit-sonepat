import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-breadboard";
import { step as s02 } from "./02-connect-supply";
import { step as s03 } from "./03-place-rs";
import { step as s04 } from "./04-place-matched-load";
import { step as s05 } from "./05-measure-matched";
import { step as s06 } from "./06-load-47";
import { step as s07 } from "./07-load-220";
import { step as s08 } from "./08-compare";

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
