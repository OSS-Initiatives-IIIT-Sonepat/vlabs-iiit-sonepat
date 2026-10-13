import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Falling edge with D = 1",
  body: "Lower CLK to 0 with D = 1. Q is still 0, because the falling edge is ignored.",
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
    "w_q_r",
    "w_r_led_q",
    "w_qn_r",
    "w_r_led_qn",
    "w_gnd_q",
    "w_gnd_qn",
  ],
  highlight: "led_qn",
  activeInputs: { D: 1, CLK: 0 },
  supplyVoltage: 5.0,
  ledBrightness: { led_q: 0, led_qn: 1 },
};
