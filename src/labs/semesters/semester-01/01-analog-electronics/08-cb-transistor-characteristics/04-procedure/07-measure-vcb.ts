import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the voltmeter across the collector-base junction.",
  body: "Connect the voltmeter with its positive probe on the collector column (11) and its negative probe on the base column (12) to read $V_{CB}$. The circuit is complete. Check that both supplies are set to 0 V before switching them on.",
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
};
