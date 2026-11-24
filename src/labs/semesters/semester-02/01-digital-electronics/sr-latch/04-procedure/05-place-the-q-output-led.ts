import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the Q output LED.",
  body: "Insert the green LED with anode toward the resistor. LED ON = Q=1 (latch SET). LED OFF = Q=0 (latch RESET).",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "sr1",
    "w_vcc_sr1",
    "w_gnd_sr1",
    "w_s2_vcc",
    "w_sbar_sr1",
    "w_rbar_sr1",
    "r_q",
    "led_q",
  ],
  activeInputs: {
    Sbar: 1,
    Rbar: 1,
  },
};
