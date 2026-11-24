import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Measure the fixed-bias Q-point.",
  body: "Power on (12 V). Record $I_C$ and $V_{CE}$. Theory: $I_B = (12 - 0.7)/470\\,\\text{k} \\approx 24\\,\\mu\\text{A}$, so the active-region estimate is $I_C = \\beta I_B \\approx 4.8\\,\\text{mA}$ for $\\beta = 200$. But $R_C$ can pass at most $(12 - 0.2)/4.7\\,\\text{k} \\approx 2.5\\,\\text{mA}$, so the transistor **saturates**: the meters read about 2.5 mA and 0.2 V. Power off before Phase B.",
  show: [
    "bb",
    "psu",
    "dmm",
    "q_a",
    "r_b",
    "r_c1",
    "w_vcc_rb",
    "w_ea_gnd",
    "vm_a",
  ],
  readings: { psu: "12.00 V", dmm: "2.51 mA", vm_a: "0.20 V" },
};
