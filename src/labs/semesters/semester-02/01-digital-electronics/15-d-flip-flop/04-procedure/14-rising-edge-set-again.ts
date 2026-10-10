import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Rising edge with D = 1",
  body: "Raise CLK to 1 again with D = 1. Q now copies D and goes to 1. Record all of these results in the observation table.",
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
  highlight: "led_q",
  activeInputs: { D: 1, CLK: 1 },
  supplyVoltage: 5.0,
  ledBrightness: { led_q: 1, led_qn: 0 },
};
