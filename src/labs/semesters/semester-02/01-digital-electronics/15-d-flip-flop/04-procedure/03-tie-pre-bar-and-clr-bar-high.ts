import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Tie PRE_bar and CLR_bar HIGH.",
  body: "Connect $\\overline{PRE}$ and $\\overline{CLR}$ pins to VCC rail. This disables asynchronous preset/clear — the flip-flop operates in normal clocked mode only.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "dff1",
    "w_vcc_dff1",
    "w_gnd_dff1",
    "w_clr_vcc",
    "w_set_vcc",
  ],
  activeInputs: {
    D: 0,
    CLK: 0,
  },
};
