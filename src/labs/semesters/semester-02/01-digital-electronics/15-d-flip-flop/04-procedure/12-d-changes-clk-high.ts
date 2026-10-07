import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Change D while CLK is high",
  body: "With CLK held at 1, set D = 1. Q stays at 0, because a D change while the clock is steady has no effect. This is the difference between an edge-triggered flip-flop and a level-triggered latch.",
  show: ["bb", "psu", "dff1", "w_clr", "w_pre", "w_d", "w_clk", "r_q", "led_q", "r_qn", "led_qn", "w_q_r", "w_r_led_q", "w_qn_r", "w_r_led_qn", "w_gnd_q", "w_gnd_qn"],
  highlight: "led_qn",
  activeInputs: { D: 1, CLK: 1 },
  supplyVoltage: 5.0,
  ledBrightness: { led_q: 0, led_qn: 1 },
};
