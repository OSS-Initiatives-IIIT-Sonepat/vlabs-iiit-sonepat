import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Measure τ on the charging curve.",
  body: "Expand one rising curve to fill the screen. Starting at the rising edge of the input, measure the time for Vc to reach 63.2% of 5 V, which is 3.16 V. This time is the charging time constant, about 1.0 ms (one division at 1 ms/div). Also read Vc at 2 ms, 3 ms and 4 ms and compare with $V_C = 5(1 - e^{-t/\\tau})$.",
  show: ["bb", "r_10k", "c1", "w_c_gnd", "fg", "scope"],
  highlight: "scope",
  readings: {
    fg: "square 100 Hz, 0–5 V",
    scope: "Charging: Vc = 3.16 V at τ ≈ 1.0 ms",
  },
};
