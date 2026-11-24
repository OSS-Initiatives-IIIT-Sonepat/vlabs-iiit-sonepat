import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Insert R_C (4.7 kΩ) and the I_C ammeter.",
  body: "Insert R_C from col 8 to the collector strip (col 11), row b. Set a second DMM to DC mA and connect it **in series** from the +V_CC rail (+ lead) to col 8 (− lead). All collector current now passes through this meter.",
  show: [
    "bb",
    "psu",
    "psu_ee",
    "q1",
    "w_base_gnd",
    "r_e",
    "am_e",
    "r_c",
    "am_c",
  ],
  highlight: "r_c",
};
