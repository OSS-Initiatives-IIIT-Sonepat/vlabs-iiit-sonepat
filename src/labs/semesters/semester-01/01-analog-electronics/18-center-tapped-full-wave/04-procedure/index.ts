import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-breadboard";
import { step as s02 } from "./02-secondary";
import { step as s03 } from "./03-place-d1";
import { step as s04 } from "./04-place-d2";
import { step as s05 } from "./05-join-cathodes";
import { step as s06 } from "./06-place-load";
import { step as s07 } from "./07-measure-dc";
import { step as s08 } from "./08-observe-ripple";
import { step as s09 } from "./09-add-filter";

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
