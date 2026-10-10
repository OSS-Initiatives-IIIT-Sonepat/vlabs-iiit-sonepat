import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Output characteristics at constant I_E.",
  body: "Set $V_{CC}$ to 0 V and adjust $V_{EE}$ until the emitter milliammeter reads $I_E$ = 2 mA. Increase $V_{CC}$ in steps so that $V_{CB}$ takes the values in Table 2, re-adjusting $V_{EE}$ if $I_E$ drifts, and note $I_C$ each time. Repeat for $I_E$ = 4 mA and 6 mA. $I_C$ stays almost equal to $I_E$ and barely changes with $V_{CB}$. Sample reading shown: $I_E$ = 4 mA at $V_{CB}$ = 5 V.",
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
  highlight: "am_ic",
  supplyVoltage: 5.0,
  readings: {
    dmm: "0.667 V",
    am_ie: "4.00 mA",
    vm_cb: "5.00 V",
    am_ic: "3.97 mA",
  },
};
