import { type SceneProcedureStep } from "@/labs/experiments/types";
import { s2IntroLogicGatesStepSchematics } from "@/labs/schematics/semester-02/01-digital-electronics/01-intro-logic-gates";

import { step as s01 } from "./01-breadboard";
import { step as s02 } from "./02-chips-basic";
import { step as s03 } from "./03-chips-advanced";
import { step as s04 } from "./04-input-wiring";
import { step as s05 } from "./05-indicators";
import { step as s06 } from "./06-outputs";
import { step as s07 } from "./07-test-00";
import { step as s08 } from "./08-test-01";
import { step as s09 } from "./09-test-10";
import { step as s10 } from "./10-test-11";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: s2IntroLogicGatesStepSchematics[0] },
  { ...s02, schematic: s2IntroLogicGatesStepSchematics[1] },
  { ...s03, schematic: s2IntroLogicGatesStepSchematics[2] },
  { ...s04, schematic: s2IntroLogicGatesStepSchematics[3] },
  { ...s05, schematic: s2IntroLogicGatesStepSchematics[4] },
  { ...s06, schematic: s2IntroLogicGatesStepSchematics[5] },
  { ...s07, schematic: s2IntroLogicGatesStepSchematics[6] },
  { ...s08, schematic: s2IntroLogicGatesStepSchematics[7] },
  { ...s09, schematic: s2IntroLogicGatesStepSchematics[8] },
  { ...s10, schematic: s2IntroLogicGatesStepSchematics[9] },
];
