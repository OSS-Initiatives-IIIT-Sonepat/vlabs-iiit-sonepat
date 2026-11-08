import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-the-bench";
import { step as s02 } from "./02-bind";
import { step as s03 } from "./03-send";
import { step as s04 } from "./04-reply";
import { step as s05 } from "./05-loss";
import { step as s06 } from "./06-two-clients";
import { step as s07 } from "./07-broadcast";
import { step as s08 } from "./08-headers";

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
