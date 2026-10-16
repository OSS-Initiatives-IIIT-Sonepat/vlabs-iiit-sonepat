import { dFlipFlopStepSchematics } from "@/labs/schematics/semester-02/01-digital-electronics/15-d-flip-flop";
import { step as s01 } from "./01-place-the-breadboard";
import { step as s02 } from "./02-place-the-74hc74-d-flip-flop-ic";
import { step as s03 } from "./03-tie-pre-bar-and-clr-bar-high";
import { step as s04 } from "./04-wire-d-and-clk-inputs";
import { step as s05 } from "./05-add-resistors-and-output-leds";
import { step as s06 } from "./06-connect-the-output-paths";
import { step as s07 } from "./07-test-d-0-then-apply-rising-clock-edge";
import { step as s08 } from "./08-test-d-1-then-apply-rising-clock-edge";
import { step as s09 } from "./09-test-change-d-without-clocking-q-holds";

import { type SceneProcedureStep } from "@/labs/experiments/types";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: dFlipFlopStepSchematics[0] },
  { ...s02, schematic: dFlipFlopStepSchematics[1] },
  { ...s03, schematic: dFlipFlopStepSchematics[2] },
  { ...s04, schematic: dFlipFlopStepSchematics[3] },
  { ...s05, schematic: dFlipFlopStepSchematics[4] },
  { ...s06, schematic: dFlipFlopStepSchematics[5] },
  { ...s07, schematic: dFlipFlopStepSchematics[6] },
  { ...s08, schematic: dFlipFlopStepSchematics[7] },
  { ...s09, schematic: dFlipFlopStepSchematics[8] },
];
