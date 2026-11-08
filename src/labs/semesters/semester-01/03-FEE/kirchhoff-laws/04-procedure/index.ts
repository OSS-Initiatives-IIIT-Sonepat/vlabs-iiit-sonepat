import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-breadboard";
import { step as s02 } from "./02-connect-v1";
import { step as s03 } from "./03-connect-v2";
import { step as s04 } from "./04-place-r1";
import { step as s05 } from "./05-place-r2";
import { step as s06 } from "./06-place-r3";
import { step as s07 } from "./07-measure-i1";
import { step as s08 } from "./08-measure-i2";
import { step as s09 } from "./09-measure-i3";
import { step as s10 } from "./10-measure-loop1";
import { step as s11 } from "./11-measure-loop2";
import { step as s12 } from "./12-raise-v1";

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
  s11,
  s12,
];
