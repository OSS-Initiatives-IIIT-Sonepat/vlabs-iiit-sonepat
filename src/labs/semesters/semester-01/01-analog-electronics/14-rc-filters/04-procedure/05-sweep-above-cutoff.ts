import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Sweep the frequency above the cut-off.",
  body: "Continue to 3 kHz, 5 kHz, 10 kHz and 20 kHz. At 10 kHz the output is only about 0.31 V peak-to-peak (−16 dB) and lags by about 81°. Between 10 kHz and 20 kHz (one octave) the gain falls by about 6 dB, which is the −20 dB/decade slope of a first-order filter. Complete the low-pass columns of the table.",
  show: ["bb", "r_lp", "c_lp", "w_clp_gnd", "fg_lp", "scope_lp"],
  highlight: "scope_lp",
  readings: {
    fg_lp: "10 kHz, 2 Vpp",
    scope_lp: "Vo ≈ 0.31 Vpp, lags 81°",
  },
};
