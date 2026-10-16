import { type SceneProcedureStep } from "@/labs/experiments/types";

import { step as s01 } from "./01-breadboard-and-supplies";
import { step as s02 } from "./02-place-mosfet";
import { step as s03 } from "./03-ground-connections";
import { step as s04 } from "./04-drain-resistor-ammeter";
import { step as s05 } from "./05-gate-bias";
import { step as s06 } from "./06-connect-voltmeters";
import { step as s07 } from "./07-dc-operating-point";
import { step as s08 } from "./08-vary-gate-voltage";
import { step as s09 } from "./09-apply-input-signal";
import { step as s10 } from "./10-observe-output";

import { mosfetCommonSourceStepSchematics } from "@/labs/schematics/semester-01/01-analog-electronics/12-mosfet-common-source";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: mosfetCommonSourceStepSchematics[0] },
  { ...s02, schematic: mosfetCommonSourceStepSchematics[1] },
  { ...s03, schematic: mosfetCommonSourceStepSchematics[2] },
  { ...s04, schematic: mosfetCommonSourceStepSchematics[3] },
  { ...s05, schematic: mosfetCommonSourceStepSchematics[4] },
  { ...s06, schematic: mosfetCommonSourceStepSchematics[5] },
  { ...s07, schematic: mosfetCommonSourceStepSchematics[6] },
  { ...s08, schematic: mosfetCommonSourceStepSchematics[7] },
  { ...s09, schematic: mosfetCommonSourceStepSchematics[8] },
  { ...s10, schematic: mosfetCommonSourceStepSchematics[9] },
];
