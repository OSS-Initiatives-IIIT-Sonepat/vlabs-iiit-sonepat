import { s2BcdXs3ConverterStepSchematics } from "@/labs/schematics/s2-bcd-xs3-converter-schematics";
import { step as s01 } from "./01-inspect-and-place-the-breadboard";
import { step as s02 } from "./02-place-not-and-xor-gates";
import { step as s03 } from "./03-place-and-and-or-gates";
import { step as s04 } from "./04-wire-all-inputs-a-b-c-d";
import { step as s05 } from "./05-place-330-resistors-and-leds";
import { step as s06 } from "./06-connect-output-wires-and-ground-returns";
import { step as s07 } from "./07-test-bcd-0101-decimal-5";
import { step as s08 } from "./08-test-bcd-1001-decimal-9";

import { type SceneProcedureStep } from "@/labs/experiments/types";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: s2BcdXs3ConverterStepSchematics[0] },
  { ...s02, schematic: s2BcdXs3ConverterStepSchematics[1] },
  { ...s03, schematic: s2BcdXs3ConverterStepSchematics[2] },
  { ...s04, schematic: s2BcdXs3ConverterStepSchematics[3] },
  { ...s05, schematic: s2BcdXs3ConverterStepSchematics[4] },
  { ...s06, schematic: s2BcdXs3ConverterStepSchematics[5] },
  { ...s07, schematic: s2BcdXs3ConverterStepSchematics[6] },
  { ...s08, schematic: s2BcdXs3ConverterStepSchematics[7] },
];
