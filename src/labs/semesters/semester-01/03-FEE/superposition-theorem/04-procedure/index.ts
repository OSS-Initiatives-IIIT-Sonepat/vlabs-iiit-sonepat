import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-breadboard";
import { step as s02 } from "./02-connect-v1";
import { step as s03 } from "./03-connect-v2";
import { step as s04 } from "./04-place-r1";
import { step as s05 } from "./05-place-r2";
import { step as s06 } from "./06-place-r3";
import { step as s07 } from "./07-both-sources";
import { step as s08 } from "./08-v1-alone";
import { step as s09 } from "./09-v2-alone";
import { step as s10 } from "./10-add-partials";

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
