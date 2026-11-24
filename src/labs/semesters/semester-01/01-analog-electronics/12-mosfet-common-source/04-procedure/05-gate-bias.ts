import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the gate bias network.",
  body: "Mount the $100\\,\\text{k}\\Omega$ resistor $R_G$ from column 8 to the gate column (11). The $V_{GG}$ (+) lead is already in column 8, so no wires are needed. The gate draws almost no DC current, so the full $V_{GG}$ appears as $V_{GS}$.",
  show: ["bb", "psu", "vgg", "m1", "w_src_gnd", "r_d", "am_d", "r_g"],
  highlight: "r_g",
};
