import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step as s01 } from "./01-breadboard-and-supply";
import { step as s02 } from "./02-first-nor";
import { step as s03 } from "./03-second-nor";
import { step as s04 } from "./04-cross-coupling";
import { step as s05 } from "./05-inputs";
import { step as s06 } from "./06-leds";
import { step as s07 } from "./07-output-wires";
import { step as s08 } from "./08-reset";
import { step as s09 } from "./09-hold-after-reset";
import { step as s10 } from "./10-set";
import { step as s11 } from "./11-hold-after-set";
import { step as s12 } from "./12-reset-again";
import { step as s13 } from "./13-invalid";

export const procedureSteps: SceneProcedureStep[] = [
  s01,
  s02,
  s03,
  s04,
  s05,
  s06,
  s07,
  s08,
  s09,
  s10,
  s11,
  s12,
  s13,
];
