import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-board";
import { step as s02 } from "./02-place-button";
import { step as s03 } from "./03-wire-d2";
import { step as s04 } from "./04-wire-ground";
import { step as s05 } from "./05-released";
import { step as s06 } from "./06-pressed";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05, s06];
