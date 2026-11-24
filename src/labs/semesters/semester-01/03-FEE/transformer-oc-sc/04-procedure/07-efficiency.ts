import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/03-FEE/transformer-oc-sc";

export const step: SceneProcedureStep = {
  label: "Find efficiency and regulation.",
  body: "Full-load copper loss is $8.0\\,\\mathrm{W}$ and core loss is $10.0\\,\\mathrm{W}$. At unity power factor the output is $230\\,\\mathrm{W}$, so $\\eta = 230 / 248 = 92.7\\%$. On the secondary, $R_{02} = 2\\,\\Omega$ and the regulation at unity power factor is $3.48\\%$.",
  show: ["bb", "t1", "fg", "am_sc", "w_p2_gnd", "w_short", "vm_sc"],
  highlight: "t1",
  readings: { fg: "10.0 V, 50 Hz", am_sc: "1.00 A", vm_sc: "10.0 V" },
  schematic,
};
