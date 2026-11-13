import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-board-and-supply";
import { step as s02 } from "./02-seat-the-chip";
import { step as s03 } from "./03-the-four-ports";
import { step as s04 } from "./04-power-and-ea";
import { step as s05 } from "./05-clock";
import { step as s06 } from "./06-reset";
import { step as s07 } from "./07-first-led";
import { step as s08 } from "./08-program-blink";
import { step as s09 } from "./09-watch-it-blink";

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
