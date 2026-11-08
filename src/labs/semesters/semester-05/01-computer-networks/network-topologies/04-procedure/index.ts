import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-five-rooms";
import { step as s02 } from "./02-bus-build";
import { step as s03 } from "./03-bus-send";
import { step as s04 } from "./04-bus-fault";
import { step as s05 } from "./05-star-send";
import { step as s06 } from "./06-star-fault";
import { step as s07 } from "./07-ring-send";
import { step as s08 } from "./08-ring-fault";
import { step as s09 } from "./09-mesh-send";
import { step as s10 } from "./10-mesh-fault";
import { step as s11 } from "./11-tree-send";
import { step as s12 } from "./12-tree-fault";

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
