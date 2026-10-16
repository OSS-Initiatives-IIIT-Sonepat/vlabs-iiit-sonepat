import { s2Decoder2to4StepSchematics } from "@/labs/schematics/semester-02/01-digital-electronics/12-decoder-2to4";
import { step as s01 } from "./01-set-up-breadboard-and-power-supply";
import { step as s02 } from "./02-wire-not-gates-for-input-complements";
import { step as s03 } from "./03-wire-all-four-and-gates-for-minterm-outputs";
import { step as s04 } from "./04-connect-led-output-indicators";
import { step as s05 } from "./05-test-all-4-input-combinations-and-verify-one-hot";

import { type SceneProcedureStep } from "@/labs/experiments/types";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: s2Decoder2to4StepSchematics[0] },
  { ...s02, schematic: s2Decoder2to4StepSchematics[1] },
  { ...s03, schematic: s2Decoder2to4StepSchematics[2] },
  { ...s04, schematic: s2Decoder2to4StepSchematics[3] },
  { ...s05, schematic: s2Decoder2to4StepSchematics[4] },
];
