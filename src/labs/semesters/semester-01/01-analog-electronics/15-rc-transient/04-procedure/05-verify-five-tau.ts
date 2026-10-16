import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Verify full charge after 5τ.",
  body: "At the end of each 5 ms half-period, read Vc. It is about 4.97 V (99.3% of 5 V), so the capacitor is effectively fully charged after 5τ. Briefly raise the frequency to 1 kHz (half-period 0.5 ms, less than τ): the capacitor no longer reaches 5 V and the output becomes a small triangular wave. Return the frequency to 100 Hz.",
  show: ["bb", "r_10k", "c1", "w_c_gnd", "fg", "scope"],
  highlight: "scope",
  readings: {
    fg: "square 100 Hz, 0–5 V",
    scope: "Charging: Vc ≈ 4.97 V after 5τ = 5 ms",
  },
};
