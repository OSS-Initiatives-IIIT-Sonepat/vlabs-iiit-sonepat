import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/18-center-tapped-full-wave";

export const step: SceneProcedureStep = {
  label: "Measure the DC output.",
  body: "Clip the voltmeter from column 22 to ground. With $V_m = 16.97\\,\\mathrm{V}$ and one diode drop, $V_{dc} = 2(V_m - 0.7)/\\pi = 10.36\\,\\mathrm{V}$.",
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
    "vm",
  ],
  highlight: "vm",
  readings: { vm: "10.36 V" },
  schematic,
};
