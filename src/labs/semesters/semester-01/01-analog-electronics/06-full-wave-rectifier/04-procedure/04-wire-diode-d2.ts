import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Mount second rectifier diode D2 (1N4007) and wire secondary AC2.",
  body:
    "Insert the second silicon rectifier diode D2 (1N4007) across columns 13 to 16 on row c, with its anode at column 13 and cathode at column 16. " +
    "Connect a blue wire (w_ac2_d2) from transformer secondary terminal S2 directly to the anode of D2.",
  show: ["bb", "transformer", "w_ct_gnd", "d1", "w_ac1_d1", "d2", "w_ac2_d2"],
  highlight: "d2",
};
