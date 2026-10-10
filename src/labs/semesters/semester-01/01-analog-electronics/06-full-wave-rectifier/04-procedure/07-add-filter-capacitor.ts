import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label:
    "Connect filter capacitor C1 (100 µF) in parallel and observe ripple voltage reduction.",
  body:
    "Mount the 100 µF electrolytic filter capacitor C1 across columns 23 to 24 on row c. " +
    "Connect white wire w_c1_pos from C1 positive lead to R_load input (col 18), and black wire w_c1_gnd to the top ground rail. " +
    "Because the ripple frequency is doubled ($100\\text{ Hz}$), the capacitor discharges for half the duration compared to half-wave, resulting in superior smoothing and a steady DC output $V_{dc} \\approx 11.20\\text{ V}$ with negligible ripple.",
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
    "cro",
    "dmm",
    "c1",
    "w_c1_pos",
    "w_c1_gnd",
  ],
  highlight: "c1",
  readings: { dmm: "11.20 V", cro: "Filtered DC = 11.20 V, Ripple = 0.14 Vpp" },
};
