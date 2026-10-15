import { type SceneProcedureStep } from "@/labs/experiments/types";
import { voltageRegulatorStepSchematics } from "@/labs/schematics/zener-voltage-regulator-schematics";

import { step as s01 } from "./01-breadboard-and-supply";
import { step as s02 } from "./02-series-resistor";
import { step as s03 } from "./03-zener-diode";
import { step as s04 } from "./04-load-resistor";
import { step as s05 } from "./05-multimeter";
import { step as s06 } from "./06-line-regulation-6v";
import { step as s07 } from "./07-line-regulation-8v";
import { step as s08 } from "./08-line-regulation-10v";
import { step as s09 } from "./09-line-regulation-12v";
import { step as s10 } from "./10-load-regulation";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: voltageRegulatorStepSchematics[0] },
  { ...s02, schematic: voltageRegulatorStepSchematics[1] },
  { ...s03, schematic: voltageRegulatorStepSchematics[2] },
  { ...s04, schematic: voltageRegulatorStepSchematics[3] },
  { ...s05, schematic: voltageRegulatorStepSchematics[4] },
  { ...s06, schematic: voltageRegulatorStepSchematics[5] },
  { ...s07, schematic: voltageRegulatorStepSchematics[6] },
  { ...s08, schematic: voltageRegulatorStepSchematics[7] },
  { ...s09, schematic: voltageRegulatorStepSchematics[8] },
  { ...s10, schematic: voltageRegulatorStepSchematics[9] },
];
