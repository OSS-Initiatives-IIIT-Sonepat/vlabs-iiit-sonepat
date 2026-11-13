import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-board-and-chip";
import { step as s02 } from "./02-minimal-system";
import { step as s03 } from "./03-led-on-rd0";
import { step as s04 } from "./04-blink-at-8mhz";
import { step as s05 } from "./05-slow-to-4mhz";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05];
