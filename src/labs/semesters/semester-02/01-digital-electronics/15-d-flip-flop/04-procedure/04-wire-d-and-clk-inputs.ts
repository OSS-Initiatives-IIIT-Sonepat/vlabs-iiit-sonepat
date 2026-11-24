import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire D and CLK inputs.",
  body: "Connect D from col 1 row a and CLK from col 2 row a to the IC. D is the data input; CLK triggers the capture on the rising edge.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "dff1",
    "w_vcc_dff1",
    "w_gnd_dff1",
    "w_clr_vcc",
    "w_set_vcc",
    "w_d_dff1",
    "w_clk_dff1",
  ],
  activeInputs: {
    D: 0,
    CLK: 0,
  },
};
