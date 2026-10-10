import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Mount load resistor R_load and complete the circuit loop.",
  body:
    "Mount the 1 k$\\Omega$ load resistor R_load across columns 14 to 17 on row c. " +
    "Connect a yellow wire (w_d1_load) from D1 cathode (col 11) to R_load input (col 14), " +
    "and return R_load terminal p2 (col 17) to the top ground rail with black wire w_load_gnd.",
  show: [
    "bb",
    "transformer",
    "w_ac_gnd",
    "d1",
    "w_ac1_d1",
    "w_d1_load",
    "r_load",
    "w_load_gnd",
  ],
  highlight: "r_load",
};
