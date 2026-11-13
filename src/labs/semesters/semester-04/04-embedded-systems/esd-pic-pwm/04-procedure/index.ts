import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-build-led-circuit";
import { step as s02 } from "./02-set-pwm-period";
import { step as s03 } from "./03-quarter-duty";
import { step as s04 } from "./04-half-and-full";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04];
