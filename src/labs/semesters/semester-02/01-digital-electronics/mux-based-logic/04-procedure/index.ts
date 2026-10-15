import { muxBasedLogicStepSchematics } from "@/labs/schematics/s2-mux-based-logic-schematics";
import { step as s01 } from "./01-construct-the-2-1-mux-base-circuit";
import { step as s02 } from "./02-implement-and-a-b-using-the-mux";
import { step as s03 } from "./03-implement-or-a-b-using-the-mux";
import { step as s04 } from "./04-implement-xor-a-b-using-the-mux";
import { step as s05 } from "./05-document-all-three-function-implementations";
import { step as s06 } from "./06-generalise-determine-d0-d1-for-any-function";

import { type SceneProcedureStep } from "@/labs/experiments/types";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: muxBasedLogicStepSchematics[0] },
  { ...s02, schematic: muxBasedLogicStepSchematics[1] },
  { ...s03, schematic: muxBasedLogicStepSchematics[2] },
  { ...s04, schematic: muxBasedLogicStepSchematics[3] },
  { ...s05, schematic: muxBasedLogicStepSchematics[4] },
  { ...s06, schematic: muxBasedLogicStepSchematics[5] },
];
