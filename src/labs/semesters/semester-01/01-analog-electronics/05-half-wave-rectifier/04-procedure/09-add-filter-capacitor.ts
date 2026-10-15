import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step09 as schematic } from "@/labs/schematics/half-wave-rectifier-schematics";

export const step: SceneProcedureStep = {
  label: "Add a filter capacitor for smoothing",
  body: "Place the $100\\,\\mu F$ filter capacitor $C_1$ in parallel with $R_L$ and wire both of its leads to $R_L$\u2019s terminals. $C_1$ charges toward $V_m$ during conduction and discharges slowly through $R_L$ during the non-conducting half-cycle, raising $V_{dc}$ and reducing ripple. Re-read the multimeter \u2014 the reading should climb toward $V_m$.",
  show: [
    "bb",
    "ac_src",
    "d1",
    "w_src_d1",
    "r1",
    "w_d1_r1",
    "w_r1_gnd",
    "dmm",
    "c1",
    "w_c1_top",
    "w_c1_bot",
  ],
  highlight: "c1",
  readings: { dmm: "10.4 V" },
  schematic,
};
