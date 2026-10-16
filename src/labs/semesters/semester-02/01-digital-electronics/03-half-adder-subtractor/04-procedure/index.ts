import { type SceneProcedureStep } from "@/labs/experiments/types";
import { s2HalfAdderSubtractorStepSchematics } from "@/labs/schematics/semester-02/01-digital-electronics/03-half-adder-subtractor";

import { step as s01 } from "./01-breadboard";
import { step as s02 } from "./02-adder-ics";
import { step as s03 } from "./03-subtractor-ics";
import { step as s04 } from "./04-wire-input-a";
import { step as s05 } from "./05-wire-input-b";
import { step as s06 } from "./06-wire-inverted-a";
import { step as s07 } from "./07-output-stage";
import { step as s08 } from "./08-wire-outputs";
import { step as s09 } from "./09-ground-leds";
import { step as s10 } from "./10-test-circuit";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: s2HalfAdderSubtractorStepSchematics[0] },
  { ...s02, schematic: s2HalfAdderSubtractorStepSchematics[1] },
  { ...s03, schematic: s2HalfAdderSubtractorStepSchematics[2] },
  { ...s04, schematic: s2HalfAdderSubtractorStepSchematics[3] },
  { ...s05, schematic: s2HalfAdderSubtractorStepSchematics[4] },
  { ...s06, schematic: s2HalfAdderSubtractorStepSchematics[5] },
  { ...s07, schematic: s2HalfAdderSubtractorStepSchematics[6] },
  { ...s08, schematic: s2HalfAdderSubtractorStepSchematics[7] },
  { ...s09, schematic: s2HalfAdderSubtractorStepSchematics[8] },
  { ...s10, schematic: s2HalfAdderSubtractorStepSchematics[9] },
];
