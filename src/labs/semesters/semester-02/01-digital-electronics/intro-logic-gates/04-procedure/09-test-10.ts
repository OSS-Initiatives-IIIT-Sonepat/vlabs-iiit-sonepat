import { type SceneProcedureStep } from "@/labs/experiments/types";

import { everyId, ledStates } from "../gates";

export const step: SceneProcedureStep = {
  label: "Test with A = 1, B = 0.",
  body: "Set $A = 1$ and $B = 0$. Expected: OR, NAND and EX-OR are ON; NOT, AND, NOR and EX-NOR are OFF. Compare with the previous step to confirm the two-input gates are symmetric in $A$ and $B$.",
  show: everyId,
  activeInputs: { A: 1, B: 0 },
  ledBrightness: ledStates(1, 0),
  supplyVoltage: 5.0,
};
