import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label:
    "Observe unfiltered half-wave rectification waveform and measure DC voltage.",
  body:
    "Observe the pulsating unidirectional output waveform on the CRO: conduction occurs only during the positive half-cycle ($0$ to $\\pi$), while the negative half-cycle is blocked. " +
    "Measure and record the unfiltered DC output voltage $V_{dc} = \\frac{V_m - V_D}{\\pi} \\approx 3.60\\text{ V}$ on the digital multimeter.",
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
  ],
  readings: { dmm: "3.60 V", cro: "Vm = 12.0 V, Vdc = 3.60 V" },
};
