import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Transfer characteristics",
  body: "Keep $V_{DS}$ fixed at 5 V. For each $V_{GS}$ from 0 V to 6 V in steps of 0.5 V, adjust $V_{DD}$ until the $V_{DS}$ meter reads 5.00 V and note $V_{R_D}$ (Table 2). Example at $V_{GS} = 5$ V: $V_{DD} = 9.5$ V, $V_{R_D} = 4.50$ V, so $I_D = 45$ mA. Finally return both supplies to 0 V.",
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
  highlight: "dmm_vgs",
  supplyVoltage: 9.5,
  readings: { dmm_vgs: "5.00 V", dmm_id: "4.50 V", dmm_vds: "5.00 V" },
};
