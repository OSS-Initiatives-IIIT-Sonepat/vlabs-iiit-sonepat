import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Measure the high-pass output at low frequencies.",
  body: "Set the generator to 100 Hz, 2 V peak-to-peak. The capacitor reactance (about 15.9 kΩ) blocks most of the signal, so the output across R is only about 0.13 V peak-to-peak (−24 dB) and leads the input by about 86°. Repeat at 500 Hz and 1 kHz and record Vo and φ.",
  show: [
    "bb", "r_lp", "c_lp", "w_clp_gnd", "fg_lp", "scope_lp",
    "c_hp", "r_hp", "w_rhp_gnd", "fg_hp", "scope_hp",
  ],
  highlight: "scope_hp",
  readings: {
    fg_lp: "Output off",
    scope_lp: "No signal",
    fg_hp: "100 Hz, 2 Vpp",
    scope_hp: "Vo ≈ 0.13 Vpp, leads 86°",
  },
};
