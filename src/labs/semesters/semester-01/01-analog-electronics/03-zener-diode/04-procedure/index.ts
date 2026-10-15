import { type SceneProcedureStep } from "@/labs/experiments/types";
import { zenerStepSchematics } from "@/labs/schematics/zener-diode-schematics";

import { step as s01 } from "./01-breadboard-and-supply";
import { step as s02 } from "./02-ammeter-in-series";
import { step as s03 } from "./03-resistor";
import { step as s04 } from "./04-zener-forward";
import { step as s05 } from "./05-wire-forward-path";
import { step as s06 } from "./06-voltmeter-forward";
import { step as s07 } from "./07-forward-sweep";
import { step as s08 } from "./08-reverse-zener";
import { step as s09 } from "./09-reverse-wiring";
import { step as s10 } from "./10-reverse-sweep";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: zenerStepSchematics[0] },
  { ...s02, schematic: zenerStepSchematics[1] },
  { ...s03, schematic: zenerStepSchematics[2] },
  { ...s04, schematic: zenerStepSchematics[3] },
  { ...s05, schematic: zenerStepSchematics[4] },
  { ...s06, schematic: zenerStepSchematics[5] },
  { ...s07, schematic: zenerStepSchematics[6] },
  { ...s08, schematic: zenerStepSchematics[7] },
  { ...s09, schematic: zenerStepSchematics[8] },
  { ...s10, schematic: zenerStepSchematics[9] },
];
