import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Power on and record the DC characteristics.",
  body: "Set V_CC = 9 V and raise V_EE until I_E ≈ 1 mA (V_EE ≈ 1.7 V). Record I_E, I_C, V_EB and V_CB and compute $\\alpha = I_C / I_E$. **Input characteristic**: keep V_CB fixed and step V_EE, recording V_EB and I_E. **Output characteristic**: keep I_E fixed (adjust V_EE) and step V_CC, recording V_CB and I_C. Keep I_C below about 1.5 mA so V_CB stays positive with R_C = 4.7 kΩ.",
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
  readings: {
    psu: "9.00 V",
    psu_ee: "1.70 V",
    am_e: "1.00 mA",
    am_c: "0.99 mA",
    vm_eb: "0.65 V",
    vm_cb: "4.35 V",
  },
};
