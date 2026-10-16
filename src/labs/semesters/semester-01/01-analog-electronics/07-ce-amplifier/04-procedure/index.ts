import { step as s01 } from "./01-calculate-the-dc-q-point";
import { step as s02 } from "./02-assemble-the-ce-amplifier-circuit";
import { step as s03 } from "./03-verify-dc-q-point-with-dmm";
import { step as s04 } from "./04-apply-signal-and-observe-voltage-gain";
import { step as s05 } from "./05-plot-the-frequency-response";

import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ceAmplifierStepSchematics } from "@/labs/schematics/semester-01/01-analog-electronics/07-ce-amplifier";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: ceAmplifierStepSchematics[0] },
  { ...s02, schematic: ceAmplifierStepSchematics[1] },
  { ...s03, schematic: ceAmplifierStepSchematics[2] },
  { ...s04, schematic: ceAmplifierStepSchematics[3] },
  { ...s05, schematic: ceAmplifierStepSchematics[4] },
];
