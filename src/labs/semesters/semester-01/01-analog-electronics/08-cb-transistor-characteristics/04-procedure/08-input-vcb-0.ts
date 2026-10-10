import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Input characteristics at V_CB = 0 V.",
  body: "Keep $V_{CC}$ at 0 V so that $V_{CB}$ = 0 V. Increase $V_{EE}$ slowly from 0 V and, at each step, note $V_{EB}$ (multimeter) and $I_E$ (milliammeter) in Table 1. $I_E$ stays almost zero until $V_{EB}$ is about 0.5 V and then rises quickly, so take closely spaced readings in that region. Sample reading shown: $I_E$ = 2 mA.",
  show: [
    "bb",
    "q1",
    "w_base_gnd",
    "r_e",
    "w_e_re",
    "psu_ee",
    "am_ie",
    "dmm",
    "w_vcc",
    "psu_cc",
    "am_ic",
    "vm_cb",
  ],
  highlight: "am_ie",
  supplyVoltage: 0,
  readings: {
    dmm: "0.652 V",
    am_ie: "2.00 mA",
    vm_cb: "0.00 V",
    am_ic: "1.98 mA",
  },
};
