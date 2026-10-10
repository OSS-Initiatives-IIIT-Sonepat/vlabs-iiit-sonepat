import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label:
    "Connect filter capacitor C1 (100 µF) in parallel and observe ripple reduction.",
  body:
    "Insert the 100 µF electrolytic filter capacitor C1 across columns 19 and 20 on row c. " +
    "Connect white wire w_c1_pos from C1 positive lead to R_load input (col 14), and black wire w_c1_gnd from negative lead to ground. " +
    "The capacitor charges to peak voltage during forward conduction and discharges slowly between cycles, smoothing the DC output to $V_{dc} \\approx 10.82\\text{ V}$ with significantly reduced ripple.",
  show: [
    "bb",
    "transformer",
    "w_ac_gnd",
    "d1",
    "w_ac1_d1",
    "w_d1_load",
    "r_load",
    "w_load_gnd",
    "cro",
    "dmm",
    "c1",
    "w_c1_pos",
    "w_c1_gnd",
  ],
  highlight: "c1",
  readings: { dmm: "10.82 V", cro: "Filtered DC = 10.82 V, Ripple = 0.28 Vpp" },
};
