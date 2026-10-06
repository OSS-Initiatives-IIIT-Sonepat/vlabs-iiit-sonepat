import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-breadboard";
import { step as s02 } from "./02-chips-basic";
import { step as s03 } from "./03-chips-advanced";
import { step as s04 } from "./04-input-wiring";
import { step as s05 } from "./05-indicators";
import { step as s06 } from "./06-outputs";
import { step as s07 } from "./07-test-00";
import { step as s08 } from "./08-test-01";
import { step as s09 } from "./09-test-10";
import { step as s10 } from "./10-test-11";

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
