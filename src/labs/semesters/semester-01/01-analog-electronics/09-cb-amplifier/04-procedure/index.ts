import { step as s01 } from "./01-place-the-breadboard-on-the-workbench";
import { step as s02 } from "./02-connect-the-dc-power-supply";
import { step as s03 } from "./03-connect-the-dmm-as-an-ammeter-in-series";
import { step as s04 } from "./04-insert-the-emitter-resistor-r-e-1-k-and-connect-";
import { step as s05 } from "./05-insert-the-collector-resistor-r-c-4-7-k";
import { step as s06 } from "./06-insert-the-input-coupling-capacitor-c-in-10-f";
import { step as s07 } from "./07-insert-the-output-indicator-led-yellow";
import { step as s08 } from "./08-wire-r-c-output-to-the-led-anode";
import { step as s09 } from "./09-power-on-and-record-input-output-characteristics";

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
