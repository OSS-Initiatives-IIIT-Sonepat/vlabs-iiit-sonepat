import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-breadboard-and-supply";
import { step as s02 } from "./02-place-ics";
import { step as s03 } from "./03-place-leds";
import { step as s04 } from "./04-clock-source";
import { step as s05 } from "./05-toggle-feedback";
import { step as s06 } from "./06-clock-chain";
import { step as s07 } from "./07-reset-logic";
import { step as s08 } from "./08-output-leds";
import { step as s09 } from "./09-test-up";
import { step as s10 } from "./10-up-wraparound";
import { step as s11 } from "./11-test-down";

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
