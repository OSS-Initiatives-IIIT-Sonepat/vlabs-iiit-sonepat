import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/03-FEE/maximum-power-transfer";

export const step: SceneProcedureStep = {
  label: "Place the matched load.",
  body: "Insert $R_L = 100\\,\\Omega$ in row c from column 16 to column 19, and return column 19 to the blue rail. Leave the gap between column 9 and column 16 open for the ammeter.",
  show: ["bb", "psu", "rs", "w_v_rs", "rl100", "w_rl_gnd"],
  highlight: "rl100",
  readings: { psu: "9.00 V" },
  schematic,
};
