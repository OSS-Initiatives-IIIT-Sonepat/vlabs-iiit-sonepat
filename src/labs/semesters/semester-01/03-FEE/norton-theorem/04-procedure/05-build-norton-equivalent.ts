import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/semester-01/03-FEE/norton-theorem";
export const step: SceneProcedureStep = {
  label: "Build Norton equivalent and verify load voltage.",
  schematic,
  body: "Construct the Norton equivalent: current source $I_N$ in parallel with $R_N$. Connect load $R_L = 3.3\\,\\text{k}\\Omega$ across the output. Measure $V_L$. Compare with load voltage from the original network, confirming both give the same result.",
  show: [
    "bb",
    "r1",
    "r2",
    "r_load",
    "w_vcc_r1",
    "w_r1_junc",
    "w_r2_gnd",
    "w_junc_rload",
    "w_rload_gnd",
  ],
};
