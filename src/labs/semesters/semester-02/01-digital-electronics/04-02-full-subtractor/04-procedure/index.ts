import { type SceneProcedureStep } from "@/labs/experiments/types";
import { s2FullSubtractorStepSchematics } from "@/labs/schematics/semester-02/01-digital-electronics/04-02-full-subtractor";
import { step as s01 } from "./01-place-breadboard";
import { step as s02 } from "./02-place-difference-gates";
import { step as s03 } from "./03-place-borrow-gates";
import { step as s04 } from "./04-place-outputs";
import { step as s05 } from "./05-wire-inputs-a-b";
import { step as s06 } from "./06-wire-bin";
import { step as s07 } from "./07-wire-internal-signals";
import { step as s08 } from "./08-wire-outputs-ground";
import { step as s09 } from "./09-test-010";
import { step as s10 } from "./10-test-111";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: s2FullSubtractorStepSchematics[0] },
  { ...s02, schematic: s2FullSubtractorStepSchematics[1] },
  { ...s03, schematic: s2FullSubtractorStepSchematics[2] },
  { ...s04, schematic: s2FullSubtractorStepSchematics[3] },
  { ...s05, schematic: s2FullSubtractorStepSchematics[4] },
  { ...s06, schematic: s2FullSubtractorStepSchematics[5] },
  { ...s07, schematic: s2FullSubtractorStepSchematics[6] },
  { ...s08, schematic: s2FullSubtractorStepSchematics[7] },
  { ...s09, schematic: s2FullSubtractorStepSchematics[8] },
  { ...s10, schematic: s2FullSubtractorStepSchematics[9] },
];
