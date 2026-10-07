import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Change D to 0 without a clock",
  body: "Set D = 0 with CLK at 0. Q stays at 1 because there is no rising edge. The flip-flop remembers its old data.",
  show: ["bb", "psu", "dff1", "w_clr", "w_pre", "w_d", "w_clk", "r_q", "led_q", "r_qn", "led_qn", "w_q_r", "w_r_led_q", "w_qn_r", "w_r_led_qn", "w_gnd_q", "w_gnd_qn"],
  highlight: "led_q",
  activeInputs: { D: 0, CLK: 0 },
  supplyVoltage: 5.0,
  ledBrightness: { led_q: 1, led_qn: 0 },
};
