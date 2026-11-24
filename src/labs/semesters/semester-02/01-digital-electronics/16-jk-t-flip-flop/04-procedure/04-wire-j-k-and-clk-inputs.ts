import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire J, K, and CLK inputs.",
  body: "Connect J from col 1 row a, K from col 2 row a, CLK from col 3 row a to respective IC pins. These are the primary control inputs.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "w_gnd_link",
    "jk1",
    "w_vcc_jk1",
    "w_gnd_jk1",
    "w_set_vcc",
    "w_clr_vcc",
    "w_j_jk1",
    "w_k_jk1",
    "w_clk_jk1",
  ],
  activeInputs: {
    J: 0,
    K: 0,
    CLK: 0,
  },
};
