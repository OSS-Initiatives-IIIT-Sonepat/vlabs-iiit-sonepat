import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/semester-01/03-FEE/maximum-power-transfer";

export const step: SceneProcedureStep = {
  label: "Measure the matched load.",
  body: "Connect the ammeter from column 9 to column 16 and the voltmeter across the load. $R_L = R_s$, so $I_L = 45.0\\,\\mathrm{mA}$ and $V_L = 4.50\\,\\mathrm{V}$. The load power is $P_L = 4.50 \\times 45.0 = 202.5\\,\\mathrm{mW}$.",
  show: ["bb", "psu", "rs", "w_v_rs", "rl100", "w_rl_gnd", "am", "vm"],
  highlight: "vm",
  readings: { psu: "9.00 V", am: "45.0 mA", vm: "4.50 V" },
  schematic,
};
