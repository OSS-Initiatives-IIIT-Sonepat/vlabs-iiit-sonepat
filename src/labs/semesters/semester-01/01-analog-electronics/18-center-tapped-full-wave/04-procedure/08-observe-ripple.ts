import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/18-center-tapped-full-wave";

export const step: SceneProcedureStep = {
  label: "Look at the ripple.",
  body: "Connect the CRO across the load. There are two pulses in each mains cycle, so the ripple frequency is 100 Hz. The peaks reach $16.3\\,\\mathrm{V}$.",
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
    "scope",
  ],
  highlight: "scope",
  readings: { vm: "10.36 V", scope: "16.3 Vpk, 100 Hz" },
  schematic,
};
