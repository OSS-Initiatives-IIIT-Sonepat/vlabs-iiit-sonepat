import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-ladder";
import { step as s02 } from "./02-bit-lines";
import { step as s03 } from "./03-power-and-meter";
import { step as s04 } from "./04-program-ramp";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04];
