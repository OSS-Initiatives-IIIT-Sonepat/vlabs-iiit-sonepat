import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Join the ladder",
  body: "Wire the resistors into one chain, from the least significant bit toward the output. Each bit tap still needs its drive wire. Those come in on the last step, together with the grounds and the lead into the LED.",
  show: [
    "bb",
    "r1",
    "r2",
    "r3",
    "r4",
    "led_out",
    "w_r1_junc1",
    "w_junc1_r2",
    "w_r2_junc2",
    "w_junc2_r3",
    "w_r3_junc3",
    "w_junc3_r4",
  ],
};
