import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Drain characteristics",
  body: "Keep $V_{GS}$ fixed at 3 V. Increase $V_{DD}$ so that $V_{DS}$ takes the values in Table 1 and note $V_{R_D}$ at each point. Repeat for $V_{GS}$ = 4 V and 5 V. Example at $V_{GS} = 4$ V, $V_{DD} = 10$ V: the meters read as shown (saturation, $I_D = 20$ mA).",
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
  highlight: "dmm_vds",
  supplyVoltage: 10,
  readings: { dmm_vgs: "4.00 V", dmm_id: "2.00 V", dmm_vds: "8.00 V" },
};
