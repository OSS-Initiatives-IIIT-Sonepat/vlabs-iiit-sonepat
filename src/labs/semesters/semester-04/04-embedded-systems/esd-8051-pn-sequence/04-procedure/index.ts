import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-build-channels";
import { step as s02 } from "./02-program-lfsr";
import { step as s03 } from "./03-observe-sequence";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03];
