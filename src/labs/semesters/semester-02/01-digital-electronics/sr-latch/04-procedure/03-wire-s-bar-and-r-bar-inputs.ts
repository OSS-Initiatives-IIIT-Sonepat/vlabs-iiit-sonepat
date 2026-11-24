import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire S_bar and R_bar inputs.",
  body: "Connect $\\bar{S}$ from col 1 row a and $\\bar{R}$ from col 2 row a to the IC. These are active-LOW: HIGH = inactive (use VCC pull-up via 10 kΩ for real buttons). In this lab drive them directly from row holes.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "sr1",
    "w_vcc_sr1",
    "w_gnd_sr1",
    "w_s2_vcc",
    "w_sbar_sr1",
    "w_rbar_sr1",
  ],
  activeInputs: {
    Sbar: 1,
    Rbar: 1,
  },
};
