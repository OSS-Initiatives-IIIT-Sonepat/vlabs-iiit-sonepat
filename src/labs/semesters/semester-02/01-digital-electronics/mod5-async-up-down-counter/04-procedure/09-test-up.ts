import { type SceneProcedureStep } from "@/labs/experiments/types";
import { S8 } from "./show-sets";

export const step: SceneProcedureStep = {
  label: "Test up counting (U/D = 1).",
  body: "With the U/D tie-point on VCC, apply clock pulses and note the LEDs after each one. The counter should run 000 → 001 → 010 → 011 → 100, shown here at state 100 (decimal 4). Record each state in the observation table.",
  show: S8,
  highlight: "led_q2",
  supplyVoltage: 5.0,
  ledBrightness: { led_q0: 0, led_q1: 0, led_q2: 1 },
};
