import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/19-ce-transistor-characteristics";

export const step: SceneProcedureStep = {
  label: "Place the base resistor.",
  body: "Insert $R_B = 100\\,\\mathrm{k}\\Omega$ in row c from column 18 to column 21, and join the base at column 14 to column 18. $I_B = (V_{BB} - V_{BE}) / R_B$.",
  show: ["bb", "q1", "w_e_gnd", "rb", "w_b_rb"],
  highlight: "rb",
  schematic,
};
