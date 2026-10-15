import { type SceneProcedureStep } from "@/labs/experiments/types";
import { s2GateMinimizationStepSchematics } from "@/labs/schematics/s2-gate-minimization-schematics";

import { step as s01 } from "./01-place-breadboard";
import { step as s02 } from "./02-place-two-level-gates";
import { step as s03 } from "./03-wire-two-level-inputs";
import { step as s04 } from "./04-connect-or-level-and-f1";
import { step as s05 } from "./05-verify-two-level";
import { step as s06 } from "./06-place-multi-level-gates";
import { step as s07 } from "./07-wire-multi-level";
import { step as s08 } from "./08-connect-f2-indicator";
import { step as s09 } from "./09-compare-outputs";
import { step as s10 } from "./10-check-zero-case";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: s2GateMinimizationStepSchematics[0] },
  { ...s02, schematic: s2GateMinimizationStepSchematics[1] },
  { ...s03, schematic: s2GateMinimizationStepSchematics[2] },
  { ...s04, schematic: s2GateMinimizationStepSchematics[3] },
  { ...s05, schematic: s2GateMinimizationStepSchematics[4] },
  { ...s06, schematic: s2GateMinimizationStepSchematics[5] },
  { ...s07, schematic: s2GateMinimizationStepSchematics[6] },
  { ...s08, schematic: s2GateMinimizationStepSchematics[7] },
  { ...s09, schematic: s2GateMinimizationStepSchematics[8] },
  { ...s10, schematic: s2GateMinimizationStepSchematics[9] },
];
