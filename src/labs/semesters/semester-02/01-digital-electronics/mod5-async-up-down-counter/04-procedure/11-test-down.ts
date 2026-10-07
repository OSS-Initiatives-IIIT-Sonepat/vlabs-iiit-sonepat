import { type SceneProcedureStep } from "@/labs/experiments/types";
import { S8 } from "./show-sets";

export const step: SceneProcedureStep = {
  label: "Test down counting (U/D = 0).",
  body: "Move the U/D wire from VCC to the GND rail. From 000 the first clock pulse briefly produces 111; the reset logic clears $Q_0$ and $Q_1$ and the counter settles at 100 (decimal 4). Continue pulsing: 100 → 011 → 010 → 001 → 000. Record the sequence in the observation table.",
  show: S8,
  highlight: "w_ud_src",
  supplyVoltage: 5.0,
  ledBrightness: { led_q0: 0, led_q1: 0, led_q2: 1 },
};
