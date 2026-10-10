import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-set-up-breadboard";
import { step as s02 } from "./02-place-transformer";
import { step as s03 } from "./03-wire-diode-d1";
import { step as s04 } from "./04-wire-diode-d2";
import { step as s05 } from "./05-connect-load-resistor";
import { step as s06 } from "./06-measure-full-wave-output";
import { step as s07 } from "./07-add-filter-capacitor";

export const procedureSteps: SceneProcedureStep[] = [
  s01,
  s02,
  s03,
  s04,
  s05,
  s06,
  s07,
];
