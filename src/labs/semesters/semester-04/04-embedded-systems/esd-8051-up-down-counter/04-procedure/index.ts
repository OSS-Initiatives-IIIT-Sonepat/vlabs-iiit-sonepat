import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-parts";
import { step as s02 } from "./02-wire-power-and-ports";
import { step as s03 } from "./03-program-up-down";
import { step as s04 } from "./04-reverse-direction";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04];
