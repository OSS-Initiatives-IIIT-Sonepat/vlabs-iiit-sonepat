import { type SceneProcedureStep } from "@/labs/experiments/types";

import { everyId, ledStates } from "../gates";

export const step: SceneProcedureStep = {
  label: "Test with A = 0, B = 0.",
  body: "Set $A = 0$ and $B = 0$. Observe the LEDs and record each output in the observation table. Expected: NOT, NAND, NOR and EX-NOR are ON (logic 1); AND, OR and EX-OR are OFF (logic 0).",
  show: everyId,
  activeInputs: { A: 0, B: 0 },
  ledBrightness: ledStates(0, 0),
  supplyVoltage: 5.0,
};
