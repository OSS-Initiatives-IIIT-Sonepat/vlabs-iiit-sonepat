import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-place-transistor";
import { step as s02 } from "./02-ground-base";
import { step as s03 } from "./03-emitter-resistor";
import { step as s04 } from "./04-emitter-supply-and-ammeter";
import { step as s05 } from "./05-measure-veb";
import { step as s06 } from "./06-collector-supply-and-ammeter";
import { step as s07 } from "./07-measure-vcb";
import { step as s08 } from "./08-input-vcb-0";
import { step as s09 } from "./09-input-vcb-5";
import { step as s10 } from "./10-output-characteristics";
import { step as s11 } from "./11-calculate-parameters";

import { cbTransistorCharacteristicsStepSchematics } from "@/labs/schematics/cb-transistor-characteristics-schematics";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: cbTransistorCharacteristicsStepSchematics[0] },
  { ...s02, schematic: cbTransistorCharacteristicsStepSchematics[1] },
  { ...s03, schematic: cbTransistorCharacteristicsStepSchematics[2] },
  { ...s04, schematic: cbTransistorCharacteristicsStepSchematics[3] },
  { ...s05, schematic: cbTransistorCharacteristicsStepSchematics[4] },
  { ...s06, schematic: cbTransistorCharacteristicsStepSchematics[5] },
  { ...s07, schematic: cbTransistorCharacteristicsStepSchematics[6] },
  { ...s08, schematic: cbTransistorCharacteristicsStepSchematics[7] },
  { ...s09, schematic: cbTransistorCharacteristicsStepSchematics[8] },
  { ...s10, schematic: cbTransistorCharacteristicsStepSchematics[9] },
  { ...s11, schematic: cbTransistorCharacteristicsStepSchematics[10] },
];
