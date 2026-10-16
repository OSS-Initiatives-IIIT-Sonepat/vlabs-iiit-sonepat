import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const observations: Section = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Input: 0–5 V square wave, 100 Hz. C = 0.1 µF. The charging time constant is the time for Vc to rise from 0 V to 3.16 V (63.2%); the discharging time constant is the time for Vc to fall from 5 V to 1.84 V (36.8%). Percentage error = |τ(theory) − τ(measured)| / τ(theory) × 100.",
    "Also record Vc at t = τ, 2τ, 3τ, 4τ and 5τ on the charging curve and compare with V(1 − e^(−t/τ)): 3.16 V, 4.32 V, 4.75 V, 4.91 V and 4.97 V.",
  ],
  table: {
    headers: [
      "R (kΩ)",
      "C (µF)",
      "τ = RC (ms)",
      "τ charging, measured (ms)",
      "τ discharging, measured (ms)",
      "Vc at 5τ (V)",
      "% error",
    ],
    rows: [
      ["10", "0.1", "1.00", "", "", "", ""],
      ["4.7", "0.1", "0.47", "", "", "", ""],
    ],
  },
};
