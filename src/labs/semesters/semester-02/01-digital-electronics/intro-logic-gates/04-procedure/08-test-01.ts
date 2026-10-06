import { type SceneProcedureStep } from "@/labs/experiments/types";

import { everyId, ledStates } from "../gates";

export const step: SceneProcedureStep = {
  label: "Test with A = 0, B = 1.",
  body: "Set $A = 0$ and $B = 1$. Expected: NOT, OR, NAND, EX-OR are ON; AND, NOR and EX-NOR are OFF. Note that the NOT gate depends on $A$ alone.",
  show: everyId,
  activeInputs: { A: 0, B: 1 },
  ledBrightness: ledStates(0, 1),
  supplyVoltage: 5.0,
};
