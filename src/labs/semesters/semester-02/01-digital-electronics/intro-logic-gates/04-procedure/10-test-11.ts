import { type SceneProcedureStep } from "@/labs/experiments/types";

import { everyId, ledStates } from "../gates";

export const step: SceneProcedureStep = {
  label: "Test with A = 1, B = 1.",
  body: "Set $A = 1$ and $B = 1$. Expected: AND, OR, EX-NOR are ON; NOT, NAND, NOR and EX-OR are OFF. Complete the observation table and verify each column against the theoretical truth table.",
  show: everyId,
  activeInputs: { A: 1, B: 1 },
  ledBrightness: ledStates(1, 1),
  supplyVoltage: 5.0,
};
