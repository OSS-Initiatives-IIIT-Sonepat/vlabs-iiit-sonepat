import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/semester-01/03-FEE/maximum-power-transfer";

export const step: SceneProcedureStep = {
  label: "Restore the matched load.",
  body: "Put the $100\\,\\Omega$ load back. $P_{max} = V_s^2 / (4 R_s) = 202.5\\,\\mathrm{mW}$. The $47\\,\\Omega$ and $220\\,\\Omega$ loads delivered $176.3\\,\\mathrm{mW}$ and $174.0\\,\\mathrm{mW}$. The greatest power is at $R_L = R_s$.",
  show: ["bb", "psu", "rs", "w_v_rs", "rl100", "w_rl_gnd", "am", "vm"],
  highlight: "rl100",
  readings: { psu: "9.00 V", am: "45.0 mA", vm: "4.50 V" },
  schematic,
};
