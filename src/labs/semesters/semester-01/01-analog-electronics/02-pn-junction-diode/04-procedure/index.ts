import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-components";
import { step as s02 } from "./02-forward-bias";
import { step as s03 } from "./03-forward-readings";
import { step as s04 } from "./04-reverse-bias";
import { step as s05 } from "./05-reverse-readings";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05];
