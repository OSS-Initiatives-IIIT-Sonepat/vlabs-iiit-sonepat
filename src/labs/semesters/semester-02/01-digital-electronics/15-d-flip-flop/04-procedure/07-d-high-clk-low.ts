import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "D = 1, CLK = 0",
  body: "Set D = 1 while CLK stays at 0. With no clock edge the output does not change: Q = 0, Q̄ = 1.",
  show: ["bb", "psu", "dff1", "w_clr", "w_pre", "w_d", "w_clk", "r_q", "led_q", "r_qn", "led_qn", "w_q_r", "w_r_led_q", "w_qn_r", "w_r_led_qn", "w_gnd_q", "w_gnd_qn"],
  highlight: "led_qn",
  activeInputs: { D: 1, CLK: 0 },
  supplyVoltage: 5.0,
  ledBrightness: { led_q: 0, led_qn: 1 },
};
