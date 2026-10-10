import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Mount load resistor R_load and connect both diode cathodes.",
  body:
    "Mount the 1 k$\\Omega$ load resistor R_load across columns 18 to 21 on row c. " +
    "Connect yellow wire w_d1_pos from D1 cathode (col 11) to R_load input (col 18), " +
    "yellow wire w_d2_pos from D2 cathode (col 16) to R_load input (col 18), " +
    "and black wire w_r_gnd from R_load terminal p2 (col 21) to the ground rail. " +
    "Both diodes now feed unidirectional pulses into R_load with alternating phase conduction.",
  show: [
    "bb",
    "transformer",
    "w_ct_gnd",
    "d1",
    "w_ac1_d1",
    "d2",
    "w_ac2_d2",
    "w_d1_pos",
    "w_d2_pos",
    "r_load",
    "w_r_gnd",
  ],
  highlight: "r_load",
};
