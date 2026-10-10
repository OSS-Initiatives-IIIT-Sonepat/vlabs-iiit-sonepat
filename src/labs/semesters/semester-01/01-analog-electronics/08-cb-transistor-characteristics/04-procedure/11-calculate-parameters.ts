import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Plot the graphs and calculate r_i, r_o and alpha.",
  body: "Plot the input characteristics ($I_E$ vs $V_{EB}$ at each $V_{CB}$) and the output characteristics ($I_C$ vs $V_{CB}$ at each $I_E$). From the steep part of an input curve find $r_i = \\Delta V_{EB} / \\Delta I_E$. From the flat part of an output curve find $r_o = \\Delta V_{CB} / \\Delta I_C$. At constant $V_{CB}$ find $\\alpha = \\Delta I_C / \\Delta I_E$ from the output curves.",
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
};
