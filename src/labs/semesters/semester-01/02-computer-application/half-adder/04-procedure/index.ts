import { step as s01 } from "./01-inspect-and-place-the-breadboard";
import { step as s02 } from "./02-mount-the-74hc86-xor-gate-at-column-7";
import { step as s03 } from "./03-mount-the-74hc08-and-gate-at-column-16";
import { step as s04 } from "./04-wire-input-a-red-to-both-gates";
import { step as s05 } from "./05-wire-input-b-blue-to-both-gates";
import { step as s06 } from "./06-place-the-330-resistors-and-output-leds";
import { step as s07 } from "./07-connect-the-output-wires-and-ground-returns";
import { step as s08 } from "./08-double-check-all-connections-then-power-on";
import { step as s09 } from "./09-test-all-four-input-combinations";

import { type SceneProcedureStep } from "@/labs/experiments/types";
import { halfAdderStepSchematics } from "@/labs/schematics/half-adder-schematics";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: halfAdderStepSchematics[0] },
  { ...s02, schematic: halfAdderStepSchematics[1] },
  { ...s03, schematic: halfAdderStepSchematics[2] },
  { ...s04, schematic: halfAdderStepSchematics[3] },
  { ...s05, schematic: halfAdderStepSchematics[4] },
  { ...s06, schematic: halfAdderStepSchematics[5] },
  { ...s07, schematic: halfAdderStepSchematics[6] },
  { ...s08, schematic: halfAdderStepSchematics[7] },
  { ...s09, schematic: halfAdderStepSchematics[8] },
];
