import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the 330 Ω resistor.",
  body: "Insert the 330 Ω current-limiting resistor in the Q output path to protect the LED.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "sr1",
    "w_vcc_sr1",
    "w_gnd_sr1",
    "w_s2_vcc",
    "w_sbar_sr1",
    "w_rbar_sr1",
    "r_q",
  ],
  activeInputs: {
    Sbar: 1,
    Rbar: 1,
  },
};
