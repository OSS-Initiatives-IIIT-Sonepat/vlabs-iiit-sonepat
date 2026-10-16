import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Complete the sweep and plot both responses.",
  body: "Continue to 3 kHz, 5 kHz, 10 kHz and 20 kHz. At 10 kHz the output is about 1.98 V peak-to-peak, almost equal to the input. Switch off the generators. Calculate the gain in dB for every reading and plot both filters on the same semi-log graph (gain in dB against log f). Read the −3 dB frequency of each curve and compare it with $f_c = 1/(2\\pi RC)$.",
  show: [
    "bb", "r_lp", "c_lp", "w_clp_gnd", "fg_lp", "scope_lp",
    "c_hp", "r_hp", "w_rhp_gnd", "fg_hp", "scope_hp",
  ],
  highlight: "scope_hp",
  readings: {
    fg_lp: "Output off",
    scope_lp: "No signal",
    fg_hp: "10 kHz, 2 Vpp",
    scope_hp: "Vo ≈ 1.98 Vpp, leads 9°",
  },
};
