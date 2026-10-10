import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Observe the waveform on the CRO.",
  body: "Connect CH1 across C1 and the probe ground clip to circuit GND. Set coupling to DC, VOLTS/DIV to 1 V and TIME/DIV to 0.2 ms, and adjust the trigger for a stable trace. Measure Vpp and the time period T, then compute f = 1/T. The output is about 4.2 Vpp, lower than the input, because of the filter.",
  show: [
    "bb",
    "psu",
    "r1",
    "r2",
    "c1",
    "led1",
    "d1",
    "q1",
    "w_vcc",
    "w_r_led",
    "w_gnd1",
    "dmm",
    "fg1",
    "w_c_gnd",
    "cro",
  ],
  highlight: "cro",
  readings: { fg1: "1 kHz, 5 Vpp", cro: "4.2 Vpp, 1 kHz" },
};
