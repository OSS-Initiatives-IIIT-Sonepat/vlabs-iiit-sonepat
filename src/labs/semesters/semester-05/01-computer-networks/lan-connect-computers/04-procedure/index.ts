import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-plan";
import { step as s02 } from "./02-power-switch";
import { step as s03 } from "./03-patch-left";
import { step as s04 } from "./04-patch-right";
import { step as s05 } from "./05-addresses";
import { step as s06 } from "./06-workgroup";
import { step as s07 } from "./07-ping";
import { step as s08 } from "./08-broadcast";
import { step as s09 } from "./09-browse";
import { step as s10 } from "./10-one-fault";

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
