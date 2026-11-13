import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-trainer";
import { step as s02 } from "./02-resistor-and-led";
import { step as s03 } from "./03-wire-rd0-and-power";
import { step as s04 } from "./04-led-ground";
import { step as s05 } from "./05-blink-at-8mhz";
import { step as s06 } from "./06-slow-to-4mhz";

export const procedureSteps: SceneProcedureStep[] = [
  s01,
  s02,
  s03,
  s04,
  s05,
  s06,
];
