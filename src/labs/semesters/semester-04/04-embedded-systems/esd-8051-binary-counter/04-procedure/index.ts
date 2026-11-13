import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-trainer";
import { step as s02 } from "./02-power-and-reset";
import { step as s03 } from "./03-leds-on-p1";
import { step as s04 } from "./04-program-counter";
import { step as s05 } from "./05-watch-count";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05];
