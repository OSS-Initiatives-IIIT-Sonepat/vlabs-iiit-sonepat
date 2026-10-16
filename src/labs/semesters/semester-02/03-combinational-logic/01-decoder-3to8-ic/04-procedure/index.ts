import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-and-power";
import { step as s02 } from "./02-tie-enables";
import { step as s03 } from "./03-wire-address-inputs";
import { step as s04 } from "./04-wire-output-leds";
import { step as s05 } from "./05-test-address-3";
import { step as s06 } from "./06-test-address-5";
import { step as s07 } from "./07-test-address-7";
import { step as s08 } from "./08-disable-with-e1";

import { decoder3to8IcStepSchematics } from "@/labs/schematics/semester-02/03-combinational-logic/01-decoder-3to8-ic";

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05, s06, s07, s08].map(
  (s, i) => ({ ...s, schematic: decoder3to8IcStepSchematics[i] }),
);
