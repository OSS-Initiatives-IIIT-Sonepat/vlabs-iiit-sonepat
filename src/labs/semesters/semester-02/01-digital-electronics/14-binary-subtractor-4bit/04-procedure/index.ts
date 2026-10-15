import { type SceneProcedureStep } from "@/labs/experiments/types";
import { binarySubtractor4bitStepSchematics } from "@/labs/schematics/s2-binary-subtractor-4bit-schematics";
import { step as s01 } from "./01-theory-recap";
import { step as s02 } from "./02-power-and-ics";
import { step as s03 } from "./03-invert-b";
import { step as s04 } from "./04-wire-adder";
import { step as s05 } from "./05-outputs";
import { step as s06 } from "./06-no-borrow-case";
import { step as s07 } from "./07-borrow-case";
import { step as s08 } from "./08-edge-cases";
import { step as s09 } from "./09-record";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: binarySubtractor4bitStepSchematics[0] },
  { ...s02, schematic: binarySubtractor4bitStepSchematics[1] },
  { ...s03, schematic: binarySubtractor4bitStepSchematics[2] },
  { ...s04, schematic: binarySubtractor4bitStepSchematics[3] },
  { ...s05, schematic: binarySubtractor4bitStepSchematics[4] },
  { ...s06, schematic: binarySubtractor4bitStepSchematics[5] },
  { ...s07, schematic: binarySubtractor4bitStepSchematics[6] },
  { ...s08, schematic: binarySubtractor4bitStepSchematics[7] },
  { ...s09, schematic: binarySubtractor4bitStepSchematics[8] },
];
