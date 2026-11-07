import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { pinLabellingStepSchematics as fig } from "@/labs/schematics/semester-04/03-microprocessors-and-microcontrollers/8085-pin-labelling";
import {
  PIN_STEPS,
  PIN_TABLE_HEADERS,
  PIN_TABLE_ROWS,
  revealedThrough,
} from "@/labs/mpu8085/steps";

export const procedureSteps: SceneProcedureStep[] = PIN_STEPS.map((step, i) => {
  const count = revealedThrough(i).length;
  return {
    label: step.label,
    body: step.body,
    show: [],
    chipPins: {
      revealed: revealedThrough(i),
      focus: step.focus,
      landmarks: step.landmarks,
    },
    schematic: fig[i],
    table:
      count > 0
        ? revealedTable(PIN_TABLE_HEADERS, PIN_TABLE_ROWS, count)
        : undefined,
  };
});
