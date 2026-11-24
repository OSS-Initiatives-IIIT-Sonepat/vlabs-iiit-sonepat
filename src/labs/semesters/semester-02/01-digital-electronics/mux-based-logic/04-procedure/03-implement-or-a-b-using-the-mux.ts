import { type SceneProcedureStep } from "@/labs/experiments/types";

import { SHOW } from "../components";

export const step: SceneProcedureStep = {
  label: "Implement OR(A,B) using the MUX",
  body: "For OR(A,B) with S=A: connect D0 to input B (f(0,B)=B) and D1 to +5V (constant logic 1, f(1,B)=1). The MUX output Y = B·A' + 1·A = A'B + A = A + B = OR(A,B). Test all four input combinations and verify the output matches the OR truth table. Compare with the direct OR gate output to confirm equivalence.",
  show: SHOW.or,
  activeInputs: { A: 0, B: 1 },
  ledBrightness: { led_out: 1 },
  highlight: "and1",
};
