import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/03-FEE/maximum-power-transfer";

export const step: SceneProcedureStep = {
  label: "Replace the load with 220 Ω.",
  body: "Swap the load for $220\\,\\Omega$. $I_L = 9 / 320 = 28.1\\,\\mathrm{mA}$ and $V_L = 6.19\\,\\mathrm{V}$. The power is $174.0\\,\\mathrm{mW}$, again below the matched load.",
  show: ["bb", "psu", "rs", "w_v_rs", "rl220", "w_rl_gnd", "am", "vm"],
  highlight: "rl220",
  readings: { psu: "9.00 V", am: "28.1 mA", vm: "6.19 V" },
  schematic,
};
