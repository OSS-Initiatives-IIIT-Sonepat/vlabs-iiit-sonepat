import { type SceneProcedureStep } from "@/labs/experiments/types";
import { halfWaveStepSchematics } from "@/labs/schematics/half-wave-rectifier-schematics";

import { step as s01 } from "./01-breadboard";
import { step as s02 } from "./02-place-ac-source";
import { step as s03 } from "./03-place-diode";
import { step as s04 } from "./04-wire-source-diode";
import { step as s05 } from "./05-place-load-resistor";
import { step as s06 } from "./06-wire-diode-load";
import { step as s07 } from "./07-ground-load";
import { step as s08 } from "./08-connect-multimeter";
import { step as s09 } from "./09-add-filter-capacitor";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: halfWaveStepSchematics[0] },
  { ...s02, schematic: halfWaveStepSchematics[1] },
  { ...s03, schematic: halfWaveStepSchematics[2] },
  { ...s04, schematic: halfWaveStepSchematics[3] },
  { ...s05, schematic: halfWaveStepSchematics[4] },
  { ...s06, schematic: halfWaveStepSchematics[5] },
  { ...s07, schematic: halfWaveStepSchematics[6] },
  { ...s08, schematic: halfWaveStepSchematics[7] },
  { ...s09, schematic: halfWaveStepSchematics[8] },
];
