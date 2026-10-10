import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the multimeter across the emitter-base junction.",
  body: "Connect the digital multimeter with its positive probe on the base column (12) and its negative probe on the emitter column (13). It reads the input voltage $V_{EB}$ directly in volts, with better resolution than the 0-15 V voltmeter.",
  show: ["bb", "q1", "w_base_gnd", "r_e", "w_e_re", "psu_ee", "am_ie", "dmm"],
  highlight: "dmm",
};
