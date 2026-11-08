import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-no-address";
import { step as s02 } from "./02-open-properties";
import { step as s03 } from "./03-address-mask";
import { step as s04 } from "./04-ping-local";
import { step as s05 } from "./05-no-gateway";
import { step as s06 } from "./06-gateway";
import { step as s07 } from "./07-verify";
import { step as s08 } from "./08-wrong-mask";

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
