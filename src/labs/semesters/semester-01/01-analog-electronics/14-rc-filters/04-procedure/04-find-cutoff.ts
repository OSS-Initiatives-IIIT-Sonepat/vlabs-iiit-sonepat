import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Locate the cut-off frequency.",
  body: "Adjust the frequency slowly until the output is 0.707 × 2 V = 1.41 V peak-to-peak. This happens at about 1.59 kHz, where the capacitor reactance equals R. The output lags the input by 45° and the gain is $20\\log_{10}(0.707) = -3$ dB. Note the measured cut-off frequency and compare it with the theoretical value.",
  show: ["bb", "r_lp", "c_lp", "w_clp_gnd", "fg_lp", "scope_lp"],
  highlight: "scope_lp",
  readings: {
    fg_lp: "1.59 kHz, 2 Vpp",
    scope_lp: "Vo ≈ 1.41 Vpp (−3 dB), lags 45°",
  },
};
