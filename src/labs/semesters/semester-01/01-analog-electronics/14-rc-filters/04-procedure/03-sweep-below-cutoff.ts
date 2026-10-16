import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Sweep the frequency below the cut-off.",
  body: "Keep the input at 2 V peak-to-peak and raise the frequency to 500 Hz and then 1 kHz. At 1 kHz the output falls to about 1.69 V peak-to-peak (−1.4 dB) and lags the input by about 32°. Measure the phase from the time shift Δt between the input and output zero crossings: $\\varphi = 360° \\times \\Delta t \\times f$. Record Vo and φ at each frequency in the observation table.",
  show: ["bb", "r_lp", "c_lp", "w_clp_gnd", "fg_lp", "scope_lp"],
  highlight: "scope_lp",
  readings: {
    fg_lp: "1 kHz, 2 Vpp",
    scope_lp: "Vo ≈ 1.69 Vpp, lags 32°",
  },
};
