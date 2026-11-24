import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire +5 V (VCC) and 0 V (GND) power connections to all gate ICs.",
  body: "Wire pin 14 (row f) of each IC to the bottom +5 V rail with a purple jumper and pin 7 (row e) to the top ground rail with a black jumper. All four ICs are now powered.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "or_cd",
    "and_b_t",
    "xor_x",
    "not_y",
    "w_vcc_or_cd",
    "w_gnd_or_cd",
    "w_vcc_and_b_t",
    "w_gnd_and_b_t",
    "w_vcc_xor_x",
    "w_gnd_xor_x",
    "w_vcc_not_y",
    "w_gnd_not_y",
  ],
  highlight: "w_vcc_or_cd",
};
