import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Observe the forbidden state (both=0).",
  body: "⚠️ Assert both $\\bar{S}=\\bar{R}=0$ briefly. Q is forced HIGH and so is the latch's internal $\\bar{Q}$ (the 74HC279 brings out only Q), so Q and $\\bar{Q}$ are no longer complements — an invalid state. When inputs return to 11, Q settles unpredictably. Avoid this in real designs.",
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
  activeInputs: {
    Sbar: 0,
    Rbar: 0,
  },
};
