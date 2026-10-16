import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Find the lower half-power frequency f1.",
  body: "Remove the multimeter. Lower the frequency from f0 until VR falls to 0.707 × 2.0 = 1.41 V peak-to-peak. This is the lower half-power frequency f1, about 4.30 kHz. Here XC − XL = R and the current leads the input voltage by 45°.",
  show: ["bb", "l1", "c1", "r1", "w_r_gnd", "fg", "scope"],
  highlight: "scope",
  readings: {
    fg: "4.30 kHz, 2 Vpp",
    scope: "VR ≈ 1.41 Vpp, I leads V by 45°",
  },
};
