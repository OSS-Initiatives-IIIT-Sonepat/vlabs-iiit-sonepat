import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Measure τ on the discharging curve.",
  body: "Move to a falling edge of the input. Measure the time for Vc to fall from 5 V to 36.8% of 5 V, which is 1.84 V. This discharging time constant is also about 1.0 ms, because the capacitor discharges through the same resistor. Record both values in the observation table.",
  show: ["bb", "r_10k", "c1", "w_c_gnd", "fg", "scope"],
  highlight: "scope",
  readings: {
    fg: "square 100 Hz, 0–5 V",
    scope: "Discharging: Vc = 1.84 V at τ ≈ 1.0 ms",
  },
};
