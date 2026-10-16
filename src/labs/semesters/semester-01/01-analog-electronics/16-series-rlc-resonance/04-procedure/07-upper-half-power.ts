import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Find the upper half-power frequency f2.",
  body: "Raise the frequency above f0 until VR again falls to 1.41 V peak-to-peak. This is the upper half-power frequency f2, about 5.89 kHz. Here XL − XC = R and the current lags the input voltage by 45°. The bandwidth is $BW = f_2 - f_1 \\approx 1.59$ kHz.",
  show: ["bb", "l1", "c1", "r1", "w_r_gnd", "fg", "scope"],
  highlight: "scope",
  readings: {
    fg: "5.89 kHz, 2 Vpp",
    scope: "VR ≈ 1.41 Vpp, I lags V by 45°",
  },
};
