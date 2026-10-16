import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Sweep above resonance and calculate Q.",
  body: "Continue to 7 kHz, 8 kHz and 10 kHz. The circuit is now inductive and VR falls again; at 10 kHz it is about 0.42 V peak-to-peak. Switch off the generator. Plot VR against frequency, mark f0, f1 and f2, and calculate $Q = \\frac{f_0}{f_2 - f_1}$ (about 3.2). Compare with $Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}} = 3.16$ and check that $f_0 \\approx \\sqrt{f_1 f_2}$.",
  show: ["bb", "l1", "c1", "r1", "w_r_gnd", "fg", "scope"],
  highlight: "scope",
  readings: {
    fg: "10 kHz, 2 Vpp",
    scope: "VR ≈ 0.42 Vpp, I lags V",
  },
};
