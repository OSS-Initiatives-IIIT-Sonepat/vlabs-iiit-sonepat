import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Test: D=0 then apply rising clock edge.",
  body: "Set D=0 (connect D hole to GND). Pulse CLK HIGH then LOW (rising edge). Observe: Q=0 (green LED OFF), Q_bar=1 (red LED ON). The flip-flop captured D=0.",
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
  ledBrightness: { led_q: 0, led_qbar: 1 },
  activeInputs: {
    D: 0,
    CLK: 1,
  },
};
