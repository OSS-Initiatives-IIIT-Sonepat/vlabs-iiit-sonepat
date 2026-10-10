import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label:
    "Connect the oscilloscope (CRO) and digital multimeter (DMM) across R_load.",
  body:
    "Position the bench oscilloscope (cro) and digital multimeter (dmm) beside the breadboard. " +
    "Connect CRO channel CH1 probe and DMM positive lead to the load resistor input node (col 14), " +
    "and attach their ground clips to the breadboard common ground rail.",
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
  highlight: "cro",
};
