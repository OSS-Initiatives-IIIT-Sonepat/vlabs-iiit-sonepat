import { type SceneProcedureStep } from "@/labs/experiments/types";

import { SHOW } from "../components";

export const step: SceneProcedureStep = {
  label: "Implement XOR(A,B) using the MUX",
  body: "For XOR(A,B) with S=A: f(0,B)=B and f(1,B)=B' (the complement of B). Connect D0 to B and D1 to B'. B' comes from the second inverter of the same 74HC04 (B into pin 3, B' out of pin 4), so the S' inverter stays as it is. The MUX output Y = B·A' + B'·A = A⊕B = XOR(A,B). Test all four combinations and verify the XOR truth table.",
  show: SHOW.xor,
  activeInputs: { A: 1, B: 1 },
  ledBrightness: { led_out: 0 },
  highlight: "or1",
};
