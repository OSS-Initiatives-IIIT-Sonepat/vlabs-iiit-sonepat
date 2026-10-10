import { type SceneProcedureStep } from "@/labs/experiments/types";
import { S8 } from "./show-sets";

export const step: SceneProcedureStep = {
  label: "Observe the wrap-around to 000.",
  body: "Apply one more clock pulse. The counter briefly reaches 101, the reset logic clears all flip-flops, and the LEDs return to 000. State 101 is therefore not a stable state, which makes the counter MOD-5.",
  show: S8,
  highlight: "nand1",
  supplyVoltage: 5.0,
  ledBrightness: { led_q0: 0, led_q1: 0, led_q2: 0 },
};
