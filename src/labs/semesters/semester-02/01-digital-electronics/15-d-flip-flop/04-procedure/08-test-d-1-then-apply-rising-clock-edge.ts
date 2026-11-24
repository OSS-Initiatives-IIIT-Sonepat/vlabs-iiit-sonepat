import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Test: D=1 then apply rising clock edge.",
  body: "Set D=1 (connect D hole to VCC). Pulse CLK. Observe: Q=1 (green LED ON), Q_bar=0 (red LED OFF). The flip-flop captured D=1.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "dff1",
    "w_vcc_dff1",
    "w_gnd_dff1",
    "w_clr_vcc",
    "w_set_vcc",
    "w_d_dff1",
    "w_clk_dff1",
    "r_q",
    "led_q",
    "r_qbar",
    "led_qbar",
    "w_q_out",
    "w_q_gnd",
    "w_qbar_out",
    "w_qbar_gnd",
  ],
  ledBrightness: { led_q: 1, led_qbar: 0 },
  highlight: "led_q",
  activeInputs: {
    D: 1,
    CLK: 1,
  },
};
