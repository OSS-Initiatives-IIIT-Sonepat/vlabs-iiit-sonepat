import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Input characteristics at V_CB = 5 V.",
  body: "Set $V_{CC}$ so that the voltmeter reads $V_{CB}$ = 5 V and keep it there. Repeat the readings of $V_{EB}$ and $I_E$ while increasing $V_{EE}$, and enter them in Table 1. For the same $I_E$, $V_{EB}$ is slightly lower than at $V_{CB}$ = 0 V, so this curve lies just to the left of the first one. Sample reading shown: $I_E$ = 2 mA.",
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
  highlight: "vm_cb",
  supplyVoltage: 5.0,
  readings: {
    dmm: "0.649 V",
    am_ie: "2.00 mA",
    vm_cb: "5.00 V",
    am_ic: "1.99 mA",
  },
};
