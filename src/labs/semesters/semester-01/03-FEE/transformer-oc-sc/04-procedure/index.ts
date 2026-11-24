import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-breadboard";
import { step as s02 } from "./02-place-transformer";
import { step as s03 } from "./03-open-circuit";
import { step as s04 } from "./04-read-oc";
import { step as s05 } from "./05-short-circuit";
import { step as s06 } from "./06-read-sc";
import { step as s07 } from "./07-efficiency";

export const procedureSteps: SceneProcedureStep[] = [
  s01,
  s02,
  s03,
  s04,
  s05,
  s06,
  s07,
];
