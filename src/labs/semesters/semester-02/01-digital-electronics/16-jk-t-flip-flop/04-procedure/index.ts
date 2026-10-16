import { jkTFlipFlopStepSchematics } from "@/labs/schematics/semester-02/01-digital-electronics/16-jk-t-flip-flop";
import { step as s01 } from "./01-place-the-breadboard";
import { step as s02 } from "./02-place-the-74hc76-jk-flip-flop-ic";
import { step as s03 } from "./03-tie-set-bar-and-clr-bar-high";
import { step as s04 } from "./04-wire-j-k-and-clk-inputs";
import { step as s05 } from "./05-add-q-and-q-bar-output-leds";
import { step as s06 } from "./06-test-jk-10-set-on-falling-edge";
import { step as s07 } from "./07-test-jk-01-reset-on-falling-edge";
import { step as s08 } from "./08-test-jk-11-toggle-on-falling-edge";
import { step as s09 } from "./09-rewire-for-t-mode-connect-t-to-both-j-and-k";
import { step as s10 } from "./10-t-mode-t-1-q-toggles-on-every-clock";

import { type SceneProcedureStep } from "@/labs/experiments/types";
//
export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: jkTFlipFlopStepSchematics[0] },
  { ...s02, schematic: jkTFlipFlopStepSchematics[1] },
  { ...s03, schematic: jkTFlipFlopStepSchematics[2] },
  { ...s04, schematic: jkTFlipFlopStepSchematics[3] },
  { ...s05, schematic: jkTFlipFlopStepSchematics[4] },
  { ...s06, schematic: jkTFlipFlopStepSchematics[5] },
  { ...s07, schematic: jkTFlipFlopStepSchematics[6] },
  { ...s08, schematic: jkTFlipFlopStepSchematics[7] },
  { ...s09, schematic: jkTFlipFlopStepSchematics[8] },
  { ...s10, schematic: jkTFlipFlopStepSchematics[9] },
];
