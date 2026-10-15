import { step as s01 } from "./01-set-up-breadboard-and-power-supply";
import { step as s02 } from "./02-insert-and-connect-the-xor-gates-74hc86";
import { step as s03 } from "./03-insert-and-connect-the-and-gates-74hc08";
import { step as s04 } from "./04-insert-and-connect-the-or-gate-74hc32";
import { step as s05 } from "./05-wire-all-input-connections";
import { step as s06 } from "./06-connect-internal-wires-between-ics";
import { step as s07 } from "./07-test-all-8-input-combinations-and-verify-outputs";

import { type SceneProcedureStep } from "@/labs/experiments/types";
import { fullAdderStepSchematics } from "@/labs/schematics/full-adder-schematics";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: fullAdderStepSchematics[0] },
  { ...s02, schematic: fullAdderStepSchematics[1] },
  { ...s03, schematic: fullAdderStepSchematics[2] },
  { ...s04, schematic: fullAdderStepSchematics[3] },
  { ...s05, schematic: fullAdderStepSchematics[4] },
  { ...s06, schematic: fullAdderStepSchematics[5] },
  { ...s07, schematic: fullAdderStepSchematics[6] },
];
