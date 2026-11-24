import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the multimeters",
  body: "Set all three multimeters to DC volts. Connect one across $R_D$ to measure $V_{R_D}$ (so $I_D = V_{R_D}/100\\ \\Omega$), one between Drain and Source for $V_{DS}$, and one between Gate and Source for $V_{GS}$.",
  show: [
    "bb",
    "psu_vds",
    "r_d",
    "q1",
    "psu_vgs",
    "w_vdd_rd",
    "w_source_gnd",
    "dmm_id",
    "dmm_vds",
    "dmm_vgs",
  ],
  highlight: "dmm_id",
};
