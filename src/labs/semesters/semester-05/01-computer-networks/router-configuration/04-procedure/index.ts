import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-the-network";
import { step as s02 } from "./02-console";
import { step as s03 } from "./03-modes";
import { step as s04 } from "./04-secure";
import { step as s05 } from "./05-gi0-0";
import { step as s06 } from "./06-gi0-1";
import { step as s07 } from "./07-show-brief";
import { step as s08 } from "./08-show-route";
import { step as s09 } from "./09-save";
import { step as s10 } from "./10-ping-across";

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
  s10,
];
