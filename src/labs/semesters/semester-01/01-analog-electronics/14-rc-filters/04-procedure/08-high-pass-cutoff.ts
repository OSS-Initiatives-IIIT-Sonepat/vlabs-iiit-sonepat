import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Locate the high-pass cut-off frequency.",
  body: "Raise the frequency until the output reaches 1.41 V peak-to-peak (0.707 × Vin). This happens at about 1.59 kHz, the same cut-off as the low-pass filter. Here the output leads the input by 45° and the gain is −3 dB.",
  show: [
    "bb", "r_lp", "c_lp", "w_clp_gnd", "fg_lp", "scope_lp",
    "c_hp", "r_hp", "w_rhp_gnd", "fg_hp", "scope_hp",
  ],
  highlight: "scope_hp",
  readings: {
    fg_lp: "Output off",
    scope_lp: "No signal",
    fg_hp: "1.59 kHz, 2 Vpp",
    scope_hp: "Vo ≈ 1.41 Vpp (−3 dB), leads 45°",
  },
};
