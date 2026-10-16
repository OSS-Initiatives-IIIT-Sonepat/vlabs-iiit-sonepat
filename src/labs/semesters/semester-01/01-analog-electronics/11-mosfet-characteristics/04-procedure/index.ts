import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step as s01 } from "./01-step";
import { step as s02 } from "./02-step";
import { step as s03 } from "./03-step";
import { step as s04 } from "./04-step";
import { step as s05 } from "./05-step";
import { step as s06 } from "./06-step";
import { step as s07 } from "./07-step";
import { step as s08 } from "./08-step";
import { step as s09 } from "./09-step";
import { step as s10 } from "./10-step";

import { mosfetCharacteristicsStepSchematics } from "@/labs/schematics/semester-01/01-analog-electronics/11-mosfet-characteristics";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: mosfetCharacteristicsStepSchematics[0] },
  { ...s02, schematic: mosfetCharacteristicsStepSchematics[1] },
  { ...s03, schematic: mosfetCharacteristicsStepSchematics[2] },
  { ...s04, schematic: mosfetCharacteristicsStepSchematics[3] },
  { ...s05, schematic: mosfetCharacteristicsStepSchematics[4] },
  { ...s06, schematic: mosfetCharacteristicsStepSchematics[5] },
  { ...s07, schematic: mosfetCharacteristicsStepSchematics[6] },
  { ...s08, schematic: mosfetCharacteristicsStepSchematics[7] },
  { ...s09, schematic: mosfetCharacteristicsStepSchematics[8] },
  { ...s10, schematic: mosfetCharacteristicsStepSchematics[9] },
];
