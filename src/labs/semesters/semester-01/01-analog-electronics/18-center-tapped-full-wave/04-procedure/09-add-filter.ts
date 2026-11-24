import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step09 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/18-center-tapped-full-wave";

export const step: SceneProcedureStep = {
  label: "Add the filter capacitor.",
  body: "Place $100\\,\\mu\\mathrm{F}$ at columns 26 and 27, positive toward column 22, and return column 27 to ground. The DC voltage rises to $15.75\\,\\mathrm{V}$ and the ripple falls to $1.04\\,\\mathrm{V}$ peak-to-peak.",
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
    "c1",
    "w_pos_c",
    "w_c_gnd",
    "vm",
    "scope",
  ],
  highlight: "c1",
  readings: { vm: "15.75 V", scope: "1.04 Vpp ripple" },
  schematic,
};
