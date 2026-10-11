import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the oscilloscope.",
  body: "Connect CH1 of the CRO to the input point Vin and CH2 to the output at pin 6. Connect both probe ground clips to the circuit ground. Set both channels to DC coupling and set the time base to 0.2 ms/div so that one cycle of the 1 kHz signal covers 5 divisions.",
  show: [
    "bb",
    "opamp1",
    "psu",
    "fg",
    "r_in",
    "r_f",
    "scope",
    "w_fg_in",
    "w_rin_pin2",
    "w_pin6_rf",
    "w_rf_pin2",
    "w_pin3_gnd",
    "w_pin7_vcc",
    "w_pin4_gnd",
    "w_out_scope",
  ],
};
