import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Test HOLD state (both=1).",
  body: "Both $\\bar{S}=\\bar{R}=1$ (both HIGH/inactive). Q retains its last value. Toggle S and R back to HIGH — LED remains ON (if previously set). This demonstrates the memory/hold property.",
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
    Sbar: 1,
    Rbar: 1,
  },
};
