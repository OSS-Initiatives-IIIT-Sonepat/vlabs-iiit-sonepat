import { type SceneProcedureStep } from "@/labs/experiments/types";
import { s2Mux4to1IcStepSchematics } from "@/labs/schematics/s2-mux-4to1-ic-schematics";
import { step as s01 } from "./01-breadboard-and-supply";
import { step as s02 } from "./02-place-ic";
import { step as s03 } from "./03-enable";
import { step as s04 } from "./04-data-inputs";
import { step as s05 } from "./05-select-lines";
import { step as s06 } from "./06-output-stage";
import { step as s07 } from "./07-test-00";
import { step as s08 } from "./08-test-01";
import { step as s09 } from "./09-test-10";
import { step as s10 } from "./10-test-11";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: s2Mux4to1IcStepSchematics[0] },
  { ...s02, schematic: s2Mux4to1IcStepSchematics[1] },
  { ...s03, schematic: s2Mux4to1IcStepSchematics[2] },
  { ...s04, schematic: s2Mux4to1IcStepSchematics[3] },
  { ...s05, schematic: s2Mux4to1IcStepSchematics[4] },
  { ...s06, schematic: s2Mux4to1IcStepSchematics[5] },
  { ...s07, schematic: s2Mux4to1IcStepSchematics[6] },
  { ...s08, schematic: s2Mux4to1IcStepSchematics[7] },
  { ...s09, schematic: s2Mux4to1IcStepSchematics[8] },
  { ...s10, schematic: s2Mux4to1IcStepSchematics[9] },
];
