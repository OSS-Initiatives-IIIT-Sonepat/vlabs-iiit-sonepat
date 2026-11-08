import { type SceneProcedureStep } from "@/labs/experiments/types";
import { buildTrainerLab } from "@/labs/mpu8085/trainer-steps";

import { codeLab } from "../03-code-lab";

/** The program typed into the trainer kit, single-stepped, and read back. */
export const trainer = buildTrainerLab(
  codeLab.starterCode,
  codeLab.memoryInit,
  codeLab.expectedOutputs,
);

export const procedureSteps: SceneProcedureStep[] = trainer.steps;
