import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-board";
import { step as s02 } from "./02-place-r1";
import { step as s03 } from "./03-place-r2";
import { step as s04 } from "./04-wire-5v";
import { step as s05 } from "./05-wire-a0";
import { step as s06 } from "./06-ground";
import { step as s07 } from "./07-read-voltage";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05, s06, s07];
