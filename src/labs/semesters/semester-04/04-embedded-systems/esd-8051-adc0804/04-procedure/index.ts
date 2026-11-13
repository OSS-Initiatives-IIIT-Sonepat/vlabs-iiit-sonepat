import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-chips";
import { step as s02 } from "./02-input-divider";
import { step as s03 } from "./03-clock-and-power";
import { step as s04 } from "./04-control-and-data";
import { step as s05 } from "./05-program-and-read";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05];
