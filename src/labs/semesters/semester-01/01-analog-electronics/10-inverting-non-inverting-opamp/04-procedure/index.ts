import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-identify-lm741-pins";
import { step as s02 } from "./02-check-parts-and-set-supply";
import { step as s03 } from "./03-wire-inverting-amplifier";
import { step as s04 } from "./04-connect-oscilloscope";
import { step as s05 } from "./05-power-on-check";
import { step as s06 } from "./06-measure-inverting-gain";
import { step as s07 } from "./07-observe-saturation";
import { step as s08 } from "./08-vary-feedback-inverting";
import { step as s09 } from "./09-rebuild-non-inverting-amplifier";
import { step as s10 } from "./10-measure-non-inverting-gain";
import { step as s11 } from "./11-vary-feedback-non-inverting";
import { step as s12 } from "./12-calculate-error-and-shut-down";

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
