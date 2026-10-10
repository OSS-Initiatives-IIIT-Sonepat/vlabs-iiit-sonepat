import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire the select lines",
  body: "Connect S0 (red wire) and S1 (blue wire) from the input tie-points to the select pins of the IC. These are the two inputs you will vary during the experiment.",
  show: [
    "bb",
    "psu",
    "mux1",
    "w_vcc",
    "w_gnd",
    "w_en",
    "w_i0",
    "w_i1",
    "w_i2",
    "w_i3",
    "w_s0",
    "w_s1",
  ],
  highlight: "w_s0",
};
