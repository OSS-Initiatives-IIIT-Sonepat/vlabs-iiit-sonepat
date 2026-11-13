import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-parts";
import { step as s02 } from "./02-pulldown";
import { step as s03 } from "./03-wiring-input";
import { step as s04 } from "./04-led-output";
import { step as s05 } from "./05-program-and-press";
import { step as s06 } from "./06-released";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05, s06];
