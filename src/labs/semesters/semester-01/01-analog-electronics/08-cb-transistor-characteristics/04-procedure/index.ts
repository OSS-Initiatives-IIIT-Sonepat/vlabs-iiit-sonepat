import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-transistor";
import { step as s02 } from "./02-ground-base";
import { step as s03 } from "./03-emitter-resistor";
import { step as s04 } from "./04-emitter-supply-and-ammeter";
import { step as s05 } from "./05-measure-veb";
import { step as s06 } from "./06-collector-supply-and-ammeter";
import { step as s07 } from "./07-measure-vcb";
import { step as s08 } from "./08-input-vcb-0";
import { step as s09 } from "./09-input-vcb-5";
import { step as s10 } from "./10-output-characteristics";
import { step as s11 } from "./11-calculate-parameters";

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
];
