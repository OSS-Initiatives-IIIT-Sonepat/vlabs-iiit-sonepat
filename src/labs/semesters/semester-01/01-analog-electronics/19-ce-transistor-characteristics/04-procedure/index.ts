import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-transistor";
import { step as s02 } from "./02-ground-emitter";
import { step as s03 } from "./03-place-rb";
import { step as s04 } from "./04-base-supply";
import { step as s05 } from "./05-input-meters";
import { step as s06 } from "./06-collector-supply";
import { step as s07 } from "./07-vce-2";
import { step as s08 } from "./08-vce-5";
import { step as s09 } from "./09-ib-20";
import { step as s10 } from "./10-ib-60";
import { step as s11 } from "./11-vce-0";
import { step as s12 } from "./12-parameters";

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
