import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-breadboard-and-power-supply";
import { step as s02 } from "./02-fixed-bias-base-resistor";
import { step as s03 } from "./03-fixed-bias-collector-network";
import { step as s04 } from "./04-fixed-bias-q-point-measurement";
import { step as s05 } from "./05-voltage-divider-resistors-r1-r2";
import { step as s06 } from "./06-emitter-stabilization-resistor-re";
import { step as s07 } from "./07-voltage-divider-q-point-measurement";

export const procedureSteps: SceneProcedureStep[] = [
  s01,
  s02,
  s03,
  s04,
  s05,
  s06,
  s07,
];
