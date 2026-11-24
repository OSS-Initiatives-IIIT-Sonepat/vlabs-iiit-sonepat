import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/18-center-tapped-full-wave";

export const step: SceneProcedureStep = {
  label: "Place the load.",
  body: "Insert $R_L = 1\\,\\mathrm{k}\\Omega$ in row c from column 22 to column 25, and return column 25 to the ground rail. The centre tap is already on that rail.",
  show: [
    "bb",
    "t1",
    "w_s1",
    "w_s2",
    "w_ct",
    "d1",
    "d2",
    "w_d1_pos",
    "w_d2_pos",
    "r_load",
    "w_rl_gnd",
  ],
  highlight: "r_load",
  schematic,
};
