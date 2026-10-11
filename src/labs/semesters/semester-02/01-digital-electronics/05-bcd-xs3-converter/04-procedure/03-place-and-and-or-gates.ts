import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire +5 V (VCC) and 0 V (GND) power connections to all gate ICs.",
  body:
    "Wire pin 14 (row f) of each IC to the bottom +5 V rail using purple jumper wires (w_vcc_*). " +
    "Wire pin 7 (row e) of each IC to the top ground rail using black jumper wires (w_gnd_*). " +
    "All ICs are now energized and grounded.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "or_cd",
    "and_b_t",
    "or_w",
    "xor_x",
    "xor_cd",
    "not_y",
    "not_z",
    "w_vcc_or_cd",
    "w_gnd_or_cd",
    "w_vcc_and",
    "w_gnd_and",
    "w_vcc_or_w",
    "w_gnd_or_w",
    "w_vcc_xor_x",
    "w_gnd_xor_x",
    "w_vcc_xor_cd",
    "w_gnd_xor_cd",
    "w_vcc_not_y",
    "w_gnd_not_y",
    "w_vcc_not_z",
    "w_gnd_not_z",
  ],
  highlight: "w_vcc_or_cd",
};
