import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-breadboard";
import { step as s02 } from "./02-place-r";
import { step as s03 } from "./03-place-l";
import { step as s04 } from "./04-place-c";
import { step as s05 } from "./05-connect-instruments";
import { step as s06 } from "./06-below-resonance";
import { step as s07 } from "./07-resonance";
import { step as s08 } from "./08-half-power";
import { step as s09 } from "./09-capacitor-current";
import { step as s10 } from "./10-lower-r";
import { step as s11 } from "./11-larger-c";

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
];
