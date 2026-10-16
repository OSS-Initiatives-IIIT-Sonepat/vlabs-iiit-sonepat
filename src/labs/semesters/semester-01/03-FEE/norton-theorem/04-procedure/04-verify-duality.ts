import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/03-FEE/norton-theorem";
export const step: SceneProcedureStep = {
  label: "Verify I_N = V_th / R_th relationship.",
  schematic,
  body: "Using measured $V_{th} \\approx 6.15\\,\\text{V}$ (from Thevenin experiment) and measured $R_N \\approx 695\\,\\Omega$, compute $I_{N,calc} = V_{th}/R_N$. Compare with directly measured $I_N$. They should agree within 1%, confirming the duality relationship.",
  show: ["bb", "r1", "r2", "w_vcc_r1", "w_r1_junc", "w_r2_gnd"],
};
