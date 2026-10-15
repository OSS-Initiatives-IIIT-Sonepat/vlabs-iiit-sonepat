import { s2Demux1to4IcStepSchematics } from "@/labs/schematics/s2-demux-1to4-ic-schematics";
import { step as s01 } from "./01-inspect-and-place-the-breadboard";
import { step as s02 } from "./02-mount-the-74hc139-ic";
import { step as s03 } from "./03-tie-en-bar-to-gnd";
import { step as s04 } from "./04-wire-select-inputs-a-and-b";
import { step as s05 } from "./05-wire-outputs-y0-y3-to-leds";
import { step as s06 } from "./06-test-a-0-b-0-y0-active";
import { step as s07 } from "./07-test-a-1-b-1-y3-active";

import { type SceneProcedureStep } from "@/labs/experiments/types";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: s2Demux1to4IcStepSchematics[0] },
  { ...s02, schematic: s2Demux1to4IcStepSchematics[1] },
  { ...s03, schematic: s2Demux1to4IcStepSchematics[2] },
  { ...s04, schematic: s2Demux1to4IcStepSchematics[3] },
  { ...s05, schematic: s2Demux1to4IcStepSchematics[4] },
  { ...s06, schematic: s2Demux1to4IcStepSchematics[5] },
  { ...s07, schematic: s2Demux1to4IcStepSchematics[6] },
];
