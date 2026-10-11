import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Switch on the supply and check the DC levels.",
  body: "Keep the function generator amplitude at zero and switch on the dual supply. With the multimeter confirm +12 V between pin 7 and ground and −12 V between pin 4 and ground. The output at pin 6 should be close to 0 V. If it sits near one of the supply limits, switch off and recheck the connections, especially the feedback resistor Rf and the connection of pin 3 to ground.",
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
