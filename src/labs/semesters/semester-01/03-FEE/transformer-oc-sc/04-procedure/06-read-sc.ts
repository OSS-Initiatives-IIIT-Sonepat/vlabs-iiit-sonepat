import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/03-FEE/transformer-oc-sc";

export const step: SceneProcedureStep = {
  label: "Raise the voltage to full-load current.",
  body: "Raise the supply until the primary current is the full-load value $I_{sc} = 1.00\\,\\mathrm{A}$. The voltage needed is only $V_{sc} = 10.0\\,\\mathrm{V}$. The wattmeter reads $W_{sc} = 8.0\\,\\mathrm{W}$. Then $Z_{01} = 10\\,\\Omega$, $R_{01} = 8\\,\\Omega$ and $X_{01} = 6\\,\\Omega$.",
  show: ["bb", "t1", "fg", "am_sc", "w_p2_gnd", "w_short", "vm_sc"],
  highlight: "am_sc",
  readings: { fg: "10.0 V, 50 Hz", am_sc: "1.00 A", vm_sc: "10.0 V" },
  schematic,
};
