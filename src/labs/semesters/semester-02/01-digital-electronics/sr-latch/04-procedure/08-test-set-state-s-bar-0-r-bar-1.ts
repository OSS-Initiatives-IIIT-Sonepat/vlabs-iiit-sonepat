import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Test SET state (S_bar=0, R_bar=1).",
  body: "Now assert $\\bar{S}$=LOW (connect S input to GND). Q goes to 1. LED turns ON. This is the SET state — latch stores a logical 1.",
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
    "w_q_out",
    "w_q_gnd",
  ],
  ledBrightness: { led_q: 1 },
  highlight: "led_q",
  activeInputs: {
    Sbar: 0,
    Rbar: 1,
  },
};
