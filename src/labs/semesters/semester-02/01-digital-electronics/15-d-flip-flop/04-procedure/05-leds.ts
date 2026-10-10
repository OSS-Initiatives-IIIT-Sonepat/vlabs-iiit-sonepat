import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the resistors and LEDs",
  body: "Place a 330 Ω resistor and an LED for each output: the green LED shows Q and the yellow LED shows Q̄.",
  show: [
    "bb",
    "psu",
    "dff1",
    "w_clr",
    "w_pre",
    "w_d",
    "w_clk",
    "r_q",
    "led_q",
    "r_qn",
    "led_qn",
  ],
  highlight: "led_q",
};
