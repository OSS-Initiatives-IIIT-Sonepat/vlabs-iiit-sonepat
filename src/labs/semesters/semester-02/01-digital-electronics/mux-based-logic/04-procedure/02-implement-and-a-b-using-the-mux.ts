import { type SceneProcedureStep } from "@/labs/experiments/types";

import { SHOW } from "../components";

export const step: SceneProcedureStep = {
  label: "Implement AND(A,B) using the MUX",
  body: "For AND(A,B) with S=A: connect D0 to GND (constant logic 0) and D1 to input B. The MUX output Y = 0·A' + B·A = A·B = AND(A,B). Test all four combinations (A,B) ∈ {00,01,10,11} and verify the output matches the AND truth table. Record the LED state for each combination.",
  show: SHOW.and,
  activeInputs: { A: 1, B: 1 },
  ledBrightness: { led_out: 1 },
  highlight: "not1",
};
