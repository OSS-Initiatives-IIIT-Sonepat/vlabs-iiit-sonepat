import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Compare measured and theoretical τ, then switch off.",
  body: "Measure the discharging time constant for 4.7 kΩ as well (time to fall to 1.84 V). Calculate the percentage error between the measured τ and RC for both resistors. Note that halving R roughly halves τ. Switch off the generator and the CRO before removing the components.",
  show: ["bb", "r_4k7", "c1", "w_c_gnd", "fg", "scope"],
  highlight: "scope",
  readings: {
    fg: "square 100 Hz, 0–5 V",
    scope: "Discharging: Vc = 1.84 V at τ ≈ 0.47 ms",
  },
};
