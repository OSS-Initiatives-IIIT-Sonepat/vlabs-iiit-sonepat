import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/03-FEE/norton-theorem";
export const step: SceneProcedureStep = {
  label: "Measure I_N (short-circuit current).",
  schematic,
  body: "Set ammeter to DC milliamp range. Connect ammeter directly between A and B (short-circuiting the output). Reading is $I_{sc} = I_N$. For this network $I_N = V_s/R_1 = 9/1000 = 9\\,\\text{mA}$ ($R_2$ is bypassed by the short). Record measured $I_N$.",
  show: ["bb", "r1", "r2", "w_vcc_r1", "w_r1_junc", "w_r2_gnd"],
};
