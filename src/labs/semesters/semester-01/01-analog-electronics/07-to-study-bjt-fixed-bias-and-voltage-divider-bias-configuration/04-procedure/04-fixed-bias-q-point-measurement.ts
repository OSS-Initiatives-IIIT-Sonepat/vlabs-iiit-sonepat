import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label:
    "Measure the Fixed Bias operating point (Q-point) with the digital multimeter.",
  body:
    "Connect the digital multimeter (dmm) to measure collector voltage $V_{CE}$ and branch current $I_C$ across Q1. " +
    "With $V_{CC} = 12\\text{ V}$, $R_B = 470\\text{ k}\\Omega$, and $R_{C1} = 4.7\\text{ k}\\Omega$: " +
    "base current is $I_B \\approx 24.0\\ \\mu\\text{A}$, collector current is $I_C \\approx 2.4\\text{ mA}$, and " +
    "$V_{CE} \\approx 0.72\\text{ V}$ (transistor pushed near saturation). " +
    "Replacing the transistor with another unit shifts $I_C$ drastically, confirming poor Q-point stability ($S = 1 + \\beta$).",
  show: [
    "bb",
    "psu",
    "r_b",
    "w_vcc_rb",
    "r_c1",
    "w_vcc_rc1",
    "q1",
    "w_rb_base",
    "w_rc1_col",
    "w_q1_gnd",
    "dmm",
  ],
  readings: { dmm: "2.40 mA, 0.72 V" },
  highlight: "dmm",
};
