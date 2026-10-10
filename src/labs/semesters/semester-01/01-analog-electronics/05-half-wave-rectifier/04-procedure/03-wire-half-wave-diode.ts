import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label:
    "Mount semiconductor rectifier diode D1 (1N4007) and connect AC input.",
  body:
    "Insert silicon rectifier diode D1 (1N4007) across columns 8 to 11 on row c, with its anode at column 8 and cathode at column 11. " +
    "Connect a red jumper wire (w_ac1_d1) from transformer secondary terminal S1 directly to the anode of D1.",
  show: ["bb", "transformer", "w_ac_gnd", "d1", "w_ac1_d1"],
  highlight: "d1",
};
