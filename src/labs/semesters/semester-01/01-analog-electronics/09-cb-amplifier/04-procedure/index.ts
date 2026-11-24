import { step as s01 } from "./01-place-breadboard";
import { step as s02 } from "./02-connect-supplies";
import { step as s03 } from "./03-insert-transistor";
import { step as s04 } from "./04-emitter-circuit";
import { step as s05 } from "./05-collector-circuit";
import { step as s06 } from "./06-connect-voltmeters";
import { step as s07 } from "./07-dc-readings";
import { step as s08 } from "./08-input-capacitor";
import { step as s09 } from "./09-ac-gain";

import { type SceneProcedureStep } from "@/labs/experiments/types";
import { cbAmplifierStepSchematics } from "@/labs/schematics/semester-01/01-analog-electronics/09-cb-amplifier";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: cbAmplifierStepSchematics[0] },
  { ...s02, schematic: cbAmplifierStepSchematics[1] },
  { ...s03, schematic: cbAmplifierStepSchematics[2] },
  { ...s04, schematic: cbAmplifierStepSchematics[3] },
  { ...s05, schematic: cbAmplifierStepSchematics[4] },
  { ...s06, schematic: cbAmplifierStepSchematics[5] },
  { ...s07, schematic: cbAmplifierStepSchematics[6] },
  { ...s08, schematic: cbAmplifierStepSchematics[7] },
  { ...s09, schematic: cbAmplifierStepSchematics[8] },
];
