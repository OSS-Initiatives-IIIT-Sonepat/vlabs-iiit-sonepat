import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-the-idea";
import { step as s02 } from "./02-interface";
import { step as s03 } from "./03-rpcgen";
import { step as s04 } from "./04-register";
import { step as s05 } from "./05-getport";
import { step as s06 } from "./06-call";
import { step as s07 } from "./07-execute";
import { step as s08 } from "./08-result";
import { step as s09 } from "./09-failure";

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
