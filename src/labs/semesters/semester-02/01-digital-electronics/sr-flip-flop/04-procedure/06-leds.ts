import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the resistors and LEDs",
  body: "Place a 330 Ω resistor and an LED for each output: the green LED shows Q and the yellow LED shows Q̄.",
  show: [
    "bb",
    "psu",
    "nor1",
    "nor2",
    "w_fb1",
    "w_fb2",
    "w_s",
    "w_r",
    "r_q",
    "led_q",
    "r_qb",
    "led_qb",
  ],
  highlight: "led_q",
};
