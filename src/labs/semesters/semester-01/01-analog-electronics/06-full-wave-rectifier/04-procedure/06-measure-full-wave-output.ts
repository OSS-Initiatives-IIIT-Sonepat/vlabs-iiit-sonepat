import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect CRO and DMM to observe unfiltered full-wave output waveform.",
  body:
    "Connect the CRO Channel 1 probe and Digital Multimeter across load resistor R_load with respect to the common center-tap ground rail. " +
    "Observe consecutive positive half-sine pulses on the CRO occurring at twice the AC supply frequency ($2f = 100\\text{ Hz}$). " +
    "Measure and record the unfiltered average DC voltage $V_{dc} = \\frac{2(V_m - V_D)}{\\pi} \\approx 7.20\\text{ V}$ on the DMM.",
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
  ],
  readings: { dmm: "7.20 V", cro: "Vm = 12.0 V, Vdc = 7.20 V, freq = 100 Hz" },
};
