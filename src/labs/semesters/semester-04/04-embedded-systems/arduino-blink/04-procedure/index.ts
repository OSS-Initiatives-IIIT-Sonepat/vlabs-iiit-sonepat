import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-breadboard-and-uno";
import { step as s02 } from "./02-insert-resistor";
import { step as s03 } from "./03-insert-led";
import { step as s04 } from "./04-wire-d13";
import { step as s05 } from "./05-wire-ground";
import { step as s06 } from "./06-upload-and-blink";
import { step as s07 } from "./07-led-off";

export const procedureSteps: SceneProcedureStep[] = [
  s01,
  s02,
  s03,
  s04,
  s05,
  s06,
  s07,
];
