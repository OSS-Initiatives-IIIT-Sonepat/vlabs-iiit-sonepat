import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-the-lan";
import { step as s02 } from "./02-own-mac";
import { step as s03 } from "./03-empty-cache";
import { step as s04 } from "./04-request";
import { step as s05 } from "./05-reply";
import { step as s06 } from "./06-cache";
import { step as s07 } from "./07-gateway";
import { step as s08 } from "./08-static";

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
