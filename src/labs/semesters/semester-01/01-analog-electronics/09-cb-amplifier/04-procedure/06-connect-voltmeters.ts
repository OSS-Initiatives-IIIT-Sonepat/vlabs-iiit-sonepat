import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the V_EB and V_CB voltmeters.",
  body: "Use a third DMM on DC volts. For **V_EB** put the red probe on the base (col 12) and the black probe on the emitter (col 13). For **V_CB** put the red probe on the collector (col 11) and the black probe on the base (col 12). One meter can be moved between the two positions.",
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
    "vm_eb",
    "vm_cb",
  ],
};
