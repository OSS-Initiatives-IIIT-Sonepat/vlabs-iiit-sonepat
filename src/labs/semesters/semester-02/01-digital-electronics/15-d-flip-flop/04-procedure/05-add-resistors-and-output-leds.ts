import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Add resistors and output LEDs.",
  body: "Place 330 Ω resistors in the Q (green) and Q_bar (red) output paths. Green LED ON = Q=1, Red LED ON = Q=0 (they are always complementary in normal operation).",
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
  ],
  activeInputs: {
    D: 0,
    CLK: 0,
  },
};
