import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Check cut-off",
  body: "Set $V_{GS} = 0$ V and $V_{DD} = 10$ V. No channel exists, so $I_D \\approx 0$, $V_{R_D} \\approx 0$ and $V_{DS} \\approx V_{DD}$.",
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
  highlight: "q1",
  supplyVoltage: 10,
  readings: { dmm_vgs: "0.00 V", dmm_id: "0.00 V", dmm_vds: "10.00 V" },
};
