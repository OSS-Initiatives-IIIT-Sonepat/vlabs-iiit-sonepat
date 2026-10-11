import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Repeat the inverting amplifier for Rf = 47 kΩ and 22 kΩ.",
  body: "Switch off the supply, replace Rf by 47 kΩ and keep Rin = 10 kΩ. Switch on the supply, set the input to 1 V peak-to-peak and record Vo in the observation table. Repeat with Rf = 22 kΩ. For each value compare the measured gain with −Rf / Rin.",
  show: [
    "bb",
    "op_inv",
    "psu",
    "psu_neg",
    "w_gnd_link",
    "w_inv_pin7",
    "w_inv_pin4",
    "w_inv_pin3",
    "r_in",
    "r_f_inv",
    "w_rin_pin2",
    "w_inv_pin6_rf",
    "w_inv_rf_pin2",
    "fg_inv",
    "scope_inv",
  ],
  highlight: "r_f_inv",
  readings: {
    fg_inv: "1 kHz, 1 Vpp",
    scope_inv: "Rf = 47 kΩ: Vo ≈ 4.7 Vpp; Rf = 22 kΩ: Vo ≈ 2.2 Vpp (inverted)",
  },
};
