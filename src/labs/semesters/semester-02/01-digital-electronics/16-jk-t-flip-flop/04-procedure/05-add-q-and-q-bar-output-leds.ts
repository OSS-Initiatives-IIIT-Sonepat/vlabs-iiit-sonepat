import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Add Q and Q_bar output LEDs.",
  body: "Place 330 Ω resistors and two LEDs: green for Q, yellow for Q_bar. They should always be complementary in normal operation.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "w_gnd_link",
    "jk1",
    "w_vcc_jk1",
    "w_gnd_jk1",
    "w_set_vcc",
    "w_clr_vcc",
    "w_j_jk1",
    "w_k_jk1",
    "w_clk_jk1",
    "r_q",
    "led_q",
    "r_qbar",
    "led_qbar",
    "w_q_out",
    "w_q_gnd",
    "w_qbar_out",
    "w_qbar_gnd",
  ],
  activeInputs: {
    J: 0,
    K: 0,
    CLK: 0,
  },
};
