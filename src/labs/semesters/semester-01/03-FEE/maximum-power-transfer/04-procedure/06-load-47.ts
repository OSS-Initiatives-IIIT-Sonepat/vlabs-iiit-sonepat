import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/03-FEE/maximum-power-transfer";

export const step: SceneProcedureStep = {
  label: "Replace the load with 47 Ω.",
  body: "Swap the load for $47\\,\\Omega$ in the same holes. $I_L = 9 / 147 = 61.2\\,\\mathrm{mA}$ and $V_L = 2.88\\,\\mathrm{V}$. The power falls to $176.3\\,\\mathrm{mW}$.",
  show: ["bb", "psu", "rs", "w_v_rs", "rl47", "w_rl_gnd", "am", "vm"],
  highlight: "rl47",
  readings: { psu: "9.00 V", am: "61.2 mA", vm: "2.88 V" },
  schematic,
};
