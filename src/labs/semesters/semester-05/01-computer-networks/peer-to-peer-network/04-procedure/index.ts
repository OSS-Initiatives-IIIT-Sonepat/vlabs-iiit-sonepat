import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-two-pcs";
import { step as s02 } from "./02-crossover";
import { step as s03 } from "./03-same-network";
import { step as s04 } from "./04-ping-direct";
import { step as s05 } from "./05-share";
import { step as s06 } from "./06-add-switch";
import { step as s07 } from "./07-ping-switch";
import { step as s08 } from "./08-add-router";
import { step as s09 } from "./09-ping-router";

export const procedureSteps: SceneProcedureStep[] = [
  s01,
  s02,
  s03,
  s04,
  s05,
  s06,
  s07,
  s08,
  s09,
];
