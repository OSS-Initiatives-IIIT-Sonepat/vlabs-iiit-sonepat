import { step as s01 } from "./01-set-up-breadboard-and-power-supply";
import { step as s02 } from "./02-wire-the-not-gate-for-select-complement";
import { step as s03 } from "./03-wire-the-two-and-gates";
import { step as s04 } from "./04-wire-the-or-gate-for-output-y";
import { step as s05 } from "./05-wire-all-signal-connections-and-verify";
import { step as s06 } from "./06-test-s-0-and-s-1-routing-systematically";

import { type SceneProcedureStep } from "@/labs/experiments/types";
import { mux2to1StepSchematics } from "@/labs/schematics/mux-2to1-schematics";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: mux2to1StepSchematics[0] },
  { ...s02, schematic: mux2to1StepSchematics[1] },
  { ...s03, schematic: mux2to1StepSchematics[2] },
  { ...s04, schematic: mux2to1StepSchematics[3] },
  { ...s05, schematic: mux2to1StepSchematics[4] },
  { ...s06, schematic: mux2to1StepSchematics[5] },
];
