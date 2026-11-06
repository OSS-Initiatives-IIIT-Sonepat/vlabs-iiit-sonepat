import { fullAdderRippleStepSchematics as fig } from "@/labs/schematics/semester-02/02-advanced-adders/full-adder-ripple";

import { step as s01 } from "./01-plan-the-layout-and-set-up-power-rails";
import { step as s02 } from "./02-build-and-wire-fa0-bit-0-lsb";
import { step as s03 } from "./03-build-and-wire-fa1-fa2-fa3";
import { step as s04 } from "./04-verify-carry-chain-wiring";
import { step as s05 } from "./05-test-with-selected-binary-additions";
import { step as s06 } from "./06-test-worst-case-carry-propagation";
import { step as s07 } from "./07-measure-carry-ripple-delay-with-oscilloscope";

import { type SceneProcedureStep } from "@/labs/experiments/types";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: fig[0] },
  { ...s02, schematic: fig[1] },
  { ...s03, schematic: fig[2] },
  { ...s04, schematic: fig[3] },
  { ...s05, schematic: fig[4] },
  { ...s06, schematic: fig[5] },
  { ...s07, schematic: fig[6] },
];
