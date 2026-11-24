import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/03-FEE/transformer-oc-sc";

export const step: SceneProcedureStep = {
  label: "Apply rated voltage and read I0.",
  body: "Raise the supply to the rated $115\\,\\mathrm{V}$. The no-load current is $I_0 = 0.20\\,\\mathrm{A}$. The wattmeter reads $W_0 = 10.0\\,\\mathrm{W}$. Then $\\cos\\phi_0 = 10/(115 \\times 0.20) = 0.435$, $I_w = 87.0\\,\\mathrm{mA}$, $I_\\mu = 180\\,\\mathrm{mA}$, $R_0 = 1.32\\,\\mathrm{k}\\Omega$ and $X_0 = 639\\,\\Omega$.",
  show: ["bb", "t1", "fg", "am_oc", "w_s2_gnd", "vm_oc"],
  highlight: "vm_oc",
  readings: { fg: "115 V, 50 Hz", am_oc: "0.20 A", vm_oc: "115 V" },
  schematic,
};
